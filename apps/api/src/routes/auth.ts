// apps/api/src/routes/auth.ts
import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validation';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { generateTokens, hashPassword, verifyPassword, verifyToken } from '../utils/auth';
import { success, error } from '../utils/apiResponse';
import { getUserByEmail, getUserById } from '../mock-data/users';

const router = Router();

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
  grade: z.number().min(6).max(11),
  school: z.string().min(1, 'School is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const verifyOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must be numbers only'),
});

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

router.post('/login', validate(loginSchema), async (req: AuthRequest, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = getUserByEmail(email);
    
    if (!user) {
      return res.status(401).json(error('Invalid credentials'));
    }

    // In a real app, verify password against hashed password
    // For mock, we accept any password for demo users
    const isValid = await verifyPassword(password, 'hashed_password_mock');
    if (!isValid && password !== 'password123') {
      return res.status(401).json(error('Invalid credentials'));
    }

    const tokens = generateTokens(user);
    return res.json(success({ user, tokens }, 'Login successful'));
  } catch (err) {
    return res.status(500).json(error('Login failed'));
  }
});

router.post('/register', validate(registerSchema), async (req: AuthRequest, res) => {
  try {
    const { name, email, password, grade, school } = req.body;
    
    if (getUserByEmail(email)) {
      return res.status(409).json(error('Email already registered'));
    }

    const hashedPassword = await hashPassword(password);
    
    // In a real app, save to database
    const newUser = {
      id: `u${Date.now()}`,
      email,
      name,
      grade,
      school,
      role: 'student' as const,
      createdAt: new Date().toISOString(),
    };

    const tokens = generateTokens(newUser);
    return res.status(201).json(success({ user: newUser, tokens }, 'Registration successful'));
  } catch (err) {
    return res.status(500).json(error('Registration failed'));
  }
});

router.post('/logout', authMiddleware, async (req: AuthRequest, res) => {
  // In a real app, invalidate refresh token
  return res.json(success(null, 'Logged out successfully'));
});

router.post('/refresh', async (req: AuthRequest, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json(error('Refresh token required'));
  }

  const payload = verifyToken(refreshToken);
  if (!payload || payload.type !== 'refresh') {
    return res.status(401).json(error('Invalid refresh token'));
  }

  const user = getUserById(payload.sub);
  if (!user) {
    return res.status(401).json(error('User not found'));
  }

  const tokens = generateTokens(user);
  return res.json(success({ tokens }, 'Token refreshed'));
});

router.post('/forgot-password', validate(forgotPasswordSchema), async (req: AuthRequest, res) => {
  const { email } = req.body;
  const user = getUserByEmail(email);
  
  // Always return success to prevent email enumeration
  return res.json(success(null, 'If the email exists, a reset link has been sent'));
});

router.post('/verify-otp', validate(verifyOtpSchema), async (req: AuthRequest, res) => {
  const { email, otp } = req.body;
  const user = getUserByEmail(email);
  
  if (!user) {
    return res.status(404).json(error('User not found'));
  }
  
  // Mock: accept any 6-digit OTP
  if (otp === '123456') {
    const tokens = generateTokens(user);
    return res.json(success({ tokens }, 'OTP verified'));
  }
  
  return res.status(400).json(error('Invalid OTP'));
});

router.post('/reset-password', validate(resetPasswordSchema), async (req: AuthRequest, res) => {
  // In a real app, verify reset token and update password
  return res.json(success(null, 'Password reset successful'));
});

router.get('/me', authMiddleware, async (req: AuthRequest, res) => {
  return res.json(success({ user: req.user }, 'User profile retrieved'));
});

export default router;
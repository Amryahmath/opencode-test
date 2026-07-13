// apps/api/src/utils/apiResponse.ts
import type { ApiResponse, ApiError, ValidationError } from '@it-master-ai/types';

export function success<T>(data: T, message = 'Success'): ApiResponse<T> {
  return { success: true, message, data };
}

export function error(message: string, errors: ValidationError[] = []): ApiError {
  return { success: false, message, errors };
}

export function validationError(errors: ValidationError[]): ApiError {
  return { success: false, message: 'Validation failed', errors };
}
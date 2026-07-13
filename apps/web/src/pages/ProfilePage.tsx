import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Award, Settings, Camera, Mail, Bell, Shield, Palette, Save, X, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Input, Badge, Card, Tabs, TabsList, TabsTrigger, TabsContent, Select } from '@it-master-ai/ui';
import { useAuth } from '../context/AuthContext';

const mockCertificates = [
  { id: '1', title: 'Grade 7 Programming Fundamentals', grade: 7, issuedAt: '2024-01-15', certificateUrl: '#' },
  { id: '2', title: 'Grade 8 Web Development Basics', grade: 8, issuedAt: '2024-03-20', certificateUrl: '#' },
  { id: '3', title: 'Grade 9 JavaScript Proficiency', grade: 9, issuedAt: '2024-06-10', certificateUrl: '#' },
];

const mockSettings = {
  theme: 'system' as 'light' | 'dark' | 'system',
  emailNotifications: true,
  pushNotifications: false,
  language: 'en',
};

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'certificates' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    school: user?.school || '',
    grade: user?.grade || 6,
  });
  const [settings, setSettings] = useState(mockSettings);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    updateUser(formData);
    setIsEditing(false);
    setSaving(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-secondary-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-card py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Student Profile
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your profile, view certificates, and customize your learning experience.
          </motion.p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white dark:bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-24">
                <Card.Content className="p-6 text-center space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-3xl font-bold text-white">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
                        <Camera className="h-4 w-4" />
                        <input type="file" accept="image/*" onChange={handleAvatarChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </label>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                    <div className="mt-3 flex items-center justify-center gap-4 text-sm">
                      <Badge variant="secondary">Grade {user.grade}</Badge>
                      <Badge variant="outline">{user.school}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Certificates</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">84%</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Avg Score</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Streak Days</p>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" /> Profile</TabsTrigger>
                  <TabsTrigger value="certificates"><Award className="h-4 w-4 mr-2" /> Certificates</TabsTrigger>
                  <TabsTrigger value="settings"><Settings className="h-4 w-4 mr-2" /> Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6">
                  <Card>
                    <Card.Header className="flex flex-row items-center justify-between">
                      <Card.Title>Personal Information</Card.Title>
                      {isEditing ? (
                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}><X className="h-4 w-4" /></Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                      )}
                    </Card.Header>
                    <Card.Content className={isEditing ? '' : 'pt-0'}>
                      {isEditing ? (
                        <div className="space-y-4">
                          <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                          <Input label="School" value={formData.school} onChange={(e) => setFormData({...formData, school: e.target.value})} />
                          <Select value={String(formData.grade)} onValueChange={(v) => setFormData({...formData, grade: parseInt(v)})}>
                            <Select.Trigger><Select.Value placeholder="Select Grade" /></Select.Trigger>
                            <Select.Content>
                              {[6,7,8,9,10,11].map(g => <Select.Item key={g} value={String(g)}>Grade {g}</Select.Item>)}
                            </Select.Content>
                          </Select>
                          <div className="flex gap-3 pt-4">
                            <Button onClick={handleSaveProfile} disabled={saving} variant="gradient">
                              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <>Save Changes <CheckCircle className="h-4 w-4 ml-2" /></Button>
                            <Button variant="ghost" onClick={() => { setFormData({ name: user.name, school: user.school, grade: user.grade }); setIsEditing(false); }}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div><p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p><p className="font-medium text-gray-900 dark:text-white">{user.name}</p></div>
                            <div><p className="text-sm text-gray-500 dark:text-gray-400">Email</p><p className="font-medium text-gray-900 dark:text-white">{user.email}</p></div>
                            <div><p className="text-sm text-gray-500 dark:text-gray-400">Grade</p><p className="font-medium text-gray-900 dark:text-white">Grade {user.grade}</p></div>
                            <div><p className="text-sm text-gray-500 dark:text-gray-400">School</p><p className="font-medium text-gray-900 dark:text-white">{user.school}</p></div>
                            <div><p className="text-sm text-gray-500 dark:text-gray-400">Role</p><p className="font-medium text-gray-900 dark:text-white capitalize">{user.role}</p></div>
                            <div><p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p><p className="font-medium text-gray-900 dark:text-white">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p></div>
                          </div>
                        </div>
                      )}
                    </Card.Content>
                  </Card>
                </TabsContent>

                <TabsContent value="certificates" className="mt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCertificates.map((cert, index) => (
                      <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                        <Card className="h-full hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-700 transition-all">
                          <Card.Content className="p-6">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                              <Award className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-1">{cert.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">Grade {cert.grade} • Issued {new Date(cert.issuedAt).toLocaleDateString()}</p>
                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1" onClick={() => window.open(cert.certificateUrl, '_blank')}>View Certificate</Button>
                              <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                            </div>
                          </Card.Content>
                        </Card>
                      </motion.div>
                    ))}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      <Card className="h-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 transition-colors">
                        <Card.Content className="p-12 text-center">
                          <Award className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">No more certificates</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Complete more courses to earn certificates!</p>
                          <Link to="/courses">
                            <Button variant="outline" size="sm">Explore Courses</Button>
                          </Link>
                        </Card.Content>
                      </Card>
                    </motion.div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <div className="space-y-6">
                    <Card>
                      <Card.Header><Card.Title className="flex items-center gap-2"><Palette className="h-5 w-5" /> Appearance</Card.Title></Card.Header>
                      <Card.Content className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                          <Select value={settings.theme} onValueChange={(v) => setSettings({...settings, theme: v as any})}>
                            <Select.Trigger><Select.Value placeholder="Select theme" /></Select.Trigger>
                            <Select.Content>
                              <Select.Item value="light">Light</Select.Item>
                              <Select.Item value="dark">Dark</Select.Item>
                              <Select.Item value="system">System</Select.Item>
                            </Select.Content>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                          <Select value={settings.language} onValueChange={(v) => setSettings({...settings, language: v})}>
                            <Select.Trigger><Select.Value placeholder="Select language" /></Select.Trigger>
                            <Select.Content>
                              <Select.Item value="en">English</Select.Item>
                              <Select.Item value="es">Spanish</Select.Item>
                              <Select.Item value="fr">French</Select.Item>
                            </Select.Content>
                          </Select>
                        </div>
                      </Card.Content>
                    </Card>

                    <Card>
                      <Card.Header><Card.Title className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</Card.Title></Card.Header>
                      <Card.Content className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div><p className="font-medium text-gray-900 dark:text-white">Email Notifications</p><p className="text-sm text-gray-500">Receive email updates about your progress</p></div>
                          <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div><p className="font-medium text-gray-900 dark:text-white">Push Notifications</p><p className="text-sm text-gray-500">Get browser notifications for reminders</p></div>
                          <input type="checkbox" checked={settings.pushNotifications} onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        </div>
                      </Card.Content>
                    </Card>

                    <Card>
                      <Card.Header><Card.Title className="flex items-center gap-2"><Shield className="h-5 w-5" /> Privacy & Security</Card.Title></Card.Header>
                      <Card.Content className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">Change Password</Button>
                        <Button variant="outline" className="w-full justify-start">Two-Factor Authentication</Button>
                        <Button variant="destructive" className="w-full justify-start">Delete Account</Button>
                      </Card.Content>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

// Need to import missing icons
import { Download } from 'lucide-react';
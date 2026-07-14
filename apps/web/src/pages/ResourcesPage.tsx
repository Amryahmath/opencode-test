import { useState } from 'react';
import { Search, Filter, FileText, Play, Download, Clock, Eye, BookOpen, ChevronDown, X, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Input, Select, Badge, Card } from '@it-master-ai/ui';

const resources = [
  { id: '1', title: 'Introduction to Python Programming', description: 'Complete guide to Python basics for beginners', type: 'pdf', grade: 7, topic: 'Programming Basics', thumbnail: '📄', url: '#', duration: 0, pages: 45, downloads: 1250, tags: ['Beginner', 'Python', 'Grade 7'] },
  { id: '2', title: 'HTML & CSS Fundamentals', description: 'Learn to build responsive websites from scratch', type: 'video', grade: 8, topic: 'Web Development', thumbnail: '🎬', url: '#', duration: 120, pages: 0, downloads: 3400, tags: ['Beginner', 'Web Dev', 'Grade 8'] },
  { id: '3', title: 'Database Design Principles', description: 'Understanding relational databases and SQL', type: 'pdf', grade: 10, topic: 'Databases', thumbnail: '📄', url: '#', duration: 0, pages: 60, downloads: 890, tags: ['Intermediate', 'SQL', 'Grade 10'] },
  { id: '4', title: 'JavaScript ES6+ Features', description: 'Modern JavaScript syntax and best practices', type: 'video', grade: 9, topic: 'Web Development', thumbnail: '🎬', url: '#', duration: 90, pages: 0, downloads: 2100, tags: ['Intermediate', 'JavaScript', 'Grade 9'] },
  { id: '5', title: 'Cybersecurity Basics', description: 'Introduction to network security and threat prevention', type: 'notes', grade: 11, topic: 'Security', thumbnail: '📝', url: '#', duration: 0, pages: 30, downloads: 1800, tags: ['Advanced', 'Security', 'Grade 11'] },
  { id: '6', title: 'Data Structures & Algorithms', description: 'Essential CS concepts for problem solving', type: 'pdf', grade: 10, topic: 'Algorithms', thumbnail: '📄', url: '#', duration: 0, pages: 80, downloads: 2500, tags: ['Advanced', 'Algorithms', 'Grade 10'] },
  { id: '7', title: 'Python Practice Exercises', description: 'Hands-on coding challenges with solutions', type: 'download', grade: 7, topic: 'Programming Basics', thumbnail: '💾', url: '#', duration: 0, pages: 0, downloads: 5600, tags: ['Beginner', 'Practice', 'Grade 7'] },
  { id: '8', title: 'Network Fundamentals', description: 'Understanding how the internet works', type: 'video', grade: 9, topic: 'Networking', thumbnail: '🎬', url: '#', duration: 75, pages: 0, downloads: 1500, tags: ['Intermediate', 'Networking', 'Grade 9'] },
  { id: '9', title: 'Machine Learning Introduction', description: 'Basic concepts of AI and machine learning', type: 'notes', grade: 11, topic: 'AI/ML', thumbnail: '📝', url: '#', duration: 0, pages: 25, downloads: 950, tags: ['Advanced', 'AI', 'Grade 11'] },
];

const typeIcons = { pdf: FileText, video: Play, notes: BookOpen, download: Download };
const typeLabels = { pdf: 'PDF Document', video: 'Video Lesson', notes: 'Study Notes', download: 'Downloadable' };
const typeColors = { pdf: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', video: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', notes: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', download: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' };

export function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const types = ['all', 'pdf', 'video', 'notes', 'download'];
  const grades = ['all', '6', '7', '8', '9', '10', '11'];

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || r.type === selectedType;
    const matchesGrade = selectedGrade === 'all' || r.grade === parseInt(selectedGrade);
    return matchesSearch && matchesType && matchesGrade;
  });

  const activeFilters = (selectedType !== 'all' ? 1 : 0) + (selectedGrade !== 'all' ? 1 : 0);

  return (
    <div className="min-h-screen py-12 lg:py-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-secondary-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-card py-12 lg:py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Resources
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access PDF guides, video lessons, study notes, and practice files for every grade level.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-dark-bg border-y border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full lg:w-80"
              leftIcon={<Search className="h-4 w-4" />}
            />
            
            <div className="flex flex-wrap gap-2 lg:ml-auto">
              <Select value={selectedType} onValueChange={setSelectedType} className="w-full lg:w-40">
                <Select.Trigger><Select.Value placeholder="All Types" /></Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">All Types</Select.Item>
                  {types.filter(t => t !== 'all').map(t => <Select.Item key={t} value={t}>{typeLabels[t as keyof typeof typeLabels]}</Select.Item>)}
                </Select.Content>
              </Select>
              <Select value={selectedGrade} onValueChange={setSelectedGrade} className="w-full lg:w-32">
                <Select.Trigger><Select.Value placeholder="All Grades" /></Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">All Grades</Select.Item>
                  {grades.filter(g => g !== 'all').map(g => <Select.Item key={g} value={g}>Grade {g}</Select.Item>)}
                </Select.Content>
              </Select>
              <div className="flex gap-1 lg:ml-4">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`} aria-label="Grid view"><FileText className="h-5 w-5" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`} aria-label="List view"><BookOpen className="h-5 w-5" /></button>
              </div>
            </div>
          </div>

          {(selectedType !== 'all' || selectedGrade !== 'all') && (
            <div className="flex flex-wrap gap-2">
              {selectedType !== 'all' && (
                <Badge variant="outline" className="gap-1" onClick={() => setSelectedType('all')}>
                  Type: {typeLabels[selectedType as keyof typeof typeLabels]}
                  <X className="h-3 w-3" onClick={(e) => { e.stopPropagation(); setSelectedType('all'); }} />
                </Badge>
              )}
              {selectedGrade !== 'all' && (
                <Badge variant="outline" className="gap-1" onClick={() => setSelectedGrade('all')}>
                  Grade {selectedGrade}
                  <X className="h-3 w-3" onClick={(e) => { e.stopPropagation(); setSelectedGrade('all'); }} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={() => { setSelectedType('all'); setSelectedGrade('all'); setSearchQuery(''); }}>
                <X className="h-3 w-3 mr-1" /> Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Resources Grid/List */}
      <section className="py-12 lg:py-16 bg-gray-50 dark:bg-dark-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-medium">{filteredResources.length}</span> of <span className="font-medium">{resources.length}</span> resources
            </p>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div key={resource.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                  <Card className="h-full hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 group">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">{resource.thumbnail}</div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className={typeColors[resource.type as keyof typeof typeColors]}>
                          <typeIcons[resource.type as keyof typeof typeIcons] className="h-3 w-3 mr-1" />
                          {typeLabels[resource.type as keyof typeof typeLabels]}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity justify-center">
                        <Button size="sm" variant="secondary" className="flex-1"><Eye className="h-4 w-4 mr-1" /> View</Button>
                        <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>
                      </div>
                    </div>
                    <Card.Content className="p-4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Grade {resource.grade}</Badge>
                        <Badge variant="outline">{resource.topic}</Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{resource.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{resource.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <span className="flex items-center gap-1"><Award className="h-3 w-3" /> {resource.downloads.toLocaleString()}</span>
                        {resource.duration > 0 && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {resource.duration} min</span>}
                        {resource.pages > 0 && <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {resource.pages} pages</span>}
                      </div>
                    </Card.Content>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResources.map((resource, index) => (
                <motion.div key={resource.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                  <Card className="hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all">
                    <div className="p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-4xl flex-shrink-0">{resource.thumbnail}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant={['secondary', 'outline', 'success', 'default'][types.indexOf(resource.type)]} className={typeColors[resource.type as keyof typeof typeColors]}>
                              <typeIcons[resource.type as keyof typeof typeIcons] className="h-3 w-3 mr-1" />
                              {typeLabels[resource.type as keyof typeof typeLabels]}
                            </Badge>
                            <Badge variant="secondary">Grade {resource.grade}</Badge>
                            <Badge variant="outline">{resource.topic}</Badge>
                          </div>
                          <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-1">{resource.title}</h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">{resource.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {resource.tags.slice(0, 3).map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1"><Award className="h-3 w-3" /> {resource.downloads.toLocaleString()}</span>
                            {resource.duration > 0 && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {resource.duration} min</span>}
                            {resource.pages > 0 && <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {resource.pages} pages</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 lg:ml-auto lg:flex-shrink-0">
                          <Button size="sm" variant="secondary"><Eye className="h-4 w-4 mr-1" /> View</Button>
                          <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredResources.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No resources found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms.</              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
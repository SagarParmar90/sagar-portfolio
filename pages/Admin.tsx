import React, { useState, useEffect } from 'react';
import { Project, ProjectCategory } from '../types';
import { dataService } from '../services/dataService';
import { generateProjectDescription } from '../services/geminiService';
import { Plus, Edit2, Trash2, Save, X, Sparkles, Image, Film } from 'lucide-react';
import { Button } from '../components/Button';

export const Admin: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    thumbnail: '',
    duration: '00:00',
    views: '0',
    uploadDate: new Date().toLocaleDateString(),
    category: ProjectCategory.MOTION_GRAPHICS,
    description: '',
    tags: [],
    skills: [],
    videoUrl: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    const data = await dataService.getProjects();
    setProjects(data);
    setIsLoading(false);
  };

  const handleAddNew = () => {
    setFormData({
      id: Date.now().toString(),
      title: '',
      thumbnail: 'https://picsum.photos/seed/' + Date.now() + '/1280/720',
      duration: '00:00',
      views: '0',
      uploadDate: 'Just now',
      category: ProjectCategory.MOTION_GRAPHICS,
      description: '',
      tags: [],
      skills: [],
      videoUrl: ''
    });
    setIsEditing(true);
  };

  const handleEdit = (project: Project) => {
    setFormData({ ...project });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await dataService.deleteProject(id);
      loadProjects();
    }
  };

  const handleSave = async () => {
    if (!formData.title) return alert('Title is required');
    setIsSaving(true);
    await dataService.saveProject(formData);
    setIsSaving(false);
    setIsEditing(false);
    loadProjects();
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || formData.tags.length === 0) {
      alert('Please enter a title and some tags/skills first to give the AI context.');
      return;
    }
    setIsGeneratingAI(true);
    const desc = await generateProjectDescription(formData);
    setFormData(prev => ({ ...prev, description: desc, aiDescription: desc }));
    setIsGeneratingAI(false);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading Studio...</div>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-yt-text dark:text-yt-textDark flex items-center gap-2">
          <Film className="text-yt-red" /> Channel Content
        </h1>
        {!isEditing && (
          <Button onClick={handleAddNew} icon={<Plus size={18} />}>
            Create New Project
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white dark:bg-yt-darkGray rounded-xl p-6 shadow-lg border border-gray-200 dark:border-yt-borderDark">
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-yt-border pb-4">
            <h2 className="text-xl font-bold text-yt-text dark:text-yt-textDark">
              {formData.id ? 'Edit Video Details' : 'Upload Video'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Inputs */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-yt-text dark:text-yt-textDark mb-1">Title</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 dark:border-yt-border rounded-lg bg-transparent text-yt-text dark:text-yt-textDark focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yt-text dark:text-yt-textDark mb-1">Description</label>
                <div className="relative">
                  <textarea 
                    className="w-full p-3 border border-gray-300 dark:border-yt-border rounded-lg bg-transparent text-yt-text dark:text-yt-textDark h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Tell viewers about your video..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                  <button 
                    onClick={handleGenerateDescription}
                    disabled={isGeneratingAI}
                    className="absolute bottom-2 right-2 flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-md hover:bg-purple-100 transition-colors"
                  >
                    <Sparkles size={12} />
                    {isGeneratingAI ? 'Writing...' : 'Auto-Write with Gemini'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-yt-text dark:text-yt-textDark mb-1">Category</label>
                  <select 
                    className="w-full p-3 border border-gray-300 dark:border-yt-border rounded-lg bg-transparent text-yt-text dark:text-yt-textDark"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as ProjectCategory})}
                  >
                    {dataService.getCategories().map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-yt-text dark:text-yt-textDark mb-1">Duration</label>
                   <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 dark:border-yt-border rounded-lg bg-transparent text-yt-text dark:text-yt-textDark"
                    placeholder="04:20"
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-yt-text dark:text-yt-textDark mb-1">Tags & Tech Stack</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {formData.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 dark:bg-yt-borderDark px-2 py-1 rounded flex items-center gap-1 text-sm text-yt-text dark:text-yt-textDark">
                      {tag} <button onClick={() => setFormData(prev => ({...prev, tags: prev.tags.filter(t => t !== tag)}))}><X size={12}/></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 p-2 border border-gray-300 dark:border-yt-border rounded-lg bg-transparent text-yt-text dark:text-yt-textDark text-sm"
                    placeholder="Add tag (e.g. React)"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTag()}
                  />
                  <Button type="button" size="sm" variant="secondary" onClick={addTag}>Add</Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-yt-text dark:text-yt-textDark mb-1">Skills Used</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {formData.skills.map(skill => (
                    <span key={skill} className="bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded flex items-center gap-1 text-sm text-blue-700 dark:text-blue-300">
                      {skill} <button onClick={() => setFormData(prev => ({...prev, skills: prev.skills.filter(s => s !== skill)}))}><X size={12}/></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 p-2 border border-gray-300 dark:border-yt-border rounded-lg bg-transparent text-yt-text dark:text-yt-textDark text-sm"
                    placeholder="Add skill (e.g. Video Editing)"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSkill()}
                  />
                  <Button type="button" size="sm" variant="secondary" onClick={addSkill}>Add</Button>
                </div>
              </div>
            </div>

            {/* Right Column: Preview & Media */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-yt-text dark:text-yt-textDark mb-1">Thumbnail URL</label>
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-2 relative group">
                   {formData.thumbnail ? (
                     <img src={formData.thumbnail} className="w-full h-full object-cover" alt="Preview" />
                   ) : (
                     <div className="flex items-center justify-center h-full text-gray-500 flex-col gap-2">
                       <Image size={32} />
                       <span className="text-xs">No Image</span>
                     </div>
                   )}
                </div>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 dark:border-yt-border rounded-lg bg-transparent text-yt-text dark:text-yt-textDark text-xs"
                  placeholder="https://..."
                  value={formData.thumbnail}
                  onChange={e => setFormData({...formData, thumbnail: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Paste a direct image link (e.g. from Imgur or Unsplash).</p>
              </div>

              <div>
                 <label className="block text-sm font-medium text-yt-text dark:text-yt-textDark mb-1">Video URL (Embed/Source)</label>
                 <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 dark:border-yt-border rounded-lg bg-transparent text-yt-text dark:text-yt-textDark text-xs"
                  placeholder="https://..."
                  value={formData.videoUrl || ''}
                  onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                />
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-yt-border">
                <div className="flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Project'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-yt-black rounded-xl border border-gray-200 dark:border-yt-borderDark overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-yt-darkGray border-b border-gray-200 dark:border-yt-borderDark">
              <tr>
                <th className="p-4 text-xs font-medium text-yt-meta uppercase">Video</th>
                <th className="p-4 text-xs font-medium text-yt-meta uppercase hidden md:table-cell">Date</th>
                <th className="p-4 text-xs font-medium text-yt-meta uppercase hidden md:table-cell">Views</th>
                <th className="p-4 text-xs font-medium text-yt-meta uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-yt-borderDark">
              {projects.map(project => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-yt-darkGray/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-14 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img src={project.thumbnail} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-medium text-yt-text dark:text-yt-textDark line-clamp-1">{project.title}</h3>
                        <p className="text-xs text-yt-meta line-clamp-1">{project.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-yt-text dark:text-yt-textDark hidden md:table-cell">
                    {project.uploadDate}
                  </td>
                   <td className="p-4 text-sm text-yt-text dark:text-yt-textDark hidden md:table-cell">
                    {project.views}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(project)} className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                 <tr>
                   <td colSpan={4} className="p-8 text-center text-gray-500">
                      No projects found. Create your first one!
                   </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
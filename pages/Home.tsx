import React, { useState, useEffect } from 'react';
import { ProjectCategory, Project } from '../types';
import { dataService } from '../services/dataService';
import { VideoCard } from '../components/VideoCard';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const categories = Object.values(ProjectCategory);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const data = await dataService.getProjects();
      setProjects(data);
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="p-4 md:p-6">
      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 mb-4 sticky top-14 bg-white dark:bg-yt-black z-30 py-3 -mx-4 px-4 md:mx-0 md:px-0">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'All'
              ? 'bg-yt-text text-white dark:bg-white dark:text-black'
              : 'bg-gray-100 text-yt-text hover:bg-gray-200 dark:bg-yt-darkGray dark:text-yt-textDark dark:hover:bg-[#3f3f3f]'
          }`}
        >
          All
        </button>
        {categories.filter(c => c !== 'All').map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-yt-text text-white dark:bg-white dark:text-black'
                : 'bg-gray-100 text-yt-text hover:bg-gray-200 dark:bg-yt-darkGray dark:text-yt-textDark dark:hover:bg-[#3f3f3f]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yt-red"></div>
        </div>
      ) : (
        <>
          {/* Hero / Featured (First project if 'All') */}
          {selectedCategory === 'All' && filteredProjects.length > 0 && (
            <div className="mb-8 hidden md:block">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-5 p-4 flex flex-col justify-center">
                      <h2 className="text-4xl font-bold mb-4 text-yt-text dark:text-yt-textDark">
                          {filteredProjects[0].title}
                      </h2>
                      <p className="text-yt-text dark:text-yt-textDark mb-4 line-clamp-3">
                          {filteredProjects[0].description}
                      </p>
                      <div className="flex gap-2">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-yt-darkGray rounded text-xs text-yt-meta dark:text-yt-metaDark">
                            Featured Case Study
                          </span>
                      </div>
                    </div>
                    <div className="col-span-7 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:opacity-95 transition-opacity">
                      <img src={filteredProjects[0].thumbnail} className="w-full h-full object-cover" alt="Featured" />
                    </div>
                </div>
            </div>
          )}

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {filteredProjects.map(project => (
              <VideoCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-10 text-yt-meta">
                No projects found in this category.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { CheckCircle, MoreVertical } from 'lucide-react';
import { PROFILE } from '../constants';

interface VideoCardProps {
  project: Project;
}

export const VideoCard: React.FC<VideoCardProps> = ({ project }) => {
  return (
    <Link to={`/project/${project.id}`} className="group flex flex-col gap-2 cursor-pointer">
      {/* Thumbnail Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
          {project.duration}
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex gap-3 items-start mt-1">
        <div className="flex-shrink-0">
          <img 
            src={PROFILE.avatar} 
            alt="Avatar" 
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-grow min-w-0">
          <h3 className="text-yt-text dark:text-yt-textDark font-semibold text-base leading-tight line-clamp-2 mb-1 group-hover:text-yt-text">
            {project.title}
          </h3>
          <div className="flex items-center text-yt-meta dark:text-yt-metaDark text-sm hover:text-yt-text dark:hover:text-yt-textDark transition-colors">
            {PROFILE.name}
            <CheckCircle size={14} className="ml-1 text-yt-meta dark:text-yt-metaDark fill-current" />
          </div>
          <div className="text-yt-meta dark:text-yt-metaDark text-sm truncate">
            {project.views} views • {project.uploadDate}
          </div>
        </div>
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
            <MoreVertical size={20} className="text-yt-text dark:text-yt-textDark" />
          </button>
        </div>
      </div>
    </Link>
  );
};

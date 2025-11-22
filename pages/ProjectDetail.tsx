import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PROFILE, INITIAL_COMMENTS } from '../constants';
import { dataService } from '../services/dataService';
import { Project } from '../types';
import { Button } from '../components/Button';
import { generateProjectDescription, createChatSession } from '../services/geminiService';
import { ThumbsUp, ThumbsDown, Share, Scissors, MoreHorizontal, Send, Sparkles, User, Bot } from 'lucide-react';
import { ChatMessage, Comment } from '../types';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [aiDescription, setAiDescription] = useState<string>('');
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  
  // Chat State
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Comment State
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');

  // Load Project Data
  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      const data = await dataService.getProjectById(id);
      if (data) {
        setProject(data);
        setAiDescription(data.aiDescription || '');
        
        // Initialize chat
        try {
          chatSessionRef.current = createChatSession(data);
        } catch (e) {
          console.error("Failed to init chat", e);
        }
        setMessages([{ id: 'init', role: 'model', text: `Hi! I'm Sagar's AI assistant. Ask me anything about "${data.title}" or my skills!`, timestamp: Date.now() }]);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  // Auto scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleGenerateDescription = async () => {
    if (!project) return;
    setIsGeneratingDesc(true);
    const desc = await generateProjectDescription(project);
    setAiDescription(desc);
    setIsGeneratingDesc(false);
    setIsDescExpanded(true);
    
    // Optional: Save this AI description back to the project via dataService if we wanted persistence
    // await dataService.saveProject({ ...project, aiDescription: desc });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !chatSessionRef.current) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      if (!process.env.API_KEY && !chatSessionRef.current.apiKey) {
          setTimeout(() => {
              setMessages(prev => [...prev, { 
                  id: Date.now().toString(), 
                  role: 'model', 
                  text: "Since there is no real API Key configured in this demo environment, I'm simulating a response. In a real app, I would answer specifically about " + project?.title, 
                  timestamp: Date.now() 
              }]);
              setIsThinking(false);
          }, 1000);
          return;
      }

      const result = await chatSessionRef.current.sendMessageStream(userMsg.text);
      let fullText = "";
      const responseId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, { id: responseId, role: 'model', text: '', timestamp: Date.now() }]);

      for await (const chunk of result) {
        fullText += chunk.text;
        setMessages(prev => prev.map(m => m.id === responseId ? { ...m, text: fullText } : m));
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "I encountered an error connecting to Gemini.", timestamp: Date.now() }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handlePostComment = () => {
      if(!newComment.trim()) return;
      const c: Comment = {
          id: Date.now().toString(),
          user: 'Guest User',
          avatar: 'https://ui-avatars.com/api/?name=Guest',
          content: newComment,
          likes: 0,
          timestamp: 'Just now'
      };
      setComments([c, ...comments]);
      setNewComment('');
  };

  if (loading) return <div className="p-10 text-center">Loading Project...</div>;
  if (!project) return <div className="p-10 text-center">Project not found</div>;

  return (
    <div className="flex flex-col lg:flex-row max-w-[1800px] mx-auto p-4 md:p-6 gap-6">
      
      {/* Left Column: Video & Main Content */}
      <div className="flex-1 min-w-0">
        
        {/* Video Player Placeholder */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden relative shadow-lg group">
           <img src={project.thumbnail} className="w-full h-full object-cover opacity-60" alt="Video" />
           <div className="absolute inset-0 flex items-center justify-center">
             <button className="w-16 h-16 bg-yt-red/90 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1"><path d="M8 5v14l11-7z" /></svg>
             </button>
           </div>
           <div className="absolute bottom-0 left-0 right-0 h-1 bg-yt-red"></div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold mt-4 text-yt-text dark:text-yt-textDark">{project.title}</h1>
        
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-2 pb-4 border-b border-gray-200 dark:border-yt-borderDark gap-4">
            <div className="flex items-center gap-3">
                <img src={PROFILE.avatar} alt="Creator" className="w-10 h-10 rounded-full" />
                <div>
                    <h3 className="font-bold text-yt-text dark:text-yt-textDark">{PROFILE.name}</h3>
                    <p className="text-xs text-yt-meta dark:text-yt-metaDark">{PROFILE.subscribers} subscribers</p>
                </div>
                <Button className="ml-4 rounded-full bg-yt-text text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium">Subscribe</Button>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <div className="flex items-center bg-gray-100 dark:bg-yt-darkGray rounded-full h-9">
                    <button className="flex items-center gap-2 px-4 border-r border-gray-300 dark:border-[#3f3f3f] hover:bg-gray-200 dark:hover:bg-[#3f3f3f] rounded-l-full h-full text-sm font-medium text-yt-text dark:text-yt-textDark">
                        <ThumbsUp size={18} /> 1.2K
                    </button>
                    <button className="px-4 hover:bg-gray-200 dark:hover:bg-[#3f3f3f] rounded-r-full h-full text-yt-text dark:text-yt-textDark">
                        <ThumbsDown size={18} />
                    </button>
                </div>
                <Button variant="secondary" size="sm" className="h-9 rounded-full" icon={<Share size={18}/>}>Share</Button>
                <Button variant="secondary" size="sm" className="h-9 rounded-full hidden sm:flex" icon={<Scissors size={18}/>}>Clip</Button>
                <Button variant="secondary" size="sm" className="h-9 w-9 p-0 rounded-full flex items-center justify-center"><MoreHorizontal size={18}/></Button>
            </div>
        </div>

        {/* Description Box */}
        <div className="mt-4 bg-gray-100 dark:bg-yt-darkGray rounded-xl p-4 text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-[#3f3f3f] transition-colors" onClick={() => setIsDescExpanded(!isDescExpanded)}>
            <div className="font-medium text-yt-text dark:text-yt-textDark mb-2">
                {project.views} views • {project.uploadDate} • {project.skills.map(s => `#${s.replace(/\s+/g, '')}`).join(' ')}
            </div>
            
            <div className={`whitespace-pre-line text-yt-text dark:text-yt-textDark ${!isDescExpanded ? 'line-clamp-2' : ''}`}>
                {aiDescription ? (
                    <div className="mb-4 p-3 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
                         <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold mb-1 text-xs uppercase tracking-wider">
                            <Sparkles size={12} /> Gemini Generated
                         </div>
                         {aiDescription}
                    </div>
                ) : (
                    project.description
                )}
                {isDescExpanded && (
                    <div className="mt-4 space-y-2">
                         <p className="font-bold">Tech Stack:</p>
                         <div className="flex flex-wrap gap-2">
                            {project.tags.map(t => (
                                <span key={t} className="px-2 py-1 bg-gray-200 dark:bg-[#3f3f3f] rounded text-xs">{t}</span>
                            ))}
                         </div>
                    </div>
                )}
            </div>
            
            <div className="mt-2">
                 <button className="text-yt-meta dark:text-yt-metaDark font-medium text-sm">
                    {isDescExpanded ? 'Show less' : '...more'}
                 </button>
            </div>
        </div>

        {/* Gemini Action Button */}
        {!aiDescription && (
             <div className="mt-2 flex justify-end">
                 <button 
                    onClick={(e) => { e.stopPropagation(); handleGenerateDescription(); }}
                    disabled={isGeneratingDesc}
                    className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-2 rounded-full transition-colors"
                 >
                    <Sparkles size={16} />
                    {isGeneratingDesc ? 'Generating AI Summary...' : 'Generate AI Summary'}
                 </button>
             </div>
        )}

        {/* Comments Section */}
        <div className="mt-6 hidden lg:block">
            <div className="flex items-center gap-8 mb-6">
                <h3 className="text-xl font-bold text-yt-text dark:text-yt-textDark">{comments.length} Comments</h3>
                <div className="flex items-center gap-2 text-sm font-medium text-yt-text dark:text-yt-textDark">
                    Sort by <span className="font-bold cursor-pointer">Top</span>
                </div>
            </div>

            {/* Add Comment */}
            <div className="flex gap-4 mb-8">
                <img src="https://ui-avatars.com/api/?name=Guest" className="w-10 h-10 rounded-full" alt="User" />
                <div className="flex-1">
                    <input 
                        type="text" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-transparent border-b border-gray-300 dark:border-yt-borderDark pb-1 focus:border-yt-text dark:focus:border-white outline-none text-yt-text dark:text-yt-textDark placeholder-gray-500"
                        placeholder="Add a comment..." 
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <Button variant="ghost" size="sm" onClick={() => setNewComment('')}>Cancel</Button>
                        <Button 
                            variant="primary" 
                            size="sm" 
                            disabled={!newComment.trim()} 
                            className={`rounded-full px-4 ${!newComment.trim() ? 'bg-gray-200 dark:bg-gray-700 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            onClick={handlePostComment}
                        >
                            Comment
                        </Button>
                    </div>
                </div>
            </div>

            {/* Comment List */}
            <div className="space-y-6">
                {comments.map(comment => (
                    <div key={comment.id} className="flex gap-4 group">
                        <img src={comment.avatar} className="w-10 h-10 rounded-full object-cover" alt={comment.user} />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-xs mb-1">
                                <span className="font-bold text-yt-text dark:text-yt-textDark text-sm">{comment.user}</span>
                                <span className="text-yt-meta dark:text-yt-metaDark">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-yt-text dark:text-yt-textDark leading-tight mb-2">{comment.content}</p>
                            <div className="flex items-center gap-4 text-yt-text dark:text-yt-textDark">
                                <div className="flex items-center gap-1">
                                    <ThumbsUp size={14} className="cursor-pointer hover:text-yt-text" />
                                    <span className="text-xs text-yt-meta dark:text-yt-metaDark">{comment.likes}</span>
                                </div>
                                <ThumbsDown size={14} className="cursor-pointer" />
                                <span className="text-xs font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-yt-darkGray px-2 py-1 rounded-full">Reply</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* Right Column: Chat & Sidebar */}
      <div className="lg:w-[350px] xl:w-[400px] flex-shrink-0 flex flex-col gap-4">
        
        {/* Chat Module */}
        <div className="border border-gray-200 dark:border-yt-borderDark rounded-xl bg-white dark:bg-yt-black overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gray-50 dark:bg-yt-darkGray px-4 py-3 border-b border-gray-200 dark:border-yt-borderDark flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-bold text-yt-text dark:text-yt-textDark">Ask Sagar's AI</span>
                </div>
                <button onClick={() => setChatOpen(!chatOpen)} className="text-yt-meta">
                    <MoreHorizontal size={20} />
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-yt-black" ref={chatContainerRef}>
                {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            msg.role === 'user' 
                             ? 'bg-gray-100 dark:bg-yt-darkGray text-yt-text dark:text-yt-textDark' 
                             : 'bg-purple-50 dark:bg-purple-900/20 text-yt-text dark:text-yt-textDark'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><Bot size={16} /></div>
                         <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg px-3 py-2">
                             <div className="flex gap-1">
                                 <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></span>
                                 <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-75"></span>
                                 <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-150"></span>
                             </div>
                         </div>
                    </div>
                )}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-yt-borderDark bg-white dark:bg-yt-black">
                <div className="flex items-center bg-gray-100 dark:bg-yt-darkGray rounded-full px-4 py-2">
                    <input 
                        type="text"
                        placeholder="Ask about skills..."
                        className="bg-transparent flex-1 outline-none text-sm text-yt-text dark:text-yt-textDark"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                        onClick={handleSendMessage} 
                        disabled={!input.trim() || isThinking}
                        className="ml-2 text-yt-meta hover:text-blue-600 disabled:opacity-50"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <div className="text-[10px] text-center text-gray-400 mt-2">
                    AI can make mistakes. Check important info.
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
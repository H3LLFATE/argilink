import { IMAGE_PATHS } from '../../config/imageMasterConfig';
import React, { useState } from 'react';
import { X, Send, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CommunityPost } from '../../types';

export const CreatePostModal: React.FC = () => {
  const { isCreatePostOpen, setIsCreatePostOpen, addCommunityPost } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [crop, setCrop] = useState('Chili');
  const [category, setCategory] = useState<CommunityPost['category']>('Crop Health');
  const [includeDemoPhoto, setIncludeDemoPhoto] = useState(true);

  if (!isCreatePostOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addCommunityPost({
      title: title.trim(),
      content: content.trim(),
      crop,
      category,
      image: includeDemoPhoto
        ? IMAGE_PATHS.chiliLeaf
        : undefined,
    });

    setIsCreatePostOpen(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Ask the Farmer Community</h2>
            <p className="text-[11px] text-stone-500">
              Get answers from experienced farmers and verified mentors
            </p>
          </div>
          <button
            onClick={() => setIsCreatePostOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Question / Issue Title
            </label>
            <input
              type="text"
              placeholder="e.g. Yellowing margins on chili leaves after rain..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Affected Crop
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              >
                <option>Chili</option>
                <option>Paddy Rice</option>
                <option>Durian</option>
                <option>Tomato</option>
                <option>Sweet Corn</option>
                <option>General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CommunityPost['category'])}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              >
                <option>Crop Health</option>
                <option>Pest & Disease</option>
                <option>Farming Tips</option>
                <option>Equipment</option>
                <option>General</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Detailed Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe symptoms, what fertilizers were applied, soil condition, weather, etc."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              required
            />
          </div>

          {/* Photo Attachment Toggle */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-700" />
              <div>
                <div className="text-xs font-bold text-stone-900">Attach Leaf Photo</div>
                <div className="text-[10px] text-stone-500">Includes current crop photo for mentors</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeDemoPhoto}
              onChange={(e) => setIncludeDemoPhoto(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Post to Community</span>
          </button>
        </form>
      </div>
    </div>
  );
};

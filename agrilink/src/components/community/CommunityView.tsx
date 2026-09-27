import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  ShieldCheck,
  Plus,
  Send,
  Star,
  MapPin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CommunityPost } from '../../types';
import { CreatePostModal } from './CreatePostModal';
import { MentorLeaderboardSection } from './MentorLeaderboardSection';

export const CommunityView: React.FC = () => {
  const {
    communityPosts,
    toggleUpvote,
    addComment,
    mentors,
    setSelectedMentorId,
    setIsCreatePostOpen,
    user,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    'post-1': true,
  });
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const categories = ['All', 'Crop Health', 'Pest & Disease', 'Farming Tips', 'General'];

  const filteredPosts = communityPosts.filter((post) => {
    if (selectedCategory === 'All') return true;
    return post.category === selectedCategory;
  });

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleSendComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;
    addComment(postId, text.trim());
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Top Banner & Ask Community */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight">Farmer Community</h2>
          <p className="text-xs text-stone-500 font-medium">
            Knowledge exchange & verified extension answers
          </p>
        </div>

        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Ask Community</span>
        </button>
      </div>

      {/* 🏆 Nationwide Top 10 Mentors Trophy Leaderboard */}
      <MentorLeaderboardSection />

      {/* Verified Agronomy Mentors Strip */}
      <div className="bg-white border border-stone-200 p-3.5 rounded-2xl space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs font-bold text-stone-900">Verified Agronomy Mentors</h3>
          </div>
          <span className="text-[10px] text-stone-400 font-medium">Available for consultation</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {mentors.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMentorId(m.id)}
              className="bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 hover:border-emerald-500 p-2.5 rounded-xl flex items-center gap-2.5 shrink-0 cursor-pointer transition-all"
            >
              <div className="relative">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-600"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                    m.isAvailable ? 'bg-emerald-500' : 'bg-stone-400'
                  }`}
                />
              </div>

              <div>
                <div className="text-xs font-bold text-stone-900 truncate max-w-[120px]">
                  {m.name}
                </div>
                <div className="text-[10px] text-stone-500 truncate max-w-[120px]">
                  {m.specialization[0]}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-amber-600 font-semibold mt-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{m.rating}</span>
                  <span className="text-stone-400">({m.answersCount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Community Posts Feed */}
      <div className="space-y-3.5">
        {filteredPosts.map((post) => {
          const isCommentsOpen = expandedComments[post.id];

          return (
            <article
              key={post.id}
              className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs space-y-3"
            >
              {/* Author & Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-9 h-9 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{post.author}</h4>
                    <div className="flex items-center gap-1 text-[10px] text-stone-500">
                      <span>{post.authorLocation}</span>
                      <span>·</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {post.crop}
                  </span>
                </div>
              </div>

              {/* Title & Content */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 leading-snug">{post.title}</h3>
                <p className="text-xs text-stone-700 mt-1 leading-relaxed">{post.content}</p>
              </div>

              {/* Attached Photo */}
              {post.image && (
                <div className="rounded-xl overflow-hidden max-h-56 bg-stone-100 border border-stone-200">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Verified Mentor Solution Highlight Box */}
              {post.hasVerifiedSolution && post.verifiedSolutionText && (
                <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-xl text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Verified Agronomist Solution</span>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800">
                      {post.verifiedMentorName}
                    </span>
                  </div>
                  <p className="text-stone-800 leading-relaxed text-[11px]">
                    "{post.verifiedSolutionText}"
                  </p>
                </div>
              )}

              {/* Interaction Bar: Upvote & Comments */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-600">
                <button
                  onClick={() => toggleUpvote(post.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors font-semibold ${
                    post.userUpvoted
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'hover:bg-stone-100 text-stone-600'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${post.userUpvoted ? 'fill-emerald-700' : ''}`} />
                  <span>{post.upvotes} Helpful</span>
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-1 px-2.5 py-1 hover:bg-stone-100 rounded-lg text-stone-600 transition-colors font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.comments.length} Comments</span>
                  {isCommentsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Expanded Comments Thread */}
              {isCommentsOpen && (
                <div className="space-y-2 pt-2 border-t border-stone-100 bg-stone-50/50 p-2.5 rounded-xl">
                  {post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white p-2.5 rounded-xl border border-stone-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900">{comment.author}</span>
                          {comment.isMentor && (
                            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                              ✓ {comment.mentorTitle}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400">{comment.timestamp}</span>
                      </div>
                      <p className="text-stone-700 text-[11px] leading-relaxed">{comment.content}</p>
                    </div>
                  ))}

                  {/* Comment Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add an answer or farming tip..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendComment(post.id);
                      }}
                      className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="p-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors"
                      title="Post reply"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <CreatePostModal />
    </div>
  );
};

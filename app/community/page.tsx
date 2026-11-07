'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/components/layout/BottomNav'
import { Plus, Heart, MessageCircle, ChevronRight, ArrowLeft, Send, Filter, Flame, Home } from 'lucide-react'
import { timeAgo } from '@/lib/utils'
import Link from 'next/link'

const categories = [
  { id: 'all', label: 'All', emoji: '📋' },
  { id: 'success', label: 'Success', emoji: '🏆' },
  { id: 'struggle', label: 'Struggle', emoji: '💪' },
  { id: 'motivation', label: 'Motivation', emoji: '🔥' },
  { id: 'question', label: 'Question', emoji: '❓' },
  { id: 'advice', label: 'Advice', emoji: '💡' },
]

export default function CommunityPage() {
  const supabase = createClient()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [showNewPost, setShowNewPost] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newCategory, setNewCategory] = useState('general')
  const [newIsAnon, setNewIsAnon] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [replies, setReplies] = useState<any[]>([])
  const [newReply, setNewReply] = useState('')
  const [userStreak, setUserStreak] = useState(0)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data: streak } = await supabase.from('streaks').select('current_days').eq('user_id', user.id).single()
        setUserStreak(streak?.current_days || 0)
      }
      await fetchPosts()
    }
    init()
  }, [])

  const fetchPosts = async (category?: string) => {
    setLoading(true)
    let query = supabase
      .from('posts')
      .select('*, profiles(username, level)')
      .order('created_at', { ascending: false })
      .limit(50)

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    const { data } = await query
    setPosts(data || [])
    setLoading(false)
  }

  const fetchReplies = async (postId: string) => {
    const { data } = await supabase
      .from('replies')
      .select('*, profiles(username)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    setReplies(data || [])
  }

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    fetchPosts(cat)
  }

  const handleLike = async (postId: string) => {
    if (!user) return
    const existing = await supabase.from('post_likes').select('id').eq('post_id', postId).eq('user_id', user.id).single()
    
    if (existing.data) {
      await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', user.id)
      const currentLikes = posts.find(p => p.id === postId)?.likes || 0
      const newLikes = Math.max(0, currentLikes - 1)
      await supabase.from('posts').update({ likes: newLikes }).eq('id', postId)
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: newLikes } : p))
    } else {
      await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id })
      const currentLikes = posts.find(p => p.id === postId)?.likes || 0
      const newLikes = currentLikes + 1
      await supabase.from('posts').update({ likes: newLikes }).eq('id', postId)
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: newLikes } : p))
    }
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newTitle.trim() || !newContent.trim()) return
    setSubmitting(true)

    await supabase.from('posts').insert({
      user_id: user.id,
      title: newTitle,
      content: newContent,
      category: newCategory,
      is_anonymous: newIsAnon,
    })

    setNewTitle('')
    setNewContent('')
    setShowNewPost(false)
    setSubmitting(false)
    fetchPosts(activeCategory)
  }

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newReply.trim() || !selectedPost) return

    await supabase.from('replies').insert({
      post_id: selectedPost.id,
      user_id: user.id,
      content: newReply,
      is_anonymous: true,
    })

    setNewReply('')
    fetchReplies(selectedPost.id)
  }

  const openPost = async (post: any) => {
    setSelectedPost(post)
    fetchReplies(post.id)
  }

  const categoryBadgeColors: Record<string, string> = {
    success: 'bg-green-500/20 text-green-400',
    struggle: 'bg-orange-500/20 text-orange-400',
    motivation: 'bg-red-500/20 text-red-400',
    question: 'bg-blue-500/20 text-blue-400',
    advice: 'bg-purple-500/20 text-purple-400',
    general: 'bg-white/10 text-white/50',
  }

  // Post detail view
  if (selectedPost) {
    return (
      <div className="min-h-screen pb-28">
        <div className="glass-card border-x-0 border-t-0 rounded-none px-4 py-4 sticky top-0 z-40">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <button onClick={() => setSelectedPost(null)} className="text-white/50 hover:text-white">
              <ArrowLeft size={20} />
            </button>
            <div className="font-semibold text-sm flex-1 truncate">{selectedPost.title}</div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 fade-in">
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className={`text-xs px-2 py-0.5 rounded-full ${categoryBadgeColors[selectedPost.category]}`}>
                {selectedPost.category}
              </div>
              <span className="text-xs text-white/30">{timeAgo(selectedPost.created_at)}</span>
              <span className="text-xs text-white/30">•</span>
              <span className="text-xs text-white/40">
                {selectedPost.is_anonymous ? '🎭 Anonymous' : (selectedPost.profiles?.username || 'Warrior')}
              </span>
            </div>
            <h2 className="text-lg font-bold mb-2">{selectedPost.title}</h2>
            <p className="text-white/70 text-sm leading-relaxed">{selectedPost.content}</p>
            <div className="flex items-center gap-4 mt-4">
              <button onClick={() => handleLike(selectedPost.id)} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-red-400 transition-colors">
                <Heart size={14} />
                {selectedPost.likes}
              </button>
              <span className="text-sm text-white/30">{replies.length} replies</span>
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-3">
            {replies.map((r: any) => (
              <div key={r.id} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-white/40">
                    {r.is_anonymous ? '🎭 Anonymous' : (r.profiles?.username || 'Warrior')}
                  </span>
                  <span className="text-xs text-white/20">•</span>
                  <span className="text-xs text-white/30">{timeAgo(r.created_at)}</span>
                </div>
                <p className="text-sm text-white/70">{r.content}</p>
              </div>
            ))}
          </div>

          {/* Reply Input */}
          {user && (
            <form onSubmit={handleReply} className="glass-card p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newReply}
                  onChange={e => setNewReply(e.target.value)}
                  placeholder="Support this warrior..."
                  className="input-field text-sm flex-1"
                />
                <button type="submit" disabled={!newReply.trim()} className="btn-primary px-4 py-2 disabled:opacity-50">
                  <Send size={16} />
                </button>
              </div>
            </form>
          )}
        </div>

        <BottomNav active="community" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="glass-card border-x-0 border-t-0 rounded-none px-4 py-4 sticky top-0 z-40 bg-[#0a0c10]/95 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-black text-lg text-white">Community</h1>
            <p className="text-xs text-white/40">Anonymous. Safe. Supportive.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/60 hover:text-white transition-all">
              <Home size={14} />
              <span>Home</span>
            </Link>
            {user ? (
              <button
                onClick={() => setShowNewPost(true)}
                className="btn-primary py-1.5 px-3.5 text-xs font-bold flex items-center gap-1.5"
              >
                <Plus size={15} />
                <span>Post</span>
              </button>
            ) : (
              <Link
                href="/auth/login?next=/community"
                className="btn-primary py-1.5 px-3.5 text-xs font-bold flex items-center gap-1.5"
              >
                <span>Login to Post</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4 fade-in">
        {/* Your streak badge */}
        {user && (
          <div className="glass-card p-3 flex items-center gap-3 border-orange-500/20">
            <span className="text-xl">🔥</span>
            <div>
              <div className="text-sm font-semibold">Your streak: <span className="gradient-text">{userStreak} days</span></div>
              <div className="text-xs text-white/40">Share your story and inspire others</div>
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Posts */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card p-5 animate-pulse">
                <div className="h-4 bg-white/5 rounded mb-2 w-3/4" />
                <div className="h-3 bg-white/5 rounded mb-1 w-full" />
                <div className="h-3 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🤝</div>
            <p className="text-white/50 font-semibold">Be the first to post</p>
            <p className="text-sm text-white/30 mt-1">Share your story, ask a question, or offer advice</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post: any) => (
              <div
                key={post.id}
                className="community-post"
                onClick={() => openPost(post)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${categoryBadgeColors[post.category] || categoryBadgeColors.general}`}>
                    {categories.find(c => c.id === post.category)?.emoji} {post.category}
                  </span>
                  <span className="text-xs text-white/30 ml-auto">{timeAgo(post.created_at)}</span>
                </div>
                
                <h3 className="font-semibold text-sm mb-1">{post.title}</h3>
                <p className="text-white/50 text-sm line-clamp-2">{post.content}</p>
                
                <div className="flex items-center gap-4 mt-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLike(post.id) }}
                    className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Heart size={12} />
                    {post.likes}
                  </button>
                  <div className="flex items-center gap-1.5 text-xs text-white/30">
                    <MessageCircle size={12} />
                    Reply
                  </div>
                  <div className="ml-auto text-xs text-white/30">
                    {post.is_anonymous ? '🎭 Anon' : (post.profiles?.username || 'Warrior')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center p-4">
          <div className="glass-card p-6 w-full max-w-sm slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Share with Community</h3>
              <button onClick={() => setShowNewPost(false)} className="text-white/40 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmitPost} className="space-y-3">
              <input
                type="text"
                placeholder="Title..."
                className="input-field text-sm"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
              />

              <select
                className="input-field text-sm"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
              >
                <option value="general">General</option>
                <option value="success">Success Story 🏆</option>
                <option value="struggle">Struggling 💪</option>
                <option value="motivation">Motivation 🔥</option>
                <option value="question">Question ❓</option>
                <option value="advice">Advice 💡</option>
              </select>

              <textarea
                placeholder="Share your story, question, or thoughts..."
                className="input-field text-sm resize-none h-28"
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                required
              />

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
                  <div
                    onClick={() => setNewIsAnon(!newIsAnon)}
                    className={`w-9 h-5 rounded-full transition-colors duration-200 ${newIsAnon ? 'bg-orange-500' : 'bg-white/20'} relative cursor-pointer`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${newIsAnon ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </div>
                  Post anonymously
                </label>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowNewPost(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1 disabled:opacity-50">
                  {submitting ? '...' : 'Post 🔥'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav active="community" />
    </div>
  )
}

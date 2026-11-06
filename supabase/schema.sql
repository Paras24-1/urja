-- ============================================
-- URJA APP - Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'hi')),
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  is_anonymous BOOLEAN DEFAULT false,
  bio TEXT,
  age_group TEXT CHECK (age_group IN ('16-18', '19-22', '23-26', '27-30', '30+')),
  motivation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STREAKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.streaks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  current_days INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_days_clean INTEGER DEFAULT 0,
  streak_start_date DATE DEFAULT CURRENT_DATE,
  last_check_in DATE,
  relapses_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RELAPSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.relapses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  trigger TEXT,
  notes TEXT,
  mood_before INTEGER CHECK (mood_before BETWEEN 1 AND 10),
  mood_after INTEGER CHECK (mood_after BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- JOURNALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.journals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  mood INTEGER CHECK (mood BETWEEN 1 AND 10),
  energy INTEGER CHECK (energy BETWEEN 1 AND 10),
  focus INTEGER CHECK (focus BETWEEN 1 AND 10),
  morning_intention TEXT,
  evening_notes TEXT,
  gratitude TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- ============================================
-- COMMUNITY POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'success', 'struggle', 'motivation', 'question', 'advice')),
  likes INTEGER DEFAULT 0,
  is_anonymous BOOLEAN DEFAULT true,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- POST REPLIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.replies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  is_anonymous BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- POST LIKES TABLE (to prevent double liking)
-- ============================================
CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- ============================================
-- ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  name_hi TEXT,
  description TEXT NOT NULL,
  description_hi TEXT,
  icon TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 100,
  condition_type TEXT NOT NULL CHECK (condition_type IN ('streak_days', 'journal_count', 'community_posts', 'urge_resisted', 'days_registered')),
  condition_value INTEGER NOT NULL,
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- ============================================
-- URGE LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.urge_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  duration_minutes INTEGER,
  technique_used TEXT CHECK (technique_used IN ('breathing', 'cold_shower', 'exercise', 'meditation', 'distraction', 'other')),
  success BOOLEAN DEFAULT true,
  notes TEXT
);

-- ============================================
-- TIPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.tips (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  content_hi TEXT,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'urge', 'motivation', 'science', 'spiritual', 'health')),
  author TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BUDDY SYSTEM TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.buddy_pairs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user1_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  user2_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'ended')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_streaks_user_id ON public.streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_journals_user_date ON public.journals(user_id, date);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_replies_post_id ON public.replies(post_id);
CREATE INDEX IF NOT EXISTS idx_urge_logs_user_id ON public.urge_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relapses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.urge_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buddy_pairs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Streaks policies
CREATE POLICY "Streaks visible for leaderboard and user" ON public.streaks FOR SELECT USING (true);
CREATE POLICY "Users can insert their own streak" ON public.streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own streak" ON public.streaks FOR UPDATE USING (auth.uid() = user_id);

-- Journals policies
CREATE POLICY "Users can CRUD their own journals" ON public.journals FOR ALL USING (auth.uid() = user_id);

-- Relapses policies
CREATE POLICY "Users can CRUD their own relapses" ON public.relapses FOR ALL USING (auth.uid() = user_id);

-- Posts policies
CREATE POLICY "Posts are viewable by everyone" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- Replies policies
CREATE POLICY "Replies are viewable by everyone" ON public.replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert replies" ON public.replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own replies" ON public.replies FOR UPDATE USING (auth.uid() = user_id);

-- Post likes policies
CREATE POLICY "Post likes are viewable by everyone" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can like posts" ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike their own likes" ON public.post_likes FOR DELETE USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Achievements are viewable by everyone" ON public.achievements FOR SELECT USING (true);

-- User achievements policies
CREATE POLICY "User achievements are viewable by everyone" ON public.user_achievements FOR SELECT USING (true);
CREATE POLICY "System can insert user achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Urge logs policies
CREATE POLICY "Users can CRUD their own urge logs" ON public.urge_logs FOR ALL USING (auth.uid() = user_id);

-- Tips policies
CREATE POLICY "Tips are viewable by everyone" ON public.tips FOR SELECT USING (true);

-- Buddy pairs policies
CREATE POLICY "Users can view their own buddy pairs" ON public.buddy_pairs FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);
CREATE POLICY "Users can insert buddy pairs" ON public.buddy_pairs FOR INSERT WITH CHECK (auth.uid() = user1_id);
CREATE POLICY "Users can update their own buddy pairs" ON public.buddy_pairs FOR UPDATE USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, age_group, motivation)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1) || '_' || substr(gen_random_uuid()::text, 1, 4)),
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'age_group',
    new.raw_user_meta_data->>'motivation'
  )
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO public.streaks (user_id)
  VALUES (new.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER streaks_updated_at BEFORE UPDATE ON public.streaks FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER journals_updated_at BEFORE UPDATE ON public.journals FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- SEED DATA - Achievements
-- ============================================
INSERT INTO public.achievements (name, name_hi, description, description_hi, icon, xp_reward, condition_type, condition_value, rarity) VALUES
('First Day', 'पहला दिन', 'Complete your first day clean', 'पहला दिन साफ पूरा करें', '🌱', 50, 'streak_days', 1, 'common'),
('3 Day Warrior', '3 दिन योद्धा', 'Maintain a 3-day streak', '3 दिन की स्ट्रीक बनाए रखें', '⚡', 100, 'streak_days', 3, 'common'),
('One Week Strong', 'एक सप्ताह मजबूत', 'Complete 7 days clean', '7 दिन साफ पूरा करें', '🔥', 200, 'streak_days', 7, 'common'),
('Two Week Champion', 'दो सप्ताह चैंपियन', 'Maintain a 14-day streak', '14 दिन की स्ट्रीक बनाए रखें', '🏅', 350, 'streak_days', 14, 'rare'),
('21 Day Transformer', '21 दिन परिवर्तक', 'Complete the 21-day habit change cycle', '21 दिन की आदत बदलाव पूरा करें', '💎', 500, 'streak_days', 21, 'rare'),
('One Month Legend', 'एक महीना किंवदंती', 'Complete 30 days clean', '30 दिन साफ पूरा करें', '👑', 1000, 'streak_days', 30, 'epic'),
('Brahmacharya Master', 'ब्रह्मचर्य मास्टर', 'Complete 90 days — full transformation', '90 दिन — पूर्ण परिवर्तन', '🕉️', 5000, 'streak_days', 90, 'legendary'),
('Journal Keeper', 'डायरी लेखक', 'Write 7 journal entries', '7 डायरी प्रविष्टियां लिखें', '📖', 150, 'journal_count', 7, 'common'),
('Community Pillar', 'समुदाय स्तंभ', 'Make 10 community posts', '10 समुदाय पोस्ट करें', '🤝', 200, 'community_posts', 10, 'common'),
('Urge Slayer', 'आवेग विजेता', 'Resist 10 urges using the SOS tool', '10 आवेगों को SOS टूल से जीतें', '⚔️', 300, 'urge_resisted', 10, 'rare');

-- ============================================
-- SEED DATA - Tips
-- ============================================
INSERT INTO public.tips (content, content_hi, category, author) VALUES
('Every urge lasts only 15-20 minutes. Just delay, then it fades.', 'हर आवेग केवल 15-20 मिनट तक रहता है। बस देरी करें, फिर यह फीका पड़ जाता है।', 'urge', 'Science'),
('Cold showers are nature''s reset button. Take one right now.', 'ठंडा शॉवर प्रकृति का रीसेट बटन है। अभी एक लें।', 'urge', 'Health'),
('Your brain can rewire itself. Every day clean is new neural pathways.', 'आपका दिमाग खुद को फिर से जोड़ सकता है। हर साफ दिन नए नेटवर्क बनाता है।', 'science', 'Neuroscience'),
('Brahmacharya is not repression — it is redirection of energy to greater goals.', 'ब्रह्मचर्य दमन नहीं है — यह ऊर्जा को महान लक्ष्यों की ओर पुनर्निर्देशन है।', 'spiritual', 'Swami Vivekananda'),
('The urge is not you. It is just a wave. You are the ocean.', 'आवेग आप नहीं हैं। यह केवल एक लहर है। आप समुद्र हैं।', 'motivation', 'Urja'),
('Do 20 push-ups every time you feel the urge. Build strength instead.', 'जब भी आवेग महसूस हो 20 पुशअप करें। इसके बजाय ताकत बनाएं।', 'urge', 'Fitness'),
('Dopamine fasting: avoid screens for 1 hour in the morning. Watch your clarity grow.', 'डोपामाइन उपवास: सुबह 1 घंटे स्क्रीन से बचें। अपनी स्पष्टता बढ़ते देखें।', 'health', 'Science'),
('Write down WHY you started. Read it every morning.', 'लिखें कि आपने क्यों शुरू किया। हर सुबह इसे पढ़ें।', 'motivation', 'Psychology'),
('After 7 days, testosterone rises by 45%. You will feel it.', '7 दिनों के बाद, टेस्टोस्टेरोन 45% बढ़ता है। आप इसे महसूस करेंगे।', 'science', 'Research'),
('Sleep by 10 PM. Night is when most relapses happen.', 'रात 10 बजे तक सो जाएं। रात में ही अधिकतर रिलैप्स होते हैं।', 'health', 'Urja');

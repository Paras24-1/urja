export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          language: string
          level: number
          xp: number
          is_anonymous: boolean
          bio: string | null
          age_group: string | null
          motivation: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          language?: string
          level?: number
          xp?: number
          is_anonymous?: boolean
          bio?: string | null
          age_group?: string | null
          motivation?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          language?: string
          level?: number
          xp?: number
          is_anonymous?: boolean
          bio?: string | null
          age_group?: string | null
          motivation?: string | null
          updated_at?: string
        }
      }
      streaks: {
        Row: {
          id: string
          user_id: string
          current_days: number
          longest_streak: number
          total_days_clean: number
          streak_start_date: string
          last_check_in: string | null
          relapses_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_days?: number
          longest_streak?: number
          total_days_clean?: number
          streak_start_date?: string
          last_check_in?: string | null
          relapses_count?: number
        }
        Update: {
          current_days?: number
          longest_streak?: number
          total_days_clean?: number
          streak_start_date?: string
          last_check_in?: string | null
          relapses_count?: number
          updated_at?: string
        }
      }
      journals: {
        Row: {
          id: string
          user_id: string
          date: string
          mood: number | null
          energy: number | null
          focus: number | null
          morning_intention: string | null
          evening_notes: string | null
          gratitude: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          mood?: number | null
          energy?: number | null
          focus?: number | null
          morning_intention?: string | null
          evening_notes?: string | null
          gratitude?: string | null
        }
        Update: {
          mood?: number | null
          energy?: number | null
          focus?: number | null
          morning_intention?: string | null
          evening_notes?: string | null
          gratitude?: string | null
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          category: string
          likes: number
          is_anonymous: boolean
          is_pinned: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          category?: string
          likes?: number
          is_anonymous?: boolean
          is_pinned?: boolean
        }
        Update: {
          title?: string
          content?: string
          category?: string
          likes?: number
          is_anonymous?: boolean
          updated_at?: string
        }
      }
      replies: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          likes: number
          is_anonymous: boolean
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          likes?: number
          is_anonymous?: boolean
        }
        Update: {
          content?: string
          likes?: number
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          name_hi: string | null
          description: string
          description_hi: string | null
          icon: string
          xp_reward: number
          condition_type: string
          condition_value: number
          rarity: string
          created_at: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
      }
      urge_logs: {
        Row: {
          id: string
          user_id: string
          timestamp: string
          duration_minutes: number | null
          technique_used: string | null
          success: boolean
          notes: string | null
        }
        Insert: {
          id?: string
          user_id: string
          timestamp?: string
          duration_minutes?: number | null
          technique_used?: string | null
          success?: boolean
          notes?: string | null
        }
      }
      tips: {
        Row: {
          id: string
          content: string
          content_hi: string | null
          category: string
          author: string | null
          created_at: string
        }
      }
      relapses: {
        Row: {
          id: string
          user_id: string
          date: string
          trigger: string | null
          notes: string | null
          mood_before: number | null
          mood_after: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          trigger?: string | null
          notes?: string | null
          mood_before?: number | null
          mood_after?: number | null
        }
      }
    }
  }
}

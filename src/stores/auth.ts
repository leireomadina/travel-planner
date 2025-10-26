import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase.js'
import type { User, Session } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    setAuthData(data)
  }

  const setAuthData = (data: { user: User | null; session: Session | null }) => {
    user.value = data?.user ?? null
    session.value = data?.session ?? null
  }

  return {
    user,
    session,
    login,
  }
})

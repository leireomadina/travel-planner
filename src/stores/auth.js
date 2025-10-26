import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    setAuthData(data)
  }

  const setAuthData = (data) => {
    user.value = data?.user ?? null
    session.value = data?.session ?? null
  }

  return {
    user,
    session,
    login,
  }
})

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()
  // Kept in sync by @nuxtjs/supabase on login, logout, token refresh and page reload
  const user = useSupabaseUser()
  const session = useSupabaseSession()

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  }

  const register = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) throw error
  }

  return {
    user,
    session,
    login,
    register,
    logout,
  }
})

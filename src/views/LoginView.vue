<template>
  <h2 class="text-xl text-center">Login</h2>
  <form
    @submit.prevent="loginUser"
    class="max-w-md mx-auto my-5 px-5"
  >
    <label
      class="input validator block w-full mt-4"
      for="email"
    >
      Email
      <input
        v-model="userEmail"
        type="email"
        required
        id="email"
        name="email"
        placeholder="Type your email"
      />
    </label>
    <label
      class="input validator block w-full mt-4"
      for="password"
    >
      Password
      <input
        v-model="userPassword"
        type="password"
        id="password"
        name="password"
        required
        placeholder="Type your password"
      />
    </label>
    <button
      type="submit"
      class="btn btn-neutral btn-block mt-4"
    >
      Send
    </button>
  </form>
  <span
    v-if="isLoading"
    class="loading loading-spinner text-info"
  ></span>
  <p v-if="loginError">We're sorry, but the user or password is incorrect.</p>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { supabase } from '@/lib/supabase.js'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const userEmail = ref('')
  const userPassword = ref('')
  const isLoading = ref(false)
  const loginError = ref(false)

  const loginUser = async () => {
    loginError.value = false
    try {
      isLoading.value = true
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail.value,
        password: userPassword.value,
      })
      // TODO: store user info in Pinia store
      // data is an object with user and session info objects
      if (error) {
        throw error
      }
      router.push({ name: 'Home' })
    } catch (error) {
      if (error instanceof Error) {
        loginError.value = true
      }
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <h2 class="text-xl text-center">Register</h2>
  <form
    @submit.prevent="registerNewUser"
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
  <p v-if="isRegisterSuccessful">Check your email to confirm registration.</p>
  <p v-else-if="registerError">We're sorry, there has been an error. Check again later.</p>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { supabase } from '@/lib/supabase.js'

  const userEmail = ref('')
  const userPassword = ref('')
  const isLoading = ref(false)
  const isRegisterSuccessful = ref(false)
  const registerError = ref(false)

  const registerNewUser = async () => {
    try {
      isLoading.value = true
      const { error } = await supabase.auth.signUp({
        email: userEmail.value,
        password: userPassword.value,
      })
      if (error) {
        throw error
      }
      isRegisterSuccessful.value = true
    } catch (error) {
      if (error instanceof Error) {
        registerError.value = true
      }
    } finally {
      isLoading.value = false
    }
  }
</script>

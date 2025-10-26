<template>
  <h2 class="text-xl text-center">Login</h2>
  <form
    class="max-w-md mx-auto my-5 px-5"
    @submit.prevent="loginUser"
  >
    <label
      class="input validator block w-full mt-4"
      for="email"
    >
      Email
      <input
        v-model="userEmail"
        id="email"
        type="email"
        required
        :disabled="isLoading"
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
        id="password"
        type="password"
        name="password"
        required
        :disabled="isLoading"
        placeholder="Type your password"
      />
    </label>
    <button
      type="submit"
      class="btn btn-neutral btn-block mt-4"
      :disabled="isLoading"
    >
      Sign in
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
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  const router = useRouter()
  const authStore = useAuthStore()

  const userEmail = ref('')
  const userPassword = ref('')
  const isLoading = ref(false)
  const loginError = ref(false)

  const loginUser = async () => {
    loginError.value = false

    try {
      isLoading.value = true
      await authStore.login(userEmail.value, userPassword.value)
      await router.push({ name: 'Home' })
    } catch (error) {
      if (error instanceof Error) {
        loginError.value = true
      }
    } finally {
      isLoading.value = false
    }
  }
</script>

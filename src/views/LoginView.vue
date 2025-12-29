<template>
  <h2
    class="text-xl text-center"
    data-cy="login-title"
  >
    Login
  </h2>
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
        :disabled="isLoading"
        id="email"
        data-cy="login-email"
        name="email"
        placeholder="Type your email"
        required
        type="email"
      />
    </label>
    <label
      class="input validator block w-full mt-4"
      for="password"
    >
      Password
      <input
        v-model="userPassword"
        :disabled="isLoading"
        id="password"
        data-cy="login-password"
        name="password"
        placeholder="Type your password"
        required
        type="password"
      />
    </label>
    <button
      :disabled="isLoading"
      class="btn btn-neutral btn-block mt-4"
      data-cy="login-submit"
      type="submit"
    >
      Sign in
    </button>
    <router-link
      :to="{ name: 'RecoverPassword' }"
      class="btn btn-link mt-3 pl-0"
      data-cy="forgot-password"
    >
      Forgot password?
    </router-link>
  </form>
  <loading-spinner
    v-if="isLoading"
    ariaLabel="Logging in"
  />
  <p
    v-if="loginError"
    class="text-red-500 mt-2 block"
    data-cy="login-error"
    role="alert"
  >
    We're sorry, but the user or password is incorrect.
  </p>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import LoadingSpinner from '@/components/LoadingSpinner.vue'

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

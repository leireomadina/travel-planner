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
      class="block w-full mt-4 text-sm font-medium text-black"
      for="email"
    >
      Email
      <input
        v-model="userEmail"
        :disabled="isLoading"
        id="email"
        class="mt-1 block w-full border border-black rounded px-3 py-2 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
        data-cy="login-email"
        name="email"
        placeholder="Type your email"
        required
        type="email"
      />
    </label>
    <label
      class="block w-full mt-4 text-sm font-medium text-black"
      for="password"
    >
      Password
      <input
        v-model="userPassword"
        :disabled="isLoading"
        id="password"
        class="mt-1 block w-full border border-black rounded px-3 py-2 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
        data-cy="login-password"
        name="password"
        placeholder="Type your password"
        required
        type="password"
      />
    </label>
    <button
      :disabled="isLoading"
      class="w-full mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      data-cy="login-submit"
      type="submit"
    >
      Sign in
    </button>
  </form>
  <loading-spinner
    v-if="isLoading"
    ariaLabel="Logging in"
    class="mx-auto"
  />
  <p
    v-if="loginError"
    class="text-red-500 mt-2 block text-center"
    data-cy="login-error"
    role="alert"
  >
    We're sorry, but the user or password is incorrect.
  </p>
</template>

<script setup lang="ts">
  definePageMeta({ name: 'Login' })

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

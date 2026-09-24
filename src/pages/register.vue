<template>
  <h2
    class="text-xl text-center"
    data-cy="register-title"
  >
    Register
  </h2>
  <form
    class="max-w-md mx-auto my-5 px-5"
    @submit.prevent="registerNewUser"
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
        data-cy="register-email"
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
        data-cy="register-password"
        name="password"
        placeholder="Type your password"
        required
        type="password"
      />
    </label>
    <button
      :disabled="isLoading"
      class="w-full mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      data-cy="register-submit"
      type="submit"
    >
      Create a new account
    </button>
  </form>
  <loading-spinner
    v-if="isLoading"
    ariaLabel="Registering"
    class="mx-auto"
  />
  <p
    v-else-if="isRegisterSuccessful"
    class="text-center"
    data-cy="register-successful"
  >
    Check your email to confirm registration.
  </p>
  <p
    v-else-if="registerError"
    class="text-red-500 text-center"
    data-cy="register-error"
    role="alert"
  >
    We're sorry, there has been an error. Check again later.
  </p>
</template>

<script setup lang="ts">
  definePageMeta({ name: 'Register' })

  const authStore = useAuthStore()

  const userEmail = ref('')
  const userPassword = ref('')
  const isLoading = ref(false)
  const isRegisterSuccessful = ref(false)
  const registerError = ref(false)

  const registerNewUser = async () => {
    registerError.value = false

    try {
      isLoading.value = true
      await authStore.register(userEmail.value, userPassword.value)
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

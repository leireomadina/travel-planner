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
      class="input validator block w-full mt-4"
      for="email"
    >
      Email
      <input
        v-model="userEmail"
        :disabled="isLoading"
        id="email"
        data-cy="register-email"
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
        data-cy="register-password"
        name="password"
        placeholder="Type your password"
        required
        type="password"
      />
    </label>
    <button
      :disabled="isLoading"
      class="btn btn-neutral btn-block mt-4"
      data-cy="register-submit"
      type="submit"
    >
      Create a new account
    </button>
  </form>
  <span
    v-if="isLoading"
    class="loading loading-spinner text-info"
    data-cy="loading-spinner"
  ></span>
  <p
    v-if="isRegisterSuccessful"
    data-cy="register-successful"
  >
    Check your email to confirm registration.
  </p>
  <p
    v-else-if="registerError"
    data-cy="register-error"
  >
    We're sorry, there has been an error. Check again later.
  </p>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'

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

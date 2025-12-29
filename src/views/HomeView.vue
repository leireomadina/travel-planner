<template>
  <div class="p-4">
    <h2>Home</h2>
    <p>{{ $t('hello') }}</p>
    <button
      :disabled="isLoading"
      class="btn btn-neutral mt-4 mb-2"
      data-cy="logout-submit"
      type="button"
      @click="logOutUser"
    >
      {{ isLoading ? 'Logging out…' : 'Log out' }}
    </button>
    <loading-spinner
      v-if="isLoading"
      ariaLabel="Logging out"
    />
    <p
      v-if="logoutError"
      class="text-red-500 mt-2 block"
      data-cy="logout-error"
      role="alert"
    >
      Something went wrong while logging out. Please try again.
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import LoadingSpinner from '@/components/LoadingSpinner.vue'

  const authStore = useAuthStore()
  const router = useRouter()

  const logoutError = ref(false)
  const isLoading = ref(false)

  const logOutUser = async () => {
    isLoading.value = true

    try {
      await authStore.logout()
      await router.push({ name: 'Login' })
    } catch (error) {
      if (error instanceof Error) {
        logoutError.value = true
      }
    } finally {
      isLoading.value = false
    }
  }
</script>

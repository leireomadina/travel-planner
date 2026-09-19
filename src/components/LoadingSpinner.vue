<template>
  <output
    :aria-label="ariaLabel"
    class="spinner animate-spin h-8 w-8 border-2 border-current rounded-full"
    data-cy="loading-spinner"
  ></output>
</template>

<script setup lang="ts">
  defineProps({
    ariaLabel: {
      type: String,
      required: true,
    },
  })
</script>

<template>
  <output
    :aria-label="ariaLabel"
    class="loading loading-spinner text-info"
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

<template>
  <component
    :is="icon"
    :color="color"
    :size="size"
  />
</template>

<script setup lang="ts">
  defineProps({
    icon: {
      // Lucide icon component
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 24,
      validator: (value: number) => value > 0,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
  })
</script>

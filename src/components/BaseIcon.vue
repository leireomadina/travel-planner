<template>
  <component
    :is="icon"
    :color="color"
    :size="size"
  />
</template>

<script setup lang="ts">
  import type { Component, PropType } from 'vue'

  defineProps({
    icon: {
      // Lucide icon component (can be Object or Function)
      type: [Object, Function] as PropType<Component>,
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

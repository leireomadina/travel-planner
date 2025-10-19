<template>
  <header class="flex items-center gap-2 my-5 px-5 text-center text-xl">
    <BaseIcon
      :icon="Plane"
      color="lightgreen"
    />
    <h1>Travel planner</h1>
  </header>
  <router-view></router-view>
</template>

<script setup lang="ts">
  import BaseIcon from '@/components/BaseIcon.vue'
  import { Plane } from 'lucide-vue-next'
</script>

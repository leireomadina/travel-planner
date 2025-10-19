<template>
  <h1>You did it!</h1>
  <p class="text-blue-600 text-center">{{ $t('hello') }}</p>
  <p>
    Visit
    <a
      href="https://vuejs.org/"
      target="_blank"
      rel="noopener"
      >vuejs.org</a
    >
    to read the documentation
  </p>
  <BaseIcon
    :icon="LucideHome"
    color="lightgreen"
  />
</template>

<script setup lang="ts">
  import BaseIcon from '@/components/BaseIcon.vue'
  import { LucideHome } from 'lucide-vue-next'
  import { supabase } from '@/lib/supabase.js'

  console.log('supabase client:', supabase)
</script>

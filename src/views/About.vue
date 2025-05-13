<template>
  <div>
    <h1>About Page</h1>
    <p>Double Count: {{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment">Increase Count</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '../stores/counter'

const counterStore = useCounterStore()
</script>
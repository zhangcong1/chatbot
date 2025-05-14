<template>
  <div>
    <h1>Home Page</h1>
    <p>Count: {{ counterStore.count }}</p>
    <button @click="counterStore.increment">Increment</button>
    <button @click="counterStore.decrement">Decrement</button>
    <SvgIcon icon-class="vue" />
    <a-button type="primary">Arco 按钮</a-button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/stores/counter'
import { useRoute } from 'vue-router'

const counterStore = useCounterStore()
const route = useRoute()
const userKey = route.params.userKey
console.log(userKey)
</script>

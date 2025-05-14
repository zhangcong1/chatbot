<template>
  <div>
    <h1>Home Page</h1>
    <p>Count: {{ counterStore.count }}</p>
    <button @click="counterStore.increment">Increment</button>
    <button @click="counterStore.decrement">Decrement</button>
    <!-- 添加 count 交互 -->
    <p>useState Count: {{ count }}</p>
    <button @click="setCount(count + 1)">Increase Count</button>
    <!-- 添加 user 交互 -->
    <p>User Name: {{ user.name }}, Age: {{ user.age }}</p>
    <button @click="setUser({ ...user, age: user.age + 1 })">Increase Age</button>
    <SvgIcon icon-class="vue" />
    <a-button type="primary">Arco 按钮</a-button>
  </div>
</template>

<script setup lang="ts">
import { useState } from '@/utils/hooks';
import useCounterStore from '@/stores/counter'
import { useRoute } from 'vue-router'

// 使用 ref 示例
const [count, setCount] = useState(0);
// 使用 reactive 示例
const [user, setUser] = useState({ name: 'John', age: 30 });
const counterStore = useCounterStore()
const route = useRoute()
const userKey = route.params.userKey
console.log(userKey)
</script>

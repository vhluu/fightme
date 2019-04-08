<template>
  <div>
    <h3>{{nickname}}</h3>
    <h4 v-if="type == 'fire'">Fire 🔥</h4>
    <h4 v-else-if="type == 'water'">Water 🌊</h4>
    <h4 v-else-if="type == 'earth'">Earth ⛰️</h4>
    <h4 v-else-if="type == 'air'">Air 💨</h4>
  </div>
</template>

<script>
export default {
  props: ['type', 'nickname']
}
</script>


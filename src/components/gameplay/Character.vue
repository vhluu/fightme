<template>
  <div>
    <div v-if="type == 'fire'">Fire 🔥</div>
    <div v-else-if="type == 'water'">Water 🌊</div>
    <div v-else-if="type == 'earth'">Earth ⛰️</div>
    <div v-else-if="type == 'air'">Air 💨</div>
  </div>
</template>

<script>
export default {
  props: ['type']
}
</script>


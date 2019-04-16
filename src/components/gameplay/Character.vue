<template>
  <div>
    <h3>{{nickname}}</h3>
    <div v-if="type == 'fire'">
      <img src="../../assets/fire_dino.png" alt="Fire Dino">
      <h4>Fire 🔥</h4>
    </div>
    <div v-else-if="type == 'water'">
      <img src="../../assets/water_dino.png" alt="Water Dino">
      <h4>Water 🌊</h4>
    </div>
    <div v-else-if="type == 'earth'">
      <img src="../../assets/earth_dino.png" alt="Earth Dino">
      <h4>Earth ⛰️</h4>
    </div>
    <div v-else-if="type == 'air'">
      <img src="../../assets/air_dino.png" alt="Air Dino">
      <h4>Air 💨</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'nickname']
}
</script>


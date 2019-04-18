<template>
  <div class="character">
    <div v-if="type == 'fire'">
      <img src="../../assets/fire_dino.png" alt="Fire Dino">
    </div>
    <div v-else-if="type == 'water'">
      <img src="../../assets/water_dino.png" alt="Water Dino">
    </div>
    <div v-else-if="type == 'earth'">
      <img src="../../assets/earth_dino.png" alt="Earth Dino">
    </div>
    <div v-else-if="type == 'air'">
      <img src="../../assets/air_dino.png" alt="Air Dino">
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'nickname']
}
</script>



<template>
  <div class="healthbar">
    <div
      class="healthbar text-center"
      style="background-color: green; margin: 0; color: white;"
      :style="{width: hp + '%'}">
      {{ hp }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hp: {
      type: Number
    }
  }
}
</script>

<style scoped>
.healthbar {
  width: 80%;
  height: 40px;
  background-color: #eee;
  margin: auto;
  transition: width 500ms;
}
</style>


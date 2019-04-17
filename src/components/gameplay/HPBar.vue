<template>
  <div class="healthbar">
    <div
      class="healthbar text-center"
      style="background-color: #58D68D; margin: 0; color: white;"
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
  line-height: 40px;
  font-weight: bold;
}
</style>


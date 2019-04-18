<template>
  <div class="healthbar">
    <div
      class="healthbar text-center"
      style="background-color: rgb(181,212,146); margin: 0; color: white;"
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
  /* width: 70%; */
  height: 25px;
  background-color: #eee;
  transition: width 500ms;
  line-height: 25px;
  font-weight: bold;
}

@media only screen and (min-width: 768px) {
  .healthbar {
    height: 30px;
    line-height: 30px;
  }
}
</style>


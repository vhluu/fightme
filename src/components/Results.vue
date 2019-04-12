<template>
  <div class="results">
    <div v-if="$myGlobalVars.won">You won!!</div>
    <div v-else>You lost :(</div>
    <button @click="goHome">Finish Game</button>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

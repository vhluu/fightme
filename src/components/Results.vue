<template>
  <div class="results">
    <div v-if="$myGlobalVars.won">
      <h1>You won!!</h1>
      <div class="character-result">
        <img class="crown" :class="$myGlobalVars.chosenType" src="../assets/crown.png" alt="">
        <app-character class="results" :type="$myGlobalVars.chosenType"></app-character>
      </div>
    </div>
    <div v-else>
      <h1>You lost :(</h1>
      <div class="character-result">
        <img class="crown" :class="$myGlobalVars.chosenType" src="../assets/crown.png" alt="">
        <app-character class="results" :type="$myGlobalVars.chosenType"></app-character>
      </div>
    </div>
    <div class="btn" @click="goHome">Finish Game</div>
  </div>
</template>

<script>
import Character from './gameplay/Character.vue';

export default {
  components: {
    'app-character': Character
  },
  methods: {
    goHome() {
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style>
.character-result {
  position: relative;
}

.results.character img {
  height: 47vw;
}

.crown {
  position: absolute;
}
.crown.water {
  width: 10%;
  left: 33%;
  top: -2%;
  transform: rotate(18deg);
}
.crown.fire {
  width: 11%;
  left: 42%;
  transform: rotate(11deg);
  top: 1%;
}
.crown.earth {
  width: 9%;
  left: 22%;
  top: 52.5%;
}
.crown.air {
  left: 43%;
  transform: rotate(32deg);
  width: 9%;
  top: 4%;
}
</style>

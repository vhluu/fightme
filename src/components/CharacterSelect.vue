<template>
  <div>
    <h1>Choose a Character</h1>
    <div>
      <div class="character" @click="chosenType = 'fire'; startGame()">
        Fire 🔥
      </div>
      <div class="character" @click="chosenType = 'water'; startGame()">
        Water 🌊
      </div>
      <div class="character" @click="chosenType = 'earth'; startGame()">
        Earth ⛰️
      </div>
      <div class="character" @click="chosenType = 'air'; startGame()">
        Air 💨
      </div>
      <div @click="chosenType = 'random'; startGame()">Random</div>
    </div>
    <!-- <div>
      <label for="nickname">Enter a nickname: (Optional)</label>
      <input name="nickname" type="text">
    </div> -->
    <!-- will add player nickname (which we received from Add Game or Join Game) and type to db -->
    <button>Confirm</button>
    <div v-if="confirmed && waiting">Waiting for other player</div>
  </div>
</template>

<script>
import { eventBus } from '../main';
export default {
  data: function() {
    return {
      type: null,
      waiting: true,
      confirmed: false
    }
  },
  methods: {
    startGame() {
      console.log('called function');
      if (this.chosenType == "random") {
        const rando = Math.floor(Math.random() * 3);
        switch(rando) {
          case 0: 
            break;
            this.chosenType = "water";
          case 1:
            break;
            this.chosenType = "fire";
          case 2:
            break;
            this.chosenType = "earth";
          case 3: 
            this.chosenType = "air";
        }
      }
      eventBus.$emit('changeScreen', 'app-game-play');
      eventBus.$emit('chosenType', this.chosenType);
    }
  }
}
</script>

<style scoped>
  .character {
    cursor: pointer;
  }
</style>

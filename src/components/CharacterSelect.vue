<template>
  <div>
    <h1>Choose Your Fighter</h1>
    <div class="flex space-between">
      <div class="card character tablet-col-2" @click="chosenType = 'fire'; startGame()">
        <img src="../assets/fire_dino.png">
        <h3>Fire 🔥</h3>
      </div>
      <div class="card character tablet-col-2" @click="chosenType = 'water'; startGame()">
        <img src="../assets/water_dino.png">
        <h3>Water 🌊</h3>
      </div>
      <div class="card character tablet-col-2" @click="chosenType = 'earth'; startGame()">
        <img src="../assets/earth_dino.png">
        <h3>Earth ⛰️</h3>
      </div>
      <div class="card character tablet-col-2" @click="chosenType = 'air'; startGame()">
        <img src="../assets/air_dino.png">
        <h3>Air 💨</h3>
      </div>
      <div class="card tablet-col-2" @click="chosenType = 'random'; startGame()">Random</div>
    </div>
    <div v-if="playerChosen && waiting">Waiting for other player</div>
  </div>
</template>

<script>
import { eventBus } from '../main';
import * as io from 'socket.io-client';
export default {
  data: function() {
    return {
      type: null,
      waiting: true,
      confirmed: false,
      socket: io('https://salty-brook-12582.herokuapp.com/'),
      playerChosen: false,
      player2Chosen: false,
      gameID: ''
    }
  },
  mounted() {
    this.gameID = this.$route.params.id
    this.socket.on('chose-type', function(data) {
      console.log(this.gameID);
      if(data.game == this.gameID) {
        // we want to wait for the current player to choose 
        this.player2Chosen = true;
        this.$myGlobalVars.nickname2 = data.nickname;
        this.$myGlobalVars.chosenType2 = data.type;
      }
    }.bind(this));
  },
  watch: {
    playerChosen: function(value) {
      if (value && this.player2Chosen) {
        console.log(this.gameID);
        this.$router.push({
          name: 'GamePlay',
          params: { id: this.gameID }
        });
      }   
    },
    player2Chosen: function(value) {
      if (value && this.playerChosen) {
        console.log(this.gameID);
        this.$router.push({
          name: 'GamePlay',
          params: { id: this.gameID }
        });
      }
    }
  },
  methods: {
    startGame() {
      // need to notify other user that they chosen
      // need to wait for the other user to choose
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

      this.$myGlobalVars.chosenType = this.chosenType;
      this.socket.emit('chose-type', { game: this.gameID, type: this.chosenType, nickname: this.$myGlobalVars.nickname });
      this.playerChosen = true;
    }
  }
}
</script>

<style scoped>
  .character {
    cursor: pointer;
  }
</style>

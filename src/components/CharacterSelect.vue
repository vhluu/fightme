<template>
  <div class="inner">
    <h1>Choose Your Fighter</h1>
    <div class="flex space-between">
      <div class="card card-hover character tablet-col-2 bg-fire" @click="chosenType = 'fire'; startGame()">
        <img src="../assets/fire_dino.png">
        <h3>Fire 🔥</h3>
        <svg v-if="chosenType == 'fire'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.667 191.667"><path d="M95.833 0C42.991 0 0 42.99 0 95.833s42.991 95.834 95.833 95.834 95.833-42.991 95.833-95.834S148.676 0 95.833 0zm55.029 79.646l-60.207 60.207a13.463 13.463 0 0 1-9.583 3.969c-3.62 0-7.023-1.409-9.583-3.969l-30.685-30.685a13.464 13.464 0 0 1-3.97-9.583c0-3.621 1.41-7.024 3.97-9.584a13.46 13.46 0 0 1 9.583-3.97c3.62 0 7.024 1.41 9.583 3.971l21.101 21.1 50.623-50.623a13.463 13.463 0 0 1 9.583-3.969c3.62 0 7.023 1.409 9.583 3.969 5.286 5.286 5.286 13.883.002 19.167z"></path></svg>
      </div>
      <div class="card card-hover character tablet-col-2 bg-water" @click="chosenType = 'water'; startGame()">
        <img src="../assets/water_dino.png">
        <h3>Water 🌊</h3>
        <svg v-if="chosenType == 'water'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.667 191.667"><path d="M95.833 0C42.991 0 0 42.99 0 95.833s42.991 95.834 95.833 95.834 95.833-42.991 95.833-95.834S148.676 0 95.833 0zm55.029 79.646l-60.207 60.207a13.463 13.463 0 0 1-9.583 3.969c-3.62 0-7.023-1.409-9.583-3.969l-30.685-30.685a13.464 13.464 0 0 1-3.97-9.583c0-3.621 1.41-7.024 3.97-9.584a13.46 13.46 0 0 1 9.583-3.97c3.62 0 7.024 1.41 9.583 3.971l21.101 21.1 50.623-50.623a13.463 13.463 0 0 1 9.583-3.969c3.62 0 7.023 1.409 9.583 3.969 5.286 5.286 5.286 13.883.002 19.167z"></path></svg>
      </div>
      <div class="card card-hover character tablet-col-2 bg-earth" @click="chosenType = 'earth'; startGame()">
        <img src="../assets/earth_dino.png">
        <h3>Earth ⛰️</h3>
        <svg v-if="chosenType == 'earth'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.667 191.667"><path d="M95.833 0C42.991 0 0 42.99 0 95.833s42.991 95.834 95.833 95.834 95.833-42.991 95.833-95.834S148.676 0 95.833 0zm55.029 79.646l-60.207 60.207a13.463 13.463 0 0 1-9.583 3.969c-3.62 0-7.023-1.409-9.583-3.969l-30.685-30.685a13.464 13.464 0 0 1-3.97-9.583c0-3.621 1.41-7.024 3.97-9.584a13.46 13.46 0 0 1 9.583-3.97c3.62 0 7.024 1.41 9.583 3.971l21.101 21.1 50.623-50.623a13.463 13.463 0 0 1 9.583-3.969c3.62 0 7.023 1.409 9.583 3.969 5.286 5.286 5.286 13.883.002 19.167z"></path></svg>
      </div>
      <div class="card card-hover character tablet-col-2 bg-air" @click="chosenType = 'air'; startGame()">
        <img src="../assets/air_dino.png">
        <h3>Air 💨</h3>
        <svg v-if="chosenType == 'air'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.667 191.667"><path d="M95.833 0C42.991 0 0 42.99 0 95.833s42.991 95.834 95.833 95.834 95.833-42.991 95.833-95.834S148.676 0 95.833 0zm55.029 79.646l-60.207 60.207a13.463 13.463 0 0 1-9.583 3.969c-3.62 0-7.023-1.409-9.583-3.969l-30.685-30.685a13.464 13.464 0 0 1-3.97-9.583c0-3.621 1.41-7.024 3.97-9.584a13.46 13.46 0 0 1 9.583-3.97c3.62 0 7.024 1.41 9.583 3.971l21.101 21.1 50.623-50.623a13.463 13.463 0 0 1 9.583-3.969c3.62 0 7.023 1.409 9.583 3.969 5.286 5.286 5.286 13.883.002 19.167z"></path></svg>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="card card-hover tablet-col-2" @click="chosenType = 'random'; startGame()">Random</div>
    </div>
    <div class="msg info" v-if="playerChosen && waiting">
      <strong>Waiting for other player...</strong>
    </div>
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
      gameID: '',
      chosenType: ''
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
            this.chosenType = "water";
            break;
          case 1:
            this.chosenType = "fire";
            break;
          case 2:
            this.chosenType = "earth";
            break;
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
    margin-bottom: 20px;
    position: relative;
  }
  .character img {
    max-height: 150px;
    width: auto;
  }
  .character svg {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 14px;
    right: 14px;
    fill: #81C784;
  }

  @media only screen and (min-width: 1480px) {
    .character img {
      max-height: 200px;
      width: auto;
    }
  }
</style>

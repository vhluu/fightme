<template>
  <div>
    <div v-if="addedGame">
      <div>Your invite code is:</div>
      <div>{{ invite }}</div>
      <!-- add a click to copy -->
      <!-- remove this later -->
      <div v-if="waiting">Waiting for another player</div>
      <!-- change so that it listens for the event and then loads the player select screen -->
      <div class="btn" v-else @click="playerSelect">Choose Your Character</div>
    </div>
    <div v-else>
      <input type="text" placeholder="Enter your nickname" v-model="nickname">
      <div clss="btn" @click="createGame">Create Game</div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'; 
import * as io from 'socket.io-client';
export default {
  data() {
    return { invite: "", nickname: "", addedGame: false, waiting: true, socket: io('https://salty-brook-12582.herokuapp.com/')  }
  },
  mounted() {
    this.socket.on('start-game', function (data) {
      console.log('game detected player 2');
      console.log(data.game + this.invite);
      if(data.game === this.invite) {
        this.waiting = false;
        this.$myGlobalVars.goFirst = data.goFirst;
        this.$router.push({
          name: 'CharacterSelect',
          params: { id: this.invite }
        })
      }
    }.bind(this));
  },
  methods: {
    
    createGame() {
      // generate invite code
      var inviteCode = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++) {
        inviteCode += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      let game = {
        invite_code : inviteCode,
      }

      this.$myGlobalVars.nickname = this.nickname;
      
      axios.post('https://salty-brook-12582.herokuapp.com/api/game', game)
        .then( response => {
          this.addedGame = true;
          this.invite = inviteCode;
        })
        .catch(e => {
          console.log(e);
        });
    },
  }
  
  // wait for player 2 and then go to /game/:id/
}
</script>

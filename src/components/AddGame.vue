<template>
  <div class="inner">
    <div class="card card-shadow">
      <div v-if="addedGame">
        <h2>Your invite code is:</h2>
        <div class="invite-code">{{ invite }}</div>
        <!-- add a click to copy -->
        <!-- remove this later -->
        <div class="msg info" v-if="waiting">Waiting for another player...</div>
        <!-- change so that it listens for the event and then loads the player select screen -->
        <div class="btn" v-else @click="playerSelect">Choose Your Character</div>
      </div>
      <div v-else>
        <h2>Enter your nickname to begin</h2>
        <div class="input-fields">
          <input type="text" placeholder="ex. Mr. Squarepants" v-model="nickname" maxlength="30">
          <div class="btn" @click="createGame">Create Game</div>
        </div>
        <div class="msg error" v-if="showErrorMsg">
          A nickname is required!
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'; 
import * as io from 'socket.io-client';
export default {
  data() {
    return { invite: "", nickname: "", addedGame: false, waiting: true, socket: io('https://salty-brook-12582.herokuapp.com/'), showErrorMsg: false  }
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
      if (this.nickname == "") {
        this.showErrorMsg = true;
        return;
      }
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

<style scoped>
.input-fields {
  margin-bottom: 20px;
}
</style>

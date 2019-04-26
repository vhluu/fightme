<template>
  <div class="inner add-game">
    <div v-if="addedGame">
      <h2>Your Invite Code Is:</h2>
      <div class="invite-code msg">{{ invite }}</div>
      <!-- add a click to copy -->
      <!-- remove this later -->
      <div class="msg info" v-if="waiting">Waiting for another player...</div>
    </div>
    <div v-else>
      <h2>Enter Your Nickname to Begin</h2>
      <div class="input-fields">
        <input type="text" placeholder="ex. Mr. Squarepants" v-model="nickname" maxlength="30">
        <div class="btn" @click="createGame">Create Game</div>
      </div>
      <div class="msg info" v-if="showLoading">Creating Game…</div>
      <div class="msg error" v-if="showErrorMsg">
        A nickname is required!
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'; 
import * as io from 'socket.io-client';
export default {
  data() {
    return { invite: "", nickname: "", addedGame: false, waiting: true, socket: io('https://salty-brook-12582.herokuapp.com/'), showErrorMsg: false, showLoading: false  }
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
      this.showErrorMsg = false;
      this.showLoading = true;
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
input {
  margin-bottom: 15px;
}

.invite-code {
  display: block;
  width: 100px;
  margin: 0 auto 15px auto;
}

.add-game {
  margin-top: 15vh;
}
</style>

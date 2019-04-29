<template>
  <div class="inner join-game">
    <h2>Enter an Invite Code &amp; Your Nickname</h2>
    <div class="join-inputs">
      <input type="text" placeholder="Invite Code" v-model="invite" maxlength="5">
      <input type="text" placeholder="Nickname" v-model="nickname" maxlength="35">
      <div class="btn" @click="joinGame">Join Game</div>
    </div>
    <div class="msg error" v-if="showErrorMsg">Invite code and nickname are both required!</div><br>
    <div class="msg error" v-if="incorrectInvite">Incorrect Invite Code. Please try again</div>
  </div>
</template>


<script>
import axios from 'axios'; 
import * as io from 'socket.io-client';
export default {
  data() {
    return { games: "", invite: "", nickname: "", socket: io('https://salty-brook-12582.herokuapp.com/'), showErrorMsg: false, incorrectInvite: false }
  },
  methods: {
    joinGame() {
      // check that fields aren't blank
      if(this.invite == "" || this.nickname == "") {
        this.showErrorMsg = true;
        return;
      }
      // find active game with invite code 
      // save user
      console.log(this.invite);
      this.$myGlobalVars.nickname = this.nickname;
      axios.get('https://salty-brook-12582.herokuapp.com/api/game/' + this.invite)
        .then(response => {
          this.games = response.data;
          if (this.games) {  
            // decide which player will be going first
            var turn = (Math.round(Math.random()) == 0);
            this.$myGlobalVars.goFirst = turn;
            // let opponent know that user has joined the game
            this.socket.emit('joined-game', { game: this.invite, nickname: this.nickname, goFirst: !turn });
            this.$router.push({
              name: 'CharacterSelect',
              params: { id: this.invite }
            });
          }
          else {
            this.incorrectInvite = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
  
  // wait for player 2 and then go to /game/:id/
}
</script>

<style scoped>
input {
  margin-bottom: 15px;
}

.btn {
  margin-bottom: 25px;
}

.msg {
  margin-bottom: 15px;
}

.join-game {
  margin-top: 15vh;
}

@media only screen and (max-width: 767px) {
  .join-inputs {
    display: flex;
    flex-direction: column;
    max-width: 250px;
    margin: 0 auto;
  }
}
</style>

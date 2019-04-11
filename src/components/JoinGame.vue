<template>
  <div>
    <input type="text" placeholder="Invite Code" v-model="invite">
    <input type="text" placeholder="Enter your nickname" v-model="nickname">
    <div clss="btn" @click="joinGame">Join Game</div>
  </div>
</template>


<script>
import axios from 'axios'; 
import * as io from 'socket.io-client';
export default {
  data() {
    return { games: "", invite: "", nickname: "", socket: io('https://salty-brook-12582.herokuapp.com/') }
  },
  methods: {
    joinGame() {
      // find active game with invite code 
      // save user
      console.log(this.invite);
      this.$myGlobalVars.nickname = this.nickname;
      axios.get('https://salty-brook-12582.herokuapp.com/api/game/' + this.invite)
        .then(response => {
          this.games = response.data;

          // decide which player will be going first
          var turn = (Math.round(Math.random()) == 0);
          this.$myGlobalVars.goFirst = turn;
          // let opponent know that user has joined the game
          this.socket.emit('joined-game', { game: this.invite, nickname: this.nickname, goFirst: !turn });
          this.$router.push({
            name: 'CharacterSelect',
            params: { id: this.invite }
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
  
  // wait for player 2 and then go to /game/:id/
}
</script>

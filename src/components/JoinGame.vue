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
      axios.get('https://salty-brook-12582.herokuapp.com/api/game/' + this.invite)
        .then(response => {
          this.games = response.data;
          this.socket.emit('joined-game', { game: this.invite, nickname: this.nickname });
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

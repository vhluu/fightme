<template>
  <div>
    <h1>Can't settle on who's gunna pick the movie? Or who's gunna drive?<br>Fight each other virtually and see who wins!</h1>
    <div class="btn"><a href="/add-game">New Game</a></div>
    <!-- <div> -->
      <span>OR</span>
      <!-- <div>
        <input type="text" placeholder="Invite Code"> -->
        <div class="btn"><a href="/join-game">Join Game</a></div>
      <!-- </div>  -->
    <!-- </div> -->
  </div>
</template>

<script>
import { eventBus } from '../main';
export default {
  // methods: {
  //   async newGame() {
  //     // generate invite code
  //     var inviteCode = "";
  //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  //     for (var i = 0; i < 5; i++) {
  //       inviteCode += possible.charAt(Math.floor(Math.random() * possible.length));
  //     }

  //     let game = {
  //         invite_code : inviteCode,
  //       }
      
  //     axios.post('http://localhost:5000/api/game', game);

  //     eventBus.$emit('changeScreen', 'app-character-select');
  //   },
  //   joinGame() {
  //     eventBus.$emit('changeScreen', 'app-character-select');
  //   }
  // }
}
</script>

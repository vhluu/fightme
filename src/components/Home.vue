<template>
  <div>
    <h1>Can't settle on who's gunna pick the movie? Or who's gunna drive?<br>Fight each other virtually and see who wins!</h1>
    <button @click="newGame">New Game</button>
    <div>
      <span>OR</span>
      <div>
        <input type="text" placeholder="Invite Code">
        <button @click="joinGame">Join Game</button>
      </div> 
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main';
export default {
  methods: {
    newGame() {
      eventBus.$emit('changeScreen', 'app-character-select');
    },
    joinGame() {
      eventBus.$emit('changeScreen', 'app-character-select');
    }
  }
}
</script>

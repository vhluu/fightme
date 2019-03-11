<template>
  <div id="app">
    <keep-alive>
      <component :is="selectedComp">
      </component>
    </keep-alive>

  </div>
</template>

<script>
import Home from './components/Home.vue';
import GamePlay from './components/GamePlay.vue';
import CharacterSelect from './components/CharacterSelect.vue';

import { eventBus } from './main';

export default {
  name: 'app',
  data: function() {
    return {
      selectedComp: 'app-home' 
    }
  },
  components: {
    'app-home': Home,
    'app-game-play': GamePlay,
    'app-character-select': CharacterSelect
  },
  created() {
    // listen to selectedComp change event
    eventBus.$on('changeScreen', (comp) => {
      this.selectedComp = comp;
    });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

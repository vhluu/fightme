<template>
  <div id="app">
    <!-- <keep-alive>
      <component :is="selectedComp" v-bind="currentProps">
      </component>
    </keep-alive> -->
  <router-view/>
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
      selectedComp: 'app-home',
      chosenType: null
    }
  },
  components: {
    'app-home': Home,
    'app-game-play': GamePlay,
    'app-character-select': CharacterSelect
  },
  created() {
    // listen to selectedComp change event
    // eventBus.$on('changeScreen', (comp) => {
    //   this.selectedComp = comp;
    // });

    // eventBus.$on('chosenType', (type) => {
    //   this.chosenType = type;
    // });
  },
  computed: {
    // currentProps() {
    //   if (this.selectedComp == 'app-game-play') {
    //     return { type: this.chosenType }
    //   }
    // }
  }
}
</script>

<style>
*, *:before, *:after {
    box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(51,71,91);
  margin-top: 60px;
  background: rgb(245,247,250);
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

img {
  max-width: 100%;
}

a {
  color: #42b983;
  text-decoration: none;
}

.btn, a.btn {
  display: inline-block;
  color: #fff;
  background: #75D6FF;
  padding: 8px 12px;
  border-radius: 5px;
}

.btn:hover, a.btn:hover {
  opacity: 0.8
}

.btn-light, a.btn-light {
  background: #BBEBFF;
  color: #009ee3;
}

.btn-light:hover, a.btn-light:hover {
  background: #99E0FF;
}

.card {
  background: #fff;
  box-shadow: rgb(234, 240, 246) 0px 0px 11px 0px;
  padding: 20px;
}

@media only screen and (min-width: 768px) {
  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  .space-between {
    justify-content: space-between;
  }
  .tablet-col-2 {
    flex-basis: calc((100% - 20px) / 2);
    max-width: calc((100% - 20px) / 2);
  }
}
</style>

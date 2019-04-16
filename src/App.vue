<template>
  <div id="app">
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
html, body {
  margin: 0;
  height: 100%;
}

*, *:before, *:after {
    box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(51,71,91);
  /* background: rgb(245,247,250); */
  height: 100%;
}

.inner {
  padding: 20px;
}

h1 {
  font-weight: 700;
}

h2 {
  font-weight: 500;
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

input {
  font-size: 14px;
  padding: 8px;
  width: 250px;
}

input::placeholder {
  color: rgb(190,190,190);
}

a {
  color: #42b983;
  text-decoration: none;
}

/* BUTTONS */
button {
  border: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: inherit;
}
.btn, a.btn {
  display: inline-block;
  color: #fff;
  background: #49c8ff;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
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
.disabled, .disabled:hover {
  opacity: 0.3;
  cursor: default;
}


/* CARDS */
.card {
  box-shadow: rgb(234, 240, 246) 0px 0px 11px 0px;
  padding: 20px;
  border-radius: 25px;
  background: #fff;
}
.card-hover:hover {
  -webkit-transform: scale(1.015);
  transform: scale(1.015);
  box-shadow: 0 10px 30px -5px rgba(51,71,91,0.2);
} 
.card-shadow {
  box-shadow: 0 10px 50px -5px rgba(51,71,91,0.12);
}

/* BACKGROUND COLORS */
.bg-fire {
  background: #FFDFDF;
}
.bg-water {
  /* background: #C0F7FE; */
  background: #d9fafe;
}
.bg-earth {
  background: #CFFEF0;
}
.bg-air {
  background: #F1ECFF;
}

/* MESSAGES */
.msg {
  background: #fff;
  border: 1px solid rgb(234, 240, 246);
  font-weight: bold;
  padding: 10px;
  display: inline-block;
}
.info {
  color: #64B5F6;
  border-color: #B3E5FC;
  background: #E1F5FE;
}
.error {
  border-color: #FFCDD2;
  color: #F06292;
  background: #FFEBEE;
}

@media only screen and (min-width: 768px) {
  .inner {
    padding: 40px;
  }
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

@media only screen and (min-width: 1024px) {
  .inner {
    padding: 60px;
  }
  .tablet-col-2 {
    flex-basis: calc((100% - 60px) / 4);
    max-width: calc((100% - 60px) / 4);
  }
}
</style>

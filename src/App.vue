<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue';

import { eventBus } from './main';

export default {
  name: 'app',
  components: {
    'app-header': Header
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
  font-family: 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #45617b;
  /* background: rgb(245,247,250); */
  height: 100%;
}

.inner {
  padding: 20px;
}

h1 {
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.8px;
}

h2 {
  font-weight: 600;
  letter-spacing: 0.7px;
}

img {
  max-width: 100%;
}

input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 14px;
  padding: 8px;
  width: 250px;
  border: 1px solid rgb(223,223,223);
  border-radius: 0;
  outline: none;
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
  .justify-center {
    justify-content: center;
  }
  .tablet-col-2 {
    flex-basis: calc((100% - 20px) / 2);
    max-width: calc((100% - 20px) / 2);
  }
  .mobile-only {
    display: none;
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
  body {
    font-size: 18px;
  }
}

@media only screen and (min-width: 1480px) {
  .inner {
    padding: 80px;
  }
  h1 {
    font-size: 36px;
  }
  body {
    font-size: 20px;
  }
}

@media only screen and (min-width: 1800px) {
  .inner {
    max-width: 1600px;
    margin: 0 auto;
  }
} 

@media only screen and (max-width: 767px) {
  .mobile-hide {
    display: none;
  }
}
</style>

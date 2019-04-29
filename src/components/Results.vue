<template>
  <div class="results">
    <div class="inner">
      <div v-if="$myGlobalVars.won">
        <h1 class="results-header">You won!!</h1>
        <div class="character-result">
          <img class="crown" :class="$myGlobalVars.chosenType" src="../assets/crown.png" alt="">
          <app-character class="results" :type="$myGlobalVars.chosenType"></app-character>
        </div>
      </div>
      <div v-else>
        <h1 class="results-header">You lost :(</h1>
        <div class="character-result">
          <img class="cone" :class="$myGlobalVars.chosenType" src="../assets/cone.png" alt="">
          <app-character class="results" :type="$myGlobalVars.chosenType"></app-character>
        </div>
      </div>
      <div class="btn finish-btn" @click="goHome">Finish Game</div>
    </div>
  </div>
</template>

<script>
import Character from './gameplay/Character.vue';

export default {
  components: {
    'app-character': Character
  },
  methods: {
    goHome() {
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style>
.character-result {
  position: relative;
}

.results.character img {
  height: 47vw;
}

.results-header {
  padding-bottom: 20px;
}

.finish-btn {
  margin-top: 20px;
}

/* Crown */
.crown {
  position: absolute;
}
.crown.water {
  width: 10%;
  left: 32%;
  top: -1%;
  transform: rotate(18deg);
}
.crown.fire {
  width: 11%;
  left: 42%;
  transform: rotate(11deg);
  top: 3%;
}
.crown.earth {
  width: 9%;
  left: 22%;
  top: 52.5%;
}
.crown.air {
  left: 43%;
  transform: rotate(32deg);
  width: 9%;
  top: 4%;
}

/* Cone hat */
.cone {
  position: absolute;
}
.cone.water {
  left: 32%;
  top: -7%;
  transform: rotate(18deg);
  width: 12%;
}
.cone.fire {
  left: 41%;
  transform: rotate(11deg);
  top: -6%;
  width: 15%;
}
.cone.earth {
  width: 10%;
  left: 22%;
  top: 48.5%;
}
.cone.air {
  left: 42%;
  transform: rotate(25deg);
  width: 11%;
  top: -1%;
}

@media only screen and (min-width: 768px) {
  .results.character img {
    height: 360px;
  }
  .cone.fire {
    width: 103px;
    left: calc(50% - 60px);
  }
  .cone.water {
    width: 85px;
    left: calc(50% - 130px);  
  }
  .cone.earth {
    width: 77px;
    left: calc(50% - 215px);
  }
  .cone.air {
    width: 83px;
    left: calc(50% - 60px);
  }

  .crown.fire {
    width: 100px;
    left: calc(50% - 70px);
    top: 0;
  }
  .crown.water {
    width: 69px;
    left: calc(50% - 130px);
  }
  .crown.earth {
    width: 69px;
    left: calc(50% - 215px);
  }
  .crown.air {
    width: 76px;
    left: calc(50% - 60px);
  }
}

@media only screen and (min-width: 1480px) {
  .results.character img {
    height: 490px;
  }
  .cone.fire {
    width: 140px;
    left: calc(50% - 82px);
  }
  .cone.water {
    width: 120px;
    left: calc(50% - 180px);  
  }
  .cone.earth {
    width: 105px;
    left: calc(50% - 290px);
  }
  .cone.air {
    width: 120px;
    left: calc(50% - 90px);
  }
  .crown.fire {
    width: 155px;
    left: calc(50% - 100px);
    top: -1%;
  }
  .crown.water {
    width: 105px;
    left: calc(50% - 176px);
  }
  .crown.earth {
    width: 105px;
    left: calc(50% - 290px);
  }
  .crown.air {
    width: 105px;
    left: calc(50% - 80px);
  }
}

</style>

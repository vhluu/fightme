<template>
  <div class="game-play">
    <!-- back button -->
    <div class="main-display">
      <div>
        <app-hp-bar :hp="firstHP"></app-hp-bar>
        <app-character :type="$myGlobalVars.chosenType" :nickname="$myGlobalVars.nickname"></app-character> 
      </div>
      <div>
        <app-hp-bar :hp="secondHP"></app-hp-bar>
        <app-character :type="$myGlobalVars.chosenType2" :nickname="$myGlobalVars.nickname2"></app-character>
      </div>
    </div>
    <app-moves :type="$myGlobalVars.chosenType"></app-moves>
  </div>
</template>

<script>
import HPBar from './gameplay/HPBar.vue';
import Moves from './gameplay/Moves.vue';
import Character from './gameplay/Character.vue';
import Activity from './gameplay/Activity.vue';
import { eventBus } from '../main';

export default {
  props: ['type'],
  data: function() {
    return {
      firstHP: 100,
      secondHP: 100,
      messsageLog: []
    }
  },
  components: {
    'app-hp-bar': HPBar,
    'app-moves': Moves,
    'app-character': Character,
    'app-activity': Activity
  },
  created() {
    eventBus.$on('moveSelected', (data) => {
      console.log(data);
      // calculate the damage
      // display event in message log
      // determine if player is still alive
    });

    // need to randomly choose who goes first
  }
}
</script>

<style>
.main-display {
  display: flex;
  justify-content: center;
}
</style>

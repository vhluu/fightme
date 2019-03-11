<template>
  <div class="game-play">
    <!-- back button -->
    <div class="main-display">
      <div>
        <app-hp-bar :hp="firstHP"></app-hp-bar>
        <app-character :type="type"></app-character> 
      </div>
      <div>
        <app-hp-bar :hp="secondHP"></app-hp-bar>
        <app-character :type="secondType"></app-character>
      </div>
    </div>
    <app-moves :type="type"></app-moves>
  </div>
</template>

<script>
import HPBar from './gameplay/HPBar.vue';
import Moves from './gameplay/Moves.vue';
import Character from './gameplay/Character.vue';
import Activity from './gameplay/Activity.vue';

export default {
  props: ['type'],
  data: function() {
    return {
      firstHP: 100,
      secondHP: 100,
      types: ['fire', 'water', 'earth', 'air']
    }
  },
  components: {
    'app-hp-bar': HPBar,
    'app-moves': Moves,
    'app-character': Character,
    'app-activity': Activity
  },
  computed: {
    secondType() {
      return this.types[Math.floor(Math.random() * 3)]
    }
  }
}
</script>

<style>
.main-display {
  display: flex;
  justify-content: center;
}
</style>

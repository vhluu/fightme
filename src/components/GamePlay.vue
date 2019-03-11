<template>
  <div>
    <!-- back button -->
    <div>
      <div>
        <app-hp-bar :hp="firstHP"></app-hp-bar>
        <app-character :type="type"></app-character> 
      </div>
      <div>
        <!-- <app-hp-bar></app-hp-bar>
        <app-character></app-character> -->
      </div>
      <!-- <app-moves></app-moves> -->
    </div>
    <div>

    </div>
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
      secondHP: 100
    }
  },
  components: {
    'app-hp-bar': HPBar,
    'app-moves': Moves,
    'app-character': Character,
    'app-activity': Activity
  }
}
</script>

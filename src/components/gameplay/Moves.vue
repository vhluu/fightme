<template>
  <div>
    <button :disabled="waiting || (index == 1 && waitTime > 0)" v-for="(move, index) in moves[type]" v-bind:key="move.name" @click="selectMove(index)">{{ move.name }}</button>
    <button @click="selectMove(3)" :disabled="waiting">Heal</button>
  </div>
</template>

<script>
import { eventBus } from '../../main';
export default {
  props: ['type'],
  data: function() {
    return {
      moves: {
        fire: [
          {"name": "Volcano Eruption", "damage": 1},
          {"name": "My Mix Tape", "damage": 2},
        ],
        water: [
          {"name": "Tsunami", "damage": 1},
          {"name": "K-Drama Tears", "damage": 2}
        ],
        earth: [
          {"name": "Earthquake", "damage": 1},
          {"name": "Upstairs Neighbors Stomping", "damage": 2}
        ],
        air: [
          {"name": "Tornado", "damage": 1},
          {"name": "Dad Sneeze", "damage": 2}
        ]
      },
      waitTime: 0,
      waiting: false
    }
  },
  methods: {
    selectMove(index) {
      // once user selects high damage move, they must wait two turns before they can again
      if (this.waitTime > 0) this.waitTime--;
      if (index == 1) this.waitTime = 2;
      
      // we want to emit to gameplay the new chosen move
      var moveInfo = (index == 3) ? {name: "Heal", damage: 0} : this.moves[this.type][index];
      eventBus.$emit('moveSelected', moveInfo);
      
    }
  }
}
</script>

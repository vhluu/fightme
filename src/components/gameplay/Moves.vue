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
          {"name": "Volcano Eruption", "damage": "normal"},
          {"name": "My Mix Tape", "damage": "high"},
        ],
        water: [
          {"name": "Tsunami", "damage": "normal"},
          {"name": "K-Drama Tears", "damage": "high"}
        ],
        earth: [
          {"name": "Earthquake", "damage": "normal"},
          {"name": "Upstairs Neighbors Stomping", "damage": "high"}
        ],
        air: [
          {"name": "Tornado", "damage": "normal"},
          {"name": "Dad Sneeze", "damage": "high"}
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
      var moveInfo = (index == 3) ? {name: "Heal", damage: "none"} : this.moves[this.type][index];
      eventBus.$emit('moveSelected', moveInfo);
      
    }
  }
}
</script>

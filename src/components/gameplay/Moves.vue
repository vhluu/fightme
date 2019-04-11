<template>
  <div>
    <button :disabled="disableBtns || (index == 1 && waitTime > 0)" v-for="(move, index) in moves[type]" v-bind:key="move.name" @click="selectMove(index)">{{ move.name }}</button>
    <button @click="selectMove(3)" :disabled="disableBtns">Heal</button>
  </div>
</template>

<script>
import { eventBus } from '../../main';
export default {
  props: ['type', 'disableBtns'],
  data: function() {
    return {
      moves: {
        fire: [
          {"name": "Hot Cheeto Puffs", "damage": 1},
          {"name": "Spicy Fire Noodle Fling", "damage": 2},
        ],
        water: [
          {"name": "Sweaty Palms Attack", "damage": 1},
          {"name": "Voss Artesian Water Fall", "damage": 2}
        ],
        earth: [
          {"name": "Upstairs Neighbors Stomp", "damage": 1},
          {"name": "Global Warming", "damage": 2}
        ],
        air: [
          {"name": "Silent Fart", "damage": 1},
          {"name": "Dad Sneeze", "damage": 2}
        ]
      },
      waitTime: 0
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

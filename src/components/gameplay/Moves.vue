<template>
  <div class="moves">
    <button class="btn" :class="[type, {disabled: disableBtns || (index == 1 && waitTime > 0)}]" :disabled="disableBtns || (index == 1 && waitTime > 0)" v-for="(move, index) in moves[type]" v-bind:key="move.name" @click="selectMove(index)">{{ move.name }}</button>
    <button class="btn heal-btn" :class="[type, {disabled: disableBtns}]" @click="selectMove(2)" :disabled="disableBtns">50/50</button>
    <button class="btn heal-btn" :class="[type, {disabled: disableBtns}]" @click="selectMove(3)" :disabled="disableBtns">Heal</button>
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
          {"name": "Spicy Fire Noodles", "damage": 2},
        ],
        water: [
          {"name": "Sweaty Palms", "damage": 1},
          {"name": "Voss Artesian Waterfall", "damage": 2}
        ],
        earth: [
          {"name": "Salad Toss", "damage": 1},
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
      var random = Math.round(Math.random());
      var moveInfo = (index == 3) ? {name: "Heal", damage: 0} : ((index == 2) ? {name: "50/50", damage: random} : this.moves[this.type][index]);
      eventBus.$emit('moveSelected', moveInfo);
      
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 0 5px 10px 5px;
}
.heal-btn {
  margin-left: 0;
}
.fire {
  background: #EF5350
}
.water {
  background: #4FC3F7;
}
.air {
  background: #A569BD;
}
.earth {
  background: #48C9B0;
}
</style>

<template>
  <div>
    <button>Attack</button>
    <!-- <template v-if="type == 'fire'">
      <button v-for="move in fireMoves" v-bind:key="move.name">{{ move.name + ' ' + move.strength }}</button>
    </template>
    <template v-if="type == 'water'">
      <button v-for="move in fireMoves" v-bind:key="move.name">{{ move.name + ' ' + move.strength }}</button>
    </template>
    <template v-if="type == 'earth'">
      <button v-for="move in fireMoves" v-bind:key="move.name">{{ move.name + ' ' + move.strength }}</button>
    </template> -->
 
      <button v-for="move in moves[type]" v-bind:key="move.name">{{ move.name }}</button>
    <button>Heal</button>

  </div>
</template>

<script>
export default {
  props: ['type'],
  data: function() {
    return {
      moves: {
        fire: [
          {"name": "", "strength": "low"},
          {"name": "My Mix Tape", "strength": "high"}
        ],
        water: [
          {"name": "", "strength": "low"},
          {"name": "", "strength": "high"}
        ],
        earth: [
          {"name": "", "strength": "low"},
          {"name": "", "strength": "high"}
        ],
        air: [
          {"name": "", "strength": "low"},
          {"name": "", "strength": "high"}
        ]
      }
      
    }
  }
}
</script>

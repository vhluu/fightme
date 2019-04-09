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
    <div class="message-log">
      <div class="message" v-for="(message, index) in messageLog" v-bind:key="index">{{ message }}</div>
    </div>   
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
      messageLog: [],
      strengthAgainst: 1, // 0 is weak against, 1 is normal and 2 is strong against
      damageTable: [
        [6,10,14], // normal attack: weak against, normal, & strong against opponent
        [10,20,30] // strong attack: -
      ]
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
      var damage = this.calculateDamage(data.damage);

      // display event in message log
      this.messageLog.push(this.$myGlobalVars.nickname + ' used ' + data.name);
      if (data.name == 'Heal') {
        this.setNewHP(false, 10);
        this.messageLog.push(this.$myGlobalVars.nickname + ' gained 10 HP');
      }
      else {
        this.setNewHP(true, damage);
        this.messageLog.push(this.$myGlobalVars.nickname2 + ' lost ' + damage + ' HP');
      }

      // emit move to opponent
      // need the message, move, new HP 
    });

    // need to randomly choose who goes first

    // determine if user's type is strong, weak or normal against opponent's type
    if (this.$myGlobalVars.chosenType != this.$myGlobalVars.chosenType2) {
      var checkVS = {
        fire: { water: 0, air: 2, earth: 1 },
        water: { fire: 2, air: 1, earth: 0 },
        air: { fire: 0, water: 1, earth: 2 },
        earth: { fire: 1, water: 2, air: 0 }
      };

      this.strengthAgainst = checkVS[this.$myGlobalVars.chosenType][this.$myGlobalVars.chosenType2];
    }
  },
  methods: {
    // calculate damage of attack given the damage level of the move and how strong the user is
    // against their opponent
    calculateDamage(damageLevel) {
      if (damageLevel == 0) return 10; // damageLevel 0 for heal move
      return this.damageTable[damageLevel - 1][this.strengthAgainst];
    },
    setNewHP(isOpponent, value) {
      var newHP;
      if (!isOpponent) {
        newHP = this.firstHP + value;
        this.firstHP = (newHP > 100) ? 100 : newHP;
      }
      else {
        newHP = this.secondHP - value;
        this.secondHP = (newHP <= 0) ? 0 : newHP;
      }
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

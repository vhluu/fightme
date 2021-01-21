<template>
  <div class="inner game-inner">
    <div class="game-play">
      <!-- back button -->
      <div class="main-display">
        <div class="player player-user" :class="[{front: animatePlayer}]">
          <div class="stats">
            <p class="name">{{ $myGlobalVars.nickname }}</p>
            <app-hp-bar :hp="firstHP"></app-hp-bar>
          </div>
          <app-character :class="[{leftMove: animatePlayer}, {healMove: animateHeal}]" :type="$myGlobalVars.chosenType" :nickname="$myGlobalVars.nickname"></app-character> 
        </div>
        <div class="player player-opp" :class="[{front: animatePlayer2}]">
          <div class="stats stats-second">
            <p class="name">{{ $myGlobalVars.nickname2 }}</p>
            <app-hp-bar class="hp-second" :hp="secondHP"></app-hp-bar>
          </div>
          <app-character :class="[{rightMove: animatePlayer2}, {healMove: animateHeal2}]" :type="$myGlobalVars.chosenType2" :nickname="$myGlobalVars.nickname2"></app-character>
        </div>
        <img class="pancake-bg" src="../assets/pancake.png" alt="Pancake Stadium">
      </div>
      <h3 class="turn-message" v-if="!myTurn">{{ $myGlobalVars.nickname2 }}'s turn</h3>
      <h3 class="turn-message" v-else>Your turn</h3>
      <app-moves :type="$myGlobalVars.chosenType" :disableBtns="!myTurn"></app-moves>
      <div class="message-log" :class="[{alignFix: adjustLog}]">
        <div class="message" v-for="(message, index) in messageLog" v-bind:key="index">{{ message }}</div>
      </div>   
    </div>
  </div>
</template>

<script>
import HPBar from './gameplay/HPBar.vue';
import Moves from './gameplay/Moves.vue';
import Character from './gameplay/Character.vue';
import { eventBus } from '../main';
import * as io from 'socket.io-client';

export default {
  props: ['type'],
  data: function() {
    return {
      socket: io('https://salty-brook-12582.herokuapp.com/'),
      firstHP: 100,
      secondHP: 100,
      messageLog: [],
      strengthAgainst: 1, // 0 is weak against, 1 is normal and 2 is strong against
      damageTable: [
        [6,10,14], // normal attack: weak against, normal, & strong against opponent
        [10,20,30] // strong attack: -
      ],
      gameID: '',
      myTurn: false, // whether user plays the first move,
      animatePlayer: false,
      animatePlayer2: false,
      animateHeal: false,
      animateHeal2: false,
      firstMove: true,
      adjustLog: false
    }
  },
  components: {
    'app-hp-bar': HPBar,
    'app-moves': Moves,
    'app-character': Character,
  },
  created() {
    this.myTurn = this.$myGlobalVars.goFirst;
    this.gameID = this.$route.params.id;
    
    eventBus.$on('moveSelected', (data) => {
      this.animatePlayer2 = false;
      this.animateHeal2 = false;

      this.myTurn = false;
      console.log(data);
      // calculate the damage
      var damage;
      if (data.name == "50/50") {
        damage = (data.damage == 0) ? 6 : 15;
      }
      else {
        damage = this.calculateDamage(data.damage);
      } 

      // display event in message log
      var msg;
      var msg2 = this.$myGlobalVars.nickname + ' used ' + data.name
      this.messageLog.push(msg2);

      var messageLog = this.$el.querySelector('.message-log');
      if (data.name == 'Heal') {
        this.animateHeal = true; // play animation 
        this.setNewHP(false, 10);
        msg = this.$myGlobalVars.nickname + ' gained 10 HP';
        this.messageLog.push(msg);
        this.$nextTick(() => {
          messageLog.scrollTop+=55;
        });
      }
      else {
        this.animatePlayer = true; // play animation 
        this.setNewHP(true, damage);
        msg = this.$myGlobalVars.nickname2 + ' lost ' + damage + ' HP';
        this.messageLog.push(msg);
        if (this.messageLog.length == 4) { this.adjustLog = true;}
        this.$nextTick(() => {
          messageLog.scrollTop+=55;
        });

        // opponent has been defeated by latest move
        if (this.secondHP == 0) {
          this.playerDefeated(this.$myGlobalVars.nickname2);
          this.$myGlobalVars.won = true;
        }
      }

      // emit move to opponent (need the message, move, new HP)
      this.socket.emit('new-move', { moveMsg: msg2, damageMsg: msg, move: data, opponentHP: this.firstHP, userHP: this.secondHP, game: this.gameID });
    });

    // user receives opponent move from server
    this.socket.on('new-move', (data) => {
      if (data.game == this.gameID) {
        this.animatePlayer = false;
        this.animateHeal = false;
        if(data.move.name == "Heal") {
          this.animateHeal2 = true;
        }
        else {
          this.animatePlayer2 = true;
        }
        this.messageLog.push(data.moveMsg);
        this.messageLog.push(data.damageMsg);
        if (this.messageLog.length == 4) { this.adjustLog = true;}
        this.$nextTick(() => {
          var messageLog = this.$el.querySelector('.message-log');
          messageLog.scrollTop+=55;
        });

        this.firstHP = data.userHP;
        this.secondHP = data.opponentHP;

        if (data.userHP == 0) {
          this.playerDefeated(this.$myGlobalVars.nickname);
          this.$myGlobalVars.won = false;
        }
        this.myTurn = true;
      }     
    });

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
    // sets the new HP, where value is the points to add or subtract
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
    },
    playerDefeated(nickname) {
      this.messageLog.push('RIP :( ' + nickname + 'has been defeated!');
      this.$nextTick(() => {
          var messageLog = this.$el.querySelector('.message-log');
          messageLog.scrollTop+=55;
        });
      setTimeout(() => this.$router.push({
          name: 'Results',
          params: { id: this.gameID }
      }), 3000);
        
    }
  }
}
</script>

<style>
#app {
  /* background-color: #FFDD8A; */
  /* background-color: #FFE9B3; */
}
.main-display {
  display: flex;
  justify-content: center;
  position: relative;
}

.pancake-bg {
  position: absolute;
  bottom: -20vw;
}

/* Character */
.player {
  flex-basis: 50%;
  max-width: 50%;
  z-index: 10;
}
.player-user img {
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.character img {
  height: 30vw;
}

/* Stats */
.stats {
  background: rgba(255,255,255, 0.3);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 30px;
  width: 80%;
}
.stats-second {
  margin-left: auto;
}
.name {
  margin-top: 0;
  text-align: left;
  margin-bottom: 0;
  width: 70%;
  font-weight: bold;
}
.hp-second {
  margin-left: auto;
}
.turn-message {
  padding-top: 20vw;
}

/* Message Log */
.message-log {
  max-height: 74px;
  overflow-y: scroll;
  color: #00ACC1;
  border-color: #B2EBF2;
  background: #E0F7FA;
  padding: 15px;
  font-weight: bold;
  font-size: 16px;
}
.alignFix::after {
  content: '';
  height: 15px;
  opacity: 0;
  display: block;
}
.message-log .message:nth-child(even) {
  margin-bottom: 11px;
}
.message-log .message:last-child {
  margin-bottom: 0;
}
.message-log::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
    background-color: #ECEFF1;
}
.message-log::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #B2EBF2;
    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}

/* Move Animation */
.front {
  z-index: 15;
}
.leftMove {
  animation: 2s leftMove;
}
.rightMove {
  animation: 2s rightMove;
}
.healMove {
  animation: 1s healMove;
}

@keyframes leftMove {
  0% {
    transform: translate(0px) rotate(0deg) ;
  }
  55% {
    transform: translate(50%) rotate(0deg);
  }
  60% {
    transform: translate(50%) rotate(30deg);
  }
  65% {
    transform: translate(50%) rotate(0deg);
  }
  70% {
    transform: translate(50%) rotate(30deg);
  }
  75% {
    transform: translate(50%) rotate(0deg);
  }
  80% {
    transform: translate(50%) rotate(30deg);
  }
  85% {
    transform: translate(50%) rotate(0deg);
  }
  100% {
    transform: translate(0%) rotate(0deg);
  }
}

@keyframes rightMove {
  0% {
    transform: translate(0px) rotate(0deg) ;
  }
  55% {
    transform: translate(-50%) rotate(0deg);
  }
  60% {
    transform: translate(-50%) rotate(-30deg);
  }
  65% {
    transform: translate(-50%) rotate(0deg);
  }
  70% {
    transform: translate(-50%) rotate(-30deg);
  }
  75% {
    transform: translate(-50%) rotate(0deg);
  }
  80% {
    transform: translate(-50%) rotate(-30deg);
  }
  85% {
    transform: translate(-50%) rotate(0deg);
  }
  100% {
    transform: translate(0%) rotate(0deg);
  }
}

@keyframes healMove {
  0% {
    transform: rotate(0deg) ;
  }
  20% {
    transform: rotate(15deg);
  }
  40% {
    transform: rotate(-15deg);
  }
  60% {
    transform: rotate(15deg);
  }
  80% {
    transform: rotate(-15deg);
  }
  100% {
    transform: translate(0%) rotate(0deg);
  }
}

@media only screen and (min-width: 768px) {
  .game-inner {
    width: 768px;
    margin: 0 auto;
  }
  .pancake-bg {
    bottom: -153px;
  }
  .character img {
    height: 236px;
  }
  .turn-message {
    padding-top: 154px;
  }
}

@media only screen and (min-width: 1200px) {
  .game-inner {
    width: 1024px;
  }
  .pancake-bg {
    bottom: -204px;
  }
  .character img {
    height: 307px;
  }
  .turn-message {
    padding-top: 204px;
  }
}

/* @media only screen and (min-width: 1480px) {
  .game-inner {
    width: 1480px;
  }
  .pancake-bg {
    bottom: -296px;
  }
  .character img {
    height: 444px;
  }
  .turn-message {
    padding-top: 296px;
  }
} */
</style>

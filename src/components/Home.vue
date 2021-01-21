<template>
  <div class="home inner">
    <div class="home-desc">
      <h1>Fight your friends over any decision!</h1>
      <p>Too polite and fighting over who's gunna pay the bill?<br>Or are you guys too lazy and fighting over who's gunna drive?</p>
      <p><strong>Whatever it is, tell them "Fight Me!" and see who wins ;)</strong></p>
      <a class="btn" href="/#/add-game">New Game</a>
      <a class="btn btn-light" href="/#/join-game">Join Game</a>
    </div>
    <div class="gameplay-ex card">
      <p class="preview-text">Preview</p>
      <img src="/assets/gameplay_example2.png">
    </div>
    <div class="question icon" @click="openModal = true;">?</div>
    <div class="q-modal card" :class="{active: openModal}">
      <div class="close icon" @click="openModal = false;">X</div>
      <div class="q-modal-content">
        <h2 class="q-modal-title">Questions you might have</h2>
        <h4>What is this game for?</h4>
        <p>Think of this game like rock-paper-scissors, where two people decide something based on the outcome of the game. Except here, we battle it out using dinosaurs.</p>
        <h4>How does this work?</h4>
        <p>1. Create a game (no signup needed!)</p>
        <p>2. Send your invite code to your friend so that they can play</p>
        <p>3. Choose your dinosaur (types: fire, water, earth, &amp; air)</p>
        <p>4. Select moves</p>
        <p>5. Win</p>
        <h4>What if I have no friend to play with?</h4>
        <p>Open the game in two different browsers and play on your own!</p>
      </div> 
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main';
export default {
  data() {
    return {
      openModal: false
    }
  }
}
</script>

<style>
.home {
  margin: 0 auto;
  background: #fff;
  width: 100%;
  padding-top: 20px;
}

.gameplay-ex {
  position: relative;
  padding-top: 30px;
  margin-top: 50px;
}

.preview-text {
  margin: 0;
  position: absolute;
  top: 14px;
  opacity: 0.4;
  font-size: 18px;
  left: 24px;
}

.q-modal {
  display: none;
  position: absolute;
  background: #fff;
  text-align: left;
  width: 80vw;
  max-width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  padding: 30px 5px;
}
.q-modal-content {
  overflow-y: scroll;
  max-height: 80vh;
  padding: 0 30px;
}
.q-modal.active {
  display: block;
}
.q-modal-title {
  text-align: center;
  font-weight: 700;
  margin-top: 0;
}
.icon {
  background-color: #49c8ff;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  line-height: 30px;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
.question {
  position: fixed;
  bottom: 20px;
  left: 20px;
}
.close {
  margin: 0 20px 5px auto;
}

.icon:hover {
  opacity: 0.8;
  cursor: pointer;
}

@media only screen and (min-width: 768px) {
  .home {
    display: flex;
    justify-content: center;
    padding-top: 14vh;
  }

  .gameplay-ex {
    flex-basis: 30%;
    margin-left: 40px;
    position: relative;
    padding-top: 30px;
    margin-top: 0;
  }
  .gameplay-ex img {
    min-width: 228px;
  }
}

@media only screen and (min-width: 1024px) {
  .home-desc {
    margin-top: 40px;
  }
  .gameplay-ex {
    margin-left: 100px;
  }

  .q-modal {
    padding: 30px 5px 40px 5;
    max-width: 600px;
  }
  .q-modal-content {
    padding: 0 40px;
  }
}

@media only screen and (min-width: 1480px) {
  .gameplay-ex {
    margin-left: 200px;
  }
  .home {
    padding-top: 18vh;
  }
  .icon {
    background-color: #49c8ff;
    width: 35px;
    height: 35px;
    border-radius: 50px;
    line-height: 35px;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
}


@media only screen and (min-width: 2000px) {
  .gameplay-ex {
    margin-left: 300px;
  }
  .home {
    padding-top: 18vh;
  }
}

@media only screen and (max-width: 767px) {
  .gameplay-ex {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}


</style>

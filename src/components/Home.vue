<template>
  <div class="home inner">
    <div>
      <h1>Fight a friend over any decision!</h1>
      <p>Too polite and fighting over who's gunna pay the bill?<br>Or are you guys too lazy and fighting over who's gunna drive?</p>
      <p><strong>Whatever it is, tell them "Fight Me!" and see who wins ;)</strong></p>
      <a class="btn" href="/#/add-game">New Game</a>
      <a class="btn btn-light" href="/#/join-game">Join Game</a>
    </div>
    <div class="gameplay-ex card">
      <p class="preview-text">Preview</p>
      <img src="../assets/gameplay_example.png">
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main';
export default {
}
</script>

<style>
.home {
  margin: 0 auto;
  background: #fff;
  width: 100%;
  padding-top: 60px;
}

.gameplay-ex {
  position: relative;
  padding-top: 30px;
  margin-top: 50px;
}

.preview-text {
  margin: 0;
  position: absolute;
  top: 10px;
  opacity: 0.4;
  font-size: 18px;
}

@media only screen and (min-width: 768px) {
  .home {
    display: flex;
    justify-content: center;
    padding-top: 20vh;
  }

  .gameplay-ex {
    flex-basis: 30%;
    margin-left: 100px;
    position: relative;
    padding-top: 30px;
    margin-top: 0;
  }

}
</style>

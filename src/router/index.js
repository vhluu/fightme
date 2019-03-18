import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import AddGame from '../components/AddGame'
import JoinGame from '../components/JoinGame'
import CharacterSelect from '../components/CharacterSelect'
import GamePlay from '../components/GamePlay'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/add-game',
      name: 'AddGame',
      component: AddGame
    },
    {
      path: '/join-game',
      name: 'JoinGame',
      component: JoinGame
    },
    {
      path: '/game/:id',
      name: 'CharacterSelect',
      component: CharacterSelect
    },
    {
      path: '/game/:id/:nickname',
      name: 'GamePlay',
      component: GamePlay
    }
  ]
})
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import AddGame from '../components/AddGame'
import JoinGame from '../components/JoinGame'
import CharacterSelect from '../components/CharacterSelect'
import GamePlay from '../components/GamePlay'
import Results from '../components/Results'

Vue.use(Router)

export default new Router({
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
      path: '/game/:id/choose',
      name: 'CharacterSelect',
      component: CharacterSelect
    },
    {
      path: '/game/:id',
      name: 'GamePlay',
      component: GamePlay
    },
    {
      path: '/game/:id/results',
      name: 'Results',
      component: Results
    }
  ]
})
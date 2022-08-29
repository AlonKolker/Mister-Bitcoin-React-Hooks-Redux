import { storageService } from "../services/storageService"
export const userService = {
  getUser,
  signUp,
  updateBalance,
}

const USERS = "usersDB"
const USER_KEY = "loggedin"

function getUser() {

  const user = storageService.load(USER_KEY) || null
  return user
}

function signUp(name) {
  let user = {
    name,
    coins: 100,
    moves: [],
  }
  console.log(name)
  storageService.store(USER_KEY, user)
}

function updateBalance(to,val) {
  let user = getUser()
  console.log(val)
  let userBalance = JSON.parse(JSON.stringify(user.coins))
  if (userBalance - val <= 0) return false

  user.coins = user.coins - val

  let move = {
    'At': new Date(Date.now()).toLocaleDateString(),
    'Amount': val ,
   to,
  }
  user.moves.unshift(move)
  storageService.store(USER_KEY, user)
  return user.moves
}

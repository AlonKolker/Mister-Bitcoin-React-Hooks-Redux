import { bitcoinService } from "../../services/bitcoin.service";
import { userService } from "../../services/user.service";

export function loadUser() {
    return (dispatch, getState) => {
        try {
            const user = userService.getUser()
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('Cannot load user', err)
            throw err
        }
    }
}

export function getUserMoves() {
    return async (dispatch, getState) => {
        try {
            const userMoves = await userService.getUser().moves
            dispatch({ type: 'SET_USER_MOVES', userMoves })
        } catch (err) {
            console.log('Cannot get user moves', err);
            throw err
        }
    }
}


export function getUserRate() {
    return async (dispatch, getState) => {
        try {
            const { user } = getState().userModule
            const userRate = await bitcoinService.getRate(user.coins)
            dispatch({ type: 'SET_USER_RATE', userRate })
        } catch (err) {
            console.log('Cannot get user rate', err)
            throw err
        }
    }
}

export function addUserMove(contact, coins) {
    return async (dispatch, getState) => {
        try {
            console.log(contact,coins);
            const userMove = await userService.updateBalance(contact, +coins)
            console.log(userMove)
            dispatch({ type: 'SET_USER', userMove })
        } catch (err) {
            console.log('Cannot add user move', err)
            throw err
        }
    }
}

export function signup(contactName) {
    return async (dispatch, getState) => {
        try {
            const user =     userService.signUp(contactName)

            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('Cannot sign up', err)
            throw err
        }
    }
}



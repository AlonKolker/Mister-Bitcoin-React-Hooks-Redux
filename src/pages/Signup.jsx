import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import btc4 from "../assets/imgs/btc4.png"
import { signup } from "../store/actions/userActions"

export const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSignUp = (ev) => {
    ev.preventDefault()
    const { value } = ev.target.elements.name
    if (value === "") return
    dispatch(signup(value))
    console.log("onSignUp", value)
    navigate("/")
  }

  return (
    <div className='signup-conteiner'>
      <h1 className='signup-heder'>Sign up</h1>
      <img className='signup-btc-icon' src={btc4} alt='' />
      <form className='signup-form' onSubmit={onSignUp}>
        <label htmlFor='name'></label>
        <input className='signup-form-input' type='text' name='name' id='name' placeholder='Enter your name' />
        <button>Save</button>
      </form>
    </div>
  )
}

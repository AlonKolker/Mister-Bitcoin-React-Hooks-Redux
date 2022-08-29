import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserMoves, addUserMove } from "../store/actions/userActions"
import { removeContact } from '../store/actions/contactActions'
import { useHistory, useParams } from "react-router-dom"

import React from "react"
import { contactService } from "../services/contactService"
import { userService } from "../services/user.service"
import { TransferFund } from "../components/Transfer-fund"
import { MovesList } from "../components/Moves-list"

import { HashRouter as Link, NavLink, Router, Redirect, Route, Switch } from "react-router-dom"

export const ContactDeatails = () => {
  const [contact, setContact] = useState({})
  const params = useParams()
  const history = useHistory()
  const userMoves = useSelector((state) => state.userModule.userMoves)
  const dispatch = useDispatch()

  const loadContact = useCallback(async () => {
    const contactId = params.id
    console.log(contactId)
    const contact = await contactService.getContactById(contactId)
    setContact(contact)
  }, [params.id])

  useEffect(() => {
    loadContact()
    dispatch(getUserMoves())
  }, [loadContact, dispatch])

  const onRemoveContact = async (contactId) => {
    await dispatch(removeContact(contactId))
    history.push("/contact")
  }

  // const onRemoveContact = async (contactId) => {
  //   await contactService.deleteContact(contactId)
  //   history.push("/contact")
  //   // navigate('/contact')
  // }

  const onBack = () => {
    history.push("/contact")
  }

  const onTransfer = (val, contact) => {
    dispatch(addUserMove(contact, val))
    dispatch(getUserMoves())
  }

  if (!contact) return <div>Loading Deatails...</div>
  const contactImg = `https://i.pravatar.cc/150?u=${contact._id}`
  return (
    <div className='deatils-conteiner'>
      <div className='deatils-content'>
        <div className='flex space-between'>
          <div className='remove-contact-logo' onClick={() => onRemoveContact(contact._id)}>
            🗑 Remove
          </div>
          <NavLink className='edit-contact-logo' to={`/contact/edit/${contact._id}`}>
            🖊 Edit
          </NavLink>
        </div>
        <div className='main-content'>
          <img className='contact-img' src={contactImg} alt='' />
          <div>
            {" "}
            <span className='deatil'> Name: </span>
            {contact.name}
          </div>
          <div>
            <span className='deatil'>Phone:</span> {contact.phone}
          </div>
          <div>
            <span className='deatil'>Email:</span> {contact.email}
          </div>
        </div>
        <TransferFund contact={contact} onTransfer={onTransfer} />
        <button className='nice-button details-go-back-btn' onClick={onBack}>
          Go back
        </button>
      </div>
      <MovesList contact={contact} moves={userMoves} title={"Your Moves:"} />
    </div>
  )
}

import { useCallback, useEffect, useState, React } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { HashRouter as Link, NavLink } from "react-router-dom"
import { getUserMoves, addUserMove } from "../store/actions/userActions"
import { removeContact } from "../store/actions/contactActions"

import { contactService } from "../services/contactService"
import { TransferFund } from "../components/Transfer-fund"
import { MovesList } from "../components/Moves-list"
// import React from "react"

export const ContactDeatails = () => {
  const [contact, setContact] = useState({})
  const params = useParams()
  const navigate = useNavigate()
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
    dispatch(removeContact(contactId))
    navigate("/contact")
  }

  const onBack = () => {
    navigate("/contact")
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

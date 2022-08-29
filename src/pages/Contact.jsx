import React from "react"
import { NavLink } from "react-router-dom"
import { ContactList } from "../components/Contact-list"
import { ContactFilter } from "../components/Contact-filter"

import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadContacts, setFilterBy } from "../store/actions/contactActions"
import { Bars } from 'react-loader-spinner'

export const Contact = () => {
  const contacts = useSelector((state) => state.contactModule.contacts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadContacts())
  }, [dispatch])

  const onChangeFilter = useCallback(
    (filterBy) => {
      console.log(filterBy)
      dispatch(setFilterBy(filterBy))
      dispatch(loadContacts())
    },
    [dispatch]
  )

  if (!contacts) return <span><Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/></span>
  return (
    <div className='contacts-conteiner'>
      <div className='contact-options-box  flex'>
      <NavLink className='add-new-contact-btn' activeClassName="selected" to='/contact/edit'>
            New Contact
          </NavLink>
        <ContactFilter onChangeFilter={onChangeFilter} />
      </div>
      <ContactList contacts={contacts} />
    </div>
  )
}

import React from "react"
import { HashRouter as  Link,BrowserRouter,Switch,Router,Routes,NavLink } from "react-router-dom"
// import { contactService } from "../services/contactService"
import { ContactList } from "../components/Contact-list"
// import { ContactDeatails } from "../pages/Contact-details"
import { ContactFilter } from "../components/Contact-filter"

import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadContacts, setFilterBy } from "../store/actions/contactActions"

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

  if (!contacts) return <span>Loading</span>
  return (
    <div className='contacts-conteiner'>
      <div className='contact-options-box  flex'>
      <NavLink className='add-new-contact-btn' activeClassName="selected" to='/contact/edit'>
            New Contact
          </NavLink>
          {/* <button className='add-new-contact-btn' to='/contact/edit'>
            New Contact
          </button> */}
        <ContactFilter onChangeFilter={onChangeFilter} />
      </div>
      <ContactList contacts={contacts} />
    </div>
  )
}

// export class Contact extends Component {
//   state = {
//     contacts: null,
//     contactId: null,
//     filterBy: null,
//   }
//   componentDidMount() {
//     this.loaContacts()
//   }
//   async loaContacts() {
//     try {
//       const contacts = await contactService.getContacts(this.state.filterBy)
//       this.setState({ contacts })
//     } catch (err) {
//       console.log("err:", err)
//     }
//   }

//   onChangeFilter = (filterBy) => {
//     this.setState({ filterBy }, this.loaContacts)
//   }

//   render() {
//     const { contacts, contactId, currContact } = this.state
//     if (!contacts) return <span>Loading</span>
//     if (contactId) return <ContactDeatails contactId={contactId} onShowDeatails={this.onShowDeatails} />
//     return (
//       <div className='contacts-conteiner'>
//         <div className="contact-options-box  flex">
//           <Link className='add-new-contact-btn' to='/contact/edit'>
//             New Contact
//           </Link>
//           <ContactFilter onChangeFilter={this.onChangeFilter} />
//         </div>
//         <ContactList contacts={contacts} onShowDeatails={this.onShowDeatails} />
//       </div>
//     )
//   }
// }

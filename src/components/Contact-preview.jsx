import { Component } from "react"
import { HashRouter as Router, Redirect, Route, Switch,Link,NavLink, withRouter } from "react-router-dom"

// import { ContactDeatails } from "../pages/Contact-details"

export function ContactPreview({ contact, onShowDeatails }) {
  const contactImg = `https://i.pravatar.cc/150?u=${contact._id}`
  return (
    // <Router>
      <section className='contact-preview-conteiner'>
        <img src={contactImg} alt='' />

        <div className='contact-name'>{contact.name}</div>
        <Link className="details-btn" exact="true" to={`/contact/${contact._id}`}>
          Deatails
        </Link>
      </section>
    // {/* </Router> */}
  )
}

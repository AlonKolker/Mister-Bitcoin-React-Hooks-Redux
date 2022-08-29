import { Component } from "react"
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom"

export function ContactPreview({ contact }) {
  const contactImg = `https://i.pravatar.cc/150?u=${contact._id}`
  return (
    <section className='contact-preview-conteiner'>
      <img src={contactImg} alt='' />

      <div className='contact-name'>{contact.name}</div>
      <Link className='details-btn' exact='true' to={`/contact/${contact._id}`}>
        Deatails
      </Link>
    </section>
  )
}

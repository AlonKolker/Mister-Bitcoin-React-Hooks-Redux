import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom"
import { Bars } from  'react-loader-spinner'

export function ContactPreview({ contact }) {
  const contactImg = `https://i.pravatar.cc/150?u=${contact._id}`
  if(!contactImg) <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
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

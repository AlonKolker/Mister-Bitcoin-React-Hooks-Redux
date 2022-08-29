import { ContactPreview } from "../components/Contact-preview"

export function ContactList({ contacts }) {
  return (
    <>
      <div className='contact-list simple-cards-grid'>
        {contacts.map((contact) => (
          <ContactPreview key={contact._id} contact={contact} />
        ))}
      </div>
    </>
  )
}

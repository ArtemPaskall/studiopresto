'use client'
import './OrderForm.css'
import { useState } from 'react'

export default function OrderForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(`%cName: ${name}`, 'color: red; font-size: 1.2rem; font-weight: bold;')
    console.log('Email:', email)
    console.log('Phone:', phone)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="order-form">
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={handleNameChange}
          className="input"
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="input"
        />
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Phone"
          className="input"
        />
      </form>
    </>
  )
}

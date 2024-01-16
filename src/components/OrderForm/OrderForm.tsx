import './OrderForm.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { FormData } from '../../../types'
import { useDispatch } from 'react-redux'
import { setCustomerInfo } from '../../redux/features/cart-slice'
import { useSelector } from 'react-redux'
import { selectCart } from '../../redux/features/cart-slice'
import { set } from 'react-hook-form'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
}

const OrderForm = () => {
  const [sendMailResponse, setSendMailResponse] = useState<string | null>(null)
  const { cartList, totalPrice } = useSelector(selectCart)
  const dispatach = useDispatch()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  })

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
  })

  const sendMail = async (customerInfo: FormData) => {
    setSendMailResponse(null)
    try {
      console.log()
      const sendEmail = await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify({ cartList, totalPrice, customerInfo }),
      })
  
      const data = await sendEmail.json()

      if (data.id) {
        setSendMailResponse('Email sent successfully')
      }
    } catch (error) {
      setSendMailResponse('Error sending email')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: '',
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: FormErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    const phoneRegex = /^\d{10}$/
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits)'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      console.log('Form submitted:', formData)
      dispatach(setCustomerInfo(formData))
      sendMail(formData)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="order-form">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>

        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white
              font-bold py-2 px-4 w-80 mt-4 cursor-pointer flex justify-center"
        >
          SUBMIT
        </button>
      </form>

      {
        sendMailResponse && (
          <div className="text-center mt-4">
            <span>{sendMailResponse}</span>
          </div>
        )
      }
    </>
  )
}

export default OrderForm

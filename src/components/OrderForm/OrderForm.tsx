import './OrderForm.css'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FormData } from '../../../types'
import { useDispatch } from 'react-redux'
import { setCustomerInfo } from '../../redux/features/cart-slice'
import { useSelector } from 'react-redux'
import { selectCart } from '../../redux/features/cart-slice'

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
      console.log(error)
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
      dispatach(setCustomerInfo(formData))
      sendMail(formData)

      console.log('%cCustomer Info:', 'color: purple; font-size: 18px; font-weight: bold;')
      console.log(
        '%cName: %c' + formData.name,
        'color: green; font-size: 16px;  font-weight: bold;',
        'color: blue; font-size: 16px; font-weight: bold;',
      )
      console.log(
        '%cEmail: %c' + formData.email,
        'color: green; font-size: 16px;  font-weight: bold;',
        'color: blue; font-size: 16px; font-weight: bold;',
      )
      console.log(
        '%cPhone: %c' + formData.phone,
        'color: green; font-size: 16px;  font-weight: bold;',
        'color: blue; font-size: 16px; font-weight: bold;',
      )

      console.log('%cProduct List:', 'color: purple; font-size: 18px; font-weight: bold;')
      cartList.forEach(cartItem => {
        console.log(
          '%c' + cartItem.product.title,
          'color: red; font-size: 12px; font-weight: bold;',
        )
        console.log('%c' + cartItem.quantity, 'color: red; font-size: 12px; font-weight: bold;')
      })
    }
  }

  useEffect(() => {
    dispatach(
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
      }),
    )
  }, [dispatach])

  return (
    <>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="input-wrapper">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
          {errors.name && <span className="input-error">{errors.name}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && <span className="input-error">{errors.email}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
          {errors.phone && <span className="input-error">{errors.phone}</span>}
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white
              font-bold py-2 px-4 w-80 mt-4 cursor-pointer flex justify-center"
        >
          SUBMIT
        </button>
      </form>

      {sendMailResponse && (
        <div className="text-center mt-4">
          <span className="font-bold text-xl text-blue-700">{sendMailResponse}</span>
        </div>
      )}
    </>
  )
}

export default OrderForm

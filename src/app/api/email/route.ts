import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import EmailTemplate from '../../../components/EmailTemplate/EmailTemplate'

export async function POST(req: any) {
  const body = await req.json()

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { data } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['artem.yogi@gmail.com'],
      subject: 'New Order',
      react: EmailTemplate(body),
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.error()
  }
}
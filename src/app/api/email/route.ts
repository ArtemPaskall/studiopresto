import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import EmailTemplate from '../../../components/EmailTemplate'

export async function POST(req: any) {
  try {
    const body = await req.json()

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data } = await resend.emails.send({
      from: 'Studiopresto <onboarding@resend.dev>',
      to: ['hello@studiopresto.com'],
      subject: 'New Order',
      react: EmailTemplate(body),
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.error()
  }
}

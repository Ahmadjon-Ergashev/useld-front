"use client"

import { useState, useTransition } from 'react'
import { sendContactInquiry } from '@/lib/actions'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function ContactInquiry() {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    setStatus('idle')
    
    startTransition(async () => {
      const result = await sendContactInquiry(formData)
      if (result.success) {
        setStatus('success')
        const form = document.getElementById('contact-inquiry-form') as HTMLFormElement
        form?.reset()
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'Something went wrong')
      }
    })
  }

  return (
    <section className="contact-inquiry" id="inquiry">
      <div className="container">
        <div className="inquiry-grid">
          <div className="inquiry-info" style={{ animation: 'fadeUp 0.8s ease forwards' }}>
            <div className="stag">Contact Us</div>
            <h2 className="stitle">
              Have Questions? <br />
              <span className="gold">Get in Touch</span>
            </h2>
            <p className="inquiry-desc">
              Fill out the form below and our team will get back to you as soon as possible. We're here to help you with your ELD compliance needs.
            </p>
            
            <div className="inquiry-features">
              <div className="inquiry-feature">
                <CheckCircle className="gold" size={18} />
                <span>Quick Response Time</span>
              </div>
              <div className="inquiry-feature">
                <CheckCircle className="gold" size={18} />
                <span>Expert DOT Support</span>
              </div>
              <div className="inquiry-feature">
                <CheckCircle className="gold" size={18} />
                <span>No Commitment Required</span>
              </div>
            </div>
          </div>

          <div className="inquiry-card" style={{ animation: 'fadeUp 0.8s 0.2s ease forwards', opacity: 0 }}>
            <form id="contact-inquiry-form" action={handleSubmit} className="inquiry-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input type="text" id="fullName" name="fullName" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input type="text" id="companyName" name="companyName" placeholder="Trucking Co. LLC" />
                </div>
                <div className="form-group">
                  <label htmlFor="numberOfTrucks">Number of Trucks</label>
                  <input type="number" id="numberOfTrucks" name="numberOfTrucks" placeholder="e.g. 5" min="1" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="How can we help you?" rows={4}></textarea>
              </div>

              {status === 'success' && (
                <div className="form-status success">
                  <CheckCircle size={18} />
                  <span>Message sent successfully! We'll contact you soon.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="form-status error">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button type="submit" className="btn-gold inquiry-submit" disabled={isPending} style={{ width: '100%', justifyContent: 'center' }}>
                {isPending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Inquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

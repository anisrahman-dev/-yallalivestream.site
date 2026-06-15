import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = form
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      alert('Please fill out all fields correctly.')
      return
    }
    setSubmitted(true)
  }

  const reset = () => {
    setForm({ name: '', email: '', subject: '', message: '' })
    setSubmitted(false)
  }

  return (
    <Layout>
      <PageMeta title="Contact – Yalla Live Stream" />
      <main className="pt-[110px] pb-16 max-w-[800px] mx-auto min-h-screen px-4">
        <div className="bg-white/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-xl p-6 md:p-8 mb-8 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-gray-400 dark:text-slate-500">Contact Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Get in Touch</h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 mt-2">Have an inquiry, feedback, or business proposal? Drop us a message below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <ContactCard color="#f97316" iconBg="bg-[#f97316]/10" icon="mail" title="General Support" sub="support@yallalivestream.site" />
            <ContactCard color="#2dd4bf" iconBg="bg-[#2dd4bf]/10" icon="campaign" title="Advertising Inquiries" sub="ads@yallalivestream.site" />
            <ContactCard color="green-500" iconBg="bg-green-500/10" icon="forum" title="Join Telegram Chat" sub="t.me/yallalivestream" />
          </div>

          <div className="md:col-span-3">
            <div className="relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden min-h-[420px] flex flex-col justify-center">
              {submitted && (
                <div className="absolute inset-0 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center p-6 space-y-4 z-20">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 dark:bg-green-500/20 text-green-500 flex items-center justify-center animate-bounce">
                    <span className="material-symbols-outlined text-4xl font-bold">check_circle</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Message Sent!</h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 max-w-xs">
                    Thank you for reaching out. The Yalla Live Stream team will review your inquiry and get back to you shortly.
                  </p>
                  <button onClick={reset} className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-2 px-6 rounded-xl shadow-md transition-all text-xs">
                    Send Another Message
                  </button>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-4 z-10">
                <Field label="Your Name" id="name" value={form.name} onChange={onChange('name')} placeholder="Enter your full name" />
                <Field label="Email Address" id="email" type="email" value={form.email} onChange={onChange('email')} placeholder="Enter your email" />
                <Field label="Subject" id="subject" value={form.subject} onChange={onChange('subject')} placeholder="How can we help you?" />
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-1">Message</label>
                  <textarea id="message" rows="4" required value={form.message} onChange={onChange('message')} placeholder="Type your message here..."
                    className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition-all resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 select-none mt-2">
                  <span className="material-symbols-outlined text-sm">send</span>
                  Submit Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

function Field({ label, id, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-1">{label}</label>
      <input type={type} id={id} required value={value} onChange={onChange} placeholder={placeholder}
        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition-all" />
    </div>
  )
}

function ContactCard({ icon, title, sub, iconBg, color }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-md flex items-start gap-4">
      <span className={`material-symbols-outlined text-2xl p-2 ${iconBg} rounded-xl`} style={{ color }}>{icon}</span>
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{sub}</p>
      </div>
    </div>
  )
}

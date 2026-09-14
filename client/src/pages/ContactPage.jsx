import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit contact message');
      }

      setSuccessMessage(data.message || 'Thank you! Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Get in Touch with Our Team
            </h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              Have questions about integrating PulseAI, custom enterprise setups, or team features?
              Fill out the form below or reach us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                All fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
              </p>

              {successMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-sm">Message Sent Successfully</h5>
                    <p className="text-xs mt-0.5">{successMessage}</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-sm">Submission Error</h5>
                    <p className="text-xs mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    id="contact-name"
                    name="name"
                    placeholder="e.g. Alex Taylor"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Email Address"
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. +1 555-0199"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Subject"
                    id="contact-subject"
                    name="subject"
                    placeholder="e.g. Enterprise License Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Describe your inquiry, project scope, or questions..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm px-3.5 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={loading}
                    className="w-full sm:w-auto shadow-md shadow-indigo-500/25"
                  >
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </div>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
                  Contact Information
                </h3>

                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Email Us</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                        contact@pulseai.com / support@pulseai.com
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Call Us</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                        +1 (800) 555-0199 (Toll Free)
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Headquarters</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                        100 Tech Innovation Way, Suite 400<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Support Hours</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                        Monday – Friday: 9:00 AM – 6:00 PM PST
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg">
                <h4 className="font-bold text-base mb-2">Need Immediate Assistance?</h4>
                <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                  If you are already a registered organization member, jump straight into the internal AI assistant for rapid policy inquiries and directory searches.
                </p>
                <a
                  href="/dashboard/chat"
                  className="inline-flex items-center text-xs font-semibold bg-white text-indigo-700 px-3.5 py-2 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  Open AI Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

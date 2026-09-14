import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { API_BASE_URL, parseResponse } from '../../config/api';

export default function QuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequired: 'AI Copilot & Assistant',
    budget: '$1,000 - $5,000',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const services = [
    'AI Copilot & Assistant',
    'Custom AI Workflows',
    'Organizational Analytics',
    'Enterprise Integration',
  ];

  const budgets = [
    '< $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await parseResponse(res);

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit quote request');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceRequired: 'AI Copilot & Assistant',
        budget: '$1,000 - $5,000',
        message: '',
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Request a Free Quote"
      subtitle="Tell us about your team and we'll deliver a tailored proposal."
      maxWidth="max-w-xl"
    >
      {success ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quote Request Received!
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Thank you for reaching out. Our solution architects will review your details and contact you with a customized estimate within 24 hours.
          </p>
          <div className="pt-4">
            <Button onClick={handleClose} className="w-full sm:w-auto px-8">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Your Name"
              id="quote-name"
              name="name"
              placeholder="e.g. Michael Scott"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email Address"
              id="quote-email"
              name="email"
              type="email"
              placeholder="e.g. michael@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Phone Number"
            id="quote-phone"
            name="phone"
            type="tel"
            placeholder="e.g. +1 (555) 019-2834"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="serviceRequired"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Service Required <span className="text-red-500">*</span>
              </label>
              <select
                id="serviceRequired"
                name="serviceRequired"
                value={formData.serviceRequired}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm px-3.5 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                required
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Estimated Budget <span className="text-red-500">*</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm px-3.5 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                required
              >
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="quote-message"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Project Details / Message
            </label>
            <textarea
              id="quote-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your team size, goals, or timeline..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm px-3.5 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={loading}>
              Submit Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

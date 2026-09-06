const MODEL_NAME = 'gemini-3.6-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

const SYSTEM_INSTRUCTION = `You are a friendly and helpful workplace assistant for our company (PulseAI).
You help employees with HR policies, leave balances, benefits, team inquiries, and general company workflows.

Company Policies & Information:
- Paid Time Off (PTO):
  * Annual Leave: 24 days per year (accrued monthly at 2 days/month).
  * Sick & Casual Leave: 12 days annually for personal wellness.
  * Parental Leave: 26 weeks fully paid maternity leave and 4 weeks paid paternity leave for new parents (eligible after 6 months continuous service).
  * Holidays: 10 national and festival holidays per calendar year.
  * Rollover: Up to 5 unused PTO days can be rolled over to the next year, to be used before March 31st.
  * Requests: Submitted via HR Portal with at least 2 weeks notice for extended leaves.
- Working Hours & Mode:
  * Hybrid model (3 days in office, 2 days remote).
  * Core collaboration hours are 10:00 AM - 4:00 PM IST.
- Expenses & Allowances:
  * WFH Allowance: Up to ₹3,500/month for high-speed internet and mobile phone bills.
  * Learning & Development: Up to ₹30,000/year for approved courses, books, and certifications.
  * Submissions: Submit invoices by the 25th of each month for reimbursement via payroll. Contact Neha Kapoor in Finance.
- Key Department Leads:
  * Engineering: Aarav Sharma (VP of Engineering)
  * Design: Priya Patel (Lead UI/UX Designer)
  * Product: Rohan Verma (Senior Product Manager)
  * Human Resources: Ananya Iyer (HR Manager)
  * Marketing: Sneha Kulkarni (Growth Marketing Lead)
  * Sales: Aditya Nair (Enterprise Sales Lead)
  * Finance: Neha Kapoor (Financial Analyst)

Keep your answers clear, concise, well-structured, formatted with Markdown (bullet points, bold text, headers where helpful), and warm/helpful.`;

export async function sendChatMessage(messages, customApiKey) {
  const apiKey =
    (customApiKey && customApiKey.trim()) ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    localStorage.getItem('pulseai_gemini_key') ||
    localStorage.getItem('gemini_api_key');
  const lastMessage = messages[messages.length - 1]?.content || '';

  if (apiKey && apiKey.trim() !== '') {
    try {
      const contents = messages.slice(-6).map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(`${GEMINI_API_URL}?key=${encodeURIComponent(apiKey.trim())}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const status = response.status;
        let message = 'Failed to connect with Gemini API.';

        if (status === 400) {
          message = errorBody?.error?.message || 'Invalid request format to Gemini API.';
        } else if (status === 401 || status === 403) {
          message = 'Invalid or unauthorized Gemini API key.';
        } else if (status === 429) {
          message = 'Gemini API rate limit reached. Please wait a moment or retry.';
        } else {
          message = errorBody?.error?.message || `API error (${status}).`;
        }

        const err = new Error(message);
        err.status = status;
        throw err;
      }

      const data = await response.json();
      const textParts = data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .filter(Boolean)
        .join('\n\n');
      const answer = textParts || data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!answer) {
        throw new Error('Empty response received from Gemini API.');
      }

      return {
        text: answer,
        source: 'gemini-api'
      };
    } catch (err) {
      console.warn('Gemini API call error:', err.message);
      throw err;
    }
  }

  // Fallback response when no API key is provided
  await new Promise((res) => setTimeout(res, 600));
  return {
    text: getMockResponse(lastMessage),
    source: 'local-knowledge-base'
  };
}

function getMockResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('leave') || q.includes('pto') || q.includes('vacation')) {
    return `### Paid Time Off (PTO) Policy

* **Annual Leave:** 24 days per year (accrued monthly).
* **Sick / Casual Leave:** 12 days annually for personal wellness.
* **Parental Leave:** 26 weeks paid maternity leave and 4 weeks paid paternity leave.
* **Holidays:** 10 national and festival holidays per calendar year.

To request leave, submit your application on the HR portal. For queries, contact **Ananya Iyer** in HR.`;
  }

  if (q.includes('lead') || q.includes('manager') || q.includes('head') || q.includes('team') || q.includes('who is')) {
    return `### Department Leadership

* **Engineering:** Aarav Sharma (VP of Engineering)
* **Design:** Priya Patel (Lead UI/UX Designer)
* **Product:** Rohan Verma (Senior Product Manager)
* **Human Resources:** Ananya Iyer (HR Manager)
* **Marketing:** Sneha Kulkarni (Growth Marketing Lead)
* **Sales:** Aditya Nair (Enterprise Sales Lead)
* **Finance:** Neha Kapoor (Financial Analyst)

You can find all of them in the **Employee Directory** tab.`;
  }

  if (q.includes('expense') || q.includes('reimburse') || q.includes('bill')) {
    return `### Expense Reimbursement

1. **Monthly WFH Allowance:** Up to ₹3,500/month for internet and mobile bills.
2. **Learning & Upskilling:** ₹30,000/year for books, certifications, and technical courses.
3. **Submission:** Upload receipts before the 25th of each month for processing with payroll. Contact **Neha Kapoor** in Finance for questions.`;
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hello! 👋 How can I help you today? You can ask me about company leave policies, team leads, or expense guidelines.`;
  }

  return `Here is the information regarding "${query}":

For company policies, please refer to the employee handbook or speak with your department lead. You can also contact **Ananya Iyer** (HR) or your manager directly.`;
}

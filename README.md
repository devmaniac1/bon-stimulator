# BON Leadership AI Execution Simulator

This is a lightweight, web-based self-assessment tool developed for **BON Explorer AB**. It helps leaders evaluate execution readiness across 9 core leadership dimensions (BON 9D), calculate a readiness score, and deliver a personalized summary via email.

> 🚀 Built with **Next.js**, **Tailwind CSS**, **EmailJS**, and **Airtable**/**Zapier** for data automation.

---

## ✨ Features

- ✅ 9-slider interface for evaluating BON 9 Dimensions
- ✅ Automatic readiness score calculation (not displayed to the user)
- ✅ User form submission (name + email)
- ✅ Email delivery of readiness interpretation via EmailJS
- ✅ Optional data logging via Airtable
- ✅ Fully client-side with optional API routing for webhook relaying
- ✅ Mobile responsive and hosted on Vercel

---

## 🔧 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Form Email Delivery**: [FormSpree](https://www.formspree.com/)
- **Data Automation**: [EmailJs](https://www.emailjs.com/)
- **Hosting**: [Vercel](https://vercel.com)

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/bon-leadership-simulator.git
cd bon-leadership-simulator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a .env.local file in the root directory: .env

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_hash
```

### 4. Deployment

```bash
npm run build
npm run start
```

## Readiness Score Interpretation

Avg. Score Readiness Level
≤ 2.4 Foundational Readiness – Clarify vision and align.
≤ 3.4 Emerging Readiness – Gaining traction, gaps remain.
≤ 4.2 Strategic Readiness – Ready to scale.

> 4.2 Execution-Ready – Primed for AI-powered leadership.

## Author

Ashfaq Farleen

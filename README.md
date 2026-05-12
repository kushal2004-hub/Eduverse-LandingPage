# 🎓 Eduverse - Modern Education Landing Page

> A sleek, highly responsive landing page for a premium online education platform, built with React and Tailwind CSS v4.

**🔗 [View Live Demo](https://eduverse-kushal.vercel.app/)** *(Update this link to your actual Vercel URL)*

## 🚀 Overview

Eduverse is a frontend project designed to showcase modern web development practices. It features a dark-mode-first aesthetic, complex CSS animations, and a fully responsive layout that looks great on everything from ultra-wide monitors to mobile devices. 

## 🎨 Design & Architecture

**From SaaS Wireframe to Reality**  
This project was meticulously translated from a professional **SaaS (Software as a Service) wireframe** into a fully functional web application. The layout and architecture reflect industry-standard SaaS design principles, prioritizing:

* **High-Converting Layout:** Strategic placement of Call-to-Actions (CTAs), hero text, and value propositions.
* **User-Centric Flow:** Guiding the user naturally from the main hook, through social proof (partner universities), and down to course categories.
* **Component-Based UI:** Structuring the visual wireframe into modular, reusable React components to mimic how a production-level SaaS platform is built.

## ✨ Key Features

* **Modern UI/UX:** Clean, gradient-driven dark theme with accessible contrast ratios.
* **Infinite Marquee Animation:** Custom-built infinite scrolling partner logos using optimized vanilla CSS keyframes to ensure smooth, hardware-accelerated rendering.
* **Fully Responsive:** Fluid layouts built with Tailwind utility classes to adapt seamlessly to all screen sizes.
* **Optimized Assets:** Uses direct SVG paths and local public folder hosting to prevent hotlink blocking and ensure lightning-fast load times.

## 🛠️ Tech Stack

* **Framework:** React.js powered by Vite for blazing-fast Hot Module Replacement (HMR).
* **Styling:** Tailwind CSS (v4) for utility-first styling and theme management.
* **Deployment:** Vercel (Continuous Integration / Continuous Deployment).
* **Version Control:** Git & GitHub.

## ⚙️ Running Locally

Want to explore the code? Here is how to get it running on your local machine:

1. **Clone the repository:**

   git clone [https://github.com/kushal2004-hub/Eduverse-LandingPage.git](https://github.com/kushal2004-hub/Eduverse-LandingPage.git)

2. Navigate into the project directory:

   cd Eduverse-LandingPage

3. Install the dependencies:

   npm install

4. Start the development server:

   npm run dev


## 🧠 Technical Learnings & Challenges
Vite + Vercel Deployment: Successfully configured Vercel build overrides to handle cross-platform node_module permission discrepancies.

Tailwind v4 Migration: Upgraded the PostCSS configuration and shifted from tailwind.config.js to the new @theme CSS directive to leverage Tailwind's newest rendering engine.

Image Delivery Optimization: Overcame third-party hotlink protection (Wikimedia) by auditing image paths and migrating to localized hosting and raw .svg rendering for guaranteed production stability.


## 👨‍💻 Author
Kushal Gowda H M

GitHub: @kushal2004-hub (https://github.com/kushal2004-hub)
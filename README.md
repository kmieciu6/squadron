# Squadron

Live: https://projectsquadron.netlify.app

Corporate website built with Next.js (App Router) focused on modular architecture, performance optimization and modern frontend practices.
The project demonstrates practical use of React, TypeScript, custom hooks, internationalization and server-side API integration.

## Tech Stack

Frontend
- Next.js (App Router)
- React
- TypeScript
- SCSS

Backend 
- Next.js API Routes
- REST API 
- Nodemailer

Integrations 
- Google reCAPTCHA v2
- Google Maps API

DevOps
- Netlify deployment

## Features

### Modular Architecture

The application is structured using a modular component-based architecture. 

Key elements:
- reusable UI components
- separated logic using custom hooks
- context-based state management 
- clear separation between UI, logic and API

### Internationalization

The project supports multiple languages using a JSON-based translation system.

Features:
- dynamic language switching 
- modular translation files 
- reusable translation hook

### Custom React Hooks

The project uses several custom hooks to keep the components clean and reusable.

Examples:
- useTranslation – language management and translations
- useIntersectionHide – scroll-based UI behavior using IntersectionObserver

### Contact API

A custom API endpoint handles the contact form.

Features:
- server-side email sending
- Google reCAPTCHA validation
- input validation
- environment variable configuration

### Cookie Consent System

External services such as Google Maps and reCAPTCHA are loaded only after the user accepts cookies.

This improves:
- privacy compliance
- performance
- resource loading

### Performance Optimization

The project focuses on modern frontend optimization techniques.

Implemented solutions:
- lazy loading
- code splitting
- dynamic imports
- optimized media loading
- IntersectionObserver animations

### Responsive Design

The UI is designed to work across different devices and screen sizes using responsive layouts and adaptive components.

## Getting Started

Install dependencies:

```bash
npm install

npm run dev
```

Open in browser:
http://localhost:3000
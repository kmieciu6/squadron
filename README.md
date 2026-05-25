# Squadron

Live: https://projectsquadron.netlify.app

Corporate website and CMS-based web application built with Next.js, React and TypeScript.

The project was developed with a modular architecture and focuses on maintainability, performance optimization, internationalization and integration with external services.  
It also includes backend-related elements such as API routes, contact form handling, email sending, environment configuration and CMS integration.

The project is being extended with Strapi CMS deployed on a Linux VPS using Docker, PostgreSQL and Nginx reverse proxy. This setup allows non-technical users to manage website content from an admin panel.

## Tech Stack

### Frontend

- Next.js App Router
- React
- TypeScript
- SCSS
- Responsive Web Design

### Backend / API

- Next.js API Routes
- REST API integration
- Nodemailer
- Google reCAPTCHA validation
- Environment variables configuration

### CMS

- Strapi CMS
- Content Types / Single Types
- API-based content delivery
- Dynamic content management
- Media management

### Database

- PostgreSQL for Strapi CMS
- Basic relational database structure
- Environment-based database configuration

### Integrations

- Google reCAPTCHA v2
- Google Maps API
- Cookie consent system
- External API services loaded conditionally after user consent

### DevOps / Deployment

- Netlify deployment for frontend
- Linux VPS configuration for CMS
- Docker / Docker Compose
- Nginx reverse proxy
- Environment variables
- Domain and deployment configuration

## Features

### Modular Architecture

The application is structured using a modular component-based architecture.

Key elements:

- reusable UI components
- separated logic using custom hooks
- context-based state management
- clear separation between UI, logic and API
- reusable page sections and templates

### Internationalization

The project supports multiple languages using a JSON-based translation system.

Features:

- dynamic language switching
- modular translation files
- reusable translation hook
- language-based content rendering

### CMS Integration

The project is being integrated with Strapi CMS to allow content management without code changes.

Implemented / planned areas:

- dynamic page content from CMS
- reusable content structures
- API-based data fetching
- server-side data loading in Next.js
- media and image handling
- cache/revalidation strategy

### Custom React Hooks

The project uses custom hooks to keep components clean and reusable.

Examples:

- `useTranslation` – language management and translations
- `useIntersectionHide` – scroll-based UI behavior using IntersectionObserver
- cookie consent related logic for loading external services

### Contact API

A custom API endpoint handles the contact form.

Features:

- server-side email sending
- Google reCAPTCHA validation
- input validation
- error handling
- environment variable configuration
- integration with Nodemailer

### Cookie Consent System

External services such as Google Maps and reCAPTCHA are loaded only after the user accepts cookies.

This improves:

- privacy compliance
- performance
- resource loading control
- user consent management

### Performance Optimization

The project focuses on modern frontend optimization techniques.

Implemented solutions:

- lazy loading
- code splitting
- dynamic imports
- optimized media loading
- IntersectionObserver-based animations
- optimized image rendering

### Deployment and Maintenance

The frontend is deployed on Netlify, while the CMS is prepared for deployment on a Linux VPS.

The CMS infrastructure includes:

- Docker Compose setup
- PostgreSQL database
- Nginx reverse proxy
- environment variables
- domain configuration
- persistent uploads storage
- production-oriented configuration

## What this project demonstrates

This project demonstrates practical experience with:

- building and maintaining a React/Next.js application
- integrating frontend with backend APIs
- creating reusable components and hooks
- working with CMS-based content
- configuring environment variables
- deploying applications
- working with Linux, Docker and databases
- solving real-world frontend, backend and deployment problems

## Getting Started

Install dependencies:

```bash
npm install

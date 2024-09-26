# Avis - Car Rental Reservation System

## Introduction
Avis is a comprehensive car rental reservation platform designed to provide an easy and responsive user experience for customers and admins. Customers can browse, book, and manage car rentals, while administrators have powerful tools to oversee inventory, bookings, and returns.

## Project Description
Avis aims to streamline the process of renting cars. Users can explore available cars, review detailed information, and make reservations, while admins manage the cars, bookings, and customer accounts. The platform integrates secure payment processing through AamarPay, allowing users to pay after returning a car. The system features both public pages for general users and protected pages for authenticated users and admins.

## Features
- **Public Pages**:
  - Home Page with search functionality, featured cars, and customer reviews.
  - Car Listing Page with filters for car type, price range, and features.
  - Car Details Page with high-quality images, pricing, and additional features like insurance and GPS.
  - About Us Page with company details and contact information.
  - 404 Error Page with navigation options.

- **User Authentication**:
  - Sign Up and Login forms with validation, password recovery, and real-time feedback.

- **User Dashboard**:
  - Manage personal data and view booking history.
  - Cancel or modify bookings (if allowed) and manage payments.

- **Admin Dashboard**:
  - Add, update, and delete cars.
  - Manage customer bookings, returns, and user accounts.
  - Generate reports on car usage, bookings, and revenue.

- **Booking and Payment**:
  - Users can search for cars, select additional services, and book directly.
  - Secure payment processing integrated with AamarPay.

- **Reports**:
  - Admins can generate reports on car usage and revenue, filter by date ranges, and print reports.

## Technology Stack
- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Gateway**: SSL Commerez
- **Deployment**: Vercel (Frontend & Backend)
- **Other Tools**: TypeScript, SSL Commerez

## Installation Guideline

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB Atlas** or local MongoDB instance
- **SSL Commerecez** account for payment gateway setup

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DevPronob/assignment-3.git
   cd assignment-3


## Configuration

Create a `.env` file in the root directory of the server with the following environment variables:

```env
PORT=5000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/avis?retryWrites=true&w=majority
SALT_ROUND=5
NODE_ENV=development
JWT_SECRET=your_jwt_secret
BASEURL=http://localhost:5173
SSL_STORE_ID=ccc66f3af6144f2b
SSL_KEY=ccc66f3af6144f2b@ssl



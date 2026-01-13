# Ticket Booking Web Application

A seat-level ticket booking system built using Flask and SQLite that allows users to browse events, select seats, book tickets, and submit reviews.

---

## Overview

This project is a web-based ticket booking platform designed for small to medium-scale venues.  
Users can browse events, select specific seat numbers, and book tickets.  
Admins can manage venues and events, monitor bookings, and export system data.

The system focuses on **data integrity**, **transaction safety**, and **role-based access control**.

---

## Tech Stack

- Backend: Flask (Python)
- Database: SQLite
- ORM: SQLAlchemy
- Authentication: Flask-Login
- Frontend: HTML, CSS, Jinja2
- Background Jobs: Celery
- Email: SMTP
- Data Export: CSV

---

## Core Features

### Seat-Based Booking
- Seats are pre-generated per venue (Seat 1, Seat 2, …)
- Users can book multiple seats in one transaction
- Each seat has a status: `available` or `booked`

### Overbooking Protection
Seat booking is handled using database transactions.  
If two users attempt to book the same seat, only one succeeds.

---

## User Roles

### Admin
- Create venues and events
- View seat and booking statistics
- Export users, events, and bookings as CSV

### Normal User
- Browse events
- Select seats
- Book tickets
- Leave reviews for booked events

---

## Review System

Users can submit reviews for:
- Events
- Venues  

Rules:
- Only users who booked the event can review
- Reviews include text + numerical rating
- Users can edit or delete their own reviews
- Review prompt emails are sent after booking

---

## Background Jobs

Celery is used for:
- Booking confirmation emails
- Review reminder emails  
All emails are sent asynchronously using SMTP.

---

## Limitations

- Local deployment only
- No booking cancellation
- No real-time seat refresh
- SQLite limits high-concurrency scaling
- Admin dashboard is read-only

---

## Intended Use

Academic evaluation, demos, and small-scale deployments.


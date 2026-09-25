# MediTrack — Smart Medication Adherence & Reminder System

> A beginner-friendly, full-stack, software-only implementation of **PS-05: Smart Medication Adherence System for Chronic Care**.

MediTrack is a web application that helps patients manage medicine schedules, receive reminders, record doses, monitor adherence, and optionally allow caregivers to monitor medication activity.

The MVP is designed to be built and deployed without ESP32, Arduino, sensors, or other physical hardware.

---

## 1. Problem Statement

Patients with chronic conditions often need to take multiple medicines at specific times and in prescribed quantities. Missed, delayed, or accidentally repeated doses can make medication adherence difficult, especially for elderly people and patients managing several medicines.

### PS-05 Challenge

Develop a low-cost smart medication adherence prototype that:

- Reminds users about scheduled medicines.
- Records medication access/dispensing events.
- Provides user feedback.
- May include caregiver notification or remote monitoring.

### MediTrack's Approach

MediTrack implements the problem as a web-based system:

```text
User
  ↓
Register / Login
  ↓
Add Medicines
  ↓
Create Schedule
  ↓
Medication Reminder
  ↓
Taken / Skipped / Missed
  ↓
Save Adherence Record
  ↓
History + Analytics
  ↓
Optional Caregiver Monitoring
```

---

# 2. MVP Goal

The MVP should prove that the complete medication-adherence workflow can work as a live web application.

### Core MVP

- User registration
- User login/logout
- Patient dashboard
- Add/edit/delete medicines
- Set medication schedules
- Today's medication list
- Browser/in-app reminders
- Mark medicine as Taken
- Mark medicine as Skipped
- Record missed doses
- Medication history
- Adherence percentage
- Basic charts
- Caregiver monitoring

### Optional MVP Enhancement

- AI-assisted medication schedule creation
- Push notifications
- PWA/mobile installation
- Email notifications

---

# 3. Technology Stack

The project is intentionally beginner-friendly.

## Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API
- Chart.js
- Browser Notification API

## Backend

- Node.js
- Express.js
- REST API

## Database

- MongoDB
- MongoDB Atlas
- Mongoose

## Authentication

- JWT
- bcrypt

## Notifications

### Initial version

- In-app reminders
- Browser Notification API

### Advanced version

- Service Worker
- Web Push
- Push notification service

## Deployment

Recommended free-tier setup:

```text
Frontend → Netlify / Vercel
Backend  → Render
Database → MongoDB Atlas
Code     → GitHub
```

> Free-tier limits and availability may change, so verify the current plans before deployment.

---

# 4. System Architecture

```text
                         ┌──────────────┐
                         │     User     │
                         └──────┬───────┘
                                │
                                ▼
                     ┌────────────────────┐
                     │ HTML/CSS/JavaScript│
                     │     Frontend       │
                     └─────────┬──────────┘
                               │
                         Fetch / REST API
                               │
                               ▼
                     ┌────────────────────┐
                     │ Node.js + Express  │
                     │      Backend       │
                     └─────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌──────────────────┐
        │  MongoDB Atlas  │        │ Notification / AI│
        │                 │        │    Services      │
        └─────────────────┘        └──────────────────┘
```

---

# 5. User Roles

## Patient

The patient can:

- Create an account.
- Log in.
- Add medicines.
- Set medication schedules.
- View today's medicines.
- Receive reminders.
- Mark doses as Taken or Skipped.
- View medication history.
- View adherence analytics.
- Connect a caregiver.

## Caregiver

The caregiver can:

- Create an account.
- Connect to a patient.
- View the patient's medication activity.
- View adherence statistics.
- See missed medication events.

---

# 6. Core Features

## 6.1 Authentication

Use:

```text
Registration
     ↓
Password hashing using bcrypt
     ↓
MongoDB
     ↓
Login
     ↓
JWT
     ↓
Protected dashboard
```

### Required

- Register
- Login
- Logout
- JWT authentication
- Password hashing
- Protected API routes
- Role checking

Passwords must never be stored as plain text.

---

# 7. Medication Management

Patients can create medication records.

### Fields

```text
Medicine Name
Dosage
Frequency
Time
Start Date
End Date
Instructions
```

### Example

```text
Medicine: Vitamin D
Dosage: 1 Tablet
Frequency: Weekly
Day: Sunday
Time: 10:00 AM
Instructions: After breakfast
```

### Actions

- Add medicine
- View medicine
- Edit medicine
- Delete medicine
- Activate/deactivate medicine

---

# 8. Medication Dashboard

The dashboard should immediately show the user's medication status.

Example:

```text
Good Morning

Today's Medicines

┌─────────────────────────────┐
│ Vitamin D                   │
│ 1 Tablet                    │
│ 08:00 AM                    │
│                             │
│        [ ✓ Taken ]          │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Medicine B                  │
│ 1 Tablet                    │
│ 02:00 PM                    │
│                             │
│        [ Take Now ]         │
└─────────────────────────────┘

Weekly Adherence: 92%
```

---

# 9. Medication Reminder

At the scheduled time, the application should display an in-app reminder.

Example:

```text
┌──────────────────────────────┐
│     Medication Reminder      │
├──────────────────────────────┤
│                              │
│ Time to take your medicine.  │
│                              │
│ Vitamin D                    │
│ 1 Tablet                     │
│                              │
│ [ ✓ Mark as Taken ]          │
│ [ ✕ Skip ]                   │
└──────────────────────────────┘
```

The browser Notification API can also be used when permission has been granted.

---

# 10. Important Notification Limitation

A simple JavaScript timer works reliably only while the application is active.

For example:

```text
Website open
     ↓
JavaScript timer
     ↓
Scheduled time
     ↓
Browser notification
```

For notifications when the website is not actively open, use:

```text
Service Worker
      +
Web Push
      +
Backend
```

This should be treated as an advanced feature after the basic MVP works.

---

# 11. Dose Tracking

Each scheduled medication event should have a status.

```text
PENDING
TAKEN
SKIPPED
MISSED
```

Example:

```text
Medicine       Time       Status
-----------------------------------
Vitamin D      08:00      TAKEN
Medicine B     14:00      MISSED
Medicine C     21:00      PENDING
```

When a patient clicks **Taken**, the system stores the event in MongoDB.

---

# 12. Adherence Calculation

The application should calculate adherence based on scheduled doses.

Basic formula:

```text
Adherence % =
(Taken doses / Scheduled doses) × 100
```

Example:

```text
Scheduled doses = 25
Taken doses     = 23

Adherence = (23 / 25) × 100
           = 92%
```

The dashboard can display:

```text
Weekly Adherence

92%

Taken:     23
Missed:     2
Skipped:    0
Pending:    0
```

---

# 13. Medication History

Display previous medication events in a table.

```text
Date       Medicine      Time       Status
------------------------------------------------
25 Sep     Vitamin D     08:00      Taken
25 Sep     Medicine B    14:00      Missed
24 Sep     Vitamin D     08:00      Taken
24 Sep     Medicine B    14:00      Taken
```

### Filters

- Date
- Medicine
- Status

---

# 14. Analytics

Use Chart.js for basic visualization.

Possible charts:

- Daily adherence
- Weekly adherence
- Taken vs missed doses
- Medicine-wise adherence

Example:

```text
Weekly Adherence

Mon   ██████████ 100%
Tue   ████████    80%
Wed   ██████████ 100%
Thu   ███████      70%
Fri   █████████    90%
Sat   ██████████ 100%
Sun   █████████    90%
```

---

# 15. Caregiver Dashboard

The patient can connect a caregiver.

The caregiver dashboard can show:

```text
Patient: Rajesh Kumar

Today's Adherence: 85%
Weekly Adherence: 91%

Taken:     18
Missed:     2
Pending:    1
```

Recent activity:

```text
✓ Vitamin D taken at 08:02 AM

⚠ Medicine B missed at 02:00 PM
```

The caregiver should only see information for patients who have explicitly connected with them.

---

# 16. AI Medication Schedule Assistant

AI is an optional feature and should not be the foundation of the MVP.

The user can enter natural language:

```text
I take Vitamin D every Sunday after breakfast
and my blood pressure medicine every morning at 8.
```

The AI can convert it into structured schedule information:

```text
Medicine 1
Name: Vitamin D
Frequency: Weekly
Day: Sunday
Instruction: After breakfast

Medicine 2
Name: Blood Pressure Medicine
Frequency: Daily
Time: 08:00 AM
```

The user should review and confirm the generated information before saving it.

### AI Safety

The AI feature is for schedule organization only.

It must not:

- Diagnose diseases.
- Prescribe medicine.
- Change prescriptions.
- Recommend dosage changes.
- Replace a doctor or pharmacist.

---

# 17. Database Design

## Users

```javascript
{
  _id,
  name,
  email,
  password,
  role,
  createdAt
}
```

Role:

```text
PATIENT
CAREGIVER
```

---

## Medications

```javascript
{
  _id,
  userId,
  name,
  dosage,
  frequency,
  time,
  startDate,
  endDate,
  instructions,
  isActive,
  createdAt
}
```

---

## Adherence

```javascript
{
  _id,
  userId,
  medicationId,
  scheduledTime,
  status,
  takenAt,
  createdAt
}
```

Status:

```text
TAKEN
MISSED
SKIPPED
PENDING
```

---

## Caregiver Connections

```javascript
{
  _id,
  patientId,
  caregiverId,
  status,
  createdAt
}
```

---

# 18. API Structure

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Medications

```http
GET    /api/medications
POST   /api/medications
GET    /api/medications/:id
PUT    /api/medications/:id
DELETE /api/medications/:id
```

## Adherence

```http
GET  /api/adherence/today
POST /api/adherence/:id/taken
POST /api/adherence/:id/skipped
GET  /api/adherence/history
GET  /api/adherence/analytics
```

## Caregiver

```http
POST /api/caregiver/connect
GET  /api/caregiver/patient
GET  /api/caregiver/adherence
```

## Optional AI

```http
POST /api/ai/medication-schedule
```

---

# 19. Suggested Project Structure

```text
MediTrack/
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── medications.html
│   ├── history.html
│   ├── analytics.html
│   ├── caregiver.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── medication.js
│   │   ├── reminder.js
│   │   ├── history.js
│   │   └── analytics.js
│   │
│   └── assets/
│       ├── images/
│       └── icons/
│
├── backend/
│   ├── server.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Medication.js
│   │   ├── Adherence.js
│   │   └── CaregiverConnection.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── medicationController.js
│   │   ├── adherenceController.js
│   │   └── caregiverController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── medicationRoutes.js
│   │   ├── adherenceRoutes.js
│   │   └── caregiverRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   └── services/
│       └── aiService.js
│
├── .gitignore
├── README.md
└── LICENSE
```

---

# 20. MVP Pages

Keep the first version small.

```text
/login
/register
/dashboard
/medications
/medications/add
/history
/analytics
/caregiver
/profile
```

---

# 21. Development Roadmap

## Phase 1 — UI

Build:

- Login page
- Register page
- Dashboard
- Medication form
- History page
- Analytics page
- Caregiver page

Technology:

```text
HTML
CSS
JavaScript
```

---

## Phase 2 — Frontend Logic

Learn and implement:

- DOM manipulation
- Events
- Forms
- Arrays
- Objects
- JSON
- Fetch API
- Async/await
- Date/time handling

---

## Phase 3 — Backend

Implement:

- Node.js
- Express
- REST APIs
- MongoDB
- Mongoose

Connect:

```text
Frontend
   ↓
Fetch API
   ↓
Express
   ↓
MongoDB
```

---

## Phase 4 — Authentication

Implement:

- Register
- Login
- bcrypt
- JWT
- Protected routes
- Patient/caregiver roles

---

## Phase 5 — Medication System

Implement:

- Add medicine
- Edit medicine
- Delete medicine
- Schedule
- Today's medication
- Taken/Skipped
- Missed dose detection
- History

---

## Phase 6 — Analytics

Implement:

- Adherence calculation
- Daily statistics
- Weekly statistics
- Charts

Use:

```text
Chart.js
```

---

## Phase 7 — Notifications

Start with:

```text
Browser Notification API
```

Then upgrade to:

```text
Service Worker
+
Web Push
```

---

## Phase 8 — Deployment

```text
GitHub
   │
   ├── Frontend → Netlify / Vercel
   │
   └── Backend  → Render
                    │
                    ▼
               MongoDB Atlas
```

---

# 22. Testing Checklist

## Authentication

- [ ] User can register.
- [ ] User can log in.
- [ ] Wrong password is rejected.
- [ ] Protected routes require authentication.
- [ ] Password is hashed.
- [ ] User can log out.

## Medication

- [ ] User can add medicine.
- [ ] User can edit medicine.
- [ ] User can delete medicine.
- [ ] Medicine appears on dashboard.
- [ ] Schedule is saved correctly.

## Reminders

- [ ] Scheduled medication is displayed.
- [ ] Reminder appears at the scheduled time.
- [ ] Browser notification permission is handled.
- [ ] User can mark medication as taken.
- [ ] User can skip medication.

## Adherence

- [ ] Taken dose is recorded.
- [ ] Skipped dose is recorded.
- [ ] Missed dose is recorded.
- [ ] History is displayed.
- [ ] Adherence percentage is correct.

## Caregiver

- [ ] Patient can connect caregiver.
- [ ] Caregiver can view connected patient.
- [ ] Caregiver can view adherence.
- [ ] Caregiver cannot access unrelated users.

## AI

- [ ] Natural-language schedule can be entered.
- [ ] AI output is displayed for review.
- [ ] User confirms before saving.
- [ ] AI is not presented as a medical advisor.

---

# 23. Deployment

## Frontend

Deploy the static frontend to:

- Netlify
- Vercel

## Backend

Deploy the Express server to:

- Render

## Database

Use:

- MongoDB Atlas

## Source Code

Use:

- GitHub

Example architecture:

```text
https://your-meditrack-site.netlify.app
                │
                │ REST API
                ▼
https://your-meditrack-api.onrender.com
                │
                ▼
         MongoDB Atlas
```

---

# 24. Environment Variables

Create a `.env` file inside the backend.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

AI_API_KEY=your_ai_api_key
```

Never upload `.env` to GitHub.

Add:

```text
.env
node_modules/
```

to `.gitignore`.

---

# 25. Security Requirements

The application should follow basic security practices.

### Authentication

- Hash passwords with bcrypt.
- Use JWT for authentication.
- Protect private API routes.

### Authorization

Patients should only access their own:

- Medicines
- Schedules
- Adherence records

Caregivers should only access patients who have explicitly connected with them.

### Sensitive information

Never expose:

- Passwords
- JWT secrets
- Database connection strings
- API keys

---

# 26. MVP vs Future Features

## MVP

```text
✓ Registration
✓ Login
✓ Patient dashboard
✓ Medication management
✓ Scheduling
✓ In-app reminders
✓ Browser notifications
✓ Taken/Skipped/Missed
✓ History
✓ Adherence percentage
✓ Basic analytics
✓ Caregiver dashboard
```

## Future

```text
○ Web Push notifications
○ PWA installation
○ Email notifications
○ SMS notifications
○ WhatsApp notifications
○ AI schedule assistant
○ Voice reminders
○ Prescription OCR
○ Medicine refill reminders
○ Multiple caregivers
○ Advanced adherence analytics
○ Healthcare-platform integrations
```

---

# 27. Medical Disclaimer

MediTrack is an educational and research prototype.

It is designed to assist with medication scheduling and adherence tracking.

It does not:

- Diagnose medical conditions.
- Prescribe medication.
- Recommend medication changes.
- Recommend dosage changes.
- Replace doctors or pharmacists.
- Guarantee medication adherence.

Users should follow the instructions provided by their qualified healthcare professional.

---

# 28. Expected Outcome

The completed MVP should demonstrate:

1. User registration and authentication.
2. Medication creation and management.
3. Medication scheduling.
4. Timely reminders.
5. Dose status recording.
6. Medication history.
7. Adherence calculation.
8. Basic analytics.
9. Caregiver monitoring.
10. A deployed, working web application.

This provides a software-only implementation of the core requirements of **PS-05: Smart Medication Adherence System for Chronic Care**.

---

# 29. Project Highlights

```text
✓ 100% Software Based
✓ No ESP32
✓ No Arduino
✓ No Sensors
✓ Beginner-Friendly Frontend
✓ Full-Stack Web Application
✓ REST API
✓ MongoDB Database
✓ JWT Authentication
✓ Password Hashing
✓ Medication Scheduling
✓ Dose Tracking
✓ Adherence Analytics
✓ Caregiver Monitoring
✓ Browser Notifications
✓ Optional AI
✓ Free-Tier Deployment
✓ Responsive Design
```

---

# 30. Team

Add your team members here:

```text
1. Name — Frontend / UI
2. Name — Backend / Database
3. Name — Notifications / Testing
4. Name — Documentation / Presentation
```

---

## MediTrack

**Simple medication scheduling, reminders, and adherence tracking for better day-to-day medication management.**

Built as an educational implementation of **PS-05: Smart Medication Adherence System for Chronic Care**.

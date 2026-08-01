# Application Flow Document

## Project Name

KarbonShrunkhala
Blockchain-Based Blue Carbon Registry and MRV System

Version: 1.0

---

# 1. Purpose

This document describes how users interact with the application from login to completing their tasks. It explains the navigation between pages, user journeys for each role, and the major workflows inside the platform.

---

# 2. User Roles

The application consists of four main user roles:

- NGO / Community
- Verifier (NCCR)
- Government Admin (MoES)
- Corporate Buyer

Each role has its own dashboard and permissions.

---

# 3. Application Entry Flow

```
Landing Page

↓

Login / Register

↓

Google Login or Email Login

↓

Authentication Successful

↓

User Role Identified

↓

Redirect to Role Dashboard
```

---

# 4. Landing Page Flow

The landing page introduces the platform and allows users to explore basic information before logging in.

Features:

- Hero Section
- About Project
- Features
- How It Works
- Carbon Marketplace Overview
- Contact Information
- Login Button
- Register Button

Navigation

```
Landing Page

↓

Login

OR

Register
```

---

# 5. Authentication Flow

```
Login Page

↓

Google Login
OR
Email Login

↓

Supabase Authentication

↓

Check User Role

↓

Redirect to Dashboard
```

If authentication fails

```
Show Error Message

↓

Stay on Login Page
```

---

# 6. NGO User Journey

### Dashboard

After login the NGO lands on its dashboard.

Dashboard contains

- Project Statistics
- Active Projects
- Pending Verifications
- Carbon Credits Earned
- Notifications

Navigation

```
Dashboard

↓

My Projects

↓

Create Project

↓

Project Details Form

↓

Upload GeoJSON

↓

Upload Supporting Documents

↓

Submit Project
```

---

## Project Status Flow

Every project passes through different stages.

```
Draft

↓

Submitted

↓

Under Verification

↓

Approved

↓

Carbon Credits Issued

↓

Marketplace Listed
```

If rejected

```
Rejected

↓

NGO Updates Project

↓

Resubmit
```

---

## NGO Project Details Page

Each project contains

- Basic Information
- Location
- GeoJSON Boundary
- Images
- Documents
- Satellite Reports
- Verification History
- Carbon Credits

Possible actions

- Edit Project
- Upload New Evidence
- View NDVI Reports
- Request Verification

---

# 7. Satellite Monitoring Flow

Satellite monitoring starts after project submission.

```
Project Submitted

↓

GeoJSON Sent

↓

Google Earth Engine

↓

Sentinel-2 Imagery

↓

NDVI Calculation

↓

Vegetation Report Generated

↓

Stored in Database

↓

Displayed on Dashboard
```

The NGO can only view reports.

No manual editing is allowed.

---

# 8. Verification Flow

Verifier Dashboard contains

- Pending Projects
- Approved Projects
- Rejected Projects
- Satellite Reports

Navigation

```
Pending Projects

↓

Open Project

↓

View Documents

↓

View Satellite Report

↓

View NDVI Trend

↓

Approve

OR

Reject
```

If approved

```
Blockchain Credit Issuance Starts
```

If rejected

```
Reason Added

↓

Returned to NGO
```

---

# 9. Blockchain Flow

After approval

```
Project Approved

↓

Blockchain Smart Contract

↓

Carbon Credits Minted

↓

Credits Assigned

↓

Blockchain Transaction Stored

↓

Marketplace Listing Created
```

NGO receives notification after successful minting.

---

# 10. Marketplace Flow

Corporate buyers access the marketplace.

Marketplace contains

- Available Credits
- Project Information
- Carbon Quantity
- Price
- Verification Date

Navigation

```
Marketplace

↓

View Credit

↓

View Project Details

↓

Purchase Credits

↓

Payment

↓

Blockchain Ownership Updated

↓

ESG Certificate Generated
```

---

# 11. Corporate Buyer Journey

Dashboard contains

- Purchased Credits
- ESG Certificates
- Transactions
- Saved Projects

Flow

```
Dashboard

↓

Marketplace

↓

Purchase Credits

↓

Download ESG Certificate
```

---

# 12. Government Admin Journey

Dashboard contains

- Total Projects
- Total NGOs
- Total Credits
- Total Transactions
- National Statistics

Admin can

- Manage Users
- Manage Verifiers
- View Reports
- Monitor Activities
- View Audit Logs

Navigation

```
Dashboard

↓

Users

↓

Projects

↓

Marketplace

↓

Analytics

↓

Audit Logs
```

---

# 13. Notifications Flow

Users receive notifications when

NGO

- Project Approved
- Project Rejected
- Credits Issued

Verifier

- New Project Submitted

Corporate

- Purchase Successful
- Certificate Generated

Government

- Platform Alerts

---

# 14. Error Flow

Examples

Authentication Error

```
Login

↓

Invalid Credentials

↓

Show Error

↓

Retry
```

Project Submission Error

```
Create Project

↓

Missing Information

↓

Show Validation

↓

Correct Details

↓

Submit Again
```

Verification Error

```
Verifier Rejects

↓

Reason Stored

↓

Returned to NGO

↓

Resubmit
```

---

# 15. Logout Flow

```
Any Dashboard

↓

Profile Menu

↓

Logout

↓

Session Cleared

↓

Landing Page
```

---

# 16. Overall Application Flow

```
Landing Page

↓

Authentication

↓

Role Identification

↓

Dashboard

↓

Project Registration

↓

Satellite Monitoring

↓

Verification

↓

Blockchain Credit Issuance

↓

Marketplace

↓

Corporate Purchase

↓

ESG Certificate

↓

Transaction History
```

---

# 17. Screen List

Public Screens

- Landing Page
- Login
- Register

NGO Screens

- Dashboard
- My Projects
- Create Project
- Project Details
- Upload Evidence
- Satellite Reports
- Carbon Credits
- Profile

Verifier Screens

- Dashboard
- Pending Projects
- Verification Details
- Approval History

Government Screens

- Dashboard
- User Management
- Project Management
- Analytics
- Audit Logs

Corporate Screens

- Dashboard
- Marketplace
- Credit Details
- Purchase History
- ESG Certificates
- Profile

---

# 18. Future Navigation

Future versions may include

- AI Assistant
- Mobile Offline Mode
- Drone Upload Module
- Government API Integration
- International Carbon Marketplace
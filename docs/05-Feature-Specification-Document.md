# Feature Specification Document

## Project Name

KarbonShrunkhala
Blockchain-Based Blue Carbon Registry and MRV System

Version: 1.0

---

# 1. Purpose

This document provides a detailed breakdown of every module in the application.

It defines:

- Features
- User interactions
- Permissions
- Inputs
- Outputs
- Business rules

This document acts as the development guide before building the application.

---

# 2. Authentication Module

## Purpose

Allow users to securely access the platform.

### Features

- Google Login
- Email Login
- Logout
- Session Management

### Inputs

- Email
- Password

OR

- Google Account

### Outputs

- Authenticated User
- Assigned Role
- Redirect to Dashboard

### Permissions

Accessible to everyone.

---

# 3. Profile Module

## Purpose

Manage user profile information.

### Features

- View Profile
- Edit Profile
- Upload Profile Picture
- Change Organization Details

### Inputs

- Name
- Phone Number
- Organization
- Profile Image

### Outputs

Updated profile information.

---

# 4. NGO Dashboard

## Purpose

Display project overview.

### Features

- Total Projects
- Pending Verification
- Approved Projects
- Carbon Credits Earned
- Notifications

### Available Actions

- Create Project
- View Projects
- Upload Evidence
- View Satellite Reports

---

# 5. Project Management Module

## Purpose

Allow NGOs to create and manage Blue Carbon projects.

### Features

- Create Project
- Edit Project
- Delete Draft
- Submit Project
- View Project Status

### Required Fields

- Project Name
- Description
- Ecosystem Type
- Area
- State
- District
- GeoJSON Boundary

### Project Status

- Draft
- Submitted
- Under Verification
- Approved
- Rejected
- Credits Issued

### Business Rules

Projects cannot be edited after submission unless rejected.

---

# 6. Document Upload Module

## Purpose

Store project-related evidence.

### Upload Types

- GeoJSON
- Images
- Reports
- PDF Documents

### Features

- Upload
- Replace
- Delete (before submission)
- Preview

### Validation

Only supported file formats are accepted.

---

# 7. Satellite Monitoring Module

## Purpose

Monitor restoration progress using satellite imagery.

### Features

- NDVI Calculation
- EVI Calculation
- Historical Comparison
- Vegetation Health Indicator

### Inputs

- GeoJSON
- Date Range

### Outputs

- NDVI Score
- EVI Score
- Vegetation Status
- Satellite Report

### Business Rules

Satellite reports are generated automatically.

Users cannot manually edit reports.

---

# 8. Verification Module

## Purpose

Allow verifiers to review submitted projects.

### Features

- Review Documents
- Review Satellite Reports
- Approve Project
- Reject Project
- Request Revisions

### Approval Criteria

Verifier reviews

- Project Details
- GeoJSON
- Evidence
- NDVI Reports

### Outputs

- Approved
- Rejected
- Needs Revision

---

# 9. Blockchain Module

## Purpose

Issue tamper-proof carbon credits.

### Features

- Mint Carbon Credits
- Store Blockchain Transaction
- Store Token ID
- Track Ownership

### Trigger

Runs automatically after project approval.

### Outputs

- Carbon Credits
- Blockchain Transaction Hash

---

# 10. Carbon Credit Module

## Purpose

Manage issued credits.

### Features

- View Credits
- Credit History
- Current Balance
- Ownership Details

### Information Displayed

- Credit Quantity
- Issue Date
- Blockchain Token
- Status

---

# 11. Marketplace Module

## Purpose

Allow companies to purchase verified carbon credits.

### Features

- Browse Credits
- Filter Projects
- View Details
- Purchase Credits

### Filters

- Ecosystem Type
- State
- Credit Quantity
- Price

### Outputs

- Purchase Confirmation
- Updated Ownership

---

# 12. ESG Certificate Module

## Purpose

Generate proof of carbon credit ownership.

### Features

- Generate Certificate
- Download PDF

Certificate Contains

- Buyer Name
- Project Name
- Credits Purchased
- Purchase Date
- Blockchain Transaction
- QR Code (Future)

---

# 13. Notifications Module

## Purpose

Notify users about important events.

### NGO

- Project Approved
- Project Rejected
- Credits Issued

### Verifier

- New Project Submitted

### Corporate

- Purchase Successful
- Certificate Ready

### Government

- Platform Alerts

---

# 14. Government Dashboard

## Purpose

Monitor the complete platform.

### Features

- Total Users
- Total Projects
- Total Credits
- Marketplace Statistics
- Audit Logs

### Actions

- Manage Users
- Manage Verifiers
- View Reports

---

# 15. Analytics Module

## Purpose

Provide insights into platform activity.

### Charts

- NDVI Trends
- Credits Issued
- Marketplace Sales
- Project Status Distribution

### Statistics

- Total NGOs
- Total Projects
- Verified Projects
- Carbon Credits Issued

---

# 16. Search Module

## Features

Users can search by

- Project Name
- State
- Ecosystem Type
- Organization

---

# 17. Filter Module

Available Filters

Projects

- Status
- State
- Ecosystem
- Date

Marketplace

- Price
- Credits
- Ecosystem
- Availability

---

# 18. Audit Module

Purpose

Track important activities.

Events Logged

- Login
- Project Creation
- Project Approval
- Credit Issuance
- Credit Purchase

Only Government Admin can view audit logs.

---

# 19. Access Control

| Module | NGO | Verifier | Government | Corporate |
|---------|-----|----------|------------|-----------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Create Project | ✅ | ❌ | ❌ | ❌ |
| Manage Project | ✅ | ❌ | ❌ | ❌ |
| Satellite Reports | ✅ | ✅ | ✅ | ❌ |
| Verification | ❌ | ✅ | ✅ | ❌ |
| Marketplace | View | View | View | Buy |
| ESG Certificate | Own | ❌ | View | Own |
| User Management | ❌ | ❌ | ✅ | ❌ |
| Audit Logs | ❌ | ❌ | ✅ | ❌ |

---

# 20. Future Features

The following features are planned for future versions.

- AI Vegetation Prediction
- Drone Image Upload
- Mobile Offline Mode
- IoT Sensor Integration
- Carbon Credit Price Prediction
- Multi-language Support
- QR Verification for Certificates

---

# 21. Module Dependencies

Authentication

↓

Profile

↓

Project Management

↓

Document Upload

↓

Satellite Monitoring

↓

Verification

↓

Blockchain

↓

Carbon Credits

↓

Marketplace

↓

ESG Certificates

---

# 22. Summary

KarbonShrunkhala is divided into independent modules that communicate through the backend APIs.

Each module has clearly defined responsibilities, permissions, and workflows.

This modular structure allows the application to be developed, tested, and maintained efficiently while making it easier for different team members to work on separate features simultaneously.
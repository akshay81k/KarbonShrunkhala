# Product Requirements Document (PRD)

## Project Name

KarbonShrunkhala
Blockchain-Based Blue Carbon Registry and MRV System

Version: 1.0

---

# 1. Introduction

KarbonShrunkhala is a web and mobile platform designed to improve the transparency, monitoring, verification, and trading of Blue Carbon projects in India.

The platform focuses on ecosystems such as:

- Mangroves
- Seagrass
- Salt Marshes

The system combines satellite monitoring, blockchain technology, and modern web technologies to create a trustworthy carbon credit ecosystem.

Instead of depending on lengthy manual audits, the system automatically monitors restoration projects using satellite imagery and stores important records on blockchain to ensure transparency.

---

# 2. Problem Statement

Current Blue Carbon projects face several challenges:

- Carbon credits are often issued based on manual reports.
- Verification takes several months.
- Existing systems are mostly centralized.
- Carbon credits are difficult to trace.
- Fraud and duplicate credit issuance are possible.
- Small NGOs and local communities struggle to participate.

There is currently no unified platform that combines:

- Project Registration
- Satellite Monitoring
- Automated Verification
- Blockchain Registry
- Carbon Credit Marketplace

into a single system.

---

# 3. Project Objective

The objective of KarbonShrunkhala is to build a transparent and automated Blue Carbon Management Platform that:

- Registers restoration projects
- Tracks project progress using satellite imagery
- Assists verifiers in project verification
- Stores important records on blockchain
- Issues tamper-proof carbon credits
- Allows companies to purchase verified carbon credits

---

# 4. Target Users

The platform is designed for multiple stakeholders.

## NGO / Community

Responsible for:

- Registering projects
- Uploading project information
- Uploading GeoJSON boundaries
- Uploading field evidence
- Monitoring restoration progress
- Receiving carbon credits

---

## Verifier (NCCR)

Responsible for:

- Reviewing project details
- Checking satellite reports
- Approving or rejecting projects
- Verifying carbon credit issuance

---

## Government Admin (MoES)

Responsible for:

- Managing users
- Monitoring all projects
- Managing verifiers
- Viewing national statistics
- Maintaining transparency

---

## Corporate Buyer

Responsible for:

- Browsing verified carbon credits
- Purchasing credits
- Downloading ESG certificates
- Viewing transaction history

---

# 5. Core Features

## Authentication

- Google Login
- Email Login
- Secure Authentication
- Role-Based Access

---

## Project Management

- Register Blue Carbon Projects
- Upload Project Details
- Upload GeoJSON Boundary
- Upload Supporting Documents
- Upload Field Images

---

## Satellite Monitoring

- Automatic NDVI Calculation
- Vegetation Monitoring
- Historical NDVI Comparison
- Project Health Dashboard

---

## Verification Module

- Project Review
- Evidence Verification
- Satellite Report Review
- Approval / Rejection Workflow

---

## Blockchain Module

- Store Project Metadata
- Store Verification Records
- Mint Carbon Credits
- Track Ownership
- Prevent Duplicate Credits

---

## Marketplace

- Browse Verified Projects
- Purchase Carbon Credits
- Transaction History
- ESG Certificate Generation

---

## Dashboard

Different dashboards for:

- NGO
- Verifier
- Government
- Corporate Buyer

Each dashboard only displays relevant information.

---

# 6. User Roles

| Role | Permissions |
|-------|-------------|
| NGO | Register and manage projects |
| Verifier | Verify projects and approve credits |
| Government | Manage entire platform |
| Corporate Buyer | Buy verified carbon credits |

---

# 7. Functional Requirements

The system should allow users to:

- Register an account
- Login securely
- Create restoration projects
- Upload GeoJSON files
- Upload field evidence
- Monitor project progress
- View NDVI reports
- Request verification
- Approve or reject projects
- Mint blockchain-based carbon credits
- Purchase carbon credits
- Generate ESG certificates

---

# 8. Non-Functional Requirements

The system should be:

- Secure
- Responsive
- Easy to use
- Scalable
- Reliable
- Transparent
- Mobile Friendly

---

# 9. MVP Scope

The first version of the project will include:

✅ Authentication

✅ Role-Based Access

✅ Project Registration

✅ GeoJSON Upload

✅ Satellite NDVI Monitoring

✅ Verification Dashboard

✅ Blockchain Credit Issuance

✅ Carbon Marketplace

✅ ESG Certificate Generation

---

# 10. Future Scope

Future improvements may include:

- AI-based vegetation prediction
- Drone image integration
- IoT Sensor Integration
- Carbon Credit Price Prediction
- Mobile Offline Mode
- Government API Integration
- International Carbon Registry Integration

---

# 11. Project Success Criteria

The project will be considered successful if it can:

- Register Blue Carbon projects
- Monitor restoration using satellite imagery
- Verify projects through an approval workflow
- Issue blockchain-backed carbon credits
- Allow secure marketplace transactions
- Generate ESG certificates
- Maintain transparent project history

---

# 12. Project Workflow Summary

NGO registers project

↓

Uploads GeoJSON & project details

↓

Satellite monitoring starts

↓

NDVI reports generated

↓

Verifier reviews project

↓

Project approved

↓

Blockchain mints carbon credits

↓

Credits become available in marketplace

↓

Corporate purchases credits

↓

ESG certificate generated

---

# 13. Expected Outcome

KarbonShrunkhala aims to create a transparent and trustworthy Blue Carbon ecosystem by combining satellite monitoring, blockchain technology, and a user-friendly platform. The system will reduce manual work, improve trust, and make carbon credit management more efficient for NGOs, government agencies, verifiers, and corporate buyers.
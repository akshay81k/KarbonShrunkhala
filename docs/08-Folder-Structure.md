# System Architecture & Folder Structure Document

## Project Name

KarbonShrunkhala
Blockchain-Based Blue Carbon Registry and MRV System

Version: 1.0

---

# 1. Purpose

This document defines how the project should be organized.

It ensures every team member follows the same project structure, naming conventions, and coding practices.

Following this structure will make the project easier to develop, maintain, and debug.

---

# 2. Overall Project Structure

```

karbonshrunkhala/

│

├── frontend/

├── backend/

├── python-service/

├── smart-contracts/

├── docs/

└── README.md

```

Each folder is an independent application.

---

# 3. Frontend Structure

```

frontend/

│

├── public/

│

├── src/

│   ├── assets/

│   ├── components/

│   │

│   ├── layouts/

│   │

│   ├── pages/

│   │

│   ├── routes/

│   │

│   ├── hooks/

│   │

│   ├── services/

│   │

│   ├── context/

│   │

│   ├── utils/

│   │

│   ├── constants/

│   │

│   ├── types/

│   │

│   ├── styles/

│   │

│   ├── App.jsx

│   └── main.jsx

│

└── package.json

```

---

# 4. React Pages

Public Pages

- Landing
- Login
- Register

NGO

- Dashboard
- Projects
- Create Project
- Project Details
- Reports
- Credits

Verifier

- Dashboard
- Pending Projects
- Review Project

Government

- Dashboard
- Analytics
- User Management
- Audit Logs

Corporate

- Dashboard
- Marketplace
- Purchase History
- Certificates

---

# 5. Component Organization

Reusable Components

Examples

- Navbar
- Sidebar
- Footer
- Button
- Card
- Table
- Modal
- Loader
- Pagination
- Charts

Feature Components

Examples

Project Card

Marketplace Card

NDVI Chart

GeoJSON Viewer

Verification Timeline

---

# 6. Backend Structure

```

backend/

│

├── src/

│

├── config/

│

├── middleware/

│

├── routes/

│

├── controllers/

│

├── services/

│

├── repositories/

│

├── validators/

│

├── prisma/

│

├── utils/

│

├── constants/

│

├── blockchain/

│

├── satellite/

│

├── storage/

│

├── notifications/

│

├── app.js

│

└── server.js

```

---

# 7. Route Structure

```

auth.routes.js

profile.routes.js

project.routes.js

document.routes.js

verification.routes.js

satellite.routes.js

marketplace.routes.js

credit.routes.js

certificate.routes.js

notification.routes.js

analytics.routes.js

admin.routes.js

```

---

# 8. Controller Structure

Every route has its own controller.

Example

```

ProjectController

↓

createProject()

updateProject()

deleteProject()

submitProject()

getProjects()

getProject()

```

---

# 9. Service Layer

Business logic belongs here.

Example

```

ProjectService

VerificationService

MarketplaceService

BlockchainService

SatelliteService

NotificationService

```

Controllers should stay small.

---

# 10. Repository Layer

Only handles database operations.

Example

```

ProjectRepository

UserRepository

MarketplaceRepository

VerificationRepository

```

Uses Prisma internally.

---

# 11. Middleware

Examples

Authentication

Role Authorization

Error Handler

Request Validation

Rate Limiter

Logger

---

# 12. Python Service Structure

```

python-service/

│

├── app/

│

├── routes/

│

├── services/

│

├── gee/

│

├── utils/

│

├── models/

│

├── main.py

│

└── requirements.txt

```

---

# 13. Python Responsibilities

The Python service only handles

- Satellite Analysis
- NDVI
- EVI
- Vegetation Reports
- GeoJSON Processing

It never directly communicates with the frontend.

Only Express can call it.

---

# 14. Smart Contract Structure

```

smart-contracts/

│

├── contracts/

│

├── scripts/

│

├── test/

│

├── ignition/

│

├── artifacts/

│

├── hardhat.config.js

│

└── package.json

```

Contracts

CarbonRegistry.sol

CarbonCredit.sol

Marketplace.sol

---

# 15. Database Organization

Prisma manages

```

schema.prisma

↓

Migration

↓

Generated Client

```

Never manually modify production tables.

---

# 16. File Storage

Supabase Storage

- Profile Images
- Temporary Files

IPFS

- GeoJSON
- Verification Reports
- Certificates

---

# 17. Naming Conventions

Folders

lowercase

Example

```

components/

services/

middleware/

```

Files

camelCase

```

projectService.js

marketplaceController.js

```

React Components

PascalCase

```

Navbar.jsx

ProjectCard.jsx

MarketplaceCard.jsx

```

Database

snake_case

```

created_at

updated_at

project_name

```

---

# 18. API Naming

Good

```

GET /projects

POST /projects

GET /projects/:id

```

Avoid

```

/getProjects

/createProject

```

Follow REST standards.

---

# 19. Git Branch Strategy

Main Branch

```

main

```

Development Branch

```

develop

```

Feature Branches

```

feature/auth

feature/projects

feature/blockchain

feature/satellite

feature/marketplace

```

Bug Fixes

```

bugfix/login

bugfix/dashboard

```

---

# 20. Coding Standards

Always

- Use async/await
- Validate request data
- Handle errors
- Keep functions small
- Use meaningful variable names

Avoid

- Duplicate code
- Hardcoded values
- Long controller functions

---

# 21. Environment Files

Frontend

```

.env

```

Backend

```

.env

```

Python

```

.env

```

Never upload these files to GitHub.

---

# 22. Documentation

Every major module should contain

Purpose

Dependencies

Functions

Example Usage

---

# 23. Team Responsibilities

Frontend Developer

- UI
- API Integration

Backend Developer

- APIs
- Database

Python Developer

- Satellite Processing

Blockchain Developer

- Smart Contracts
- Token Issuance

Although team members have separate responsibilities, everyone should understand the overall project architecture.

---

# 24. Summary

KarbonShrunkhala follows a modular architecture where each service has a clearly defined responsibility.

The project is divided into independent applications that communicate through REST APIs.

This structure improves scalability, simplifies debugging, and allows multiple developers to work on different parts of the project simultaneously without affecting each other's code.
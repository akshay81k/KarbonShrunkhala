# API Specification Document

## Project Name

KarbonShrunkhala
Blockchain-Based Blue Carbon Registry and MRV System

Version: 1.0

---

# 1. Purpose

This document defines all REST APIs required for communication between:

- React Web Application
- React Native App
- Express Backend
- Python Satellite Service
- Blockchain Service

Each API specifies:

- Endpoint
- HTTP Method
- Purpose
- Authentication
- Request Body
- Response

---

# 2. Authentication APIs

---

## Get Current User

GET /api/auth/me

Purpose

Return currently logged-in user.

Authentication

Required

Response

```json
{
    "id":"",
    "name":"",
    "email":"",
    "role":"NGO"
}
```

---

# 3. Profile APIs

---

## Get Profile

GET /api/profile

Authentication

Required

---

## Update Profile

PUT /api/profile

Authentication

Required

Request

```json
{
  "fullName":"",
  "phoneNumber":"",
  "organizationName":""
}
```

---

## Upload Profile Image

POST /api/profile/avatar

Authentication

Required

Content-Type

multipart/form-data

---

# 4. Project APIs

---

## Create Project

POST /api/projects

Authentication

NGO

Request

```json
{
  "projectName":"",
  "description":"",
  "ecosystemType":"",
  "areaHectares":"",
  "state":"",
  "district":""
}
```

Response

```json
{
  "message":"Project Created",
  "projectId":""
}
```

---

## Get All Projects

GET /api/projects

Authentication

Required

---

## Get Single Project

GET /api/projects/:projectId

Authentication

Required

---

## Update Project

PUT /api/projects/:projectId

Authentication

NGO

---

## Delete Draft Project

DELETE /api/projects/:projectId

Authentication

NGO

Only Draft projects can be deleted.

---

## Submit Project

POST /api/projects/:projectId/submit

Authentication

NGO

Response

Project status changes to

Submitted

---

# 5. Document Upload APIs

---

## Upload GeoJSON

POST /api/projects/:projectId/geojson

Authentication

NGO

Content-Type

multipart/form-data

---

## Upload Images

POST /api/projects/:projectId/images

Authentication

NGO

---

## Upload Reports

POST /api/projects/:projectId/documents

Authentication

NGO

---

## Get Uploaded Documents

GET /api/projects/:projectId/documents

Authentication

Required

---

# 6. Satellite Processing APIs

---

## Generate Satellite Report

POST /api/satellite/analyze

Authentication

System

Purpose

Express sends request to Python service.

Request

```json
{
  "projectId":"",
  "geojsonUrl":"",
  "startDate":"",
  "endDate":""
}
```

Response

```json
{
  "meanNDVI":0.76,
  "meanEVI":0.54,
  "vegetationHealth":"Healthy"
}
```

---

## Get Satellite Reports

GET /api/projects/:projectId/satellite

Authentication

Required

---

# 7. Verification APIs

---

## Get Pending Projects

GET /api/verifications/pending

Authentication

Verifier

---

## Approve Project

POST /api/verifications/:projectId/approve

Authentication

Verifier

Request

```json
{
   "remarks":""
}
```

---

## Reject Project

POST /api/verifications/:projectId/reject

Authentication

Verifier

Request

```json
{
    "reason":""
}
```

---

# 8. Blockchain APIs

---

## Mint Carbon Credits

POST /api/blockchain/mint

Authentication

System

Triggered automatically after approval.

---

## Get Blockchain Details

GET /api/blockchain/project/:projectId

Authentication

Required

Response

```json
{
  "tokenId":"",
  "transactionHash":"",
  "walletAddress":""
}
```

---

# 9. Carbon Credit APIs

---

## Get Credits

GET /api/credits

Authentication

Required

---

## Get Project Credits

GET /api/projects/:projectId/credits

Authentication

Required

---

# 10. Marketplace APIs

---

## List Credits

POST /api/marketplace/list

Authentication

NGO

---

## Browse Marketplace

GET /api/marketplace

Authentication

Required

Supports Filters

- State
- Ecosystem
- Price
- Credits

---

## Marketplace Details

GET /api/marketplace/:listingId

Authentication

Required

---

## Purchase Credits

POST /api/marketplace/:listingId/purchase

Authentication

Corporate

Request

```json
{
   "quantity":10
}
```

---

# 11. ESG Certificate APIs

---

## Generate Certificate

POST /api/certificates/generate

Authentication

System

---

## Download Certificate

GET /api/certificates/:certificateId

Authentication

Owner

---

# 12. Notification APIs

---

## Get Notifications

GET /api/notifications

Authentication

Required

---

## Mark Notification Read

PATCH /api/notifications/:notificationId

Authentication

Required

---

# 13. Dashboard APIs

---

## NGO Dashboard

GET /api/dashboard/ngo

Authentication

NGO

---

## Verifier Dashboard

GET /api/dashboard/verifier

Authentication

Verifier

---

## Government Dashboard

GET /api/dashboard/admin

Authentication

Government

---

## Corporate Dashboard

GET /api/dashboard/corporate

Authentication

Corporate

---

# 14. Analytics APIs

---

## Platform Analytics

GET /api/analytics

Authentication

Government

---

## NDVI Trends

GET /api/projects/:projectId/analytics

Authentication

Required

---

# 15. Search APIs

---

## Search Projects

GET /api/search/projects

Query Parameters

- keyword
- ecosystem
- state

---

## Search Marketplace

GET /api/search/marketplace

---

# 16. Audit APIs

---

## Get Audit Logs

GET /api/audit

Authentication

Government

---

# 17. API Response Format

Success

```json
{
  "success":true,
  "message":"",
  "data":{}
}
```

Error

```json
{
  "success":false,
  "message":"Something went wrong"
}
```

Validation Error

```json
{
  "success":false,
  "errors":[]
}
```

---

# 18. HTTP Status Codes

| Status | Meaning |
|---------|----------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

# 19. Authentication Rules

| Role | Access |
|------|---------|
| Public | Landing Page |
| NGO | Project APIs |
| Verifier | Verification APIs |
| Government | Admin APIs |
| Corporate | Marketplace APIs |

---

# 20. API Flow

```
React / React Native

↓

Express API

↓

Prisma ORM

↓

Supabase PostgreSQL

↓

Python Service (Satellite)

↓

Google Earth Engine

↓

Blockchain Service

↓

Polygon
```

---

# 21. Future APIs

The following APIs may be added later.

- Drone Image Upload
- AI Prediction
- Carbon Price Forecast
- Government Registry Integration
- QR Certificate Verification
- WebSocket Notifications

---

# 22. Summary

The API layer follows REST principles and acts as the communication bridge between the frontend, backend, satellite processing service, blockchain network, and database.

Every endpoint is secured using Supabase Authentication and Role-Based Access Control (RBAC), ensuring that users can only access the resources permitted for their role.
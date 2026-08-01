# Backend Architecture & Database Schema

## Project Name

KarbonShrunkhala
Blockchain-Based Blue Carbon Registry and MRV System

Version: 1.0

---

# 1. Purpose

This document defines how the backend is structured, how data is stored, and how different services communicate with each other.

It serves as the blueprint for backend development.

---

# 2. Backend Architecture

```
                 React Web App
                        │
                        │
             React Native App
                        │
                        ▼
                Express.js Backend
                        │
      ┌─────────────────┼─────────────────┐
      │                 │                 │
      ▼                 ▼                 ▼
 Supabase DB      Python Service      Blockchain
(PostgreSQL)     (Satellite MRV)       (Polygon)
      │                 │                 │
      ▼                 ▼                 ▼
 Supabase Auth   Google Earth Engine     IPFS
```

---

# 3. Authentication

Authentication is handled entirely by Supabase.

Supported login methods

- Google Login
- Email & Password

Authentication Flow

```
User

↓

Supabase Auth

↓

JWT Generated

↓

Express verifies JWT

↓

User accesses protected routes
```

The backend never stores passwords.

---

# 4. User Roles

There are four roles.

| Role | Description |
|------|-------------|
| NGO | Creates and manages projects |
| Verifier | Reviews and approves projects |
| Government | Manages the platform |
| Corporate | Purchases carbon credits |

---

# 5. Database Tables

The application uses PostgreSQL.

Authentication data is stored by Supabase.

Application data is stored in custom tables.

---

# 6. Profiles Table

Stores application-specific user information.

| Column | Type |
|---------|------|
| id | UUID (Same as Supabase Auth User ID) |
| full_name | Text |
| email | Text |
| role | Enum |
| organization_name | Text |
| phone_number | Text |
| avatar_url | Text |
| created_at | Timestamp |
| updated_at | Timestamp |

Relationship

```
Supabase Auth User

1

↓

1

Profile
```

---

# 7. Projects Table

Stores every Blue Carbon project.

| Column | Type |
|---------|------|
| id | UUID |
| owner_id | UUID |
| project_name | Text |
| description | Text |
| ecosystem_type | Enum |
| area_hectares | Decimal |
| state | Text |
| district | Text |
| geojson_url | Text |
| status | Enum |
| created_at | Timestamp |
| updated_at | Timestamp |

Status

- Draft
- Submitted
- Under Verification
- Approved
- Rejected
- Credits Issued

Relationship

```
User

1

↓

Many

Projects
```

---

# 8. Project Documents Table

Stores uploaded evidence.

| Column | Type |
|---------|------|
| id | UUID |
| project_id | UUID |
| file_name | Text |
| file_type | Text |
| storage_url | Text |
| uploaded_by | UUID |
| uploaded_at | Timestamp |

Files stored

- Images
- Reports
- GeoJSON
- PDFs

Storage

Supabase Storage / IPFS

---

# 9. Satellite Reports Table

Stores NDVI analysis.

| Column | Type |
|---------|------|
| id | UUID |
| project_id | UUID |
| report_date | Date |
| mean_ndvi | Decimal |
| mean_evi | Decimal |
| vegetation_health | Text |
| satellite_source | Text |
| report_url | Text |
| created_at | Timestamp |

Relationship

```
Project

1

↓

Many

Satellite Reports
```

---

# 10. Verification Table

Stores verifier decisions.

| Column | Type |
|---------|------|
| id | UUID |
| project_id | UUID |
| verifier_id | UUID |
| decision | Enum |
| remarks | Text |
| verified_at | Timestamp |

Decision

- Approved
- Rejected
- Needs Revision

---

# 11. Carbon Credits Table

Stores issued carbon credits.

| Column | Type |
|---------|------|
| id | UUID |
| project_id | UUID |
| quantity | Decimal |
| token_id | Text |
| blockchain_tx | Text |
| issued_at | Timestamp |

Relationship

```
Project

↓

Carbon Credits
```

---

# 12. Marketplace Table

Stores credits available for purchase.

| Column | Type |
|---------|------|
| id | UUID |
| credit_id | UUID |
| seller_id | UUID |
| price_per_credit | Decimal |
| quantity_available | Decimal |
| status | Enum |
| listed_at | Timestamp |

Status

- Active
- Sold
- Removed

---

# 13. Transactions Table

Stores marketplace purchases.

| Column | Type |
|---------|------|
| id | UUID |
| buyer_id | UUID |
| marketplace_id | UUID |
| quantity | Decimal |
| total_price | Decimal |
| blockchain_tx | Text |
| purchased_at | Timestamp |

---

# 14. ESG Certificates Table

Stores generated certificates.

| Column | Type |
|---------|------|
| id | UUID |
| transaction_id | UUID |
| certificate_url | Text |
| generated_at | Timestamp |

---

# 15. Notifications Table

Stores platform notifications.

| Column | Type |
|---------|------|
| id | UUID |
| user_id | UUID |
| title | Text |
| message | Text |
| is_read | Boolean |
| created_at | Timestamp |

---

# 16. Audit Logs Table

Stores important system activities.

| Column | Type |
|---------|------|
| id | UUID |
| user_id | UUID |
| action | Text |
| entity | Text |
| entity_id | UUID |
| created_at | Timestamp |

Examples

- Project Created
- Project Approved
- Credits Issued
- Credits Purchased

---

# 17. Relationships

```
Profile

↓

Projects

↓

Project Documents

↓

Satellite Reports

↓

Verification

↓

Carbon Credits

↓

Marketplace

↓

Transactions

↓

ESG Certificates
```

---

# 18. File Storage Strategy

Supabase Storage

- Profile Images
- Temporary Uploads

IPFS

- GeoJSON Files
- Verification Reports
- ESG Certificates
- Important Evidence

Blockchain only stores

- IPFS Hash
- Token ID
- Transaction Hash

---

# 19. Satellite Processing Flow

```
Project Created

↓

GeoJSON

↓

Python Service

↓

Google Earth Engine

↓

Sentinel-2

↓

NDVI Calculation

↓

Store Results

↓

Verifier Dashboard
```

---

# 20. Blockchain Storage

Blockchain stores only important immutable information.

Stored on-chain

- Project ID
- Token ID
- Carbon Credits Issued
- Owner Wallet
- Transaction Hash
- IPFS Hash

Not stored on blockchain

- Images
- Reports
- User Profiles
- Satellite Reports
- GeoJSON Contents

---

# 21. Role Permissions

NGO

- Create Project
- Update Project
- Upload Files
- View Reports

Verifier

- Review Projects
- Approve Projects
- Reject Projects

Government

- Manage Users
- View Analytics
- View Audit Logs

Corporate

- Browse Marketplace
- Purchase Credits
- Download Certificates

---

# 22. API Communication

```
React

↓

Express

↓

Prisma

↓

Supabase PostgreSQL
```

Satellite Processing

```
Express

↓

FastAPI

↓

Google Earth Engine
```

Blockchain

```
Express

↓

Ethers.js

↓

Polygon
```

---

# 23. Data Ownership

| Data | Storage |
|-------|---------|
| Authentication | Supabase Auth |
| User Profile | PostgreSQL |
| Projects | PostgreSQL |
| Satellite Reports | PostgreSQL |
| Marketplace | PostgreSQL |
| Notifications | PostgreSQL |
| Images | Supabase Storage |
| GeoJSON | IPFS |
| Certificates | IPFS |
| Blockchain Records | Polygon |

---

# 24. Summary

The backend follows a modular architecture where authentication, database management, satellite processing, and blockchain are separated into independent components. This keeps the application scalable, maintainable, and easier to develop as a student project.
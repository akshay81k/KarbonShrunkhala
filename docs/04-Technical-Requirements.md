# Technical Requirements Document (TRD)

## Project Name

KarbonShrunkhala
Blockchain-Based Blue Carbon Registry and MRV System

Version: 1.0

---

# 1. Purpose

This document describes the complete technical architecture of the project.

It explains:

- Technologies used
- Third-party services
- System architecture
- Communication between services
- Deployment strategy
- Security considerations

This document serves as the technical reference for the development team.

---

# 2. System Architecture

The project consists of five major components.

```

React Web Application
│
│
React Native Mobile Application
│
▼
Express.js Backend
│
├──────────────┬──────────────┬──────────────┐
│              │              │
▼              ▼              ▼
Supabase    Python API     Blockchain
(PostgreSQL) (Satellite)   (Polygon)

```

---

# 3. Frontend Technologies

## React.js (Vite)

Purpose

- Web application
- Dashboard
- Project Management
- Marketplace
- Analytics

Reason for choosing

- Fast development
- Large ecosystem
- Component-based architecture

---

## React Native (Expo)

Purpose

- Mobile application

Features

- Upload field evidence
- View projects
- Track restoration progress

Reason

Single codebase for Android and iOS.

---

## Tailwind CSS

Purpose

Application styling.

Reason

- Utility-first
- Responsive
- Easy customization

---

## shadcn/ui

Purpose

Reusable UI components.

Used for

- Cards
- Dialogs
- Tables
- Forms
- Buttons

---

## TanStack Query

Purpose

Server state management.

Used for

- API caching
- Background refetching
- Efficient data synchronization

---

## React Router

Purpose

Navigation between screens.

---

## Axios

Purpose

Communication with backend APIs.

---

## Leaflet + OpenStreetMap

Purpose

Display

- Project boundaries
- GeoJSON
- Restoration areas

Reason

Free and open-source mapping solution.

---

## Chart.js

Purpose

Visualize

- NDVI trends
- Carbon credits
- Marketplace analytics

---

# 4. Backend Technologies

## Node.js

Runtime environment.

---

## Express.js

Main backend framework.

Responsible for

- REST APIs
- Authentication middleware
- Database communication
- Blockchain communication
- File handling

Reason

Simple, lightweight, and already familiar to the development team.

---

## Prisma ORM

Purpose

Database management.

Responsibilities

- Database queries
- Relationships
- Migrations

Reason

Type-safe and easy to maintain.

---

## Supabase PostgreSQL

Primary database.

Stores

- Users
- Projects
- Marketplace
- Satellite Reports
- Notifications

Reason

Reliable relational database with managed hosting.

---

## Supabase Auth

Authentication provider.

Supports

- Google Login
- Email Login

Reason

Avoids implementing authentication manually.

---

## Supabase Storage

Stores

- Profile images
- Temporary uploads

---

# 5. Satellite Processing

## Google Earth Engine

Purpose

Satellite image processing.

Responsibilities

- Image retrieval
- Cloud filtering
- NDVI calculation

---

## Sentinel-2

Primary satellite imagery.

Reason

- Free
- High resolution
- Suitable for vegetation monitoring

---

## Python

Purpose

Satellite data processing.

---

## FastAPI

Purpose

Expose satellite processing as REST APIs.

Express communicates with FastAPI whenever satellite analysis is required.

---

## Geospatial Libraries

Used

- GeoPandas
- Rasterio
- Shapely
- PyProj

Responsibilities

- Read GeoJSON
- Process geometries
- Handle raster data

---

## Data Analysis Libraries

- NumPy
- Pandas

Responsibilities

- Numerical calculations
- Statistical analysis

---

## Visualization

Matplotlib

Used for generating NDVI graphs.

---

# 6. Blockchain Technologies

## Polygon Amoy Testnet

Purpose

Blockchain network used during development.

Reason

- Ethereum compatible
- Low transaction cost
- Easy migration to Polygon Mainnet

---

## Solidity

Used to write smart contracts.

---

## Hardhat

Development framework.

Responsibilities

- Compile contracts
- Deploy contracts
- Test contracts

---

## Ethers.js

Communication between Express backend and blockchain.

---

## Alchemy

RPC Provider.

Responsibilities

- Connect backend to Polygon
- Broadcast blockchain transactions

---

## MetaMask

Wallet used during development.

---

## OpenZeppelin

Provides secure smart contract libraries.

Used for

- Ownership
- Security
- Token standards

---

# 7. Storage Strategy

## PostgreSQL

Stores

- Users
- Projects
- Marketplace
- Transactions
- Reports

---

## Supabase Storage

Stores

- Profile images
- Temporary files

---

## IPFS

Stores immutable files.

Examples

- GeoJSON
- Verification Reports
- ESG Certificates

Blockchain stores only IPFS hashes.

---

# 8. API Communication

Main API

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

↓

Sentinel-2

```

Blockchain

```

Express

↓

Ethers.js

↓

Alchemy

↓

Polygon

```

---

# 9. Security

Authentication

- Supabase Auth

Authorization

- Role-Based Access Control

Database

- Prisma ORM

Sensitive Data

- Stored using environment variables

Blockchain

- Immutable records

File Storage

- IPFS hashes stored on blockchain

---

# 10. Environment Variables

Frontend

```

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

```

Backend

```

DATABASE_URL

SUPABASE_SERVICE_ROLE_KEY

SUPABASE_JWT_SECRET

ALCHEMY_API_KEY

PRIVATE_KEY

IPFS_JWT

```

Python Service

```

GOOGLE_APPLICATION_CREDENTIALS

GEE_PROJECT_ID

```

---

# 11. Third-Party Services

| Service | Purpose |
|----------|----------|
| Supabase | Authentication, Database, Storage |
| Google Earth Engine | Satellite Processing |
| Sentinel-2 | Satellite Data |
| Alchemy | Blockchain RPC |
| Polygon | Blockchain Network |
| IPFS | Decentralized File Storage |

---

# 12. Deployment Strategy

Frontend

- Vercel

Backend

- Render

Python Service

- Render

Database

- Supabase Cloud

Blockchain

- Polygon Amoy Testnet

---

# 13. Folder Structure

```

karbonshrunkhala/

frontend/

backend/

python-service/

smart-contracts/

docs/

```

Each service is developed independently.

---

# 14. Development Principles

The project follows these principles:

- Modular Architecture
- Separation of Concerns
- RESTful APIs
- Role-Based Access
- Reusable Components
- Secure Authentication
- Scalable Database Design

---

# 15. Future Improvements

Possible future enhancements

- AI-based vegetation prediction
- Drone image processing
- IoT sensor integration
- WebSocket notifications
- Real-time monitoring
- Multi-language support

---

# 16. Summary

KarbonShrunkhala follows a modular full-stack architecture where each component is responsible for a specific task.

Frontend handles user interaction.

Express handles business logic.

Supabase manages authentication and database.

Python processes satellite imagery.

Polygon ensures transparency and trust.

This architecture keeps the project scalable, maintainable, and suitable for future expansion.
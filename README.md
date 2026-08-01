# KarbonShrunkhala

## Blockchain-Based Blue Carbon Registry and MRV System

KarbonShrunkhala is a web and mobile platform designed to improve the transparency, monitoring, verification, and trading of Blue Carbon projects in India. The platform combines satellite monitoring, blockchain technology, and modern web technologies to create a trustworthy carbon credit ecosystem.

---

## Architecture

The project consists of four independent services:

| Service | Technology | Port | Purpose |
|---------|-----------|------|---------|
| **Frontend** | React (Vite) + Tailwind CSS + shadcn/ui | 5173 | Web application |
| **Backend** | Express.js + Prisma ORM | 5000 | REST API server |
| **Python Service** | FastAPI + Google Earth Engine | 8000 | Satellite processing |
| **Smart Contracts** | Hardhat + Solidity + OpenZeppelin | — | Blockchain (Polygon Amoy) |

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (3.12.10)
- npm or yarn
- Git

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev

http://localhost:5173/
```

### Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npm run dev

http://localhost:5000/api/health

```

### Python Service

```bash
cd python-service
cp .env.example .env
py -3.12 -m venv venv
venv\Scripts\activate      # Windows
python -m pip install -r requirements.txt
uvicorn main:app --reload --port 8000
python main.py

http://localhost:8000/health
```

### Smart Contracts

```bash
cd smart-contracts
cp .env.example .env
npm install
npx hardhat compile
```

---

## Environment Variables

Each service has a `.env.example` file. Copy it to `.env` and fill in your values.

**Never commit `.env` files to version control.**

---

## Documentation

All project documentation is in the `docs/` folder:

- `01-PRD.md` — Product Requirements Document
- `02-App-Flow.md` — Application Flow
- `03-Backend-Schema.md` — Backend Architecture & Database Schema
- `04-Technical-Requirements.md` — Technical Requirements
- `05-Feature-Specification-Document.md` — Feature Specification
- `06-API-Specification.md` — API Specification
- `07-UIUX-Design.md` — UI/UX Design
- `08-Folder-Structure.md` — Folder Structure
- `09-Implementation-Plan.md` — Implementation Plan

---

## License

This project is developed as part of an academic/research initiative.

# Filipino Bakery Website

A Filipino family run bakery website with the feel of a sari-sari store where customers are directed to pre-order what they want. Orders will only be accepted locally and will be confirmed by the owner. These orders will be uniquely identified and organized into an easy-to-use interface for the owner.

---
Note: This project requires both the FastAPI (Backend) and Next.js (Frontend) to be running simultaneously to function.

## How To Set Up And Run

### 📋 Backend Prerequisite
* Python 3.13+
* uv install guide https://docs.astral.sh/uv/getting-started/installation/
* PostgresSQL 15+ installed locally (Important)
* bun install guide https://bun.com/docs/installation

1. **From the terminal 1 on vscode:**
* cd Bakery-Website/backend
* uv sync

2. **From the terminal 2 on vscode:**
* cd Bakery-Website/frontend
* bun install

3. **create a .env file in the backend folder and add the following variables:**
* APP_NAME="Filipino Bakery API"
* SECRET_KEY="any-random-secret-key-string"
* DATABASE_URL="postgresql://user:password@localhost:5432/bakery_db"  (Note: Use your local Postgres username and password here user:"password")


4. **From the terminal 1 on vscode, in backend/ directory, initialize the Admin & Start the Server:**
* uv run python seed_admin.py (initial admin login information)
* uv run uvicorn src.app.main:app --reload

### 📖 Testing backend
Once the server is running, open: http://127.0.0.1:8000/docs

5. **From the terminal 2 on vscode, in frontend/ directory, start the server**
* bun dev

### 📖 Testing frontend
Once the server is running, open: http://localhost:3000 for regular customers
Once the server is running, open: http://localhost:3000/admin/login for admin


### 📖 Testing on fastapi/swagger
open: http://127.0.0.1:8000/docs
Authorize: Click the "Authorize" button on the Swagger UI.
Credentials: Use the email and password found in seed_admin.py.
Features: You can test Admin privileges like adding products, viewing all orders, and updating order statuses.

PyTest: From backend directory
* uv run pytest

Docker:
Download Docker locally
Make sure there are Dockerfiles in both frontend and backend, and a docker-compose.yml
Run `docker compose up --build`


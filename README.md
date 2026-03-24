# Filipino Bakery Website

A Filipino family run bakery website with the feel of a sari-sari store where customers are directed to pre-order what they want. Orders will only be accepted locally and will be confirmed by the owner. These orders will be uniquely identified and organized into an easy-to-use interface for the owner.

---

## How To Set Up And Run

### 📋 Prerequisite
* Python 3.12+
* uv install guide https://docs.astral.sh/uv/getting-started/installation/

1. **From the terminal on vscode:**
* cd Bakery-Website/backend
* uv sync

2. **create a .env file in the backend folder and add the following variables:**
* APP_NAME="Filipino Bakery API"
* SECRET_KEY="any-random-secret-key-string"
* DATABASE_URL="sqlite:///./bakery.db"

3. **From the terminal on vscode initialize the Admin & Start the Server:**
* uv run python seed_admin.py
* uv run uvicorn app.main:app --reload

### 📖 Testing
Once the server is running, open: http://127.0.0.1:8000/docs

Authorize: Click the "Authorize" button on the Swagger UI.
Credentials: Use the email and password found in seed_admin.py.
Features: You can test Admin privileges like adding products, viewing all orders, and updating order statuses.


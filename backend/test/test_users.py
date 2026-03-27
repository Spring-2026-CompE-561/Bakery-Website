# test user routes

from fastapi.testclient import TestClient
from src.app.main import app

client = TestClient(app)

# test login success
def test_login_success():
    response = client.post(
        "/api/v1/user/login",
        data={
            "username": "admin@bakery.com",
            "password": "bakery_password_2026"
        }
    )

    assert response.status_code == 200
    assert "access_token" in response.json()

# test login failure
def test_login_failure():
    response = client.post(
        "/api/v1/user/login",
        data={
            "username": "wrong@email.com",
            "password": "wrong"
        }
    )

    assert response.status_code == 401


 # helper to reuse token
def get_token():
    response = client.post(
        "/api/v1/user/login",
        data={
            "username": "admin@bakery.com",
            "password": "bakery_password_2026"
        }
    )
    return response.json()["access_token"]

# test unauthorized /me
def test_me_unauthorized():
    response = client.get("/api/v1/user/me")
    assert response.status_code == 401

# test authorized /me
def test_me_authorized():
    token = get_token()

    response = client.get(
        "/api/v1/user/me",
        headers={"Authorization": f"Bearer {token}"}
    )

    assert response.status_code == 200
    assert "email" in response.json()

# test update user
def test_update_user():
    token = get_token()

    response = client.put(
        "/api/v1/user/update",
        json={"name": "New Name"},
        headers={"Authorization": f"Bearer {token}"}
    )

    assert response.status_code == 200
    assert response.json()["name"] == "New Name"
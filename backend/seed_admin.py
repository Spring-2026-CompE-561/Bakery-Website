# This script seeds the database with an initial admin user.
import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, "src")
sys.path.append(src_path)

from app.core.database import SessionLocal, engine, Base  # noqa: E402
from app.services.user_service import UserService  # noqa: E402
from app.schemas.user import UserCreate  # noqa: E402


def run_seed():
    print("Connecting to database...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        admin_email = "admin@bakery.com"

        from app.repository.user_repository import UserRepository

        existing = UserRepository.get_by_email(db, admin_email)

        if existing:
            print(f"User '{admin_email}' found. Elevating to Admin status...")
            existing.is_admin = True
            db.commit()
            print("Success! User is now an Admin.")
            return

        print(f"Creating admin: {admin_email}")
        admin_data = UserCreate(
            email=admin_email, full_name="Bakery Admin", password="bakery_password_2026"
        )

        UserService.create_new_user(db, admin_data)
        print("Success! Admin account initialized.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    run_seed()

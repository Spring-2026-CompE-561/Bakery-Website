.PHONY: setup db app dev

setup:
	uv sync

db:
	docker compose -f backend/database/compose.yaml up -d

app:
	uv run uvicorn backend.app.main:app --reload --port 8000

backend: setup db app
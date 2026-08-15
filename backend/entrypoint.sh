#!/bin/sh
set -e

echo "Waiting for database..."
python <<'PY'
import os
import time
import psycopg2
from urllib.parse import urlparse

url = urlparse(os.environ.get("DATABASE_URL", ""))

for attempt in range(30):
    try:
        conn = psycopg2.connect(
            dbname=url.path.lstrip("/"),
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port or 5432,
        )
        conn.close()
        break
    except psycopg2.OperationalError:
        time.sleep(1)
else:
    raise SystemExit("Database not reachable after 30s")
PY

echo "Running database migrations..."
alembic upgrade head

echo "Starting API server..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

.PHONY: clean debug-build dev exec fmt lint prod restore

PROFILE?=dev


run:
	docker compose --profile ${PROFILE} up --build

exec:
	docker exec -it frontend-pawsitive-${PROFILE}-1 bash

lint:
	npm run lint

fmt:
	npm run format

check:
	docker compose --profile ${PROFILE} run --rm pawsitive-${PROFILE} npm run check

debug-build:
	docker compose --profile dev build --no-cache --progress plain

restore:
	git restore ../backend/db.sqlite3

clean:
	docker system prune -af

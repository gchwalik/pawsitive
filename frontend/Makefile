# Set the PROFILE var when calling make [command] to specify the target profile
# ex: make run PROFILE=prod, make run PROFILE=dev

.PHONY: clean debug-build dev exec fmt lint prod restore

PROFILE?=dev # or prod

COMPOSE = docker compose --profile ${PROFILE}
CONTAINER = frontend-pawsitive-${PROFILE}-1

run:
	$(COMPOSE) up --build

exec:
	docker exec -it $(CONTAINER) bash

lint:
	$(COMPOSE) run --build --rm pawsitive-dev npm run lint

fmt:
	$(COMPOSE) run --build --rm pawsitive-dev npm run format

check:
	$(COMPOSE) run --build --rm pawsitive-${PROFILE} npm run check

debug-build:
	docker compose --profile dev build --no-cache --progress plain

restore:
	git restore ../backend/db.sqlite3

clean:
	docker system prune -af

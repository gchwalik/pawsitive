# Set the PROFILE var when calling make [command] to specify the target profile
# ex: make run PROFILE=prod, make run PROFILE=dev

.PHONY: clean exec fmt lint run

PROFILE?=dev  # or prod

COMPOSE = docker compose --profile ${PROFILE}
CONTAINER = backend-pawsitive-${PROFILE}-1

run:
	$(COMPOSE) up --build

exec:
	docker exec -it $(CONTAINER) bash

lint:
	$(COMPOSE) run --build --rm pawsitive-dev ruff check

fmt:
	$(COMPOSE) run --build --rm pawsitive-dev ruff format

clean:
	docker system prune -f

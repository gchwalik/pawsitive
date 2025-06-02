.PHONY: debug-build dev prod exec lint fmt restore clean


debug-build:
	docker compose --profile dev build --no-cache --progress plain

dev:
	docker compose --profile dev up --build

prod:
	docker compose --profile prod up --build

exec:
	docker exec -it frontend-pawsitive-1 bash

lint:
	npm run lint

fmt:
	npm run format

restore:
	git restore ../backend/db.sqlite3

clean:
	docker system prune -af

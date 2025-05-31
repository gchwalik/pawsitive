.PHONY: run 

build:
	docker compose build --no-cache --progress=plain

run:
	docker compose up --build

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

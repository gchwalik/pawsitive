.PHONY: run 

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
	docker system prune -f

.PHONY: run 

run:
	docker compose up --build

exec:
	docker exec -it pawsitive-pawsitive-1 bash

clean:
	docker system prune -f

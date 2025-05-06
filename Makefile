.PHONY: run 

run:
	docker compose up --build

clean:
	docker system prune -f
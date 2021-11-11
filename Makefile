.PHONY: fresh
fresh:
	docker volume prune && clear && docker-compose up --build


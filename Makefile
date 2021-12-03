.PHONY: fresh
fresh:
	docker volume prune && clear && docker-compose up --build

.PHONY: deploy
deploy:
	git subtree split -P api -b deploy && git push heroku main:deploy


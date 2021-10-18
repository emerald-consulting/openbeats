# ============================================================================
# Globals
# ============================================================================

ECR_REPOSITORY:=318250923417.dkr.ecr.us-east-1.amazonaws.com
CONTAINER_NAME:=openbeats-api

# VERSION := $(shell git log -1 --pretty=format:"%H")
VERSION := latest
.DEFAULT_GOAL := build

# ============================================================================
# Shared/Development Commands
# ============================================================================

.PHONY: build
build:
	docker build -t $(CONTAINER_NAME):$(VERSION) .

.PHONY: run
run:
	docker-compose stop
	docker-compose up

# ============================================================================
# CI Commands
# ============================================================================

.PHONY: aws-login
aws-login:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 318250923417.dkr.ecr.us-east-1.amazonaws.com

.PHONY: pull-cache
pull-cache: aws-login
	$(eval RECENT_TAG := $(shell aws ecr describe-images --repository-name $(CONTAINER_IMAGE) --query 'reverse(sort_by(imageDetails, &imagePushedAt))[:1].imageTags[:1]' | tr -d ' []"\t\n\r\f' || true))
	$(eval CACHE_URL := $(DOCKER_IMAGE):$(RECENT_TAG))
	docker pull $(CACHE_URL) || true
	$(eval CACHE_FROM := --cache-from $(CACHE_URL))

.PHONY: push
push:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 318250923417.dkr.ecr.us-east-1.amazonaws.com
	make tag
	docker push $(ECR_REPOSITORY)/$(CONTAINER_NAME):$(VERSION)

.PHONY: tag
tag:
	docker tag openbeats-api:latest 318250923417.dkr.ecr.us-east-1.amazonaws.com/openbeat-api:latest

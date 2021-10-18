# ============================================================================
# Globals
# ============================================================================

ECR_REPOSITORY:=318250923417.dkr.ecr.us-east-1.amazonaws.com/openbeats-api
CONTAINER_NAME:=openbeats

VERSION := $(shell git log -1 --pretty=format:"%H")
.DEFAULT_GOAL := build

# ============================================================================
# Shared/Development Commands
# ============================================================================

.PHONY: build
build:
	docker build $(CACHE_FROM) -t $(CONTAINER_NAME):$(VERSION) -t $(CONTAINER_NAME):latest .

.PHONY: run
run:
	docker-compose stop
	docker-compose up

# ============================================================================
# CI Commands
# ============================================================================

.PHONY: aws-login
aws-login:
	@eval $(shell aws ecr get-login --no-include-email --region us-east-1)

.PHONY: pull-cache
pull-cache: aws-login
	$(eval RECENT_TAG := $(shell aws ecr describe-images --repository-name $(CONTAINER_IMAGE) --query 'reverse(sort_by(imageDetails, &imagePushedAt))[:1].imageTags[:1]' | tr -d ' []"\t\n\r\f' || true))
	$(eval CACHE_URL := $(DOCKER_IMAGE):$(RECENT_TAG))
	docker pull $(CACHE_URL) || true
	$(eval CACHE_FROM := --cache-from $(CACHE_URL))

.PHONY: push
push:
	eval $(shell aws ecr get-login --no-include-email --region us-east-1)
	docker tag $(CONTAINER_NAME):$(VERSION) $(ECR_REPOSITORY)/$(CONTAINER_NAME):$(VERSION)
	docker push $(ECR_REPOSITORY)/$(CONTAINER_NAME):$(VERSION)

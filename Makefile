.PHONY: dev up down logs prisma.migrate seed test backend.exec frontend.exec theme lint format

# Development
dev:
	@echo "Starting development environment..."
	docker-compose up --build

# Docker operations
up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

# Database
prisma.generate:
	docker-compose exec backend npm run prisma:generate

prisma.migrate:
	docker-compose exec backend npm run prisma:migrate

seed:
	docker-compose exec backend npx ts-node infrastructure/prisma/seeds/index.ts

# Testing
test:
	@echo "Running all tests..."
	docker-compose exec backend npm test
	docker-compose exec frontend npm test

# Shell access
backend.exec:
	docker-compose exec backend sh

frontend.exec:
	docker-compose exec frontend sh

# Code quality
lint:
	@echo "Running ESLint..."
	docker-compose exec backend npm run lint
	docker-compose exec frontend npm run lint

format:
	@echo "Running Prettier..."
	docker-compose exec backend npm run format
	docker-compose exec frontend npm run format

# Theme generation
theme:
	@echo "Generating CSS tokens..."
	docker-compose exec frontend npm run theme:generate


# Life Monorepo - Makefile
# Quick commands for development workflow

.PHONY: help install dev build lint format test clean

# Default target
help:
	@echo "Life Monorepo - Available Commands:"
	@echo ""
	@echo "Setup:"
	@echo "  make install          Install all dependencies"
	@echo "  make clean            Clean node_modules and build artifacts"
	@echo ""
	@echo "Development:"
	@echo "  make dev              Start all apps in development mode"
	@echo "  make dev-native       Start React Native app"
	@echo "  make dev-web          Start web preview (port 3000)"
	@echo "  make dev-api          Start API server (port 3001)"
	@echo ""
	@echo "Build:"
	@echo "  make build            Build all apps"
	@echo "  make build-native     Build React Native"
	@echo "  make build-web        Build web for production"
	@echo "  make build-api        Build API"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint             Lint all code with Biome"
	@echo "  make lint-fix         Fix linting issues"
	@echo "  make format           Format all code"
	@echo "  make format-check     Check formatting"
	@echo "  make check            Run Biome check (lint + format)"
	@echo "  make check-fix        Fix all Biome issues"
	@echo ""
	@echo "Testing:"
	@echo "  make test             Run all tests"
	@echo "  make test-native      Run native app tests"
	@echo "  make test-web         Run web app tests"
	@echo "  make test-api         Run API tests"
	@echo "  make test-e2e         Run E2E tests"
	@echo "  make test-coverage    Run tests with coverage"
	@echo ""
	@echo "iOS/Android:"
	@echo "  make ios              Run on iOS simulator"
	@echo "  make ios-device       Run on connected iOS device"
	@echo "  make android          Run on Android emulator"
	@echo "  make android-device   Run on connected Android device"
	@echo "  make pods             Install iOS pods"
	@echo ""
	@echo "Utilities:"
	@echo "  make type-check       Type check all packages"
	@echo "  make turbo-graph      View Turbo dependency graph"
	@echo "  make update-deps      Update all dependencies"
	@echo "  make doctor           Run OpenClaw doctor"

# Setup
install:
	npm install
	cd apps/native && npm install
	cd apps/web && npm install
	cd apps/api && npm install

clean:
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/dist
	rm -rf apps/*/build
	rm -rf apps/web/.next
	cd apps/native && rm -rf ios/build android/build

# Development
dev:
	npx turbo run dev

dev-native:
	cd apps/native && npm run start

dev-web:
	cd apps/web && npm run dev

dev-api:
	cd apps/api && npm run dev

# Build
build:
	npx turbo run build

build-native:
	cd apps/native && npm run build

build-web:
	cd apps/web && npm run build

build-api:
	cd apps/api && npm run build

# Code Quality (BiomeJS)
lint:
	npx @biomejs/biome lint .

lint-fix:
	npx @biomejs/biome lint --write .

format:
	npx @biomejs/biome format --write .

format-check:
	npx @biomejs/biome format .

check:
	npx @biomejs/biome check .

check-fix:
	npx @biomejs/biome check --write .

# Testing
test:
	npx turbo run test

test-native:
	cd apps/native && npm test

test-web:
	cd apps/web && npm test

test-api:
	cd apps/api && npm test

test-e2e:
	cd apps/web && npx playwright test

test-coverage:
	npx turbo run test -- --coverage

# iOS/Android
ios:
	cd apps/native && npx react-native run-ios

ios-device:
	cd apps/native && npx react-native run-ios --device

android:
	cd apps/native && npx react-native run-android

android-device:
	cd apps/native && npx react-native run-android --device

pods:
	cd apps/native/ios && pod install

# Utilities
type-check:
	npx turbo run check

turbo-graph:
	npx turbo run build --graph

update-deps:
	npm update
	cd apps/native && npm update
	cd apps/web && npm update
	cd apps/api && npm update

doctor:
	openclaw doctor --non-interactive

# Git workflow
commit:
	git add -A
	@read -p "Commit message: " msg; \
	git commit -m "$$msg"

push:
	git push origin main

# Deployment
preview-web:
	cd apps/web && npm run preview

deploy-web:
	cd apps/web && npm run build && npm run deploy

# Docker
docker-build:
	docker build -t life-api ./apps/api

docker-run:
	docker run -p 3001:3001 life-api

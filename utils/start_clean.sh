#!/bin/bash
# Bring down current containers, images, volumes, and orphans
docker-compose down -v --rmi all --remove-orphans

# Optional: prune unused Docker objects
docker system prune -f

# Build and start containers
docker-compose up --build

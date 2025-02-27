#!/bin/sh
sh ci/deliver.sh

docker compose -f docker-compose.yml down 2>/dev/null

docker compose -f docker-compose.yml up -d
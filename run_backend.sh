#!/usr/bin/env bash
set -e
echo "==================================================="
echo "  Starting JFSD Spring Boot Backend (Port 8080)..."
echo "==================================================="
cd "$(dirname "$0")/backend"
chmod +x mvnw
./mvnw spring-boot:run

#!/usr/bin/env bash
set -e
echo "==================================================="
echo "  Starting JFSD React Frontend (Port 3000)..."
echo "==================================================="
cd "$(dirname "$0")/frontend"
npm install
npm start

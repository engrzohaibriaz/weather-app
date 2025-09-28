#!/bin/sh
set -e

# API_URL environment variable or default
API_URL=${API_URL:-http://todoapi:8080/api/todo}

# Create config directory
mkdir -p /usr/share/nginx/html/assets/config

# Write dynamic runtime config
echo "{
  \"apiUrl\": \"/api/todo\"
}" > /usr/share/nginx/html/assets/config/config.json

# Start Nginx in foreground
exec nginx -g 'daemon off;'

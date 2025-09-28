#!/bin/sh
set -e

# Internal API URL (default for Docker Compose use)
API_URL_INTERNAL=${API_URL_INTERNAL:-http://todoapi:8080/api/}

# Create config directory for Angular
mkdir -p /usr/share/nginx/html/assets/config

# Always point frontend to relative URL
cat <<EOF > /usr/share/nginx/html/assets/config/config.json
{
  "apiUrl": "/api/todo"
}
EOF

# Replace placeholder in nginx.conf with environment variable
sed -i "s|__API_URL_INTERNAL__|$API_URL_INTERNAL|g" /etc/nginx/conf.d/default.conf

# Start Nginx in foreground
exec nginx -g 'daemon off;'

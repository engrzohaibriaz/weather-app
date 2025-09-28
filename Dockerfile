# Stage 1: Build Angular
FROM node:22 AS build
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Angular project
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/weather-app/browser /usr/share/nginx/html

# Copy custom Nginx config and entrypoint
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Run entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]

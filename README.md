sudo docker build -t engrzohaibriaz/weather-app:latest .  

docker run --name weather-app \
  -d \
  -p 8081:80 \
  --network mybmwnet \
  -e API_URL_INTERNAL="http://todoapi:8080/api/" \
  engrzohaibriaz/weather-app
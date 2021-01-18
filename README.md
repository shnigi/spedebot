Create your own bot with @botfather on Telegram

Install NodeJs > 12
create .env file to project root

Add apikeys to .env

BOT_TOKEN=your telegram bot key
WEATHER_TOKEN=openweathermap key

Run locally with: node index.js or npm start

To deploy on server:

- Git pull
- pm2 restart spedebot

Todo:
Github actions pipeline
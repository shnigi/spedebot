Create your own bot with @botfather on Telegram

Install NodeJs > 12
create .env file to project root

Add apikeys to .env

BOT_TOKEN=
WEATHER_TOKEN=
FINNHUB_TOKEN= // Not in use
MARKETSTACK_TOKEN= // Not in use
XRAPIDAPI_TOKEN= // Not in use
STEAM_TOKEN=
SPORTDATA_TOKEN= // Not in use

Run locally with: node index.js or npm start

To deploy on server:

- Git pull
- pm2 restart spedebot

Project has github actions pipeline to automatically deploy on server
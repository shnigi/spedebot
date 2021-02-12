Create your own bot with @botfather on Telegram

Install NodeJs > 12
create .env file to project root

Add apikeys to .env

BOT_TOKEN=
WEATHER_TOKEN=
STEAM_TOKEN=
DEV=true

Run locally with: npm run dev

Project has github actions pipeline to automatically deploy on server.

TO use personalized stocklists add database.json to the project root and createa a following json:

 {
  "database": [
    {
      "name": "username",
      "tickers": []
    },
    ]
  }

  Update database on server:

  {"name": "username", "tickers": []},
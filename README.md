Create your own bot with @botfather on Telegram

Install NodeJs > 18
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

Finance queries

https://query1.finance.yahoo.com/v10/finance/quoteSummary/FB?modules=assetProfile%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CcalendarEvents%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CdefaultKeyStatistics%2Cearnings%2CearningsHistory%2CearningsTrend%2CesgScores%2CfinancialData%2CfundOwnership%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CindexTrend%2CindustryTrend%2CinsiderHolders%2CinsiderTransactions%2CinstitutionOwnership%2CmajorDirectHolders%2CmajorHoldersBreakdown%2CnetSharePurchaseActivity%2Cprice%2CrecommendationTrend%2CsecFilings%2CsectorTrend%2CsummaryDetail%2CsummaryProfile%2CupgradeDowngradeHistory%2Cpageviews%2Cquotetype&ssl=true

https://query1.finance.yahoo.com/v10/finance/quoteSummary/avgr?modules=assetProfile%2CfinancialData%2CrecommendationTrend%2CsummaryDetail%2CsummaryProfile

To use speech.js
create folder and file: downloads/speech.mp3

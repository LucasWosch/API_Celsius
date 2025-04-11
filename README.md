# API_Celsius
APIs de Clima e Recomendação
Projeto com duas APIs usando Node.js e Express:

API B (Clima): retorna a temperatura de uma cidade.

API A (Recomendação): consome a API B e retorna uma recomendação com base na temperatura.

Estrutura
/weather-api -> API B - Clima
/recommendation-api -> API A - Recomendação

Como rodar
API B (porta 3001):

cd weather-api
npm install
npm start

API A (porta 3000):

cd recommendation-api
npm install
npm start

Testes no navegador ou Postman
Clima (API B):
GET http://localhost:3001/weather/SãoPaulo

Recomendação (API A):
GET http://localhost:3000/recommendation/SãoPaulo

Exemplos de Resposta
API B:
GET /weather/SãoPaulo
Resposta:
{ "city": "São Paulo", "temp": 25, "unit": "Celsius" }

API A:
GET /recommendation/SãoPaulo
Resposta:
{ "city": "São Paulo", "temp": 25, "unit": "Celsius", "recommendation": "O clima está agradável!" }
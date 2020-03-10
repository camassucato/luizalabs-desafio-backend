
<p align="center">
  <img alt="ORBB_WATCHER" title="ORBB_WATCHER" src="https://mazz.dev/img/orbb.png" width="300px" />
</p>

<h2 align="center">
  ORBB WATCHER<br>Quake3 LOG Parser
</h2>

<h4 align="center">
GAMES.LOG Parser
</h4>

<p>Application created to parser a local games.log of the classic FPS game Quake III Arena. Offers an API of detailed matches information parsed from the log.</p>

<p align="center">
<img alt="GitHub language count" src="https://img.shields.io/github/languages/top/camassucato/orbbwatcher?color=%2304D361">
<a href="https://mazz.dev"><img alt="Made by" src="https://img.shields.io/badge/made%20by-Massucato-%2304D361"></a>
<img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>


## Setup, Run and Tests
For this project, we make use of <b>yarn</b> and <b>Docker</b> (Postgresql). Assuming that you have those pre installed on your machine, follow these steps:
<br>

* Run yarn to install the project dependencies:
```bash
yarn install
```
<br>

* Create the Docker container for the database:
```bash
docker run --name DB_LUIZALABS_TEST -e POSTGRES_USER=luizalabs -e POSTGRES_PASSWORD=luiza#test! -e POSTGRES_DB=orbbwatcher -p 5432:5432 --restart always -d postgres
```
<br>

* Environment Variables:
```bash
# .env_example to .env
cp .env_example .env

# .env.test_example to .env.test
cp .env.test_example .env.test
```
<br>

* Sequelize to run DB migrations:
```bash
yarn sequelize db:migrate
```
<br>

* <b>Run the project:</b>
```bash
yarn dev
```
<br>

* <b>Integration tests:</b>
```bash
# unix based
yarn tests

# windows based
yarn tests_win
```
<br>

## API Routes
* Information
```http
GET http://localhost:3000/
```
<br>

* Parser
```http
GET http://localhost:3000/parser
```
<br>

* Match information
```http
POST http://localhost:3000/match
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `match_number` | `number` | **Required**. The match number in log |
<br>

* Players
```http
GET http://localhost:3000/players
```
<br>

* Maps
```http
GET http://localhost:3000/maps
```
<br>

* Players Ranking
```http
GET http://localhost:3000/ranking
```
<br>

## Insomnia Workspace
You also can import the Insomnia requests.
```bash
# on repository root
Insomnia_2020-03-10.json
```
<br>

## Author
👤 **Carlos Augusto Massucato**
- [Linkedin](https://www.linkedin.com/in/massucato/)
- Github: [@camassucato](https://github.com/camassucato)
- Instagram: [@massucato](https://www.instagram.com/massucato/)

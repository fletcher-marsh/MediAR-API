# MediAR-API
Node server to host an API for MediAR iOS app

## Running Locally
- Clone this repo
- Ensure that you have `npm` > 5.0.0, `node` > 8.0.0, `psql`
- `npm install`
- Make a database named 'mediar' in `psql`
- `psql mediar -f migrate.sql`
- `npm start`
- Navigate to [http://localhost:3000/api/scans](http://localhost:3000/api/scans)

## Running on Heroku
- Install Heroku: `sudo npm i -g heroku`
- Login: `heroku login`
- CI should be set up. Any commit that successfully lands on `master` should kick off a Heroku build/redeploy
- If migrations need to be re-run: `cat ./migrate.sql | heroku pg:psql`

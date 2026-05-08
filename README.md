# iberfoot
A website for the Iberfoot football agency

## Main tech stack
- JavaScript
- Node.js
- React.js
- PostgreSQL
- HTML
- CSS

## Run the website locally
### Set up the React if you haven't already:

### Set up the server:
- Create a .env file in the server folder (relative location: `/iberfoot/server`) . Structured as below (Edit it to include your informations):
```env
PG_USER="postgres"
PG_HOST="localhost"
PG_DATABASE="iberfoot_db"
PG_PASSWORD="YOUR_PASS_WORD"
EMAIL_USER="YOUR_MAIL"
EMAIL_PASS="YOUR_EMAIL_APP_PASSWORD"
RECEIVER_EMAIL="YOUR_MAIL"
JWT_SECRET="YOUR_SECRET_PASSWORD"
```

- Create PostgreSql database and call it “iberfoot_db”
- Create PostgreSql tables. Find the necessary queries in the queries.sql file (relative location: `/iberfoot/server`)

- In your terminal, navigate to server folder (relative location: `/iberfoot/server`)
- Run : `npm install`
- Run : `nodemon index.js`

### Set up the client:
- In your terminal, navigate to server folder (relative location:  `/iberfoot/client`)
- run : `npm install`
- Run : `npm run dev`

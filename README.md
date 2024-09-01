# NewsletterAPI
NewsletterAPI written in JS with Express. Change to any DB with 1 file change, same with Email provider.

> Deploy anywhere, already prepared for Google Cloud Platform(App Engine with SQL/Datastore/SQLite[sqlite is notForProduction on AppEngine!])

NewsletterAPI Client usage:
```javascript copy
// Browser
const client = NewsletterAPIClient(fetch)
await client.subscribers.addNewSubscriber('email@em.com', 'Full Name') // will send confirmation email

// NodeJS
const fetch = require('node-fetch')
const client = NewsletterAPIClient(fetch)
const jwt = await client.auth.login('admin', 'password')
await client.subscribers.sendNewsletterToAuthorizedSubscribers(jwt, 'subject', '1st newsletter message 🎉🎂')
```

## Purpose
- Add new subscriber on newsletter submit(sends an email)
- Confirm subscription by visiting provided link
- Send newsletter to every authorized subscriber

## Features
- Rate limiting for possible attacks (100/min)
- Authentication JWT
- GCP Deployment
- Switch to any DB you need (SQL, SQLite, Datastore)
- Switch to any Email provider (Gmail, SendGrid)

## Usage
Local usage:
```bash copy
$ npm install
$ npm run start  # will serve on 3000 with SQLite applied for local testing
```

Deploy to serverless AppEngine(Google Cloud Platform):
> Requires `gcloud` cli.
```bash copy
$ npm run deploy  # will create `app.yaml` based on `.env` file
```

### Environment variables

Example `.env` file:
```env
NODE_ENV=production
JWT_SECRET_KEY=your_jwt_secret_key
USER_NAME=admin
USER_PASSWORD=password
DB_HOST=/cloudsql/YOUR_INSTANCE_CONNECTION_NAME
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=newsletter
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
APP_URL=https://your-app-url.com
```

### Endpoints

Authentication:
```
POST    getToken                 /api/auth/login body {username, password} => JWT_TOKEN
POST    registerUser             /api/auth/register body {username, password} header {authorization: <JWT_HERE>}
```

Newsletter public:
```
POST    addNewSubscriber         /api/subscribers/
GET     confirmSubscription      /api/subscribers/confirm/:token
```

Newsletter protected:
```
GET     getAuthorizedSubscribers /api/subscribers/ header {authorization: <JWT_HERE>}
DELETE  deleteSubscriber         /api/subscribers/:id header {authorization: <JWT_HERE>}
POST    sendNewsletter           /api/subscribers/send header {authorization: <JWT_HERE>}
```

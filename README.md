# NewsletterAPI
NewsletterAPI written in JS with Express. Change to any DB with 1 file change, same with Email provider.

> Deploy anywhere, already prepared for Google Cloud Platform(App Engine with SQL/SQLite[sqlite is notForProduction on AppEngine!])

| Related    | Link                                                     |
|------------|----------------------------------------------------------|
| API-client | [Repository](https://github.com/Walikuperek/API-clients) |

NewsletterAPI with Client usage:
```javascript copy
// Browser
const client = NewsletterAPIClient(fetch)
await client.subscribers.addNewSubscriber('email@em.com', 'Full Name') // will send confirmation email

// NodeJS
const fetch = require('node-fetch')
const client = NewsletterAPIClient(fetch)
const jwt = await client.auth.login('admin', 'password')
await client.subscribers.sendNewsletter(jwt, 'subject', '1st newsletter message 🎉🎂')
```

## Purpose
- Add new subscriber on newsletter submit(sends an email)
- Confirm subscription by visiting provided link
- Unsubscribe if needed
- Send newsletter to every authorized subscriber

## Features
- Rate limiting for possible attacks (100/min)
- Authentication JWT
- GCP Deployment
- Switch to any DB you need (SQL, SQLite, any)
- Switch to any Email provider (Gmail, SendGrid, any)

## Risk
- Remember that anyone can try to brute-force your public: `smth/:token` (so we limit to ~100 req/min)
- Go creative with initial admin account credentials, so attackers will need to spent million years on them

## Usage
Local usage:
```bash copy
$ npm install
$ npm run start  # will serve on 3000 with SQLite applied for local testing
```

Deploy to serverless AppEngine(Google Cloud Platform):
> Requires `gcloud` cli and proper account configuration.
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

#### Authentication:
| Action       | Method | Endpoint                                                                          | Returns   |
|--------------|--------|-----------------------------------------------------------------------------------|-----------|
| getToken     | POST   | /api/auth/login, body {username, password}                                        | JWT_TOKEN |
| registerUser | POST   | /api/auth/register, body {username, password}, header {Authorization: <JWT_HERE>} |           |

#### Public:
| Action                | Method | Endpoint                                 | Body                     |
|-----------------------|--------|------------------------------------------|--------------------------|
| addNewSubscriber      | POST   | /api/subscribers/                        | {username, password}     |
| confirmSubscription   | GET    | /api/subscribers/confirm/:token          |                          |
| unsubscribeSubscriber | GET    | /api/subscribers/unsubscribe/:token      |                          |

#### Protected:
| Action                  | Method | Endpoint                                 | Body                     | Header                                |
|-------------------------|--------|------------------------------------------|--------------------------|---------------------------------------|
| getAuthorizedSubscribers| GET    | /api/subscribers/                        |                          | {Authorization: `<JWT_HERE>`}         |
| deleteSubscriber        | DELETE | /api/subscribers/:id                     |                          | {Authorization: `<JWT_HERE>`}         |
| sendNewsletter          | POST   | /api/subscribers/send                    | {subject, text}          | {Authorization: `<JWT_HERE>`}         |

# NewsletterAPI
NewsletterAPI written in JS with Express. Change to any DB with 1 file change, same with Email provider.

> Deploy anywhere, already prepared for Google Cloud Platform(App Engine with SQL/Datastore/SQLite[sqlite is notForProduction!])

## Purpose
- Add new subscriber on newsletter submit(sends an email)
- Confirm subscription by visiting provided link
- Send newsletter to every authorized subscriber

## Usage
```bash copy
$ npm install
$ npm run start  # will serve on 3000 with SQLite applied for local testing
```

### Endpoints

Authentication:
```
POST    /api/auth/login body {username, password} => JWT_TOKEN
POST    /api/auth/register body {username, password} header {authorization: <JWT_HERE>}
```

Newsletter public:
```
GET     /api/subscribers/confirm/:token
POST    /api/subscribers/
```

Newsletter protected:
```
GET     /api/subscribers/ header {authorization: <JWT_HERE>}
DELETE  /api/subscribers/:id header {authorization: <JWT_HERE>}
POST    /api/subscribers/send header {authorization: <JWT_HERE>}
```

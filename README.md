```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# DB configuration

Vendor: Postgres

# DB Environment variables

POSTGRES_HOST
POSTGRES_PORT
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DATABASE

Note: we can leave them on .env file.

# Run database container

docker-compose up

# Create or Sync DB schema

npm run schema:sync

# Login

As starting point we aer using the following credentials:

Admin/admins123

When starting the app, Database will be loader with ADMIN user.

So, the URL for login is:

curl -X POST http://localhost:3000/auth/login -d '{"name": "Admin", "password": "admin123"}' -H "Content-Type: application/json"

The rest of the app endpoints should be protected, so, we should attach the token to request header after login.

Ex:

curl -X GET http://localhost:3000/v1/users -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTQ3Nzc2MjUsImV4cCI6MTYxNDc3NzY4NX0.Izgf74P5doGQA5iiHbSTKKKUlcCsTRB4kDFETWINpqg"

Note: Of course we will make public endpoints as we need.

# Graph QL

1. Run application
2. Access url: http://localhost:3000/graphql

3. Sign in and get the token

# Write your query or mutation here

query signin {
signin(email: "Admin", password: "admin123"){
token
}
}

4. Set token in header (bearer)

{
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFkbWluIiwic3ViIjp7InBhc3N3b3JkIjoiYWRtaW5zMTIzIn0sImlhdCI6MTYyNzczODY4MSwiZXhwIjoxNjI3NzM4NzQxfQ.WIf0iLLWWvIWmNspdwXz8KOvLC8-1XP76MaeXAHhQpw"
}

5. Query sample:

# Write your query or mutation here

`query { user (email: "jonh@gmail.com"){ name phone cpf addresses { address } } }`

Returns:

`{ "data": { "user": { "name": "Admin", "phone": "127412641", "cpf": "65487643220", "addresses": [] } } }`

# Inserting Airport

`mutation createAirport { createAirport(name: "Guarulhos") { id name } }`

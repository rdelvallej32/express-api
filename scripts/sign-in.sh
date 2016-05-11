#!/bin/sh

curl --include --request POST http://localhost:3000/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "dog@aol.com",
      "password": "123"
    }
  }'

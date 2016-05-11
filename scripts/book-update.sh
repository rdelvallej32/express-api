#!/bin/sh
TOKEN="0oL1TKznn0Eu1rZETg4fUao5Gi6DUiUNZkC/277x0/A=--X1QkUch41sGVzffRPPxoWNPJN+kgHKSZdPuNX5lNhl8="
ID="573353e9292af88894240a42"

curl --include --request PATCH http://localhost:3000/books/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "book": {
      "title": "Harry Potter and The Sorcerer/s Stone",
      "author": "J.K. Rowling",
      "price": 14.99
    }
  }'

#!/bin/sh
TOKEN="0oL1TKznn0Eu1rZETg4fUao5Gi6DUiUNZkC/277x0/A=--X1QkUch41sGVzffRPPxoWNPJN+kgHKSZdPuNX5lNhl8="

curl --include --request POST http://localhost:3000/examples \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "example": {
      "text": "Test Script"
    }
  }'

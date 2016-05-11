#!/bin/sh
TOKEN="0oL1TKznn0Eu1rZETg4fUao5Gi6DUiUNZkC/277x0/A=--X1QkUch41sGVzffRPPxoWNPJN+kgHKSZdPuNX5lNhl8="
ID="57334ac76d1cb5188f8bc0cd"

curl --include --request GET http://localhost:3000/examples/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \

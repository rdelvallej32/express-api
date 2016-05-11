#!/bin/sh
TOKEN="0oL1TKznn0Eu1rZETg4fUao5Gi6DUiUNZkC/277x0/A=--X1QkUch41sGVzffRPPxoWNPJN+kgHKSZdPuNX5lNhl8="
ID="573353e9292af88894240a42"

curl --include --request DELETE http://localhost:3000/books/$ID \
  --header "Authorization: Token token=$TOKEN" \

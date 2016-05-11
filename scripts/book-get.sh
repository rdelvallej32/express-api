#!/bin/sh
ID="573353e9292af88894240a43"

curl --include --request GET http://localhost:3000/books/$ID \
  --header "Content-Type: application/json" \

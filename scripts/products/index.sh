#!/bin/sh

API="http://localhost:4741"
URL_PATH="/products/womens-clothing"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  # --header "Authorization: Bearer ${TOKEN}"

echo

API="http://localhost:4741"
URL_PATH="/products/mens-clothing"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  # --header "Authorization: Bearer ${TOKEN}"

echo

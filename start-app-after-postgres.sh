#!/usr/bin/env bash

# Assumes a response of:
# "curl: (52) Empty reply from server"
function ping {
  local res=$((curl "http://$PGHOST:$PGPORT") 2>&1)
  echo "$res" | grep 52
}

# Wait for postgres to respond.
while ! ping; do sleep 1; done

# Start filament.
npm start

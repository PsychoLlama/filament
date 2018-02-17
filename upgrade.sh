#!/usr/bin/env bash
git pull origin master
yarn install
yarn build
docker-compose stop
docker-compose up --build -d

#!/usr/bin/env bash
git pull origin master
yarn build
docker-compose stop
docker-compose up --build -d

FROM node:carbon

COPY . /var/filament
WORKDIR /var/filament

CMD ["./start-app-after-postgres.sh"]

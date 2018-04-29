FROM node:8

COPY . /var/filament
WORKDIR /var/filament

CMD ["yarn", "start"]

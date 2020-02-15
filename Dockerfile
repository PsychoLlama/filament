FROM node:erbium

COPY . /var/filament
WORKDIR /var/filament

CMD ["yarn", "start"]

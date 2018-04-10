FROM node:carbon

COPY . /var/filament
WORKDIR /var/filament

CMD ["yarn", "start"]

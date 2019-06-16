FROM node:dubnium

COPY . /var/filament
WORKDIR /var/filament

CMD ["yarn", "start"]

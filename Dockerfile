FROM node:alpine

COPY . /var/filament
WORKDIR /var/filament

CMD ["npm", "run", "start"]

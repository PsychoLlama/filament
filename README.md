# Filament
*GraphQL, but for your lights*

## Why?
Because GraphQL is amazing and so is home automation and I'm not choosing between them you can't make me.

## Trying it out
First off, you need lights. The special kind you can control with your smartphone and pretend you're telekinetic. I get mine from [Philips](http://www2.meethue.com/en-us/products/?category=131159). I think you can use other types, but I've never tried.

Assuming you've got some lights, do these things:

1. Clone this repo
2. Install (`npm install` or `yarn install` or whatever the cool kids do these days)
3. Do `yarn register`. That'll poll your Hue bridge until you press the link button
4. `yarn start` :tada:

Open your browser to `localhost:8080` and try some queries!

**Lazy person copy & paste**

```sh
git clone https://github.com/PsychoLlama/filament.git && cd filament
npm install

echo "Press the giant button on your Hue bridge"
npm run register
npm start
```

## Disclaimer
I'm not affiliated with Philips in any way. I'm just a guy on the internet playing with code :heart:

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

## Queries

### Lights
- :white_check_mark: Get a Light by ID
- :white_check_mark: Get all Lights
- :white_check_mark: Get a Light's name
- :white_check_mark: Get a Light's hex color
- :white_check_mark: Get a Light's on/off state
- :white_check_mark: Get whether a Light is reachable
- :white_check_mark: Get a Light's type (e.g. Extended color light)
- :white_check_mark: Get a Light's manufacurer, hardware model, and software version
- :white_check_mark: Get a Light's (cross-Bridge) unique ID
- :x: Get Lights that were discovered in the last search for new Lights
- :x: Get a Luminaire Light's unique ID
- :x: Get a Light's effect state
- :x: Get a Light's alert state <span style="font-size: 0.8em;">[\[1\]](#notes)</span>

### Groups
- :white_check_mark: Get a Group by ID
- :white_check_mark: Get all Groups
- :white_check_mark: Get a Group's name
- :white_check_mark: Get a Group's hex color
- :white_check_mark: Get a Group's Lights
- :white_check_mark: Get whether any or all Lights in a Group are on
- :white_check_mark: Get a Group's Room class (e.g. Living room, Bedroom)
- :white_check_mark: Get a Group's type (e.g. Room, Luminaire, LightGroup)
- :x: Get a Luminaire Group's hardware model
- :x: Get a Luminaire Group's unique ID

### Schedules
- :x: Get a Schedule by ID
- :x: Get all Schedules

### Scenes
- :x: Get a Scene by ID
- :x: Get all Scenes

### Sensors
- :x: Get a Sensor by ID
- :x: Get all Sensors
- :x: Get Sensors that were discovered in the last search for new Sensors

### Rules
- :x: Get a Rule by ID
- :x: Get all Rules

### Configuration
- :x: Get the Bridge's configuration

### Resourcelinks
- :x: Get a Resourcelink by ID
- :x: Get all Resourcelinks

### Capabilities
- :x: Get the Bridge's Capabilities

## Mutations

### Lights
- :white_check_mark: Set a Light's hex color
- :white_check_mark: Turn a Light on or off
- :white_check_mark: Smoothly transition from one state to another
- :white_check_mark: Rename a Light
- :x: Search for new Lights
- :x: Delete Lights from the Bridge <span style="font-size: 0.8em;">[\[2\]](#notes)</span>

### Groups
- :white_check_mark: Set a Group's hex color
- :white_check_mark: Turn a Group on or off
- :white_check_mark: Smoothly transition from one state to another
- :white_check_mark: Rename a Group
- :white_check_mark: Set a Group's Lights
- :white_check_mark: Set a Group's Room class (e.g. Living room, Bedroom)
- :x: Create a Group
- :x: Delete a Group

### Schedules
- :x: Create a Schedule
- :x: Update a Schedule
- :x: Delete a Schedule

### Scenes
- :x: Run a Scene
- :x: Create a Scene
- :x: Update a Scene
- :x: Delete a Scene

### Sensors
- :x: Create a Sensor
- :x: Update a Sensor
- :x: Delete a Sensor
- :x: Search for new Sensors

### Rules
- :x: Create a Rule
- :x: Update a Rule
- :x: Delete a Rule

### Configuration
- :x: Update the Bridge's configuration
- :x: Create a user
- :x: Delete a user

### Resourcelinks
- :x: Create a Resourcelink
- :x: Update a Resourcelink
- :x: Delete a Resourcelink

### Notes

\[1\]: The alert state provided by the Hue API contains the last alert sent to the light and not its current state (i.e. whether an alert is active), so this isn't particularly useful.

\[2\]: Deleting lights [can be messy](https://developers.meethue.com/documentation/delete-devices-application-guidance) and we haven't needed it, so we haven't added this yet.

## Disclaimer
I'm not affiliated with Philips in any way. I'm just a guy on the internet playing with code :heart:

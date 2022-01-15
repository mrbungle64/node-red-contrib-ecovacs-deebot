![Logo](ecovacs-deebot.png)

# node-red-contrib-ecovacs-deebot
[![npm](http://img.shields.io/npm/v/node-red-contrib-ecovacs-deebot.svg)](https://www.npmjs.com/package/node-red-contrib-ecovacs-deebot)
[![npm](https://img.shields.io/npm/dm/node-red-contrib-ecovacs-deebot.svg)](https://www.npmjs.com/package/node-red-contrib-ecovacs-deebot)
[![npm](https://img.shields.io/npm/dt/node-red-contrib-ecovacs-deebot.svg)](https://www.npmjs.com/package/node-red-contrib-ecovacs-deebot)
[![github-workflow](https://github.com/mrbungle64/node-red-contrib-ecovacs-deebot/actions/workflows/node.js.yml/badge.svg)](https://github.com/mrbungle64/node-red-contrib-ecovacs-deebot)

Node-RED node for running Ecovacs Deebot vacuum cleaner robots

This node uses the [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) library.

## Usage

### Ecovacs account

First you have to configure the Ecovacs account:
- "Email / Ecovacs ID"
- "Password"
- "Country code" (see [here](https://github.com/mrbungle64/node-red-contrib-ecovacs-deebot/wiki/Country-codes) for a list of country codes)

### Available nodes

#### Ecovacs Deebot

Available options: 
- "Account" (Ecovacs account / email address)
- "Name" of the Device
- "Device number"
- "Connect on startup"
- "Enable output of simple events"

#### Deebot command

Available options:
- "Command" (e.g. `Start automatic cleaning`, `Retrieve battery state`)
- Command specific fields (e.g. `Map ID`, `Spot area ID`)

## Models

### Supported models

* Deebot 900/901
* Deebot OZMO 930
* Deebot OZMO 920/950
* Deebot T9 series

These are the models that the developers themselves own or that are technically identical to these.

### Models that should work properly or at least partially

* Deebot Slim 2
* Deebot N79 series
* Deebot 600/601/605
* Deebot 710/711/711s
* Deebot OZMO 610
* Deebot OZMO 900/905
* Deebot OZMO Slim 10/11
* Deebot U2 series
* Deebot N8 series
* Deebot (OZMO) T8 series

Please also check the [current list](https://github.com/mrbungle64/ecovacs-deebot.js#models) of models that should work with the [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) library

## Installation

It is recommended to use version 12.x or 14.x of Node.js. The minimum required version is 12.x

This node uses the [node-canvas](https://www.npmjs.com/package/canvas) library for some map-related functionality which may require the installation of some additional packages.

The installation of canvas is optional and not necessary for models without map functionality, but for full functional range please install the following packages.

For Debian-based Linux systems the following commands should be executed:

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Installation for canvas on alpine based systems (e.g. Node-RED docker container):
```bash
apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev
```

A reboot might be necessary before executing the next command
```bash
sudo npm install canvas --unsafe-perm=true
```

For instructions for other systems visit https://www.npmjs.com/package/canvas#compiling

## Known issues

* There's a strange behavior of the battery value on Deebot 900/901. It's very likely that this is a firmware bug
* "Edge" command does not work with Deebot U2 (starts auto clean instead)
* The cleaning log has an empty result on T9 series
* The combined map data object does not work with T9 series

## Changelog

### 0.3.8
* Bumped some dependencies (incl. fix for CVE-2022-0155)

### 0.3.7
* Fix the cleaning functions for the Deebot 710 series

### 0.3.6
* Using library version 0.7.0
* Some smaller improvements

### 0.3.5
* Using library version 0.6.8

### 0.3.4
* Using library version 0.6.7

### 0.3.3
* Using library version 0.6.6

### 0.3.2
* Using library version 0.6.3
* Bump minimum required version of Node.js to 12.x

### 0.3.1
* Using library version 0.6.1-beta.7
* Add option for GetMaps command whether to include map image
* Some fixes and improvements

### 0.3.0
* Using library version 0.6.1-beta.3
* Add option to enable retrieving map object on startup
* Add GetSchedule command

### 0.2.9
* Using library version 0.6.1-beta.2
* Add AdvanceMode command (950 type models)
* Add TrueDetect command (experimental)

### 0.2.8
* Using library version 0.6.1-alpha.15
* (unclej84) Add example for saving map image to jpg file

### 0.2.7
* (unclej84) Improve loading of commands.js for deebot-command node 
* (unclej84) Add basic example

### 0.2.6
* (unclej84) Make node compatible with pre-1.3-versions

### 0.2.5
* Using library version 0.6.1-alpha.11
* Some minor changes and fixes

### 0.2.4
* Using library version 0.6.1-alpha.9
* Add EnableDoNotDisturb and DisableDoNotDisturb commands (950 type models)

### 0.2.3
* (unclej84) Help texts for display in editor sidebar

### 0.2.2
* Some minor fixes and improvements

### 0.2.1
* Device number starts with 1

### 0.2.0
* Initial npm release
  * Add a lot of commands and events
  * Using library version 0.6.1-alpha.6
  * (unclej84) Add Multi-language support
  * (unclej84) A lot of improvements for the node editor
  * (unclej84) Use credentials for account data

## Disclaimer

We are in no way affiliated with ECOVACS.

## License

GNU GENERAL PUBLIC LICENSE

Copyright (c) 2021 Sascha Hölzel <mrb1232@posteo.de>

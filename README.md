![Logo](ecovacs-deebot.png)

# node-red-contrib-ecovacs-deebot

Node-RED node for running Ecovacs Deebot vacuum cleaner robots

This node uses the [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) library.

## Usage

### Ecovacs account

First you have to configure the Ecovacs account:
- "Email / Ecovacs ID"
- "Password"
- "Country code" (e.g. `DE`, `UK`, `US`, `WW`)

### Available nodes

#### Ecovacs Deebot

Available options: 
- Ecovacs "Account"
- "Name" of the Device
- "Device number" (`0` for the first device)
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

### These models should work properly or at least partially

* Deebot Slim 2
* Deebot N79 series
* Deebot M88
* Deebot 600/601/605
* Deebot 710/711/711s
* Deebot OZMO 610
* Deebot OZMO 900/905
* Deebot OZMO Slim 10
* Deebot OZMO T5
* Deebot OZMO T8 series
* Deebot N3 MAX
* Deebot N7
* Deebot N8 series
* Deebot U2 series

## Known issues

* There's a strange behavior of the battery value on Deebot 900/901. It's very likely that this is a firmware bug
* Some cleaning commands may not work with Deebot 710/711/711s
* "Edge" command does not work with Deebot U2 (starts auto clean instead)

## Changelog

### 0.2.0-alpha
* Initial npm release
  * Added a lot of commands and events
  * Using library version 0.6.1-alpha
  * (unclej84) Added Multi-language support
  * (unclej84) A lot of improvements for the node editor
  * (unclej84) Use credentials for account data

## Disclaimer

We are in no way affiliated with ECOVACS.

## License

GNU GENERAL PUBLIC LICENSE

Copyright (c) 2021 Sascha Hölzel <mrb1232@posteo.de>

![Logo](ecovacs-deebot.png)

# node-red-contrib-ecovacs-deebot

Node-RED node for running Ecovacs Deebot vacuum cleaner robots

This node uses the [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) library.

## Installation
- Go to Node-RED directory
- Run `npm i node-red-contrib-deebot`

## How to use
First you have to configure the Ecovacs account node:
  - `Email`
  - `Password`
  - `Country code` (e.g. `DE`)
  
and also for every device:
- `Name` of the Device
- `Device number` (`0` for the first device)

### Commands
Some possible commands for `msg.payload` are:
- `clean`
- `stop`
- `pause`
- `resume`
- `edge`
- `spot`
- `charge`
- `playSound`
- `GetCleanState`
- `GetChargeState`
- `GetCleanSpeed`
- `GetLifeSpan` (`msg.arg` = `filter`)
- `GetLifeSpan` (`msg.arg` = `main_brush`)
- `GetLifeSpan` (`msg.arg` = `side_brush`)

### Events
It is possible to receive the following events:
- `BatteryInfo`
- `CleanReport`
- `ChargeState`
- `LifeSpan_filter`
- `LifeSpan_main_brush`
- `LifeSpan_side_brush`
- `WaterLevel`
- `WaterBoxInfo`
- `DustCaseInfo`
- `SleepStatus`
- `CleanSpeed`
- `CleanSum_totalSquareMeters`
- `CleanSum_squareMeters`
- `CleanSum_totalSeconds`
- `CleanSum_totalNumber`
- `Error`
- `ErrorCode`

## Changelog

### 0.0.1
* (mrbungle64) Initial development release

## Disclaimer

I am in no way affiliated with ECOVACS.

## License

GNU GENERAL PUBLIC LICENSE

Copyright (c) 2020 Sascha Hölzel <mrb1232@posteo.de>

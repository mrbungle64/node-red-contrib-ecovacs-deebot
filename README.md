# node-red-contrib-ecovacs-deebot
Node-RED node for running Ecovacs Deebot vacuum cleaner robots

This node uses the [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) library.

## Installation
- Go to Node-RED directory
- Run `npm i node-red-contrib-deebot`

## How to use
First you have to configure the node:
- `Name` of the Device
- your Ecovacs credentials
  - `Mail`
  - `Password`
- `Country code` (e.g. `DE`)
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
- `Error`
- `ErrorCode`

## Changelog

### 0.0.1
* (mrbungle64) Initial development release

## License

GNU GENERAL PUBLIC LICENSE

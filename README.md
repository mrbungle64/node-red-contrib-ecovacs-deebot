# node-red-contrib-ecovacs-deebot
Node-RED node for running Ecovacs Deebot vacuum cleaner robots

Installation:
  - Go to Node-RED directory
  - Run `npm i node-red-contrib-deebot`

How to use:
  - Configure the node with your Ecovacs credentials
  - Send commands to the node:
      - Some possible commands for `msg.payload` are:
        - `clean`
        - `stop`
        - `pause`
        - `resume`
        - `edge`
        - `spot`
        - `charge`
        - `playSound`
  - Currently it is possible to receive the following events (`msg.Type = eventName` | `msg.payload = value`):
       - `BatteryInfo`
       - `CleanReport`
       - `ChargeState`
       - `LifeSpan`
        
This node uses the [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) library.

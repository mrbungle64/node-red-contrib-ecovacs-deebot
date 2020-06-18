# node-red-contrib-deebot
NodeRed node for deebot vaccum

Installation :
  - Go go tour node-red directory
  - run 'npm i node-red-contrib-deebot'

How to use:
  - Configure node with ecovacs credentials (only the first vaccum can be used for the moment).
  - Send command in string to the node.
      You can add an msg.Cmd in addition of the msg.payload to add only one parameter for the moment.
  - The vaccum do the task or send reply on output.
      Only the evnts below are working for the moment (msg.Type = eventName | msg.payload = value) :
        * BatteryInfo
        * CleanReport
        * ChargeState
        * LifeSpan
        
All the command are listed in ecovacs-deebot library, see below.


This node use the ecovacs-deebot library (https://github.com/mrbungle64/ecovacs-deebot.js).

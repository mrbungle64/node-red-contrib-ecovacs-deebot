module.exports = {
    "Connect": {
        payload: "Connect"
    },
    "Disconnect": {
        payload: "Disconnect"
    },
    "Clean": {
        payload: "Clean"
    },
    "Edge": {
        payload: "Edge"
    },
    "Spot": {
        payload: "Spot"
    },
    "SpotArea": {
        payload: "SpotArea",
        arg: "start",
        arg2: {
            type: "string",
            required: true
        }
    },
    "CustomArea": {
        payload: "CustomArea",
        arg: {
            type: "string",
            required: true
        },
        arg2: {
            name: "cleanings",
            type: "number",
            required: false
        }
    },
    "Charge": {
        payload: "Charge"
    },
    "Stop": {
        payload: "Stop"
    },
    "Pause": {
        payload: "Pause"
    },
    "PlaySound": {
        payload: "PlaySound"
    },
    "FindMe": {
        payload: "PlaySound",
        arg: "30"
    },
    "Resume": {
        payload: "Resume"
    },
    "GetCleanState": {
        payload: "GetCleanState"
    },
    "GetChargeState": {
        payload: "GetChargeState"
    },
    "GetBatteryState": {
        payload: "GetBatteryState"
    },
    "GetCleanSpeed": {
        payload: "GetCleanSpeed"
    },
    "GetWaterLevel": {
        payload: "GetWaterLevel"
    },
    "SetWaterLevel": {
        payload: "SetWaterLevel"
    },
    "GetWaterBoxInfo": {
        payload: "GetWaterBoxInfo"
    },
    "GetChargerPos": {
        payload: "GetChargerPos"
    },
    "GetCleanSum": {
        payload: "GetCleanSum"
    },
    "MoveBackward": {
        payload: "MoveBackward"
    },
    "MoveForward": {
        payload: "MoveForward"
    },
    "MoveLeft": {
        payload: "MoveLeft"
    },
    "MoveRight": {
        payload: "MoveRight"
    },
    "ResetLifeSpan": {
        payload: "ResetLifeSpan"
    },
    "GetLifeSpan": {
        payload: "GetLifeSpan"
    },
    "GetLifeSpan_filter": {
        label: "GetLifeSpan (filter)",
        payload: "GetLifeSpan",
        arg: "filter"
    },
    "GetLifeSpan_main_brush": {
        label: "GetLifeSpan (main brush)",
        payload: "GetLifeSpan",
        arg: "main_brush"
    },
    "GetLifeSpan_side_brush": {
        label: "GetLifeSpan (side brush)",
        payload: "GetLifeSpan",
        arg: "side_brush"
    },
    "GetCleanLogs": {
        payload: "GetCleanLogs"
    }
}

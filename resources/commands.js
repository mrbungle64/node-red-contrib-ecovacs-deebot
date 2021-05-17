const commands = {
    "AddVirtualBoundary": {
        description: "Create a virtual boundary",
        arg: {
            name: "mapID",
            required: true,
            type: "string"
        },
        arg2: {
            name: "boundaryCoordinates",
            required: true,
            type: "string"
        },
        arg3: {
            name: "boundaryType",
            required: true,
            type: "string"
        },
        payload: "AddVirtualBoundary"
    },
    "Charge": {
        description: "Return to charging station",
        payload: "Charge"
    },
    "Clean": {
        description: "Start automatic cleaning",
        payload: "Clean"
    },
    "Connect": {
        description: "Connect to robot",
        payload: "Connect"
    },
    "CustomArea": {
        description: "Start cleaning a custom area",
        arg: "start",
        arg2: {
            name: "boundaryCoordinates",
            required: true,
            type: "string"
        },
        arg3: {
            name: "numberOfCleanings",
            required: false,
            type: "number"
        },
        payload: "CustomArea"
    },
    "DeleteVirtualBoundary": {
        description: "Delete the specified virtual boundary",
        arg: {
            name: "mapID",
            required: true,
            type: "string"
        },
        arg2: {
            name: "boundaryID",
            required: true,
            type: "string"
        },
        arg3: {
            name: "boundaryType",
            required: true,
            type: "string"
        },
        payload: "DeleteVirtualBoundary"
    },
    "Disconnect": {
        description: "Disconnect from robot",
        payload: "Disconnect"
    },
    "Edge": {
        description: "Start edge cleaning",
        payload: "Edge"
    },
    "FindMe": {
        description: "Play 'I am here' for locating the device",
        arg: "30",
        label: "FindMe",
        payload: "PlaySound"
    },
    "GetAutoEmpty": {
        description: "Retrieve current auto empty setting",
        payload: "GetAutoEmpty"
    },
    "GetBatteryState": {
        description: "Retrieve current battery state",
        payload: "GetBatteryState"
    },
    "GetChargerPos": {
        description: "Retrieve Coordinates of the charging position",
        payload: "GetChargerPos"
    },
    "GetChargeState": {
        description: "Retrieve current charge state",
        payload: "GetChargeState"
    },
    "GetCleanLogs": {
        description: "Retrieve clean logs",
        payload: "GetCleanLogs"
    },
    "GetCleanSpeed": {
        description: "Retrieve current vacuum power level",
        payload: "GetCleanSpeed"
    },
    "GetCleanState": {
        description: "Retrieve current clean state",
        payload: "GetCleanState"
    },
    "GetCleanSum": {
        description: "Retrieve clean sum",
        payload: "GetCleanSum"
    },
    "GetLifeSpan": {
        description: "Retrieve life span for filter, side brush and main brush",
        payload: "GetLifeSpan"
    },
    "GetLifeSpan_filter": {
        description: "Retrieve life span for filter",
        arg: "filter",
        label: "GetLifeSpan (filter)",
        payload: "GetLifeSpan"
    },
    "GetLifeSpan_main_brush": {
        description: "Retrieve life span for main brush",
        arg: "main_brush",
        label: "GetLifeSpan (main brush)",
        payload: "GetLifeSpan"
    },
    "GetLifeSpan_side_brush": {
        description: "Retrieve life span for side brush",
        arg: "side_brush",
        label: "GetLifeSpan (side brush)",
        payload: "GetLifeSpan"
    },
    "GetMapImage": {
        description: "Retrieve image data of the map",
        arg: {
            name: "mapID",
            required: true,
            type: "string"
        },
        arg2: {
            name: "mapinfotype",
            required: true,
            type: "string"
        },
        payload: "GetMapImage"
    },
    "GetMaps": {
        description: "Retrieve complex object of map data",
        arg: true,
        payload: "GetMaps"
    },
    "GetNetInfo": {
        description: "Retrieve some networking related information",
        payload: "GetNetInfo"
    },
    "GetOnOff_continuous_cleaning": {
        description: "Indicates if continuous cleaning mode is enabled",
        arg: "continuous_cleaning",
        label: "GetOnOff (continuous cleaning)",
        payload: "GetOnOff"
    },
    "GetOnOff_do_not_disturb": {
        description: "Indicates if do not disturb mode is enabled",
        arg: "do_not_disturb",
        label: "GetOnOff (do not disturb)",
        payload: "GetOnOff"
    },
    "GetOnOff_silence_voice_report": {
        description: "Indicates if voice report is set to silent",
        arg: "silence_voice_report",
        label: "GetOnOff (silence voice report)",
        payload: "GetOnOff"
    },
    "GetPosition": {
        description: "Retrieve the current position of the bot",
        payload: "GetPosition"
    },
    "GetSleepStatus": {
        description: "Indicates of the bot is in sleep state",
        payload: "GetSleepStatus"
    },
    "GetSpotAreaInfo": {
        description: "Retrieve information for the given spot area",
        arg: {
            name: "mapID",
            required: true,
            type: "string"
        },
        arg2: {
            name: "spotAreaID",
            required: true,
            type: "string"
        },
        payload: "GetSpotAreaInfo"
    },
    "GetSpotAreas": {
        description: "Retrieve spot areas",
        arg: {
            name: "mapID",
            required: true,
            type: "string"
        },
        payload: "GetSpotAreas"
    },
    "GetVirtualBoundaries": {
        description: "Retrieve virtual boundaries",
        arg: {
            name: "mapID",
            required: true,
            type: "string"
        },
        payload: "GetVirtualBoundaries"
    },
    "GetVirtualBoundaryInfo": {
        description: "Retrieve information for the given virtual boundary",
        arg: {
            name: "mapID",
            required: true,
            type: "string"
        },
        arg2: {
            name: "boundaryID",
            required: true,
            type: "string"
        },
        arg3: {
            name: "boundaryType",
            required: true,
            type: "string"
        },
        payload: "GetVirtualBoundaryInfo"
    },
    "GetVolume": {
        description: "Retrieve the current volume",
        label: "GetVolume",
        payload: "GetVolume"
    },
    "GetWaterBoxInfo": {
        description: "Indicates of the water box is installed",
        payload: "GetWaterBoxInfo"
    },
    "GetWaterLevel": {
        description: "Retrieve the current water level",
        payload: "GetWaterLevel"
    },
    "MoveBackward": {
        description: "Move backward",
        payload: "MoveBackward"
    },
    "MoveForward": {
        description: "Move forward",
        payload: "MoveForward"
    },
    "MoveLeft": {
        description: "Move left",
        payload: "MoveLeft"
    },
    "MoveRight": {
        description: "Move right",
        payload: "MoveRight"
    },
    "Pause": {
        description: "Pause cleaning",
        payload: "Pause"
    },
    "PlaySound_custom": {
        description: "play a custom sound",
        arg: {
            name: "soundID",
            required: true,
            type: "string"
        },
        label: "PlaySound (soundID)",
        payload: "PlaySound"
    },
    "PlaySound": {
        description: "play sound for locating the device",
        payload: "PlaySound"
    },
    "Relocate": {
        description: "Relocate the location",
        payload: "Relocate"
    },
    "ResetLifeSpan": {
        description: "Reset life span values",
        label: "GetLifeSpan (filter)",
        payload: "ResetLifeSpan"
    },
    "RenameSpotArea": {
        description: "Rename the given spot area",
        arg: {
            name: "mapSetID",
            required: true,
            type: "string"
        },
        arg2: {
            name: "spotAreaID",
            required: true,
            type: "string"
        },
        arg3: {
            name: "name",
            required: true,
            type: "string"
        },
        payload: "RenameSpotArea"
    },
    "ResetLifeSpan_filter": {
        description: "Reset life span value for filter",
        arg: "filter",
        label: "ResetLifeSpan (filter)",
        payload: "ResetLifeSpan"
    },
    "ResetLifeSpan_main_brush": {
        description: "Reset life span value for main brush",
        arg: "main_brush",
        label: "ResetLifeSpan (main brush)",
        payload: "ResetLifeSpan"
    },
    "ResetLifeSpan_side_brush": {
        description: "Reset life span value for side brush",
        arg: "side_brush",
        label: "ResetLifeSpan (side brush)",
        payload: "ResetLifeSpan"
    },
    "Resume": {
        description: "Resume cleaning",
        payload: "Resume"
    },
    "SetAutoEmpty": {
        description: "Set auto empty mode",
        arg: {
            name: "value",
            required: true,
            type: "number"
        },
        payload: "SetAutoEmpty"
    },
    "SetCleanSpeed": {
        description: "Set vacuum power level",
        arg: {
            name: "level",
            required: true,
            type: "number"
        },
        payload: "SetCleanSpeed"
    },
    "SetOnOff_continuous_cleaning": {
        description: "Set continuous cleaning mode",
        arg: "continuous_cleaning",
        arg2: {
            name: "value",
            required: true,
            type: "number"
        },
        label: "SetOnOff (continuous cleaning)",
        payload: "SetOnOff"
    },
    "SetOnOff_do_not_disturb": {
        description: "Set do not disturb mode",
        arg: "do_not_disturb",
        arg2: {
            name: "value",
            required: true,
            type: "number"
        },
        label: "SetOnOff (do not disturb)",
        payload: "SetOnOff"
    },
    "SetOnOff_silence_voice_report": {
        description: "Set voice report silent",
        arg: "silence_voice_report",
        arg2: {
            name: "value",
            required: true,
            type: "number"
        },
        label: "SetOnOff (silence voice report)",
        payload: "SetOnOff"
    },
    "SetVolume": {
        description: "Set volume for sound and voice",
        arg: {
            name: "volume",
            required: true,
            type: "number"
        },
        payload: "SetVolume"
    },
    "SetWaterLevel": {
        description: "Set water level",
        arg: {
            name: "level",
            required: true,
            type: "number"
        },
        payload: "SetWaterLevel"
    },
    "Spot": {
        description: "Start spot cleaning",
        payload: "Spot"
    },
    "SpotArea": {
        description: "Start cleaning one or multiple spot areas",
        arg: "start",
        arg2: {
            name: "areas",
            required: true,
            type: "string"
        },
        payload: "SpotArea"
    },
    "Stop": {
        description: "Stop cleaning",
        payload: "Stop"
    }
};

module.exports = {commands};

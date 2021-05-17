var commands = {
    "AddVirtualBoundary": {
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
        payload: "Charge"
    },
    "Clean": {
        payload: "Clean"
    },
    "Connect": {
        payload: "Connect"
    },
    "CustomArea": {
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
        payload: "Disconnect"
    },
    "Edge": {
        payload: "Edge"
    },
    "FindMe": {
        arg: "30",
        label: "FindMe",
        payload: "PlaySound"
    },
    "GetAutoEmpty": {
        payload: "GetAutoEmpty"
    },
    "GetBatteryState": {
        payload: "GetBatteryState"
    },
    "GetChargerPos": {
        payload: "GetChargerPos"
    },
    "GetChargeState": {
        payload: "GetChargeState"
    },
    "GetCleanLogs": {
        payload: "GetCleanLogs"
    },
    "GetCleanSpeed": {
        payload: "GetCleanSpeed"
    },
    "GetCleanState": {
        payload: "GetCleanState"
    },
    "GetCleanSum": {
        payload: "GetCleanSum"
    },
    "GetLifeSpan": {
        payload: "GetLifeSpan"
    },
    "GetLifeSpan_filter": {
        arg: "filter",
        label: "GetLifeSpan (filter)",
        payload: "GetLifeSpan"
    },
    "GetLifeSpan_main_brush": {
        arg: "main_brush",
        label: "GetLifeSpan (main brush)",
        payload: "GetLifeSpan"
    },
    "GetLifeSpan_side_brush": {
        arg: "side_brush",
        label: "GetLifeSpan (side brush)",
        payload: "GetLifeSpan"
    },
    "GetMapImage": {
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
        arg: true,
        payload: "GetMaps"
    },
    "GetNetInfo": {
        payload: "GetNetInfo"
    },
    "GetOnOff_continuous_cleaning": {
        arg: "continuous_cleaning",
        label: "GetOnOff (continuous cleaning)",
        payload: "GetOnOff"
    },
    "GetOnOff_do_not_disturb": {
        arg: "do_not_disturb",
        label: "GetOnOff (do not disturb)",
        payload: "GetOnOff"
    },
    "GetOnOff_silence_voice_report": {
        arg: "silence_voice_report",
        label: "GetOnOff (silence voice report)",
        payload: "GetOnOff"
    },
    "GetPosition": {
        payload: "GetPosition"
    },
    "GetSleepStatus": {
        payload: "GetSleepStatus"
    },
    "GetSpotAreaInfo": {
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
        arg: {
            name: "mapID",
            required: true,
            type: "string"
        },
        payload: "GetSpotAreas"
    },
    "GetVirtualBoundaries": {
        arg: {
            name: "mapID",
            required: true,
            type: "string"
        },
        payload: "GetVirtualBoundaries"
    },
    "GetVirtualBoundaryInfo": {
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
        label: "GetVolume",
        payload: "GetVolume"
    },
    "GetWaterBoxInfo": {
        payload: "GetWaterBoxInfo"
    },
    "GetWaterLevel": {
        payload: "GetWaterLevel"
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
    "Pause": {
        payload: "Pause"
    },
    "PlaySound_custom": {
        arg: {
            name: "soundID",
            required: true,
            type: "string"
        },
        label: "PlaySound (soundID)",
        payload: "PlaySound"
    },
    "PlaySound": {
        payload: "PlaySound"
    },
    "Relocate": {
        payload: "Relocate"
    },
    "RenameSpotArea": {
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
        arg: "filter",
        label: "ResetLifeSpan (filter)",
        payload: "ResetLifeSpan"
    },
    "ResetLifeSpan_main_brush": {
        arg: "main_brush",
        label: "ResetLifeSpan (main brush)",
        payload: "ResetLifeSpan"
    },
    "ResetLifeSpan_side_brush": {
        arg: "side_brush",
        label: "ResetLifeSpan (side brush)",
        payload: "ResetLifeSpan"
    },
    "Resume": {
        payload: "Resume"
    },
    "SetAutoEmpty": {
        arg: {
            name: "value",
            required: true,
            type: "number"
        },
        payload: "SetAutoEmpty"
    },
    "SetCleanSpeed": {
        arg: {
            name: "level",
            required: true,
            type: "number"
        },
        payload: "SetCleanSpeed"
    },
    "SetOnOff_continuous_cleaning": {
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
        arg: {
            name: "volume",
            required: true,
            type: "number"
        },
        payload: "SetVolume"
    },
    "SetWaterLevel": {
        arg: {
            name: "level",
            required: true,
            type: "number"
        },
        payload: "SetWaterLevel"
    },
    "Spot": {
        payload: "Spot"
    },
    "SpotArea": {
        arg: "start",
        arg2: {
            name: "areas",
            required: true,
            type: "string"
        },
        payload: "SpotArea"
    },
    "Stop": {
        payload: "Stop"
    }
};

module.exports = {commands};

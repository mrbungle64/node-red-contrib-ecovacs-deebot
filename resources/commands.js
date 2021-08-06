const commands = {
    "AddVirtualBoundary": {
        arg: {
            name: "mapID",
            required: true,
            type: "string_mapID"
        },
        arg2: {
            name: "boundaryCoordinates",
            required: true,
            type: "string"
        },
        arg3: {
            name: "boundaryType",
            required: true,
            type: "string_boundaryType"
        },
        info: ["950Type", "laserType"],
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
            type: "number_cleanings"
        },
        info: ["laserType"],
        payload: "CustomArea"
    },
    "DeleteVirtualBoundary": {
        arg: {
            name: "mapID",
            required: true,
            type: "string_mapID"
        },
        arg2: {
            name: "boundaryID",
            required: true,
            type: "string"
        },
        arg3: {
            name: "boundaryType",
            required: true,
            type: "string_boundaryType"
        },
        info: ["950Type", "laserType"],
        payload: "DeleteVirtualBoundary"
    },
    "DisableDoNotDisturb": {
        info: ["950Type"],
        payload: "DisableDoNotDisturb"
    },
    "DisableAdvancedMode": {
        info: ["950Type"],
        payload: "DisableAdvancedMode"
    },
    "DisableTrueDetect": {
        info: ["trueDetect"],
        payload: "DisableTrueDetect"
    },
    "Disconnect": {
        payload: "Disconnect"
    },
    "EnableTrueDetect": {
        info: ["trueDetect"],
        payload: "EnableTrueDetect"
    },
    "EnableAdvancedMode": {
        info: ["950Type"],
        payload: "EnableAdvancedMode"
    },
    "EnableDoNotDisturb": {
        arg: {
            name: "timeStart",
            required: true,
            type: "time"
        },
        arg2: {
            name: "timeEnd",
            required: true,
            type: "string"
        },
        info: ["950Type"],
        payload: "EnableDoNotDisturb"
    },
    "Edge": {
        info: ["nonLaserType"],
        payload: "Edge"
    },
    "FindMe": {
        arg: "30",
        label: "FindMe",
        payload: "PlaySound"
    },
    "GetAutoEmpty": {
        info: ["suctionStation"],
        payload: "GetAutoEmpty"
    },
    "GetAdvancedMode": {
        info: ["950Type"],
        payload: "GetAdvancedMode"
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
    "GetMapImage": {
        arg: {
            name: "mapID",
            required: true,
            type: "string_mapID"
        },
        arg2: {
            name: "mapInfoType",
            required: true,
            type: "string_mapInfoType"
        },
        info: ["950Type", "laserType", "canvasLibrary"],
        payload: "GetMapImage"
    },
    "GetMaps": {
        arg: true,
        arg2: {
            name: "includeMapImage",
            required: true,
            type: "boolean"
        },
        info: ["laserType", "canvasLibrary"],
        payload: "GetMaps"
    },
    "GetMapsBasic": {
        info: ["laserType","enableSimpleEvents"],
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
        info: ["notWorking"],
        payload: "GetOnOff"
    },
    "GetPosition": {
        info: ["laserType"],
        payload: "GetPosition"
    },
    "GetSchedules": {
        payload: "GetSchedules"
    },
    "GetSleepStatus": {
        payload: "GetSleepStatus"
    },
    "GetSpotAreaInfo": {
        arg: {
            name: "mapID",
            required: true,
            type: "string_mapID"
        },
        arg2: {
            name: "spotAreaID",
            required: true,
            type: "string"
        },
        info: ["laserType","enableSimpleEvents"],
        payload: "GetSpotAreaInfo"
    },
    "GetSpotAreas": {
        arg: {
            name: "mapID",
            required: true,
            type: "string_mapID"
        },
        info: ["laserType","enableSimpleEvents"],
        payload: "GetSpotAreas"
    },
    "GetTrueDetect": {
        info: ["trueDetect"],
        payload: "GetTrueDetect"
    },
    "GetVirtualBoundaries": {
        arg: {
            name: "mapID",
            required: true,
            type: "string_mapID"
        },
        info: ["laserType","enableSimpleEvents"],
        payload: "GetVirtualBoundaries"
    },
    "GetVirtualBoundaryInfo": {
        arg: {
            name: "mapID",
            required: true,
            type: "string_mapID"
        },
        arg2: {
            name: "boundaryID",
            required: true,
            type: "string"
        },
        arg3: {
            name: "boundaryType",
            required: true,
            type: "string_boundaryType"
        },
        info: ["laserType","enableSimpleEvents"],
        payload: "GetVirtualBoundaryInfo"
    },
    "GetVolume": {
        label: "GetVolume",
        info: ["950Type"],
        payload: "GetVolume"
    },
    "GetWaterBoxInfo": {
        info: ["moppingSystem"],
        payload: "GetWaterBoxInfo"
    },
    "GetWaterLevel": {
        info: ["moppingSystem"],
        payload: "GetWaterLevel"
    },
    "MoveBackward": {
        info: ["worksOnlyOnce"],
        payload: "MoveBackward"
    },
    "MoveForward": {
        info: ["worksOnlyOnce"],
        payload: "MoveForward"
    },
    "MoveLeft": {
        info: ["worksOnlyOnce"],
        payload: "MoveLeft"
    },
    "MoveRight": {
        info: ["worksOnlyOnce"],
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
        info: ["950Type"],
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
        info: ["ozmo930"],
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
        info: ["mainBrush"],
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
            type: "number_on_off"
        },
        info: ["suctionStation"],
        payload: "SetAutoEmpty"
    },
    "SetCleanSpeed": {
        arg: {
            name: "level",
            required: true,
            type: "number_level"
        },
        payload: "SetCleanSpeed"
    },
    "SetOnOff_continuous_cleaning": {
        arg: "continuous_cleaning",
        arg2: {
            name: "value",
            required: true,
            type: "number_on_off"
        },
        label: "SetOnOff (continuous cleaning)",
        info: ["non950Type"],
        payload: "SetOnOff"
    },
    "SetOnOff_do_not_disturb": {
        arg: "do_not_disturb",
        arg2: {
            name: "value",
            required: true,
            type: "number_on_off"
        },
        label: "SetOnOff (do not disturb)",
        info: ["non950Type"],
        payload: "SetOnOff"
    },
    "SetOnOff_silence_voice_report": {
        arg: "silence_voice_report",
        arg2: {
            name: "value",
            required: true,
            type: "number_on_off"
        },
        label: "SetOnOff (silence voice report)",
        info: ["notWorking"],
        payload: "SetOnOff"
    },
    "SetVolume": {
        arg: {
            name: "volume",
            required: true,
            type: "number_volume"
        },
        info: ["950Type"],
        payload: "SetVolume"
    },
    "SetWaterLevel": {
        arg: {
            name: "level",
            required: true,
            type: "number_level"
        },
        info: ["moppingSystem"],
        payload: "SetWaterLevel"
    },
    "Spot": {
        info: ["nonLaserType"],
        payload: "Spot"
    },
    "SpotArea": {
        arg: "start",
        arg2: {
            name: "areas",
            required: true,
            type: "string"
        },
        info: ["laserType"],
        payload: "SpotArea"
    },
    "Stop": {
        payload: "Stop"
    }
};

function getArgName(command, argNumber) {
    if (! hasArg(command, argNumber)) {
        return "";
    }
    if (commands[command]["arg" + getSuffix(argNumber)].hasOwnProperty("name")) {
        return commands[command]["arg" + getSuffix(argNumber)]["name"];
    }
    return "";
}

function getArgType(command, argNumber) {
    if (! hasArg(command, argNumber)) {
        return "string";
    }
    if (commands[command]["arg" + getSuffix(argNumber)].hasOwnProperty("type")) {
        return commands[command]["arg" + getSuffix(argNumber)]["type"];
    }
    return "string";
}

function getSuffix(argNumber) {
    if (argNumber > 1) {
        return argNumber;
    }
    return '';
}

function getTranslation(node, text) {
    if (isTranslationAvailable(node, text)) {
        return node._(node.type + "." + text);
    }
    return "";
}

function hasArg(command, argNumber) {
    if (! isValidArgNumber || ! isValidCommand(command)) {
        return false;
    }
    if (commands[command].hasOwnProperty("arg" + getSuffix(argNumber))) {
        return true;
    }
    return false;
}

function isArgRequired(command, argNumber, ignoreRequired = false) {
    if (! hasArg(command, argNumber)) {
        return false;
    }
    if (typeof commands[command]['arg' + getSuffix(argNumber)] !== "object") {
        return false;
    }
    if (commands[command]['arg' + getSuffix(argNumber)].hasOwnProperty("required") && !ignoreRequired) {
        return commands[command]['arg' + getSuffix(argNumber)]["required"];
    }
    return true;
}

function isTranslationAvailable(node, text) {
    if (node._(node.type + "." + text) !== (node.type + "." + text)) {
        return true;
    }
    return false;
}

function isValidArg(command, argNumber, argValue) {
    if (!hasArg(command, argNumber)) {
        return true;
    }
    let myRegEx;
    switch (getArgName(command, argNumber)) {
        case "areas":
            myRegEx = new RegExp('^[\\d\\,]+\\;?$');
            break;
        case "boundaryCoordinates":
            myRegEx = new RegExp('^(((-?\\d+(\\.(\\d*))?)\\,(-?\\d+(\\.(\\d*))?))+\\,)*((-?\\d+(\\.(\\d*))?)\\,(-?\\d+(\\.(\\d*))?))+[\\;\\,]?$');
            break;
        case "boundaryID":
        case "spotAreaID":
        case "mapSetID":
            myRegEx = new RegExp('^\\d+$');
            break;
        case "boundaryType":
            myRegEx = new RegExp('^(mw|vw)$');
            break;
        case "level":
            myRegEx = new RegExp('^[1234]$');
            break;
        case "mapID":
            myRegEx = new RegExp('^\\d{7,}$');
            break;
        case "mapInfoType":
            myRegEx = new RegExp('^(outline|wifiHeatMap)$');
            break;
        case "numberOfCleanings":
            myRegEx = new RegExp('^[12]$');
            break;
        case "soundID":
            myRegEx = new RegExp('^(20[01]|(1?\\d)?\\d)$');
            break;
        case "value":
            myRegEx = new RegExp('^[01]$');
            break;
        case "volume":
            myRegEx = new RegExp('^(\\d|10)$');
            break;
        case "timeStart":
        case "timeEnd":
            myRegEx = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
            break;
        default:
            switch (getArgType(command, argNumber)) {
                case "string":
                    myRegEx = new RegExp('^[a-zA-Z\\d_]+$');
                    break;
                case "number":
                    myRegEx = new RegExp('^\\d+$');
                    break;
                default:
                    return true;
            }
    }
    return myRegEx.test(argValue);
}

function isValidArgNumber(argNumber) {
    return (!(argNumber < 0) && !(argNumber > 3));
}

function isValidCommand(command) {
    if (commands.hasOwnProperty(command)) {
        return true;
    }
    return false;
}

module.exports = {commands, getArgType};

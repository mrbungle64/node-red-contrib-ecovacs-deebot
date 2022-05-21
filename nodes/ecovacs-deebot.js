module.exports = function (RED) {
    const library = require('ecovacs-deebot');
    const EcoVacsAPI = library.EcoVacsAPI;
    const nodeMachineId = require('node-machine-id');
    const countries = library.countries;
    const packageInfo = require('../package.json');

    function connect(node) {
        node.vacbot = null;

        node.status({
            fill: 'yellow',
            shape: 'dot',
            text: 'Connecting...',
        });

        const deviceNumber = node.config.deviceNumber - 1
        const password_hash = EcoVacsAPI.md5(node.account.password);
        const device_id = EcoVacsAPI.getDeviceId(nodeMachineId.machineIdSync(), deviceNumber);
        const countryCode = node.account.countryCode.toLowerCase();
        const continent = countries[countryCode.toUpperCase()].continent.toLowerCase();

        let api = new EcoVacsAPI(device_id, countryCode, continent);
        api.connect(node.account.email, password_hash).then(() => {
            api.devices().then((devices) => {
                let vacuum = devices[deviceNumber];
                node.vacbot = api.getVacBot(api.uid, EcoVacsAPI.REALM, api.resource, api.user_access_token, vacuum, continent);
                node.vacbot.on('ready', (event) => {
                    node.status({
                        fill: 'green',
                        shape: 'dot',
                        text: 'Connected',
                    });

                    const nickname = vacuum.nick ? vacuum.nick : 'New Device ' + this.deviceNumber;
                    node.send({
                        payload: {
                            "type": "info",
                            "value": {
                                "nickname": nickname,
                                "version": packageInfo.version,
                                "libraryVersion": api.getVersion(),
                                "deviceClass": node.vacbot.deviceClass,
                                "deviceModel": node.vacbot.deviceModel
                            }
                        }
                    });

                    node.vacbot.run('GetBatteryState');
                    node.vacbot.run('GetCleanState');
                    node.vacbot.run('GetChargeState');
                    node.vacbot.run('GetSleepStatus');
                    node.vacbot.run('GetCleanSum');
                    node.vacbot.run('GetCleanLogs');
                    node.vacbot.run('GetLifespan');
                    if (node.vacbot.hasSpotAreaCleaningMode()) {
                        node.vacbot.run('GetPosition');
                        if (node.vacbot.isNot950type()) {
                            // On 950 type models not necessary
                            node.vacbot.run('GetChargerPos');
                        }
                        if (node.config.enableGetMapsOnStartup) {
                            node.vacbot.run('GetMaps', true, true);
                        }
                    }
                    if (node.vacbot.hasVacuumPowerAdjustment()) {
                        node.vacbot.run('GetCleanSpeed');
                    }
                    if (node.vacbot.hasMoppingSystem()) {
                        node.vacbot.run('GetWaterBoxInfo');
                        if (node.vacbot.isNot950type()) {
                            // On 950 type models not necessary
                            node.vacbot.run('GetWaterLevel');
                        }
                    }

                    node.vacbot.on('disconnect', (error) => {
                        if (error) {
                            const errorMessage = 'Received disconnect event from library';
                            node.vacbot.disconnect();
                            node.status({
                                fill: 'gray',
                                shape: 'dot',
                                text: errorMessage
                            });
                            node.error(errorMessage);
                        }
                    });
                    node.vacbot.on('BatteryInfo', (value) => {
                        const msg = createMsgObject('BatteryInfo', value , null, '%');
                        node.send(msg);
                    });
                    node.vacbot.on('CleanReport', (value) => {
                        const msg = createMsgObject('CleanReport', value);
                        node.send(msg);
                    });
                    node.vacbot.on('ChargeState', (value) => {
                        const msg = createMsgObject('ChargeState', value);
                        node.send(msg);
                    });
                    node.vacbot.on('LifeSpan', (object) => {
                        const msg = createMsgObject('LifeSpan', object);
                        node.send(msg);
                    });
                    node.vacbot.on('Position', (object) => {
                        const msg = createMsgObject('Position', object);
                        node.send(msg);
                    });
                    node.vacbot.on('ChargingPosition', (object) => {
                        const msg = createMsgObject('ChargingPosition', object);
                        node.send(msg);
                    });
                    node.vacbot.on('LastError', (object) => {
                        const msg = createMsgObject('LastError', object);
                        node.send(msg);
                    });
                    node.vacbot.on('MoppingSystemInfo', (object) => {
                        const msg = createMsgObject('MoppingSystemInfo', object);
                        node.send(msg);
                    });
                    node.vacbot.on('DustCaseInfo', (value) => {
                        const msg = createMsgObject('DustCaseInfo', value);
                        node.send(msg);
                    });
                    node.vacbot.on('SleepStatus', (value) => {
                        const msg = createMsgObject('SleepStatus', value);
                        node.send(msg);
                    });
                    node.vacbot.on('CleanSpeed', (value) => {
                        const msg = createMsgObject('CleanSpeed', value);
                        node.send(msg);
                    });
                    node.vacbot.on('CleanLog', (object) => {
                        const msg = createMsgObject('CleanLog', object);
                        node.send(msg);
                    });
                    node.vacbot.on('LastCleanLogs', (object) => {
                        const msg = createMsgObject('LastCleanLogs', object);
                        node.send(msg);
                    });
                    node.vacbot.on('NetworkInfo', (object) => {
                        const msg = createMsgObject('NetworkInfo', object);
                        node.send(msg);
                    });
                    node.vacbot.on('CleanSum', (object) => {
                        const msg = createMsgObject('CleanSum', object);
                        node.send(msg);
                    });
                    node.vacbot.on('Volume', (value) => {
                        const msg = createMsgObject('Volume', value);
                        node.send(msg);
                    });
                    node.vacbot.on('AutoEmpty', (value) => {
                        const msg = createMsgObject('AutoEmpty', value);
                        node.send(msg);
                    });
                    node.vacbot.on('AdvancedMode', (value) => {
                        const msg = createMsgObject('AdvancedMode', value);
                        node.send(msg);
                    });
                    node.vacbot.on('CarpetPressure', (value) => {
                        const msg = createMsgObject('CarpetPressure', value);
                        node.send(msg);
                    });
                    node.vacbot.on('CleanPreference', (value) => {
                        const msg = createMsgObject('CleanPreference', value);
                        node.send(msg);
                    });
                    node.vacbot.on('TrueDetect', (value) => {
                        const msg = createMsgObject('TrueDetect', value);
                        node.send(msg);
                    });
                    node.vacbot.on('DoNotDisturbEnabled', (value) => {
                        const doNotDisturb = (parseInt(value) === 1);
                        const msg = createMsgObject('DoNotDisturbEnabled', doNotDisturb);
                        node.send(msg);
                    });
                    node.vacbot.on('ContinuousCleaningEnabled', (value) => {
                        const continuousCleaning = (parseInt(value) === 1);
                        const msg = createMsgObject('ContinuousCleaningEnabled', continuousCleaning);
                        node.send(msg);
                    });
                    node.vacbot.on('VoiceReportDisabled', (value) => {
                        const voiceReportDisabled = (parseInt(value) === 1);
                        const msg = createMsgObject('VoiceReportDisabled', voiceReportDisabled);
                        node.send(msg);
                    });
                    node.vacbot.on('LastUsedAreaValues', (value) => {
                        const msg = createMsgObject('LastUsedAreaValues', value);
                        node.send(msg);
                    });
                    node.vacbot.on('MapDataObject', (object) => {
                        const msg = createMsgObject('MapDataObject', object);
                        node.send(msg);
                    });
                    node.vacbot.on('MapImage', (object) => {
                        const msg = createMsgObject('MapImage', object);
                        node.send(msg);
                    });
                    node.vacbot.on('CurrentMapName', (value) => {
                        const msg = createMsgObject('CurrentMapName', value);
                        node.send(msg);
                    });
                    node.vacbot.on('CurrentMapMID', (value) => {
                        const msg = createMsgObject('CurrentMapMID', value);
                        node.send(msg);
                    });
                    node.vacbot.on('CurrentMapIndex', (value) => {
                        const msg = createMsgObject('CurrentMapIndex', value);
                        node.send(msg);
                    });
                    node.vacbot.on('CurrentCustomAreaValues', (value) => {
                        const msg = createMsgObject('CurrentUsedCustomAreaValues', value);
                        node.send(msg);
                    });
                    node.vacbot.on('CurrentSpotAreas', (value) => {
                        const msg = createMsgObject('CurrentUsedSpotAreas', value);
                        node.send(msg);
                    });
                    node.vacbot.on('DeebotPositionCurrentSpotAreaID', (value) => {
                        const msg = createMsgObject('CurrentSpotAreaID', value);
                        node.send(msg);
                    });
                    node.vacbot.on('RelocationState', (value) => {
                        const msg = createMsgObject('RelocationState', value);
                        node.send(msg);
                    });
                    node.vacbot.on('Schedule', (object) => {
                        const msg = createMsgObject('Schedule', object);
                        node.send(msg);
                    });
                    // Activate additional simple events if enabled
                    if (node.config.enableSimpleEvents) {
                        node.vacbot.on('ChargePosition', (value) => {
                            const msg = createMsgObject('ChargePosition', value);
                            node.send(msg);
                        });
                        node.vacbot.on('CleanLog_lastImageTimestamp', (value) => {
                            const msg = createMsgObject('CleanLog_lastImageTimestamp', value);
                            node.send(msg);
                        });
                        node.vacbot.on('CleanLog_lastImageUrl', (value) => {
                            const msg = createMsgObject('CleanLog_lastImageUrl', value);
                            node.send(msg);
                        });
                        node.vacbot.on('CleanLog_lastSquareMeters', (value) => {
                            const msg = createMsgObject('CleanLog_lastSquareMeters', value);
                            node.send(msg);
                        });
                        node.vacbot.on('CleanLog_lastTimestamp', (value) => {
                            const msg = createMsgObject('CleanLog_lastTimestamp', value);
                            node.send(msg);
                        });
                        node.vacbot.on('CleanLog_lastTotalTimeString', (value) => {
                            const msg = createMsgObject('CleanLog_lastTotalTimeString', value);
                            node.send(msg);
                        });
                        node.vacbot.on('CleanSum_totalNumber', (value) => {
                            const msg = createMsgObject('CleanSum_totalNumber', value);
                            node.send(msg);
                        });
                        node.vacbot.on('CleanSum_totalSeconds', (value) => {
                            const msg = createMsgObject('CleanSum_totalSeconds', value);
                            node.send(msg);
                        });
                        node.vacbot.on('CleanSum_totalSquareMeters', (value) => {
                            const msg = createMsgObject('CleanSum_totalSquareMeters', value);
                            node.send(msg);
                        });
                        node.vacbot.on('DeebotPosition', (value) => {
                            const msg = createMsgObject('DeebotPosition', value);
                            node.send(msg);
                        });
                        node.vacbot.on('DeebotPositionIsInvalid', (value) => {
                            const msg = createMsgObject('DeebotPositionIsInvalid', value);
                            node.send(msg);
                        });
                        node.vacbot.on('Error', (value) => {
                            const msg = createMsgObject('Error', value);
                            node.send(msg);
                        });
                        node.vacbot.on('ErrorCode', (value) => {
                            const msg = createMsgObject('ErrorCode', value);
                            node.send(msg);
                        });
                        node.vacbot.on('Maps', (object) => {
                            const msg = createMsgObject('Maps', object);
                            node.send(msg);
                        });
                        node.vacbot.on('MapSpotAreas', (object) => {
                            const msg = createMsgObject('MapSpotAreas', object);
                            node.send(msg);
                        });
                        node.vacbot.on('MapSpotAreaInfo', (object) => {
                            const msg = createMsgObject('MapSpotAreaInfo', object);
                            node.send(msg);
                        });
                        node.vacbot.on('MapVirtualBoundaries', (object) => {
                            const msg = createMsgObject('MapVirtualBoundaries', object);
                            node.send(msg);
                        });
                        node.vacbot.on('MapVirtualBoundaryInfo', (object) => {
                            const msg = createMsgObject('MapVirtualBoundaryInfo', object);
                            node.send(msg);
                        });
                        node.vacbot.on('NetInfoIP', (value) => {
                            const msg = createMsgObject('NetInfoIP', value);
                            node.send(msg);
                        });
                        node.vacbot.on('NetInfoMAC', (value) => {
                            const msg = createMsgObject('NetInfoMAC', value);
                            node.send(msg);
                        });
                        node.vacbot.on('NetInfoWifiSignal', (value) => {
                            const msg = createMsgObject('NetInfoWifiSignal', value);
                            node.send(msg);
                        });
                        node.vacbot.on('NetInfoWifiSSID', (value) => {
                            const msg = createMsgObject('NetInfoWifiSSID', value);
                            node.send(msg);
                        });
                        node.vacbot.on('WaterBoxInfo', (value) => {
                            const msg = createMsgObject('WaterBoxInfo', value);
                            node.send(msg);
                        });
                        node.vacbot.on('WaterLevel', (value) => {
                            const msg = createMsgObject('WaterLevel', value);
                            node.send(msg);
                        });
                    }
                });
                node.vacbot.connect();
            });
        }).catch((e) => {
            node.status({
                fill: 'red',
                shape: 'dot',
                text: e.error,
            });
            node.error(e.error);
        });
    }

    function createMsgObject(type, value, component = null, unit = null) {
        const output = {
            type: type,
            value: value
        };
        if (component) {
            Object.assign(output, {component: component});
        }
        if (unit) {
            Object.assign(output, {unit: unit});
        }
        return {
            payload: output
        };
    }

    function EcovacsDeebot(config) {
        RED.nodes.createNode(this, config);

        let node = this;
        node.config = config;
        node.account = RED.nodes.getNode(config.account);

        node.status({
            fill: 'gray',
            shape: 'dot',
            text: 'Not connected yet',
        });

        if (node.config.connectOnStartup) {
            connect(node);
        }

        node.on('input', (msg) => {
            if (msg.payload === 'Connect') {
                if (node.account) {
                    connect(node);
                } else {
                    node.status({
                        fill: 'red',
                        shape: 'dot',
                        text: 'Ecovacs account missing'
                    });
                }
            }
            else if (node.vacbot) {
                if (msg.payload === 'Disconnect') {
                    node.vacbot.disconnect();
                    node.status({
                        fill: 'gray',
                        shape: 'dot',
                        text: 'Disconnected'
                    });
                } else if ((msg.arg !== undefined) && (msg.arg2 !== undefined) && (msg.arg3 !== undefined)) {
                    node.vacbot.run(msg.payload, msg.arg, msg.arg2, msg.arg3);
                } else if ((msg.arg !== undefined) && (msg.arg2 !== undefined)) {
                    node.vacbot.run(msg.payload, msg.arg, msg.arg2);
                } else if ((msg.arg !== undefined)) {
                    node.vacbot.run(msg.payload, msg.arg);
                } else {
                    node.vacbot.run(msg.payload);
                }
            }
        });

        node.on('close', () => {
            node.vacbot.disconnect();
        });
    }

    RED.nodes.registerType('ecovacs-deebot', EcovacsDeebot);
}

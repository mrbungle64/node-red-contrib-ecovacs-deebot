module.exports = function (RED) {
    const library = require('ecovacs-deebot');
    const EcoVacsAPI = library.EcoVacsAPI;
    const nodeMachineId = require('node-machine-id');
    const countries = library.countries;

    function connect(node) {
        node.vacbot = null;

        node.status({
            fill: 'yellow',
            shape: 'dot',
            text: 'Connecting...',
        });

        const password_hash = EcoVacsAPI.md5(node.account.password);
        const device_id = EcoVacsAPI.getDeviceId(nodeMachineId.machineIdSync(), node.config.deviceNumber);
        const countryCode = node.account.countryCode.toLowerCase();
        const continent = countries[countryCode.toUpperCase()].continent.toLowerCase();

        let api = new EcoVacsAPI(device_id, countryCode, continent);
        api.connect(node.account.email, password_hash).then(() => {
            api.devices().then((devices) => {
                let vacuum = devices[node.config.deviceNumber];
                node.vacbot = api.getVacBot(api.uid, EcoVacsAPI.REALM, api.resource, api.user_access_token, vacuum, continent);
                node.vacbot.on('ready', (event) => {
                    node.status({
                        fill: 'green',
                        shape: 'dot',
                        text: 'Connected',
                    });

                    node.vacbot.run('GetBatteryState');
                    node.vacbot.run('GetCleanState');
                    node.vacbot.run('GetChargeState');
                    node.vacbot.run('GetSleepStatus');
                    node.vacbot.run('GetCleanSpeed');
                    node.vacbot.run('GetCleanSum');
                    node.vacbot.run('GetCleanLogs');
                    node.vacbot.run('GetLifespan');
                    if (node.vacbot.hasSpotAreas()) {
                        node.vacbot.run('GetPosition');
                        node.vacbot.run('GetChargerPos');
                    }
                    if (node.vacbot.vacbot.hasMoppingSystem()) {
                        node.vacbot.run('GetWaterBoxInfo');
                        node.vacbot.run('GetWaterLevel');
                    }

                    node.vacbot.on('disconnect', () => {
                        node.status({
                            fill: 'gray',
                            shape: 'dot',
                            text: 'Disconnected'
                        });
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
                    node.vacbot.on('DeebotPositionCurrentSpotAreaID', (value) => {
                        const msg = createMsgObject('CurrentSpotAreaID', value);
                        node.send(msg);
                    });
                });
                node.vacbot.connect_and_wait_until_ready();
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
                } else if (msg.arg && msg.arg2 && msg.arg3) {
                    node.vacbot.run(msg.payload, msg.arg, msg.arg2, msg.arg3);
                } else if (msg.arg && msg.arg2) {
                    node.vacbot.run(msg.payload, msg.arg, msg.arg2);
                } else if (msg.arg) {
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

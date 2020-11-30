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

                    if (node.vacbot.hasMoppingSystem()) {
                        node.vacbot.run('GetWaterBoxInfo','');
                        node.vacbot.run('GetWaterLevel','');
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
                    node.vacbot.on('LifeSpan_filter', (value) => {
                        const msg = createMsgObject('LifeSpan', Math.round(value), 'filter', '%');
                        node.send(msg);
                    });
                    node.vacbot.on('LifeSpan_main_brush', (value) => {
                        const msg = createMsgObject('LifeSpan', Math.round(value), 'main_brush', '%');
                        node.send(msg);
                    });
                    node.vacbot.on('LifeSpan_side_brush', (value) => {
                        const msg = createMsgObject('LifeSpan', Math.round(value), 'side_brush', '%');
                        node.send(msg);
                    });
                    node.vacbot.on('WaterLevel', (value) => {
                        const msg = createMsgObject('WaterLevel', value);
                        node.send(msg);
                    });
                    node.vacbot.on('WaterBoxInfo', (value) => {
                        const msg = createMsgObject('WaterBoxInfo', value);
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
                    node.vacbot.on('CleanSum_totalSquareMeters', (value) => {
                        const msg = createMsgObject('CleanSum', value, 'totalSquareMeters');
                        node.send(msg);
                    });
                    node.vacbot.on('CleanSum_squareMeters', (value) => {
                        const msg = createMsgObject('CleanSum', value, 'squareMeters');
                        node.send(msg);
                    });
                    node.vacbot.on('CleanSum_totalSeconds', (value) => {
                        const msg = createMsgObject('CleanSum', value, 'totalSeconds');
                        node.send(msg);
                    });
                    node.vacbot.on('CleanSum_totalNumber', (value) => {
                        const msg = createMsgObject('CleanSum', value, 'totalNumber');
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
            payload: {
                type: type,
                value: value,
                unit: unit
            }
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

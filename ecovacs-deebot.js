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
                node.vacbot.on("ready", (event) => {
                    node.status({
                        fill: 'green',
                        shape: 'dot',
                        text: 'Connected',
                    });
                    node.vacbot.run("BatteryState");
                    node.vacbot.on("disconnect", () => {
                        node.status({
                            fill: "gray",
                            shape: "dot",
                            text: "Disconnected"
                        });
                    });
                    node.vacbot.on("BatteryInfo", (value) => {
                        let msg = {
                            payload: {
                                type: "BatteryInfo",
                                value: value,
                                unit: "%"
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("CleanReport", (value) => {
                        let msg = {
                            payload: {
                                type: "CleanReport",
                                state: value
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("ChargeState", (value) => {
                        let msg = {
                            payload: {
                                type: "ChargeState",
                                state: value
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("LifeSpan_filter", (value) => {
                        let msg = {
                            payload: {
                                type: "LifeSpan_filter",
                                value: Math.round(value),
                                unit: "%"
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("LifeSpan_main_brush", (value) => {
                        let msg = {
                            payload: {
                                type: "LifeSpan_main_brush",
                                value: Math.round(value),
                                unit: "%"
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("LifeSpan_side_brush", (value) => {
                        let msg = {
                            payload: {
                                type: "LifeSpan_side_brush",
                                value: Math.round(value),
                                unit: "%"
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("WaterLevel", (value) => {
                        let msg = {
                            payload: {
                                type: "WaterLevel",
                                value: value
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("WaterBoxInfo", (value) => {
                        let msg = {
                            payload: {
                                type: "WaterBoxInfo",
                                value: value
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("DustCaseInfo", (value) => {
                        let msg = {
                            payload: {
                                type: "DustCaseInfo",
                                value: value
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("SleepStatus", (status) => {
                        let msg = {
                            payload: {
                                type: "SleepStatus",
                                status: status
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("CleanSpeed", (value) => {
                        let msg = {
                            payload: {
                                type: "CleanSpeed",
                                value: value
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("Error", (value) => {
                        let msg = {
                            payload: {
                                type: "Error",
                                value: value
                            }
                        };
                        node.send(msg);
                    });
                    node.vacbot.on("ErrorCode", (value) => {
                        let msg = {
                            payload: {
                                type: "ErrorCode",
                                value: value
                            }
                        };
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

        node.on('input', (msg) => {
            if (msg.payload === "connect") {
                if (node.account) {
                    connect(node);
                } else {
                    node.status({
                        fill: "red",
                        shape: "dot",
                        text: "Ecovacs account missing"
                    });
                }
            }
            else if (node.vacbot) {
                if (msg.payload === "disconnect") {
                    node.vacbot.disconnect();
                    node.status({
                        fill: "gray",
                        shape: "dot",
                        text: "Disconnected"
                    });
                } else if (msg.arg !== "") {
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

    RED.nodes.registerType("ecovacs-deebot", EcovacsDeebot);
}

module.exports = function (RED) {
    const library = require('ecovacs-deebot');
    const EcoVacsAPI = library.EcoVacsAPI;
    const nodeMachineId = require('node-machine-id');
    const countries = library.countries;
    let connection = false;
    let debugMessage;
    let vacbot;

    function Connection(config, node) {
        node.status({
            fill: 'yellow',
            shape: 'dot',
            text: 'Connecting...',
        });

        let password_hash = EcoVacsAPI.md5(config.password), device_id = EcoVacsAPI.md5(nodeMachineId.machineIdSync()),
            country = null, continent = null;

        country = config.countryCode.toLowerCase();
        continent = countries[country.toUpperCase()].continent.toLowerCase();

        let api = new EcoVacsAPI(device_id, country, continent);
        api.connect(config.mail, password_hash).then(() => {
            api.devices().then((devices) => {
                let vacuum = devices[config.deviceNumber];
                vacbot = api.getVacBot(api.uid, EcoVacsAPI.REALM, api.resource, api.user_access_token, vacuum, continent);
                vacbot.on("ready", (event) => {
                    connection = true;
                    node.status({
                        fill: 'green',
                        shape: 'dot',
                        text: 'Connected',
                    });
                    vacbot.run("BatteryState");
                    vacbot.on("BatteryInfo", (value) => {
                        let msg = {
                            type: "BatteryInfo",
                            payload: value
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("CleanReport", (value) => {
                        let msg = {
                            type: "CleanReport",
                            payload: value
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("ChargeState", (value) => {
                        let msg = {
                            type: "ChargeState",
                            payload: value
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("LifeSpan_filter", (value) => {
                        let msg = {
                            type: "LifeSpan_filter",
                            payload: Math.round(value)
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("LifeSpan_main_brush", (value) => {
                        let msg = {
                            type: "LifeSpan_main_brush",
                            payload: Math.round(value)
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("LifeSpan_side_brush", (value) => {
                        let msg = {
                            type: "LifeSpan_side_brush",
                            payload: Math.round(value)
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("WaterLevel", (value) => {
                        let msg = {
                            type: "WaterLevel",
                            payload: value
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("WaterBoxInfo", (status) => {
                        let msg = {
                            type: "WaterBoxInfo",
                            payload: status
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("DustCaseInfo", (status) => {
                        let msg = {
                            type: "DustCaseInfo",
                            payload: status
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("SleepStatus", (status) => {
                        let msg = {
                            type: "SleepStatus",
                            payload: status
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("CleanSpeed", (value) => {
                        let msg = {
                            type: "CleanSpeed",
                            payload: value
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("Error", (value) => {
                        let msg = {
                            type: "Error",
                            payload: value
                        };
                        debugMessage.send(msg);
                    });
                    vacbot.on("ErrorCode", (value) => {
                        let msg = {
                            type: "ErrorCode",
                            payload: value
                        };
                        debugMessage.send(msg);
                    });
                });
                vacbot.connect_and_wait_until_ready();
            });
        }).catch((e) => {
            node.status({
                fill: 'red',
                shape: 'dot',
                text: e.codes,
            });
            console.log(e.error);
        });
    }

    function ecovacsDeebot(config) {
        RED.nodes.createNode(this, config);

        debugMessage = this;
        var node = this;

        Connection(config, node);

        node.on('input', msg => {
            if (msg.arg !== "") {
                vacbot.run(msg.payload, msg.arg);
            } else {
                vacbot.run(msg.payload);
            }
        });
    }

    RED.nodes.registerType("ecovacs-deebot", ecovacsDeebot);
}

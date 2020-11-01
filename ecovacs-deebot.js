module.exports = function (RED) {
    const library = require('ecovacs-deebot');
    const EcoVacsAPI = library.EcoVacsAPI;
    const nodeMachineId = require('node-machine-id');
    const countries = library.countries;
    let connection = false;

    function connect(node) {
        this.vacbot = null;

        node.status({
            fill: 'yellow',
            shape: 'dot',
            text: 'Connecting...',
        });

        const password_hash = EcoVacsAPI.md5(node.account.password);
        const device_id = EcoVacsAPI.md5(nodeMachineId.machineIdSync());
        const countryCode = node.account.countryCode.toLowerCase();
        const continent = countries[countryCode.toUpperCase()].continent.toLowerCase();

        let api = new EcoVacsAPI(device_id, countryCode, continent);
        api.connect(node.account.mail, password_hash).then(() => {
            api.devices().then((devices) => {
                let vacuum = devices[node.config.deviceNumber];
                this.vacbot = api.getVacBot(api.uid, EcoVacsAPI.REALM, api.resource, api.user_access_token, vacuum, continent);
                this.vacbot.on("ready", (event) => {
                    connection = true;
                    node.status({
                        fill: 'green',
                        shape: 'dot',
                        text: 'Connected',
                    });
                    this.vacbot.run("BatteryState");
                    this.vacbot.on("BatteryInfo", (value) => {
                        let msg = {
                            type: "BatteryInfo",
                            payload: value
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("CleanReport", (value) => {
                        let msg = {
                            type: "CleanReport",
                            payload: value
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("ChargeState", (value) => {
                        let msg = {
                            type: "ChargeState",
                            payload: value
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("LifeSpan_filter", (value) => {
                        let msg = {
                            type: "LifeSpan_filter",
                            payload: Math.round(value)
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("LifeSpan_main_brush", (value) => {
                        let msg = {
                            type: "LifeSpan_main_brush",
                            payload: Math.round(value)
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("LifeSpan_side_brush", (value) => {
                        let msg = {
                            type: "LifeSpan_side_brush",
                            payload: Math.round(value)
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("WaterLevel", (value) => {
                        let msg = {
                            type: "WaterLevel",
                            payload: value
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("WaterBoxInfo", (status) => {
                        let msg = {
                            type: "WaterBoxInfo",
                            payload: status
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("DustCaseInfo", (status) => {
                        let msg = {
                            type: "DustCaseInfo",
                            payload: status
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("SleepStatus", (status) => {
                        let msg = {
                            type: "SleepStatus",
                            payload: status
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("CleanSpeed", (value) => {
                        let msg = {
                            type: "CleanSpeed",
                            payload: value
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("Error", (value) => {
                        let msg = {
                            type: "Error",
                            payload: value
                        };
                        node.send(msg);
                    });
                    this.vacbot.on("ErrorCode", (value) => {
                        let msg = {
                            type: "ErrorCode",
                            payload: value
                        };
                        node.send(msg);
                    });
                });
                this.vacbot.connect_and_wait_until_ready();
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
        if (node.account) {
            connect(node);
        } else {
            node.status({
                fill: "red",
                shape: "dot",
                text: "Ecovacs account missing"
            });
        }

        this.on('input', (msg) => {
            if (msg.arg !== "") {
                node.vacbot.run(msg.payload, msg.arg);
            } else {
                node.vacbot.run(msg.payload);
            }
        });

        this.on('close', () => {
            node.vacbot.disconnect();
        });
    }

    RED.nodes.registerType("ecovacs-deebot", EcovacsDeebot);
}

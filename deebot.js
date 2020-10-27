module.exports = function (RED) {
    const ecovacsDeebot = require('ecovacs-deebot');
    const EcoVacsAPI = ecovacsDeebot.EcoVacsAPI;
    const nodeMachineId = require('node-machine-id');
    const countries = ecovacsDeebot.countries;
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
                    vacbot.on("BatteryInfo", (temp) => {
                        let msg = {};
                        msg.type = "BatteryInfo";
                        msg.payload = temp;
                        debugMessage.send(msg);
                    });
                    vacbot.on("CleanReport", (temp) => {
                        let msg = {};
                        msg.type = "CleanReport";
                        msg.payload = temp;
                        debugMessage.send(msg);
                    });
                    vacbot.on("ChargeState", (temp) => {
                        let msg = {};
                        msg.type = "ChargeState";
                        msg.payload = temp;
                        debugMessage.send(msg);
                    });
                    vacbot.on("LifeSpan", (temp) => {
                        let msg = {};
                        msg.type = "LifeSpan";
                        msg.payload = temp;
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

    function deebot(config) {
        RED.nodes.createNode(this, config);

        debugMessage = this;
        var node = this;

        Connection(config, node);

        node.on('input', function (msg) {
            if (msg.cmd != "") {
                vacbot.run(msg.payload, msg.cmd);
            } else {
                vacbot.run(msg.payload);
            }
        });
    }

    RED.nodes.registerType("deebot", deebot);
}

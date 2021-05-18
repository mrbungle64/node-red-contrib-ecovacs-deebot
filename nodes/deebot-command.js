module.exports = function (RED) {
    const {commands} = require('../resources/commands');

    function EcovacsDeebotCommandNode(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.command = config.command;
        this.arg = config.arg;
        this.arg2 = config.arg2;
        this.arg3 = config.arg3;

        let node = this;
        node.config = config;
        node.on('input', (msg) => {
            sendCommand(node, msg);
        });

        function sendCommand(node, msg) {
            const command = commands[node.config.command];
            const output = {};

            if (msg && commands.hasOwnProperty(node.config.command) ) {
                Object.assign(output, {payload: commands[node.config.command].payload});
                if (commands[node.config.command].hasOwnProperty("arg")) {
                    Object.assign(output, {arg: node.config.arg});
                    if (commands[node.config.command].hasOwnProperty("arg2")) {
                        Object.assign(output, {arg2: node.config.arg2});
                        if (commands[node.config.command].hasOwnProperty("arg3")) {
                            Object.assign(output, {arg3: node.config.arg3});
                        }
                    }
                }
            }

            if (output) {
                node.send(output);
            }
        }
    }

    RED.nodes.registerType("ecovacs-deebot-command", EcovacsDeebotCommandNode);
}

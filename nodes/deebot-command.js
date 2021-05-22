module.exports = function (RED) {
    const {commands, getArgType} = require('../resources/commands');

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
            var argValue;

            if (msg && commands.hasOwnProperty(node.config.command) ) {
                Object.assign(output, {payload: commands[node.config.command].payload});
                if (commands[node.config.command].hasOwnProperty("arg")) {
                    if (getArgType(node.config.command, 1).substring(0, 6) === "number") {
                        argValue = parseInt(node.config.arg);
                    } else {
                        argValue = node.config.arg;
                    }
                    Object.assign(output, {arg: argValue});
                    if (commands[node.config.command].hasOwnProperty("arg2")) {
                        if (getArgType(node.config.command, 2).substring(0, 6) === "number") {
                            argValue = parseInt(node.config.arg2);
                        } else {
                            argValue = node.config.arg2;
                        }
                        Object.assign(output, {arg2: argValue});
                        if (commands[node.config.command].hasOwnProperty("arg3")) {
                            if (getArgType(node.config.command, 3).substring(0, 6) === "number") {
                                argValue = parseInt(node.config.arg3);
                            } else {
                                argValue = node.config.arg3;
                            }
                            Object.assign(output, {arg3: argValue});
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

module.exports = function (RED) {
    const commands = require('../library/commands');

    function EcovacsDeebotCommandNode(config) {
        RED.nodes.createNode(this, config);
        this.command = config.command;

        let node = this;
        node.config = config;
        node.on('input', (msg) => {
            sendCommand(node, msg);
        });

        function sendCommand(node, msg) {
            const command = commands[node.config.command];
            if (command) {
                node.send({
                    payload: command.payload,
                    arg: msg.arg ? msg.arg : command.arg,
                    arg2: msg.arg2 ? msg.arg2 : command.arg2
                });
            } else {
                node.send({
                    payload: node.config.command
                });
            }
        }
    }

    RED.nodes.registerType("ecovacs-deebot-command", EcovacsDeebotCommandNode);
}

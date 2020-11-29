module.exports = function (RED) {
    const commands = require('../library/commands');

    function EcovacsDeebotCommandNode(config) {
        RED.nodes.createNode(this, config);
        this.command = config.command;

        let node = this;
        node.config = config;
        node.on('input', (msg) => {
            sendCommand(node);
        });

        function sendCommand(node) {
            const command = commands[node.config.command];
            if (command && command.payload) {
                node.send({
                    payload: command.payload,
                    arg: command.arg,
                    arg2: command.arg2
                })
            }
        }
    }

    RED.nodes.registerType("ecovacs-deebot-command", EcovacsDeebotCommandNode);
}

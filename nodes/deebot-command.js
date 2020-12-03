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

            const output = {};
            const payload = command ? command.payload : msg.payload;
            if (payload) {
                Object.assign(output, {payload: payload});
            }
            const arg = msg.arg ? msg.arg : command.arg;
            if (arg) {
                Object.assign(output, {arg: arg});
            }
            const arg2 = msg.arg2 ? msg.arg2 : command.arg2;
            if (arg2) {
                Object.assign(output, {arg2: arg2});
            }

            if (output) {
                node.send(output);
            }
        }
    }

    RED.nodes.registerType("ecovacs-deebot-command", EcovacsDeebotCommandNode);
}

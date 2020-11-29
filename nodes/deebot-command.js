module.exports = function (RED) {
    function EcovacsDeebotCommandNode(config) {
        RED.nodes.createNode(this, config);
        this.command = config.command;

        let node = this;
        node.config = config;
        node.on('input', (msg) => {
            sendCommand(node);
        });

        function sendCommand(node) {
            node.send({
                payload: {
                    payload: node.config.command
                }
            })
        }
    }

    RED.nodes.registerType("ecovacs-deebot-command", EcovacsDeebotCommandNode);
}

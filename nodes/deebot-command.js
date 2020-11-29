module.exports = function (RED) {
    function EcovacsDeebotCommandNode(n) {
        RED.nodes.createNode(this, n);
        this.command = n.command;

        let node = this;
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

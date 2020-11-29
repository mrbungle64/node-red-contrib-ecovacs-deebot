module.exports = function(RED) {
    function EcovacsDeebotCommandNode(n) {
        RED.nodes.createNode(this,n);
        this.command = n.command;
    }
    RED.nodes.registerType("ecovacs-deebot-command",EcovacsDeebotCommandNode);
}

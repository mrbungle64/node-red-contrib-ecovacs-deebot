const {commands, getArgValue} = require("../resources/commands");
module.exports = function (RED) {

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
            const output = {};
            let argValue;

            if (msg && commands.hasOwnProperty(node.config.command) ) {
                Object.assign(output, {payload: commands[node.config.command].payload});
                if (commands[node.config.command].hasOwnProperty("arg")) {
                    argValue = getArgValue(node.config.command, node.config.arg, 1);
                    Object.assign(output, {arg: argValue});
                    if (commands[node.config.command].hasOwnProperty("arg2")) {
                        argValue = getArgValue(node.config.command, node.config.arg2, 2);
                        Object.assign(output, {arg2: argValue});
                        if (commands[node.config.command].hasOwnProperty("arg3")) {
                            argValue = getArgValue(node.config.command, node.config.arg3, 3);
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

    if (RED.settings.version.substring(0, 3) < "1.3"){
        RED.httpAdmin.get('/deebot-command/*', RED.auth.needsPermission('deebot-command.read'), function(req, res) {
            const options = {
                root: __dirname + '/../resources/',
                dotfiles: 'deny'
            };
            res.sendFile(req.params[0], options);
        });
    }
}

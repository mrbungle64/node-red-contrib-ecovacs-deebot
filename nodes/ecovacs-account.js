module.exports = function(RED) {
    function EcovacsAccountNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.email = this.credentials.email;
        this.password = this.credentials.password;
        this.countryCode = n.countryCode;
        this.login = n.login;
    }
    RED.nodes.registerType("ecovacs-account",EcovacsAccountNode,{
        credentials: {
            email: {type:"text"},
            password: {type:"password"}
        }
    });
}

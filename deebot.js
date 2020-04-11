module.exports = function(RED) {
	const ecovacsDeebot = require('ecovacs-deebot'), EcoVacsAPI = ecovacsDeebot.EcoVacsAPI, VacBot = ecovacsDeebot.VacBot, nodeMachineId = require('node-machine-id'), http = require('http'), countries = ecovacsDeebot.countries;
	var etat = false;
	var leDebug;
	var vacbot;




	function httpGetJson(url) {
		return new Promise((resolve, reject) => {
			http.get(url, (res) => {
				res.setEncoding('utf8');
				let rawData = '';
				res.on('data', (chunk) => { rawData += chunk; });
				res.on('end', function(){
					try {
						const json = JSON.parse(rawData);
						resolve(json);
					} catch (e) {
						reject(e);
					}
				});
			}).on('error', (e) => {
				reject(e);
			});
		});
	}


	function Connection(config, node) {
		node.status({
			fill: 'yellow',
			shape: 'dot',
			text: 'Connecting...',
		});
		
		let password_hash = EcoVacsAPI.md5(config.password), device_id = EcoVacsAPI.md5(nodeMachineId.machineIdSync()), country = null, continent = null;

		httpGetJson('http://ipinfo.io/json').then((json) => {
			country = json['country'].toLowerCase();
			continent = countries[country.toUpperCase()].continent.toLowerCase();

			let api = new EcoVacsAPI(device_id, country, continent);
			api.connect(config.mail, password_hash).then(() => {
				api.devices().then((devices) => {
					let vacuum = devices[0];
					vacbot = api.getVacBot(api.uid, EcoVacsAPI.REALM, api.resource, api.user_access_token, vacuum, continent);
					vacbot.on("ready", (event) => {
						etat=true;
						node.status({
							fill: 'green',
							shape: 'dot',
							text: 'Connected',
						});
						vacbot.run("BatteryState");
						vacbot.on("BatteryInfo", (temp) => {
							var msg = {};
							msg.type = "BatteryInfo";
							msg.payload = temp;
							leDebug.send(msg);
						});					
						vacbot.on("CleanReport", (temp) => {
							var msg = {};
							msg.type = "CleanReport";
							msg.payload = temp;
							leDebug.send(msg);
						});						
						vacbot.on("ChargeState", (temp) => {
							var msg = {};
							msg.type = "ChargeState";
							msg.payload = temp;
							leDebug.send(msg);
						});						
						vacbot.on("LifeSpan", (temp) => {
							var msg = {};
							msg.type = "LifeSpan";
							msg.payload = temp;
							leDebug.send(msg);
						});						
					});				
					vacbot.connect_and_wait_until_ready();
				});
			}).catch((e) => {
				node.status({
					fill: 'red',
					shape: 'dot',
					text: e.codes,
				});
				console.log(e.error);
			});
		});	
	}




    function deebot(config) {
        RED.nodes.createNode(this, config);
		
		leDebug = this;
		var node = this;

		Connection(config, node);
		
		setInterval(function() {
			if ( etat == false ) {

				Connection(config, node);
			}
		},60000);
		
		
		node.on('input', function(msg) {
			if ( msg.cmd != "") {
				vacbot.run(msg.payload, msg.cmd);
			} else {
				vacbot.run(msg.payload);
			}
		});
    }



    RED.nodes.registerType("deebot", deebot);
}
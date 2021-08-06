const assert = require('assert');

const resourcesCommands = require('../resources/commands');
const germanTranslation = require('../nodes/locales/de/deebot-command.json')["ecovacs-deebot-command"];
const englishTranslation = require('../nodes/locales/en/deebot-command.json')["ecovacs-deebot-command"];

describe('Commands', () => {
    for (const command in resourcesCommands.commands) {
        describe('For command ' + command, () => {
            it('should find a payload', function () {
                assert.ok(resourcesCommands.commands[command].hasOwnProperty('payload'));
            });
            it('should find a German translation ', function () {
                assert.ok(germanTranslation.hasOwnProperty(command));
            });
            it('should find a English translation ', function () {
                assert.ok(englishTranslation.hasOwnProperty(command));
            });
        });
    }
});

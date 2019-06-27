"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_help_1 = require("@oclif/plugin-help");
const list_1 = require("@oclif/plugin-help/lib/list");
const chalk_1 = require("chalk");
const { bold } = chalk_1.default;
exports.help = async (options) => {
    plugin_help_1.default.prototype.topics = function (topics) {
        if (!topics.length)
            return;
        const theTopics = [];
        const theCommands = [];
        topics.map(t => {
            const out = [
                t.name,
                t.description && this.render(t.description.split('\n')[0])
            ];
            if (this.config.commandIDs.includes(t.name)) {
                theCommands.push(out);
            }
            const tp = this.config.commandIDs.find(id => {
                if (id.match(`${t.name}:`))
                    return true;
                return false;
            });
            if (tp) {
                theTopics.push(out);
            }
        });
        const commandsList = list_1.renderList(theCommands, {
            spacer: '\n',
            stripAnsi: this.opts.stripAnsi,
            maxWidth: this.opts.maxWidth - 2
        });
        const output = [[
                bold('COMMANDS'),
                indent(commandsList)
            ].join('\n')
        ];
        if (theTopics.length) {
            const topicsList = list_1.renderList(theTopics, {
                spacer: '\n',
                stripAnsi: this.opts.stripAnsi,
                maxWidth: this.opts.maxWidth - 2
            });
            output.push([
                bold('TOPICS'),
                indent('Run help for each topic below to view subcommands\n'),
                indent(topicsList)
            ].join('\n'));
        }
        return output.join('\n\n');
    };
};
function indent(str) {
    return str.replace(/^(?!\s*$)/mg, ' '.repeat(2));
}
//# sourceMappingURL=massageHelp.js.map
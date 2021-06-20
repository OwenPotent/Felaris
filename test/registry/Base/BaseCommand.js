module.exports = class BaseCommand {
    constructor({ name, description, aliases, usage, cooldown, nsfwOnly, guildOnly }) {

        this.name = name
        this.description = description
        this.aliases = aliases
        this.usage = usage
        this.cooldown = cooldown
        this.nsfwOnly = nsfwOnly
        this.guildOnly = guildOnly

        if (!this.cooldown) {
            this.cooldown = 3000
        }

        if (!this.nsfwOnly) {
            this.nsfwOnly = false
        }

        if (!this.guildOnly) {
            this.guildOnly = false
        }

        if (typeof this.cooldown !== Number) {
            throw new TypeError('Cooldown must be a number')
        }
    }

    async run(message, client, args) {

    }
}
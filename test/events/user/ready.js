const BaseEvent = require('../../registry/Base/BaseEvent')
const { log } = require('../../util/Logger')

module.exports = class Ready extends BaseEvent {
    constructor() {
        super({
            name: 'ready',
        })
    }

    run() {
        log('I am ready!')
    }
}
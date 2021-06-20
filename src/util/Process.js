/**
 * 
 * @param {String} content - content you wish to send to the console when an error occurs on the process.
 * @default content - "Unknown error provided"
 * @returns {void}
 */

const { warn, error } = require("./Logger");

exports.unhandledRejection = function unhandledRejection(content) {
    let content;

    if (!content) {

        warn("No 'content' provided, using default.")
        content = "Unknown error occured"
    }

    process.on('unhandledRejection', err => {
        error(content + '\n' + err)
    })
}
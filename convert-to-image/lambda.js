
const parseSnsEvent = require('./parse-sns-event')

exports.handler = async (event) => {
    let messages = parseSnsEvent(event)
    console.log(messages) // eslint-disable-line no-console
    return messages
}


const parseSnsEvent = require('./parse-sns-event')

exports.handler = async (event) => {
    let messages = parseSnsEvent(event)
    console.log(messages)
    return messages
}
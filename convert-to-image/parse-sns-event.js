module.exports = (event) => {
	if (!event || !event.Records || !Array.isArray(event.Records))
		return []

	return event.Records
		.map(record => record.Sns && record.Sns.Message && JSON.parse(record.Sns.Message))
		.filter(message => message)
}

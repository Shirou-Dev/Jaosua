module.exports = async (client, node) => {
	client.logger.danger(`Node ${node.options.identifier} Disconnected`);
}
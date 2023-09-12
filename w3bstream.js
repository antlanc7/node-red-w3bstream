async function initClient(node) {
  const { W3bstreamClient } = await import("w3bstream-client-js");
  try {
    node.client = new W3bstreamClient(config.url, config.apikey);
  } catch (error) {
    node.error(error);
  }
}

module.exports = function (RED) {
  function W3bstreamNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    initClient(node);
    node.on("input", function (msg, send, done) {
      node.client
        .publishSingle(
          {
            device_id: config.deviceid,
            event_type: config.eventtype || msg.topic,
          },
          msg.payload
        )
        .then((res) => {
          msg.payload = res.data;
          send(msg);
          done();
        });
    });
  }
  RED.nodes.registerType("w3bstream", W3bstreamNode);
};

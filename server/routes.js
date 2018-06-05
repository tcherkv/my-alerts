export default function (server, options) {
  // We can use this method, since we have set the require in the index.js to
  // elasticsearch. So we can access the elasticsearch plugins safely here.
  let {
    callWithRequest
  } = server.plugins.elasticsearch.getCluster('data');
  server.log(['plugin:my_alerts', 'info'], 'my_alerts initialization');
  // Add a route to retrieve the status of an index by its name
  server.route({
    // We can use path variables in here, that can be accessed on the request
    // object in the handler.
    path: '/api/my_alerts/mute/{name}',
    method: 'GET',
    handler(req, reply) {
      server.log(['plugin:my_alerts', 'info'], 'GET mute called for alert: ' + req.params.name);
      let uri = '/_xpack/watcher/watch/' + req.params.name + '/_ack';
      server.log(['plugin:my_alerts', 'info'], 'URI: ' + uri);

      // reply({ time: (new Date()).toISOString() });
      try {
        callWithRequest(req, 'transport.request', {
          path: uri,
          method: 'PUT'
        }).then(function (response) {
          reply(response);
        },
        function (error) {
          reply(error);
        });
      } catch (error) {
        reply(error);
      }
    }
  });

  server.route({
    // We can use path variables in here, that can be accessed on the request
    // object in the handler.
    path: '/api/my_alerts/alerts',
    method: 'GET',
    handler(req, reply) {
      server.log(['plugin:my_alerts', 'info'], 'GET all alerts called');
      let uri = '.watches/_search';
      server.log(['plugin:my_alerts', 'info'], 'URI: ' + uri);

      // reply({ time: (new Date()).toISOString() });
      try {
        callWithRequest(req, 'transport.request', {
          path: uri,
          method: 'GET'
        }).then(function (response) {
          reply(response);
        },
        function (error) {
          reply(error);
        });
      } catch (error) {
        reply(error);
      }
    }
  });
}

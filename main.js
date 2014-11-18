var karma = Npm.require('karma')

Karma = {
  server: {
    start: function (options, callback) {
      options = options || {}
      options = KarmaInternals.loadPlugins(options)

      if (_.isFunction(callback)) {
        callback = Meteor.bindEnvironment(callback, 'karma.server.start callback')
      } else {
        callback = function () {}
      }

      return karma.server.start(options, callback)
    }
  },
  runner: {
    run: function (options, callback) {
      options = options || {}
      options = KarmaInternals.loadPlugins(options)

      if (_.isFunction(callback)) {
        callback = Meteor.bindEnvironment(callback, 'karma.runner.run callback')
      } else {
        callback = function () {}
      }

      return karma.runner.run(options, callback)
    }
  },
  plugins: {
    register: function (pluginName, pluginObject) {
      KarmaInternals.karmaPlugins[pluginName] = pluginObject
    }
  }
}

KarmaInternals = {
  karmaPlugins: {},

  emptyPlugins: function () {
    KarmaInternals.karmaPlugins = {}
  },

  // Loads plugins via plugins option by inlining them.
  // See http://karma-runner.github.io/0.12/config/plugins.html
  loadPlugins: function (config) {
    if (config.plugins) {
      config.plugins = _.map(config.plugins, function (plugin) {
        if (_.isString(plugin)) {
          if (KarmaInternals.karmaPlugins[plugin]) {
            return KarmaInternals.karmaPlugins[plugin]
          } else {
            throw new Error(
              'Karma plugin "' + plugin + '" is not available. ' +
              'Please make sure to load it via a separate smart package.'
            )
          }
        } else {
          return plugin
        }
      })
    }

    return config
  }
}

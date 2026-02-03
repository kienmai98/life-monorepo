const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('node:path');

/**
 * Metro configuration for monorepo
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  // Support for monorepo - add root node_modules to search paths
  watchFolders: [path.resolve(__dirname, '../../')],
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
    ],
    // Ensure we resolve workspace packages
    extraNodeModules: {
      '@life/types': path.resolve(__dirname, '../../packages/types'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

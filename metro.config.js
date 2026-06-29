const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Ensure commonjs and cjs extensions are resolved
config.resolver = config.resolver || {};
config.resolver.sourceExts = Array.from(new Set([...(config.resolver.sourceExts || []), 'cjs']));

// Keep default transformer, but ensure Metro watches project root
config.watchFolders = config.watchFolders || [];

module.exports = config;

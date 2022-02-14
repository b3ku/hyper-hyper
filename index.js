const { decorateConfig, mapHyperDispatch } = require('./lib/theme');
const middleware = require('./lib/middleware');
const decorateMenu = require('./lib/menu');
const { mapHyperState, decorateHyper } = require('./lib/hyper');
const decorateTabs = require('./lib/tabs');
const decorateTerms = require('./lib/terms');
const decorateTerm = require('./lib/term');

exports.decorateConfig = decorateConfig(exports);
exports.middleware = middleware;
exports.decorateMenu = decorateMenu;
exports.mapHyperDispatch = mapHyperDispatch;
exports.mapHyperState = mapHyperState;
exports.decorateHyper = decorateHyper;
exports.decorateTabs = decorateTabs;
exports.decorateTerms = decorateTerms;
exports.decorateTerm = decorateTerm;




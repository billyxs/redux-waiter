/* eslint-disable */
import chai from 'chai'
// import jsdom from 'jsdom'

// const { JSDOM } = jsdom

// setup the simplest document possible
// const { window } = new JSDOM('<!doctype html><html><body></body></html>')

// set globals for mocha that make access to document and window feel
// natural in the test environment
// global.window = window
// global.document = window.document
// global.navigator = {
//  userAgent: 'Chrome',
//}

// Mocha / Chai
// ------------------------------------
chai.should()

global.chai = chai
global.expect = chai.expect

// Chai Plugins
// ------------------------------------



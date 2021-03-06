"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cmd = require('node-cmd');

var fsx = require('fs-extra');

var Spinner = require('../../lib/Spinner');

var Log = require('../../lib/Log');

function builder(yargs) {
  return yargs.option('template', {
    alias: 't',
    type: 'string',
    describe: 'Build project with template',
    choices: ['vue', 'react'],
    default: 'react'
  }).option('name', {
    alias: 'n',
    type: 'string',
    describe: 'Name of the project'
  }).example('kaizen create --template react --name myproject').demandOption(['name'], 'Please enter your project name');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var projectName, template;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            Spinner.start();
            projectName = argv.name, template = argv.template;
            Log.NormalLog("Downloading project, please wait a second");
            _context.t0 = template;
            _context.next = _context.t0 === 'vue' ? 7 : _context.t0 === 'react' ? 10 : 10;
            break;

          case 7:
            _context.next = 9;
            return cloneProjectFromGithub('https://github.com/PortalNetwork/vue-truffle.git', projectName);

          case 9:
            return _context.abrupt("break", 13);

          case 10:
            _context.next = 12;
            return cloneProjectFromGithub('https://github.com/PortalNetwork/react-truffle.git', projectName);

          case 12:
            return _context.abrupt("break", 13);

          case 13:
            fsx.removeSync("./".concat(projectName, "/.git"));
            Spinner.stop();
            Log.SuccessLog("\n==== Create ".concat(projectName, " Successfully ===="));
            _context.next = 23;
            break;

          case 18:
            _context.prev = 18;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 18]]);
  }));
  return _handler.apply(this, arguments);
}

function cloneProjectFromGithub(repoURL, projectName) {
  return new Promise(function (resolve, reject) {
    cmd.get("git clone ".concat(repoURL, " ").concat(projectName), function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = function (yargs) {
  var command = 'create';
  var commandDescription = 'Create a kaizen project';
  yargs.command(command, commandDescription, builder, handler);
};
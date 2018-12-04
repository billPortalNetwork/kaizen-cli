require("@babel/polyfill");

const yargs = require('yargs');
require('./Config');
require('./Create');
//require('./Deploy');
//require('./Info');
require('./Install');

/** Plugin Management **/
require('./Plugin');
require('./Plugin/PluginInstall');
require('./Plugin/PluginUninstall');
require('./Plugin/PluginList');

/** Contract Management **/
require('./Contract/Deploy');

/** Platform Management **/
require('./Platform/Login')(yargs);
require('./Platform/Logout')(yargs);
require('./Platform/RefreshToken')(yargs);

//require('./AddPlugin')(yargs);
//require('./RemovePlugin')(yargs);
//require('./CreateProject')(yargs);
//require('./BuildProject')(yargs);
//require('./IPFSUpload')(yargs);
//require('./TestContracts')(yargs);
//require('./CompileContracts')(yargs);
//require('./DeployContracts')(yargs);
//require('./Settings')(yargs);

yargs.demandCommand();

module.exports = yargs;
/*! 作者:阿伟 */
/*! git:https://github.com/328080339/JsLibs.git */
/*! 推荐sealoader模块加载器:https://www.npmjs.com/package/sealoader */
/*! 最后修改于 2016-04-06 15:39:04 */
define(function(require,exports,module){var countdown=require("seajs-countdown").newInstance(),httpClient=require("seajs-httpClient"),tip=require("seajs-common-tip"),config;require("seajs-validate"),exports.setConfig=function(a,b){return"sendBtn"==a?void console.log("you can't do it"):void(config[a]=b)},exports["int"]=function(a){config=a,config.sendBtn.addEventListener("click",function(){if(config.validIpts){var a=!0,b=config.validIpts;"Array"!=Object.prototype.toString.call(b).slice(8,-1)&&(b=[b]);for(var c=0,d=b.length;d>c;c++){var e=b[c].validMe(!1);e.isok||(a=!1,b[c].showErrorTip(e.tip))}if(!a)return}countdown.start(this),httpClient.showWaitting=!1;var f=function(a){httpClient.showWaitting=!0,0!=a.code?(countdown.stop(),config.onError?config.onError(a):tip.show(a.msg,!1)):config.onSuccess&&config.onSuccess(a)},g=config.parameters;g&&"function"==typeof g&&(g=config.parameters()),"post"==config.method?httpClient.post(config.url,g,f):httpClient.get(config.url+"?"+g,f)})},exports.newInstance=function(fuc){return function(){return fuc+="",-1==fuc.indexOf("\nexports=this;")&&(fuc=("0,("+fuc+")").replace("{","{\nexports=this;")),new(eval(fuc))(require,exports,module)}}(arguments.callee)});
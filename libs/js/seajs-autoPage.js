/*! 作者:阿伟 */
/*! git:https://github.com/328080339/JsLibs.git */
/*! 推荐sealoader模块加载器:https://www.npmjs.com/package/sealoader */
/*! 最后修改于 2016-04-06 15:39:04 */
define(function(require,exports,module){function run(page){var code=++requestCount;null==page?(exports.pageNow=1,page=null==config.pageNow?"":config.pageNow.split("=")[0]+"=1"):-1==(page+="").indexOf("=")?(exports.pageNow=page,page=config.pageNow.split("=")[0]+"="+page):exports.pageNow=config.pageNow.split("=")[1];var url=config.url;null!=config.pageSize&&(url+=(-1!=config.url.indexOf("?")?"&":"?")+page+"&"+config.pageSize);var httpCallBac=function(rs){code==requestCount&&(config.dataKey?draw(eval("rs."+config.dataKey),rs):draw(rs,rs))};if("post"==config.method){var urlA=url.split("?");httpClient.post(urlA[0],urlA[1],httpCallBac)}else httpClient.get(url,httpCallBac)}function removeLoading(){dataCont.lastChild==loadding&&dataCont.removeChild(loadding)}function vT(a){return"string"==typeof config[a]?function(b){return exports.formatData(config[a],b)}:config[a]}var assetsUrl=module.uri;assetsUrl=assetsUrl.substring(0,assetsUrl.lastIndexOf("/js/"))+"/";var httpClient=require("seajs-httpClient"),config,loadding,tipFuc,drawFuc,dataCont,requestCount=0,loadMode,isScrollBottom,loadingImg=document.createElement("img");loadingImg.src=assetsUrl+"imgs/seajs-autoPage-loading.gif",loadingImg.style.cssText="width: 15px; height: 15px;vertical-align: middle;",exports["int"]=function(a){config=a;var b=document.getElementById(config.contId);config.hasWrapper!==!1?(dataCont=document.createElement("autoPageNode"),b.appendChild(dataCont)):dataCont=b,loadding=document.createElement("table"),loadding.style.cssText="width:100%;height: 15px;margin: 10px auto;clear: both;text-align: center;float:left;",config.autoRun!==!1&&exports.update(config.pageNow)},exports.setConfig=function(a,b){return"hasWrapper"==a?void console.log("暂不支持修改hasWrapper"):void(config[a]=b)},exports.getConfig=function(key){return eval("config."+key)},exports.update=function(a){httpClient.showWaitting=!0,dataCont.innerHTML="",loadding.innerHTML="",loadding.appendChild(loadingImg),loadding.innerHTML+="<span style='font-size:15px;color:#999999;'>正在加载...</span>";var b=document.getElementById(config.contId);for(dataCont!=b&&dataCont.parentNode!=b&&b.appendChild(dataCont);;){if("hidden"!=getComputedStyle(b).overflowY)break;if(b==document.body)return void console.log("没有发现可能出现滚动条的容器,请检查样式!")}if(isScrollBottom=b==document.body?function(){return b.scrollTop>=document.body.scrollHeight-document.documentElement.clientHeight}:function(){return b.scrollTop>=b.scrollHeight-b.getBoundingClientRect().height},drawFuc=vT("draw"),tipFuc="string"==typeof config.emptyTip?function(){return config.emptyTip}:config.emptyTip,loadMode={onScroll:function(){dataCont.lastChild!=loadding&&isScrollBottom()&&(dataCont.appendChild(loadding),run(++exports.pageNow))},start:function(){b.addEventListener("scroll",this.onScroll)},end:function(){b.removeEventListener("scroll",this.onScroll)}},loadding.onclick=null,1==config.loadMode){var c=loadding.cloneNode(!1);c.innerHTML="<span style='font-size:15px;color:#999999;cursor:pointer;'>点击加载更多</span>",c.onclick=function(){dataCont.removeChild(c),dataCont.appendChild(loadding),run(++exports.pageNow)},loadMode={start:function(){dataCont.appendChild(c)},end:function(){c=null}}}run(a)},exports.formatData=function(baseData,itemJson){return baseData.replace(/\{(.*?)\}/g,function($0,$1){var evalue=eval("itemJson."+$1);return null!=evalue?evalue:""})};var isFull=function(a){var b=function(a){if(!a)return!1;if(a.getBoundingClientRect().bottom>document.documentElement.clientHeight)return!0;for(var c=a.children,d=0,e=c.length;e>d;d++)if(b(c[d]))return!0;return!1};return b(a.lastElementChild)},draw=function(a,b){if(removeLoading(),a){for(var c=0;c<a.length;c++){var d=drawFuc(a[c],{baseJson:b,index:c});"object"!=typeof d?dataCont.innerHTML+=exports.formatData(d,a[c]):dataCont.appendChild(d)}config.onFinishDraw&&config.onFinishDraw(a,b)}var e=!a||a.length<config.pageSize.split("=")[1]/1;if(e&&""==dataCont.innerHTML&&config.emptyTip){var d=tipFuc();"object"!=typeof d?dataCont.innerHTML=d:dataCont.appendChild(d)}else e||config.isLoadOver&&config.isLoadOver(b)?(console.log("已显示全部"),loadMode.end&&loadMode.end(),loadding.innerHTML="<span style='font-size: 15px;color:#999999;'>已显示全部</span>",dataCont.appendChild(loadding)):isFull(dataCont)?(console.log("开启下拉加载"),httpClient.showWaitting=!1,loadMode.start&&loadMode.start()):(httpClient.showWaitting=!0,console.log("没有填满继续加载"),run(++exports.pageNow))};exports.newInstance=function(fuc){return function(){if(fuc+="",-1==fuc.indexOf("\nexports=this;")){fuc=("0,("+fuc+")").replace("{","{\nexports=this;");var p=/([\s;=]+require\s*\([\s\S]*?\))/g;fuc=fuc.replace(p,"$1.newInstance()"),p=/( *\. *newInstance *\( *\)){2}/g,fuc=fuc.replace(p,".newInstance()")}return new(eval(fuc))(require,exports,module)}}(arguments.callee)});
/*! 作者:阿伟 */
/*! git:https://github.com/awei-yu/JsLibs.git */
/*! 推荐sealoader模块加载器:https://www.npmjs.com/package/sealoader */
/*! 最后修改于 2016-04-18 11:35:42 */
define(function(require,exports,module){function clsIDCard(a){this.Valid=!1,this.ID15="",this.ID18="",this.Local="",null!=a&&this.SetCardNo(a)}var assetsUrl=module.uri;assetsUrl=assetsUrl.substring(0,assetsUrl.lastIndexOf("/js/"))+"/",seajs.use("seajs-css",function(){seajs.use(assetsUrl+"css/seajs-validate.css")}),clsIDCard.prototype.SetCardNo=function(a){this.ID15="",this.ID18="",this.Local="",a=a.replace(" ","");var b;if(18==a.length){if(pattern=/^\d{17}(\d|x|X)$/,null==pattern.exec(a))return;b=a.toUpperCase()}else{if(pattern=/^\d{15}$/,null==pattern.exec(a))return;b=a.substr(0,6)+"19"+a.substr(6,9),b+=this.GetVCode(b)}18!=a.length?this.Valid=!1:this.Valid=this.CheckValid(b)},clsIDCard.prototype.IsValid=function(){return this.Valid},clsIDCard.prototype.GetBirthDate=function(){var a="";return this.Valid&&(a=this.GetBirthYear()+"-"+this.GetBirthMonth()+"-"+this.GetBirthDay()),a},clsIDCard.prototype.GetBirthYear=function(){var a="";return this.Valid&&(a=this.ID18.substr(6,4)),a},clsIDCard.prototype.GetBirthMonth=function(){var a="";return this.Valid&&(a=this.ID18.substr(10,2)),"0"==a.charAt(0)&&(a=a.charAt(1)),a},clsIDCard.prototype.GetBirthDay=function(){var a="";return this.Valid&&(a=this.ID18.substr(12,2)),a},clsIDCard.prototype.GetSex=function(){var a="";return this.Valid&&(a=this.ID18.charAt(16)%2),a},clsIDCard.prototype.Get15=function(){var a="";return this.Valid&&(a=this.ID15),a},clsIDCard.prototype.Get18=function(){var a="";return this.Valid&&(a=this.ID18),a},clsIDCard.prototype.GetLocal=function(){var a="";return this.Valid&&(a=this.Local),a},clsIDCard.prototype.GetVCode=function(a){for(var b=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1),c=new Array("1","0","X","9","8","7","6","5","4","3","2"),d=0,e=0;e<a.length;e++)d+=a.charAt(e)*b[e];var f=d%11;return c[f]},clsIDCard.prototype.CheckValid=function(a){if(this.GetVCode(a.substr(0,17))!=a.charAt(17))return!1;if(!this.IsDate(a.substr(6,8)))return!1;var b={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};return null==b[parseInt(a.substr(0,2))]?!1:(this.ID18=a,this.ID15=a.substr(0,6)+a.substr(8,9),this.Local=b[parseInt(a.substr(0,2))],!0)},clsIDCard.prototype.IsDate=function(a){var b=a.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/);if(null==b)return!1;var c=new Date(b[1],b[2]-1,b[3]);return c.getFullYear()==b[1]&&c.getMonth()+1==b[2]&&c.getDate()==b[3]};var isHidden=function(a){var b=getComputedStyle(a);if("hidden"==a.type||"none"==b.display||"hidden"==b.visibility)return!0;var c=a.style.cssText;setStyleImportant(a,"height:10px");var d=a.getBoundingClientRect();return a.style.cssText=c,d.right-d.left==0&&d.bottom-d.top==0},isOverflow=function(node){for(var nP=node.parentNode,check=function(dir,other){var sign={left:"<",right:">",top:"<",bottom:">"};other=other||[];for(var i=0,l=dir.length;l>i;i++){var m=dir[i];if(eval("nR[m]"+sign[m]+"(other[i]||nPR[m])"))return{by:nP,dir:m}}};;){var cs=getComputedStyle(nP),nR=node.getBoundingClientRect(),nPR=nP.getBoundingClientRect();if("hidden"==cs.overflow||nP==document.body){var checkResult=check(["left","right","top","bottom"],nP==document.body?[0,document.documentElement.clientWidth,0]:null);if(checkResult)return checkResult;break}if("hidden"==cs.overflowX&&(checkResult=check(["left","right"])))return checkResult;if("hidden"==cs.overflowY&&(checkResult=check(["top","bottom"])))return checkResult;nP=nP.parentNode}return!1},setStyleImportant=function(a,b){for(var c=b.split(";"),d=0,e=c.length;e>d;d++)a.style.cssText+=";"+c[d]+" !important"},errorNum=0,iptType=["INPUT","TEXTAREA","SELECT"],getIptWrapper=function(a){var b,c=a.parentNode;return(b=a.getAttribute("vMyWrapper"))&&(b=document.getElementById(b))?b:-1!=c.className.indexOf("vic")||"true"==c.getAttribute("vIptWrapper")?c:a},getOffset=function(a,b){var c=a.getBoundingClientRect(),d=b.getBoundingClientRect();return{left:c.left-d.left,top:c.top-d.top}},createWrapper=function(a){var b=a.mySuperWrapper;return b||(b=document.createElement("mySuperWrapper"),a.mySuperWrapper=b,b.style.cssText="position:relative;float:left;"),a.insertBefore(b,a.firstChild),b},getTextRect=new function(){this.main=function(a,b){var c=a.value||a.placeholder;if(""!=c){var d=this.spanTmp;d||(d=document.createElement("validnode"),this.spanTmp=d),setStyleImportant(d,"font-size:"+b.fontSize+";font-family:"+b.fontFamily+";padding:0;visibility:hidden;white-space:nowrap;position:absolute;width:auto;height:auto;line-height:normal"),d.innerHTML=c,a.parentNode.appendChild(d);var e=d.getBoundingClientRect(),f=a.getBoundingClientRect();a.parentNode.removeChild(d);var g=e.bottom-e.top;return{h:g,w:e.right-e.left,t:(f.bottom-f.top-g)/2-toInt(b.paddingTop)}}return{h:0,w:0,t:0}}},toInt=function(a){var b=parseInt(a);return isNaN(b)&&(b=0),b},fixedTip=function(a,b){var c=a.getAttribute("vpopzindex");c&&setStyleImportant(b,"z-index:"+c);var d=function(c){if(!c){var e=getIptWrapper(a),f=isHidden(a),g=isHidden(e),h=!0;if(f&&g)return void console.log("The tip cannot be displayed on a hidden target");c=f||!g&&-1!=iptType.indexOf(e.tagName)?e:a}var i=createWrapper(c.parentNode);i.appendChild(b);var j=getComputedStyle(c),k=function(a){var c=a.parentNode.mySuperWrapper,d=getOffset(a,a.parentNode),e=b.getBoundingClientRect();if(bdw={l:d.left+toInt(j.paddingLeft),t:d.top-e.bottom+e.top-5+toInt(j.paddingTop)},"fixed"!=j.position&&(d=getOffset(c,c.parentNode),bdw={l:bdw.l-d.left,t:bdw.t-d.top}),bdw.bl=bdw.l,-1==iptType.indexOf(a.tagName))bdw.sl=0;else{var f=getTextRect.main(a,j),g=toInt(j.paddingLeft)+toInt(j.borderLeftWidth)+f.w;bdw={l:bdw.l+g-.5*(e.right-e.left),t:bdw.t+f.t,sl:g,bl:bdw.bl}}return bdw}(c),l=b.tipNodeSquare;setStyleImportant(l,"left: 0;right: 0;margin: auto"),setStyleImportant(b,"left:"+k.l+"px;top:"+k.t+"px");var m=isOverflow(b);m&&("left"==m.dir||"right"==m.dir?k.l!=k.bl?(setStyleImportant(b,"left:"+k.bl),isOverflow(b)&&(h?d(e):(console.log("0检测到错误提示被如下节点遮住,且无法被自动修复,请检查样式"),console.log(m.by)))):h?d(e):(console.log("1检测到错误提示被如下节点遮住,且无法被自动修复,请检查样式"),console.log(m.by)):h?d(e):(console.log("2检测到错误提示被如下节点遮住,且无法被自动修复,请检查样式"),console.log(m.by)))};seajs.use("seajs-css",function(){seajs.use(assetsUrl+"css/seajs-validate.css",function(){d()})})},createPop=function(a){var b=document.createElement("validnode");b.className=a,b.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+assetsUrl+"imgs/seajs-validate-pop.png',sizingMethod='scale')";var c=document.createElement("validnode");return c.className="vtip-pop-square",c.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+assetsUrl+"imgs/seajs-validate-pop-square.png',sizingMethod='scale')",b.tipNodeSquare=c,b},prototypes={showErrorTip:function(a,b){if(null==this.onIpt){a=a||this.getAttribute("errorTip");var c,d=this,e=getIptWrapper(d);if(errorNum++,"true"!=d.getAttribute("noBorder")&&"true"!=d.getAttribute("noErrorBorder")){var f=e.getBoundingClientRect(),g=f.right-f.left,h=f.bottom-f.top,i=e.style.cssText;setStyleImportant(e,"border:1px solid red"),f=e.getBoundingClientRect();var j=f.right-f.left,k=f.bottom-f.top;j==g&&k==h||setStyleImportant(e,"width:"+(g+3)+"px"),d.targetForErrorTip=e}d.tipTxt=a,"true"!=d.getAttribute("noErrorTip")&&(c=d.tip_pop_error,c||(c=createPop("vtip-pop-error"),d.tip_pop_error=c),c.innerHTML=a,c.appendChild(c.tipNodeSquare),fixedTip(d,c),d.afterShowErrorTip&&d.afterShowErrorTip());var l="checkbox"==d.type?"change":"input",m=function(){return d.onIpt=function(){if(c&&c.parentNode.removeChild(c),"true"!=d.getAttribute("noBorder")&&(e.style.cssText=i,d.styleAfterError)){for(var a in d.styleAfterError)d.styleAfterError.hasOwnProperty(a)&&(d.style[a]=d.styleAfterError[a]);d.styleAfterError=null}0==--errorNum,d.removeEventListener(l,d.onIpt),delete d.onIpt,delete d.tipTxt,d.afterClearErrorTip&&d.afterClearErrorTip()},d.onIpt};d.addEventListener(l,m()),null!=b&&1!=b||"false"==d.getAttribute("focusOnError")||setTimeout(function(){d.focus()},0)}},validMe:function(a){var b,c=this,d=c.value,e=function(a){var b=c.getAttribute("errorTip");return null!=b?b:a},f=function(){return b=c.tipTxt,null==b},g=function(){return c.validity&&c.validity.badInput&&(b=e("请输入合法字符")),null==b},h=function(){if(isNaN(d))b=e("该输入框仅接受数字");else{"false"==c.getAttribute("firstZero")&&"0"==d.substring(0,1)&&"0."!=d.substring(0,2)&&(b=e("首位不可为零!"));var a=c.getAttribute("maxNum");if(null!=a&&(-1!=a.indexOf("!")?(a=a.replace("!","")/1,d/1>=a&&(b=e("该输入框内容应小于"+a))):d/1>a&&(b=e("该输入框内容不能大于"+a))),null!=b)return!1;var f=c.getAttribute("minNum");null!=f&&null==b&&(-1!=f.indexOf("!")?(f=f.replace("!","")/1,f>=d/1&&(b=e("该输入框内容应大于"+f))):f>d/1&&(b=e("该输入框内容不能小于"+f)))}return null==b},i=function(){"true"==c.getAttribute("noSpace")&&(d=d.replace(/\s+/g,""));var a=c.getAttribute("isEmpty");return(a||"0"==c.getAttribute("minLength"))&&(0==d.length||"SELECT"==c.tagName)},j=function(){var a=c.getAttribute("maxLength"),f=c.getAttribute("minLength");if("SELECT"==c.tagName)-1!=d.replace(/\s+/g,"").indexOf("请选择")&&(b=e("尚未选择任何项"));else{var g=d.length;if("true"==c.getAttribute("isByte")&&(g=d.replace(/[^\x00-\xff]/g,"xx").length),0==g)b=e("该输入框内容不能为空");else if(null!=f&&f/1>g)b=e("该输入框内容不能少于"+f+"位");else if(null!=a)if("true"==c.getAttribute("isByte")){var h=c.value.replace(/[^\x00-\xff]/g,"xx").length;h>a/1&&(b=e("已超出"+(h-a)+"个字节"))}else c.length>a/1&&(b=e("已超出"+(c.length-a)+"个字"))}return null==b},k=function(){switch(c.getAttribute("validType")){case"num":case"float":var a=c.getAttribute("floatLength");h()&&null!=a&&-1!=d.indexOf(".")&&d.split(".")[1].length>a&&(b=e("该输入框的小数位不能超过"+a+"位"));break;case"bankCard":var f=!0;case"int":h()&&-1!=d.indexOf(".")?b=e(f?"请输入正确的银行卡号!":"该输入框仅接受整数!"):f&&!l(d)&&(b=e("请输入正确的银行卡号!"));break;case"phoneNum":var g=/^1\d{10}$/;g.test(d)||(b=e("请输入正确的手机号!"));break;case"idCard":var i=new clsIDCard(d);i.IsValid()||(b=e("请输入正确的身份证号!"))}return null==b},l=function(a){for(var b=!0,c=0,d=a.length;d>0;d--){var e=a.substring(d,d-1);(b=!b)&&(e=2*e);var f=e%10;c+=f+(e-f)/10}return c%10==0},m=!0;return i()||("checkbox"!=c.type&&"file"!=c.type&&(m=f()&&g()&&j()&&k()),m&&c.myValid&&(b=c.myValid(),m=m&&null==b)),null==a||a?m:{isok:m,tip:b}},setVal:function(a){this.value=a,this.onIpt&&this.onIpt()},setHTML:function(a){this.innerHTML=a,this.onIpt&&this.onIpt()},addIptEvt:function(a){this.IptEvt?this.IptEvt.push(a):this.IptEvt=[a]},removeIptEvt:function(a){this.IptEvt&&this.IptEvt.splice(this.IptEvt.indexOf(a),1)},setStyleAfterError:function(a){this.styleAfterError||(this.styleAfterError={});for(var b in a)a.hasOwnProperty(b)&&(this.styleAfterError[b]=a[b],this.style[b]=a[b])},myBlur:function(){this.ignoreOnce=!0,this.blur()}};for(var m in prototypes)if(prototypes.hasOwnProperty(m)){var fuc=prototypes[m];HTMLInputElement.prototype[m]=fuc,HTMLTextAreaElement.prototype[m]=fuc,HTMLSelectElement.prototype[m]=fuc}HTMLFormElement.prototype.validMe=function(){for(var a=!0,b=0;b<iptType.length;b++)for(var c=this.getElementsByTagName(iptType[b]),d=0;d<c.length;d++)if(c[d].getAttribute("forceValid")||!isHidden(c[d])){var e=c[d].validMe(!1);e.isok||(c[d].showErrorTip(e.tip,a),a=!1)}return a};var superBind=function(a,b){document.addEventListener(a,function(a){for(var c=a.srcElement||a.target,d=0;d<iptType.length;d++)if(c.tagName==iptType[d])return void(isHidden(c)||b(c))})},validFuc=function(){if(this.ignoreOnce)this.ignoreOnce=!1;else{var a=this.validMe(!1);a.isok||this.showErrorTip(a.tip)}this.removeEventListener("blur",validFuc)},tipNode,removeTip=function(){var a;tipNode&&(a=tipNode.parentNode)&&a.removeChild(tipNode),this.removeEventListener("blur",removeTip)},specialIptFuc=function(){if(null==this.onIpt){var a="",b=this.getAttribute("validType");"bankCard"==b?a=this.value.replace(/\D/g,"").replace(/....(?!$)/g,"$&-"):"phoneNum"==b&&(a=this.value.replace(/ /g,""),a=a.replace(/(^\+\d{2})(1\d{2})?(\d{4})?(\d{4})?|(^1\d{2})(\d{4})?(\d{4})?/,function(){var a=arguments,b="",c=5,d=8;for(a[1]&&(c=1,d=5),c;d>c&&a[c];c++)b+=a[c]+"-";return c==d&&(b=b.substring(0,b.length-1)),b})),""!=a?(tipNode||(tipNode=createPop("vtip-pop")),this.addEventListener("focus",specialIptFuc),tipNode.innerHTML=a,tipNode.appendChild(tipNode.tipNodeSquare),fixedTip(this,tipNode),this.focus(),this.addEventListener("blur",removeTip)):removeTip.call(this)}};superBind("input",function(a){specialIptFuc.call(a),a.addEventListener("blur",validFuc),a.IptEvt&&a.IptEvt.forEach(function(a){a()})}),exports.newInstance=function(){return exports}});
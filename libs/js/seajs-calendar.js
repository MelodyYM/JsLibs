/*! 作者:阿伟 */
/*! git:https://github.com/awei-yu/JsLibs.git */
/*! 推荐sealoader模块加载器:https://www.npmjs.com/package/sealoader */
/*! 最后修改于 2016-04-18 11:35:42 */
define(function(require,a,b){var c=b.uri;c=c.substring(0,c.lastIndexOf("/js/"))+"/";var utils=require("seajs-utils"),d=require("seajs-jquery"),e=function(a){var b=a.mySuperWrapper;return b||(b=document.createElement("mySuperWrapper"),a.mySuperWrapper=b,b.style.cssText="position:relative;float:left;"),a.insertBefore(b,a.firstChild),b},f=function(a,b){var c=a.getBoundingClientRect(),d=b.getBoundingClientRect();return{left:c.left-d.left,top:c.top-d.top}};a.bind=function(a,b){utils.use([[c+"css/calendar.css","calendar"]],function(){a.tagName&&(a=[a]);for(var c=0,g=a.length;g>c;c++){var h=a[c],i=e(h.parentNode),j=document.createElement("calendarNode");j.style.cssText="position:absolute;",i.appendChild(j);var k=window.getComputedStyle(h),l=function(a,b){var c=b.parentNode.mySuperWrapper,d=f(b,b.parentNode),e={l:d.left,t:d.top};return"fixed"==a.position?e:(d=f(c,c.parentNode),{l:e.l-d.left,t:e.t-d.top})},m=l(k,h);b=b||{},b.trigger=d(h);var n=b.onSelected;b.onSelected=function(a,b,c){h.onIpt&&h.onIpt(),n&&n.apply(null,arguments)},b.date=new Date(b.date||(b.selectedRang&&2==b.selectedRang.length?b.selectedRang[1]:new Date)),d(j).calendar(b),j.style.cssText+=";left:"+m.l+"px;top:"+(m.t+h.getBoundingClientRect().height)+"px;"}b.canEditYear!==!1&&d(".calendar-display").on("click",function(a){var c=a.srcElement||a.target,f=c.getElementsByTagName("span");if(f.length>0){a.stopPropagation();var g=c.yearIpt;if(g)g.style.display="block";else{var h=c.parentNode.parentNode.parentNode.parentNode.parentNode,i=e(c.parentNode),g=document.createElement("input");g.className="calendar-display",g.maxLength=4,g.style.cssText="position:absolute;outline:none;border:0;width:"+(c.getBoundingClientRect().width-f[0].getBoundingClientRect().width-13)+"px;",g.addEventListener("blur",function(){var a=new Date;a.setFullYear(this.value);var c=a.getTime();isNaN(c)||b.selectedRang&&!(c>=new Date(b.selectedRang[0]).getTime()&&c<=new Date(b.selectedRang[1]).getTime())||d(h).data("calendar").updateMonthView(this.value),g.style.display="none"}),i.appendChild(g),c.yearIpt=g}g.value=c.innerHTML.split("/")[0],setTimeout(function(){g.focus()},0)}})})}});
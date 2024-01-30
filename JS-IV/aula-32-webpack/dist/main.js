(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,r="millisecond",n="second",s="minute",i="hour",u="day",a="week",o="month",c="quarter",f="year",h="date",d="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,l=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],r=t%100;return"["+t+(e[(r-20)%10]||e[r]||e[0])+"]"}},v=function(t,e,r){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(r)+t},m={s:v,z:function(t){var e=-t.utcOffset(),r=Math.abs(e),n=Math.floor(r/60),s=r%60;return(e<=0?"+":"-")+v(n,2,"0")+":"+v(s,2,"0")},m:function t(e,r){if(e.date()<r.date())return-t(r,e);var n=12*(r.year()-e.year())+(r.month()-e.month()),s=e.clone().add(n,o),i=r-s<0,u=e.clone().add(n+(i?-1:1),o);return+(-(n+(r-s)/(i?s-u:u-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:f,w:a,d:u,D:h,h:i,m:s,s:n,ms:r,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",D={};D[y]=M;var g="$isDayjsObject",p=function(t){return t instanceof b||!(!t||!t[g])},S=function t(e,r,n){var s;if(!e)return y;if("string"==typeof e){var i=e.toLowerCase();D[i]&&(s=i),r&&(D[i]=r,s=i);var u=e.split("-");if(!s&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,s=a}return!n&&s&&(y=s),s||!n&&y},w=function(t,e){if(p(t))return t.clone();var r="object"==typeof e?e:{};return r.date=t,r.args=arguments,new b(r)},O=m;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var b=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[g]=!0}var v=M.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,r=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match($);if(n){var s=n[2]-1||0,i=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,i)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,i)}}return new Date(e)}(t),this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return O},v.isValid=function(){return!(this.$d.toString()===d)},v.isSame=function(t,e){var r=w(t);return this.startOf(e)<=r&&r<=this.endOf(e)},v.isAfter=function(t,e){return w(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<w(t)},v.$g=function(t,e,r){return O.u(t)?this[e]:this.set(r,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var r=this,c=!!O.u(e)||e,d=O.p(t),$=function(t,e){var n=O.w(r.$u?Date.UTC(r.$y,e,t):new Date(r.$y,e,t),r);return c?n:n.endOf(u)},l=function(t,e){return O.w(r.toDate()[t].apply(r.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),r)},M=this.$W,v=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(d){case f:return c?$(1,0):$(31,11);case o:return c?$(1,v):$(0,v+1);case a:var D=this.$locale().weekStart||0,g=(M<D?M+7:M)-D;return $(c?m-g:m+(6-g),v);case u:case h:return l(y+"Hours",0);case i:return l(y+"Minutes",1);case s:return l(y+"Seconds",2);case n:return l(y+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var a,c=O.p(t),d="set"+(this.$u?"UTC":""),$=(a={},a[u]=d+"Date",a[h]=d+"Date",a[o]=d+"Month",a[f]=d+"FullYear",a[i]=d+"Hours",a[s]=d+"Minutes",a[n]=d+"Seconds",a[r]=d+"Milliseconds",a)[c],l=c===u?this.$D+(e-this.$W):e;if(c===o||c===f){var M=this.clone().set(h,1);M.$d[$](l),M.init(),this.$d=M.set(h,Math.min(this.$D,M.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[O.p(t)]()},v.add=function(r,c){var h,d=this;r=Number(r);var $=O.p(c),l=function(t){var e=w(d);return O.w(e.date(e.date()+Math.round(t*r)),d)};if($===o)return this.set(o,this.$M+r);if($===f)return this.set(f,this.$y+r);if($===u)return l(1);if($===a)return l(7);var M=(h={},h[s]=t,h[i]=e,h[n]=1e3,h)[$]||1,v=this.$d.getTime()+r*M;return O.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,r=this.$locale();if(!this.isValid())return r.invalidDate||d;var n=t||"YYYY-MM-DDTHH:mm:ssZ",s=O.z(this),i=this.$H,u=this.$m,a=this.$M,o=r.weekdays,c=r.months,f=r.meridiem,h=function(t,r,s,i){return t&&(t[r]||t(e,n))||s[r].slice(0,i)},$=function(t){return O.s(i%12||12,t,"0")},M=f||function(t,e,r){var n=t<12?"AM":"PM";return r?n.toLowerCase():n};return n.replace(l,(function(t,n){return n||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return O.s(e.$y,4,"0");case"M":return a+1;case"MM":return O.s(a+1,2,"0");case"MMM":return h(r.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return O.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(r.weekdaysMin,e.$W,o,2);case"ddd":return h(r.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(i);case"HH":return O.s(i,2,"0");case"h":return $(1);case"hh":return $(2);case"a":return M(i,u,!0);case"A":return M(i,u,!1);case"m":return String(u);case"mm":return O.s(u,2,"0");case"s":return String(e.$s);case"ss":return O.s(e.$s,2,"0");case"SSS":return O.s(e.$ms,3,"0");case"Z":return s}return null}(t)||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(r,h,d){var $,l=this,M=O.p(h),v=w(r),m=(v.utcOffset()-this.utcOffset())*t,y=this-v,D=function(){return O.m(l,v)};switch(M){case f:$=D()/12;break;case o:$=D();break;case c:$=D()/3;break;case a:$=(y-m)/6048e5;break;case u:$=(y-m)/864e5;break;case i:$=y/e;break;case s:$=y/t;break;case n:$=y/1e3;break;default:$=y}return d?$:O.a($)},v.daysInMonth=function(){return this.endOf(o).$D},v.$locale=function(){return D[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var r=this.clone(),n=S(t,e,!0);return n&&(r.$L=n),r},v.clone=function(){return O.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},M}(),_=b.prototype;return w.prototype=_,[["$ms",r],["$s",n],["$m",s],["$H",i],["$W",u],["$M",o],["$y",f],["$D",h]].forEach((function(t){_[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,b,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[y],w.Ls=D,w.p={},w}()}},e={};function r(n){var s=e[n];if(void 0!==s)return s.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}(()=>{const t=r(484);alert(`Hoje é : ${t().format("DD/MM/YYYY")}`)})()})();
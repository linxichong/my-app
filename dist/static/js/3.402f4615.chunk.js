(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{557:function(e,t,n){},559:function(e,t,n){"use strict";n.r(t);n(287),n(67),n(53);var r=n(0),a=(n(557),function(e){return r.createElement("ul",null,e.novels&&e.novels.map(function(e,t){return r.createElement("li",{key:e.id},r.createElement("span",null,t),r.createElement("span",null,e.title),r.createElement("span",null,e.author),r.createElement("span",null,e.summary))}))}),l=n(133),u=n(40);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,l=void 0;try{for(var u,c=e[Symbol.iterator]();!(r=(u=c.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(o){a=!0,l=o}finally{try{r||null==c.return||c.return()}finally{if(a)throw l}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.default=Object(u.c)(function(e){return e.novel})(function(e){var t=c(r.useState(!1),2),n=t[0],u=t[1];r.useEffect(function(){var t=e.dispatch;return n||t(Object(l.a)()),function(){u(!0)}},[]);var o=function(){try{e.dispatch(Object(l.a)())}catch(t){console.log(t)}};return e.isLoading?r.createElement("div",null,"loading..."):e.data&&0==e.data.length?r.createElement("div",null,"No Data...",r.createElement("button",{onClick:o},"Refresh")):r.createElement(r.Fragment,null,r.createElement("button",{onClick:o},"Refresh"),r.createElement(a,{novels:e.data}))})}}]);
(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[22,41],{1170:function(e,t,n){"use strict";n.r(t);n(0);var a=n(575),c=n(502),r=n(3230),o=n(516),l=n(178),s=n(499),i=n(2),d=function(){return Object(i.jsx)(a.a,{menu:Object(i.jsxs)(l.a,{children:[Object(i.jsx)(l.a.Item,{children:Object(i.jsx)("span",{children:"Menu Item 1"})}),Object(i.jsx)(l.a.Item,{children:Object(i.jsx)("span",{children:"Menu Item 2"})}),Object(i.jsx)(l.a.Item,{children:Object(i.jsx)("span",{children:"Menu Item 3"})})]})})};t.default=function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"EllipsisDropdown"}),Object(i.jsxs)("div",{className:"mt-4",children:[Object(i.jsx)(c.default,{name:"Location",desc:"src/components/shared-components/EllipsisDropdown.js"}),Object(i.jsx)(c.default,{name:"Description",desc:"Dropdown menu with ellipsis icon"}),Object(i.jsx)("div",{className:"mt-4",children:Object(i.jsxs)(s.a,{title:"Example",children:[Object(i.jsx)(d,{}),Object(i.jsx)("div",{className:"mt-4",children:Object(i.jsx)(r.a,{className:"hl-code",language:"jsx",style:o.a,children:"import React from 'react'\nimport EllipsisDropdown from 'components/shared-components/EllipsisDropdown'\nimport { Menu } from 'antd'\n\nexport default const Demo = () =>  {\n\treturn (\n\t\t<EllipsisDropdown menu={\n\t\t\t<Menu>\n\t\t\t\t<Menu.Item>\n\t\t\t\t\t<span>Menu Item 1</span>\n\t\t\t\t</Menu.Item>\n\t\t\t\t<Menu.Item>\n\t\t\t\t\t<span>Menu Item 2</span>\n\t\t\t\t</Menu.Item>\n\t\t\t\t<Menu.Item>\n\t\t\t\t\t<span>Menu Item 3</span>\n\t\t\t\t</Menu.Item>\n\t\t\t</Menu>\n\t\t}/>\n\t}\n)"})})]})}),Object(i.jsx)("h4",{className:"mt-4",children:"Props"}),Object(i.jsx)("div",{className:"api-container border-0 p-0",children:Object(i.jsxs)("table",{children:[Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Property"}),Object(i.jsx)("th",{children:"Description"}),Object(i.jsx)("th",{children:"Type"}),Object(i.jsx)("th",{children:"Default"})]})}),Object(i.jsx)("tbody",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"menu"}),Object(i.jsx)("td",{children:"Dropdown menu"}),Object(i.jsxs)("td",{children:[Object(i.jsx)("a",{href:"https://ant.design/components/menu/",children:"Menu"})," | () => Menu"]}),Object(i.jsx)("td",{})]})})]})})]})]})}},499:function(e,t,n){"use strict";var a=n(4),c=n(3),r=n(0),o=n(6),l=n.n(o),s=n(38),i=n(49),d=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n},m=function(e){var t=e.prefixCls,n=e.className,o=e.hoverable,s=void 0===o||o,m=d(e,["prefixCls","className","hoverable"]);return r.createElement(i.a,null,(function(e){var o=(0,e.getPrefixCls)("card",t),i=l()("".concat(o,"-grid"),n,Object(a.a)({},"".concat(o,"-grid-hoverable"),s));return r.createElement("div",Object(c.a)({},m,{className:i}))}))},p=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n},b=function(e){return r.createElement(i.a,null,(function(t){var n=t.getPrefixCls,a=e.prefixCls,o=e.className,s=e.avatar,i=e.title,d=e.description,m=p(e,["prefixCls","className","avatar","title","description"]),b=n("card",a),u=l()("".concat(b,"-meta"),o),j=s?r.createElement("div",{className:"".concat(b,"-meta-avatar")},s):null,h=i?r.createElement("div",{className:"".concat(b,"-meta-title")},i):null,O=d?r.createElement("div",{className:"".concat(b,"-meta-description")},d):null,f=h||O?r.createElement("div",{className:"".concat(b,"-meta-detail")},h,O):null;return r.createElement("div",Object(c.a)({},m,{className:u}),j,f)}))},u=n(498),j=n(492),h=n(493),O=n(55),f=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n};var x=function(e){var t,n,o,d=r.useContext(i.b),p=d.getPrefixCls,b=d.direction,x=r.useContext(O.b),g=e.prefixCls,y=e.className,v=e.extra,E=e.headStyle,C=void 0===E?{}:E,w=e.bodyStyle,N=void 0===w?{}:w,F=e.title,M=e.loading,S=e.bordered,I=void 0===S||S,k=e.size,D=e.type,P=e.cover,A=e.actions,z=e.tabList,T=e.children,B=e.activeTabKey,H=e.defaultActiveTabKey,K=e.tabBarExtraContent,R=e.hoverable,W=e.tabProps,L=void 0===W?{}:W,J=f(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),G=p("card",g),q=0===N.padding||"0px"===N.padding?{padding:24}:void 0,Q=r.createElement("div",{className:"".concat(G,"-loading-block")}),U=r.createElement("div",{className:"".concat(G,"-loading-content"),style:q},r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:22},Q)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:8},Q),r.createElement(h.a,{span:15},Q)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:6},Q),r.createElement(h.a,{span:18},Q)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:13},Q),r.createElement(h.a,{span:9},Q)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:4},Q),r.createElement(h.a,{span:3},Q),r.createElement(h.a,{span:16},Q))),V=void 0!==B,X=Object(c.a)(Object(c.a)({},L),(t={},Object(a.a)(t,V?"activeKey":"defaultActiveKey",V?B:H),Object(a.a)(t,"tabBarExtraContent",K),t)),Y=z&&z.length?r.createElement(u.a,Object(c.a)({size:"large"},X,{className:"".concat(G,"-head-tabs"),onChange:function(t){var n;null===(n=e.onTabChange)||void 0===n||n.call(e,t)}}),z.map((function(e){return r.createElement(u.a.TabPane,{tab:e.tab,disabled:e.disabled,key:e.key})}))):null;(F||v||Y)&&(o=r.createElement("div",{className:"".concat(G,"-head"),style:C},r.createElement("div",{className:"".concat(G,"-head-wrapper")},F&&r.createElement("div",{className:"".concat(G,"-head-title")},F),v&&r.createElement("div",{className:"".concat(G,"-extra")},v)),Y));var Z=P?r.createElement("div",{className:"".concat(G,"-cover")},P):null,$=r.createElement("div",{className:"".concat(G,"-body"),style:N},M?U:T),_=A&&A.length?r.createElement("ul",{className:"".concat(G,"-actions")},function(e){return e.map((function(t,n){return r.createElement("li",{style:{width:"".concat(100/e.length,"%")},key:"action-".concat(n)},r.createElement("span",null,t))}))}(A)):null,ee=Object(s.a)(J,["onTabChange"]),te=k||x,ne=l()(G,(n={},Object(a.a)(n,"".concat(G,"-loading"),M),Object(a.a)(n,"".concat(G,"-bordered"),I),Object(a.a)(n,"".concat(G,"-hoverable"),R),Object(a.a)(n,"".concat(G,"-contain-grid"),function(){var t;return r.Children.forEach(e.children,(function(e){e&&e.type&&e.type===m&&(t=!0)})),t}()),Object(a.a)(n,"".concat(G,"-contain-tabs"),z&&z.length),Object(a.a)(n,"".concat(G,"-").concat(te),te),Object(a.a)(n,"".concat(G,"-type-").concat(D),!!D),Object(a.a)(n,"".concat(G,"-rtl"),"rtl"===b),n),y);return r.createElement("div",Object(c.a)({},ee,{className:ne}),o,Z,$,_)};x.Grid=m,x.Meta=b;t.a=x},502:function(e,t,n){"use strict";n.r(t);n(0);var a=n(2);t.default=function(e){var t=e.name,n=e.desc;return Object(a.jsxs)("div",{className:"mb-3",children:[Object(a.jsxs)("span",{className:"font-weight-bold text-dark",children:[t,":"]}),Object(a.jsxs)("span",{className:"text-gray-light",children:[" ",n]})]})}},516:function(e,t,n){"use strict";t.a={'code[class*="language-"]':{color:"#c5c8c6",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#c5c8c6",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em",background:"#1d1f21"},':not(pre) > code[class*="language-"]':{background:"#1d1f21",padding:".1em",borderRadius:".3em"},comment:{color:"#7C7C7C"},prolog:{color:"#7C7C7C"},doctype:{color:"#7C7C7C"},cdata:{color:"#7C7C7C"},punctuation:{color:"#c5c8c6"},".namespace":{Opacity:".7"},property:{color:"#96CBFE"},keyword:{color:"#96CBFE"},tag:{color:"#96CBFE"},"class-name":{color:"#FFFFB6",textDecoration:"underline"},boolean:{color:"#99CC99"},constant:{color:"#99CC99"},symbol:{color:"#f92672"},deleted:{color:"#f92672"},number:{color:"#FF73FD"},selector:{color:"#A8FF60"},"attr-name":{color:"#A8FF60"},string:{color:"#A8FF60"},char:{color:"#A8FF60"},builtin:{color:"#A8FF60"},inserted:{color:"#A8FF60"},variable:{color:"#C6C5FE"},operator:{color:"#EDEDED"},entity:{color:"#FFFFB6",cursor:"help"},url:{color:"#96CBFE"},".language-css .token.string":{color:"#87C38A"},".style .token.string":{color:"#87C38A"},atrule:{color:"#F9EE98"},"attr-value":{color:"#F9EE98"},function:{color:"#DAD085"},regex:{color:"#E9C062"},important:{color:"#fd971f",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}},575:function(e,t,n){"use strict";n(0);var a=n(453),c=n(178),r=n(243),o=n(2),l=function(e){return Object(o.jsx)(a.a,{overlay:e.menu,placement:e.placement,trigger:["click"],children:Object(o.jsx)("div",{className:"ellipsis-dropdown",children:Object(o.jsx)(r.a,{})})})};l.defaultProps={trigger:"click",placement:"bottomRight",menu:Object(o.jsx)(c.a,{})},t.a=l}}]);
//# sourceMappingURL=22.75d05c4e.chunk.js.map
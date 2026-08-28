/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 70526:
/***/ (function() {

(function(){/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 Google as part of the polymer project is also subject to an additional IP
 rights grant found at http://polymer.github.io/PATENTS.txt
*/'use strict';var n=window.Document.prototype.createElement,p=window.Document.prototype.createElementNS,aa=window.Document.prototype.importNode,ba=window.Document.prototype.prepend,ca=window.Document.prototype.append,da=window.DocumentFragment.prototype.prepend,ea=window.DocumentFragment.prototype.append,q=window.Node.prototype.cloneNode,r=window.Node.prototype.appendChild,t=window.Node.prototype.insertBefore,u=window.Node.prototype.removeChild,v=window.Node.prototype.replaceChild,w=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),y=window.Element.prototype.attachShadow,z=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),A=window.Element.prototype.getAttribute,B=window.Element.prototype.setAttribute,C=window.Element.prototype.removeAttribute,D=window.Element.prototype.toggleAttribute,E=window.Element.prototype.getAttributeNS,F=window.Element.prototype.setAttributeNS,G=window.Element.prototype.removeAttributeNS,H=window.Element.prototype.insertAdjacentElement,fa=window.Element.prototype.insertAdjacentHTML,ha=window.Element.prototype.prepend,ia=window.Element.prototype.append,ja=window.Element.prototype.before,ka=window.Element.prototype.after,la=window.Element.prototype.replaceWith,ma=window.Element.prototype.remove,na=window.HTMLElement,I=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),oa=window.HTMLElement.prototype.insertAdjacentElement,pa=window.HTMLElement.prototype.insertAdjacentHTML;var qa=new Set();"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(a){return qa.add(a);});function ra(a){var b=qa.has(a);a=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);return!b&&a;}var sa=document.contains?document.contains.bind(document):document.documentElement.contains.bind(document.documentElement);function J(a){var b=a.isConnected;if(void 0!==b)return b;if(sa(a))return!0;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?a.host:void 0);return!(!a||!(a.__CE_isImportDocument||a instanceof Document));}function K(a){var b=a.children;if(b)return Array.prototype.slice.call(b);b=[];for(a=a.firstChild;a;a=a.nextSibling)a.nodeType===Node.ELEMENT_NODE&&b.push(a);return b;}function L(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null;}function M(a,b,d){for(var f=a;f;){if(f.nodeType===Node.ELEMENT_NODE){var c=f;b(c);var e=c.localName;if("link"===e&&"import"===c.getAttribute("rel")){f=c.import;void 0===d&&(d=new Set());if(f instanceof Node&&!d.has(f))for(d.add(f),f=f.firstChild;f;f=f.nextSibling)M(f,b,d);f=L(a,c);continue;}else if("template"===e){f=L(a,c);continue;}if(c=c.__CE_shadowRoot)for(c=c.firstChild;c;c=c.nextSibling)M(c,b,d);}f=f.firstChild?f.firstChild:L(a,f);}};function N(){var a=!(null===O||void 0===O||!O.noDocumentConstructionObserver),b=!(null===O||void 0===O||!O.shadyDomFastWalk);this.m=[];this.g=[];this.j=!1;this.shadyDomFastWalk=b;this.I=!a;}function P(a,b,d,f){var c=window.ShadyDOM;if(a.shadyDomFastWalk&&c&&c.inUse){if(b.nodeType===Node.ELEMENT_NODE&&d(b),b.querySelectorAll)for(a=c.nativeMethods.querySelectorAll.call(b,"*"),b=0;b<a.length;b++)d(a[b]);}else M(b,d,f);}function ta(a,b){a.j=!0;a.m.push(b);}function ua(a,b){a.j=!0;a.g.push(b);}function Q(a,b){a.j&&P(a,b,function(d){return R(a,d);});}function R(a,b){if(a.j&&!b.__CE_patched){b.__CE_patched=!0;for(var d=0;d<a.m.length;d++)a.m[d](b);for(d=0;d<a.g.length;d++)a.g[d](b);}}function S(a,b){var d=[];P(a,b,function(c){return d.push(c);});for(b=0;b<d.length;b++){var f=d[b];1===f.__CE_state?a.connectedCallback(f):T(a,f);}}function U(a,b){var d=[];P(a,b,function(c){return d.push(c);});for(b=0;b<d.length;b++){var f=d[b];1===f.__CE_state&&a.disconnectedCallback(f);}}function V(a,b,d){d=void 0===d?{}:d;var f=d.J,c=d.upgrade||function(g){return T(a,g);},e=[];P(a,b,function(g){a.j&&R(a,g);if("link"===g.localName&&"import"===g.getAttribute("rel")){var h=g.import;h instanceof Node&&(h.__CE_isImportDocument=!0,h.__CE_registry=document.__CE_registry);h&&"complete"===h.readyState?h.__CE_documentLoadHandled=!0:g.addEventListener("load",function(){var k=g.import;if(!k.__CE_documentLoadHandled){k.__CE_documentLoadHandled=!0;var l=new Set();f&&(f.forEach(function(m){return l.add(m);}),l.delete(k));V(a,k,{J:l,upgrade:c});}});}else e.push(g);},f);for(b=0;b<e.length;b++)c(e[b]);}function T(a,b){try{var d=b.ownerDocument,f=d.__CE_registry;var c=f&&(d.defaultView||d.__CE_isImportDocument)?W(f,b.localName):void 0;if(c&&void 0===b.__CE_state){c.constructionStack.push(b);try{try{if(new c.constructorFunction()!==b)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{c.constructionStack.pop();}}catch(k){throw b.__CE_state=2,k;}b.__CE_state=1;b.__CE_definition=c;if(c.attributeChangedCallback&&b.hasAttributes()){var e=c.observedAttributes;for(c=0;c<e.length;c++){var g=e[c],h=b.getAttribute(g);null!==h&&a.attributeChangedCallback(b,g,null,h,null);}}J(b)&&a.connectedCallback(b);}}catch(k){X(k);}}N.prototype.connectedCallback=function(a){var b=a.__CE_definition;if(b.connectedCallback)try{b.connectedCallback.call(a);}catch(d){X(d);}};N.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;if(b.disconnectedCallback)try{b.disconnectedCallback.call(a);}catch(d){X(d);}};N.prototype.attributeChangedCallback=function(a,b,d,f,c){var e=a.__CE_definition;if(e.attributeChangedCallback&&-1<e.observedAttributes.indexOf(b))try{e.attributeChangedCallback.call(a,b,d,f,c);}catch(g){X(g);}};function va(a,b,d,f){var c=b.__CE_registry;if(c&&(null===f||"http://www.w3.org/1999/xhtml"===f)&&(c=W(c,d)))try{var e=new c.constructorFunction();if(void 0===e.__CE_state||void 0===e.__CE_definition)throw Error("Failed to construct '"+d+"': The returned value was not constructed with the HTMLElement constructor.");if("http://www.w3.org/1999/xhtml"!==e.namespaceURI)throw Error("Failed to construct '"+d+"': The constructed element's namespace must be the HTML namespace.");if(e.hasAttributes())throw Error("Failed to construct '"+d+"': The constructed element must not have any attributes.");if(null!==e.firstChild)throw Error("Failed to construct '"+d+"': The constructed element must not have any children.");if(null!==e.parentNode)throw Error("Failed to construct '"+d+"': The constructed element must not have a parent node.");if(e.ownerDocument!==b)throw Error("Failed to construct '"+d+"': The constructed element's owner document is incorrect.");if(e.localName!==d)throw Error("Failed to construct '"+d+"': The constructed element's local name is incorrect.");return e;}catch(g){return X(g),b=null===f?n.call(b,d):p.call(b,f,d),Object.setPrototypeOf(b,HTMLUnknownElement.prototype),b.__CE_state=2,b.__CE_definition=void 0,R(a,b),b;}b=null===f?n.call(b,d):p.call(b,f,d);R(a,b);return b;}function X(a){var b="",d="",f=0,c=0;a instanceof Error?(b=a.message,d=a.sourceURL||a.fileName||"",f=a.line||a.lineNumber||0,c=a.column||a.columnNumber||0):b="Uncaught "+String(a);var e=void 0;void 0===ErrorEvent.prototype.initErrorEvent?e=new ErrorEvent("error",{cancelable:!0,message:b,filename:d,lineno:f,colno:c,error:a}):(e=document.createEvent("ErrorEvent"),e.initErrorEvent("error",!1,!0,b,d,f),e.preventDefault=function(){Object.defineProperty(this,"defaultPrevented",{configurable:!0,get:function(){return!0;}});});void 0===e.error&&Object.defineProperty(e,"error",{configurable:!0,enumerable:!0,get:function(){return a;}});window.dispatchEvent(e);e.defaultPrevented||console.error(a);};function wa(){var a=this;this.g=void 0;this.F=new Promise(function(b){a.l=b;});}wa.prototype.resolve=function(a){if(this.g)throw Error("Already resolved.");this.g=a;this.l(a);};function xa(a){var b=document;this.l=void 0;this.h=a;this.g=b;V(this.h,this.g);"loading"===this.g.readyState&&(this.l=new MutationObserver(this.G.bind(this)),this.l.observe(this.g,{childList:!0,subtree:!0}));}function ya(a){a.l&&a.l.disconnect();}xa.prototype.G=function(a){var b=this.g.readyState;"interactive"!==b&&"complete"!==b||ya(this);for(b=0;b<a.length;b++)for(var d=a[b].addedNodes,f=0;f<d.length;f++)V(this.h,d[f]);};function Y(a){this.s=new Map();this.u=new Map();this.C=new Map();this.A=!1;this.B=new Map();this.o=function(b){return b();};this.i=!1;this.v=[];this.h=a;this.D=a.I?new xa(a):void 0;}Y.prototype.H=function(a,b){var d=this;if(!(b instanceof Function))throw new TypeError("Custom element constructor getters must be functions.");za(this,a);this.s.set(a,b);this.v.push(a);this.i||(this.i=!0,this.o(function(){return Aa(d);}));};Y.prototype.define=function(a,b){var d=this;if(!(b instanceof Function))throw new TypeError("Custom element constructors must be functions.");za(this,a);Ba(this,a,b);this.v.push(a);this.i||(this.i=!0,this.o(function(){return Aa(d);}));};function za(a,b){if(!ra(b))throw new SyntaxError("The element name '"+b+"' is not valid.");if(W(a,b))throw Error("A custom element with name '"+(b+"' has already been defined."));if(a.A)throw Error("A custom element is already being defined.");}function Ba(a,b,d){a.A=!0;var f;try{var c=d.prototype;if(!(c instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var e=function(m){var x=c[m];if(void 0!==x&&!(x instanceof Function))throw Error("The '"+m+"' callback must be a function.");return x;};var g=e("connectedCallback");var h=e("disconnectedCallback");var k=e("adoptedCallback");var l=(f=e("attributeChangedCallback"))&&d.observedAttributes||[];}catch(m){throw m;}finally{a.A=!1;}d={localName:b,constructorFunction:d,connectedCallback:g,disconnectedCallback:h,adoptedCallback:k,attributeChangedCallback:f,observedAttributes:l,constructionStack:[]};a.u.set(b,d);a.C.set(d.constructorFunction,d);return d;}Y.prototype.upgrade=function(a){V(this.h,a);};function Aa(a){if(!1!==a.i){a.i=!1;for(var b=[],d=a.v,f=new Map(),c=0;c<d.length;c++)f.set(d[c],[]);V(a.h,document,{upgrade:function(k){if(void 0===k.__CE_state){var l=k.localName,m=f.get(l);m?m.push(k):a.u.has(l)&&b.push(k);}}});for(c=0;c<b.length;c++)T(a.h,b[c]);for(c=0;c<d.length;c++){for(var e=d[c],g=f.get(e),h=0;h<g.length;h++)T(a.h,g[h]);(e=a.B.get(e))&&e.resolve(void 0);}d.length=0;}}Y.prototype.get=function(a){if(a=W(this,a))return a.constructorFunction;};Y.prototype.whenDefined=function(a){if(!ra(a))return Promise.reject(new SyntaxError("'"+a+"' is not a valid custom element name."));var b=this.B.get(a);if(b)return b.F;b=new wa();this.B.set(a,b);var d=this.u.has(a)||this.s.has(a);a=-1===this.v.indexOf(a);d&&a&&b.resolve(void 0);return b.F;};Y.prototype.polyfillWrapFlushCallback=function(a){this.D&&ya(this.D);var b=this.o;this.o=function(d){return a(function(){return b(d);});};};function W(a,b){var d=a.u.get(b);if(d)return d;if(d=a.s.get(b)){a.s.delete(b);try{return Ba(a,b,d());}catch(f){X(f);}}}Y.prototype.define=Y.prototype.define;Y.prototype.upgrade=Y.prototype.upgrade;Y.prototype.get=Y.prototype.get;Y.prototype.whenDefined=Y.prototype.whenDefined;Y.prototype.polyfillDefineLazy=Y.prototype.H;Y.prototype.polyfillWrapFlushCallback=Y.prototype.polyfillWrapFlushCallback;function Z(a,b,d){function f(c){return function(e){for(var g=[],h=0;h<arguments.length;++h)g[h]=arguments[h];h=[];for(var k=[],l=0;l<g.length;l++){var m=g[l];m instanceof Element&&J(m)&&k.push(m);if(m instanceof DocumentFragment)for(m=m.firstChild;m;m=m.nextSibling)h.push(m);else h.push(m);}c.apply(this,g);for(g=0;g<k.length;g++)U(a,k[g]);if(J(this))for(g=0;g<h.length;g++)k=h[g],k instanceof Element&&S(a,k);};}void 0!==d.prepend&&(b.prepend=f(d.prepend));void 0!==d.append&&(b.append=f(d.append));};function Ca(a){Document.prototype.createElement=function(b){return va(a,this,b,null);};Document.prototype.importNode=function(b,d){b=aa.call(this,b,!!d);this.__CE_registry?V(a,b):Q(a,b);return b;};Document.prototype.createElementNS=function(b,d){return va(a,this,d,b);};Z(a,Document.prototype,{prepend:ba,append:ca});};function Da(a){function b(f){return function(c){for(var e=[],g=0;g<arguments.length;++g)e[g]=arguments[g];g=[];for(var h=[],k=0;k<e.length;k++){var l=e[k];l instanceof Element&&J(l)&&h.push(l);if(l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)g.push(l);else g.push(l);}f.apply(this,e);for(e=0;e<h.length;e++)U(a,h[e]);if(J(this))for(e=0;e<g.length;e++)h=g[e],h instanceof Element&&S(a,h);};}var d=Element.prototype;void 0!==ja&&(d.before=b(ja));void 0!==ka&&(d.after=b(ka));void 0!==la&&(d.replaceWith=function(f){for(var c=[],e=0;e<arguments.length;++e)c[e]=arguments[e];e=[];for(var g=[],h=0;h<c.length;h++){var k=c[h];k instanceof Element&&J(k)&&g.push(k);if(k instanceof DocumentFragment)for(k=k.firstChild;k;k=k.nextSibling)e.push(k);else e.push(k);}h=J(this);la.apply(this,c);for(c=0;c<g.length;c++)U(a,g[c]);if(h)for(U(a,this),c=0;c<e.length;c++)g=e[c],g instanceof Element&&S(a,g);});void 0!==ma&&(d.remove=function(){var f=J(this);ma.call(this);f&&U(a,this);});};function Ea(a){function b(c,e){Object.defineProperty(c,"innerHTML",{enumerable:e.enumerable,configurable:!0,get:e.get,set:function(g){var h=this,k=void 0;J(this)&&(k=[],P(a,this,function(x){x!==h&&k.push(x);}));e.set.call(this,g);if(k)for(var l=0;l<k.length;l++){var m=k[l];1===m.__CE_state&&a.disconnectedCallback(m);}this.ownerDocument.__CE_registry?V(a,this):Q(a,this);return g;}});}function d(c,e){c.insertAdjacentElement=function(g,h){var k=J(h);g=e.call(this,g,h);k&&U(a,h);J(g)&&S(a,h);return g;};}function f(c,e){function g(h,k){for(var l=[];h!==k;h=h.nextSibling)l.push(h);for(k=0;k<l.length;k++)V(a,l[k]);}c.insertAdjacentHTML=function(h,k){h=h.toLowerCase();if("beforebegin"===h){var l=this.previousSibling;e.call(this,h,k);g(l||this.parentNode.firstChild,this);}else if("afterbegin"===h)l=this.firstChild,e.call(this,h,k),g(this.firstChild,l);else if("beforeend"===h)l=this.lastChild,e.call(this,h,k),g(l||this.firstChild,null);else if("afterend"===h)l=this.nextSibling,e.call(this,h,k),g(this.nextSibling,l);else throw new SyntaxError("The value provided ("+String(h)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");};}y&&(Element.prototype.attachShadow=function(c){c=y.call(this,c);if(a.j&&!c.__CE_patched){c.__CE_patched=!0;for(var e=0;e<a.m.length;e++)a.m[e](c);}return this.__CE_shadowRoot=c;});z&&z.get?b(Element.prototype,z):I&&I.get?b(HTMLElement.prototype,I):ua(a,function(c){b(c,{enumerable:!0,configurable:!0,get:function(){return q.call(this,!0).innerHTML;},set:function(e){var g="template"===this.localName,h=g?this.content:this,k=p.call(document,this.namespaceURI,this.localName);for(k.innerHTML=e;0<h.childNodes.length;)u.call(h,h.childNodes[0]);for(e=g?k.content:k;0<e.childNodes.length;)r.call(h,e.childNodes[0]);}});});Element.prototype.setAttribute=function(c,e){if(1!==this.__CE_state)return B.call(this,c,e);var g=A.call(this,c);B.call(this,c,e);e=A.call(this,c);a.attributeChangedCallback(this,c,g,e,null);};Element.prototype.setAttributeNS=function(c,e,g){if(1!==this.__CE_state)return F.call(this,c,e,g);var h=E.call(this,c,e);F.call(this,c,e,g);g=E.call(this,c,e);a.attributeChangedCallback(this,e,h,g,c);};Element.prototype.removeAttribute=function(c){if(1!==this.__CE_state)return C.call(this,c);var e=A.call(this,c);C.call(this,c);null!==e&&a.attributeChangedCallback(this,c,e,null,null);};D&&(Element.prototype.toggleAttribute=function(c,e){if(1!==this.__CE_state)return D.call(this,c,e);var g=A.call(this,c),h=null!==g;e=D.call(this,c,e);h!==e&&a.attributeChangedCallback(this,c,g,e?"":null,null);return e;});Element.prototype.removeAttributeNS=function(c,e){if(1!==this.__CE_state)return G.call(this,c,e);var g=E.call(this,c,e);G.call(this,c,e);var h=E.call(this,c,e);g!==h&&a.attributeChangedCallback(this,e,g,h,c);};oa?d(HTMLElement.prototype,oa):H&&d(Element.prototype,H);pa?f(HTMLElement.prototype,pa):fa&&f(Element.prototype,fa);Z(a,Element.prototype,{prepend:ha,append:ia});Da(a);};var Fa={};function Ga(a){function b(){var d=this.constructor;var f=document.__CE_registry.C.get(d);if(!f)throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var c=f.constructionStack;if(0===c.length)return c=n.call(document,f.localName),Object.setPrototypeOf(c,d.prototype),c.__CE_state=1,c.__CE_definition=f,R(a,c),c;var e=c.length-1,g=c[e];if(g===Fa)throw Error("Failed to construct '"+f.localName+"': This element was already constructed.");c[e]=Fa;Object.setPrototypeOf(g,d.prototype);R(a,g);return g;}b.prototype=na.prototype;Object.defineProperty(HTMLElement.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:b});window.HTMLElement=b;};function Ha(a){function b(d,f){Object.defineProperty(d,"textContent",{enumerable:f.enumerable,configurable:!0,get:f.get,set:function(c){if(this.nodeType===Node.TEXT_NODE)f.set.call(this,c);else{var e=void 0;if(this.firstChild){var g=this.childNodes,h=g.length;if(0<h&&J(this)){e=Array(h);for(var k=0;k<h;k++)e[k]=g[k];}}f.set.call(this,c);if(e)for(c=0;c<e.length;c++)U(a,e[c]);}}});}Node.prototype.insertBefore=function(d,f){if(d instanceof DocumentFragment){var c=K(d);d=t.call(this,d,f);if(J(this))for(f=0;f<c.length;f++)S(a,c[f]);return d;}c=d instanceof Element&&J(d);f=t.call(this,d,f);c&&U(a,d);J(this)&&S(a,d);return f;};Node.prototype.appendChild=function(d){if(d instanceof DocumentFragment){var f=K(d);d=r.call(this,d);if(J(this))for(var c=0;c<f.length;c++)S(a,f[c]);return d;}f=d instanceof Element&&J(d);c=r.call(this,d);f&&U(a,d);J(this)&&S(a,d);return c;};Node.prototype.cloneNode=function(d){d=q.call(this,!!d);this.ownerDocument.__CE_registry?V(a,d):Q(a,d);return d;};Node.prototype.removeChild=function(d){var f=d instanceof Element&&J(d),c=u.call(this,d);f&&U(a,d);return c;};Node.prototype.replaceChild=function(d,f){if(d instanceof DocumentFragment){var c=K(d);d=v.call(this,d,f);if(J(this))for(U(a,f),f=0;f<c.length;f++)S(a,c[f]);return d;}c=d instanceof Element&&J(d);var e=v.call(this,d,f),g=J(this);g&&U(a,f);c&&U(a,d);g&&S(a,d);return e;};w&&w.get?b(Node.prototype,w):ta(a,function(d){b(d,{enumerable:!0,configurable:!0,get:function(){for(var f=[],c=this.firstChild;c;c=c.nextSibling)c.nodeType!==Node.COMMENT_NODE&&f.push(c.textContent);return f.join("");},set:function(f){for(;this.firstChild;)u.call(this,this.firstChild);null!=f&&""!==f&&r.call(this,document.createTextNode(f));}});});};var O=window.customElements;function Ia(){var a=new N();Ga(a);Ca(a);Z(a,DocumentFragment.prototype,{prepend:da,append:ea});Ha(a);Ea(a);window.CustomElementRegistry=Y;a=new Y(a);document.__CE_registry=a;Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:a});}O&&!O.forcePolyfill&&"function"==typeof O.define&&"function"==typeof O.get||Ia();window.__CE_installPolyfill=Ia;}).call(self);

/***/ }),

/***/ 98869:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/((e,t)=>{ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0;})(this,function r(){var n="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n?n:{};var d,s=!n.document&&!!n.postMessage,a=n.IS_PAPA_WORKER||!1,o={},h=0,v={};function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=b(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new i(t),(this._handle.streamer=this)._config=t;}.call(this,e),this.parseChunk=function(t,e){var i=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<i){let e=this._config.newline;e||(r=this._config.quoteChar||'"',e=this._handle.guessLineEndings(t,r)),t=[...t.split(e).slice(i)].join(e);}this.isFirstChunk&&U(this._config.beforeFirstChunk)&&void 0!==(r=this._config.beforeFirstChunk(t))&&(t=r),this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+t,r=(this._partialLine="",this._handle.parse(i,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){t=r.meta.cursor,i=(this._finished||(this._partialLine=i.substring(t-this._baseIndex),this._baseIndex=t),r&&r.data&&(this._rowCount+=r.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview);if(a)n.postMessage({results:r,workerId:v.WORKER_ID,finished:i});else if(U(this._config.chunk)&&!e){if(this._config.chunk(r,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=r=void 0;}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(r.data),this._completeResults.errors=this._completeResults.errors.concat(r.errors),this._completeResults.meta=r.meta),this._completed||!i||!U(this._config.complete)||r&&r.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),i||r&&r.meta.paused||this._nextChunk(),r;}this._halted=!0;},this._sendError=function(e){U(this._config.error)?this._config.error(e):a&&this._config.error&&n.postMessage({workerId:v.WORKER_ID,error:e,finished:!1});};}function f(e){var r;(e=e||{}).chunkSize||(e.chunkSize=v.RemoteChunkSize),u.call(this,e),this._nextChunk=s?function(){this._readChunk(),this._chunkLoaded();}:function(){this._readChunk();},this.stream=function(e){this._input=e,this._nextChunk();},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(r=new XMLHttpRequest(),this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),s||(r.onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)),r.open(this._config.downloadRequestBody?"POST":"GET",this._input,!s),this._config.downloadRequestHeaders){var e,t=this._config.downloadRequestHeaders;for(e in t)r.setRequestHeader(e,t[e]);}var i;this._config.chunkSize&&(i=this._start+this._config.chunkSize-1,r.setRequestHeader("Range","bytes="+this._start+"-"+i));try{r.send(this._config.downloadRequestBody);}catch(e){this._chunkError(e.message);}s&&0===r.status&&this._chunkError();}},this._chunkLoaded=function(){4===r.readyState&&(r.status<200||400<=r.status?this._chunkError():(this._start+=this._config.chunkSize||r.responseText.length,this._finished=!this._config.chunkSize||this._start>=(e=>null!==(e=e.getResponseHeader("Content-Range"))?parseInt(e.substring(e.lastIndexOf("/")+1)):-1)(r),this.parseChunk(r.responseText)));},this._chunkError=function(e){e=r.statusText||e;this._sendError(new Error(e));};}function l(e){(e=e||{}).chunkSize||(e.chunkSize=v.LocalChunkSize),u.call(this,e);var i,r,n="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,n?((i=new FileReader()).onload=y(this._chunkLoaded,this),i.onerror=y(this._chunkError,this)):i=new FileReaderSync(),this._nextChunk();},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk();},this._readChunk=function(){var e=this._input,t=(this._config.chunkSize&&(t=Math.min(this._start+this._config.chunkSize,this._input.size),e=r.call(e,this._start,t)),i.readAsText(e,this._config.encoding));n||this._chunkLoaded({target:{result:t}});},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result);},this._chunkError=function(){this._sendError(i.error);};}function c(e){var i;u.call(this,e=e||{}),this.stream=function(e){return i=e,this._nextChunk();},this._nextChunk=function(){var e,t;if(!this._finished)return e=this._config.chunkSize,i=e?(t=i.substring(0,e),i.substring(e)):(t=i,""),this._finished=!i,this.parseChunk(t);};}function p(e){u.call(this,e=e||{});var t=[],i=!0,r=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause();},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume();},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError);},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0);},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0;},this._streamData=y(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()));}catch(e){this._streamError(e);}},this),this._streamError=y(function(e){this._streamCleanUp(),this._sendError(e);},this),this._streamEnd=y(function(){this._streamCleanUp(),r=!0,this._streamData("");},this),this._streamCleanUp=y(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError);},this);}function i(m){var n,s,a,t,o=Math.pow(2,53),h=-o,u=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,d=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,i=this,r=0,f=0,l=!1,e=!1,c=[],p={data:[],errors:[],meta:{}};function y(e){return"greedy"===m.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length;}function g(){if(p&&a&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+v.DefaultDelimiter+"'"),a=!1),m.skipEmptyLines&&(p.data=p.data.filter(function(e){return!y(e);})),_()){if(p)if(Array.isArray(p.data[0])){for(var e=0;_()&&e<p.data.length;e++)p.data[e].forEach(t);p.data.splice(0,1);}else p.data.forEach(t);function t(e,t){U(m.transformHeader)&&(e=m.transformHeader(e,t)),c.push(e);}}function i(e,t){for(var i=m.header?{}:[],r=0;r<e.length;r++){var n=r,s=e[r],s=((e,t)=>(e=>(m.dynamicTypingFunction&&void 0===m.dynamicTyping[e]&&(m.dynamicTyping[e]=m.dynamicTypingFunction(e)),!0===(m.dynamicTyping[e]||m.dynamicTyping)))(e)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&((e=>{if(u.test(e)){e=parseFloat(e);if(h<e&&e<o)return 1;}})(t)?parseFloat(t):d.test(t)?new Date(t):""===t?null:t):t)(n=m.header?r>=c.length?"__parsed_extra":c[r]:n,s=m.transform?m.transform(s,n):s);"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(s)):i[n]=s;}return m.header&&(r>c.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+c.length+" fields but parsed "+r,f+t):r<c.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+c.length+" fields but parsed "+r,f+t)),i;}var r;p&&(m.header||m.dynamicTyping||m.transform)&&(r=1,!p.data.length||Array.isArray(p.data[0])?(p.data=p.data.map(i),r=p.data.length):p.data=i(p.data,0),m.header&&p.meta&&(p.meta.fields=c),f+=r);}function _(){return m.header&&0===c.length;}function k(e,t,i,r){e={type:e,code:t,message:i};void 0!==r&&(e.row=r),p.errors.push(e);}U(m.step)&&(t=m.step,m.step=function(e){p=e,_()?g():(g(),0!==p.data.length&&(r+=e.data.length,m.preview&&r>m.preview?s.abort():(p.data=p.data[0],t(p,i))));}),this.parse=function(e,t,i){var r=m.quoteChar||'"',r=(m.newline||(m.newline=this.guessLineEndings(e,r)),a=!1,m.delimiter?U(m.delimiter)&&(m.delimiter=m.delimiter(e),p.meta.delimiter=m.delimiter):((r=((e,t,i,r,n)=>{var s,a,o,h;n=n||[",","\t","|",";",v.RECORD_SEP,v.UNIT_SEP];for(var u=0;u<n.length;u++){for(var d,f=n[u],l=0,c=0,p=0,g=(o=void 0,new E({comments:r,delimiter:f,newline:t,preview:10}).parse(e)),_=0;_<g.data.length;_++)i&&y(g.data[_])?p++:(d=g.data[_].length,c+=d,void 0===o?o=d:0<d&&(l+=Math.abs(d-o),o=d));0<g.data.length&&(c/=g.data.length-p),(void 0===a||l<=a)&&(void 0===h||h<c)&&1.99<c&&(a=l,s=f,h=c);}return{successful:!!(m.delimiter=s),bestDelimiter:s};})(e,m.newline,m.skipEmptyLines,m.comments,m.delimitersToGuess)).successful?m.delimiter=r.bestDelimiter:(a=!0,m.delimiter=v.DefaultDelimiter),p.meta.delimiter=m.delimiter),b(m));return m.preview&&m.header&&r.preview++,n=e,s=new E(r),p=s.parse(n,t,i),g(),l?{meta:{paused:!0}}:p||{meta:{paused:!1}};},this.paused=function(){return l;},this.pause=function(){l=!0,s.abort(),n=U(m.chunk)?"":n.substring(s.getCharIndex());},this.resume=function(){i.streamer._halted?(l=!1,i.streamer.parseChunk(n,!0)):setTimeout(i.resume,3);},this.aborted=function(){return e;},this.abort=function(){e=!0,s.abort(),p.meta.aborted=!0,U(m.complete)&&m.complete(p),n="";},this.guessLineEndings=function(e,t){e=e.substring(0,1048576);var t=new RegExp(P(t)+"([^]*?)"+P(t),"gm"),i=(e=e.replace(t,"")).split("\r"),t=e.split("\n"),e=1<t.length&&t[0].length<i[0].length;if(1===i.length||e)return"\n";for(var r=0,n=0;n<i.length;n++)"\n"===i[n][0]&&r++;return r>=i.length/2?"\r\n":"\r";};}function P(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");}function E(C){var S=(C=C||{}).delimiter,O=C.newline,x=C.comments,I=C.step,A=C.preview,T=C.fastMode,D=null,L=!1,F=null==C.quoteChar?'"':C.quoteChar,j=F;if(void 0!==C.escapeChar&&(j=C.escapeChar),("string"!=typeof S||-1<v.BAD_DELIMITERS.indexOf(S))&&(S=","),x===S)throw new Error("Comment character same as delimiter");!0===x?x="#":("string"!=typeof x||-1<v.BAD_DELIMITERS.indexOf(x))&&(x=!1),"\n"!==O&&"\r"!==O&&"\r\n"!==O&&(O="\n");var z=0,M=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw new Error("Input must be a string");var n=i.length,e=S.length,s=O.length,a=x.length,o=U(I),h=[],u=[],d=[],f=z=0;if(!i)return w();if(T||!1!==T&&-1===i.indexOf(F)){for(var l=i.split(O),c=0;c<l.length;c++){if(d=l[c],z+=d.length,c!==l.length-1)z+=O.length;else if(r)return w();if(!x||d.substring(0,a)!==x){if(o){if(h=[],k(d.split(S)),R(),M)return w();}else k(d.split(S));if(A&&A<=c)return h=h.slice(0,A),w(!0);}}return w();}for(var p=i.indexOf(S,z),g=i.indexOf(O,z),_=new RegExp(P(j)+P(F),"g"),m=i.indexOf(F,z);;)if(i[z]===F)for(m=z,z++;;){if(-1===(m=i.indexOf(F,m+1)))return r||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:z}),E();if(m===n-1)return E(i.substring(z,m).replace(_,F));if(F===j&&i[m+1]===j)m++;else if(F===j||0===m||i[m-1]!==j){-1!==p&&p<m+1&&(p=i.indexOf(S,m+1));var y=v(-1===(g=-1!==g&&g<m+1?i.indexOf(O,m+1):g)?p:Math.min(p,g));if(i.substr(m+1+y,e)===S){d.push(i.substring(z,m).replace(_,F)),i[z=m+1+y+e]!==F&&(m=i.indexOf(F,z)),p=i.indexOf(S,z),g=i.indexOf(O,z);break;}y=v(g);if(i.substring(m+1+y,m+1+y+s)===O){if(d.push(i.substring(z,m).replace(_,F)),b(m+1+y+s),p=i.indexOf(S,z),m=i.indexOf(F,z),o&&(R(),M))return w();if(A&&h.length>=A)return w(!0);break;}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:z}),m++;}}else if(x&&0===d.length&&i.substring(z,z+a)===x){if(-1===g)return w();z=g+s,g=i.indexOf(O,z),p=i.indexOf(S,z);}else if(-1!==p&&(p<g||-1===g))d.push(i.substring(z,p)),z=p+e,p=i.indexOf(S,z);else{if(-1===g)break;if(d.push(i.substring(z,g)),b(g+s),o&&(R(),M))return w();if(A&&h.length>=A)return w(!0);}return E();function k(e){h.push(e),f=z;}function v(e){var t=0;return t=-1!==e&&(e=i.substring(m+1,e))&&""===e.trim()?e.length:t;}function E(e){return r||(void 0===e&&(e=i.substring(z)),d.push(e),z=n,k(d),o&&R()),w();}function b(e){z=e,k(d),d=[],g=i.indexOf(O,z);}function w(e){if(C.header&&!t&&h.length&&!L){var s=h[0],a=Object.create(null),o=new Set(s);let n=!1;for(let r=0;r<s.length;r++){let i=s[r];if(a[i=U(C.transformHeader)?C.transformHeader(i,r):i]){let e,t=a[i];for(;e=i+"_"+t,t++,o.has(e););o.add(e),s[r]=e,a[i]++,n=!0,(D=null===D?{}:D)[e]=i;}else a[i]=1,s[r]=i;o.add(i);}n&&console.warn("Duplicate headers found and renamed."),L=!0;}return{data:h,errors:u,meta:{delimiter:S,linebreak:O,aborted:M,truncated:!!e,cursor:f+(t||0),renamedHeaders:D}};}function R(){I(w()),h=[],u=[];}},this.abort=function(){M=!0;},this.getCharIndex=function(){return z;};}function g(e){var t=e.data,i=o[t.workerId],r=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){r=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}});},pause:m,resume:m};if(U(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!r);s++);delete t.results;}else U(i.userChunk)&&(i.userChunk(t.results,n,t.file),delete t.results);}t.finished&&!r&&_(t.workerId,t.results);}function _(e,t){var i=o[e];U(i.userComplete)&&i.userComplete(t),i.terminate(),delete o[e];}function m(){throw new Error("Not implemented.");}function b(e){if("object"!=typeof e||null===e)return e;var t,i=Array.isArray(e)?[]:{};for(t in e)i[t]=b(e[t]);return i;}function y(e,t){return function(){e.apply(t,arguments);};}function U(e){return"function"==typeof e;}return v.parse=function(e,t){var i=(t=t||{}).dynamicTyping||!1;U(i)&&(t.dynamicTypingFunction=i,i={});if(t.dynamicTyping=i,t.transform=!!U(t.transform)&&t.transform,!t.worker||!v.WORKERS_SUPPORTED)return i=null,v.NODE_STREAM_INPUT,"string"==typeof e?(e=(e=>65279!==e.charCodeAt(0)?e:e.slice(1))(e),i=new(t.download?f:c)(t)):!0===e.readable&&U(e.read)&&U(e.on)?i=new p(t):(n.File&&e instanceof File||e instanceof Object)&&(i=new l(t)),i.stream(e);(i=(()=>{var e;return!!v.WORKERS_SUPPORTED&&(e=(()=>{var e=n.URL||n.webkitURL||null,t=r.toString();return v.BLOB_URL||(v.BLOB_URL=e.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",t,")();"],{type:"text/javascript"})));})(),(e=new n.Worker(e)).onmessage=g,e.id=h++,o[e.id]=e);})()).userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=U(t.step),t.chunk=U(t.chunk),t.complete=U(t.complete),t.error=U(t.error),delete t.worker,i.postMessage({input:e,config:t,workerId:i.id});},v.unparse=function(e,t){var n=!1,_=!0,m=",",y="\r\n",s='"',a=s+s,i=!1,r=null,o=!1,h=((()=>{if("object"==typeof t){if("string"!=typeof t.delimiter||v.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e);}).length||(m=t.delimiter),"boolean"!=typeof t.quotes&&"function"!=typeof t.quotes&&!Array.isArray(t.quotes)||(n=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(i=t.skipEmptyLines),"string"==typeof t.newline&&(y=t.newline),"string"==typeof t.quoteChar&&(s=t.quoteChar),"boolean"==typeof t.header&&(_=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");r=t.columns;}void 0!==t.escapeChar&&(a=t.escapeChar+s),t.escapeFormulae instanceof RegExp?o=t.escapeFormulae:"boolean"==typeof t.escapeFormulae&&t.escapeFormulae&&(o=/^[=+\-@\t\r].*$/);}})(),new RegExp(P(s),"g"));"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return u(null,e,i);if("object"==typeof e[0])return u(r||Object.keys(e[0]),e,i);}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||r),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),u(e.fields||[],e.data||[],i);throw new Error("Unable to serialize unrecognized input");function u(e,t,i){var r="",n=("string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t)),Array.isArray(e)&&0<e.length),s=!Array.isArray(t[0]);if(n&&_){for(var a=0;a<e.length;a++)0<a&&(r+=m),r+=k(e[a],a);0<t.length&&(r+=y);}for(var o=0;o<t.length;o++){var h=(n?e:t[o]).length,u=!1,d=n?0===Object.keys(t[o]).length:0===t[o].length;if(i&&!n&&(u="greedy"===i?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===i&&n){for(var f=[],l=0;l<h;l++){var c=s?e[l]:l;f.push(t[o][c]);}u=""===f.join("").trim();}if(!u){for(var p=0;p<h;p++){0<p&&!d&&(r+=m);var g=n&&s?e[p]:p;r+=k(t[o][g],p);}o<t.length-1&&(!i||0<h&&!d)&&(r+=y);}}return r;}function k(e,t){var i,r;return null==e?"":e.constructor===Date?JSON.stringify(e).slice(1,25):(r=!1,o&&"string"==typeof e&&o.test(e)&&(e="'"+e,r=!0),i=e.toString().replace(h,a),(r=r||!0===n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||((e,t)=>{for(var i=0;i<t.length;i++)if(-1<e.indexOf(t[i]))return!0;return!1;})(i,v.BAD_DELIMITERS)||-1<i.indexOf(m)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?s+i+s:i);}},v.RECORD_SEP=String.fromCharCode(30),v.UNIT_SEP=String.fromCharCode(31),v.BYTE_ORDER_MARK="\ufeff",v.BAD_DELIMITERS=["\r","\n",'"',v.BYTE_ORDER_MARK],v.WORKERS_SUPPORTED=!s&&!!n.Worker,v.NODE_STREAM_INPUT=1,v.LocalChunkSize=10485760,v.RemoteChunkSize=5242880,v.DefaultDelimiter=",",v.Parser=E,v.ParserHandle=i,v.NetworkStreamer=f,v.FileStreamer=l,v.StringStreamer=c,v.ReadableStreamStreamer=p,n.jQuery&&((d=n.jQuery).fn.parse=function(o){var i=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&n.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},i)});}),e(),this;function e(){if(0===h.length)U(o.complete)&&o.complete();else{var e,t,i,r,n=h[0];if(U(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,i=n.inputElem,r=s.reason,void(U(o.error)&&o.error({name:e},t,i,r));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config));}else if("skip"===s)return void u();}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){U(a)&&a(e,n.file,n.inputElem),u();},v.parse(n.file,n.instanceConfig);}}function u(){h.splice(0,1),e();}}),a&&(n.onmessage=function(e){e=e.data;void 0===v.WORKER_ID&&e&&(v.WORKER_ID=e.workerId);"string"==typeof e.input?n.postMessage({workerId:v.WORKER_ID,results:v.parse(e.input,e.config),finished:!0}):(n.File&&e.input instanceof File||e.input instanceof Object)&&(e=v.parse(e.input,e.config))&&n.postMessage({workerId:v.WORKER_ID,results:e,finished:!0});}),(f.prototype=Object.create(u.prototype)).constructor=f,(l.prototype=Object.create(u.prototype)).constructor=l,(c.prototype=Object.create(c.prototype)).constructor=c,(p.prototype=Object.create(u.prototype)).constructor=p,v;});

/***/ }),

/***/ 80433:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";

;// ./src/autofill/enums/autofill-overlay.enum.ts
const AutofillOverlayElement = {
    Button: "autofill-inline-menu-button",
    List: "autofill-inline-menu-list",
};
const AutofillOverlayPort = {
    Button: "autofill-inline-menu-button-port",
    ButtonMessageConnector: "autofill-inline-menu-button-message-connector",
    List: "autofill-inline-menu-list-port",
    ListMessageConnector: "autofill-inline-menu-list-message-connector",
};
const RedirectFocusDirection = {
    Current: "current",
    Previous: "previous",
    Next: "next",
};
// These values must not collide with any `CipherType` (1-8), since `InlineMenuFillType`
// is a union of these and `CipherType` and the two are compared with `===`.
const InlineMenuFillTypes = {
    AccountCreationUsername: 100,
    PasswordGeneration: 101,
    CurrentPasswordUpdate: 102,
};
const InlineMenuAccountCreationFieldType = {
    Text: "text",
    Email: "email",
    Password: "password",
    Totp: "totp",
};
const MAX_SUB_FRAME_DEPTH = 8;

// EXTERNAL MODULE: ../../node_modules/@webcomponents/custom-elements/custom-elements.min.js
var custom_elements_min = __webpack_require__(70526);
;// ../../node_modules/lit/polyfill-support.js
!function(i){"function"==typeof define&&define.amd?define(i):i();}(function(){"use strict";/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var i,n,o="__scoped";null!==(i=globalThis.reactiveElementPolyfillSupport)&&void 0!==i||(globalThis.reactiveElementPolyfillSupport=function(i){var n=i.ReactiveElement;if(void 0!==window.ShadyCSS&&(!window.ShadyCSS.nativeShadow||window.ShadyCSS.ApplyShim)){var t=n.prototype;window.ShadyDOM&&window.ShadyDOM.inUse&&!0===window.ShadyDOM.noPatch&&window.ShadyDOM.patchElementProto(t);var d=t.createRenderRoot;t.createRenderRoot=function(){var i,n,t,w=this.localName;if(window.ShadyCSS.nativeShadow)return d.call(this);if(!this.constructor.hasOwnProperty(o)){this.constructor[o]=!0;var v=this.constructor.elementStyles.map(function(i){return i instanceof CSSStyleSheet?Array.from(i.cssRules).reduce(function(i,n){return i+n.cssText;},""):i.cssText;});null===(n=null===(i=window.ShadyCSS)||void 0===i?void 0:i.ScopingShim)||void 0===n||n.prepareAdoptedCssText(v,w),void 0===this.constructor._$AJ&&window.ShadyCSS.prepareTemplateStyles(document.createElement("template"),w);}return null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);};var w=t.connectedCallback;t.connectedCallback=function(){w.call(this),this.hasUpdated&&window.ShadyCSS.styleElement(this);};var v=t._$AE;t._$AE=function(i){this.hasUpdated||window.ShadyCSS.styleElement(this),v.call(this,i);};}});var t,d=new Set(),w=new Map();null!==(n=globalThis.litHtmlPolyfillSupport)&&void 0!==n||(globalThis.litHtmlPolyfillSupport=function(i,n){if(void 0!==window.ShadyCSS&&(!window.ShadyCSS.nativeShadow||window.ShadyCSS.ApplyShim)){var o=function(i){return void 0!==i&&!d.has(i);},t=function(i){var n=w.get(i);return void 0===n&&w.set(i,n=[]),n;},v=new Map(),l=i.createElement;i.createElement=function(n,d){var w=l.call(i,n,d),v=null==d?void 0:d.scope;if(void 0!==v&&(window.ShadyCSS.nativeShadow||window.ShadyCSS.prepareTemplateDom(w,v),o(v))){var r=t(v),u=w.content.querySelectorAll("style");r.push.apply(r,Array.from(u).map(function(i){var n;return null===(n=i.parentNode)||void 0===n||n.removeChild(i),i.textContent;}));}return w;};var r=document.createDocumentFragment(),u=document.createComment(""),s=n.prototype,e=s._$AI;s._$AI=function(i,n){var v,l;void 0===n&&(n=this);var s=this._$AA.parentNode,a=null===(v=this.options)||void 0===v?void 0:v.scope;if(s instanceof ShadowRoot&&o(a)){var h=this._$AA,f=this._$AB;r.appendChild(u),this._$AA=u,this._$AB=null,e.call(this,i,n);var c=(null==i?void 0:i._$litType$)?this._$AH._$AD.el:document.createElement("template");if(function(i,n){var o,v=t(i),l=0!==v.length;l&&((o=document.createElement("style")).textContent=v.join("\n"),n.content.appendChild(o)),d.add(i),w.delete(i),window.ShadyCSS.prepareTemplateStyles(n,i),l&&window.ShadyCSS.nativeShadow&&null!==(o=n.content.querySelector("style"))&&n.content.appendChild(o);}(a,c),r.removeChild(u),null===(l=window.ShadyCSS)||void 0===l?void 0:l.nativeShadow){var y=c.content.querySelector("style");null!==y&&r.appendChild(y.cloneNode(!0));}s.insertBefore(r,f),this._$AA=h,this._$AB=f;}else e.call(this,i,n);},s._$AC=function(n){var o,t=null===(o=this.options)||void 0===o?void 0:o.scope,d=v.get(t);void 0===d&&v.set(t,d=new Map());var w=d.get(n.strings);return void 0===w&&d.set(n.strings,w=new i(n,this.options)),w;};}}),null!==(t=globalThis.litElementPolyfillSupport)&&void 0!==t||(globalThis.litElementPolyfillSupport=function(i){var n=i.LitElement;if(void 0!==window.ShadyCSS&&(!window.ShadyCSS.nativeShadow||window.ShadyCSS.ApplyShim)){n._$AJ=!0;var o=n.prototype,t=o.createRenderRoot;o.createRenderRoot=function(){return this.renderOptions.scope=this.localName,t.call(this);};}});});
;// ../../node_modules/@lit/reactive-element/css-tag.js
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap();class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet()).replaceSync(this.cssText),e&&o.set(s,t));}return t;}toString(){return this.cssText;}}const r=t=>new n("string"==typeof t?t:t+"",void 0,s),i=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");})(s)+t[o+1],t[0]);return new n(o,t,s);},S=(s,o)=>{if(e)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r(e);})(t):t;
;// ../../node_modules/@lit/reactive-element/reactive-element.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:reactive_element_i,defineProperty:reactive_element_e,getOwnPropertyDescriptor:h,getOwnPropertyNames:reactive_element_r,getOwnPropertySymbols:reactive_element_o,getPrototypeOf:reactive_element_n}=Object,a=globalThis,reactive_element_c=a.trustedTypes,l=reactive_element_c?reactive_element_c.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t;},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i;}},f=(t,s)=>!reactive_element_i(t,s),b={attribute:!0,type:String,converter:u,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap();class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()];}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&reactive_element_e(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h(this.prototype,t)??{get(){return this[s];},set(t){this[s]=t;}};return{get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0};}static getPropertyOptions(t){return this.elementProperties.get(t)??b;}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=reactive_element_n(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...reactive_element_r(t),...reactive_element_o(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map();for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c(s));}else void 0!==s&&i.push(c(s));return i;}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0;}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map(),this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set()).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map(),s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S(t,this.constructor.elementStyles),t;}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=!1,h){if(void 0!==t){const r=this.constructor;if(!1===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map()).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set()).add(t));}async _$EP(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&(await t),!this.isUpdatePending;}scheduleUpdate(){return this.performUpdate();}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=!1,this._$EM(),s;}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map(),this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete();}getUpdateComplete(){return this._$ES;}shouldUpdate(t){return!0;}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[d("elementProperties")]=new Map(),y[d("finalized")]=new Map(),p?.({ReactiveElement:y}),(a.reactiveElementVersions??=[]).push("2.1.2");
;// ../../node_modules/lit-html/lit-html.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lit_html_t=globalThis,lit_html_i=t=>t,lit_html_s=lit_html_t.trustedTypes,lit_html_e=lit_html_s?lit_html_s.createPolicy("lit-html",{createHTML:t=>t}):void 0,lit_html_h="$lit$",lit_html_o=`lit$${Math.random().toFixed(9).slice(2)}$`,lit_html_n="?"+lit_html_o,lit_html_r=`<${lit_html_n}>`,lit_html_l=document,lit_html_c=()=>lit_html_l.createComment(""),lit_html_a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,lit_html_u=Array.isArray,lit_html_d=t=>lit_html_u(t)||"function"==typeof t?.[Symbol.iterator],lit_html_f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,lit_html_p=RegExp(`>|${lit_html_f}(?:([^\\s"'>=/]+)(${lit_html_f}*=${lit_html_f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,lit_html_y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),lit_html_b=x(1),w=x(2),T=x(3),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap(),P=lit_html_l.createTreeWalker(lit_html_l,129);function V(t,i){if(!lit_html_u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==lit_html_e?lit_html_e.createHTML(i):i;}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(lit_html_y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=lit_html_p):void 0!==u[3]&&(c=lit_html_p):c===lit_html_p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?lit_html_p:'"'===u[3]?$:g):c===$||c===g?c=lit_html_p:c===_||c===m?c=v:(c=lit_html_p,n=void 0);const x=c===lit_html_p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+lit_html_r:d>=0?(e.push(a),s.slice(0,d)+lit_html_h+s.slice(d)+lit_html_o+x):s+lit_html_o+(-2===d?i:x);}return[V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e];};class lit_html_S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=lit_html_S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(lit_html_h)){const i=v[a++],s=r.getAttribute(t).split(lit_html_o),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(lit_html_o)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(lit_html_y.test(r.tagName)){const t=r.textContent.split(lit_html_o),i=t.length-1;if(i>0){r.textContent=lit_html_s?lit_html_s.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],lit_html_c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],lit_html_c());}}}else if(8===r.nodeType)if(r.data===lit_html_n)d.push({type:2,index:l});else{let t=-1;for(;-1!==(t=r.data.indexOf(lit_html_o,t+1));)d.push({type:7,index:l}),t+=lit_html_o.length-1;}l++;}}static createElement(t,i){const s=lit_html_l.createElement("template");return s.innerHTML=t,s;}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=lit_html_a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i;}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode;}get _$AU(){return this._$AM._$AU;}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??lit_html_l).importNode(i,!0);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=lit_html_l,e;}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv;}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t;}get startNode(){return this._$AA;}get endNode(){return this._$AB;}_$AI(t,i=this){t=M(this,t,i),lit_html_a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):lit_html_d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB);}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&lit_html_a(this._$AH)?this._$AA.nextSibling.data=t:this.T(lit_html_l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=lit_html_S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new lit_html_S(t)),i;}k(t){lit_html_u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(lit_html_c()),this.O(lit_html_c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t!==this._$AB;){const s=lit_html_i(t).nextSibling;lit_html_i(t).remove(),t=s;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName;}get _$AU(){return this._$AM._$AU;}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String()),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=M(this,t,i,0),o=!lit_html_a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!lit_html_a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU;}_$AI(t){M(this,t);}}const j={M:lit_html_h,P:lit_html_o,A:lit_html_n,C:1,L:N,R,D:lit_html_d,V:M,I:k,H,N:L,U:z,B:I,F:Z},B=lit_html_t.litHtmlPolyfillSupport;B?.(lit_html_S,k),(lit_html_t.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(lit_html_c(),t),t,void 0,s??{});}return h._$AI(t),h;};
;// ../../node_modules/lit-element/lit-element.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lit_element_s=globalThis;class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t;}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return E;}}lit_element_i._$litElement$=!0,lit_element_i["finalized"]=!0,lit_element_s.litElementHydrateSupport?.({LitElement:lit_element_i});const lit_element_o=lit_element_s.litElementPolyfillSupport;lit_element_o?.({LitElement:lit_element_i});const lit_element_n={_$AK:(t,e,r)=>{t._$AK(e,r);},_$AL:t=>t._$AL};(lit_element_s.litElementVersions??=[]).push("4.2.2");
;// ../../node_modules/lit/index.js

;// ../../libs/common/src/auth/enums/authentication-status.ts
/**
 * The authentication status of the user
 *
 * See `AuthService.authStatusFor$` for details on how we determine the user's `AuthenticationStatus`
 */
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var AuthenticationStatus;
(function (AuthenticationStatus) {
    /**
     * User is not authenticated
     *  - The user does not have an active account userId and/or an access token in state
     */
    AuthenticationStatus[AuthenticationStatus["LoggedOut"] = 0] = "LoggedOut";
    /**
     * User is authenticated but not decrypted
     *  - The user has an access token, but no user key in state
     *  - Vault data cannot be decrypted (because there is no user key)
     */
    AuthenticationStatus[AuthenticationStatus["Locked"] = 1] = "Locked";
    /**
     * User is authenticated and decrypted
     *  - The user has an access token and a user key in state
     *  - Vault data can be decrypted (via user key)
     */
    AuthenticationStatus[AuthenticationStatus["Unlocked"] = 2] = "Unlocked";
})(AuthenticationStatus || (AuthenticationStatus = {}));

;// ../../libs/common/src/autofill/constants/match-patterns.ts
const CardExpiryDateDelimiters = ["/", "-", ".", " "];
// `CardExpiryDateDelimiters` is not intended solely for regex consumption,
// so we need to format it here
const ExpiryDateDelimitersPattern = "\\" +
    CardExpiryDateDelimiters.join("\\")
        // replace space character with the regex whitespace character class
        .replace(" ", "s");
const MonthPattern = "(([1]{1}[0-2]{1})|(0?[1-9]{1}))";
// Because we're dealing with expiry dates, we assume the year will be in current or next century (as of 2024)
const ExpiryFullYearPattern = "2[0-1]{1}\\d{2}";
const DelimiterPatternExpression = new RegExp(`[${ExpiryDateDelimitersPattern}]`, "g");
const IrrelevantExpiryCharactersPatternExpression = new RegExp(
// "nor digits" to ensure numbers are removed from guidance pattern, which aren't covered by ^\w
`[^\\d${ExpiryDateDelimitersPattern}]`, "g");
const MonthPatternExpression = new RegExp(`^${MonthPattern}$`);
const ExpiryFullYearPatternExpression = new RegExp(`^${ExpiryFullYearPattern}$`);

;// ../../libs/common/src/autofill/constants/index.ts
const TYPE_CHECK = {
    FUNCTION: "function",
    NUMBER: "number",
    STRING: "string",
};
const EVENTS = {
    CHANGE: "change",
    INPUT: "input",
    KEYDOWN: "keydown",
    KEYPRESS: "keypress",
    KEYUP: "keyup",
    BLUR: "blur",
    CLICK: "click",
    FOCUS: "focus",
    FOCUSIN: "focusin",
    FOCUSOUT: "focusout",
    SCROLL: "scroll",
    RESIZE: "resize",
    DOMCONTENTLOADED: "DOMContentLoaded",
    LOAD: "load",
    MESSAGE: "message",
    VISIBILITYCHANGE: "visibilitychange",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    MOUSEUP: "mouseup",
    MOUSEOUT: "mouseout",
    SUBMIT: "submit",
};
/**
 * HTML attributes observed by the MutationObserver for autofill form/field tracking.
 * If you need to observe a new attribute, add it here.
 */
const AUTOFILL_ATTRIBUTES = {
    ACTION: "action",
    ARIA_DESCRIBEDBY: "aria-describedby",
    ARIA_DISABLED: "aria-disabled",
    ARIA_HASPOPUP: "aria-haspopup",
    ARIA_HIDDEN: "aria-hidden",
    ARIA_LABEL: "aria-label",
    ARIA_LABELLEDBY: "aria-labelledby",
    AUTOCOMPLETE: "autocomplete",
    AUTOCOMPLETE_TYPE: "autocompletetype",
    X_AUTOCOMPLETE_TYPE: "x-autocompletetype",
    CHECKED: "checked",
    // CLASS intentionally omitted because it can cause a callback storm on dynamic pages.
    DATA_LABEL: "data-label",
    DATA_STRIPE: "data-stripe",
    DISABLED: "disabled",
    ID: "id",
    MAXLENGTH: "maxlength",
    METHOD: "method",
    NAME: "name",
    PLACEHOLDER: "placeholder",
    POPOVER: "popover",
    POPOVERTARGET: "popovertarget",
    POPOVERTARGETACTION: "popovertargetaction",
    READONLY: "readonly",
    REL: "rel",
    TABINDEX: "tabindex",
    TITLE: "title",
    TYPE: "type",
};
const ClearClipboardDelay = {
    Never: "never",
    TenSeconds: "tenSeconds",
    TwentySeconds: "twentySeconds",
    ThirtySeconds: "thirtySeconds",
    OneMinute: "oneMinute",
    TwoMinutes: "twoMinutes",
    FiveMinutes: "fiveMinutes",
};
/* Ids for context menu items and messaging events */
const AUTOFILL_CARD_ID = "autofill-card";
const AUTOFILL_ID = "autofill";
const SHOW_AUTOFILL_BUTTON = "show-autofill-button";
const AUTOFILL_IDENTITY_ID = "autofill-identity";
const AUTOFILL_TRIAGE_ID = "autofill-triage";
const COPY_IDENTIFIER_ID = "copy-identifier";
const COPY_PASSWORD_ID = "copy-password";
const COPY_USERNAME_ID = "copy-username";
const COPY_VERIFICATION_CODE_ID = "copy-totp";
const CREATE_CARD_ID = "create-card";
const CREATE_IDENTITY_ID = "create-identity";
const CREATE_LOGIN_ID = "create-login";
const GENERATE_PASSWORD_ID = "generate-password";
const NOOP_COMMAND_SUFFIX = "noop";
const ROOT_ID = "root";
const SEPARATOR_ID = "separator";
const UPDATE_PASSWORD = "update-password";
const NOTIFICATION_BAR_LIFESPAN_MS = 150000; // 150 seconds
const AUTOFILL_OVERLAY_HANDLE_REPOSITION = "autofill-overlay-handle-reposition-event";
const AUTOFILL_OVERLAY_HANDLE_SCROLL = "autofill-overlay-handle-scroll-event";
const UPDATE_PASSKEYS_HEADINGS_ON_SCROLL = "update-passkeys-headings-on-scroll";
const AUTOFILL_TRIGGER_FORM_FIELD_SUBMIT = "autofill-trigger-form-field-submit";
const AutofillOverlayVisibility = {
    Off: 0,
    OnButtonClick: 1,
    OnFieldFocus: 2,
};
const BrowserClientVendors = {
    Chrome: "Chrome",
    Firefox: "Firefox",
    Opera: "Opera",
    Edge: "Edge",
    Vivaldi: "Vivaldi",
    Unknown: "Unknown",
};
const BrowserShortcutsUris = {
    Chrome: "chrome://extensions/shortcuts",
    Firefox: "https://bitwarden.com/help/keyboard-shortcuts",
    Opera: "opera://extensions/shortcuts",
    Edge: "edge://extensions/shortcuts",
    Vivaldi: "vivaldi://extensions/shortcuts",
    Unknown: "https://bitwarden.com/help/keyboard-shortcuts",
};
const DisablePasswordManagerUris = {
    Chrome: "chrome://password-manager/settings",
    Firefox: "https://bitwarden.com/help/disable-browser-autofill/",
    Opera: "opera://settings/autofill",
    Edge: "edge://settings/autofill/passwords/settings",
    Vivaldi: "vivaldi://settings/autofill",
    Unknown: "https://bitwarden.com/help/disable-browser-autofill/",
};
const ExtensionCommand = {
    AutofillCommand: "autofill_cmd",
    AutofillCard: "autofill_card",
    AutofillIdentity: "autofill_identity",
    AutofillLogin: "autofill_login",
    OpenAutofillOverlay: "open_autofill_overlay",
    GeneratePassword: "generate_password",
    OpenPopup: "open_popup",
    LockVault: "lock_vault",
    NoopCommand: "noop",
};
const CLEAR_NOTIFICATION_LOGIN_DATA_DURATION = (/* unused pure expression or super */ null && (60 * 1000)); // 1 minute
const MAX_DEEP_QUERY_RECURSION_DEPTH = 4;
const DEEP_QUERY_SELECTOR_COMBINATOR = ">>>";
// this list is derived from the `attachShadow` candidate elements list
// https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
const SHADOW_ROOT_CANDIDATE_NODE_NAMES = Object.freeze(new Set([
    "ARTICLE",
    "ASIDE",
    "BLOCKQUOTE",
    "BODY",
    "DIV",
    "FOOTER",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "HEADER",
    "MAIN",
    "NAV",
    "P",
    "SECTION",
    "SPAN",
]));
/**
 * The default rules feed base URL. Composed with resource paths
 * (e.g. `manifest.json`) at fetch time.
 */
const DEFAULT_FILL_ASSIST_RULES_URL = "https://github.com/bitwarden/map-the-web/releases/latest/download";
/**
 * Field keys for targeting rules. These MUST match the `fieldKey` enum in
 * the Forms Map schema.
 */
const AutofillTargetingRuleTypes = {
    // Authentication
    username: "username",
    password: "password",
    newPassword: "newPassword",
    oneTimeCode: "oneTimeCode",
    // Name
    fullName: "fullName",
    honorificPrefix: "honorificPrefix",
    firstName: "firstName",
    middleName: "middleName",
    lastName: "lastName",
    honorificSuffix: "honorificSuffix",
    // Contact
    email: "email",
    phone: "phone",
    phoneCountryCode: "phoneCountryCode",
    phoneAreaCode: "phoneAreaCode",
    phoneLocal: "phoneLocal",
    phoneExtension: "phoneExtension",
    organization: "organization",
    // Address
    streetAddress: "streetAddress",
    addressLine1: "addressLine1",
    addressLine2: "addressLine2",
    addressLine3: "addressLine3",
    addressLevel1: "addressLevel1",
    addressLevel2: "addressLevel2",
    addressLevel3: "addressLevel3",
    addressLevel4: "addressLevel4",
    postalCode: "postalCode",
    country: "country",
    // Birthdate
    birthdate: "birthdate",
    birthdateDay: "birthdateDay",
    birthdateMonth: "birthdateMonth",
    birthdateYear: "birthdateYear",
    // Payment card
    cardholderName: "cardholderName",
    cardNumber: "cardNumber",
    cardExpirationDate: "cardExpirationDate",
    cardExpirationMonth: "cardExpirationMonth",
    cardExpirationYear: "cardExpirationYear",
    cardCvv: "cardCvv",
    cardType: "cardType",
    // Consent
    consentTerms: "consentTerms",
    consentPrivacy: "consentPrivacy",
    consentUser: "consentUser",
    // Search
    searchTerm: "searchTerm",
};
const FormPurposeCategories = {
    AccountCreation: "account-creation",
    AccountLogin: "account-login",
    AccountRecovery: "account-recovery",
    AccountUpdate: "account-update",
    Address: "address",
    Identity: "identity",
    PaymentCard: "payment-card",
    Search: "search",
    Signup: "signup",
};


;// ../../libs/common/src/platform/enums/file-upload-type.enum.ts
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var FileUploadType;
(function (FileUploadType) {
    FileUploadType[FileUploadType["Direct"] = 0] = "Direct";
    FileUploadType[FileUploadType["Azure"] = 1] = "Azure";
})(FileUploadType || (FileUploadType = {}));

;// ../../libs/storage-core/src/html-storage-location.enum.ts
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var HtmlStorageLocation;
(function (HtmlStorageLocation) {
    HtmlStorageLocation["Local"] = "local";
    HtmlStorageLocation["Memory"] = "memory";
    HtmlStorageLocation["Session"] = "session";
})(HtmlStorageLocation || (HtmlStorageLocation = {}));

;// ../../node_modules/tslib/tslib.es6.mjs
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** *//* global Reflect, Promise, SuppressedError, Symbol, Iterator */var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;}||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return extendStatics(d,b);};function __extends(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");extendStatics(d,b);function __(){this.constructor=d;}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());}var __assign=function(){__assign=Object.assign||function __assign(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};function __rest(s,e){var t={};for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0)t[p]=s[p];if(s!=null&&typeof Object.getOwnPropertySymbols==="function")for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++){if(e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i]))t[p[i]]=s[p[i]];}return t;}function __decorate(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r;}function __param(paramIndex,decorator){return function(target,key){decorator(target,key,paramIndex);};}function __esDecorate(ctor,descriptorIn,decorators,contextIn,initializers,extraInitializers){function accept(f){if(f!==void 0&&typeof f!=="function")throw new TypeError("Function expected");return f;}var kind=contextIn.kind,key=kind==="getter"?"get":kind==="setter"?"set":"value";var target=!descriptorIn&&ctor?contextIn["static"]?ctor:ctor.prototype:null;var descriptor=descriptorIn||(target?Object.getOwnPropertyDescriptor(target,contextIn.name):{});var _,done=false;for(var i=decorators.length-1;i>=0;i--){var context={};for(var p in contextIn)context[p]=p==="access"?{}:contextIn[p];for(var p in contextIn.access)context.access[p]=contextIn.access[p];context.addInitializer=function(f){if(done)throw new TypeError("Cannot add initializers after decoration has completed");extraInitializers.push(accept(f||null));};var result=(0,decorators[i])(kind==="accessor"?{get:descriptor.get,set:descriptor.set}:descriptor[key],context);if(kind==="accessor"){if(result===void 0)continue;if(result===null||typeof result!=="object")throw new TypeError("Object expected");if(_=accept(result.get))descriptor.get=_;if(_=accept(result.set))descriptor.set=_;if(_=accept(result.init))initializers.unshift(_);}else if(_=accept(result)){if(kind==="field")initializers.unshift(_);else descriptor[key]=_;}}if(target)Object.defineProperty(target,contextIn.name,descriptor);done=true;};function __runInitializers(thisArg,initializers,value){var useValue=arguments.length>2;for(var i=0;i<initializers.length;i++){value=useValue?initializers[i].call(thisArg,value):initializers[i].call(thisArg);}return useValue?value:void 0;};function __propKey(x){return typeof x==="symbol"?x:"".concat(x);};function __setFunctionName(f,name,prefix){if(typeof name==="symbol")name=name.description?"[".concat(name.description,"]"):"";return Object.defineProperty(f,"name",{configurable:true,value:prefix?"".concat(prefix," ",name):name});};function __metadata(metadataKey,metadataValue){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(metadataKey,metadataValue);}function __awaiter(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});}function __generator(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g=Object.create((typeof Iterator==="function"?Iterator:Object).prototype);return g.next=verb(0),g["throw"]=verb(1),g["return"]=verb(2),typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}}var __createBinding=Object.create?function(o,m,k,k2){if(k2===undefined)k2=k;var desc=Object.getOwnPropertyDescriptor(m,k);if(!desc||("get"in desc?!m.__esModule:desc.writable||desc.configurable)){desc={enumerable:true,get:function(){return m[k];}};}Object.defineProperty(o,k2,desc);}:function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];};function __exportStar(m,o){for(var p in m)if(p!=="default"&&!Object.prototype.hasOwnProperty.call(o,p))__createBinding(o,m,p);}function __values(o){var s=typeof Symbol==="function"&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&typeof o.length==="number")return{next:function(){if(o&&i>=o.length)o=void 0;return{value:o&&o[i++],done:!o};}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.");}function __read(o,n){var m=typeof Symbol==="function"&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{while((n===void 0||n-->0)&&!(r=i.next()).done)ar.push(r.value);}catch(error){e={error:error};}finally{try{if(r&&!r.done&&(m=i["return"]))m.call(i);}finally{if(e)throw e.error;}}return ar;}/** @deprecated */function __spread(){for(var ar=[],i=0;i<arguments.length;i++)ar=ar.concat(__read(arguments[i]));return ar;}/** @deprecated */function __spreadArrays(){for(var s=0,i=0,il=arguments.length;i<il;i++)s+=arguments[i].length;for(var r=Array(s),k=0,i=0;i<il;i++)for(var a=arguments[i],j=0,jl=a.length;j<jl;j++,k++)r[k]=a[j];return r;}function __spreadArray(to,from,pack){if(pack||arguments.length===2)for(var i=0,l=from.length,ar;i<l;i++){if(ar||!(i in from)){if(!ar)ar=Array.prototype.slice.call(from,0,i);ar[i]=from[i];}}return to.concat(ar||Array.prototype.slice.call(from));}function __await(v){return this instanceof __await?(this.v=v,this):new __await(v);}function __asyncGenerator(thisArg,_arguments,generator){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var g=generator.apply(thisArg,_arguments||[]),i,q=[];return i=Object.create((typeof AsyncIterator==="function"?AsyncIterator:Object).prototype),verb("next"),verb("throw"),verb("return",awaitReturn),i[Symbol.asyncIterator]=function(){return this;},i;function awaitReturn(f){return function(v){return Promise.resolve(v).then(f,reject);};}function verb(n,f){if(g[n]){i[n]=function(v){return new Promise(function(a,b){q.push([n,v,a,b])>1||resume(n,v);});};if(f)i[n]=f(i[n]);}}function resume(n,v){try{step(g[n](v));}catch(e){settle(q[0][3],e);}}function step(r){r.value instanceof __await?Promise.resolve(r.value.v).then(fulfill,reject):settle(q[0][2],r);}function fulfill(value){resume("next",value);}function reject(value){resume("throw",value);}function settle(f,v){if(f(v),q.shift(),q.length)resume(q[0][0],q[0][1]);}}function __asyncDelegator(o){var i,p;return i={},verb("next"),verb("throw",function(e){throw e;}),verb("return"),i[Symbol.iterator]=function(){return this;},i;function verb(n,f){i[n]=o[n]?function(v){return(p=!p)?{value:__await(o[n](v)),done:false}:f?f(v):v;}:f;}}function __asyncValues(o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var m=o[Symbol.asyncIterator],i;return m?m.call(o):(o=typeof __values==="function"?__values(o):o[Symbol.iterator](),i={},verb("next"),verb("throw"),verb("return"),i[Symbol.asyncIterator]=function(){return this;},i);function verb(n){i[n]=o[n]&&function(v){return new Promise(function(resolve,reject){v=o[n](v),settle(resolve,reject,v.done,v.value);});};}function settle(resolve,reject,d,v){Promise.resolve(v).then(function(v){resolve({value:v,done:d});},reject);}}function __makeTemplateObject(cooked,raw){if(Object.defineProperty){Object.defineProperty(cooked,"raw",{value:raw});}else{cooked.raw=raw;}return cooked;};var __setModuleDefault=Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:true,value:v});}:function(o,v){o["default"]=v;};var ownKeys=function(o){ownKeys=Object.getOwnPropertyNames||function(o){var ar=[];for(var k in o)if(Object.prototype.hasOwnProperty.call(o,k))ar[ar.length]=k;return ar;};return ownKeys(o);};function __importStar(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k=ownKeys(mod),i=0;i<k.length;i++)if(k[i]!=="default")__createBinding(result,mod,k[i]);__setModuleDefault(result,mod);return result;}function __importDefault(mod){return mod&&mod.__esModule?mod:{default:mod};}function __classPrivateFieldGet(receiver,state,kind,f){if(kind==="a"&&!f)throw new TypeError("Private accessor was defined without a getter");if(typeof state==="function"?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot read private member from an object whose class did not declare it");return kind==="m"?f:kind==="a"?f.call(receiver):f?f.value:state.get(receiver);}function __classPrivateFieldSet(receiver,state,value,kind,f){if(kind==="m")throw new TypeError("Private method is not writable");if(kind==="a"&&!f)throw new TypeError("Private accessor was defined without a setter");if(typeof state==="function"?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot write private member to an object whose class did not declare it");return kind==="a"?f.call(receiver,value):f?f.value=value:state.set(receiver,value),value;}function __classPrivateFieldIn(state,receiver){if(receiver===null||typeof receiver!=="object"&&typeof receiver!=="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof state==="function"?receiver===state:state.has(receiver);}function __addDisposableResource(env,value,async){if(value!==null&&value!==void 0){if(typeof value!=="object"&&typeof value!=="function")throw new TypeError("Object expected.");var dispose,inner;if(async){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");dispose=value[Symbol.asyncDispose];}if(dispose===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");dispose=value[Symbol.dispose];if(async)inner=dispose;}if(typeof dispose!=="function")throw new TypeError("Object not disposable.");if(inner)dispose=function(){try{inner.call(this);}catch(e){return Promise.reject(e);}};env.stack.push({value:value,dispose:dispose,async:async});}else if(async){env.stack.push({async:true});}return value;}var _SuppressedError=typeof SuppressedError==="function"?SuppressedError:function(error,suppressed,message){var e=new Error(message);return e.name="SuppressedError",e.error=error,e.suppressed=suppressed,e;};function __disposeResources(env){function fail(e){env.error=env.hasError?new _SuppressedError(e,env.error,"An error was suppressed during disposal."):e;env.hasError=true;}var r,s=0;function next(){while(r=env.stack.pop()){try{if(!r.async&&s===1)return s=0,env.stack.push(r),Promise.resolve().then(next);if(r.dispose){var result=r.dispose.call(r.value);if(r.async)return s|=2,Promise.resolve(result).then(next,function(e){fail(e);return next();});}else s|=1;}catch(e){fail(e);}}if(s===1)return env.hasError?Promise.reject(env.error):Promise.resolve();if(env.hasError)throw env.error;}return next();}function __rewriteRelativeImportExtension(path,preserveJsx){if(typeof path==="string"&&/^\.\.?\//.test(path)){return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,function(m,tsx,d,ext,cm){return tsx?preserveJsx?".jsx":".js":d&&(!ext||!cm)?m:d+ext+"."+cm.toLowerCase()+"js";});}return path;}/* harmony default export */ var tslib_es6 = ({__extends,__assign,__rest,__decorate,__param,__esDecorate,__runInitializers,__propKey,__setFunctionName,__metadata,__awaiter,__generator,__createBinding,__exportStar,__values,__read,__spread,__spreadArrays,__spreadArray,__await,__asyncGenerator,__asyncDelegator,__asyncValues,__makeTemplateObject,__importStar,__importDefault,__classPrivateFieldGet,__classPrivateFieldSet,__classPrivateFieldIn,__addDisposableResource,__disposeResources,__rewriteRelativeImportExtension});
;// ../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value){return typeof value==='function';}
;// ../../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl){var _super=function(instance){Error.call(instance);instance.stack=new Error().stack;};var ctorFunc=createImpl(_super);ctorFunc.prototype=Object.create(Error.prototype);ctorFunc.prototype.constructor=ctorFunc;return ctorFunc;}
;// ../../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError=createErrorClass(function(_super){return function UnsubscriptionErrorImpl(errors){_super(this);this.message=errors?errors.length+" errors occurred during unsubscription:\n"+errors.map(function(err,i){return i+1+") "+err.toString();}).join('\n  '):'';this.name='UnsubscriptionError';this.errors=errors;};});
;// ../../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr,item){if(arr){var index=arr.indexOf(item);0<=index&&arr.splice(index,1);}}
;// ../../node_modules/rxjs/dist/esm5/internal/Subscription.js
var Subscription=function(){function Subscription(initialTeardown){this.initialTeardown=initialTeardown;this.closed=false;this._parentage=null;this._finalizers=null;}Subscription.prototype.unsubscribe=function(){var e_1,_a,e_2,_b;var errors;if(!this.closed){this.closed=true;var _parentage=this._parentage;if(_parentage){this._parentage=null;if(Array.isArray(_parentage)){try{for(var _parentage_1=__values(_parentage),_parentage_1_1=_parentage_1.next();!_parentage_1_1.done;_parentage_1_1=_parentage_1.next()){var parent_1=_parentage_1_1.value;parent_1.remove(this);}}catch(e_1_1){e_1={error:e_1_1};}finally{try{if(_parentage_1_1&&!_parentage_1_1.done&&(_a=_parentage_1.return))_a.call(_parentage_1);}finally{if(e_1)throw e_1.error;}}}else{_parentage.remove(this);}}var initialFinalizer=this.initialTeardown;if(isFunction(initialFinalizer)){try{initialFinalizer();}catch(e){errors=e instanceof UnsubscriptionError?e.errors:[e];}}var _finalizers=this._finalizers;if(_finalizers){this._finalizers=null;try{for(var _finalizers_1=__values(_finalizers),_finalizers_1_1=_finalizers_1.next();!_finalizers_1_1.done;_finalizers_1_1=_finalizers_1.next()){var finalizer=_finalizers_1_1.value;try{execFinalizer(finalizer);}catch(err){errors=errors!==null&&errors!==void 0?errors:[];if(err instanceof UnsubscriptionError){errors=__spreadArray(__spreadArray([],__read(errors)),__read(err.errors));}else{errors.push(err);}}}}catch(e_2_1){e_2={error:e_2_1};}finally{try{if(_finalizers_1_1&&!_finalizers_1_1.done&&(_b=_finalizers_1.return))_b.call(_finalizers_1);}finally{if(e_2)throw e_2.error;}}}if(errors){throw new UnsubscriptionError(errors);}}};Subscription.prototype.add=function(teardown){var _a;if(teardown&&teardown!==this){if(this.closed){execFinalizer(teardown);}else{if(teardown instanceof Subscription){if(teardown.closed||teardown._hasParent(this)){return;}teardown._addParent(this);}(this._finalizers=(_a=this._finalizers)!==null&&_a!==void 0?_a:[]).push(teardown);}}};Subscription.prototype._hasParent=function(parent){var _parentage=this._parentage;return _parentage===parent||Array.isArray(_parentage)&&_parentage.includes(parent);};Subscription.prototype._addParent=function(parent){var _parentage=this._parentage;this._parentage=Array.isArray(_parentage)?(_parentage.push(parent),_parentage):_parentage?[_parentage,parent]:parent;};Subscription.prototype._removeParent=function(parent){var _parentage=this._parentage;if(_parentage===parent){this._parentage=null;}else if(Array.isArray(_parentage)){arrRemove(_parentage,parent);}};Subscription.prototype.remove=function(teardown){var _finalizers=this._finalizers;_finalizers&&arrRemove(_finalizers,teardown);if(teardown instanceof Subscription){teardown._removeParent(this);}};Subscription.EMPTY=function(){var empty=new Subscription();empty.closed=true;return empty;}();return Subscription;}();var EMPTY_SUBSCRIPTION=Subscription.EMPTY;function isSubscription(value){return value instanceof Subscription||value&&'closed'in value&&isFunction(value.remove)&&isFunction(value.add)&&isFunction(value.unsubscribe);}function execFinalizer(finalizer){if(isFunction(finalizer)){finalizer();}else{finalizer.unsubscribe();}}
;// ../../node_modules/rxjs/dist/esm5/internal/config.js
var config={onUnhandledError:null,onStoppedNotification:null,Promise:undefined,useDeprecatedSynchronousErrorHandling:false,useDeprecatedNextContext:false};
;// ../../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
var timeoutProvider={setTimeout:function(handler,timeout){var args=[];for(var _i=2;_i<arguments.length;_i++){args[_i-2]=arguments[_i];}var delegate=timeoutProvider.delegate;if(delegate===null||delegate===void 0?void 0:delegate.setTimeout){return delegate.setTimeout.apply(delegate,__spreadArray([handler,timeout],__read(args)));}return setTimeout.apply(void 0,__spreadArray([handler,timeout],__read(args)));},clearTimeout:function(handle){var delegate=timeoutProvider.delegate;return((delegate===null||delegate===void 0?void 0:delegate.clearTimeout)||clearTimeout)(handle);},delegate:undefined};
;// ../../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function reportUnhandledError(err){timeoutProvider.setTimeout(function(){var onUnhandledError=config.onUnhandledError;if(onUnhandledError){onUnhandledError(err);}else{throw err;}});}
;// ../../node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop(){}
;// ../../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION=function(){return createNotification('C',undefined,undefined);}();function errorNotification(error){return createNotification('E',undefined,error);}function nextNotification(value){return createNotification('N',value,undefined);}function createNotification(kind,value,error){return{kind:kind,value:value,error:error};}
;// ../../node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var context=null;function errorContext(cb){if(config.useDeprecatedSynchronousErrorHandling){var isRoot=!context;if(isRoot){context={errorThrown:false,error:null};}cb();if(isRoot){var _a=context,errorThrown=_a.errorThrown,error=_a.error;context=null;if(errorThrown){throw error;}}}else{cb();}}function captureError(err){if(config.useDeprecatedSynchronousErrorHandling&&context){context.errorThrown=true;context.error=err;}}
;// ../../node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Subscriber=function(_super){__extends(Subscriber,_super);function Subscriber(destination){var _this=_super.call(this)||this;_this.isStopped=false;if(destination){_this.destination=destination;if(isSubscription(destination)){destination.add(_this);}}else{_this.destination=EMPTY_OBSERVER;}return _this;}Subscriber.create=function(next,error,complete){return new SafeSubscriber(next,error,complete);};Subscriber.prototype.next=function(value){if(this.isStopped){handleStoppedNotification(nextNotification(value),this);}else{this._next(value);}};Subscriber.prototype.error=function(err){if(this.isStopped){handleStoppedNotification(errorNotification(err),this);}else{this.isStopped=true;this._error(err);}};Subscriber.prototype.complete=function(){if(this.isStopped){handleStoppedNotification(COMPLETE_NOTIFICATION,this);}else{this.isStopped=true;this._complete();}};Subscriber.prototype.unsubscribe=function(){if(!this.closed){this.isStopped=true;_super.prototype.unsubscribe.call(this);this.destination=null;}};Subscriber.prototype._next=function(value){this.destination.next(value);};Subscriber.prototype._error=function(err){try{this.destination.error(err);}finally{this.unsubscribe();}};Subscriber.prototype._complete=function(){try{this.destination.complete();}finally{this.unsubscribe();}};return Subscriber;}(Subscription);var _bind=Function.prototype.bind;function bind(fn,thisArg){return _bind.call(fn,thisArg);}var ConsumerObserver=function(){function ConsumerObserver(partialObserver){this.partialObserver=partialObserver;}ConsumerObserver.prototype.next=function(value){var partialObserver=this.partialObserver;if(partialObserver.next){try{partialObserver.next(value);}catch(error){handleUnhandledError(error);}}};ConsumerObserver.prototype.error=function(err){var partialObserver=this.partialObserver;if(partialObserver.error){try{partialObserver.error(err);}catch(error){handleUnhandledError(error);}}else{handleUnhandledError(err);}};ConsumerObserver.prototype.complete=function(){var partialObserver=this.partialObserver;if(partialObserver.complete){try{partialObserver.complete();}catch(error){handleUnhandledError(error);}}};return ConsumerObserver;}();var SafeSubscriber=function(_super){__extends(SafeSubscriber,_super);function SafeSubscriber(observerOrNext,error,complete){var _this=_super.call(this)||this;var partialObserver;if(isFunction(observerOrNext)||!observerOrNext){partialObserver={next:observerOrNext!==null&&observerOrNext!==void 0?observerOrNext:undefined,error:error!==null&&error!==void 0?error:undefined,complete:complete!==null&&complete!==void 0?complete:undefined};}else{var context_1;if(_this&&config.useDeprecatedNextContext){context_1=Object.create(observerOrNext);context_1.unsubscribe=function(){return _this.unsubscribe();};partialObserver={next:observerOrNext.next&&bind(observerOrNext.next,context_1),error:observerOrNext.error&&bind(observerOrNext.error,context_1),complete:observerOrNext.complete&&bind(observerOrNext.complete,context_1)};}else{partialObserver=observerOrNext;}}_this.destination=new ConsumerObserver(partialObserver);return _this;}return SafeSubscriber;}(Subscriber);function handleUnhandledError(error){if(config.useDeprecatedSynchronousErrorHandling){captureError(error);}else{reportUnhandledError(error);}}function defaultErrorHandler(err){throw err;}function handleStoppedNotification(notification,subscriber){var onStoppedNotification=config.onStoppedNotification;onStoppedNotification&&timeoutProvider.setTimeout(function(){return onStoppedNotification(notification,subscriber);});}var EMPTY_OBSERVER={closed:true,next:noop,error:defaultErrorHandler,complete:noop};
;// ../../node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable=function(){return typeof Symbol==='function'&&Symbol.observable||'@@observable';}();
;// ../../node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x){return x;}
;// ../../node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pipe(){var fns=[];for(var _i=0;_i<arguments.length;_i++){fns[_i]=arguments[_i];}return pipeFromArray(fns);}function pipeFromArray(fns){if(fns.length===0){return identity;}if(fns.length===1){return fns[0];}return function piped(input){return fns.reduce(function(prev,fn){return fn(prev);},input);};}
;// ../../node_modules/rxjs/dist/esm5/internal/Observable.js
var Observable=function(){function Observable(subscribe){if(subscribe){this._subscribe=subscribe;}}Observable.prototype.lift=function(operator){var observable=new Observable();observable.source=this;observable.operator=operator;return observable;};Observable.prototype.subscribe=function(observerOrNext,error,complete){var _this=this;var subscriber=isSubscriber(observerOrNext)?observerOrNext:new SafeSubscriber(observerOrNext,error,complete);errorContext(function(){var _a=_this,operator=_a.operator,source=_a.source;subscriber.add(operator?operator.call(subscriber,source):source?_this._subscribe(subscriber):_this._trySubscribe(subscriber));});return subscriber;};Observable.prototype._trySubscribe=function(sink){try{return this._subscribe(sink);}catch(err){sink.error(err);}};Observable.prototype.forEach=function(next,promiseCtor){var _this=this;promiseCtor=getPromiseCtor(promiseCtor);return new promiseCtor(function(resolve,reject){var subscriber=new SafeSubscriber({next:function(value){try{next(value);}catch(err){reject(err);subscriber.unsubscribe();}},error:reject,complete:resolve});_this.subscribe(subscriber);});};Observable.prototype._subscribe=function(subscriber){var _a;return(_a=this.source)===null||_a===void 0?void 0:_a.subscribe(subscriber);};Observable.prototype[observable]=function(){return this;};Observable.prototype.pipe=function(){var operations=[];for(var _i=0;_i<arguments.length;_i++){operations[_i]=arguments[_i];}return pipeFromArray(operations)(this);};Observable.prototype.toPromise=function(promiseCtor){var _this=this;promiseCtor=getPromiseCtor(promiseCtor);return new promiseCtor(function(resolve,reject){var value;_this.subscribe(function(x){return value=x;},function(err){return reject(err);},function(){return resolve(value);});});};Observable.create=function(subscribe){return new Observable(subscribe);};return Observable;}();function getPromiseCtor(promiseCtor){var _a;return(_a=promiseCtor!==null&&promiseCtor!==void 0?promiseCtor:config.Promise)!==null&&_a!==void 0?_a:Promise;}function isObserver(value){return value&&isFunction(value.next)&&isFunction(value.error)&&isFunction(value.complete);}function isSubscriber(value){return value&&value instanceof Subscriber||isObserver(value)&&isSubscription(value);}
;// ../../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
var ObjectUnsubscribedError=createErrorClass(function(_super){return function ObjectUnsubscribedErrorImpl(){_super(this);this.name='ObjectUnsubscribedError';this.message='object unsubscribed';};});
;// ../../node_modules/rxjs/dist/esm5/internal/Subject.js
var Subject=function(_super){__extends(Subject,_super);function Subject(){var _this=_super.call(this)||this;_this.closed=false;_this.currentObservers=null;_this.observers=[];_this.isStopped=false;_this.hasError=false;_this.thrownError=null;return _this;}Subject.prototype.lift=function(operator){var subject=new AnonymousSubject(this,this);subject.operator=operator;return subject;};Subject.prototype._throwIfClosed=function(){if(this.closed){throw new ObjectUnsubscribedError();}};Subject.prototype.next=function(value){var _this=this;errorContext(function(){var e_1,_a;_this._throwIfClosed();if(!_this.isStopped){if(!_this.currentObservers){_this.currentObservers=Array.from(_this.observers);}try{for(var _b=__values(_this.currentObservers),_c=_b.next();!_c.done;_c=_b.next()){var observer=_c.value;observer.next(value);}}catch(e_1_1){e_1={error:e_1_1};}finally{try{if(_c&&!_c.done&&(_a=_b.return))_a.call(_b);}finally{if(e_1)throw e_1.error;}}}});};Subject.prototype.error=function(err){var _this=this;errorContext(function(){_this._throwIfClosed();if(!_this.isStopped){_this.hasError=_this.isStopped=true;_this.thrownError=err;var observers=_this.observers;while(observers.length){observers.shift().error(err);}}});};Subject.prototype.complete=function(){var _this=this;errorContext(function(){_this._throwIfClosed();if(!_this.isStopped){_this.isStopped=true;var observers=_this.observers;while(observers.length){observers.shift().complete();}}});};Subject.prototype.unsubscribe=function(){this.isStopped=this.closed=true;this.observers=this.currentObservers=null;};Object.defineProperty(Subject.prototype,"observed",{get:function(){var _a;return((_a=this.observers)===null||_a===void 0?void 0:_a.length)>0;},enumerable:false,configurable:true});Subject.prototype._trySubscribe=function(subscriber){this._throwIfClosed();return _super.prototype._trySubscribe.call(this,subscriber);};Subject.prototype._subscribe=function(subscriber){this._throwIfClosed();this._checkFinalizedStatuses(subscriber);return this._innerSubscribe(subscriber);};Subject.prototype._innerSubscribe=function(subscriber){var _this=this;var _a=this,hasError=_a.hasError,isStopped=_a.isStopped,observers=_a.observers;if(hasError||isStopped){return EMPTY_SUBSCRIPTION;}this.currentObservers=null;observers.push(subscriber);return new Subscription(function(){_this.currentObservers=null;arrRemove(observers,subscriber);});};Subject.prototype._checkFinalizedStatuses=function(subscriber){var _a=this,hasError=_a.hasError,thrownError=_a.thrownError,isStopped=_a.isStopped;if(hasError){subscriber.error(thrownError);}else if(isStopped){subscriber.complete();}};Subject.prototype.asObservable=function(){var observable=new Observable();observable.source=this;return observable;};Subject.create=function(destination,source){return new AnonymousSubject(destination,source);};return Subject;}(Observable);var AnonymousSubject=function(_super){__extends(AnonymousSubject,_super);function AnonymousSubject(destination,source){var _this=_super.call(this)||this;_this.destination=destination;_this.source=source;return _this;}AnonymousSubject.prototype.next=function(value){var _a,_b;(_b=(_a=this.destination)===null||_a===void 0?void 0:_a.next)===null||_b===void 0?void 0:_b.call(_a,value);};AnonymousSubject.prototype.error=function(err){var _a,_b;(_b=(_a=this.destination)===null||_a===void 0?void 0:_a.error)===null||_b===void 0?void 0:_b.call(_a,err);};AnonymousSubject.prototype.complete=function(){var _a,_b;(_b=(_a=this.destination)===null||_a===void 0?void 0:_a.complete)===null||_b===void 0?void 0:_b.call(_a);};AnonymousSubject.prototype._subscribe=function(subscriber){var _a,_b;return(_b=(_a=this.source)===null||_a===void 0?void 0:_a.subscribe(subscriber))!==null&&_b!==void 0?_b:EMPTY_SUBSCRIPTION;};return AnonymousSubject;}(Subject);
;// ../../libs/storage-core/src/storage.service.ts
class StorageService {
}

;// ../../libs/storage-core/src/memory-storage.service.ts
var memory_storage_service_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore


class MemoryStorageService extends StorageService {
    constructor() {
        super(...arguments);
        this.store = new Map();
        this.updatesSubject = new Subject();
    }
    get valuesRequireDeserialization() {
        return false;
    }
    get updates$() {
        return this.updatesSubject.asObservable();
    }
    get(key) {
        if (this.store.has(key)) {
            const obj = this.store.get(key);
            return Promise.resolve(obj);
        }
        return Promise.resolve(null);
    }
    has(key) {
        return memory_storage_service_awaiter(this, void 0, void 0, function* () {
            return (yield this.get(key)) != null;
        });
    }
    save(key, obj) {
        if (obj == null) {
            return this.remove(key);
        }
        // TODO: Remove once foreground/background contexts are separated in browser
        // Needed to ensure ownership of all memory by the context running the storage service
        const toStore = structuredClone(obj);
        this.store.set(key, toStore);
        this.updatesSubject.next({ key, updateType: "save" });
        return Promise.resolve();
    }
    remove(key) {
        this.store.delete(key);
        this.updatesSubject.next({ key, updateType: "remove" });
        return Promise.resolve();
    }
}

;// ../../libs/storage-core/src/serialized-memory-storage.service.ts
var serialized_memory_storage_service_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore


class SerializedMemoryStorageService extends StorageService {
    constructor() {
        super(...arguments);
        this.store = {};
        this.updatesSubject = new Subject();
    }
    get valuesRequireDeserialization() {
        return true;
    }
    get updates$() {
        return this.updatesSubject.asObservable();
    }
    get(key) {
        const json = this.store[key];
        if (json) {
            const obj = JSON.parse(json);
            return Promise.resolve(obj);
        }
        return Promise.resolve(null);
    }
    has(key) {
        return serialized_memory_storage_service_awaiter(this, void 0, void 0, function* () {
            return (yield this.get(key)) != null;
        });
    }
    save(key, obj) {
        if (obj == null) {
            return this.remove(key);
        }
        // TODO: Remove once foreground/background contexts are separated in browser
        // Needed to ensure ownership of all memory by the context running the storage service
        this.store[key] = JSON.stringify(obj);
        this.updatesSubject.next({ key, updateType: "save" });
        return Promise.resolve();
    }
    remove(key) {
        delete this.store[key];
        this.updatesSubject.next({ key, updateType: "remove" });
        return Promise.resolve();
    }
}

;// ../../libs/storage-core/src/storage-location.enum.ts
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var StorageLocationEnum;
(function (StorageLocationEnum) {
    StorageLocationEnum["Both"] = "both";
    StorageLocationEnum["Disk"] = "disk";
    StorageLocationEnum["Memory"] = "memory";
})(StorageLocationEnum || (StorageLocationEnum = {}));

;// ../../libs/storage-core/src/index.ts








// Renamed to just "StorageService", to be removed when references are updated



;// ../../libs/common/src/platform/enums/html-storage-location.enum.ts


;// ../../libs/common/src/platform/enums/key-suffix-options.enum.ts
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var KeySuffixOptions;
(function (KeySuffixOptions) {
    KeySuffixOptions["Auto"] = "auto";
    KeySuffixOptions["Pin"] = "pin";
})(KeySuffixOptions || (KeySuffixOptions = {}));

;// ../../libs/logging/src/log-level.ts
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Error"] = 3] = "Error";
})(LogLevel || (LogLevel = {}));

;// ../../libs/logging/src/console-log.service.ts
/* unused harmony import specifier */ var console_log_service_LogLevel;

class ConsoleLogService {
    constructor(isDev, filter = null, recorder = null) {
        this.isDev = isDev;
        this.filter = filter;
        this.recorder = recorder;
        this.timersMap = new Map();
    }
    debug(message, ...optionalParams) {
        if (!this.isDev) {
            return;
        }
        this.write(console_log_service_LogLevel.Debug, message, ...optionalParams);
    }
    info(message, ...optionalParams) {
        this.write(console_log_service_LogLevel.Info, message, ...optionalParams);
    }
    warning(message, ...optionalParams) {
        this.write(console_log_service_LogLevel.Warning, message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        this.write(console_log_service_LogLevel.Error, message, ...optionalParams);
    }
    write(level, message, ...optionalParams) {
        var _a;
        try {
            (_a = this.recorder) === null || _a === void 0 ? void 0 : _a.record(level, message, ...optionalParams);
        }
        catch (_b) {
            // Ignore error
        }
        if (this.filter != null && this.filter(level)) {
            return;
        }
        switch (level) {
            case console_log_service_LogLevel.Debug:
                // eslint-disable-next-line
                console.log(message, ...optionalParams);
                break;
            case console_log_service_LogLevel.Info:
                // eslint-disable-next-line
                console.log(message, ...optionalParams);
                break;
            case console_log_service_LogLevel.Warning:
                // eslint-disable-next-line
                console.warn(message, ...optionalParams);
                break;
            case console_log_service_LogLevel.Error:
                // eslint-disable-next-line
                console.error(message, ...optionalParams);
                break;
            default:
                break;
        }
    }
    measure(start, trackGroup, track, name, properties) {
        const measureName = `[${track}]: ${name}`;
        const measure = performance.measure(measureName, {
            start: start,
            detail: {
                devtools: {
                    dataType: "track-entry",
                    track,
                    trackGroup,
                    properties,
                },
            },
        });
        this.info(`${measureName} took ${measure.duration}`, properties);
        return measure;
    }
    mark(name) {
        const mark = performance.mark(name, {
            detail: {
                devtools: {
                    dataType: "marker",
                },
            },
        });
        this.info(mark.name, new Date().toISOString());
        return mark;
    }
}

;// ../../libs/logging/src/flight-recorder.ts
/* unused harmony import specifier */ var FlightRecorderClient;
var flight_recorder_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Framework-agnostic wrapper around the SDK's {@link FlightRecorderClient}.
 *
 * The underlying WASM must be loaded before the client can be used. Callers
 * provide a `sdkReady` promise (typically `SdkLoadService.Ready`) that resolves
 * once the SDK is initialized. The client is lazily created on first access.
 */
class FlightRecorder {
    /**
     * @param sdkReady - A promise that resolves when the SDK WASM has been loaded
     *   and initialized. Pass `SdkLoadService.Ready` in DI-enabled contexts.
     */
    constructor(sdkReady) {
        this.sdkReady = sdkReady;
    }
    /**
     * Read all events currently in the flight recorder buffer.
     */
    read() {
        return flight_recorder_awaiter(this, void 0, void 0, function* () {
            const client = yield this.getClient();
            return client.read();
        });
    }
    /**
     * Get the current event count without reading event contents.
     */
    count() {
        return flight_recorder_awaiter(this, void 0, void 0, function* () {
            const client = yield this.getClient();
            return client.count();
        });
    }
    getClient() {
        if (this.clientPromise == null) {
            this.clientPromise = this.sdkReady.then(() => new FlightRecorderClient());
        }
        return this.clientPromise;
    }
}

// EXTERNAL MODULE: ../../node_modules/papaparse/papaparse.min.js
var papaparse_min = __webpack_require__(98869);
;// ../../libs/logging/src/flight-recorder-export.ts
/* unused harmony import specifier */ var papa;

const CSV_COLUMNS = (/* unused pure expression or super */ null && (["timestamp", "level", "target", "message", "fields"]));
/**
 * Build a CSV download payload for {@link FlightRecorderEvent}s.
 *
 * Returns a `fileName` of the form `Bitwarden-diagnostic-report-YYYY-MM-DD.csv`
 * and a CSV-encoded `blobData` ready to pass to `FileDownloadService.download`.
 *
 * @param events The events to encode.
 * @param date The date used for the filename. Defaults to `new Date()`.
 */
function buildFlightRecorderCsvExport(events, date = new Date()) {
    const rows = events.map((e) => ({
        timestamp: new Date(e.timestamp).toISOString(),
        level: e.level,
        target: e.target,
        message: e.message,
        fields: JSON.stringify(e.fields),
    }));
    const blobData = papa.unparse(rows, {
        columns: [...CSV_COLUMNS],
        header: true,
    });
    const datePart = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const fileName = `Bitwarden-diagnostic-report-${datePart}.csv`;
    return { fileName, blobData };
}

;// ../../libs/logging/src/index.ts







;// ../../libs/common/src/platform/enums/log-level-type.enum.ts


;// ../../libs/common/src/platform/enums/storage-location.enum.ts


;// ../../libs/common/src/platform/enums/theme-type.enum.ts
/**
 * @deprecated prefer the `ThemeTypes` constants and `Theme` type over unsafe enum types
 **/
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var ThemeType;
(function (ThemeType) {
    ThemeType["System"] = "system";
    ThemeType["Light"] = "light";
    ThemeType["Dark"] = "dark";
})(ThemeType || (ThemeType = {}));
const ThemeTypes = {
    System: "system",
    Light: "light",
    Dark: "dark",
};

;// ../../libs/common/src/platform/enums/index.ts







;// ../../libs/common/src/vault/enums/bank-account-type.ts
const _BankAccountType = Object.freeze({
    Checking: "checking",
    Savings: "savings",
    CertificateOfDeposit: "certificateOfDeposit",
    LineOfCredit: "lineOfCredit",
    InvestmentBrokerage: "investmentBrokerage",
    MoneyMarket: "moneyMarket",
    Other: "other",
});
const BankAccountType = (/* unused pure expression or super */ null && (_BankAccountType));
const BankAccountTypeI18nKeys = {
    checking: "bankAccountTypeChecking",
    savings: "bankAccountTypeSavings",
    certificateOfDeposit: "bankAccountTypeCertificateOfDeposit",
    lineOfCredit: "bankAccountTypeLineOfCredit",
    investmentBrokerage: "bankAccountTypeInvestmentBrokerage",
    moneyMarket: "bankAccountTypeMoneyMarket",
    other: "bankAccountTypeOther",
};

;// ../../libs/common/src/vault/enums/cipher-reprompt-type.ts
const CipherRepromptType = {
    None: 0,
    Password: 1,
};
/**
 * Normalizes a CipherRepromptType value to ensure compatibility with the SDK.
 * @param value - The cipher reprompt type from user data
 * @returns Valid CipherRepromptType, defaults to CipherRepromptType.None if unrecognized
 */
function normalizeCipherRepromptTypeForSdk(value) {
    switch (value) {
        case CipherRepromptType.None:
        case CipherRepromptType.Password:
            return value;
        default:
            return CipherRepromptType.None;
    }
}

;// ../../libs/common/src/vault/enums/cipher-type.ts
const _CipherType = Object.freeze({
    Login: 1,
    SecureNote: 2,
    Card: 3,
    Identity: 4,
    SshKey: 5,
    BankAccount: 6,
    DriversLicense: 7,
    Passport: 8,
});
// FIXME: Update typing of `CipherType` to be `Record<keyof _CipherType, CipherType>` which is ADR-0025 compliant when the TypeScript version is at least 5.8.
const CipherType = _CipherType;
/**
 * Reverse mapping of Cipher Types to their associated names.
 * Prefer using {@link toCipherTypeName} rather than accessing this object directly.
 *
 * When represented as an enum in TypeScript, this mapping was provided
 * by default. Now using a constant object it needs to be defined manually.
 */
const cipherTypeNames = Object.freeze(Object.fromEntries(Object.entries(CipherType).map(([key, value]) => [value, key])));
/**
 * Returns the associated name for the cipher type, will throw when the name is not found.
 */
function toCipherTypeName(type) {
    const name = cipherTypeNames[type];
    return name;
}
/**
 * @returns `true` if the value is a valid `CipherType`, `false` otherwise.
 */
const isCipherType = (value) => {
    return Object.values(CipherType).includes(value);
};
/**
 * Converts a value to a `CipherType` if it is valid, otherwise returns `null`.
 */
const toCipherType = (value) => {
    if (isCipherType(value)) {
        return value;
    }
    if (typeof value === "string") {
        const valueAsInt = parseInt(value, 10);
        if (isCipherType(valueAsInt)) {
            return valueAsInt;
        }
    }
    return undefined;
};

;// ../../libs/common/src/vault/enums/field-type.enum.ts
const _FieldType = Object.freeze({
    Text: 0,
    Hidden: 1,
    Boolean: 2,
    Linked: 3,
});
const FieldType = (/* unused pure expression or super */ null && (_FieldType));
/**
 * Normalizes a FieldType value to ensure compatibility with the SDK.
 * @param value - The field type from user data
 * @returns Valid FieldType, defaults to FieldType.Text if unrecognized
 */
function normalizeFieldTypeForSdk(value) {
    switch (value) {
        case FieldType.Text:
        case FieldType.Hidden:
        case FieldType.Boolean:
        case FieldType.Linked:
            return value;
        default:
            return FieldType.Text;
    }
}

;// ../../libs/common/src/vault/enums/linked-id-type.enum.ts
// LoginView
const LoginLinkedId = {
    Username: 100,
    Password: 101,
};
// CardView
const CardLinkedId = {
    CardholderName: 300,
    ExpMonth: 301,
    ExpYear: 302,
    Code: 303,
    Brand: 304,
    Number: 305,
};
// IdentityView
const IdentityLinkedId = {
    Title: 400,
    MiddleName: 401,
    Address1: 402,
    Address2: 403,
    Address3: 404,
    City: 405,
    State: 406,
    PostalCode: 407,
    Country: 408,
    Company: 409,
    Email: 410,
    Phone: 411,
    Ssn: 412,
    Username: 413,
    PassportNumber: 414,
    LicenseNumber: 415,
    FirstName: 416,
    LastName: 417,
    FullName: 418,
};
/**
 * Normalizes a LinkedIdType value to ensure compatibility with the SDK.
 * @param value - The linked ID type from user data
 * @returns Valid LinkedIdType or undefined if unrecognized
 */
function normalizeLinkedIdTypeForSdk(value) {
    if (value == null) {
        return undefined;
    }
    // Check all valid LinkedId numeric values (100-418)
    const allValidValues = [
        ...Object.values(LoginLinkedId),
        ...Object.values(CardLinkedId),
        ...Object.values(IdentityLinkedId),
    ];
    return allValidValues.includes(value) ? value : undefined;
}

;// ../../libs/common/src/vault/enums/secure-note-type.enum.ts
const SecureNoteType = {
    Generic: 0,
};
/**
 * Normalizes a SecureNoteType value to ensure compatibility with the SDK.
 * @param value - The secure note type from user data
 * @returns Valid SecureNoteType, defaults to SecureNoteType.Generic if unrecognized
 */
function normalizeSecureNoteTypeForSdk(value) {
    return SecureNoteType.Generic;
}

;// ../../libs/common/src/vault/enums/extension-page-urls.enum.ts
/**
 * Available pages within the extension by their URL.
 * Useful when opening a specific page within the popup.
 */
const ExtensionPageUrls = {
    Index: "popup/index.html#/",
    AtRiskPasswords: "popup/index.html#/at-risk-passwords",
};

;// ../../libs/common/src/vault/enums/index.ts








;// ../../node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
var isDevelopment=false;/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/function sheetForTag(tag){if(tag.sheet){return tag.sheet;}// this weirdness brought to you by firefox
/* istanbul ignore next */for(var i=0;i<document.styleSheets.length;i++){if(document.styleSheets[i].ownerNode===tag){return document.styleSheets[i];}}// this function should always return with a value
// TS can't understand it though so we make it stop complaining here
return undefined;}function createStyleElement(options){var tag=document.createElement('style');tag.setAttribute('data-emotion',options.key);if(options.nonce!==undefined){tag.setAttribute('nonce',options.nonce);}tag.appendChild(document.createTextNode(''));tag.setAttribute('data-s','');return tag;}var StyleSheet=/*#__PURE__*/function(){// Using Node instead of HTMLElement since container may be a ShadowRoot
function StyleSheet(options){var _this=this;this._insertTag=function(tag){var before;if(_this.tags.length===0){if(_this.insertionPoint){before=_this.insertionPoint.nextSibling;}else if(_this.prepend){before=_this.container.firstChild;}else{before=_this.before;}}else{before=_this.tags[_this.tags.length-1].nextSibling;}_this.container.insertBefore(tag,before);_this.tags.push(tag);};this.isSpeedy=options.speedy===undefined?!isDevelopment:options.speedy;this.tags=[];this.ctr=0;this.nonce=options.nonce;// key is the value of the data-emotion attribute, it's used to identify different sheets
this.key=options.key;this.container=options.container;this.prepend=options.prepend;this.insertionPoint=options.insertionPoint;this.before=null;}var _proto=StyleSheet.prototype;_proto.hydrate=function hydrate(nodes){nodes.forEach(this._insertTag);};_proto.insert=function insert(rule){// the max length is how many rules we have per style tag, it's 65000 in speedy mode
// it's 1 in dev because we insert source maps that map a single rule to a location
// and you can only have one source map per style tag
if(this.ctr%(this.isSpeedy?65000:1)===0){this._insertTag(createStyleElement(this));}var tag=this.tags[this.tags.length-1];if(this.isSpeedy){var sheet=sheetForTag(tag);try{// this is the ultrafast version, works across browsers
// the big drawback is that the css won't be editable in devtools
sheet.insertRule(rule,sheet.cssRules.length);}catch(e){}}else{tag.appendChild(document.createTextNode(rule));}this.ctr++;};_proto.flush=function flush(){this.tags.forEach(function(tag){var _tag$parentNode;return(_tag$parentNode=tag.parentNode)==null?void 0:_tag$parentNode.removeChild(tag);});this.tags=[];this.ctr=0;};return StyleSheet;}();
;// ../../node_modules/stylis/src/Utility.js
/**
 * @param {number}
 * @return {number}
 */var abs=Math.abs;/**
 * @param {number}
 * @return {string}
 */var from=String.fromCharCode;/**
 * @param {object}
 * @return {object}
 */var Utility_assign=Object.assign;/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */function hash(value,length){return charat(value,0)^45?(((length<<2^charat(value,0))<<2^charat(value,1))<<2^charat(value,2))<<2^charat(value,3):0;}/**
 * @param {string} value
 * @return {string}
 */function trim(value){return value.trim();}/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */function match(value,pattern){return(value=pattern.exec(value))?value[0]:value;}/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */function replace(value,pattern,replacement){return value.replace(pattern,replacement);}/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */function indexof(value,search){return value.indexOf(search);}/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */function charat(value,index){return value.charCodeAt(index)|0;}/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */function substr(value,begin,end){return value.slice(begin,end);}/**
 * @param {string} value
 * @return {number}
 */function strlen(value){return value.length;}/**
 * @param {any[]} value
 * @return {number}
 */function sizeof(value){return value.length;}/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */function append(value,array){return array.push(value),value;}/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */function combine(array,callback){return array.map(callback).join('');}
;// ../../node_modules/stylis/src/Tokenizer.js
/* unused harmony import specifier */ var Tokenizer_append;
/* unused harmony import specifier */ var Tokenizer_from;
var line=1;var column=1;var Tokenizer_length=0;var position=0;var character=0;var characters='';/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */function node(value,root,parent,type,props,children,length){return{value:value,root:root,parent:parent,type:type,props:props,children:children,line:line,column:column,length:length,return:''};}/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */function copy(root,props){return Utility_assign(node('',null,null,'',null,null,0),root,{length:-root.length},props);}/**
 * @return {number}
 */function Tokenizer_char(){return character;}/**
 * @return {number}
 */function prev(){character=position>0?charat(characters,--position):0;if(column--,character===10)column=1,line--;return character;}/**
 * @return {number}
 */function next(){character=position<Tokenizer_length?charat(characters,position++):0;if(column++,character===10)column=1,line++;return character;}/**
 * @return {number}
 */function peek(){return charat(characters,position);}/**
 * @return {number}
 */function caret(){return position;}/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */function slice(begin,end){return substr(characters,begin,end);}/**
 * @param {number} type
 * @return {number}
 */function token(type){switch(type){// \0 \t \n \r \s whitespace token
case 0:case 9:case 10:case 13:case 32:return 5;// ! + , / > @ ~ isolate token
case 33:case 43:case 44:case 47:case 62:case 64:case 126:// ; { } breakpoint token
case 59:case 123:case 125:return 4;// : accompanied token
case 58:return 3;// " ' ( [ opening delimit token
case 34:case 39:case 40:case 91:return 2;// ) ] closing delimit token
case 41:case 93:return 1;}return 0;}/**
 * @param {string} value
 * @return {any[]}
 */function alloc(value){return line=column=1,Tokenizer_length=strlen(characters=value),position=0,[];}/**
 * @param {any} value
 * @return {any}
 */function dealloc(value){return characters='',value;}/**
 * @param {number} type
 * @return {string}
 */function delimit(type){return trim(slice(position-1,delimiter(type===91?type+2:type===40?type+1:type)));}/**
 * @param {string} value
 * @return {string[]}
 */function tokenize(value){return dealloc(tokenizer(alloc(value)));}/**
 * @param {number} type
 * @return {string}
 */function whitespace(type){while(character=peek())if(character<33)next();else break;return token(type)>2||token(character)>3?'':' ';}/**
 * @param {string[]} children
 * @return {string[]}
 */function tokenizer(children){while(next())switch(token(character)){case 0:Tokenizer_append(identifier(position-1),children);break;case 2:Tokenizer_append(delimit(character),children);break;default:Tokenizer_append(Tokenizer_from(character),children);}return children;}/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */function escaping(index,count){while(--count&&next())// not 0-9 A-F a-f
if(character<48||character>102||character>57&&character<65||character>70&&character<97)break;return slice(index,caret()+(count<6&&peek()==32&&next()==32));}/**
 * @param {number} type
 * @return {number}
 */function delimiter(type){while(next())switch(character){// ] ) " '
case type:return position;// " '
case 34:case 39:if(type!==34&&type!==39)delimiter(character);break;// (
case 40:if(type===41)delimiter(type);break;// \
case 92:next();break;}return position;}/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */function commenter(type,index){while(next())// //
if(type+character===47+10)break;// /*
else if(type+character===42+42&&peek()===47)break;return'/*'+slice(index,position-1)+'*'+from(type===47?type:next());}/**
 * @param {number} index
 * @return {string}
 */function identifier(index){while(!token(peek()))next();return slice(index,position);}
;// ../../node_modules/stylis/src/Enum.js
var MS='-ms-';var MOZ='-moz-';var WEBKIT='-webkit-';var COMMENT='comm';var RULESET='rule';var DECLARATION='decl';var PAGE='@page';var MEDIA='@media';var IMPORT='@import';var CHARSET='@charset';var VIEWPORT='@viewport';var SUPPORTS='@supports';var DOCUMENT='@document';var NAMESPACE='@namespace';var KEYFRAMES='@keyframes';var FONT_FACE='@font-face';var COUNTER_STYLE='@counter-style';var FONT_FEATURE_VALUES='@font-feature-values';var LAYER='@layer';
;// ../../node_modules/stylis/src/Serializer.js
/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */function serialize(children,callback){var output='';var length=sizeof(children);for(var i=0;i<length;i++)output+=callback(children[i],i,children,callback)||'';return output;}/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */function stringify(element,index,children,callback){switch(element.type){case LAYER:if(element.children.length)break;case IMPORT:case DECLARATION:return element.return=element.return||element.value;case COMMENT:return'';case KEYFRAMES:return element.return=element.value+'{'+serialize(element.children,callback)+'}';case RULESET:element.value=element.props.join(',');}return strlen(children=serialize(element.children,callback))?element.return=element.value+'{'+children+'}':'';}
;// ../../node_modules/stylis/src/Middleware.js
/* unused harmony import specifier */ var Middleware_DECLARATION;
/* unused harmony import specifier */ var Middleware_KEYFRAMES;
/* unused harmony import specifier */ var Middleware_WEBKIT;
/* unused harmony import specifier */ var Middleware_RULESET;
/* unused harmony import specifier */ var Middleware_MOZ;
/* unused harmony import specifier */ var Middleware_MS;
/* unused harmony import specifier */ var Middleware_replace;
/* unused harmony import specifier */ var Middleware_combine;
/* unused harmony import specifier */ var Middleware_match;
/* unused harmony import specifier */ var Middleware_charat;
/* unused harmony import specifier */ var Middleware_substr;
/* unused harmony import specifier */ var Middleware_strlen;
/* unused harmony import specifier */ var Middleware_sizeof;
/* unused harmony import specifier */ var Middleware_copy;
/* unused harmony import specifier */ var Middleware_tokenize;
/* unused harmony import specifier */ var Middleware_serialize;
/* unused harmony import specifier */ var prefix;
/**
 * @param {function[]} collection
 * @return {function}
 */function middleware(collection){var length=sizeof(collection);return function(element,index,children,callback){var output='';for(var i=0;i<length;i++)output+=collection[i](element,index,children,callback)||'';return output;};}/**
 * @param {function} callback
 * @return {function}
 */function rulesheet(callback){return function(element){if(!element.root)if(element=element.return)callback(element);};}/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */function prefixer(element,index,children,callback){if(element.length>-1)if(!element.return)switch(element.type){case Middleware_DECLARATION:element.return=prefix(element.value,element.length,children);return;case Middleware_KEYFRAMES:return Middleware_serialize([Middleware_copy(element,{value:Middleware_replace(element.value,'@','@'+Middleware_WEBKIT)})],callback);case Middleware_RULESET:if(element.length)return Middleware_combine(element.props,function(value){switch(Middleware_match(value,/(::plac\w+|:read-\w+)/)){// :read-(only|write)
case':read-only':case':read-write':return Middleware_serialize([Middleware_copy(element,{props:[Middleware_replace(value,/:(read-\w+)/,':'+Middleware_MOZ+'$1')]})],callback);// :placeholder
case'::placeholder':return Middleware_serialize([Middleware_copy(element,{props:[Middleware_replace(value,/:(plac\w+)/,':'+Middleware_WEBKIT+'input-$1')]}),Middleware_copy(element,{props:[Middleware_replace(value,/:(plac\w+)/,':'+Middleware_MOZ+'$1')]}),Middleware_copy(element,{props:[Middleware_replace(value,/:(plac\w+)/,Middleware_MS+'input-$1')]})],callback);}return'';});}}/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */function namespace(element){switch(element.type){case Middleware_RULESET:element.props=element.props.map(function(value){return Middleware_combine(Middleware_tokenize(value),function(value,index,children){switch(Middleware_charat(value,0)){// \f
case 12:return Middleware_substr(value,1,Middleware_strlen(value));// \0 ( + > ~
case 0:case 40:case 43:case 62:case 126:return value;// :
case 58:if(children[++index]==='global')children[index]='',children[++index]='\f'+Middleware_substr(children[index],index=1,-1);// \s
case 32:return index===1?'':value;default:switch(index){case 0:element=value;return Middleware_sizeof(children)>1?'':value;case index=Middleware_sizeof(children)-1:case 2:return index===2?value+element+element:value+element;default:return value;}}});});}}
;// ../../node_modules/stylis/src/Parser.js
/**
 * @param {string} value
 * @return {object[]}
 */function compile(value){return dealloc(parse('',null,null,null,[''],value=alloc(value),0,[0],value));}/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */function parse(value,root,parent,rule,rules,rulesets,pseudo,points,declarations){var index=0;var offset=0;var length=pseudo;var atrule=0;var property=0;var previous=0;var variable=1;var scanning=1;var ampersand=1;var character=0;var type='';var props=rules;var children=rulesets;var reference=rule;var characters=type;while(scanning)switch(previous=character,character=next()){// (
case 40:if(previous!=108&&charat(characters,length-1)==58){if(indexof(characters+=replace(delimit(character),'&','&\f'),'&\f')!=-1)ampersand=-1;break;}// " ' [
case 34:case 39:case 91:characters+=delimit(character);break;// \t \n \r \s
case 9:case 10:case 13:case 32:characters+=whitespace(previous);break;// \
case 92:characters+=escaping(caret()-1,7);continue;// /
case 47:switch(peek()){case 42:case 47:append(comment(commenter(next(),caret()),root,parent),declarations);break;default:characters+='/';}break;// {
case 123*variable:points[index++]=strlen(characters)*ampersand;// } ; \0
case 125*variable:case 59:case 0:switch(character){// \0 }
case 0:case 125:scanning=0;// ;
case 59+offset:if(ampersand==-1)characters=replace(characters,/\f/g,'');if(property>0&&strlen(characters)-length)append(property>32?declaration(characters+';',rule,parent,length-1):declaration(replace(characters,' ','')+';',rule,parent,length-2),declarations);break;// @ ;
case 59:characters+=';';// { rule/at-rule
default:append(reference=ruleset(characters,root,parent,index,offset,rules,points,type,props=[],children=[],length),rulesets);if(character===123)if(offset===0)parse(characters,root,reference,reference,props,rulesets,length,points,children);else switch(atrule===99&&charat(characters,3)===110?100:atrule){// d l m s
case 100:case 108:case 109:case 115:parse(value,reference,reference,rule&&append(ruleset(value,reference,reference,0,0,rules,points,type,rules,props=[],length),children),rules,children,length,points,rule?props:children);break;default:parse(characters,reference,reference,reference,[''],children,0,points,children);}}index=offset=property=0,variable=ampersand=1,type=characters='',length=pseudo;break;// :
case 58:length=1+strlen(characters),property=previous;default:if(variable<1)if(character==123)--variable;else if(character==125&&variable++==0&&prev()==125)continue;switch(characters+=from(character),character*variable){// &
case 38:ampersand=offset>0?1:(characters+='\f',-1);break;// ,
case 44:points[index++]=(strlen(characters)-1)*ampersand,ampersand=1;break;// @
case 64:// -
if(peek()===45)characters+=delimit(next());atrule=peek(),offset=length=strlen(type=characters+=identifier(caret())),character++;break;// -
case 45:if(previous===45&&strlen(characters)==2)variable=0;}}return rulesets;}/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */function ruleset(value,root,parent,index,offset,rules,points,type,props,children,length){var post=offset-1;var rule=offset===0?rules:[''];var size=sizeof(rule);for(var i=0,j=0,k=0;i<index;++i)for(var x=0,y=substr(value,post+1,post=abs(j=points[i])),z=value;x<size;++x)if(z=trim(j>0?rule[x]+' '+y:replace(y,/&\f/g,rule[x])))props[k++]=z;return node(value,root,parent,offset===0?RULESET:type,props,children,length);}/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */function comment(value,root,parent){return node(value,root,parent,COMMENT,from(Tokenizer_char()),substr(value,2,-2),0);}/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */function declaration(value,root,parent,length){return node(value,root,parent,DECLARATION,substr(value,0,length),substr(value,length+1,-1),length);}
;// ../../node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var identifierWithPointTracking=function identifierWithPointTracking(begin,points,index){var previous=0;var character=0;while(true){previous=character;character=peek();// &\f
if(previous===38&&character===12){points[index]=1;}if(token(character)){break;}next();}return slice(begin,position);};var toRules=function toRules(parsed,points){// pretend we've started with a comma
var index=-1;var character=44;do{switch(token(character)){case 0:// &\f
if(character===38&&peek()===12){// this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
// stylis inserts \f after & to know when & where it should replace this sequence with the context selector
// and when it should just concatenate the outer and inner selectors
// it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
points[index]=1;}parsed[index]+=identifierWithPointTracking(position-1,points,index);break;case 2:parsed[index]+=delimit(character);break;case 4:// comma
if(character===44){// colon
parsed[++index]=peek()===58?'&\f':'';points[index]=parsed[index].length;break;}// fallthrough
default:parsed[index]+=from(character);}}while(character=next());return parsed;};var getRules=function getRules(value,points){return dealloc(toRules(alloc(value),points));};// WeakSet would be more appropriate, but only WeakMap is supported in IE11
var fixedElements=/* #__PURE__ */new WeakMap();var compat=function compat(element){if(element.type!=='rule'||!element.parent||// positive .length indicates that this rule contains pseudo
// negative .length indicates that this rule has been already prefixed
element.length<1){return;}var value=element.value;var parent=element.parent;var isImplicitRule=element.column===parent.column&&element.line===parent.line;while(parent.type!=='rule'){parent=parent.parent;if(!parent)return;}// short-circuit for the simplest case
if(element.props.length===1&&value.charCodeAt(0)!==58/* colon */&&!fixedElements.get(parent)){return;}// if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
// then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"
if(isImplicitRule){return;}fixedElements.set(element,true);var points=[];var rules=getRules(value,points);var parentRules=parent.props;for(var i=0,k=0;i<rules.length;i++){for(var j=0;j<parentRules.length;j++,k++){element.props[k]=points[i]?rules[i].replace(/&\f/g,parentRules[j]):parentRules[j]+" "+rules[i];}}};var removeLabel=function removeLabel(element){if(element.type==='decl'){var value=element.value;if(// charcode for l
value.charCodeAt(0)===108&&// charcode for b
value.charCodeAt(2)===98){// this ignores label
element["return"]='';element.value='';}}};/* eslint-disable no-fallthrough */function emotion_cache_browser_esm_prefix(value,length){switch(hash(value,length)){// color-adjust
case 5103:return WEBKIT+'print-'+value+value;// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return WEBKIT+value+value;// appearance, user-select, transform, hyphens, text-size-adjust
case 5349:case 4246:case 4810:case 6968:case 2756:return WEBKIT+value+MOZ+value+MS+value+value;// flex, flex-direction
case 6828:case 4268:return WEBKIT+value+MS+value+value;// order
case 6165:return WEBKIT+value+MS+'flex-'+value+value;// align-items
case 5187:return WEBKIT+value+replace(value,/(\w+).+(:[^]+)/,WEBKIT+'box-$1$2'+MS+'flex-$1$2')+value;// align-self
case 5443:return WEBKIT+value+MS+'flex-item-'+replace(value,/flex-|-self/,'')+value;// align-content
case 4675:return WEBKIT+value+MS+'flex-line-pack'+replace(value,/align-content|flex-|-self/,'')+value;// flex-shrink
case 5548:return WEBKIT+value+MS+replace(value,'shrink','negative')+value;// flex-basis
case 5292:return WEBKIT+value+MS+replace(value,'basis','preferred-size')+value;// flex-grow
case 6060:return WEBKIT+'box-'+replace(value,'-grow','')+WEBKIT+value+MS+replace(value,'grow','positive')+value;// transition
case 4554:return WEBKIT+replace(value,/([^-])(transform)/g,'$1'+WEBKIT+'$2')+value;// cursor
case 6187:return replace(replace(replace(value,/(zoom-|grab)/,WEBKIT+'$1'),/(image-set)/,WEBKIT+'$1'),value,'')+value;// background, background-image
case 5495:case 3959:return replace(value,/(image-set\([^]*)/,WEBKIT+'$1'+'$`$1');// justify-content
case 4968:return replace(replace(value,/(.+:)(flex-)?(.*)/,WEBKIT+'box-pack:$3'+MS+'flex-pack:$3'),/s.+-b[^;]+/,'justify')+WEBKIT+value+value;// (margin|padding)-inline-(start|end)
case 4095:case 3583:case 4068:case 2532:return replace(value,/(.+)-inline(.+)/,WEBKIT+'$1$2')+value;// (min|max)?(width|height|inline-size|block-size)
case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:// stretch, max-content, min-content, fill-available
if(strlen(value)-1-length>6)switch(charat(value,length+1)){// (m)ax-content, (m)in-content
case 109:// -
if(charat(value,length+4)!==45)break;// (f)ill-available, (f)it-content
case 102:return replace(value,/(.+:)(.+)-([^]+)/,'$1'+WEBKIT+'$2-$3'+'$1'+MOZ+(charat(value,length+3)==108?'$3':'$2-$3'))+value;// (s)tretch
case 115:return~indexof(value,'stretch')?emotion_cache_browser_esm_prefix(replace(value,'stretch','fill-available'),length)+value:value;}break;// position: sticky
case 4949:// (s)ticky?
if(charat(value,length+1)!==115)break;// display: (flex|inline-flex)
case 6444:switch(charat(value,strlen(value)-3-(~indexof(value,'!important')&&10))){// stic(k)y
case 107:return replace(value,':',':'+WEBKIT)+value;// (inline-)?fl(e)x
case 101:return replace(value,/(.+:)([^;!]+)(;|!.+)?/,'$1'+WEBKIT+(charat(value,14)===45?'inline-':'')+'box$3'+'$1'+WEBKIT+'$2$3'+'$1'+MS+'$2box$3')+value;}break;// writing-mode
case 5936:switch(charat(value,length+11)){// vertical-l(r)
case 114:return WEBKIT+value+MS+replace(value,/[svh]\w+-[tblr]{2}/,'tb')+value;// vertical-r(l)
case 108:return WEBKIT+value+MS+replace(value,/[svh]\w+-[tblr]{2}/,'tb-rl')+value;// horizontal(-)tb
case 45:return WEBKIT+value+MS+replace(value,/[svh]\w+-[tblr]{2}/,'lr')+value;}return WEBKIT+value+MS+value+value;}return value;}var emotion_cache_browser_esm_prefixer=function prefixer(element,index,children,callback){if(element.length>-1)if(!element["return"])switch(element.type){case DECLARATION:element["return"]=emotion_cache_browser_esm_prefix(element.value,element.length);break;case KEYFRAMES:return serialize([copy(element,{value:replace(element.value,'@','@'+WEBKIT)})],callback);case RULESET:if(element.length)return combine(element.props,function(value){switch(match(value,/(::plac\w+|:read-\w+)/)){// :read-(only|write)
case':read-only':case':read-write':return serialize([copy(element,{props:[replace(value,/:(read-\w+)/,':'+MOZ+'$1')]})],callback);// :placeholder
case'::placeholder':return serialize([copy(element,{props:[replace(value,/:(plac\w+)/,':'+WEBKIT+'input-$1')]}),copy(element,{props:[replace(value,/:(plac\w+)/,':'+MOZ+'$1')]}),copy(element,{props:[replace(value,/:(plac\w+)/,MS+'input-$1')]})],callback);}return'';});}};var defaultStylisPlugins=[emotion_cache_browser_esm_prefixer];var createCache=function createCache(options){var key=options.key;if(key==='css'){var ssrStyles=document.querySelectorAll("style[data-emotion]:not([data-s])");// get SSRed styles out of the way of React's hydration
// document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
// note this very very intentionally targets all style elements regardless of the key to ensure
// that creating a cache works inside of render of a React component
Array.prototype.forEach.call(ssrStyles,function(node){// we want to only move elements which have a space in the data-emotion attribute value
// because that indicates that it is an Emotion 11 server-side rendered style elements
// while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
// Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
// so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
// will not result in the Emotion 10 styles being destroyed
var dataEmotionAttribute=node.getAttribute('data-emotion');if(dataEmotionAttribute.indexOf(' ')===-1){return;}document.head.appendChild(node);node.setAttribute('data-s','');});}var stylisPlugins=options.stylisPlugins||defaultStylisPlugins;var inserted={};var container;var nodesToHydrate=[];{container=options.container||document.head;Array.prototype.forEach.call(// this means we will ignore elements which don't have a space in them which
// means that the style elements we're looking at are only Emotion 11 server-rendered style elements
document.querySelectorAll("style[data-emotion^=\""+key+" \"]"),function(node){var attrib=node.getAttribute("data-emotion").split(' ');for(var i=1;i<attrib.length;i++){inserted[attrib[i]]=true;}nodesToHydrate.push(node);});}var _insert;var omnipresentPlugins=[compat,removeLabel];{var currentSheet;var finalizingPlugins=[stringify,rulesheet(function(rule){currentSheet.insert(rule);})];var serializer=middleware(omnipresentPlugins.concat(stylisPlugins,finalizingPlugins));var stylis=function stylis(styles){return serialize(compile(styles),serializer);};_insert=function insert(selector,serialized,sheet,shouldCache){currentSheet=sheet;stylis(selector?selector+"{"+serialized.styles+"}":serialized.styles);if(shouldCache){cache.inserted[serialized.name]=true;}};}var cache={key:key,sheet:new StyleSheet({key:key,container:container,nonce:options.nonce,speedy:options.speedy,prepend:options.prepend,insertionPoint:options.insertionPoint}),nonce:options.nonce,inserted:inserted,registered:{},insert:_insert};cache.sheet.hydrate(nodesToHydrate);return cache;};
;// ../../node_modules/@emotion/hash/dist/emotion-hash.esm.js
/* eslint-disable */// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str){// 'm' and 'r' are mixing constants generated offline.
// They're not really 'magic', they just happen to work well.
// const m = 0x5bd1e995;
// const r = 24;
// Initialize the hash
var h=0;// Mix 4 bytes at a time into the hash
var k,i=0,len=str.length;for(;len>=4;++i,len-=4){k=str.charCodeAt(i)&0xff|(str.charCodeAt(++i)&0xff)<<8|(str.charCodeAt(++i)&0xff)<<16|(str.charCodeAt(++i)&0xff)<<24;k=/* Math.imul(k, m): */(k&0xffff)*0x5bd1e995+((k>>>16)*0xe995<<16);k^=/* k >>> r: */k>>>24;h=/* Math.imul(k, m): */(k&0xffff)*0x5bd1e995+((k>>>16)*0xe995<<16)^/* Math.imul(h, m): */(h&0xffff)*0x5bd1e995+((h>>>16)*0xe995<<16);}// Handle the last few bytes of the input array
switch(len){case 3:h^=(str.charCodeAt(i+2)&0xff)<<16;case 2:h^=(str.charCodeAt(i+1)&0xff)<<8;case 1:h^=str.charCodeAt(i)&0xff;h=/* Math.imul(h, m): */(h&0xffff)*0x5bd1e995+((h>>>16)*0xe995<<16);}// Do a few final mixes of the hash to ensure the last few
// bytes are well-incorporated.
h^=h>>>13;h=/* Math.imul(h, m): */(h&0xffff)*0x5bd1e995+((h>>>16)*0xe995<<16);return((h^h>>>15)>>>0).toString(36);}
;// ../../node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,// SVG-related properties
fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};
;// ../../node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn){var cache=Object.create(null);return function(arg){if(cache[arg]===undefined)cache[arg]=fn(arg);return cache[arg];};}
;// ../../node_modules/@emotion/serialize/dist/emotion-serialize.esm.js
var emotion_serialize_esm_isDevelopment=false;var hyphenateRegex=/[A-Z]|^ms/g;var animationRegex=/_EMO_([^_]+?)_([^]*?)_EMO_/g;var isCustomProperty=function isCustomProperty(property){return property.charCodeAt(1)===45;};var isProcessableValue=function isProcessableValue(value){return value!=null&&typeof value!=='boolean';};var processStyleName=/* #__PURE__ */memoize(function(styleName){return isCustomProperty(styleName)?styleName:styleName.replace(hyphenateRegex,'-$&').toLowerCase();});var processStyleValue=function processStyleValue(key,value){switch(key){case'animation':case'animationName':{if(typeof value==='string'){return value.replace(animationRegex,function(match,p1,p2){cursor={name:p1,styles:p2,next:cursor};return p1;});}}}if(unitlessKeys[key]!==1&&!isCustomProperty(key)&&typeof value==='number'&&value!==0){return value+'px';}return value;};var noComponentSelectorMessage='Component selectors can only be used in conjunction with '+'@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware '+'compiler transform.';function handleInterpolation(mergedProps,registered,interpolation){if(interpolation==null){return'';}var componentSelector=interpolation;if(componentSelector.__emotion_styles!==undefined){return componentSelector;}switch(typeof interpolation){case'boolean':{return'';}case'object':{var keyframes=interpolation;if(keyframes.anim===1){cursor={name:keyframes.name,styles:keyframes.styles,next:cursor};return keyframes.name;}var serializedStyles=interpolation;if(serializedStyles.styles!==undefined){var next=serializedStyles.next;if(next!==undefined){// not the most efficient thing ever but this is a pretty rare case
// and there will be very few iterations of this generally
while(next!==undefined){cursor={name:next.name,styles:next.styles,next:cursor};next=next.next;}}var styles=serializedStyles.styles+";";return styles;}return createStringFromObject(mergedProps,registered,interpolation);}case'function':{if(mergedProps!==undefined){var previousCursor=cursor;var result=interpolation(mergedProps);cursor=previousCursor;return handleInterpolation(mergedProps,registered,result);}break;}}// finalize string values (regular strings and functions interpolated into css calls)
var asString=interpolation;if(registered==null){return asString;}var cached=registered[asString];return cached!==undefined?cached:asString;}function createStringFromObject(mergedProps,registered,obj){var string='';if(Array.isArray(obj)){for(var i=0;i<obj.length;i++){string+=handleInterpolation(mergedProps,registered,obj[i])+";";}}else{for(var key in obj){var value=obj[key];if(typeof value!=='object'){var asString=value;if(registered!=null&&registered[asString]!==undefined){string+=key+"{"+registered[asString]+"}";}else if(isProcessableValue(asString)){string+=processStyleName(key)+":"+processStyleValue(key,asString)+";";}}else{if(key==='NO_COMPONENT_SELECTOR'&&emotion_serialize_esm_isDevelopment){throw new Error(noComponentSelectorMessage);}if(Array.isArray(value)&&typeof value[0]==='string'&&(registered==null||registered[value[0]]===undefined)){for(var _i=0;_i<value.length;_i++){if(isProcessableValue(value[_i])){string+=processStyleName(key)+":"+processStyleValue(key,value[_i])+";";}}}else{var interpolated=handleInterpolation(mergedProps,registered,value);switch(key){case'animation':case'animationName':{string+=processStyleName(key)+":"+interpolated+";";break;}default:{string+=key+"{"+interpolated+"}";}}}}}}return string;}var labelPattern=/label:\s*([^\s;{]+)\s*(;|$)/g;// this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list
var cursor;function serializeStyles(args,registered,mergedProps){if(args.length===1&&typeof args[0]==='object'&&args[0]!==null&&args[0].styles!==undefined){return args[0];}var stringMode=true;var styles='';cursor=undefined;var strings=args[0];if(strings==null||strings.raw===undefined){stringMode=false;styles+=handleInterpolation(mergedProps,registered,strings);}else{var asTemplateStringsArr=strings;styles+=asTemplateStringsArr[0];}// we start at 1 since we've already handled the first arg
for(var i=1;i<args.length;i++){styles+=handleInterpolation(mergedProps,registered,args[i]);if(stringMode){var templateStringsArr=strings;styles+=templateStringsArr[i];}}// using a global regex with .exec is stateful so lastIndex has to be reset each time
labelPattern.lastIndex=0;var identifierName='';var match;// https://esbench.com/bench/5b809c2cf2949800a0f61fb5
while((match=labelPattern.exec(styles))!==null){identifierName+='-'+match[1];}var name=murmur2(styles)+identifierName;return{name:name,styles:styles,next:cursor};}
;// ../../node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
var isBrowser=true;function getRegisteredStyles(registered,registeredStyles,classNames){var rawClassName='';classNames.split(' ').forEach(function(className){if(registered[className]!==undefined){registeredStyles.push(registered[className]+";");}else if(className){rawClassName+=className+" ";}});return rawClassName;}var registerStyles=function registerStyles(cache,serialized,isStringTag){var className=cache.key+"-"+serialized.name;if(// we only need to add the styles to the registered cache if the
// class name could be used further down
// the tree but if it's a string tag, we know it won't
// so we don't have to add it to registered cache.
// this improves memory usage since we can avoid storing the whole style string
(isStringTag===false||// we need to always store it if we're in compat mode and
// in node since emotion-server relies on whether a style is in
// the registered cache to know whether a style is global or not
// also, note that this check will be dead code eliminated in the browser
isBrowser===false)&&cache.registered[className]===undefined){cache.registered[className]=serialized.styles;}};var insertStyles=function insertStyles(cache,serialized,isStringTag){registerStyles(cache,serialized,isStringTag);var className=cache.key+"-"+serialized.name;if(cache.inserted[serialized.name]===undefined){var current=serialized;do{cache.insert(serialized===current?"."+className:'',current,cache.sheet,true);current=current.next;}while(current!==undefined);}};
;// ../../node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js
function insertWithoutScoping(cache,serialized){if(cache.inserted[serialized.name]===undefined){return cache.insert('',serialized,cache.sheet,true);}}function merge(registered,css,className){var registeredStyles=[];var rawClassName=getRegisteredStyles(registered,registeredStyles,className);if(registeredStyles.length<2){return className;}return rawClassName+css(registeredStyles);}var createEmotion=function createEmotion(options){var cache=createCache(options);cache.sheet.speedy=function(value){this.isSpeedy=value;};cache.compat=true;var css=function css(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}var serialized=serializeStyles(args,cache.registered,undefined);insertStyles(cache,serialized,false);return cache.key+"-"+serialized.name;};var keyframes=function keyframes(){for(var _len2=arguments.length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}var serialized=serializeStyles(args,cache.registered);var animation="animation-"+serialized.name;insertWithoutScoping(cache,{name:serialized.name,styles:"@keyframes "+animation+"{"+serialized.styles+"}"});return animation;};var injectGlobal=function injectGlobal(){for(var _len3=arguments.length,args=new Array(_len3),_key3=0;_key3<_len3;_key3++){args[_key3]=arguments[_key3];}var serialized=serializeStyles(args,cache.registered);insertWithoutScoping(cache,serialized);};var cx=function cx(){for(var _len4=arguments.length,args=new Array(_len4),_key4=0;_key4<_len4;_key4++){args[_key4]=arguments[_key4];}return merge(cache.registered,css,classnames(args));};return{css:css,cx:cx,injectGlobal:injectGlobal,keyframes:keyframes,hydrate:function hydrate(ids){ids.forEach(function(key){cache.inserted[key]=true;});},flush:function flush(){cache.registered={};cache.inserted={};cache.sheet.flush();},sheet:cache.sheet,cache:cache,getRegisteredStyles:getRegisteredStyles.bind(null,cache.registered),merge:merge.bind(null,cache.registered,css)};};var classnames=function classnames(args){var cls='';for(var i=0;i<args.length;i++){var arg=args[i];if(arg==null)continue;var toAdd=void 0;switch(typeof arg){case'boolean':break;case'object':{if(Array.isArray(arg)){toAdd=classnames(arg);}else{toAdd='';for(var k in arg){if(arg[k]&&k){toAdd&&(toAdd+=' ');toAdd+=k;}}}break;}default:{toAdd=arg;}}if(toAdd){cls&&(cls+=' ');cls+=toAdd;}}return cls;};
;// ../../node_modules/@emotion/css/dist/emotion-css.esm.js
var _createEmotion=createEmotion({key:'css'}),flush=_createEmotion.flush,hydrate=_createEmotion.hydrate,cx=_createEmotion.cx,emotion_css_esm_merge=_createEmotion.merge,emotion_css_esm_getRegisteredStyles=_createEmotion.getRegisteredStyles,injectGlobal=_createEmotion.injectGlobal,keyframes=_createEmotion.keyframes,css=_createEmotion.css,sheet=_createEmotion.sheet,cache=_createEmotion.cache;
;// ./src/autofill/content/components/constants/styles.ts
const lightTheme = {
    transparent: {
        hover: `rgb(0 0 0 / 0.02)`,
    },
    shadow: `rgba(168 179 200)`,
    primary: {
        100: `rgba(219, 229, 246)`,
        300: `rgba(121, 161, 233)`,
        600: `rgba(23, 93, 220)`,
        700: `rgba(26, 65, 172)`,
    },
    secondary: {
        100: `rgba(230, 233, 239)`,
        300: `rgba(168, 179, 200)`,
        500: `rgba(90, 109, 145)`,
        600: `rgba(83, 99, 131)`,
        700: `rgba(63, 75, 99)`,
    },
    success: {
        100: `rgba(219, 229, 246)`,
        600: `rgba(121, 161, 233)`,
        700: `rgba(26, 65, 172)`,
    },
    danger: {
        100: `rgba(255, 236, 239)`,
        600: `rgba(203, 38, 58)`,
        700: `rgba(149, 27, 42)`,
    },
    warning: {
        100: `rgba(255, 248, 228)`,
        600: `rgba(255, 191, 0)`,
        700: `rgba(172, 88, 0)`,
    },
    info: {
        100: `rgba(219, 229, 246)`,
        600: `rgba(121, 161, 233)`,
        700: `rgba(26, 65, 172)`,
    },
    art: {
        primary: `rgba(2, 15, 102)`,
        accent: `rgba(44, 221, 223)`,
    },
    text: {
        main: `rgba(27, 32, 41)`,
        muted: `rgba(90, 109, 145)`,
        contrast: `rgba(255, 255, 255)`,
        alt2: `rgba(255, 255, 255)`,
        code: `rgba(192, 17, 118)`,
    },
    background: {
        DEFAULT: `rgba(255, 255, 255)`,
        alt: `rgba(243, 246, 249)`,
        alt2: `rgba(23, 92, 219)`,
        alt3: `rgba(26, 65, 172)`,
        alt4: `rgba(2, 15, 102)`,
    },
    brandLogo: `rgba(23, 93, 220)`,
    passwordSpecial: `rgba(184, 0, 23)`,
    passwordNumber: `rgba(20, 82, 193)`,
};
const darkTheme = {
    transparent: {
        hover: `rgb(255 255 255 / 0.02)`,
    },
    shadow: `rgba(0, 0, 0)`,
    primary: {
        100: `rgba(26, 39, 78)`,
        300: `rgba(26, 65, 172)`,
        600: `rgba(101, 171, 255)`,
        700: `rgba(170, 195, 239)`,
    },
    secondary: {
        100: `rgba(48, 57, 70)`,
        300: `rgba(82, 91, 106)`,
        500: `rgba(121, 128, 142)`,
        600: `rgba(143, 152, 166)`,
        700: `rgba(158, 167, 181)`,
    },
    success: {
        100: `rgba(11, 111, 21)`,
        600: `rgba(107, 241, 120)`,
        700: `rgba(191, 236, 195)`,
    },
    danger: {
        100: `rgba(149, 27, 42)`,
        600: `rgba(255, 78, 99)`,
        700: `rgba(255, 236, 239)`,
    },
    warning: {
        100: `rgba(172, 88, 0)`,
        600: `rgba(255, 191, 0)`,
        700: `rgba(255, 248, 228)`,
    },
    info: {
        100: `rgba(26, 65, 172)`,
        600: `rgba(121, 161, 233)`,
        700: `rgba(219, 229, 246)`,
    },
    art: {
        primary: `rgba(243, 246, 249)`,
        accent: `rgba(44, 221, 233)`,
    },
    text: {
        main: `rgba(243, 246, 249)`,
        muted: `rgba(136, 152, 181)`,
        contrast: `rgba(18 26 39)`,
        alt2: `rgba(255, 255, 255)`,
        code: `rgba(255, 143, 208)`,
    },
    background: {
        DEFAULT: `rgba(32, 39, 51)`,
        alt: `rgba(18, 26, 39)`,
        alt2: `rgba(47, 52, 61)`,
        alt3: `rgba(48, 57, 70)`,
        alt4: `rgba(18, 26, 39)`,
    },
    brandLogo: `rgba(255, 255, 255)`,
    passwordSpecial: `rgba(255, 141, 133)`,
    passwordNumber: `rgba(111, 157, 241)`,
};
const themes = {
    light: lightTheme,
    dark: darkTheme,
    // For compatibility
    system: lightTheme,
};
const spacing = {
    4: `16px`,
    3: `12px`,
    2: `8px`,
    "1.5": `6px`,
    1: `4px`,
};
const border = {
    radius: {
        large: `8px`,
        full: `9999px`,
    },
};
const typography = {
    body1: `
    line-height: 24px;
    font-family: Inter, sans-serif;
    font-size: 16px;
  `,
    body2: `
    line-height: 20px;
    font-family: Inter, sans-serif;
    font-size: 14px;
  `,
    helperMedium: `
    line-height: 16px;
    font-family: Inter, sans-serif;
    font-size: 12px;
  `,
};
const ruleNames = {
    fill: "fill",
    stroke: "stroke",
};
/*
 * `color` is an intentionally generic name here, since either fill or stroke may apply, due to
 * inconsistent SVG construction. This consequently precludes dynamic multi-colored icons here.
 */
const buildIconColorRule = (color, rule = ruleNames.fill) => `
  ${rule}: ${color};
`;
const resolveIconColor = ({ color, disabled, theme }) => disabled ? themes[theme].secondary["300"] : color || themes[theme].text.main;
const animations = {
    spin: `
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  `,
};
function scrollbarStyles(theme, color) {
    const thumbColor = (color === null || color === void 0 ? void 0 : color.thumb) || themes[theme].secondary["500"];
    const trackColor = (color === null || color === void 0 ? void 0 : color.track) || themes[theme].background.alt;
    return {
        /* FireFox & Chrome support */
        default: `
      scrollbar-color: ${thumbColor} ${trackColor};
    `,
        /* Safari Support */
        safari: `
      ::-webkit-scrollbar {
        overflow: auto;
      }
      ::-webkit-scrollbar-thumb {
        border-width: 4px;
        border-style: solid;
        border-radius: 0.5rem;
        border-color: transparent;
        background-clip: content-box;
        background-color: ${thumbColor};
      }
      ::-webkit-scrollbar-track {
        ${trackColor};
      }
      ::-webkit-scrollbar-thumb:hover {
        ${themes[theme].secondary["600"]};
      }
    `,
    };
}

;// ./src/autofill/content/components/icons/angle-down.ts
/* unused harmony import specifier */ var angle_down_css;
/* unused harmony import specifier */ var html;
/* unused harmony import specifier */ var angle_down_themes;
/* unused harmony import specifier */ var angle_down_buildIconColorRule;
/* unused harmony import specifier */ var angle_down_ruleNames;



function AngleDown({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? angle_down_themes[theme].secondary["300"] : color || angle_down_themes[theme].text.main;
    return html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 8"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${angle_down_css(angle_down_buildIconColorRule(shapeColor, angle_down_ruleNames.fill))}
        d="M13.53.47a.75.75 0 0 0-1.06 0L7 5.94 1.53.47A.75.75 0 1 0 .47 1.53l6 6a.75.75 0 0 0 1.06 0l6-6a.75.75 0 0 0 0-1.06Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/angle-up.ts
/* unused harmony import specifier */ var angle_up_css;
/* unused harmony import specifier */ var angle_up_html;
/* unused harmony import specifier */ var angle_up_themes;
/* unused harmony import specifier */ var angle_up_buildIconColorRule;
/* unused harmony import specifier */ var angle_up_ruleNames;



function AngleUp({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? angle_up_themes[theme].secondary["300"] : color || angle_up_themes[theme].text.main;
    return angle_up_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 8"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${angle_up_css(angle_up_buildIconColorRule(shapeColor, angle_up_ruleNames.fill))}
        d="M.47 7.53a.75.75 0 0 0 1.06 0L7 2.06l5.47 5.47a.75.75 0 1 0 1.06-1.06l-6-6a.75.75 0 0 0-1.06 0l-6 6a.75.75 0 0 0 0 1.06Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/shield.ts
/* unused harmony import specifier */ var shield_css;
/* unused harmony import specifier */ var shield_html;
/* unused harmony import specifier */ var shield_themes;
/* unused harmony import specifier */ var shield_buildIconColorRule;
/* unused harmony import specifier */ var shield_ruleNames;



function Shield({ ariaHidden = true, color, theme }) {
    const shapeColor = color || shield_themes[theme].brandLogo;
    return shield_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 16"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${shield_css(shield_buildIconColorRule(shapeColor, shield_ruleNames.fill))}
        d="M13.469.2A.647.647 0 0 0 13 0H1a.639.639 0 0 0-.468.2.641.641 0 0 0-.2.468v8a4.81 4.81 0 0 0 .348 1.777c.216.557.507 1.083.865 1.563.367.48.779.925 1.229 1.329.417.383.857.741 1.317 1.073.4.284.82.553 1.26.807.44.254.75.425.932.515.183.09.33.16.44.208.087.041.181.062.277.06a.58.58 0 0 0 .27-.063c.113-.05.259-.118.444-.208s.5-.262.932-.515c.432-.253.857-.523 1.26-.807.46-.332.9-.69 1.319-1.073.45-.404.861-.849 1.228-1.33.357-.48.648-1.005.865-1.562a4.79 4.79 0 0 0 .348-1.777v-8A.63.63 0 0 0 13.47.2Zm-1.547 8.54c0 2.9-4.921 5.392-4.921 5.392V1.714h4.92v7.027Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/brand-icon-container.ts
/* unused harmony import specifier */ var brand_icon_container_html;
/* unused harmony import specifier */ var brand_icon_container_Shield;



function BrandIconContainer({ iconLink, theme }) {
    const Icon = brand_icon_container_html `<div class=${brandIconContainerStyles}>${brand_icon_container_Shield({ theme })}</div>`;
    return iconLink ? brand_icon_container_html `<a href="${iconLink}" target="_blank" rel="noreferrer">${Icon}</a>` : Icon;
}
const brandIconContainerStyles = css `
  display: flex;
  justify-content: center;
  width: 24px;
  height: 24px;

  > svg {
    width: auto;
    height: 100%;
  }
`;

;// ./src/autofill/content/components/icons/business.ts
/* unused harmony import specifier */ var business_css;
/* unused harmony import specifier */ var business_html;
/* unused harmony import specifier */ var business_themes;
/* unused harmony import specifier */ var business_buildIconColorRule;
/* unused harmony import specifier */ var business_ruleNames;



function Business({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? business_themes[theme].secondary["300"] : color || business_themes[theme].text.main;
    return business_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 16"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${business_css(business_buildIconColorRule(shapeColor, business_ruleNames.fill))}
        d="M3.25 3a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5ZM7.25 3a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5ZM7.25 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5ZM6.5 9.75A.75.75 0 0 1 7.25 9h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM2.5 6.75A.75.75 0 0 1 3.25 6h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM3.25 9a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z"
      />
      <path
        class=${business_css(business_buildIconColorRule(shapeColor, business_ruleNames.fill))}
        fill-rule="evenodd"
        d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1Zm.5 1.5v13H4V13a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5h2.5v-13h-9Z"
        clip-rule="evenodd"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/close.ts
/* unused harmony import specifier */ var close_css;
/* unused harmony import specifier */ var close_html;
/* unused harmony import specifier */ var close_themes;
/* unused harmony import specifier */ var close_buildIconColorRule;
/* unused harmony import specifier */ var close_ruleNames;



function Close({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? close_themes[theme].secondary["300"] : color || close_themes[theme].text.main;
    return close_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${close_css(close_buildIconColorRule(shapeColor, close_ruleNames.fill))}
        d="M.22.22a.75.75 0 0 1 1.06 0L7 5.94 12.72.22a.75.75 0 1 1 1.06 1.06L8.06 7l5.72 5.72a.75.75 0 1 1-1.06 1.06L7 8.06l-5.72 5.72a.75.75 0 0 1-1.06-1.06L5.94 7 .22 1.28a.75.75 0 0 1 0-1.06Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/collection-shared.ts
/* unused harmony import specifier */ var collection_shared_css;
/* unused harmony import specifier */ var collection_shared_html;
/* unused harmony import specifier */ var collection_shared_themes;
/* unused harmony import specifier */ var collection_shared_buildIconColorRule;
/* unused harmony import specifier */ var collection_shared_ruleNames;



function CollectionShared({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? collection_shared_themes[theme].secondary["300"] : color || collection_shared_themes[theme].text.main;
    return collection_shared_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${collection_shared_css(collection_shared_buildIconColorRule(shapeColor, collection_shared_ruleNames.fill))}
        d="M3.5.75A.75.75 0 0 1 4.25 0h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 3.5.75ZM2.25 2a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5ZM6 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM10 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 11.46a1.928 1.928 0 0 0-.586-1.386 2.035 2.035 0 0 0-2.828 0A1.928 1.928 0 0 0 3 11.461c0 .298.241.539.54.539h2.92a.54.54 0 0 0 .54-.54ZM8 11.46a2.928 2.928 0 0 0-.371-1.426A2.005 2.005 0 0 1 9 9.5a2.035 2.035 0 0 1 1.414.574A1.928 1.928 0 0 1 11 11.461a.54.54 0 0 1-.54.539H7.904c.063-.168.097-.35.097-.54Z"
      />
      <path
        class=${collection_shared_css(collection_shared_buildIconColorRule(shapeColor, collection_shared_ruleNames.fill))}
        fill-rule="evenodd"
        d="M12 4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10Zm0 1.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5h10Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/exclamation-triangle.ts
/* unused harmony import specifier */ var exclamation_triangle_css;
/* unused harmony import specifier */ var exclamation_triangle_html;
/* unused harmony import specifier */ var exclamation_triangle_themes;
/* unused harmony import specifier */ var exclamation_triangle_buildIconColorRule;
/* unused harmony import specifier */ var exclamation_triangle_ruleNames;



function ExclamationTriangle({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? exclamation_triangle_themes[theme].secondary["300"] : color || exclamation_triangle_themes[theme].text.main;
    return exclamation_triangle_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 15"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${exclamation_triangle_css(exclamation_triangle_buildIconColorRule(shapeColor, exclamation_triangle_ruleNames.fill))}
        d="M9 11C9 11.5523 8.55229 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55229 10 9 10.4477 9 11Z"
      />
      <path
        class=${exclamation_triangle_css(exclamation_triangle_buildIconColorRule(shapeColor, exclamation_triangle_ruleNames.fill))}
        d="M7.31639 5C7.01564 5 6.78295 5.26359 6.82025 5.56202L7.19525 8.56202C7.22653 8.81223 7.43923 9 7.69139 9H8.30861C8.56077 9 8.77347 8.81223 8.80475 8.56202L9.17975 5.56202C9.21705 5.26359 8.98436 5 8.68361 5H7.31639Z"
      />
      <path
        class=${exclamation_triangle_css(exclamation_triangle_buildIconColorRule(shapeColor, exclamation_triangle_ruleNames.fill))}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.37384 1.01584C8.76324 -0.04174 7.23675 -0.041739 6.62616 1.01584L0.2149 12.1205C-0.395695 13.1781 0.36755 14.5 1.58874 14.5H14.4113C15.6325 14.5 16.3957 13.1781 15.7851 12.1205L9.37384 1.01584ZM14.4861 12.8705L8.0748 1.76584C8.06066 1.74135 8.05029 1.7355 8.04562 1.73291C8.03694 1.7281 8.02122 1.72266 8 1.72266C7.97878 1.72266 7.96305 1.7281 7.95438 1.73291C7.94971 1.7355 7.93934 1.74135 7.9252 1.76584L1.51394 12.8705C1.4998 12.895 1.49992 12.9069 1.50001 12.9122C1.50018 12.9221 1.50333 12.9385 1.51394 12.9568C1.52455 12.9752 1.53713 12.9861 1.54563 12.9912C1.55021 12.994 1.56046 13 1.58874 13H14.4113C14.4395 13 14.4498 12.994 14.4544 12.9912C14.4629 12.9861 14.4754 12.9752 14.4861 12.9568C14.4967 12.9385 14.4998 12.9221 14.5 12.9122C14.5001 12.9069 14.5002 12.895 14.4861 12.8705Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/external-link.ts



function ExternalLink({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? themes[theme].secondary["300"] : color || themes[theme].text.main;
    return lit_html_b `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${css(buildIconColorRule(shapeColor, ruleNames.fill))}
        d="M1.5 2.75c0-.69.56-1.25 1.25-1.25h3.5a.75.75 0 0 0 0-1.5h-3.5A2.75 2.75 0 0 0 0 2.75v8.5A2.75 2.75 0 0 0 2.75 14h8.5A2.75 2.75 0 0 0 14 11.25v-3.5a.75.75 0 0 0-1.5 0v3.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5Z"
      />
      <path
        class=${css(buildIconColorRule(shapeColor, ruleNames.fill))}
        d="M9.75 0a.75.75 0 0 0 0 1.5h1.69L7.22 5.72a.75.75 0 0 0 1.06 1.06l4.22-4.22v1.69a.75.75 0 0 0 1.5 0V.75a.75.75 0 0 0-.75-.75h-3.5Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/family.ts
/* unused harmony import specifier */ var family_css;
/* unused harmony import specifier */ var family_html;
/* unused harmony import specifier */ var family_themes;
/* unused harmony import specifier */ var family_buildIconColorRule;
/* unused harmony import specifier */ var family_ruleNames;



function Family({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? family_themes[theme].secondary["300"] : color || family_themes[theme].text.main;
    return family_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${family_css(family_buildIconColorRule(shapeColor, family_ruleNames.fill))}
        fill-rule="evenodd"
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.47 6.47 0 0 1-.932 3.356 3.732 3.732 0 0 0-1.106-.784 3.547 3.547 0 0 0-.516-.19 2 2 0 1 0-3.444-1.297c-.323-.216-.681-.4-1.069-.536a2.5 2.5 0 1 0-3.065-.155 5.405 5.405 0 0 0-1.59.674 3.912 3.912 0 0 0-.977.893A6.5 6.5 0 1 1 14.5 8ZM2.531 11.514a.75.75 0 0 0 .103-.13c.276-.436.552-.801.942-1.047a3.837 3.837 0 0 1 1.177-.492 5.243 5.243 0 0 1 .845-.095h.007l.022.001h.023c.436 0 .865.07 1.262.205.381.13.733.335 1.037.584.175.143.324.3.448.465l.164.226a4.13 4.13 0 0 0-1.035 1.565 4.407 4.407 0 0 0-.276 1.537c0 .043.004.085.01.125a6.5 6.5 0 0 1-4.729-2.944Zm10.033.964.07.08a6.481 6.481 0 0 1-3.894 1.9.757.757 0 0 0 .01-.125c0-.35.062-.694.181-1.013a2.63 2.63 0 0 1 .505-.842c.213-.237.462-.42.73-.543.267-.123.55-.185.834-.185.284 0 .567.062.835.185.267.123.516.306.729.543ZM7 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM11 9a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/folder.ts
/* unused harmony import specifier */ var folder_css;
/* unused harmony import specifier */ var folder_html;
/* unused harmony import specifier */ var folder_themes;
/* unused harmony import specifier */ var folder_buildIconColorRule;
/* unused harmony import specifier */ var folder_ruleNames;



function Folder({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? folder_themes[theme].secondary["300"] : color || folder_themes[theme].text.main;
    return folder_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 13"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${folder_css(folder_buildIconColorRule(shapeColor, folder_ruleNames.fill))}
        d="M2 0a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8L6.586.586A2 2 0 0 0 5.172 0H2Zm5.379 3.5L5.525 1.646a.5.5 0 0 0-.353-.146H2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H7.379Z"
        fill-rule="evenodd"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/globe.ts



function Globe({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? themes[theme].secondary["300"] : color || themes[theme].text.main;
    return lit_html_b `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${css(buildIconColorRule(shapeColor, ruleNames.fill))}
        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 14.5c.23 0 .843-.226 1.487-1.514.524-1.048.906-2.526.994-4.236H5.519c.088 1.71.47 3.188.994 4.236C7.157 14.274 7.77 14.5 8 14.5ZM5.52 7.25h4.96c-.087-1.71-.47-3.188-.993-4.236C8.843 1.726 8.23 1.5 8 1.5c-.23 0-.843.226-1.487 1.514C5.99 4.062 5.607 5.54 5.52 7.25Zm6.463 0h2.474a6.506 6.506 0 0 0-3.766-5.168c.718 1.305 1.197 3.125 1.292 5.168Zm-7.966 0c.095-2.043.574-3.863 1.292-5.168A6.506 6.506 0 0 0 1.543 7.25h2.474Zm7.966 1.5c-.095 2.043-.574 3.863-1.292 5.168a6.506 6.506 0 0 0 3.766-5.168h-2.474Zm-6.677 5.185c-.718-1.305-1.197-3.125-1.292-5.168H1.54a6.506 6.506 0 0 0 3.766 5.168Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/lock.ts



function Lock(props) {
    const { ariaHidden = true } = props;
    const shapeColor = resolveIconColor(props);
    return lit_html_b `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${css(buildIconColorRule(shapeColor, ruleNames.fill))}
        d="M10 10a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0 0 1.5h2.5A.75.75 0 0 0 10 10"
      />
      <path
        class=${css(buildIconColorRule(shapeColor, ruleNames.fill))}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 4a4 4 0 0 1 7.153-2.462.75.75 0 1 1-1.182.924A2.5 2.5 0 0 0 5.5 4v1H13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1zM3 6.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/passkey.ts



function Passkey(props) {
    const { ariaHidden = true } = props;
    const shapeColor = resolveIconColor(props);
    return lit_html_b `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${css(buildIconColorRule(shapeColor, ruleNames.fill))}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 3c0 1.026-.514 1.93-1.3 2.472a6 6 0 0 1 .465.143 5.9 5.9 0 0 1 1.86 1.054c.455.385.836.836 1.125 1.335a.75.75 0 1 1-1.3.75 3.6 3.6 0 0 0-.793-.94 4.4 4.4 0 0 0-1.66-.87 5.1 5.1 0 0 0-3.065.086 4.4 4.4 0 0 0-1.389.784c-.33.28-.596.598-.793.94a.75.75 0 0 1-1.3-.75c.289-.5.67-.95 1.124-1.335a5.9 5.9 0 0 1 1.861-1.054 6 6 0 0 1 .465-.143A3 3 0 1 1 11 3M8 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M7.83 14a3.001 3.001 0 1 1 0-2h4.582a.25.25 0 0 1 .156.055l.972.777a.56.56 0 0 1 .046.832L12.41 14.84a.547.547 0 0 1-.824-.059L11 14h-.25l-.6.8a.5.5 0 0 1-.8 0l-.6-.8zM4.5 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/pencil-square.ts
/* unused harmony import specifier */ var pencil_square_css;
/* unused harmony import specifier */ var pencil_square_html;
/* unused harmony import specifier */ var pencil_square_themes;
/* unused harmony import specifier */ var pencil_square_buildIconColorRule;
/* unused harmony import specifier */ var pencil_square_ruleNames;



function PencilSquare({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? pencil_square_themes[theme].secondary["300"] : color || pencil_square_themes[theme].text.main;
    return pencil_square_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${pencil_square_css(pencil_square_buildIconColorRule(shapeColor, pencil_square_ruleNames.fill))}
        d="M11.013.677a1.75 1.75 0 0 1 2.474 0l.836.836a1.75 1.75 0 0 1 0 2.475L9.03 9.28a.75.75 0 0 1-.348.197l-3 .75a.75.75 0 0 1-.91-.91l.75-3a.75.75 0 0 1 .198-.348L11.013.677Zm1.414 1.06a.25.25 0 0 0-.354 0l-.646.647a.75.75 0 0 1 .103.086l1 1a.751.751 0 0 1 .087.103l.646-.646a.25.25 0 0 0 0-.353l-.836-.836Zm-.854 2.88a.752.752 0 0 1-.103-.087l-1-1a.756.756 0 0 1-.087-.103L6.928 6.884 6.531 8.47l1.586-.397 3.456-3.456Z"
      />
      <path
        class=${pencil_square_css(pencil_square_buildIconColorRule(shapeColor, pencil_square_ruleNames.fill))}
        d="M2.75 2.5c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25v-3.5a.75.75 0 0 1 1.5 0v3.5A2.75 2.75 0 0 1 11.25 15h-8.5A2.75 2.75 0 0 1 0 12.25v-8.5A2.75 2.75 0 0 1 2.75 1h3.5a.75.75 0 0 1 0 1.5h-3.5Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/plus.ts
/* unused harmony import specifier */ var plus_css;
/* unused harmony import specifier */ var plus_html;
/* unused harmony import specifier */ var plus_resolveIconColor;
/* unused harmony import specifier */ var plus_buildIconColorRule;
/* unused harmony import specifier */ var plus_ruleNames;



function Plus(props) {
    const { ariaHidden = true } = props;
    const shapeColor = plus_resolveIconColor(props);
    return plus_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${plus_css(plus_buildIconColorRule(shapeColor, plus_ruleNames.fill))}
        d="M8 1.006a.75.75 0 0 1 .75.75V7.25h5.517a.75.75 0 0 1 0 1.5H8.75v5.537a.75.75 0 0 1-1.5 0V8.75H1.746a.75.75 0 1 1 0-1.5H7.25V1.756a.75.75 0 0 1 .75-.75"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/key.ts



function Key(props) {
    const { ariaHidden = true } = props;
    const shapeColor = resolveIconColor(props);
    const fillClass = css(buildIconColorRule(shapeColor, ruleNames.fill));
    return lit_html_b `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path class=${fillClass} d="M15.75 9.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
      <path
        class=${fillClass}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.5 17a7.473 7.473 0 0 1-3.055-.648L10.75 17v1.5a1 1 0 0 1-1 1h-1.5V21a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707L7.32 11.68A7.5 7.5 0 1 1 14.5 17Zm-5.482-4.896-.261-.86a6 6 0 1 1 3.3 3.738l-.909-.406-1.898 1.772V18h-2.5v2.5H3.5v-2.879l5.518-5.517Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/refresh.ts



function Refresh(props) {
    const { ariaHidden = true } = props;
    const shapeColor = resolveIconColor(props);
    return lit_html_b `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${css(buildIconColorRule(shapeColor, ruleNames.fill))}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.052 10.777a.75.75 0 0 0 1.49.162c.393-3.61 3.514-6.443 7.329-6.443 2.737 0 5.12 1.46 6.39 3.62h-1.993a.75.75 0 0 0 0 1.5h3.981a.75.75 0 0 0 .75-.75V4.883a.75.75 0 1 0-1.5 0v2.38a8.897 8.897 0 0 0-7.628-4.267c-4.566 0-8.343 3.395-8.82 7.78Zm17.89 2.44a.75.75 0 0 0-1.49-.162c-.393 3.61-3.514 6.442-7.329 6.442a7.396 7.396 0 0 1-6.39-3.62h1.996a.75.75 0 0 0 0-1.5H3.747a.75.75 0 0 0-.75.75v3.983a.75.75 0 0 0 1.5 0v-2.376a8.897 8.897 0 0 0 7.626 4.263c4.566 0 8.343-3.395 8.82-7.78Zm-8.19-3.78a.75.75 0 0 0-1.5 0v1.594l-1.497-.49a.75.75 0 0 0-.467 1.425l1.51.494-.942 1.32a.75.75 0 1 0 1.22.871l.925-1.295.925 1.295a.75.75 0 1 0 1.22-.871l-.941-1.32 1.51-.494a.75.75 0 1 0-.467-1.426l-1.497.49V9.438Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/spinner.ts
/* unused harmony import specifier */ var spinner_css;
/* unused harmony import specifier */ var spinner_html;
/* unused harmony import specifier */ var spinner_themes;
/* unused harmony import specifier */ var spinner_buildIconColorRule;
/* unused harmony import specifier */ var spinner_ruleNames;



function Spinner({ ariaHidden = true, color, disabled, theme, disableSpin = false, }) {
    const shapeColor = disabled ? spinner_themes[theme].secondary["300"] : color || spinner_themes[theme].text.main;
    return spinner_html `
    <svg
      class=${disableSpin ? "" : animation}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${spinner_css(spinner_buildIconColorRule(shapeColor, spinner_ruleNames.fill))}
        d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM14.5 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM11.536 11.536a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12ZM9.5 14.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM0 8a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM4.464 13.657a1.5 1.5 0 1 1-2.12-2.121 1.5 1.5 0 0 1 2.12 2.12ZM2.343 2.343a1.5 1.5 0 1 1 2.121 2.121 1.5 1.5 0 0 1-2.12-2.12Z"
      />
    </svg>
  `;
}
const animation = css `
  animation: ${keyframes(animations.spin)} 2s infinite linear;
`;

;// ./src/autofill/content/components/icons/user.ts
/* unused harmony import specifier */ var user_css;
/* unused harmony import specifier */ var user_html;
/* unused harmony import specifier */ var user_themes;
/* unused harmony import specifier */ var user_buildIconColorRule;
/* unused harmony import specifier */ var user_ruleNames;



function User({ ariaHidden = true, color, disabled, theme }) {
    const shapeColor = disabled ? user_themes[theme].secondary["300"] : color || user_themes[theme].text.main;
    return user_html `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 15"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${user_css(user_buildIconColorRule(shapeColor, user_ruleNames.fill))}
        d="M9.203 7.339a4 4 0 1 0-4.407 0A7.033 7.033 0 0 0 2.05 8.953a6.655 6.655 0 0 0-1.517 2.162A6.393 6.393 0 0 0 0 13.667C0 14.403.597 15 1.333 15h11.334c.736 0 1.333-.597 1.333-1.333 0-.876-.181-1.743-.533-2.552a6.654 6.654 0 0 0-1.517-2.162 7.032 7.032 0 0 0-2.747-1.614ZM9.5 4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm2.592 7.714c.247.57.384 1.175.405 1.786H1.503a4.897 4.897 0 0 1 .405-1.786 5.156 5.156 0 0 1 1.177-1.675 5.534 5.534 0 0 1 1.787-1.136A5.805 5.805 0 0 1 7 8.5c.732 0 1.456.137 2.128.403.673.265 1.28.652 1.787 1.136a5.156 5.156 0 0 1 1.177 1.675Z"
      />
    </svg>
  `;
}

;// ./src/autofill/content/components/icons/index.ts





















;// ./src/autofill/content/components/inline-menu/container.ts



function InlineMenuContainer({ children, dataTestId, theme }) {
    return lit_html_b `
    <div data-testid="${dataTestId}" class=${inlineMenuContainerStyles(theme)}>${children}</div>
  `;
}
const inlineMenuContainerStyles = (theme) => css `
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  border: 1px solid ${themes[theme].secondary["300"]};
  border-radius: ${spacing["1"]};
  background-color: ${themes[theme].background.DEFAULT};
  color: ${themes[theme].text.main};
`;

;// ./src/autofill/utils/event-security.ts
/**
 * Event security utilities for validating trusted events
 */
class EventSecurity {
    /**
     * Validates that an event is trusted (originated from user agent)
     * @param event - The event to validate
     * @returns true if the event is trusted, false otherwise
     */
    static isEventTrusted(event) {
        return event.isTrusted;
    }
}

;// ./src/autofill/content/components/inline-menu/prompt.ts





function InlineMenuPrompt({ message, actionText, i18n, theme, handleAction, handleKeyUp, icon, dataTestId, actionDataTestId, }) {
    const handleButtonClick = (event) => {
        if (EventSecurity.isEventTrusted(event)) {
            handleAction(event);
        }
    };
    const handleButtonKeyUp = (event) => {
        if (handleKeyUp && EventSecurity.isEventTrusted(event)) {
            handleKeyUp(event);
        }
    };
    return InlineMenuContainer({
        theme,
        dataTestId,
        children: lit_html_b `
      ${message
            ? lit_html_b `<div class=${messageStyles(theme)} title=${message}>${message}</div>`
            : A}
      <div class=${actionContainerStyles(theme, !!message)}>
        <button
          type="button"
          class=${actionButtonStyles(theme)}
          tabindex="-1"
          data-testid="${actionDataTestId}"
          aria-label=${i18n.actionAria}
          @click=${handleButtonClick}
          @keyup=${handleButtonKeyUp}
        >
          ${icon
            ? lit_html_b `
                  <span class=${actionIconStyles}>
                    ${icon({ theme, color: themes[theme].primary["600"] })}
                  </span>
                `
            : null}
          <span>${actionText}</span>
        </button>
      </div>
    `,
    });
}
const messageStyles = (theme) => css `
  ${typography.body1}

  box-sizing: border-box;
  width: 100%;
  padding: ${spacing["2"]};
  color: ${themes[theme].text.main};
`;
const actionContainerStyles = (theme, borderedTop) => css `
  box-sizing: border-box;
  width: 100%;
  padding: calc(${spacing["1"]} / 2);
  transition: background-color 0.2s ease-in-out;
  background-color: ${themes[theme].background.DEFAULT};
  ${borderedTop
    ? css `
          border-top: 1px solid ${themes[theme].secondary["300"]};
        `
    : css ``}

  :hover {
    background-color: ${themes[theme].background.alt};
  }
`;
const actionButtonStyles = (theme) => css `
  ${typography.body1}

  user-select: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${spacing["2"]};
  width: 100%;
  margin: 0;
  padding: ${spacing["2"]};
  border: none;
  border-radius: ${spacing["1"]};
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-weight: 500;
  color: ${themes[theme].primary["600"]};

  :focus-visible {
    outline: 2px solid ${themes[theme].primary["600"]};
    outline-offset: 1px;
  }
`;
const actionIconStyles = css `
  display: inline-flex;
  flex-shrink: 0;
  width: ${spacing["4"]};
  height: ${spacing["4"]};

  > svg,
  > span {
    width: ${spacing["4"]};
    height: ${spacing["4"]};
  }

  svg {
    width: ${spacing["4"]};
    height: ${spacing["4"]};
    vertical-align: middle;
  }
`;

;// ./src/autofill/content/components/cipher/cipher-icon.ts



/**
 * @param {string} props.color contextual color override if no icon URI is available
 * @param {string} props.size valid CSS `width` value, represents the width-basis of the graphic, with height maintaining original aspect-ratio
 */
function CipherIcon({ color, size, theme, uri }) {
    const iconClass = cipherIconStyle({ width: size });
    return uri
        ? lit_html_b `<img class=${iconClass} src=${uri} />`
        : lit_html_b `<span class=${iconClass}>${Globe({ color, theme })}</span>`;
}
const cipherIconStyle = ({ width }) => css `
  width: ${width};
  height: fit-content;
  max-height: 24px; /* fallback for Safari */
`;

;// ./src/autofill/content/components/inline-menu/cipher-details.ts




function CipherDetails({ cipher, theme }) {
    var _a, _b, _c, _d, _e;
    const passkey = (_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey;
    const name = lit_html_b `
    <span title=${cipher.name} class=${primaryTextStyles(theme)}>${cipher.name}</span>
  `;
    if (passkey) {
        const showRpName = cipher.name !== passkey.rpName;
        const secondary = ((_b = cipher.login) === null || _b === void 0 ? void 0 : _b.username) || passkey.userName;
        const firstLine = showRpName ? passkey.rpName : secondary;
        const secondLine = showRpName ? secondary : undefined;
        return lit_html_b `
      <div>
        ${name}
        ${firstLine
            ? lit_html_b `<span title=${firstLine} class=${passkeySubtitleStyles(theme)}>
                ${Passkey({ theme, color: themes[theme].text.muted })} ${firstLine}
              </span>`
            : A}
        ${secondLine
            ? lit_html_b `<span title=${secondLine} class=${passkeySubtitleStyles(theme)}
                >${secondLine}</span
              >`
            : A}
      </div>
    `;
    }
    const subtitle = ((_c = cipher.identity) === null || _c === void 0 ? void 0 : _c.username) ||
        ((_d = cipher.identity) === null || _d === void 0 ? void 0 : _d.fullName) ||
        ((_e = cipher.login) === null || _e === void 0 ? void 0 : _e.username) ||
        cipher.card ||
        "";
    return lit_html_b `
    <div>
      ${name}
      ${subtitle
        ? lit_html_b `<span title=${subtitle} class=${secondaryTextStyles(theme)}>${subtitle}</span>`
        : A}
    </div>
  `;
}
const primaryTextStyles = (theme) => css `
  ${typography.body2}

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${themes[theme].text.main};
  font-weight: 500;
`;
const secondaryTextStyles = (theme) => css `
  ${typography.helperMedium}

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${themes[theme].text.muted};
`;
const passkeySubtitleStyles = (theme) => css `
  ${typography.helperMedium}

  display: flex;
  align-items: center;
  gap: ${spacing["1"]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${themes[theme].text.muted};

  > svg {
    flex-shrink: 0;
    width: ${spacing["3"]};
    height: ${spacing["3"]};
  }
`;

;// ./src/autofill/content/components/inline-menu/totp-cipher-info.ts



function TotpCipherInfo({ theme, heading, totp, totpCodeAria, username, masked, }) {
    const code = masked ? "●●●●●●" : `${totp.substring(0, 3)} ${totp.substring(3)}`;
    return lit_html_b `
    <div>
      <span title=${heading} class=${totp_cipher_info_primaryTextStyles(theme)}>${heading}</span>
      ${username
        ? lit_html_b `<span title=${username} class=${totp_cipher_info_secondaryTextStyles(theme)}>${username}</span>`
        : A}
      <span
        class=${totpCodeStyles(theme, masked)}
        data-testid="totp-code"
        title=${code}
        aria-label=${totpCodeAria !== null && totpCodeAria !== void 0 ? totpCodeAria : A}
        >${code}</span
      >
    </div>
  `;
}
const totp_cipher_info_primaryTextStyles = (theme) => css `
  ${typography.body2}

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${themes[theme].text.main};
  font-weight: 500;
`;
const totp_cipher_info_secondaryTextStyles = (theme) => css `
  ${typography.helperMedium}

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${themes[theme].text.muted};
`;
const totpCodeStyles = (theme, masked) => css `
  ${typography.helperMedium}

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${themes[theme].text.muted};
  ${masked ? "letter-spacing: 0.2rem;" : ""}
`;

;// ../../node_modules/lit-html/directive-helpers.js
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:directive_helpers_t}=j,directive_helpers_i=o=>o,directive_helpers_n=o=>null===o||"object"!=typeof o&&"function"!=typeof o,directive_helpers_e={HTML:1,SVG:2,MATHML:3},directive_helpers_l=(o,t)=>void 0===t?void 0!==o?._$litType$:o?._$litType$===t,directive_helpers_d=o=>null!=o?._$litType$?.h,directive_helpers_c=o=>void 0!==o?._$litDirective$,directive_helpers_f=o=>o?._$litDirective$,directive_helpers_r=o=>void 0===o.strings,directive_helpers_s=()=>document.createComment(""),directive_helpers_v=(o,n,e)=>{const l=o._$AA.parentNode,d=void 0===n?o._$AB:n._$AA;if(void 0===e){const i=l.insertBefore(directive_helpers_s(),d),n=l.insertBefore(directive_helpers_s(),d);e=new directive_helpers_t(i,n,o,o.options);}else{const t=e._$AB.nextSibling,n=e._$AM,c=n!==o;if(c){let t;e._$AQ?.(o),e._$AM=o,void 0!==e._$AP&&(t=o._$AU)!==n._$AU&&e._$AP(t);}if(t!==d||c){let o=e._$AA;for(;o!==t;){const t=directive_helpers_i(o).nextSibling;directive_helpers_i(l).insertBefore(o,d),o=t;}}}return e;},directive_helpers_u=(o,t,i=o)=>(o._$AI(t,i),o),directive_helpers_m={},directive_helpers_p=(o,t=directive_helpers_m)=>o._$AH=t,directive_helpers_M=o=>o._$AH,directive_helpers_h=o=>{o._$AR(),o._$AA.remove();},directive_helpers_j=o=>{o._$AR();};
;// ../../node_modules/lit-html/directive.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const directive_t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},directive_e=t=>(...e)=>({_$litDirective$:t,values:e});class directive_i{constructor(t){}get _$AU(){return this._$AM._$AU;}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e);}update(t,e){return this.render(...e);}}
;// ../../node_modules/lit-html/async-directive.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const async_directive_s=(i,t)=>{const e=i._$AN;if(void 0===e)return!1;for(const i of e)i._$AO?.(t,!1),async_directive_s(i,t);return!0;},async_directive_o=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t;}while(0===e?.size);},async_directive_r=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set();else if(e.has(i))break;e.add(i),async_directive_c(t);}};function async_directive_h(i){void 0!==this._$AN?(async_directive_o(this),this._$AM=i,async_directive_r(this)):this._$AM=i;}function async_directive_n(i,t=!1,e=0){const r=this._$AH,h=this._$AN;if(void 0!==h&&0!==h.size)if(t){if(Array.isArray(r))for(let i=e;i<r.length;i++)async_directive_s(r[i],!1),async_directive_o(r[i]);else null!=r&&(async_directive_s(r,!1),async_directive_o(r));}else async_directive_s(this,i);}const async_directive_c=i=>{i.type==directive_t.CHILD&&(i._$AP??=async_directive_n,i._$AQ??=async_directive_h);};class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,e){super._$AT(i,t,e),async_directive_r(this),this.isConnected=i._$AU;}_$AO(i,t=!0){i!==this.isConnected&&(this.isConnected=i,i?this.reconnected?.():this.disconnected?.()),t&&(async_directive_s(this,i),async_directive_o(this));}setValue(t){if(directive_helpers_r(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}
;// ../../node_modules/lit-html/directives/ref.js
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ref_e=()=>new ref_h();class ref_h{}const ref_o=new WeakMap(),ref_n=directive_e(class extends async_directive_f{render(i){return A;}update(i,[s]){const e=s!==this.G;return e&&void 0!==this.G&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=s,this.ht=i.options?.host,this.rt(this.ct=i.element)),A;}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){const i=this.ht??globalThis;let s=ref_o.get(i);void 0===s&&(s=new WeakMap(),ref_o.set(i,s)),void 0!==s.get(this.G)&&this.G.call(this.ht,void 0),s.set(this.G,t),void 0!==t&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return"function"==typeof this.G?ref_o.get(this.ht??globalThis)?.get(this.G):this.G?.value;}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});
;// ../../node_modules/lit/directives/ref.js

;// ./src/autofill/content/components/inline-menu/totp-countdown.ts




const TOTP_CIRCUMFERENCE = 78.5;
const TOTP_EXPIRY_SECONDS = 7;
function TotpCountdown({ theme, period, secondsRemaining, onPeriodElapsed, }) {
    return lit_html_b `
    <span
      class=${totpCountdownStyles}
      aria-hidden="true"
      ${ref_n(createTotpCountdownRef(theme, period, secondsRemaining, onPeriodElapsed))}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29">
        <circle
          data-totp-inner
          fill="none"
          cx="14.5"
          cy="14.5"
          r="12.5"
          stroke="transparent"
          stroke-width="3"
          stroke-dasharray=${TOTP_CIRCUMFERENCE}
          stroke-dashoffset=${TOTP_CIRCUMFERENCE}
          transform="rotate(-90 14.5 14.5)"
        ></circle>
        <circle
          data-totp-outer
          fill="none"
          cx="14.5"
          cy="14.5"
          r="14"
          stroke="transparent"
          stroke-width="1"
        ></circle>
      </svg>
      <span data-totp-seconds></span>
    </span>
  `;
}
function createTotpCountdownRef(theme, period, frozenSeconds, onPeriodElapsed) {
    let intervalId;
    return (node) => {
        if (intervalId !== undefined) {
            globalThis.clearInterval(intervalId);
            intervalId = undefined;
        }
        if (!(node instanceof HTMLElement)) {
            return;
        }
        const secondsEl = node.querySelector("[data-totp-seconds]");
        const innerCircle = node.querySelector("[data-totp-inner]");
        const outerCircle = node.querySelector("[data-totp-outer]");
        const paint = (seconds) => {
            const expiring = seconds <= TOTP_EXPIRY_SECONDS;
            const strokeColor = expiring ? themes[theme].passwordSpecial : themes[theme].primary["600"];
            const textColor = expiring ? themes[theme].passwordSpecial : themes[theme].text.main;
            if (secondsEl) {
                secondsEl.textContent = `${seconds}`;
                secondsEl.style.color = textColor;
            }
            if (innerCircle) {
                innerCircle.setAttribute("stroke", strokeColor);
                innerCircle.style.strokeDashoffset = `${((period - seconds) / period) * TOTP_CIRCUMFERENCE}`;
            }
            outerCircle === null || outerCircle === void 0 ? void 0 : outerCircle.setAttribute("stroke", strokeColor);
        };
        if (frozenSeconds !== undefined) {
            paint(frozenSeconds);
            return;
        }
        const tick = () => {
            const mod = Math.round(Date.now() / 1000) % period;
            paint(period - mod);
            if (mod === 0) {
                onPeriodElapsed === null || onPeriodElapsed === void 0 ? void 0 : onPeriodElapsed();
            }
        };
        tick();
        intervalId = globalThis.setInterval(tick, 1000);
    };
}
const totpCountdownStyles = css `
  position: relative;
  display: inline-flex;
  width: calc(${spacing["4"]} * 2);
  height: calc(${spacing["4"]} * 2);

  > svg {
    width: 100%;
    height: 100%;
  }

  [data-totp-seconds] {
    ${typography.helperMedium}

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

;// ./src/autofill/content/components/inline-menu/cipher-item.ts









const CIPHER_ITEM_SELECTOR = "[data-cipher-item]";
const CIPHER_CONTENT_SELECTOR = "[data-cipher-content]";
const FILL_CIPHER_SELECTOR = "[data-fill-cipher]";
function InlineMenuCipherItem({ cipher, theme, viewButtonText, opensInANewWindowText, fillCredentialsForText, logInWithPasskeyAriaLabel, handleFillCipher, handleViewCipher, bordered = true, usernameText, cardNumberEndsWithText, fillVerificationCodeText, totpCodeAria, showTotpUsername = false, totpSecondsRemaining, onTotpPeriodElapsed, onListEdgeReached, }) {
    var _a, _b, _c, _d, _e, _f;
    const isTotp = !!(((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.totpField) && ((_b = cipher.login) === null || _b === void 0 ? void 0 : _b.totp));
    const period = (_d = (_c = cipher.login) === null || _c === void 0 ? void 0 : _c.totpCodeTimeInterval) !== null && _d !== void 0 ? _d : 30;
    const fillPrefix = ((_e = cipher.login) === null || _e === void 0 ? void 0 : _e.passkey) ? logInWithPasskeyAriaLabel : fillCredentialsForText;
    const fillLabel = `${fillPrefix} ${cipher.name}`;
    const fillDescription = getFillAriaDescription(cipher, usernameText, cardNumberEndsWithText);
    const viewButtonAria = `${viewButtonText} ${cipher.name}, ${opensInANewWindowText}`;
    const uri = (cipher.icon.imageEnabled && cipher.icon.image) || undefined;
    const onFillCipher = (event) => {
        if (EventSecurity.isEventTrusted(event)) {
            handleFillCipher(event);
        }
    };
    const onViewCipher = (event) => {
        if (EventSecurity.isEventTrusted(event)) {
            event.stopPropagation();
            handleViewCipher(event);
        }
    };
    const onFillKeyUp = (event) => handleFillCipherKeyUp(event, onListEdgeReached);
    const onViewKeyUp = (event) => handleViewCipherKeyUp(event, onListEdgeReached);
    return lit_html_b `
    <div data-cipher-item role="listitem" class=${cipherItemStyles({ bordered, theme })}>
      <div data-cipher-content class=${cipherItemContentStyles(theme)}>
        <button
          type="button"
          data-fill-cipher
          tabindex="-1"
          class=${fillCipherButtonStyles}
          title=${fillLabel}
          aria-label=${fillLabel}
          aria-description=${fillDescription !== null && fillDescription !== void 0 ? fillDescription : A}
          @click=${onFillCipher}
          @keyup=${onFillKeyUp}
        >
          ${isTotp
        ? TotpCountdown({
            theme,
            period,
            secondsRemaining: totpSecondsRemaining,
            onPeriodElapsed: onTotpPeriodElapsed,
        })
        : CipherIcon({
            color: themes[theme].primary["600"],
            size: `calc(${spacing["4"]} + ${spacing["2"]})`,
            theme,
            uri,
        })}
          ${isTotp
        ? TotpCipherInfo({
            theme,
            heading: fillVerificationCodeText !== null && fillVerificationCodeText !== void 0 ? fillVerificationCodeText : "",
            totp: cipher.login.totp,
            totpCodeAria,
            username: showTotpUsername ? (_f = cipher.login) === null || _f === void 0 ? void 0 : _f.username : undefined,
            masked: !!cipher.reprompt,
        })
        : CipherDetails({ theme, cipher })}
        </button>
        <button
          type="button"
          data-view-cipher
          tabindex="-1"
          title=${viewButtonText}
          aria-label=${viewButtonAria}
          class=${viewCipherButtonStyles(theme)}
          @click=${onViewCipher}
          @keyup=${onViewKeyUp}
        >
          ${ExternalLink({ theme, color: themes[theme].primary["600"] })}
        </button>
      </div>
    </div>
  `;
}
function handleFillCipherKeyUp(event, onListEdgeReached) {
    const listItem = getTrustedCipherKeyTarget(event, ["ArrowDown", "ArrowUp", "ArrowRight"]);
    if (!listItem) {
        return;
    }
    if (event.code === "ArrowRight") {
        focusViewCipherButton(listItem, event.target);
        return;
    }
    focusFillCipher(listItem, event.code === "ArrowDown" ? 1 : -1, onListEdgeReached);
}
function handleViewCipherKeyUp(event, onListEdgeReached) {
    var _a, _b;
    const listItem = getTrustedCipherKeyTarget(event, ["ArrowDown", "ArrowUp", "ArrowLeft"]);
    if (!listItem) {
        return;
    }
    (_a = listItem.querySelector(CIPHER_CONTENT_SELECTOR)) === null || _a === void 0 ? void 0 : _a.classList.remove("remove-outline");
    if (event.code === "ArrowLeft") {
        (_b = event.target.previousElementSibling) === null || _b === void 0 ? void 0 : _b.focus();
        return;
    }
    focusFillCipher(listItem, event.code === "ArrowDown" ? 1 : -1, onListEdgeReached);
}
function getTrustedCipherKeyTarget(event, keys) {
    if (!EventSecurity.isEventTrusted(event) ||
        !keys.includes(event.code) ||
        !(event.target instanceof Element)) {
        return null;
    }
    event.preventDefault();
    return event.target.closest(CIPHER_ITEM_SELECTOR);
}
function focusFillCipher(currentListItem, direction, onListEdgeReached) {
    var _a, _b;
    const adjacentFill = (_a = getAdjacentCipherItem(currentListItem, direction)) === null || _a === void 0 ? void 0 : _a.querySelector(FILL_CIPHER_SELECTOR);
    if (adjacentFill) {
        adjacentFill.focus();
        return;
    }
    if (onListEdgeReached) {
        onListEdgeReached(direction);
        return;
    }
    const fills = (_b = currentListItem.parentElement) === null || _b === void 0 ? void 0 : _b.querySelectorAll(FILL_CIPHER_SELECTOR);
    const fallback = direction === 1 ? fills === null || fills === void 0 ? void 0 : fills[0] : fills === null || fills === void 0 ? void 0 : fills[fills.length - 1];
    fallback === null || fallback === void 0 ? void 0 : fallback.focus();
}
function getAdjacentCipherItem(currentListItem, direction) {
    let sibling = direction === 1 ? currentListItem.nextElementSibling : currentListItem.previousElementSibling;
    while (sibling) {
        if (sibling.matches(CIPHER_ITEM_SELECTOR)) {
            return sibling;
        }
        sibling = direction === 1 ? sibling.nextElementSibling : sibling.previousElementSibling;
    }
    return null;
}
function focusViewCipherButton(currentListItem, currentButtonElement) {
    var _a, _b;
    (_a = currentListItem.querySelector(CIPHER_CONTENT_SELECTOR)) === null || _a === void 0 ? void 0 : _a.classList.add("remove-outline");
    (_b = currentButtonElement.nextElementSibling) === null || _b === void 0 ? void 0 : _b.focus();
}
function getFillAriaDescription(cipher, usernameText, cardNumberEndsWithText) {
    var _a;
    if (cipher.login) {
        const username = cipher.login.username || ((_a = cipher.login.passkey) === null || _a === void 0 ? void 0 : _a.userName) || "";
        return username && usernameText ? `${usernameText.toLowerCase()}: ${username}` : undefined;
    }
    if (!cipher.card || !cardNumberEndsWithText) {
        return undefined;
    }
    const cardParts = cipher.card.split(", *");
    if (cardParts.length === 1) {
        const cardDigits = cardParts[0].startsWith("*") ? cardParts[0].substring(1) : cardParts[0];
        return `${cardNumberEndsWithText} ${cardDigits}`;
    }
    return `${cardParts[0]}, ${cardNumberEndsWithText} ${cardParts[1]}`;
}
const cipherItemStyles = ({ bordered, theme }) => css `
  box-sizing: border-box;
  width: 100%;
  padding: calc(${spacing["1"]} / 2);
  list-style: none;
  transition: background-color 0.2s ease-in-out;
  ${bordered ? `border-bottom: 1px solid ${themes[theme].secondary["300"]};` : ""}

  :hover {
    background-color: ${themes[theme].background.alt};
  }
`;
const cipherItemContentStyles = (theme) => css `
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${spacing["2"]} ${spacing["1"]} ${spacing["2"]} ${spacing["2"]};
  border-radius: ${spacing["1"]};

  :has(:focus-visible):not(.remove-outline) {
    outline: 2px solid ${themes[theme].primary["600"]};
    outline-offset: 1px;
  }
`;
const fillCipherButtonStyles = css `
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${spacing["2"]};
  width: calc(100% - (${spacing["4"]} * 2 + ${spacing["2"]}));
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  outline: none;
  line-height: 0;
  overflow: hidden;

  > div {
    min-width: 0;
    line-height: normal;
  }
`;
const viewCipherButtonStyles = (theme) => css `
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: calc(${spacing["4"]} * 2 + ${spacing["2"]});
  height: calc(${spacing["4"]} * 2 + ${spacing["2"]});
  margin: 0;
  padding: 0;
  border: none;
  border-radius: ${spacing["1"]};
  background: transparent;
  cursor: pointer;
  line-height: 0;

  :focus {
    outline: 2px solid ${themes[theme].primary["600"]};
    outline-offset: 1px;
  }

  > svg {
    width: ${spacing["4"]};
    height: ${spacing["4"]};
  }
`;

;// ./src/autofill/content/components/inline-menu/cipher-list.ts
var cipher_list_rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};





function InlineMenuCipherList(_a) {
    var { ciphers, theme, passkeysText = "", passwordsText = "", showPasskeysLabels, handleFillCipher, handleViewCipher } = _a, itemProps = cipher_list_rest(_a, ["ciphers", "theme", "passkeysText", "passwordsText", "showPasskeysLabels", "handleFillCipher", "handleViewCipher"]);
    const showTotpUsername = ciphers.filter((cipher) => { var _a, _b; return ((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.totpField) && ((_b = cipher.login) === null || _b === void 0 ? void 0 : _b.totp); }).length > 1;
    const withHeadings = showPasskeysLabels !== null && showPasskeysLabels !== void 0 ? showPasskeysLabels : (ciphers.some((cipher) => { var _a; return !!((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey); }) &&
        ciphers.some((cipher) => { var _a; return !((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey); }));
    const ordered = withHeadings ? partitionByPasskey(ciphers) : ciphers;
    return InlineMenuContainer({
        theme,
        dataTestId: "inline-menu-cipher-list",
        children: lit_html_b `
      <div role="list" data-cipher-list-scroll class=${cipherListStyles(theme)}>
        ${renderItems(ordered, withHeadings, theme, passkeysText, passwordsText, (cipher, index) => InlineMenuCipherItem(Object.assign(Object.assign({}, itemProps), { theme,
            cipher, bordered: index < ordered.length - 1, showTotpUsername, handleFillCipher: (e) => handleFillCipher(cipher, e), handleViewCipher: (e) => handleViewCipher(cipher, e) })))}
      </div>
    `,
    });
}
function partitionByPasskey(ciphers) {
    return [
        ...ciphers.filter((cipher) => { var _a; return (_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey; }),
        ...ciphers.filter((cipher) => { var _a; return !((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey); }),
    ];
}
function renderItems(ciphers, withHeadings, theme, passkeysText, passwordsText, renderItem) {
    if (!withHeadings) {
        return ciphers.map(renderItem);
    }
    const items = [];
    let sawPasskey = false;
    let sawPassword = false;
    ciphers.forEach((cipher, index) => {
        var _a, _b;
        if (((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey) && !sawPasskey) {
            sawPasskey = true;
            items.push(heading(theme, passkeysText));
        }
        else if (!((_b = cipher.login) === null || _b === void 0 ? void 0 : _b.passkey) && !sawPassword) {
            sawPassword = true;
            items.push(heading(theme, passwordsText));
        }
        items.push(renderItem(cipher, index));
    });
    return items;
}
function heading(theme, text) {
    return lit_html_b `
    <div data-cipher-heading role="presentation" class=${cipherListHeadingStyles(theme)}>
      ${text}
    </div>
  `;
}
const cipherListStyles = (theme) => {
    const scrollbars = scrollbarStyles(theme);
    return css `
    box-sizing: border-box;
    max-height: calc(${spacing["4"]} * 11 + ${spacing["1"]});
    overflow-x: hidden;
    overflow-y: auto;
    background-color: ${themes[theme].background.DEFAULT};

    ${scrollbars.default}
    ${scrollbars.safari}
  `;
};
const cipherListHeadingStyles = (theme) => css `
  ${typography.body2}

  position: sticky;
  top: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  padding: ${spacing["2"]} ${spacing["3"]};
  font-weight: 500;
  letter-spacing: 0.025rem;
  color: ${themes[theme].text.main};
  background-color: ${themes[theme].background.DEFAULT};
  border-bottom: 1px solid ${themes[theme].background.DEFAULT};
`;

;// ./src/autofill/enums/autofill-port.enum.ts
const AutofillPort = {
    InjectedScript: "autofill-injected-script-port",
};


;// ./src/autofill/utils/index.ts
/* unused harmony import specifier */ var utils_AUTOFILL_ATTRIBUTES;
/* unused harmony import specifier */ var utils_AutofillPort;
var utils_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/**
 * Generates a random string of characters.
 *
 * @param length - The length of the random string to generate.
 */
function generateRandomChars(length) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const randomChars = [];
    const randomBytes = new Uint8Array(length);
    globalThis.crypto.getRandomValues(randomBytes);
    for (let byteIndex = 0; byteIndex < randomBytes.length; byteIndex++) {
        const byte = randomBytes[byteIndex];
        randomChars.push(chars[byte % chars.length]);
    }
    return randomChars.join("");
}
/**
 * Polyfills the requestIdleCallback API with a setTimeout fallback.
 *
 * @param callback - The callback function to run when the browser is idle.
 * @param options - The options to pass to the requestIdleCallback function.
 */
function requestIdleCallbackPolyfill(callback, options) {
    if ("requestIdleCallback" in globalThis) {
        return globalThis.requestIdleCallback(() => callback(), options);
    }
    return globalThis.setTimeout(() => callback(), 1);
}
/**
 * Polyfills the cancelIdleCallback API with a clearTimeout fallback.
 *
 * @param id - The ID of the idle callback to cancel.
 */
function cancelIdleCallbackPolyfill(id) {
    if ("cancelIdleCallback" in globalThis) {
        return globalThis.cancelIdleCallback(id);
    }
    return globalThis.clearTimeout(id);
}
/**
 * Generates a random string of characters that formatted as a custom element name.
 */
function generateRandomCustomElementName() {
    const length = Math.floor(Math.random() * 5) + 8; // Between 8 and 12 characters
    const numHyphens = Math.min(Math.max(Math.floor(Math.random() * 4), 1), length - 1); // At least 1, maximum of 3 hyphens
    const hyphenIndices = [];
    while (hyphenIndices.length < numHyphens) {
        const index = Math.floor(Math.random() * (length - 1)) + 1;
        if (!hyphenIndices.includes(index)) {
            hyphenIndices.push(index);
        }
    }
    hyphenIndices.sort((a, b) => a - b);
    let randomString = "";
    let prevIndex = 0;
    for (let index = 0; index < hyphenIndices.length; index++) {
        const hyphenIndex = hyphenIndices[index];
        randomString = randomString + generateRandomChars(hyphenIndex - prevIndex) + "-";
        prevIndex = hyphenIndex;
    }
    randomString += generateRandomChars(length - prevIndex);
    return randomString;
}
/**
 * Builds a DOM element from an SVG string.
 *
 * @param svgString - The SVG string to build the DOM element from.
 * @param ariaHidden - Determines whether the SVG should be hidden from screen readers.
 */
function buildSvgDomElement(svgString, ariaHidden = true) {
    const domParser = new DOMParser();
    const svgDom = domParser.parseFromString(svgString, "image/svg+xml");
    const domElement = svgDom.documentElement;
    domElement.setAttribute("aria-hidden", `${ariaHidden}`);
    return domElement;
}
/**
 * Sends a message to the extension.
 *
 * @param command - The command to send.
 * @param options - The options to send with the command.
 */
function sendExtensionMessage(command_1) {
    return utils_awaiter(this, arguments, void 0, function* (command, options = {}) {
        if (typeof browser !== "undefined" &&
            typeof browser.runtime !== "undefined" &&
            typeof browser.runtime.sendMessage !== "undefined") {
            return browser.runtime.sendMessage(Object.assign({ command }, options));
        }
        return new Promise((resolve) => chrome.runtime.sendMessage(Object.assign({ command }, options), (response) => {
            if (chrome.runtime.lastError) {
                resolve(null);
            }
            resolve(response);
        }));
    });
}
/**
 * Sets CSS styles on an element.
 *
 * @param element - The element to set the styles on.
 * @param styles - The styles to set on the element.
 * @param priority - Determines whether the styles should be set as important.
 */
function setElementStyles(element, styles, priority) {
    if (!element || !styles || !Object.keys(styles).length) {
        return;
    }
    for (const styleProperty in styles) {
        const styleValue = styles[styleProperty];
        if (styleValue !== undefined) {
            element.style.setProperty(styleProperty.replace(/([a-z])([A-Z])/g, "$1-$2"), // Convert camelCase to kebab-case
            styleValue, priority ? "important" : undefined);
        }
    }
}
/**
 * Sets up a long-lived connection with the extension background
 * and triggers an onDisconnect event if the extension context
 * is invalidated.
 *
 * @param callback - Callback export function to run when the extension disconnects
 */
function setupExtensionDisconnectAction(callback) {
    const port = chrome.runtime.connect({ name: utils_AutofillPort.InjectedScript });
    const onDisconnectCallback = (disconnectedPort) => {
        callback(disconnectedPort);
        port.onDisconnect.removeListener(onDisconnectCallback);
    };
    port.onDisconnect.addListener(onDisconnectCallback);
}
/**
 * Handles setup of the extension disconnect action for the autofill init class
 * in both instances where the overlay might or might not be initialized.
 *
 * @param windowContext - The global window context
 */
function setupAutofillInitDisconnectAction(windowContext) {
    const bitwardenAutofillInit = windowContext.bitwardenAutofillInit;
    if (!bitwardenAutofillInit) {
        return;
    }
    const onDisconnectCallback = () => {
        bitwardenAutofillInit.destroy();
        delete windowContext.bitwardenAutofillInit;
    };
    setupExtensionDisconnectAction(onDisconnectCallback);
}
/**
 * Identifies whether an element is a fillable form field.
 * This is determined by whether the element is a form field and not a span.
 *
 * @param formFieldElement - The form field element to check.
 */
function elementIsFillableFormField(formFieldElement) {
    return !elementIsSpanElement(formFieldElement);
}
/**
 * Identifies whether an element is an instance of a specific tag name.
 *
 * @param element - The element to check.
 * @param tagName -  The tag name to check against.
 */
function elementIsInstanceOf(element, tagName) {
    return nodeIsElement(element) && element.tagName.toLowerCase() === tagName;
}
/**
 * Identifies whether an element is a span element.
 *
 * @param element - The element to check.
 */
function elementIsSpanElement(element) {
    return elementIsInstanceOf(element, "span");
}
/**
 * Identifies whether an element is an input field.
 *
 * @param element - The element to check.
 */
function elementIsInputElement(element) {
    return elementIsInstanceOf(element, "input");
}
/**
 * Identifies whether an element is a select field.
 *
 * @param element - The element to check.
 */
function elementIsSelectElement(element) {
    return elementIsInstanceOf(element, "select");
}
/**
 * Identifies whether an element is a textarea field.
 *
 * @param element - The element to check.
 */
function elementIsTextAreaElement(element) {
    return elementIsInstanceOf(element, "textarea");
}
/**
 * Identifies whether an element is a form element.
 *
 * @param element - The element to check.
 */
function elementIsFormElement(element) {
    return elementIsInstanceOf(element, "form");
}
/**
 * Identifies whether an element is a label element.
 *
 * @param element - The element to check.
 */
function elementIsLabelElement(element) {
    return elementIsInstanceOf(element, "label");
}
/**
 * Identifies whether an element is a description details `dd` element.
 *
 * @param element - The element to check.
 */
function elementIsDescriptionDetailsElement(element) {
    return elementIsInstanceOf(element, "dd");
}
/**
 * Identifies whether an element is a description term `dt` element.
 *
 * @param element - The element to check.
 */
function elementIsDescriptionTermElement(element) {
    return elementIsInstanceOf(element, "dt");
}
/**
 * Identifies whether a node is an HTML element.
 *
 * @param node - The node to check.
 */
function nodeIsElement(node) {
    if (!node) {
        return false;
    }
    return (node === null || node === void 0 ? void 0 : node.nodeType) === Node.ELEMENT_NODE;
}
function elementIsTypeSubmitElement(element) {
    return getPropertyOrAttribute(element, "type") === "submit";
}
function elementIsButtonElement(element) {
    return (elementIsInstanceOf(element, "button") ||
        getPropertyOrAttribute(element, "type") === "button");
}
function elementIsAnchorElement(element) {
    return elementIsInstanceOf(element, "a");
}
/**
 * Returns a boolean representing the attribute value of an element.
 *
 * @param element
 * @param attributeName
 * @param checkString
 */
function getAttributeBoolean(element, attributeName, checkString = false) {
    if (checkString) {
        return getPropertyOrAttribute(element, attributeName) === "true";
    }
    return Boolean(getPropertyOrAttribute(element, attributeName));
}
/**
 * Checks if a form field element is currently readonly or disabled.
 *
 * @param formFieldElement - The form field element to evaluate.
 * @param autofillFieldData - Optional cached autofill metadata for readonly or disabled state.
 */
function isReadonlyOrDisabledFormFieldElement(formFieldElement, autofillFieldData) {
    const readOnlyByProperty = (elementIsInputElement(formFieldElement) || elementIsTextAreaElement(formFieldElement)) &&
        formFieldElement.readOnly;
    return (getAttributeBoolean(formFieldElement, utils_AUTOFILL_ATTRIBUTES.DISABLED) ||
        readOnlyByProperty ||
        getAttributeBoolean(formFieldElement, "aria-readonly", true) ||
        (autofillFieldData === null || autofillFieldData === void 0 ? void 0 : autofillFieldData.readonly) === true ||
        (autofillFieldData === null || autofillFieldData === void 0 ? void 0 : autofillFieldData.disabled) === true);
}
/**
 * Get the value of a property or attribute from a FormFieldElement.
 *
 * @param element
 * @param attributeName
 */
function getPropertyOrAttribute(element, attributeName) {
    var _a;
    if (attributeName in element) {
        return (_a = element[attributeName]) !== null && _a !== void 0 ? _a : null;
    }
    return element.getAttribute(attributeName);
}
/**
 * Throttles a callback function to run at most once every `limit` milliseconds.
 *
 * @param callback - The callback function to throttle (must return void).
 * @param limit - The time in milliseconds to throttle the callback.
 */
function throttle(callback, limit) {
    let waitingDelay = false;
    return function (...args) {
        if (waitingDelay) {
            return;
        }
        callback.apply(this, args);
        waitingDelay = true;
        globalThis.setTimeout(() => (waitingDelay = false), limit);
    };
}
/**
 * Debounces a callback function to run after a delay of `delay` milliseconds.
 *
 * @param callback - The callback function to debounce.
 * @param delay - The time in milliseconds to debounce the callback.
 * @param immediate - Determines whether the callback should run immediately.
 */
function debounce(callback, delay, immediate) {
    let timeout = null;
    return function (...args) {
        const callImmediately = !!immediate && !timeout;
        if (timeout) {
            globalThis.clearTimeout(timeout);
        }
        timeout = globalThis.setTimeout(() => {
            timeout = null;
            if (!callImmediately) {
                callback.apply(this, args);
            }
        }, delay);
        if (callImmediately) {
            callback.apply(this, args);
        }
    };
}
/**
 * Generates the origin and subdomain match patterns for the URL.
 *
 * @param url - The URL of the tab
 */
function generateDomainMatchPatterns(url) {
    try {
        const extensionUrlPattern = /^(chrome|chrome-extension|moz-extension|safari-web-extension):\/\/\/?/;
        if (extensionUrlPattern.test(url)) {
            return [];
        }
        // Add protocol to URL if it is missing to allow for parsing the hostname correctly
        const urlPattern = /^(https?|file):\/\/\/?/;
        if (!urlPattern.test(url)) {
            url = `https://${url}`;
        }
        let protocolGlob = "*://";
        if (url.startsWith("file:///")) {
            protocolGlob = "*:///"; // File URLs require three slashes to be a valid match pattern
        }
        const parsedUrl = new URL(url);
        const originMatchPattern = `${protocolGlob}${parsedUrl.hostname}/*`;
        const splitHost = parsedUrl.hostname.split(".");
        const domain = splitHost.slice(-2).join(".");
        const subDomainMatchPattern = `${protocolGlob}*.${domain}/*`;
        return [originMatchPattern, subDomainMatchPattern];
    }
    catch (_a) {
        return [];
    }
}
/**
 * Determines if the status code of the web response is invalid. An invalid status code is
 * any status code that is not in the 200-299 range.
 *
 * @param statusCode - The status code of the web response
 */
function isInvalidResponseStatusCode(statusCode) {
    return statusCode < 200 || statusCode >= 300;
}
/**
 * Determines if the current context is within a sandboxed iframe.
 */
function currentlyInSandboxedIframe() {
    var _a, _b;
    if (String(self.origin).toLowerCase() === "null" || globalThis.location.hostname === "") {
        return true;
    }
    const sandbox = (_b = (_a = globalThis.frameElement) === null || _a === void 0 ? void 0 : _a.getAttribute) === null || _b === void 0 ? void 0 : _b.call(_a, "sandbox");
    // No frameElement or sandbox attribute means not sandboxed
    if (sandbox === null || sandbox === undefined) {
        return false;
    }
    // An empty string means fully sandboxed
    if (sandbox === "") {
        return true;
    }
    const tokens = new Set(sandbox.toLowerCase().split(" "));
    return !["allow-scripts", "allow-same-origin"].every((token) => tokens.has(token));
}
/**
 * This object allows us to map a special character to a key name. The key name is used
 * in gathering the i18n translation of the written version of the special character.
 */
const specialCharacterToKeyMap = {
    " ": "spaceCharacterDescriptor",
    "~": "tildeCharacterDescriptor",
    "`": "backtickCharacterDescriptor",
    "!": "exclamationCharacterDescriptor",
    "@": "atSignCharacterDescriptor",
    "#": "hashSignCharacterDescriptor",
    $: "dollarSignCharacterDescriptor",
    "%": "percentSignCharacterDescriptor",
    "^": "caretCharacterDescriptor",
    "&": "ampersandCharacterDescriptor",
    "*": "asteriskCharacterDescriptor",
    "(": "parenLeftCharacterDescriptor",
    ")": "parenRightCharacterDescriptor",
    "-": "hyphenCharacterDescriptor",
    _: "underscoreCharacterDescriptor",
    "+": "plusCharacterDescriptor",
    "=": "equalsCharacterDescriptor",
    "{": "braceLeftCharacterDescriptor",
    "}": "braceRightCharacterDescriptor",
    "[": "bracketLeftCharacterDescriptor",
    "]": "bracketRightCharacterDescriptor",
    "|": "pipeCharacterDescriptor",
    "\\": "backSlashCharacterDescriptor",
    ":": "colonCharacterDescriptor",
    ";": "semicolonCharacterDescriptor",
    '"': "doubleQuoteCharacterDescriptor",
    "'": "singleQuoteCharacterDescriptor",
    "<": "lessThanCharacterDescriptor",
    ">": "greaterThanCharacterDescriptor",
    ",": "commaCharacterDescriptor",
    ".": "periodCharacterDescriptor",
    "?": "questionCharacterDescriptor",
    "/": "forwardSlashCharacterDescriptor",
};
/**
 * Determines if the current rect values are not all 0.
 */
function rectHasSize(rect) {
    if (rect.right > 0 && rect.left > 0 && rect.top > 0 && rect.bottom > 0) {
        return true;
    }
    return false;
}
/**
 * Checks if all the values corresponding to the specified keys in an object are null.
 * If no keys are specified, checks all keys in the object.
 *
 * @param obj - The object to check.
 * @param keys - An optional array of keys to check in the object. Defaults to all keys.
 * @returns Returns true if all values for the specified keys (or all keys if none are provided) are null; otherwise, false.
 */
function areKeyValuesNull(obj, keys) {
    const keysToCheck = keys && keys.length > 0 ? keys : Object.keys(obj);
    return keysToCheck.every((key) => obj[key] == null);
}
/**
 * Validates the shape of `subFrameData` and rejects any payload that carries a
 * `url`. This is the *receive*-side counterpart to the *send*-side
 * `SubFrameOffsetWindowMessageData` type: that type stops our own code from
 * constructing a leaky payload at compile time, but any frame can post arbitrary
 * data, so inbound messages must be validated at runtime before they are trusted.
 *
 * @param value - The untrusted `data` property of the window message event.
 */
function isSubFramePositioningMessageData(value) {
    if (typeof value !== "object" || value === null || !("subFrameData" in value)) {
        return false;
    }
    const { subFrameData } = value;
    if (typeof subFrameData !== "object" || subFrameData === null || "url" in subFrameData) {
        return false;
    }
    // Number.isFinite (not `typeof === "number"`) so NaN/Infinity are rejected: a
    // non-finite subFrameDepth would defeat the MAX_SUB_FRAME_DEPTH relay guard.
    const candidate = subFrameData;
    return (Number.isFinite(candidate.top) &&
        Number.isFinite(candidate.left) &&
        Number.isFinite(candidate.subFrameDepth) &&
        (candidate.frameId === undefined || Number.isFinite(candidate.frameId)) &&
        (candidate.parentFrameIds === undefined ||
            (Array.isArray(candidate.parentFrameIds) &&
                candidate.parentFrameIds.every((id) => Number.isFinite(id)))));
}

;// ./src/autofill/content/components/inline-menu/colorized-password.ts




function ColorizedPassword({ password, theme, i18n }) {
    const characters = Array.from(password).map((character) => ({
        character,
        type: getPasswordCharacterType(character),
    }));
    return lit_html_b `
    <div
      class=${colorizedPasswordStyles(theme)}
      aria-label=${buildPasswordAriaLabel(characters, i18n)}
    >
      ${characters.map(({ character, type }) => lit_html_b `<span class=${passwordCharacterStyles(theme, type)}>${character}</span>`)}
    </div>
  `;
}
function getPasswordCharacterType(character) {
    if (character.match(/\W/)) {
        return "special";
    }
    if (character.match(/\d/)) {
        return "number";
    }
    return "letter";
}
function buildPasswordAriaLabel(characters, i18n) {
    const parts = characters.map(({ character, type }) => {
        var _a;
        switch (type) {
            case "special":
                return (_a = i18n.characterDescriptors[specialCharacterToKeyMap[character]]) !== null && _a !== void 0 ? _a : character;
            case "number":
                return character;
            case "letter":
                return `${character === character.toLowerCase() ? i18n.lowercaseAriaLabel : i18n.uppercaseAriaLabel} ${character}`;
        }
    });
    return `${i18n.generatedPassword}: ${parts.join(" ")} `;
}
const colorizedPasswordStyles = (theme) => css `
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  font-family: "Source Code Pro", ui-monospace, monospace;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.05rem;
  color: ${themes[theme].text.main};
`;
const passwordCharacterStyles = (theme, type) => css `
  ${type === "special" ? `color: ${themes[theme].passwordSpecial};` : ""}
  ${type === "number" ? `color: ${themes[theme].passwordNumber};` : ""}
`;

;// ./src/autofill/content/components/inline-menu/password-generator.ts







const ACTIONS_SELECTOR = "[data-password-generator-actions]";
const FILL_SELECTOR = "[data-fill-generated-password]";
const REFRESH_SELECTOR = "[data-refresh-generated-password]";
function InlineMenuPasswordGenerator({ password, headingText, theme, i18n, handleFillPassword, handleRefreshPassword, }) {
    const onFill = (event) => {
        if (EventSecurity.isEventTrusted(event)) {
            handleFillPassword(event);
        }
    };
    const onRefresh = (event) => {
        if (EventSecurity.isEventTrusted(event) && event.target instanceof Element) {
            const actions = event.target.closest(ACTIONS_SELECTOR);
            actions === null || actions === void 0 ? void 0 : actions.classList.add("remove-outline");
            handleRefreshPassword(event);
        }
    };
    return InlineMenuContainer({
        theme,
        dataTestId: "inline-menu-password-generator",
        children: lit_html_b `
      <div class=${containerStyles}>
        <div data-password-generator-actions class=${actionsStyles(theme)}>
          <button
            type="button"
            data-fill-generated-password
            tabindex="-1"
            class=${fillButtonStyles}
            aria-label=${headingText}
            @click=${onFill}
            @keyup=${(event) => handleActionKeyUp(event, "ArrowRight")}
          >
            <span class=${keyIconStyles}>
              ${Key({ theme, color: themes[theme].primary["600"] })}
            </span>
            <div class=${contentStyles}>
              <div class=${headingStyles(theme)}>${headingText}</div>
              ${ColorizedPassword({ password, theme, i18n })}
            </div>
          </button>
          <button
            type="button"
            data-refresh-generated-password
            tabindex="-1"
            class=${refreshButtonStyles(theme)}
            aria-label=${i18n.regeneratePassword}
            @click=${onRefresh}
            @keyup=${(event) => handleActionKeyUp(event, "ArrowLeft")}
          >
            ${Refresh({ theme, color: themes[theme].primary["600"] })}
          </button>
        </div>
      </div>
    `,
    });
}
function isTrustedActionKey(event, arrowCode) {
    return (EventSecurity.isEventTrusted(event) &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        !event.shiftKey &&
        event.target instanceof HTMLElement &&
        event.code === arrowCode);
}
function handleActionKeyUp(event, arrowCode) {
    var _a;
    if (!isTrustedActionKey(event, arrowCode)) {
        return;
    }
    const actions = event.target.closest(ACTIONS_SELECTOR);
    const target = (_a = actions === null || actions === void 0 ? void 0 : actions.querySelector(arrowCode === "ArrowRight" ? REFRESH_SELECTOR : FILL_SELECTOR)) !== null && _a !== void 0 ? _a : null;
    target === null || target === void 0 ? void 0 : target.focus();
    actions === null || actions === void 0 ? void 0 : actions.classList.toggle("remove-outline", arrowCode === "ArrowRight");
}
const containerStyles = css `
  box-sizing: border-box;
  padding: calc(${spacing["1"]} / 2);
`;
const actionsStyles = (theme) => css `
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${spacing["2"]} ${spacing["1"]} ${spacing["3"]} ${spacing["2"]};
  border-radius: ${spacing["1"]};
  transition: background-color 0.2s ease-in-out;

  :hover {
    background-color: ${themes[theme].background.alt};
  }

  :has(:focus-visible):not(.remove-outline) {
    outline: 2px solid ${themes[theme].primary["600"]};
    outline-offset: 1px;
  }
`;
const fillButtonStyles = css `
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${spacing["2"]};
  width: calc(100% - (${spacing["4"]} * 2 + ${spacing["2"]}));
  margin: 0;
  padding: 0 ${spacing["1"]} 0 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  outline: none;
  overflow: hidden;
`;
const KEY_ICON_SIZE = `calc(${spacing["4"]} * 2)`;
const REFRESH_ICON_SIZE = `calc(${spacing["4"]} + ${spacing["2"]})`;
const keyIconStyles = css `
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${KEY_ICON_SIZE};
  height: ${KEY_ICON_SIZE};
  margin-top: calc(${spacing["1"]} / 2);

  > svg {
    width: ${KEY_ICON_SIZE};
    height: ${KEY_ICON_SIZE};
  }
`;
const contentStyles = css `
  text-align: left;
`;
const headingStyles = (theme) => css `
  ${typography.body2}

  margin-bottom: 1px;
  color: ${themes[theme].text.main};
  white-space: nowrap;
`;
const refreshButtonStyles = (theme) => css `
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: calc(${spacing["4"]} * 2 + ${spacing["2"]});
  height: calc(${spacing["4"]} * 2 + ${spacing["2"]});
  margin: 0;
  padding: 0;
  border: none;
  border-radius: ${spacing["1"]};
  background: transparent;
  cursor: pointer;
  line-height: 0;

  :focus-visible {
    outline: 2px solid ${themes[theme].primary["600"]};
    outline-offset: 1px;
  }

  > svg {
    width: ${REFRESH_ICON_SIZE};
    height: ${REFRESH_ICON_SIZE};
    margin-top: calc(${spacing["1"]} / 2);
  }
`;

;// ./src/autofill/content/components/inline-menu/index.ts










;// ./src/autofill/utils/resolve-theme.ts

function resolveTheme(theme) {
    if (theme === ThemeTypes.System) {
        return globalThis.matchMedia("(prefers-color-scheme: dark)").matches
            ? ThemeTypes.Dark
            : ThemeTypes.Light;
    }
    return theme === ThemeTypes.Dark ? ThemeTypes.Dark : ThemeTypes.Light;
}

;// ./src/autofill/utils/svg-icons.ts
const logoIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path fill="#175DDC" d="M12.66.175A.566.566 0 0 0 12.25 0H1.75a.559.559 0 0 0-.409.175.561.561 0 0 0-.175.41v7c.002.532.105 1.06.305 1.554.189.488.444.948.756 1.368.322.42.682.81 1.076 1.163.365.335.75.649 1.152.939.35.248.718.483 1.103.706.385.222.656.372.815.45.16.08.29.141.386.182A.53.53 0 0 0 7 14a.509.509 0 0 0 .238-.055c.098-.043.225-.104.387-.182.162-.079.438-.23.816-.45.378-.222.75-.459 1.102-.707.403-.29.788-.604 1.154-.939a8.435 8.435 0 0 0 1.076-1.163c.312-.42.567-.88.757-1.367a4.19 4.19 0 0 0 .304-1.555v-7a.55.55 0 0 0-.174-.407Z"/><path fill="#fff" d="M7 12.365s4.306-2.18 4.306-4.717V1.5H7v10.865Z"/></svg>';
const logoLockedIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(#a)"><path fill="#175DDC" d="M12.66.175A.566.566 0 0 0 12.25 0H1.75a.559.559 0 0 0-.409.175.561.561 0 0 0-.175.41v7c.002.532.105 1.06.305 1.554.189.488.444.948.756 1.368.322.42.682.81 1.076 1.163.365.335.75.649 1.152.939.35.248.718.483 1.103.706.385.222.656.372.815.45.16.08.29.141.386.182A.53.53 0 0 0 7 14a.509.509 0 0 0 .238-.055c.098-.043.225-.104.387-.182.162-.079.438-.23.816-.45.378-.222.75-.459 1.102-.707.403-.29.788-.604 1.154-.939a8.435 8.435 0 0 0 1.076-1.163c.312-.42.567-.88.757-1.367a4.19 4.19 0 0 0 .304-1.555v-7a.55.55 0 0 0-.174-.407Z"/><path fill="#fff" d="M7 12.365s4.306-2.18 4.306-4.717V1.5H7v10.865Z"/><circle cx="12.889" cy="12.889" r="4.889" fill="#F8F9FA"/><path fill="#555" d="M11.26 11.717h2.37v-.848c0-.313-.116-.58-.348-.8a1.17 1.17 0 0 0-.838-.332c-.327 0-.606.11-.838.332a1.066 1.066 0 0 0-.347.8v.848Zm3.851.424v2.546a.4.4 0 0 1-.13.3.44.44 0 0 1-.314.124h-4.445a.44.44 0 0 1-.315-.124.4.4 0 0 1-.13-.3V12.14a.4.4 0 0 1 .13-.3.44.44 0 0 1 .315-.124h.148v-.848c0-.542.204-1.008.612-1.397a2.044 2.044 0 0 1 1.462-.583c.568 0 1.056.194 1.463.583.408.39.611.855.611 1.397v.848h.149a.44.44 0 0 1 .315.124.4.4 0 0 1 .13.3Z"/></g><defs><clipPath id="a"><rect width="16" height="16" fill="#fff" rx="2"/></clipPath></defs></svg>';
const globeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#1B2029" fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10Zm-7.806 6.4c-.825 1.65-1.688 2.1-2.194 2.1-.507 0-1.369-.45-2.194-2.1-.704-1.407-1.2-3.384-1.291-5.65h6.97c-.09 2.266-.587 4.243-1.291 5.65Zm1.291-7.15h-6.97c.09-2.266.587-4.243 1.291-5.65.825-1.65 1.688-2.1 2.194-2.1.507 0 1.369.45 2.194 2.1.704 1.407 1.2 3.384 1.291 5.65Zm1.501 1.5c-.108 2.928-.847 5.505-1.946 7.19a8.507 8.507 0 0 0 5.427-7.19h-3.48Zm3.481-1.5h-3.48c-.11-2.928-.848-5.505-1.947-7.19a8.507 8.507 0 0 1 5.427 7.19Zm-13.453 0c.108-2.928.847-5.505 1.946-7.19a8.507 8.507 0 0 0-5.427 7.19h3.48Zm-3.481 1.5a8.507 8.507 0 0 0 5.427 7.19c-1.099-1.685-1.838-4.262-1.946-7.19H3.533Z" clip-rule="evenodd"/></svg>';
const creditCardIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#1B2029" d="M5.75 14.656c0-.535.434-.969.969-.969H8.53a.969.969 0 1 1 0 1.938H6.72a.969.969 0 0 1-.969-.969ZM11.719 13.688a.969.969 0 1 0 0 1.937h3.062a.969.969 0 1 0 0-1.938H11.72Z"/><path fill="#1B2029" fill-rule="evenodd" d="M2 6.6A2.6 2.6 0 0 1 4.6 4h14.8A2.6 2.6 0 0 1 22 6.6v10.3a2.6 2.6 0 0 1-2.6 2.6H4.6A2.6 2.6 0 0 1 2 16.9V6.6Zm2.6-1.1h14.8a1.1 1.1 0 0 1 1.1 1.1v1.275h-17V6.6a1.1 1.1 0 0 1 1.1-1.1Zm15.9 4.958V16.9a1.1 1.1 0 0 1-1.1 1.1H4.6a1.1 1.1 0 0 1-1.1-1.1v-6.442h17Z" clip-rule="evenodd"/></svg>';
const idCardIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#1B2029" d="M13.25 9.313c0-.518.42-.938.938-.938h3.124a.937.937 0 1 1 0 1.875h-3.125a.937.937 0 0 1-.937-.938Zm.938 2.188a.937.937 0 1 0 0 1.875h1.874a.938.938 0 0 0 0-1.875h-1.875ZM10.75 9.625a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0ZM12 14.442c0-.387-.08-.769-.238-1.126-.157-.357-.387-.681-.677-.954s-.635-.49-1.014-.638a3.294 3.294 0 0 0-2.392 0c-.379.148-.724.365-1.014.638-.29.273-.52.597-.677.954-.157.357-.238.74-.238 1.126 0 .446.362.808.809.808h4.632a.809.809 0 0 0 .809-.808Z"/><path fill="#1B2029" fill-rule="evenodd" d="M4.6 4A2.6 2.6 0 0 0 2 6.6v9.8A2.6 2.6 0 0 0 4.6 19h14.8a2.6 2.6 0 0 0 2.6-2.6V6.6A2.6 2.6 0 0 0 19.4 4H4.6Zm14.8 1.5H4.6a1.1 1.1 0 0 0-1.1 1.1v9.8a1.1 1.1 0 0 0 1.1 1.1h14.8a1.1 1.1 0 0 0 1.1-1.1V6.6a1.1 1.1 0 0 0-1.1-1.1Z" clip-rule="evenodd"/></svg>';
const lockIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#1B2029" d="M10 10a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0 0 1.5h2.5A.75.75 0 0 0 10 10Z"/><path fill="#1B2029" fill-rule="evenodd" d="M4 4a4 4 0 0 1 7.153-2.462.75.75 0 1 1-1.182.924A2.5 2.5 0 0 0 5.5 4v1H13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V4ZM3 6.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5H3Z" clip-rule="evenodd"/></svg>';
const plusIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#1B2029" d="M8 1.006a.75.75 0 0 1 .75.75V7.25h5.517a.75.75 0 0 1 0 1.5H8.75v5.537a.75.75 0 0 1-1.5 0V8.75H1.746a.75.75 0 1 1 0-1.5H7.25V1.756a.75.75 0 0 1 .75-.75Z"/></svg>';
const viewCipherIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#1B2029" d="M20 15.5a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H9a.5.5 0 0 0-.5.5v7A.75.75 0 0 1 7 11V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7a.75.75 0 0 1 0-1.5h7Z"/><path fill="#1B2029" d="M4 8.5a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-1.25a.75.75 0 0 1 1.5 0V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.25a.75.75 0 0 1 0 1.5H4Z"/><path fill="#1B2029" d="M12 6.75c0 .414.336.75.75.75h2.69l-8.22 8.22a.75.75 0 1 0 1.06 1.06l8.22-8.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75Z"/></svg>';
const passkeyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#1B2029" fill-rule="evenodd" d="M11 3c0 1.026-.514 1.93-1.3 2.472a6.373 6.373 0 0 1 .465.143 5.899 5.899 0 0 1 1.86 1.054c.455.385.836.836 1.125 1.335a.75.75 0 1 1-1.3.75 3.583 3.583 0 0 0-.793-.94 4.4 4.4 0 0 0-1.66-.87 5.089 5.089 0 0 0-3.065.086 4.4 4.4 0 0 0-1.389.784c-.33.28-.596.598-.793.94a.75.75 0 0 1-1.3-.75c.289-.5.67-.95 1.124-1.335a5.899 5.899 0 0 1 1.861-1.054 6.363 6.363 0 0 1 .465-.143A3 3 0 1 1 11 3ZM8 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7.83 14a3.001 3.001 0 1 1 0-2h4.582a.25.25 0 0 1 .156.055l.972.777a.56.56 0 0 1 .046.832L12.41 14.84a.547.547 0 0 1-.824-.059L11 14h-.25l-.6.8a.5.5 0 0 1-.8 0l-.6-.8h-.92ZM4.5 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"/></svg>';
const circleCheckIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g fill="#1B2029" clip-path="url(#a)"><path d="M12.03 6.28a.75.75 0 0 0-1.06-1.06L6.75 9.44 5.03 7.72a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l4.75-4.75Z"/><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>';
const spinnerIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g fill="#1B2029" clip-path="url(#a)"><path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM14.5 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM11.536 11.536a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12ZM9.5 14.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM0 8a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM4.464 13.657a1.5 1.5 0 1 1-2.12-2.121 1.5 1.5 0 0 1 2.12 2.12ZM2.343 2.343a1.5 1.5 0 1 1 2.121 2.121 1.5 1.5 0 0 1-2.12-2.12Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>';
const keyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><g fill="#1B2029" clip-path="url(#a)"><path d="M15.75 9.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/><path fill-rule="evenodd" d="M14.5 17a7.473 7.473 0 0 1-3.055-.648L10.75 17v1.5a1 1 0 0 1-1 1h-1.5V21a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707L7.32 11.68A7.5 7.5 0 1 1 14.5 17Zm-5.482-4.896-.261-.86a6 6 0 1 1 3.3 3.738l-.909-.406-1.898 1.772V18h-2.5v2.5H3.5v-2.879l5.518-5.517Z" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></svg>';
const refreshIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#1B2029" fill-rule="evenodd" d="M3.052 10.777a.75.75 0 0 0 1.49.162c.393-3.61 3.514-6.443 7.329-6.443 2.737 0 5.12 1.46 6.39 3.62h-1.993a.75.75 0 0 0 0 1.5h3.981a.75.75 0 0 0 .75-.75V4.883a.75.75 0 1 0-1.5 0v2.38a8.897 8.897 0 0 0-7.628-4.267c-4.566 0-8.343 3.395-8.82 7.78Zm17.89 2.44a.75.75 0 0 0-1.49-.162c-.393 3.61-3.514 6.442-7.329 6.442a7.396 7.396 0 0 1-6.39-3.62h1.996a.75.75 0 0 0 0-1.5H3.747a.75.75 0 0 0-.75.75v3.983a.75.75 0 0 0 1.5 0v-2.376a8.897 8.897 0 0 0 7.626 4.263c4.566 0 8.343-3.395 8.82-7.78Zm-8.19-3.78a.75.75 0 0 0-1.5 0v1.594l-1.497-.49a.75.75 0 0 0-.467 1.425l1.51.494-.942 1.32a.75.75 0 1 0 1.22.871l.925-1.295.925 1.295a.75.75 0 1 0 1.22-.871l-.941-1.32 1.51-.494a.75.75 0 1 0-.467-1.426l-1.497.49V9.438Z" clip-rule="evenodd"/></svg>';

;// ./src/autofill/overlay/inline-menu/pages/shared/autofill-inline-menu-page-element.ts
var autofill_inline_menu_page_element_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class AutofillInlineMenuPageElement extends HTMLElement {
    constructor() {
        super();
        /**
         * Handles window messages from the parent window.
         *
         * @param event - The window message event
         */
        this.handleWindowMessage = (event) => {
            if (!this.windowMessageHandlers) {
                return;
            }
            if (event.source !== globalThis.parent) {
                return;
            }
            if (!this.messageOrigin) {
                this.messageOrigin = event.origin;
            }
            if (event.origin !== this.messageOrigin) {
                return;
            }
            const message = event === null || event === void 0 ? void 0 : event.data;
            if (!(message === null || message === void 0 ? void 0 : message.command)) {
                return;
            }
            const isInitCommand = message.command === "initAutofillInlineMenuButton" ||
                message.command === "initAutofillInlineMenuList";
            if (isInitCommand) {
                if (!(message === null || message === void 0 ? void 0 : message.token)) {
                    return;
                }
                this.token = message.token;
            }
            else {
                if (!this.token || !(message === null || message === void 0 ? void 0 : message.token) || message.token !== this.token) {
                    return;
                }
            }
            const handler = this.windowMessageHandlers[message === null || message === void 0 ? void 0 : message.command];
            if (!handler) {
                return;
            }
            handler({ message });
        };
        /**
         * Handles the window blur event.
         */
        this.handleWindowBlurEvent = () => {
            this.postMessageToParent({ command: "autofillInlineMenuBlurred" });
        };
        /**
         * Handles the document keydown event. Facilitates redirecting the
         * user focus in the right direction out of the inline menu. Also facilitates
         * closing the inline menu when the user presses the Escape key.
         *
         * @param event - The document keydown event
         */
        this.handleDocumentKeyDownEvent = (event) => {
            const listenedForKeys = new Set(["Tab", "Escape", "ArrowUp", "ArrowDown"]);
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            if (!EventSecurity.isEventTrusted(event) || !listenedForKeys.has(event.code)) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (event.code === "Tab") {
                this.sendRedirectFocusOutMessage(event.shiftKey ? RedirectFocusDirection.Previous : RedirectFocusDirection.Next);
                return;
            }
            if (event.code === "Escape") {
                this.sendRedirectFocusOutMessage(RedirectFocusDirection.Current);
            }
        };
        this.shadowDom = this.attachShadow({ mode: "closed" });
    }
    /**
     * Initializes the inline menu page element. Facilitates ensuring that the page
     * is set up with the expected styles and translations.
     *
     * @param elementName - The name of the element, e.g. "button" or "list"
     * @param styleSheetUrl - The URL of the stylesheet to apply to the page
     * @param translations - The translations to apply to the page
     * @param portKey - Background generated key that allows the port to communicate with the background
     */
    initAutofillInlineMenuPage(elementName, styleSheetUrl, translations, portKey) {
        return autofill_inline_menu_page_element_awaiter(this, void 0, void 0, function* () {
            this.portKey = portKey;
            this.translations = translations;
            globalThis.document.documentElement.setAttribute("lang", this.getTranslation("locale"));
            globalThis.document.head.title = this.getTranslation(`${elementName}PageTitle`);
            this.shadowDom.innerHTML = "";
            const linkElement = globalThis.document.createElement("link");
            linkElement.setAttribute("rel", "stylesheet");
            linkElement.setAttribute("href", styleSheetUrl);
            return linkElement;
        });
    }
    /**
     * Posts a window message to the parent window.
     *
     * @param message - The message to post
     */
    postMessageToParent(message) {
        // never send messages containing authentication tokens without a valid token and an established messageOrigin
        if (!this.token || !this.messageOrigin) {
            return;
        }
        const messageWithAuth = Object.assign(Object.assign({ portKey: this.portKey }, message), { token: this.token });
        globalThis.parent.postMessage(messageWithAuth, this.messageOrigin);
    }
    /**
     * Gets a translation from the translations object.
     *
     * @param key - The key of the translation to get
     */
    getTranslation(key) {
        return this.translations[key] || "";
    }
    /**
     * Sets up global listeners for the window message, window blur, and
     * document keydown events.
     *
     * @param windowMessageHandlers - The window message handlers to use
     */
    setupGlobalListeners(windowMessageHandlers) {
        this.windowMessageHandlers = windowMessageHandlers;
        globalThis.addEventListener(EVENTS.MESSAGE, this.handleWindowMessage);
        globalThis.addEventListener(EVENTS.BLUR, this.handleWindowBlurEvent);
        globalThis.document.addEventListener(EVENTS.KEYDOWN, this.handleDocumentKeyDownEvent);
    }
    /**
     * Redirects the inline menu focus out to the previous element on KeyDown of the `Tab+Shift` keys.
     * Redirects the inline menu focus out to the next element on KeyDown of the `Tab` key.
     * Redirects the inline menu focus out to the current element on KeyDown of the `Escape` key.
     *
     * @param direction - The direction to redirect the focus out
     */
    sendRedirectFocusOutMessage(direction) {
        this.postMessageToParent({ command: "redirectAutofillInlineMenuFocusOut", direction });
    }
}

;// ./src/autofill/overlay/inline-menu/pages/list/autofill-inline-menu-list.ts
var autofill_inline_menu_list_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};














class AutofillInlineMenuList extends AutofillInlineMenuPageElement {
    constructor() {
        super();
        this.eventHandlersMemo = {};
        this.ciphers = [];
        this.cipherListScrollIsDebounced = false;
        this.cipherListScrollDebounceTimeout = 0;
        this.currentCipherIndex = 0;
        this.showInlineMenuAccountCreation = false;
        this.showPasskeysLabels = false;
        this.passkeysHeadingHeight = 0;
        this.lastPasskeysListItemHeight = 0;
        this.ciphersListHeight = 0;
        this.isPasskeyAuthInProgress = false;
        this.authStatus = AuthenticationStatus.Locked;
        this.isInitialized = false;
        this.useLitComponents = false;
        this.theme = ThemeTypes.Light;
        this.showCiphersPerPage = 6;
        this.headingBorderClass = "inline-menu-list-heading--bordered";
        this.inlineMenuListWindowMessageHandlers = {
            initAutofillInlineMenuList: ({ message }) => this.initAutofillInlineMenuList(message),
            checkAutofillInlineMenuListFocused: () => this.checkInlineMenuListFocused(),
            updateAutofillInlineMenuListCiphers: ({ message }) => this.updateListItems(message),
            updateAutofillInlineMenuGeneratedPassword: ({ message }) => this.handleUpdateAutofillInlineMenuGeneratedPassword(message),
            showSaveLoginInlineMenuList: () => this.handleShowSaveLoginInlineMenuList(),
            focusAutofillInlineMenuList: () => this.focusInlineMenuList(),
        };
        this.handleSaveLoginInlineMenuKeyUp = (event) => {
            const listenedForKeys = new Set(["ArrowDown"]);
            if (
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            !EventSecurity.isEventTrusted(event) ||
                !listenedForKeys.has(event.code) ||
                !(event.target instanceof Element)) {
                return;
            }
            event.preventDefault();
            if (event.code === "ArrowDown") {
                event.target.focus();
                return;
            }
        };
        /**
         * Handles the click event for the unlock button.
         * Sends a message to the parent window to unlock the vault.
         */
        this.handleUnlockButtonClick = (event) => {
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            if (!EventSecurity.isEventTrusted(event)) {
                return;
            }
            this.postMessageToParent({ command: "unlockVault" });
        };
        /**
         * Handles the click event for the fill generated password button. Triggers
         * a message to the background script to fill the generated password.
         */
        this.handleFillGeneratedPasswordClick = (event) => {
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            if (event && !EventSecurity.isEventTrusted(event)) {
                return;
            }
            this.postMessageToParent({ command: "fillGeneratedPassword" });
        };
        /**
         * Handles the keyup event for the fill generated password button.
         *
         * @param event - The keyup event.
         */
        this.handleFillGeneratedPasswordKeyUp = (event) => {
            var _a;
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            if (!EventSecurity.isEventTrusted(event) ||
                event.ctrlKey ||
                event.altKey ||
                event.metaKey ||
                event.shiftKey) {
                return;
            }
            if (event.code === "Space") {
                this.handleFillGeneratedPasswordClick();
                return;
            }
            if (event.code === "ArrowRight" &&
                event.target instanceof HTMLElement &&
                event.target.nextElementSibling) {
                event.target.nextElementSibling.focus();
                (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("remove-outline");
                return;
            }
        };
        /**
         * Handles the click event of the password regenerator button.
         *
         * @param event - The click event.
         */
        this.handleRefreshGeneratedPasswordClick = (event) => {
            var _a;
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            if (event && !EventSecurity.isEventTrusted(event)) {
                return;
            }
            if (event) {
                (_a = event.target
                    .closest(".password-generator-actions")) === null || _a === void 0 ? void 0 : _a.classList.add("remove-outline");
            }
            this.postMessageToParent({ command: "refreshGeneratedPassword" });
        };
        /**
         * Handles the keyup event for the password regenerator button.
         *
         * @param event - The keyup event.
         */
        this.handleRefreshGeneratedPasswordKeyUp = (event) => {
            var _a;
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            if (!EventSecurity.isEventTrusted(event) ||
                event.ctrlKey ||
                event.altKey ||
                event.metaKey ||
                event.shiftKey) {
                return;
            }
            if (event.code === "Space") {
                this.handleRefreshGeneratedPasswordClick();
                return;
            }
            if (event.code === "ArrowLeft" &&
                event.target instanceof HTMLElement &&
                event.target.previousElementSibling) {
                event.target.previousElementSibling.focus();
                (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("remove-outline");
                return;
            }
        };
        this.updateLitCiphersListOnScroll = (event) => {
            event.stopPropagation();
            if (this.cipherListScrollIsDebounced) {
                return;
            }
            this.cipherListScrollIsDebounced = true;
            if (this.cipherListScrollDebounceTimeout) {
                clearTimeout(this.cipherListScrollDebounceTimeout);
            }
            this.cipherListScrollDebounceTimeout = globalThis.setTimeout(this.handleDebouncedLitScrollEvent, 300);
        };
        this.handleDebouncedLitScrollEvent = () => {
            this.cipherListScrollIsDebounced = false;
            if (this.allCiphersLoaded() || !this.litCipherListScrollElement) {
                return;
            }
            if (!this.hasScrolledPastLoadThreshold(this.litCipherListScrollElement)) {
                return;
            }
            const previousIndex = this.currentCipherIndex;
            this.loadLitPageOfCiphers();
            if (this.currentCipherIndex === previousIndex) {
                return;
            }
            this.renderLitCipherList();
        };
        /**
         * Handles the click event for the new item button.
         * Sends a message to the parent window to add a new vault item.
         */
        this.handleNewLoginVaultItemAction = (event) => {
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            if (!EventSecurity.isEventTrusted(event)) {
                return;
            }
            let addNewCipherType = this.inlineMenuFillType;
            if (this.showInlineMenuAccountCreation) {
                addNewCipherType = CipherType.Login;
            }
            this.postMessageToParent({
                command: "addNewVaultItem",
                addNewCipherType,
            });
        };
        /**
         * Handles updating the list of ciphers when the
         * user scrolls to the bottom of the list.
         */
        this.updateCiphersListOnScroll = (event) => {
            event.stopPropagation();
            if (this.cipherListScrollIsDebounced) {
                return;
            }
            this.cipherListScrollIsDebounced = true;
            if (this.cipherListScrollDebounceTimeout) {
                clearTimeout(this.cipherListScrollDebounceTimeout);
            }
            this.cipherListScrollDebounceTimeout = globalThis.setTimeout(this.handleDebouncedScrollEvent, 300);
        };
        /**
         * Debounced handler for updating the list of ciphers when the user scrolls to
         * the bottom of the list. Triggers at most once every 300ms.
         */
        this.handleDebouncedScrollEvent = () => {
            this.cipherListScrollIsDebounced = false;
            const cipherListScrollTop = this.ciphersList.scrollTop;
            this.updatePasskeysHeadingsOnScroll(cipherListScrollTop);
            if (this.allCiphersLoaded()) {
                return;
            }
            if (this.hasScrolledPastLoadThreshold(this.ciphersList)) {
                this.loadPageOfCiphers();
            }
        };
        /**
         * Throttled handler for updating the passkeys and login headings when the user scrolls the ciphers list.
         *
         * @param event - The scroll event.
         */
        this.handleThrottledOnScrollEvent = (event) => {
            event.stopPropagation();
            this.updatePasskeysHeadingsOnScroll(this.ciphersList.scrollTop);
        };
        /**
         * Updates the passkeys and login headings when the user scrolls the ciphers list.
         *
         * @param cipherListScrollTop - The current scroll top position of the ciphers list.
         */
        this.updatePasskeysHeadingsOnScroll = (cipherListScrollTop) => {
            if (!this.showPasskeysLabels) {
                return;
            }
            if (this.passkeysHeadingElement) {
                this.togglePasskeysHeadingAnchored(cipherListScrollTop);
                this.togglePasskeysHeadingBorder(cipherListScrollTop);
            }
            if (this.loginHeadingElement) {
                this.toggleLoginHeadingBorder(cipherListScrollTop);
            }
        };
        /**
         * Handles the click event for the fill cipher button.
         * Sends a message to the parent window to fill the selected cipher.
         *
         * @param cipher - The cipher to fill.
         */
        this.handleFillCipherClickEvent = (cipher) => {
            var _a;
            const usePasskey = !!((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey);
            return this.useEventHandlersMemo((event) => {
                /**
                 * Reject synthetic events (not originating from the user agent)
                 */
                if (!EventSecurity.isEventTrusted(event)) {
                    return;
                }
                this.triggerFillCipherClickEvent(cipher, usePasskey);
            }, `${cipher.id}-fill-cipher-button-click-handler-${usePasskey ? "passkey" : ""}`);
        };
        /**
         * Triggers a fill of the currently selected cipher.
         *
         * @param cipher - The cipher to fill.
         * @param usePasskey - Whether the cipher uses a passkey.
         */
        this.triggerFillCipherClickEvent = (cipher, usePasskey) => {
            if (usePasskey) {
                this.createPasskeyAuthenticatingLoader();
            }
            this.postMessageToParent({
                command: "fillAutofillInlineMenuCipher",
                inlineMenuCipherId: cipher.id,
                usePasskey,
            });
        };
        /**
         * Handles the keyup event for the fill cipher button. Facilitates
         * selecting the next/previous cipher item on ArrowDown/ArrowUp. Also
         * facilitates moving keyboard focus to the view cipher button on ArrowRight.
         *
         * @param event - The keyup event.
         */
        this.handleFillCipherKeyUpEvent = (event) => {
            const listenedForKeys = new Set(["ArrowDown", "ArrowUp", "ArrowRight"]);
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            if (!EventSecurity.isEventTrusted(event) ||
                !listenedForKeys.has(event.code) ||
                !(event.target instanceof Element)) {
                return;
            }
            event.preventDefault();
            const currentListItem = event.target.closest(".inline-menu-list-actions-item");
            if (event.code === "ArrowDown") {
                this.focusNextListItem(currentListItem);
                return;
            }
            if (event.code === "ArrowUp") {
                this.focusPreviousListItem(currentListItem);
                return;
            }
            this.focusViewCipherButton(currentListItem, event.target);
        };
        /**
         * Handles the keyup event for the "New Item" button. Allows for keyboard navigation
         * between ciphers elements if the other ciphers exist in the inline menu.
         *
         * @param event - The captured keyup event.
         */
        this.handleNewItemButtonKeyUpEvent = (event) => {
            var _a, _b;
            const listenedForKeys = new Set(["ArrowDown", "ArrowUp"]);
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            if (!EventSecurity.isEventTrusted(event) ||
                !listenedForKeys.has(event.code) ||
                !(event.target instanceof Element)) {
                return;
            }
            if (this.useLitComponents) {
                const fillButtons = this.inlineMenuListContainer.querySelectorAll("[data-fill-cipher]");
                const target = event.code === "ArrowDown" ? fillButtons[0] : fillButtons[fillButtons.length - 1];
                target === null || target === void 0 ? void 0 : target.focus();
                return;
            }
            if (event.code === "ArrowDown") {
                const firstFillButton = (_a = this.ciphersList.firstElementChild) === null || _a === void 0 ? void 0 : _a.querySelector(".fill-cipher-button");
                firstFillButton === null || firstFillButton === void 0 ? void 0 : firstFillButton.focus();
                return;
            }
            const lastFillButton = (_b = this.ciphersList.lastElementChild) === null || _b === void 0 ? void 0 : _b.querySelector(".fill-cipher-button");
            lastFillButton === null || lastFillButton === void 0 ? void 0 : lastFillButton.focus();
        };
        /**
         * Handles the click event for the view cipher button. Sends a
         * message to the parent window to view the selected cipher.
         *
         * @param cipher - The cipher to view.
         */
        this.handleViewCipherClickEvent = (cipher) => {
            return this.useEventHandlersMemo((event) => {
                /**
                 * Reject synthetic events (not originating from the user agent)
                 */
                if (!EventSecurity.isEventTrusted(event)) {
                    return;
                }
                this.postMessageToParent({ command: "viewSelectedCipher", inlineMenuCipherId: cipher.id });
            }, `${cipher.id}-view-cipher-button-click-handler`);
        };
        /**
         * Handles the keyup event for the view cipher button. Facilitates
         * selecting the next/previous cipher item on ArrowDown/ArrowUp.
         * Also facilitates moving keyboard focus to the current fill
         * cipher button on ArrowLeft.
         *
         * @param event - The keyup event.
         */
        this.handleViewCipherKeyUpEvent = (event) => {
            const listenedForKeys = new Set(["ArrowDown", "ArrowUp", "ArrowLeft"]);
            /**
             * Reject synthetic events (not originating from the user agent)
             */
            if (!EventSecurity.isEventTrusted(event) ||
                !listenedForKeys.has(event.code) ||
                !(event.target instanceof Element)) {
                return;
            }
            event.preventDefault();
            const currentListItem = event.target.closest(".inline-menu-list-actions-item");
            const cipherContainer = currentListItem.querySelector(".cipher-container");
            cipherContainer === null || cipherContainer === void 0 ? void 0 : cipherContainer.classList.remove("remove-outline");
            if (event.code === "ArrowDown") {
                this.focusNextListItem(currentListItem);
                return;
            }
            if (event.code === "ArrowUp") {
                this.focusPreviousListItem(currentListItem);
                return;
            }
            const previousSibling = event.target.previousElementSibling;
            previousSibling === null || previousSibling === void 0 ? void 0 : previousSibling.focus();
        };
        /**
         * Triggers a re-check of the list's focus status when the mouse leaves the list.
         */
        this.handleMouseOutEvent = () => {
            globalThis.document.removeEventListener(EVENTS.MOUSEOUT, this.handleMouseOutEvent);
            this.checkInlineMenuListFocused();
        };
        /**
         * Validates whether the inline menu list iframe is currently hovered.
         */
        this.isListHovered = () => {
            var _a;
            const hoveredElement = (_a = this.inlineMenuListContainer) === null || _a === void 0 ? void 0 : _a.querySelector(":hover");
            return !!(hoveredElement &&
                (hoveredElement === this.inlineMenuListContainer ||
                    this.inlineMenuListContainer.contains(hoveredElement)));
        };
        /**
         * Handles the resize observer event. Facilitates updating the height of the
         * inline menu list iframe when the height of the list changes.
         *
         * @param entries - The resize observer entries.
         */
        this.handleResizeObserver = (entries) => {
            for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
                const entry = entries[entryIndex];
                if (entry.target !== this.inlineMenuListContainer) {
                    continue;
                }
                const { height } = entry.contentRect;
                this.toggleScrollClass(height);
                this.postMessageToParent({
                    command: "updateAutofillInlineMenuListHeight",
                    styles: { height: `${height}px` },
                });
                break;
            }
        };
        /**
         * Toggles the scrollbar class on the inline menu list actions container.
         *
         * @param height - The height of the inline menu list actions container.
         */
        this.toggleScrollClass = (height) => {
            if (!this.ciphersList) {
                return;
            }
            const scrollbarClass = "inline-menu-list-actions--scrollbar";
            let containerHeight = height;
            if (!containerHeight) {
                const inlineMenuListContainerRects = this.inlineMenuListContainer.getBoundingClientRect();
                containerHeight = inlineMenuListContainerRects.height;
            }
            if (containerHeight >= 170) {
                this.ciphersList.classList.add(scrollbarClass);
                return;
            }
            this.ciphersList.classList.remove(scrollbarClass);
        };
        /**
         * Establishes a memoized event handler for a given event.
         *
         * @param eventHandler - The event handler to memoize.
         * @param memoIndex - The memo index to use for the event handler.
         */
        this.useEventHandlersMemo = (eventHandler, memoIndex) => {
            return this.eventHandlersMemo[memoIndex] || (this.eventHandlersMemo[memoIndex] = eventHandler);
        };
        /**
         * Identifies if the current focused field is filled by a login cipher.
         */
        this.isFilledByLoginCipher = () => {
            return this.inlineMenuFillType === CipherType.Login;
        };
        /**
         * Identifies if the current focused field is filled by a card cipher.
         */
        this.isFilledByCardCipher = () => {
            return this.inlineMenuFillType === CipherType.Card;
        };
        /**
         * Identifies if the current focused field is filled by an identity cipher.
         */
        this.isFilledByIdentityCipher = () => {
            return this.inlineMenuFillType === CipherType.Identity;
        };
        /**
         * Identifies if the passed list item is a heading element.
         *
         * @param listItem - The list item to check.
         */
        this.listItemIsHeadingElement = (listItem) => {
            return listItem === this.passkeysHeadingElement || listItem === this.loginHeadingElement;
        };
        this.resizeObserver = new ResizeObserver(this.handleResizeObserver);
        this.setupInlineMenuListGlobalListeners();
    }
    /**
     * Initializes the inline menu list and updates the list items with the passed ciphers.
     * If the auth status is not `Unlocked`, the locked inline menu is built.
     *
     * @param message - The message containing the data to initialize the inline menu list.
     */
    initAutofillInlineMenuList(message) {
        return autofill_inline_menu_list_awaiter(this, void 0, void 0, function* () {
            const { translations, styleSheetUrl, theme, authStatus, ciphers = [], portKey, inlineMenuFillType = CipherType.Login, showInlineMenuAccountCreation = false, showPasskeysLabels = false, generatedPassword, showSaveLoginMenu, showAnimations = true, useLitComponents = false, } = message;
            const linkElement = yield this.initAutofillInlineMenuPage("list", styleSheetUrl, translations, portKey);
            this.authStatus = authStatus;
            this.inlineMenuFillType = inlineMenuFillType;
            this.showPasskeysLabels = showPasskeysLabels;
            this.useLitComponents = useLitComponents;
            if (useLitComponents) {
                this.theme = resolveTheme(theme);
            }
            const themeClass = `theme_${theme}`;
            globalThis.document.documentElement.classList.add(themeClass);
            this.inlineMenuListContainer = globalThis.document.createElement("div");
            this.inlineMenuListContainer.classList.add("inline-menu-list-container", themeClass);
            if (!showAnimations) {
                this.inlineMenuListContainer.classList.add("no-animations");
            }
            this.resizeObserver.observe(this.inlineMenuListContainer);
            this.shadowDom.append(linkElement, this.inlineMenuListContainer);
            this.isInitialized = true;
            if (authStatus !== AuthenticationStatus.Unlocked) {
                this.buildLockedInlineMenu();
                return;
            }
            if (showSaveLoginMenu) {
                this.buildSaveLoginInlineMenu();
                return;
            }
            if (generatedPassword) {
                this.buildPasswordGenerator(generatedPassword);
                return;
            }
            this.updateListItems({
                ciphers,
                showInlineMenuAccountCreation,
            });
        });
    }
    /**
     * Builds the locked inline menu, which is displayed when the user is not authenticated.
     * Facilitates the ability to unlock the extension from the inline menu.
     */
    buildLockedInlineMenu() {
        if (this.useLitComponents) {
            this.renderLit(InlineMenuPrompt({
                message: this.getTranslation("unlockYourAccountToViewAutofillSuggestions"),
                actionText: this.getTranslation("unlockAccount"),
                i18n: { actionAria: this.getTranslation("unlockAccountAria") },
                theme: this.theme,
                icon: Lock,
                handleAction: (event) => this.handleUnlockButtonClick(event),
                dataTestId: "inline-menu-locked-state",
                actionDataTestId: "inline-menu-unlock-button",
            }));
            return;
        }
        const lockedInlineMenu = globalThis.document.createElement("div");
        lockedInlineMenu.id = "locked-inline-menu-description";
        lockedInlineMenu.classList.add("locked-inline-menu", "inline-menu-list-message");
        lockedInlineMenu.textContent = this.getTranslation("unlockYourAccountToViewAutofillSuggestions");
        const unlockButtonElement = globalThis.document.createElement("button");
        unlockButtonElement.id = "unlock-button";
        unlockButtonElement.tabIndex = -1;
        unlockButtonElement.classList.add("unlock-button", "inline-menu-list-button", "inline-menu-list-action");
        unlockButtonElement.textContent = this.getTranslation("unlockAccount");
        unlockButtonElement.setAttribute("aria-label", this.getTranslation("unlockAccountAria"));
        unlockButtonElement.prepend(buildSvgDomElement(lockIcon));
        unlockButtonElement.addEventListener(EVENTS.CLICK, this.handleUnlockButtonClick);
        const inlineMenuListButtonContainer = this.buildButtonContainer(unlockButtonElement);
        this.inlineMenuListContainer.append(lockedInlineMenu, inlineMenuListButtonContainer);
    }
    /**
     * Builds the inline menu list as a prompt that asks the user if they'd like to save the login data.
     */
    buildSaveLoginInlineMenu() {
        this.showInlineMenuAccountCreation = true;
        if (this.useLitComponents) {
            this.renderLit(InlineMenuPrompt({
                actionText: this.getTranslation("saveToBitwarden"),
                i18n: {
                    actionAria: `${this.getTranslation("saveToBitwarden")}, ${this.getTranslation("opensInANewWindow")}`,
                },
                theme: this.theme,
                handleAction: (event) => this.handleNewLoginVaultItemAction(event),
                handleKeyUp: this.handleSaveLoginInlineMenuKeyUp,
                dataTestId: "inline-menu-save-login",
                actionDataTestId: "inline-menu-save-login-button",
            }));
            return;
        }
        const saveLoginButton = globalThis.document.createElement("button");
        saveLoginButton.classList.add("save-login", "inline-menu-list-button", "inline-menu-list-action");
        saveLoginButton.tabIndex = -1;
        saveLoginButton.setAttribute("aria-label", `${this.getTranslation("saveToBitwarden")}, ${this.getTranslation("opensInANewWindow")}`);
        saveLoginButton.textContent = this.getTranslation("saveToBitwarden");
        saveLoginButton.addEventListener(EVENTS.CLICK, this.handleNewLoginVaultItemAction);
        saveLoginButton.addEventListener(EVENTS.KEYUP, this.handleSaveLoginInlineMenuKeyUp);
        const inlineMenuListButtonContainer = this.buildButtonContainer(saveLoginButton);
        this.inlineMenuListContainer.append(inlineMenuListButtonContainer);
    }
    renderLit(template) {
        if (!this.litHost) {
            this.litHost = globalThis.document.createElement("div");
        }
        if (!this.inlineMenuListContainer.contains(this.litHost)) {
            this.inlineMenuListContainer.appendChild(this.litHost);
        }
        D(template, this.litHost);
        this.syncEmotionStylesIntoShadowDom();
    }
    syncEmotionStylesIntoShadowDom() {
        this.shadowDom
            .querySelectorAll("style[data-lit-inline-menu-emotion]")
            .forEach((styleEl) => styleEl.remove());
        globalThis.document.head.querySelectorAll("style[data-emotion]").forEach((styleEl) => {
            var _a, _b;
            const source = styleEl;
            const clone = source.cloneNode(true);
            if (!clone.textContent) {
                clone.textContent = Array.from((_b = (_a = source.sheet) === null || _a === void 0 ? void 0 : _a.cssRules) !== null && _b !== void 0 ? _b : [])
                    .map((rule) => rule.cssText)
                    .join("");
            }
            clone.setAttribute("data-lit-inline-menu-emotion", "true");
            this.shadowDom.append(clone);
        });
    }
    /**
     * Handles the show save login inline menu list message that is triggered from the background script.
     */
    handleShowSaveLoginInlineMenuList() {
        if (this.authStatus === AuthenticationStatus.Unlocked) {
            this.resetInlineMenuContainer();
            this.buildSaveLoginInlineMenu();
        }
    }
    /**
     * Builds the password generator within the inline menu.
     *
     * @param generatedPassword - The generated password to display.
     */
    buildPasswordGenerator(generatedPassword) {
        if (this.useLitComponents) {
            this.renderLitPasswordGenerator(generatedPassword);
            return;
        }
        this.passwordGeneratorContainer = globalThis.document.createElement("div");
        this.passwordGeneratorContainer.classList.add("password-generator-container");
        const passwordGeneratorActions = globalThis.document.createElement("div");
        passwordGeneratorActions.classList.add("password-generator-actions");
        const fillGeneratedPasswordButton = globalThis.document.createElement("button");
        fillGeneratedPasswordButton.tabIndex = -1;
        fillGeneratedPasswordButton.classList.add("fill-generated-password-button", "inline-menu-list-action");
        fillGeneratedPasswordButton.setAttribute("aria-label", this.getTranslation("fillGeneratedPassword"));
        const passwordGeneratorHeading = globalThis.document.createElement("div");
        passwordGeneratorHeading.classList.add("password-generator-heading");
        passwordGeneratorHeading.textContent = this.getTranslation("fillGeneratedPassword");
        const passwordGeneratorContent = globalThis.document.createElement("div");
        passwordGeneratorContent.id = "password-generator-content";
        passwordGeneratorContent.classList.add("password-generator-content");
        passwordGeneratorContent.append(passwordGeneratorHeading, this.buildColorizedPasswordElement(generatedPassword));
        fillGeneratedPasswordButton.append(buildSvgDomElement(keyIcon), passwordGeneratorContent);
        fillGeneratedPasswordButton.addEventListener(EVENTS.CLICK, this.handleFillGeneratedPasswordClick);
        fillGeneratedPasswordButton.addEventListener(EVENTS.KEYUP, this.handleFillGeneratedPasswordKeyUp);
        const refreshGeneratedPasswordButton = globalThis.document.createElement("button");
        refreshGeneratedPasswordButton.tabIndex = -1;
        refreshGeneratedPasswordButton.classList.add("refresh-generated-password-button", "inline-menu-list-action");
        refreshGeneratedPasswordButton.setAttribute("aria-label", this.getTranslation("regeneratePassword"));
        refreshGeneratedPasswordButton.appendChild(buildSvgDomElement(refreshIcon));
        refreshGeneratedPasswordButton.addEventListener(EVENTS.CLICK, this.handleRefreshGeneratedPasswordClick);
        refreshGeneratedPasswordButton.addEventListener(EVENTS.KEYUP, this.handleRefreshGeneratedPasswordKeyUp);
        passwordGeneratorActions.append(fillGeneratedPasswordButton, refreshGeneratedPasswordButton);
        this.passwordGeneratorContainer.appendChild(passwordGeneratorActions);
        this.inlineMenuListContainer.appendChild(this.passwordGeneratorContainer);
    }
    renderLitPasswordGenerator(generatedPassword) {
        const characterDescriptors = {};
        for (const key of Object.values(specialCharacterToKeyMap)) {
            characterDescriptors[key] = this.getTranslation(key);
        }
        this.renderLit(InlineMenuPasswordGenerator({
            password: generatedPassword,
            headingText: this.getTranslation("fillGeneratedPassword"),
            theme: this.theme,
            i18n: {
                generatedPassword: this.getTranslation("generatedPassword"),
                lowercaseAriaLabel: this.getTranslation("lowercaseAriaLabel"),
                uppercaseAriaLabel: this.getTranslation("uppercaseAriaLabel"),
                regeneratePassword: this.getTranslation("regeneratePassword"),
                characterDescriptors,
            },
            handleFillPassword: () => this.postMessageToParent({ command: "fillGeneratedPassword" }),
            handleRefreshPassword: () => this.postMessageToParent({ command: "refreshGeneratedPassword" }),
        }));
    }
    /**
     * Builds the colorized password content element.
     *
     * @param password - The password to display.
     */
    buildColorizedPasswordElement(password) {
        let ariaDescription = `${this.getTranslation("generatedPassword")}: `;
        const passwordContainer = globalThis.document.createElement("div");
        passwordContainer.classList.add("colorized-password");
        const appendPasswordCharacter = (character, type) => {
            const characterElement = globalThis.document.createElement("div");
            characterElement.classList.add(`password-${type}`);
            characterElement.textContent = character;
            passwordContainer.appendChild(characterElement);
        };
        const passwordArray = Array.from(password);
        for (let i = 0; i < passwordArray.length; i++) {
            const character = passwordArray[i];
            if (character.match(/\W/)) {
                appendPasswordCharacter(character, "special");
                ariaDescription += `${this.getTranslation(specialCharacterToKeyMap[character])} `;
                continue;
            }
            if (character.match(/\d/)) {
                appendPasswordCharacter(character, "number");
                ariaDescription += `${character} `;
                continue;
            }
            appendPasswordCharacter(character, "letter");
            ariaDescription +=
                character === character.toLowerCase()
                    ? `${this.getTranslation("lowercaseAriaLabel")} ${character} `
                    : `${this.getTranslation("uppercaseAriaLabel")} ${character} `;
        }
        passwordContainer.setAttribute("aria-label", ariaDescription);
        return passwordContainer;
    }
    /**
     * Updates the generated password content element with the passed generated password.
     *
     * @param message - The message containing the generated password.
     */
    handleUpdateAutofillInlineMenuGeneratedPassword(message) {
        if (this.authStatus !== AuthenticationStatus.Unlocked || !message.generatedPassword) {
            return;
        }
        if (this.useLitComponents) {
            if (!this.inlineMenuListContainer.querySelector("[data-fill-generated-password]")) {
                this.resetInlineMenuContainer();
            }
            this.renderLitPasswordGenerator(message.generatedPassword);
            return;
        }
        const passwordGeneratorContentElement = this.inlineMenuListContainer.querySelector("#password-generator-content");
        const colorizedPasswordElement = passwordGeneratorContentElement === null || passwordGeneratorContentElement === void 0 ? void 0 : passwordGeneratorContentElement.querySelector(".colorized-password");
        if (!colorizedPasswordElement) {
            this.resetInlineMenuContainer();
            this.buildPasswordGenerator(message.generatedPassword);
            return;
        }
        colorizedPasswordElement.replaceWith(this.buildColorizedPasswordElement(message.generatedPassword));
    }
    /**
     * Filters the ciphers to include only TOTP-related ones if the field is a TOTP field.
     * If the field is a TOTP field but no TOTP is present, it returns an empty array.
     *
     * @param ciphers - The list of ciphers to filter.
     * @returns The filtered list of ciphers or an empty list if no valid TOTP ciphers are present.
     */
    getFilteredCiphersForTotpField(ciphers) {
        if (!(ciphers === null || ciphers === void 0 ? void 0 : ciphers.length)) {
            return [];
        }
        const isTotpField = this.inlineMenuFillType === CipherType.Login &&
            ciphers.some((cipher) => { var _a; return (_a = cipher.login) === null || _a === void 0 ? void 0 : _a.totpField; });
        if (isTotpField) {
            return ciphers.filter((cipher) => { var _a; return (_a = cipher.login) === null || _a === void 0 ? void 0 : _a.totp; });
        }
        return ciphers;
    }
    /**
     * Updates the list items with the passed ciphers.
     * If no ciphers are passed, the no results inline menu is built.
     *
     * @param ciphers - The ciphers to display in the inline menu list.
     * @param showInlineMenuAccountCreation - Whether identity ciphers are shown on login fields.
     */
    updateListItems({ ciphers = [], showInlineMenuAccountCreation = false, }) {
        var _a;
        if (this.isPasskeyAuthInProgress) {
            return;
        }
        this.ciphers = this.getFilteredCiphersForTotpField(ciphers);
        this.currentCipherIndex = 0;
        this.showInlineMenuAccountCreation = showInlineMenuAccountCreation;
        this.resetInlineMenuContainer();
        if (!((_a = this.ciphers) === null || _a === void 0 ? void 0 : _a.length)) {
            this.buildNoResultsInlineMenuList();
            return;
        }
        if (this.useLitComponents) {
            this.loadLitPageOfCiphers();
            this.renderLitCipherList();
            return;
        }
        this.ciphersList = globalThis.document.createElement("ul");
        this.ciphersList.classList.add("inline-menu-list-actions");
        this.ciphersList.setAttribute("role", "list");
        this.setupCipherListScrollListeners();
        this.loadPageOfCiphers();
        this.inlineMenuListContainer.appendChild(this.ciphersList);
        this.toggleScrollClass();
        if (!this.showInlineMenuAccountCreation) {
            return;
        }
        const addNewLoginButtonContainer = this.buildNewItemButton();
        this.inlineMenuListContainer.appendChild(addNewLoginButtonContainer);
        this.inlineMenuListContainer.classList.add("inline-menu-list-container--with-new-item-button");
        this.newItemButtonElement.addEventListener(EVENTS.KEYUP, this.handleNewItemButtonKeyUpEvent);
    }
    renderLitCipherList() {
        this.renderLit(InlineMenuCipherList({
            ciphers: this.ciphers.slice(0, this.currentCipherIndex),
            theme: this.theme,
            showPasskeysLabels: this.showPasskeysLabels,
            viewButtonText: this.getTranslation("view"),
            opensInANewWindowText: this.getTranslation("opensInANewWindow"),
            fillCredentialsForText: this.getTranslation("fillCredentialsFor"),
            logInWithPasskeyAriaLabel: this.getTranslation("logInWithPasskeyAriaLabel"),
            usernameText: this.getTranslation("username"),
            cardNumberEndsWithText: this.getTranslation("cardNumberEndsWith"),
            fillVerificationCodeText: this.getTranslation("fillVerificationCode"),
            totpCodeAria: this.getTranslation("totpCodeAria"),
            passkeysText: this.getTranslation("passkeys"),
            passwordsText: this.getTranslation("passwords"),
            handleFillCipher: (cipher) => { var _a; return this.triggerFillCipherClickEvent(cipher, !!((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey)); },
            handleViewCipher: (cipher) => this.postMessageToParent({
                command: "viewSelectedCipher",
                inlineMenuCipherId: cipher.id,
            }),
            onTotpPeriodElapsed: () => this.postMessageToParent({ command: "refreshOverlayCiphers" }),
            onListEdgeReached: this.showInlineMenuAccountCreation
                ? () => { var _a; return (_a = this.newItemButtonElement) === null || _a === void 0 ? void 0 : _a.focus(); }
                : undefined,
        }));
        this.setupLitCipherListScrollListeners();
        if (!this.showInlineMenuAccountCreation) {
            return;
        }
        if (this.newItemButtonElement) {
            return;
        }
        const addNewLoginButtonContainer = this.buildNewItemButton();
        this.inlineMenuListContainer.appendChild(addNewLoginButtonContainer);
        this.inlineMenuListContainer.classList.add("inline-menu-list-container--with-new-item-button");
        this.newItemButtonElement.addEventListener(EVENTS.KEYUP, this.handleNewItemButtonKeyUpEvent);
    }
    loadLitPageOfCiphers() {
        this.currentCipherIndex = Math.min(this.currentCipherIndex + this.showCiphersPerPage, this.ciphers.length);
    }
    setupLitCipherListScrollListeners() {
        var _a;
        const scrollEl = (_a = this.litHost) === null || _a === void 0 ? void 0 : _a.querySelector("[data-cipher-list-scroll]");
        if (this.litCipherListScrollElement) {
            this.litCipherListScrollElement.removeEventListener(EVENTS.SCROLL, this.updateLitCiphersListOnScroll);
            this.litCipherListScrollElement = undefined;
        }
        if (!scrollEl || this.allCiphersLoaded()) {
            return;
        }
        this.litCipherListScrollElement = scrollEl;
        this.ciphersListHeight = 0;
        scrollEl.addEventListener(EVENTS.SCROLL, this.updateLitCiphersListOnScroll, { passive: true });
    }
    /**
     * Clears and resets the inline menu list container.
     * Disconnect Lit first so ref cleanups run before the host
     */
    resetInlineMenuContainer() {
        if (this.inlineMenuListContainer) {
            if (this.litCipherListScrollElement) {
                this.litCipherListScrollElement.removeEventListener(EVENTS.SCROLL, this.updateLitCiphersListOnScroll);
                this.litCipherListScrollElement = undefined;
            }
            if (this.litHost) {
                D(A, this.litHost);
            }
            this.inlineMenuListContainer.innerHTML = "";
            this.inlineMenuListContainer.classList.remove("inline-menu-list-container--with-new-item-button");
            this.newItemButtonElement = undefined;
        }
    }
    /**
     * Inline menu view that is presented when no ciphers are found for a given page.
     * Facilitates the ability to add a new vault item from the inline menu.
     */
    buildNoResultsInlineMenuList() {
        const noItemsMessage = globalThis.document.createElement("div");
        noItemsMessage.classList.add("no-items", "inline-menu-list-message");
        noItemsMessage.textContent = this.getTranslation("noItemsToShow");
        const newItemButton = this.buildNewItemButton();
        this.inlineMenuListContainer.append(noItemsMessage, newItemButton);
    }
    /**
     * Builds a "New Item" button and returns the container of that button.
     */
    buildNewItemButton(showLogin = false) {
        this.newItemButtonElement = globalThis.document.createElement("button");
        this.newItemButtonElement.tabIndex = -1;
        this.newItemButtonElement.id = "new-item-button";
        this.newItemButtonElement.classList.add("add-new-item-button", "inline-menu-list-button", "inline-menu-list-action");
        this.newItemButtonElement.textContent = this.getNewItemButtonText(showLogin);
        this.newItemButtonElement.setAttribute("aria-label", this.getNewItemAriaLabel(showLogin));
        this.newItemButtonElement.prepend(buildSvgDomElement(plusIcon));
        this.newItemButtonElement.addEventListener(EVENTS.CLICK, this.handleNewLoginVaultItemAction);
        return this.buildButtonContainer(this.newItemButtonElement);
    }
    /**
     * Gets the new item text for the button based on the cipher type the focused field is filled by.
     */
    getNewItemButtonText(showLogin) {
        if (this.isFilledByLoginCipher() || this.showInlineMenuAccountCreation || showLogin) {
            return this.getTranslation("newLogin");
        }
        if (this.isFilledByCardCipher()) {
            return this.getTranslation("newCard");
        }
        if (this.isFilledByIdentityCipher()) {
            return this.getTranslation("newIdentity");
        }
        return this.getTranslation("newItem");
    }
    /**
     * Gets the aria label for the new item button based on the cipher type the focused field is filled by.
     */
    getNewItemAriaLabel(showLogin) {
        if (this.isFilledByLoginCipher() || this.showInlineMenuAccountCreation || showLogin) {
            return this.getTranslation("addNewLoginItemAria");
        }
        if (this.isFilledByCardCipher()) {
            return this.getTranslation("addNewCardItemAria");
        }
        if (this.isFilledByIdentityCipher()) {
            return this.getTranslation("addNewIdentityItemAria");
        }
        return this.getTranslation("addNewVaultItem");
    }
    /**
     * Builds a container for a given element.
     *
     * @param element - The element to build the container for.
     */
    buildButtonContainer(element) {
        const inlineMenuListButtonContainer = globalThis.document.createElement("div");
        inlineMenuListButtonContainer.classList.add("inline-menu-list-button-container");
        inlineMenuListButtonContainer.appendChild(element);
        return inlineMenuListButtonContainer;
    }
    /**
     * Loads a page of ciphers into the inline menu list container.
     */
    loadPageOfCiphers() {
        const lastIndex = Math.min(this.currentCipherIndex + this.showCiphersPerPage, this.ciphers.length);
        for (let cipherIndex = this.currentCipherIndex; cipherIndex < lastIndex; cipherIndex++) {
            this.ciphersList.appendChild(this.buildInlineMenuListActionsItem(this.ciphers[cipherIndex]));
            this.currentCipherIndex++;
        }
        if (!this.showPasskeysLabels && this.allCiphersLoaded()) {
            this.ciphersList.removeEventListener(EVENTS.SCROLL, this.updateCiphersListOnScroll);
        }
    }
    /**
     * Validates whether the list of ciphers has been fully loaded.
     */
    allCiphersLoaded() {
        return this.currentCipherIndex >= this.ciphers.length;
    }
    /**
     * Sets up the scroll listeners for the ciphers list. These are used to trigger an update of
     * the list of ciphers when the user scrolls to the bottom of the list. Also sets up the
     * scroll listeners that reposition the passkeys and login headings when the user scrolls.
     */
    setupCipherListScrollListeners() {
        const options = { passive: true };
        this.ciphersList.addEventListener(EVENTS.SCROLL, this.updateCiphersListOnScroll, options);
        if (this.showPasskeysLabels) {
            this.ciphersList.addEventListener(EVENTS.SCROLL, this.useEventHandlersMemo(throttle(this.handleThrottledOnScrollEvent, 50), UPDATE_PASSKEYS_HEADINGS_ON_SCROLL), options);
        }
    }
    /**
     * Determines whether the given scrollable element has been scrolled far enough
     * to warrant loading the next page of ciphers. Caches the element's height on
     * first use so subsequent calls avoid an extra layout read.
     */
    hasScrolledPastLoadThreshold(scrollElement) {
        if (!this.ciphersListHeight) {
            this.ciphersListHeight = scrollElement.offsetHeight;
        }
        const scrollableHeight = scrollElement.scrollHeight - this.ciphersListHeight;
        const scrollPercentage = (scrollElement.scrollTop / scrollableHeight) * 100;
        return !Number.isNaN(scrollPercentage) && scrollPercentage >= 80;
    }
    /**
     * Anchors the passkeys heading to the top of the last passkey item when the user scrolls.
     *
     * @param cipherListScrollTop - The current scroll top position of the ciphers list.
     */
    togglePasskeysHeadingAnchored(cipherListScrollTop) {
        if (!this.passkeysHeadingElement || !this.lastPasskeysListItem) {
            return;
        }
        if (!this.passkeysHeadingHeight) {
            this.passkeysHeadingHeight = this.passkeysHeadingElement.offsetHeight;
        }
        const passkeysHeadingOffset = this.lastPasskeysListItem.offsetTop - this.passkeysHeadingHeight;
        if (cipherListScrollTop >= passkeysHeadingOffset) {
            this.passkeysHeadingElement.style.position = "relative";
            this.passkeysHeadingElement.style.top = `${passkeysHeadingOffset}px`;
            return;
        }
        this.passkeysHeadingElement.setAttribute("style", "");
    }
    /**
     * Toggles a border on the passkeys heading on scroll, adding it when the user has
     * scrolled at all and removing it once the user scrolls back to the top.
     *
     * @param cipherListScrollTop - The current scroll top position of the ciphers list.
     */
    togglePasskeysHeadingBorder(cipherListScrollTop) {
        if (!this.passkeysHeadingElement) {
            return;
        }
        if (cipherListScrollTop < 1) {
            this.passkeysHeadingElement.classList.remove(this.headingBorderClass);
            return;
        }
        this.passkeysHeadingElement.classList.add(this.headingBorderClass);
    }
    /**
     * Toggles a border on  the login heading on scroll, adding it when the user has
     * scrolled past the last passkey item and removing it once the user scrolls back up.
     *
     * @param cipherListScrollTop - The current scroll top position of the ciphers list.
     */
    toggleLoginHeadingBorder(cipherListScrollTop) {
        if (!this.loginHeadingElement || !this.lastPasskeysListItem) {
            return;
        }
        if (!this.lastPasskeysListItemHeight) {
            this.lastPasskeysListItemHeight = this.lastPasskeysListItem.offsetHeight;
        }
        const lastPasskeyOffset = this.lastPasskeysListItem.offsetTop + this.lastPasskeysListItemHeight;
        if (cipherListScrollTop < lastPasskeyOffset) {
            this.loginHeadingElement.classList.remove(this.headingBorderClass);
            return;
        }
        this.loginHeadingElement.classList.add(this.headingBorderClass);
    }
    /**
     * Builds the list item for a given cipher.
     *
     * @param cipher - The cipher to build the list item for.
     */
    buildInlineMenuListActionsItem(cipher) {
        var _a;
        this.buildPasskeysHeadingElements(cipher);
        const fillCipherElement = this.buildFillCipherElement(cipher);
        const viewCipherElement = this.buildViewCipherElement(cipher);
        const cipherContainerElement = globalThis.document.createElement("div");
        cipherContainerElement.classList.add("cipher-container");
        cipherContainerElement.append(fillCipherElement, viewCipherElement);
        const inlineMenuListActionsItem = globalThis.document.createElement("li");
        inlineMenuListActionsItem.setAttribute("role", "listitem");
        inlineMenuListActionsItem.classList.add("inline-menu-list-actions-item");
        inlineMenuListActionsItem.appendChild(cipherContainerElement);
        if (this.showPasskeysLabels && ((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey)) {
            this.lastPasskeysListItem = inlineMenuListActionsItem;
        }
        return inlineMenuListActionsItem;
    }
    /**
     * Builds the passkeys and login headings for the list of cipher items.
     *
     * @param cipher - The cipher that will follow the heading.
     */
    buildPasskeysHeadingElements(cipher) {
        var _a;
        if (!this.showPasskeysLabels || (this.passkeysHeadingElement && this.loginHeadingElement)) {
            return;
        }
        const passkeyData = (_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey;
        if (!this.passkeysHeadingElement && passkeyData) {
            this.passkeysHeadingElement = globalThis.document.createElement("li");
            this.passkeysHeadingElement.classList.add("inline-menu-list-heading");
            this.passkeysHeadingElement.textContent = this.getTranslation("passkeys");
            this.ciphersList.appendChild(this.passkeysHeadingElement);
            return;
        }
        if (!this.passkeysHeadingElement || this.loginHeadingElement || passkeyData) {
            return;
        }
        this.loginHeadingElement = globalThis.document.createElement("li");
        this.loginHeadingElement.classList.add("inline-menu-list-heading");
        this.loginHeadingElement.textContent = this.getTranslation("passwords");
        this.ciphersList.appendChild(this.loginHeadingElement);
    }
    /**
     * Builds the fill cipher button for a given cipher.
     * Wraps the cipher icon and details.
     *
     * @param cipher - The cipher to build the fill cipher button for.
     */
    buildFillCipherElement(cipher) {
        var _a;
        const cipherIcon = this.buildCipherIconElement(cipher);
        const cipherDetailsElement = this.buildCipherDetailsElement(cipher);
        const fillCipherElement = globalThis.document.createElement("button");
        fillCipherElement.tabIndex = -1;
        fillCipherElement.classList.add("fill-cipher-button", "inline-menu-list-action");
        fillCipherElement.setAttribute("aria-label", `${((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey)
            ? this.getTranslation("logInWithPasskeyAriaLabel")
            : this.getTranslation("fillCredentialsFor")} ${cipher.name}`);
        this.addFillCipherElementAriaDescription(fillCipherElement, cipher);
        fillCipherElement.append(cipherIcon, ...(cipherDetailsElement ? [cipherDetailsElement] : []));
        fillCipherElement.addEventListener(EVENTS.CLICK, this.handleFillCipherClickEvent(cipher));
        fillCipherElement.addEventListener(EVENTS.KEYUP, this.handleFillCipherKeyUpEvent);
        return fillCipherElement;
    }
    /**
     * Adds an aria description to the fill cipher button for a given cipher.
     *
     * @param fillCipherElement - The fill cipher button element.
     * @param cipher - The cipher to add the aria description for.
     */
    addFillCipherElementAriaDescription(fillCipherElement, cipher) {
        var _a, _b;
        if (cipher.login) {
            const passkeyUserName = ((_a = cipher.login.passkey) === null || _a === void 0 ? void 0 : _a.userName) || "";
            const username = cipher.login.username || passkeyUserName;
            if (username) {
                fillCipherElement.setAttribute("aria-description", `${(_b = this.getTranslation("username")) === null || _b === void 0 ? void 0 : _b.toLowerCase()}: ${username}`);
            }
            return;
        }
        if (cipher.card) {
            const cardParts = cipher.card.split(", *");
            if (cardParts.length === 1) {
                const cardDigits = cardParts[0].startsWith("*") ? cardParts[0].substring(1) : cardParts[0];
                fillCipherElement.setAttribute("aria-description", `${this.getTranslation("cardNumberEndsWith")} ${cardDigits}`);
                return;
            }
            const cardBrand = cardParts[0];
            const cardDigits = cardParts[1];
            fillCipherElement.setAttribute("aria-description", `${cardBrand}, ${this.getTranslation("cardNumberEndsWith")} ${cardDigits}`);
        }
    }
    /**
     * Builds the button that facilitates viewing a cipher in the vault.
     *
     * @param cipher - The cipher to view.
     */
    buildViewCipherElement(cipher) {
        const viewCipherElement = globalThis.document.createElement("button");
        viewCipherElement.tabIndex = -1;
        viewCipherElement.classList.add("view-cipher-button");
        viewCipherElement.setAttribute("aria-label", `${this.getTranslation("view")} ${cipher.name}, ${this.getTranslation("opensInANewWindow")}`);
        viewCipherElement.append(buildSvgDomElement(viewCipherIcon));
        viewCipherElement.addEventListener(EVENTS.CLICK, this.handleViewCipherClickEvent(cipher));
        viewCipherElement.addEventListener(EVENTS.KEYUP, this.handleViewCipherKeyUpEvent);
        return viewCipherElement;
    }
    /**
     * Builds the icon for a given cipher. Prioritizes the favicon from a given cipher url
     * and the default icon element within the extension. If neither are available, the
     * globe icon is used.
     *
     * @param cipher - The cipher to build the icon for.
     */
    buildCipherIconElement(cipher) {
        var _a, _b, _c, _d, _e;
        const cipherIcon = globalThis.document.createElement("span");
        cipherIcon.classList.add("cipher-icon");
        cipherIcon.setAttribute("aria-hidden", "true");
        if (((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.totpField) && ((_b = cipher.login) === null || _b === void 0 ? void 0 : _b.totp)) {
            const totpContainer = document.createElement("div");
            totpContainer.style.position = "relative";
            const svgElement = buildSvgDomElement(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29">
          <circle fill="none" cx="14.5" cy="14.5" r="12.5"
                  stroke-width="3" stroke-dasharray="78.5"
                  stroke-dashoffset="78.5" transform="rotate(-90 14.5 14.5)"></circle>
          <circle fill="none" cx="14.5" cy="14.5" r="14" stroke-width="1"></circle>
      </svg>
    `);
            const [innerCircleElement, outerCircleElement] = svgElement.querySelectorAll("circle");
            innerCircleElement.classList.add("circle-color");
            outerCircleElement.classList.add("circle-color");
            totpContainer.appendChild(svgElement);
            const totpSecondsSpan = document.createElement("span");
            totpSecondsSpan.classList.add("totp-sec-span");
            totpSecondsSpan.setAttribute("bitTypography", "helper");
            totpSecondsSpan.setAttribute("aria-label", this.getTranslation("totpSecondsSpanAria"));
            totpContainer.appendChild(totpSecondsSpan);
            cipherIcon.appendChild(totpContainer);
            const intervalSeconds = (_c = cipher.login.totpCodeTimeInterval) !== null && _c !== void 0 ? _c : 30;
            const updateCountdown = () => {
                const epoch = Math.round(Date.now() / 1000);
                const mod = epoch % intervalSeconds;
                const totpSeconds = intervalSeconds - mod;
                totpSecondsSpan.textContent = `${totpSeconds}`;
                /**
                 * Design specifies a seven-second time span as the period where expiry is approaching.
                 */
                const totpExpiryApproaching = totpSeconds <= 7;
                totpSecondsSpan.classList.toggle("totp-sec-span-danger", totpExpiryApproaching);
                innerCircleElement.classList.toggle("circle-danger-color", totpExpiryApproaching);
                outerCircleElement.classList.toggle("circle-danger-color", totpExpiryApproaching);
                innerCircleElement.style.strokeDashoffset = `${((intervalSeconds - totpSeconds) / intervalSeconds) * (2 * Math.PI * 12.5)}`;
                if (mod === 0) {
                    this.postMessageToParent({ command: "refreshOverlayCiphers" });
                }
            };
            updateCountdown();
            setInterval(updateCountdown, 1000);
            return cipherIcon;
        }
        if ((_d = cipher.icon) === null || _d === void 0 ? void 0 : _d.image) {
            try {
                const url = new URL(cipher.icon.image);
                cipherIcon.style.backgroundImage = `url(${url.href})`;
                const dummyImageElement = globalThis.document.createElement("img");
                dummyImageElement.src = url.href;
                dummyImageElement.addEventListener("error", () => {
                    cipherIcon.style.backgroundImage = "";
                    cipherIcon.classList.add("cipher-icon");
                    cipherIcon.append(buildSvgDomElement(globeIcon));
                });
                dummyImageElement.remove();
                return cipherIcon;
            }
            catch (_f) {
                // Silently default to the globe icon element if the image URL is invalid
            }
        }
        if (!((_e = cipher.icon) === null || _e === void 0 ? void 0 : _e.icon)) {
            cipherIcon.append(buildSvgDomElement(globeIcon));
            return cipherIcon;
        }
        if (cipher.icon.icon.includes("bwi-credit-card")) {
            cipherIcon.append(buildSvgDomElement(creditCardIcon));
            return cipherIcon;
        }
        if (cipher.icon.icon.includes("bwi-id-card")) {
            cipherIcon.append(buildSvgDomElement(idCardIcon));
            return cipherIcon;
        }
        if (cipher.icon.icon.includes("bwi-key")) {
            cipherIcon.append(buildSvgDomElement(keyIcon));
            return cipherIcon;
        }
        const iconClasses = cipher.icon.icon.split(" ");
        cipherIcon.classList.add("cipher-icon", "bwi", ...iconClasses);
        return cipherIcon;
    }
    /**
     * Builds the details for a given cipher. Includes the cipher name and subtitle.
     *
     * @param cipher - The cipher to build the details for.
     */
    buildCipherDetailsElement(cipher) {
        var _a, _b, _c, _d, _e;
        const cipherDetailsElement = globalThis.document.createElement("span");
        cipherDetailsElement.classList.add("cipher-details");
        const cipherNameElement = this.buildCipherNameElement(cipher);
        if (cipherNameElement) {
            cipherDetailsElement.appendChild(cipherNameElement);
        }
        if ((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.passkey) {
            return this.buildPasskeysCipherDetailsElement(cipher, cipherDetailsElement);
        }
        if (((_b = cipher.login) === null || _b === void 0 ? void 0 : _b.totpField) && ((_c = cipher.login) === null || _c === void 0 ? void 0 : _c.totp)) {
            return this.buildTotpElement((_d = cipher.login) === null || _d === void 0 ? void 0 : _d.totp, (_e = cipher.login) === null || _e === void 0 ? void 0 : _e.username, cipher.reprompt);
        }
        const subTitleText = this.getSubTitleText(cipher);
        const cipherSubtitleElement = this.buildCipherSubtitleElement(subTitleText);
        if (cipherSubtitleElement) {
            cipherDetailsElement.appendChild(cipherSubtitleElement);
        }
        return cipherDetailsElement;
    }
    /**
     * Checks if there is more than one TOTP element being displayed.
     *
     * @returns {boolean} - Returns true if more than one TOTP element is displayed, otherwise false.
     */
    multipleTotpElements() {
        return (this.ciphers.filter((cipher) => { var _a, _b; return ((_a = cipher.login) === null || _a === void 0 ? void 0 : _a.totpField) && ((_b = cipher.login) === null || _b === void 0 ? void 0 : _b.totp); }).length > 1);
    }
    /**
     * Builds a TOTP element for a given TOTP code.
     *
     * @param totp - The TOTP code to display.
     */
    buildTotpElement(totpCode, username, reprompt) {
        if (!totpCode) {
            return null;
        }
        const formattedTotpCode = `${totpCode.substring(0, 3)} ${totpCode.substring(3)}`;
        const containerElement = globalThis.document.createElement("div");
        containerElement.classList.add("cipher-details");
        const totpHeading = document.createElement("span");
        totpHeading.classList.add("cipher-name");
        totpHeading.textContent = this.getTranslation("fillVerificationCode");
        totpHeading.setAttribute("aria-label", this.getTranslation("fillVerificationCodeAria"));
        containerElement.appendChild(totpHeading);
        if (this.multipleTotpElements() && username) {
            const usernameSubtitle = this.buildCipherSubtitleElement(username);
            if (usernameSubtitle) {
                containerElement.appendChild(usernameSubtitle);
            }
        }
        const totpCodeSpan = document.createElement("span");
        totpCodeSpan.classList.toggle("cipher-subtitle");
        totpCodeSpan.classList.toggle("masked-totp", !!reprompt);
        totpCodeSpan.textContent = reprompt ? "●●●●●●" : formattedTotpCode;
        totpCodeSpan.setAttribute("aria-label", this.getTranslation("totpCodeAria"));
        totpCodeSpan.setAttribute("data-testid", "totp-code");
        containerElement.appendChild(totpCodeSpan);
        return containerElement;
    }
    /**
     * Builds the name element for a given cipher.
     *
     * @param cipher - The cipher to build the name element for.
     */
    buildCipherNameElement(cipher) {
        if (!cipher.name) {
            return null;
        }
        const cipherNameElement = globalThis.document.createElement("span");
        cipherNameElement.classList.add("cipher-name");
        cipherNameElement.textContent = cipher.name;
        cipherNameElement.setAttribute("title", cipher.name);
        return cipherNameElement;
    }
    /**
     * Builds the subtitle element for a given cipher.
     *
     * @param subTitleText - The subtitle text to display.
     */
    buildCipherSubtitleElement(subTitleText) {
        if (!subTitleText) {
            return null;
        }
        const cipherSubtitleElement = globalThis.document.createElement("span");
        cipherSubtitleElement.classList.add("cipher-subtitle");
        cipherSubtitleElement.textContent = subTitleText;
        cipherSubtitleElement.setAttribute("title", subTitleText);
        return cipherSubtitleElement;
    }
    /**
     * Builds the passkeys details for a given cipher. Includes the passkey name and username.
     *
     * @param cipher - The cipher to build the passkey details for.
     * @param cipherDetailsElement - The cipher details element to append the passkey details to.
     */
    buildPasskeysCipherDetailsElement(cipher, cipherDetailsElement) {
        const login = cipher.login;
        const passkey = login === null || login === void 0 ? void 0 : login.passkey;
        if (!login || !passkey) {
            return cipherDetailsElement;
        }
        let rpNameSubtitle;
        if (cipher.name !== passkey.rpName) {
            const element = this.buildCipherSubtitleElement(passkey.rpName);
            if (element) {
                rpNameSubtitle = element;
                rpNameSubtitle.prepend(buildSvgDomElement(passkeyIcon));
                rpNameSubtitle.classList.add("cipher-subtitle--passkey");
                cipherDetailsElement.appendChild(rpNameSubtitle);
            }
        }
        if (login.username) {
            const usernameSubtitle = this.buildCipherSubtitleElement(login.username);
            if (usernameSubtitle) {
                if (!rpNameSubtitle) {
                    usernameSubtitle.prepend(buildSvgDomElement(passkeyIcon));
                    usernameSubtitle.classList.add("cipher-subtitle--passkey");
                }
                cipherDetailsElement.appendChild(usernameSubtitle);
            }
            return cipherDetailsElement;
        }
        const passkeySubtitle = this.buildCipherSubtitleElement(passkey.userName);
        if (passkeySubtitle) {
            if (!rpNameSubtitle) {
                passkeySubtitle.prepend(buildSvgDomElement(passkeyIcon));
                passkeySubtitle.classList.add("cipher-subtitle--passkey");
            }
            cipherDetailsElement.appendChild(passkeySubtitle);
        }
        return cipherDetailsElement;
    }
    /**
     * Creates an indicator for the user that the passkey is being authenticated.
     */
    createPasskeyAuthenticatingLoader() {
        this.isPasskeyAuthInProgress = true;
        this.resetInlineMenuContainer();
        const passkeyAuthenticatingLoader = globalThis.document.createElement("div");
        passkeyAuthenticatingLoader.classList.add("passkey-authenticating-loader");
        passkeyAuthenticatingLoader.textContent = this.getTranslation("authenticating");
        passkeyAuthenticatingLoader.appendChild(buildSvgDomElement(spinnerIcon));
        this.inlineMenuListContainer.appendChild(passkeyAuthenticatingLoader);
        globalThis.setTimeout(() => {
            this.isPasskeyAuthInProgress = false;
            this.postMessageToParent({ command: "checkAutofillInlineMenuButtonFocused" });
        }, 4000);
    }
    /**
     * Gets the subtitle text for a given cipher.
     *
     * @param cipher - The cipher to get the subtitle text for.
     */
    getSubTitleText(cipher) {
        var _a, _b, _c;
        if ((_a = cipher.identity) === null || _a === void 0 ? void 0 : _a.username) {
            return cipher.identity.username;
        }
        if ((_b = cipher.identity) === null || _b === void 0 ? void 0 : _b.fullName) {
            return cipher.identity.fullName;
        }
        if ((_c = cipher.login) === null || _c === void 0 ? void 0 : _c.username) {
            return cipher.login.username;
        }
        if (cipher.card) {
            return cipher.card;
        }
        return "";
    }
    /**
     * Validates whether the inline menu list iframe is currently focused.
     * If not focused, will check if the button element is focused.
     */
    checkInlineMenuListFocused() {
        if (!this.isInitialized) {
            return;
        }
        if (globalThis.document.hasFocus()) {
            return;
        }
        if (this.isListHovered()) {
            globalThis.document.addEventListener(EVENTS.MOUSEOUT, this.handleMouseOutEvent);
            return;
        }
        this.postMessageToParent({ command: "checkAutofillInlineMenuButtonFocused" });
    }
    /**
     * Focuses the inline menu list iframe. The element that receives focus is
     * determined by the presence of the unlock button, new item button, or
     * the first cipher button.
     */
    focusInlineMenuList() {
        if (!this.isInitialized) {
            return;
        }
        this.inlineMenuListContainer.setAttribute("role", "dialog");
        this.inlineMenuListContainer.setAttribute("aria-modal", "true");
        const unlockButtonElement = this.inlineMenuListContainer.querySelector("#unlock-button, [data-testid='inline-menu-unlock-button']");
        if (unlockButtonElement) {
            unlockButtonElement.focus();
            return;
        }
        const firstListElement = this.inlineMenuListContainer.querySelector(".inline-menu-list-action, [data-testid='inline-menu-save-login-button'], [data-fill-cipher], [data-fill-generated-password]");
        firstListElement === null || firstListElement === void 0 ? void 0 : firstListElement.focus();
    }
    /**
     * Sets up the global listeners for the inline menu list iframe.
     */
    setupInlineMenuListGlobalListeners() {
        this.setupGlobalListeners(this.inlineMenuListWindowMessageHandlers);
    }
    /**
     * Focuses the next list item in the inline menu list. If the current list item is the last
     * item in the list, the first item is focused.
     *
     * @param currentListItem - The current list item.
     */
    focusNextListItem(currentListItem) {
        var _a;
        let nextListItem = currentListItem.nextSibling;
        if (this.listItemIsHeadingElement(nextListItem)) {
            nextListItem = nextListItem.nextSibling;
        }
        const nextSibling = nextListItem === null || nextListItem === void 0 ? void 0 : nextListItem.querySelector(".inline-menu-list-action");
        if (nextSibling) {
            nextSibling.focus();
            return;
        }
        if (this.newItemButtonElement) {
            this.newItemButtonElement.focus();
            return;
        }
        let firstListItem = (_a = currentListItem.parentElement) === null || _a === void 0 ? void 0 : _a.firstChild;
        if (this.listItemIsHeadingElement(firstListItem)) {
            firstListItem = firstListItem.nextSibling;
        }
        const firstSibling = firstListItem === null || firstListItem === void 0 ? void 0 : firstListItem.querySelector(".inline-menu-list-action");
        firstSibling === null || firstSibling === void 0 ? void 0 : firstSibling.focus();
    }
    /**
     * Focuses the previous list item in the inline menu list. If the current list item is the first
     * item in the list, the last item is focused.
     *
     * @param currentListItem - The current list item.
     */
    focusPreviousListItem(currentListItem) {
        var _a;
        let previousListItem = currentListItem.previousSibling;
        if (this.listItemIsHeadingElement(previousListItem)) {
            previousListItem = previousListItem.previousSibling;
        }
        const previousSibling = previousListItem === null || previousListItem === void 0 ? void 0 : previousListItem.querySelector(".inline-menu-list-action");
        if (previousSibling) {
            previousSibling.focus();
            return;
        }
        if (this.newItemButtonElement) {
            this.newItemButtonElement.focus();
            return;
        }
        const lastListItem = (_a = currentListItem.parentElement) === null || _a === void 0 ? void 0 : _a.lastChild;
        const lastSibling = lastListItem === null || lastListItem === void 0 ? void 0 : lastListItem.querySelector(".inline-menu-list-action");
        lastSibling === null || lastSibling === void 0 ? void 0 : lastSibling.focus();
    }
    /**
     * Focuses the view cipher button relative to the current fill cipher button.
     *
     * @param currentListItem - The current list item.
     * @param currentButtonElement - The current button element.
     */
    focusViewCipherButton(currentListItem, currentButtonElement) {
        const cipherContainer = currentListItem.querySelector(".cipher-container");
        cipherContainer.classList.add("remove-outline");
        const nextSibling = currentButtonElement.nextElementSibling;
        nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.focus();
    }
}

;// ./src/autofill/overlay/inline-menu/pages/list/bootstrap-autofill-inline-menu-list.ts


// FIXME: Remove when updating file. Eslint update
// eslint-disable-next-line @typescript-eslint/no-require-imports
__webpack_require__(80433);
(function () {
    globalThis.customElements.define(AutofillOverlayElement.List, AutofillInlineMenuList);
})();

}();
/******/ })()
;
if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,n,t)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const i={uri:location.origin+r.slice(1)};return Promise.all(n.map((r=>{switch(r){case"exports":return s;case"module":return i;default:return e(r)}}))).then((e=>{const r=t(...e);return s.default||(s.default=r),s}))})))}}define("./service-worker.js",["./workbox-bf0aabb3"],(function(e){"use strict";e.setCacheNameDetails({prefix:"antd-tree-transfer"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/antd-tree-transfer/css/app.5fb38ca1.css",revision:null},{url:"/antd-tree-transfer/css/chunk-vendors.88a17366.css",revision:null},{url:"/antd-tree-transfer/css/composition.b380b05a.css",revision:null},{url:"/antd-tree-transfer/css/options.56da304e.css",revision:null},{url:"/antd-tree-transfer/index.html",revision:"14b4bf3e8b84f0c9bfdb4e65bbff093f"},{url:"/antd-tree-transfer/js/app.775d7818.js",revision:null},{url:"/antd-tree-transfer/js/chunk-vendors.cbb600fd.js",revision:null},{url:"/antd-tree-transfer/js/chunk-vendors.cbb600fd.js.LICENSE.txt",revision:"95eda2433e2f777ade4c134e56caea9b"},{url:"/antd-tree-transfer/js/composition.42f74d0f.js",revision:null},{url:"/antd-tree-transfer/js/options.6553a4e7.js",revision:null},{url:"/antd-tree-transfer/manifest.json",revision:"0ab473056a8bde6860843b2d309c03bb"},{url:"/antd-tree-transfer/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));

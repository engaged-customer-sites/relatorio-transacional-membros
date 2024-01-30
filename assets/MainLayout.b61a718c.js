import{c as Q,a as f,h as x,b as te,r as z,i as Ve,o as X,d as U,n as Ce,e as ee,g as F,l as ye,f as qe,j as P,w as C,k as at,m as ae,p as Ae,q as nt,s as I,t as ot,u as G,v as de,x as Le,y as ce,z as pe,A as fe,B as lt,C as it,D as ke,E as He,F as rt,G as J,H as ut,_ as st,I as dt,J as ct,K as ft,L as vt,M as T,N as q,Q as ve,O as ht,P as j,R as he,S as Be}from"./index.ba7c2511.js";import{c as mt,u as gt,a as bt,b as yt,d as pt,e as wt,f as Z,g as Ct,h as qt,i as St,j as xt,k as me,Q as _t,l as $e,m as zt,n as Tt,o as Oe}from"./format.03ab69d4.js";import{u as Lt,a as kt}from"./use-dark.f10b580f.js";var Bt=Q({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:o}){const l=f(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>x("div",{class:l.value},te(o.default))}}),$t=Q({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:o}){const l=f(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>x("div",{class:l.value,role:"toolbar"},te(o.default))}});function Ot(){const e=z(!Ve.value);return e.value===!1&&X(()=>{e.value=!0}),e}const Re=typeof ResizeObserver!="undefined",Ee=Re===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var we=Q({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:o}){let l=null,r,t={width:-1,height:-1};function a(d){d===!0||e.debounce===0||e.debounce==="0"?s():l===null&&(l=setTimeout(s,e.debounce))}function s(){if(l!==null&&(clearTimeout(l),l=null),r){const{offsetWidth:d,offsetHeight:u}=r;(d!==t.width||u!==t.height)&&(t={width:d,height:u},o("resize",t))}}const{proxy:h}=F();if(Re===!0){let d;const u=i=>{r=h.$el.parentNode,r?(d=new ResizeObserver(a),d.observe(r),s()):i!==!0&&ee(()=>{u(!0)})};return X(()=>{u()}),U(()=>{l!==null&&clearTimeout(l),d!==void 0&&(d.disconnect!==void 0?d.disconnect():r&&d.unobserve(r))}),Ce}else{let i=function(){l!==null&&(clearTimeout(l),l=null),u!==void 0&&(u.removeEventListener!==void 0&&u.removeEventListener("resize",a,ye.passive),u=void 0)},w=function(){i(),r&&r.contentDocument&&(u=r.contentDocument.defaultView,u.addEventListener("resize",a,ye.passive),s())};const d=Ot();let u;return X(()=>{ee(()=>{r=h.$el,r&&w()})}),U(i),h.trigger=a,()=>{if(d.value===!0)return x("object",{style:Ee.style,tabindex:-1,type:"text/html",data:Ee.url,"aria-hidden":"true",onLoad:w})}}}}),Et=Q({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:o,emit:l}){const{proxy:{$q:r}}=F(),t=qe(ae,P);if(t===P)return console.error("QHeader needs to be child of QLayout"),P;const a=z(parseInt(e.heightHint,10)),s=z(!0),h=f(()=>e.reveal===!0||t.view.value.indexOf("H")>-1||r.platform.is.ios&&t.isContainer.value===!0),d=f(()=>{if(e.modelValue!==!0)return 0;if(h.value===!0)return s.value===!0?a.value:0;const c=a.value-t.scroll.value.position;return c>0?c:0}),u=f(()=>e.modelValue!==!0||h.value===!0&&s.value!==!0),i=f(()=>e.modelValue===!0&&u.value===!0&&e.reveal===!0),w=f(()=>"q-header q-layout__section--marginal "+(h.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(u.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),p=f(()=>{const c=t.rows.value.top,L={};return c[0]==="l"&&t.left.space===!0&&(L[r.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),c[2]==="r"&&t.right.space===!0&&(L[r.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),L});function v(c,L){t.update("header",c,L)}function m(c,L){c.value!==L&&(c.value=L)}function $({height:c}){m(a,c),v("size",c)}function _(c){i.value===!0&&m(s,!0),l("focusin",c)}C(()=>e.modelValue,c=>{v("space",c),m(s,!0),t.animate()}),C(d,c=>{v("offset",c)}),C(()=>e.reveal,c=>{c===!1&&m(s,e.modelValue)}),C(s,c=>{t.animate(),l("reveal",c)}),C(t.scroll,c=>{e.reveal===!0&&m(s,c.direction==="up"||c.position<=e.revealOffset||c.position-c.inflectionPoint<100)});const y={};return t.instances.header=y,e.modelValue===!0&&v("size",a.value),v("space",e.modelValue),v("offset",d.value),U(()=>{t.instances.header===y&&(t.instances.header=void 0,v("size",0),v("offset",0),v("space",!1))}),()=>{const c=at(o.default,[]);return e.elevated===!0&&c.push(x("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),c.push(x(we,{debounce:0,onResize:$})),x("header",{class:w.value,style:p.value,onFocusin:_},c)}}});const Pt=["top","middle","bottom"];var Qt=Q({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>Pt.includes(e)}},setup(e,{slots:o}){const l=f(()=>e.align!==void 0?{verticalAlign:e.align}:null),r=f(()=>{const t=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(t!==void 0?` text-${t}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>x("div",{class:r.value,style:l.value,role:"status","aria-label":e.label},Ae(o.default,e.label!==void 0?[e.label]:[]))}});const Se={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},Dt=Object.keys(Se);Se.all=!0;function Pe(e){const o={};for(const l of Dt)e[l]===!0&&(o[l]=!0);return Object.keys(o).length===0?Se:(o.horizontal===!0?o.left=o.right=!0:o.left===!0&&o.right===!0&&(o.horizontal=!0),o.vertical===!0?o.up=o.down=!0:o.up===!0&&o.down===!0&&(o.vertical=!0),o.horizontal===!0&&o.vertical===!0&&(o.all=!0),o)}const Mt=["INPUT","TEXTAREA"];function Qe(e,o){return o.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof o.handler=="function"&&Mt.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(o.uid)===-1)}function ge(e,o,l){const r=pe(e);let t,a=r.left-o.event.x,s=r.top-o.event.y,h=Math.abs(a),d=Math.abs(s);const u=o.direction;u.horizontal===!0&&u.vertical!==!0?t=a<0?"left":"right":u.horizontal!==!0&&u.vertical===!0?t=s<0?"up":"down":u.up===!0&&s<0?(t="up",h>d&&(u.left===!0&&a<0?t="left":u.right===!0&&a>0&&(t="right"))):u.down===!0&&s>0?(t="down",h>d&&(u.left===!0&&a<0?t="left":u.right===!0&&a>0&&(t="right"))):u.left===!0&&a<0?(t="left",h<d&&(u.up===!0&&s<0?t="up":u.down===!0&&s>0&&(t="down"))):u.right===!0&&a>0&&(t="right",h<d&&(u.up===!0&&s<0?t="up":u.down===!0&&s>0&&(t="down")));let i=!1;if(t===void 0&&l===!1){if(o.event.isFirst===!0||o.event.lastDir===void 0)return{};t=o.event.lastDir,i=!0,t==="left"||t==="right"?(r.left-=a,h=0,a=0):(r.top-=s,d=0,s=0)}return{synthetic:i,payload:{evt:e,touch:o.event.mouse!==!0,mouse:o.event.mouse===!0,position:r,direction:t,isFirst:o.event.isFirst,isFinal:l===!0,duration:Date.now()-o.event.time,distance:{x:h,y:d},offset:{x:a,y:s},delta:{x:r.left-o.event.lastX,y:r.top-o.event.lastY}}}}let Vt=0;var be=nt({name:"touch-pan",beforeMount(e,{value:o,modifiers:l}){if(l.mouse!==!0&&I.has.touch!==!0)return;function r(a,s){l.mouse===!0&&s===!0?lt(a):(l.stop===!0&&ce(a),l.prevent===!0&&Le(a))}const t={uid:"qvtp_"+Vt++,handler:o,modifiers:l,direction:Pe(l),noop:Ce,mouseStart(a){Qe(a,t)&&ot(a)&&(G(t,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),t.start(a,!0))},touchStart(a){if(Qe(a,t)){const s=a.target;G(t,"temp",[[s,"touchmove","move","notPassiveCapture"],[s,"touchcancel","end","passiveCapture"],[s,"touchend","end","passiveCapture"]]),t.start(a)}},start(a,s){if(I.is.firefox===!0&&de(e,!0),t.lastEvt=a,s===!0||l.stop===!0){if(t.direction.all!==!0&&(s!==!0||t.modifiers.mouseAllDir!==!0&&t.modifiers.mousealldir!==!0)){const u=a.type.indexOf("mouse")>-1?new MouseEvent(a.type,a):new TouchEvent(a.type,a);a.defaultPrevented===!0&&Le(u),a.cancelBubble===!0&&ce(u),Object.assign(u,{qKeyEvent:a.qKeyEvent,qClickOutside:a.qClickOutside,qAnchorHandled:a.qAnchorHandled,qClonedBy:a.qClonedBy===void 0?[t.uid]:a.qClonedBy.concat(t.uid)}),t.initialEvent={target:a.target,event:u}}ce(a)}const{left:h,top:d}=pe(a);t.event={x:h,y:d,time:Date.now(),mouse:s===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:h,lastY:d}},move(a){if(t.event===void 0)return;const s=pe(a),h=s.left-t.event.x,d=s.top-t.event.y;if(h===0&&d===0)return;t.lastEvt=a;const u=t.event.mouse===!0,i=()=>{r(a,u);let v;l.preserveCursor!==!0&&l.preservecursor!==!0&&(v=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),u===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),mt(),t.styleCleanup=m=>{if(t.styleCleanup=void 0,v!==void 0&&(document.documentElement.style.cursor=v),document.body.classList.remove("non-selectable"),u===!0){const $=()=>{document.body.classList.remove("no-pointer-events--children")};m!==void 0?setTimeout(()=>{$(),m()},50):$()}else m!==void 0&&m()}};if(t.event.detected===!0){t.event.isFirst!==!0&&r(a,t.event.mouse);const{payload:v,synthetic:m}=ge(a,t,!1);v!==void 0&&(t.handler(v)===!1?t.end(a):(t.styleCleanup===void 0&&t.event.isFirst===!0&&i(),t.event.lastX=v.position.left,t.event.lastY=v.position.top,t.event.lastDir=m===!0?void 0:v.direction,t.event.isFirst=!1));return}if(t.direction.all===!0||u===!0&&(t.modifiers.mouseAllDir===!0||t.modifiers.mousealldir===!0)){i(),t.event.detected=!0,t.move(a);return}const w=Math.abs(h),p=Math.abs(d);w!==p&&(t.direction.horizontal===!0&&w>p||t.direction.vertical===!0&&w<p||t.direction.up===!0&&w<p&&d<0||t.direction.down===!0&&w<p&&d>0||t.direction.left===!0&&w>p&&h<0||t.direction.right===!0&&w>p&&h>0?(t.event.detected=!0,t.move(a)):t.end(a,!0))},end(a,s){if(t.event!==void 0){if(fe(t,"temp"),I.is.firefox===!0&&de(e,!1),s===!0)t.styleCleanup!==void 0&&t.styleCleanup(),t.event.detected!==!0&&t.initialEvent!==void 0&&t.initialEvent.target.dispatchEvent(t.initialEvent.event);else if(t.event.detected===!0){t.event.isFirst===!0&&t.handler(ge(a===void 0?t.lastEvt:a,t).payload);const{payload:h}=ge(a===void 0?t.lastEvt:a,t,!0),d=()=>{t.handler(h)};t.styleCleanup!==void 0?t.styleCleanup(d):d()}t.event=void 0,t.initialEvent=void 0,t.lastEvt=void 0}}};if(e.__qtouchpan=t,l.mouse===!0){const a=l.mouseCapture===!0||l.mousecapture===!0?"Capture":"";G(t,"main",[[e,"mousedown","mouseStart",`passive${a}`]])}I.has.touch===!0&&G(t,"main",[[e,"touchstart","touchStart",`passive${l.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,o){const l=e.__qtouchpan;l!==void 0&&(o.oldValue!==o.value&&(typeof value!="function"&&l.end(),l.handler=o.value),l.direction=Pe(o.modifiers))},beforeUnmount(e){const o=e.__qtouchpan;o!==void 0&&(o.event!==void 0&&o.end(),fe(o,"main"),fe(o,"temp"),I.is.firefox===!0&&de(e,!1),o.styleCleanup!==void 0&&o.styleCleanup(),delete e.__qtouchpan)}});const De=150;var At=Q({name:"QDrawer",inheritAttrs:!1,props:{...gt,...Lt,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...bt,"onLayout","miniState"],setup(e,{slots:o,emit:l,attrs:r}){const t=F(),{proxy:{$q:a}}=t,s=kt(e,a),{preventBodyScroll:h}=Ct(),{registerTimeout:d,removeTimeout:u}=yt(),i=qe(ae,P);if(i===P)return console.error("QDrawer needs to be child of QLayout"),P;let w,p=null,v;const m=z(e.behavior==="mobile"||e.behavior!=="desktop"&&i.totalWidth.value<=e.breakpoint),$=f(()=>e.mini===!0&&m.value!==!0),_=f(()=>$.value===!0?e.miniWidth:e.width),y=z(e.showIfAbove===!0&&m.value===!1?!0:e.modelValue===!0),c=f(()=>e.persistent!==!0&&(m.value===!0||Fe.value===!0));function L(n,g){if(V(),n!==!1&&i.animate(),O(0),m.value===!0){const k=i.instances[Y.value];k!==void 0&&k.belowBreakpoint===!0&&k.hide(!1),D(1),i.isContainer.value!==!0&&h(!0)}else D(0),n!==!1&&re(!1);d(()=>{n!==!1&&re(!0),g!==!0&&l("show",n)},De)}function b(n,g){W(),n!==!1&&i.animate(),D(0),O(H.value*_.value),ue(),g!==!0?d(()=>{l("hide",n)},De):u()}const{show:S,hide:B}=pt({showing:y,hideOnRouteChange:c,handleShow:L,handleHide:b}),{addToHistory:V,removeFromHistory:W}=wt(y,B,c),A={belowBreakpoint:m,hide:B},E=f(()=>e.side==="right"),H=f(()=>(a.lang.rtl===!0?-1:1)*(E.value===!0?1:-1)),xe=z(0),R=z(!1),ne=z(!1),_e=z(_.value*H.value),Y=f(()=>E.value===!0?"left":"right"),oe=f(()=>y.value===!0&&m.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:_.value:0),le=f(()=>e.overlay===!0||e.miniToOverlay===!0||i.view.value.indexOf(E.value?"R":"L")>-1||a.platform.is.ios===!0&&i.isContainer.value===!0),N=f(()=>e.overlay===!1&&y.value===!0&&m.value===!1),Fe=f(()=>e.overlay===!0&&y.value===!0&&m.value===!1),We=f(()=>"fullscreen q-drawer__backdrop"+(y.value===!1&&R.value===!1?" hidden":"")),Ne=f(()=>({backgroundColor:`rgba(0,0,0,${xe.value*.4})`})),ze=f(()=>E.value===!0?i.rows.value.top[2]==="r":i.rows.value.top[0]==="l"),Ie=f(()=>E.value===!0?i.rows.value.bottom[2]==="r":i.rows.value.bottom[0]==="l"),je=f(()=>{const n={};return i.header.space===!0&&ze.value===!1&&(le.value===!0?n.top=`${i.header.offset}px`:i.header.space===!0&&(n.top=`${i.header.size}px`)),i.footer.space===!0&&Ie.value===!1&&(le.value===!0?n.bottom=`${i.footer.offset}px`:i.footer.space===!0&&(n.bottom=`${i.footer.size}px`)),n}),Xe=f(()=>{const n={width:`${_.value}px`,transform:`translateX(${_e.value}px)`};return m.value===!0?n:Object.assign(n,je.value)}),Ue=f(()=>"q-drawer__content fit "+(i.isContainer.value!==!0?"scroll":"overflow-auto")),Ye=f(()=>`q-drawer q-drawer--${e.side}`+(ne.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(s.value===!0?" q-drawer--dark q-dark":"")+(R.value===!0?" no-transition":y.value===!0?"":" q-layout--prevent-focus")+(m.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${$.value===!0?"mini":"standard"}`+(le.value===!0||N.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(ze.value===!0?" q-drawer--top-padding":""))),Ke=f(()=>{const n=a.lang.rtl===!0?e.side:Y.value;return[[be,et,void 0,{[n]:!0,mouse:!0}]]}),Ge=f(()=>{const n=a.lang.rtl===!0?Y.value:e.side;return[[be,Te,void 0,{[n]:!0,mouse:!0}]]}),Je=f(()=>{const n=a.lang.rtl===!0?Y.value:e.side;return[[be,Te,void 0,{[n]:!0,mouse:!0,mouseAllDir:!0}]]});function ie(){tt(m,e.behavior==="mobile"||e.behavior!=="desktop"&&i.totalWidth.value<=e.breakpoint)}C(m,n=>{n===!0?(w=y.value,y.value===!0&&B(!1)):e.overlay===!1&&e.behavior!=="mobile"&&w!==!1&&(y.value===!0?(O(0),D(0),ue()):S(!1))}),C(()=>e.side,(n,g)=>{i.instances[g]===A&&(i.instances[g]=void 0,i[g].space=!1,i[g].offset=0),i.instances[n]=A,i[n].size=_.value,i[n].space=N.value,i[n].offset=oe.value}),C(i.totalWidth,()=>{(i.isContainer.value===!0||document.qScrollPrevented!==!0)&&ie()}),C(()=>e.behavior+e.breakpoint,ie),C(i.isContainer,n=>{y.value===!0&&h(n!==!0),n===!0&&ie()}),C(i.scrollbarWidth,()=>{O(y.value===!0?0:void 0)}),C(oe,n=>{M("offset",n)}),C(N,n=>{l("onLayout",n),M("space",n)}),C(E,()=>{O()}),C(_,n=>{O(),se(e.miniToOverlay,n)}),C(()=>e.miniToOverlay,n=>{se(n,_.value)}),C(()=>a.lang.rtl,()=>{O()}),C(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(Ze(),i.animate())}),C($,n=>{l("miniState",n)});function O(n){n===void 0?ee(()=>{n=y.value===!0?0:_.value,O(H.value*n)}):(i.isContainer.value===!0&&E.value===!0&&(m.value===!0||Math.abs(n)===_.value)&&(n+=H.value*i.scrollbarWidth.value),_e.value=n)}function D(n){xe.value=n}function re(n){const g=n===!0?"remove":i.isContainer.value!==!0?"add":"";g!==""&&document.body.classList[g]("q-body--drawer-toggle")}function Ze(){p!==null&&clearTimeout(p),t.proxy&&t.proxy.$el&&t.proxy.$el.classList.add("q-drawer--mini-animate"),ne.value=!0,p=setTimeout(()=>{p=null,ne.value=!1,t&&t.proxy&&t.proxy.$el&&t.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function et(n){if(y.value!==!1)return;const g=_.value,k=Z(n.distance.x,0,g);if(n.isFinal===!0){k>=Math.min(75,g)===!0?S():(i.animate(),D(0),O(H.value*g)),R.value=!1;return}O((a.lang.rtl===!0?E.value!==!0:E.value)?Math.max(g-k,0):Math.min(0,k-g)),D(Z(k/g,0,1)),n.isFirst===!0&&(R.value=!0)}function Te(n){if(y.value!==!0)return;const g=_.value,k=n.direction===e.side,K=(a.lang.rtl===!0?k!==!0:k)?Z(n.distance.x,0,g):0;if(n.isFinal===!0){Math.abs(K)<Math.min(75,g)===!0?(i.animate(),D(1),O(0)):B(),R.value=!1;return}O(H.value*K),D(Z(1-K/g,0,1)),n.isFirst===!0&&(R.value=!0)}function ue(){h(!1),re(!0)}function M(n,g){i.update(e.side,n,g)}function tt(n,g){n.value!==g&&(n.value=g)}function se(n,g){M("size",n===!0?e.miniWidth:g)}return i.instances[e.side]=A,se(e.miniToOverlay,_.value),M("space",N.value),M("offset",oe.value),e.showIfAbove===!0&&e.modelValue!==!0&&y.value===!0&&e["onUpdate:modelValue"]!==void 0&&l("update:modelValue",!0),X(()=>{l("onLayout",N.value),l("miniState",$.value),w=e.showIfAbove===!0;const n=()=>{(y.value===!0?L:b)(!1,!0)};if(i.totalWidth.value!==0){ee(n);return}v=C(i.totalWidth,()=>{v(),v=void 0,y.value===!1&&e.showIfAbove===!0&&m.value===!1?S(!1):n()})}),U(()=>{v!==void 0&&v(),p!==null&&(clearTimeout(p),p=null),y.value===!0&&ue(),i.instances[e.side]===A&&(i.instances[e.side]=void 0,M("size",0),M("offset",0),M("space",!1))}),()=>{const n=[];m.value===!0&&(e.noSwipeOpen===!1&&n.push(it(x("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),Ke.value)),n.push(ke("div",{ref:"backdrop",class:We.value,style:Ne.value,"aria-hidden":"true",onClick:B},void 0,"backdrop",e.noSwipeBackdrop!==!0&&y.value===!0,()=>Je.value)));const g=$.value===!0&&o.mini!==void 0,k=[x("div",{...r,key:""+g,class:[Ue.value,r.class]},g===!0?o.mini():te(o.default))];return e.elevated===!0&&y.value===!0&&k.push(x("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),n.push(ke("aside",{ref:"content",class:Ye.value,style:Xe.value},k,"contentclose",e.noSwipeClose!==!0&&m.value===!0,()=>Ge.value)),x("div",{class:"q-drawer-container"},n)}}}),Ht=Q({name:"QPageContainer",setup(e,{slots:o}){const{proxy:{$q:l}}=F(),r=qe(ae,P);if(r===P)return console.error("QPageContainer needs to be child of QLayout"),P;He(rt,!0);const t=f(()=>{const a={};return r.header.space===!0&&(a.paddingTop=`${r.header.size}px`),r.right.space===!0&&(a[`padding${l.lang.rtl===!0?"Left":"Right"}`]=`${r.right.size}px`),r.footer.space===!0&&(a.paddingBottom=`${r.footer.size}px`),r.left.space===!0&&(a[`padding${l.lang.rtl===!0?"Right":"Left"}`]=`${r.left.size}px`),a});return()=>x("div",{class:"q-page-container",style:t.value},te(o.default))}});const{passive:Me}=ye,Rt=["both","horizontal","vertical"];var Ft=Q({name:"QScrollObserver",props:{axis:{type:String,validator:e=>Rt.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:o}){const l={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let r=null,t,a;C(()=>e.scrollTarget,()=>{d(),h()});function s(){r!==null&&r();const w=Math.max(0,St(t)),p=xt(t),v={top:w-l.position.top,left:p-l.position.left};if(e.axis==="vertical"&&v.top===0||e.axis==="horizontal"&&v.left===0)return;const m=Math.abs(v.top)>=Math.abs(v.left)?v.top<0?"up":"down":v.left<0?"left":"right";l.position={top:w,left:p},l.directionChanged=l.direction!==m,l.delta=v,l.directionChanged===!0&&(l.direction=m,l.inflectionPoint=l.position),o("scroll",{...l})}function h(){t=qt(a,e.scrollTarget),t.addEventListener("scroll",u,Me),u(!0)}function d(){t!==void 0&&(t.removeEventListener("scroll",u,Me),t=void 0)}function u(w){if(w===!0||e.debounce===0||e.debounce==="0")s();else if(r===null){const[p,v]=e.debounce?[setTimeout(s,e.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];r=()=>{v(p),r=null}}}const{proxy:i}=F();return C(()=>i.$q.lang.rtl,s),X(()=>{a=i.$el.parentNode,h()}),U(()=>{r!==null&&r(),d()}),Object.assign(i,{trigger:u,getPosition:()=>l}),Ce}}),Wt=Q({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:o,emit:l}){const{proxy:{$q:r}}=F(),t=z(null),a=z(r.screen.height),s=z(e.container===!0?0:r.screen.width),h=z({position:0,direction:"down",inflectionPoint:0}),d=z(0),u=z(Ve.value===!0?0:me()),i=f(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),w=f(()=>e.container===!1?{minHeight:r.screen.height+"px"}:null),p=f(()=>u.value!==0?{[r.lang.rtl===!0?"left":"right"]:`${u.value}px`}:null),v=f(()=>u.value!==0?{[r.lang.rtl===!0?"right":"left"]:0,[r.lang.rtl===!0?"left":"right"]:`-${u.value}px`,width:`calc(100% + ${u.value}px)`}:null);function m(b){if(e.container===!0||document.qScrollPrevented!==!0){const S={position:b.position.top,direction:b.direction,directionChanged:b.directionChanged,inflectionPoint:b.inflectionPoint.top,delta:b.delta.top};h.value=S,e.onScroll!==void 0&&l("scroll",S)}}function $(b){const{height:S,width:B}=b;let V=!1;a.value!==S&&(V=!0,a.value=S,e.onScrollHeight!==void 0&&l("scrollHeight",S),y()),s.value!==B&&(V=!0,s.value=B),V===!0&&e.onResize!==void 0&&l("resize",b)}function _({height:b}){d.value!==b&&(d.value=b,y())}function y(){if(e.container===!0){const b=a.value>d.value?me():0;u.value!==b&&(u.value=b)}}let c=null;const L={instances:{},view:f(()=>e.view),isContainer:f(()=>e.container),rootRef:t,height:a,containerHeight:d,scrollbarWidth:u,totalWidth:f(()=>s.value+u.value),rows:f(()=>{const b=e.view.toLowerCase().split(" ");return{top:b[0].split(""),middle:b[1].split(""),bottom:b[2].split("")}}),header:J({size:0,offset:0,space:!1}),right:J({size:300,offset:0,space:!1}),footer:J({size:0,offset:0,space:!1}),left:J({size:300,offset:0,space:!1}),scroll:h,animate(){c!==null?clearTimeout(c):document.body.classList.add("q-body--layout-animate"),c=setTimeout(()=>{c=null,document.body.classList.remove("q-body--layout-animate")},155)},update(b,S,B){L[b][S]=B}};if(He(ae,L),me()>0){let B=function(){b=null,S.classList.remove("hide-scrollbar")},V=function(){if(b===null){if(S.scrollHeight>r.screen.height)return;S.classList.add("hide-scrollbar")}else clearTimeout(b);b=setTimeout(B,300)},W=function(A){b!==null&&A==="remove"&&(clearTimeout(b),B()),window[`${A}EventListener`]("resize",V)},b=null;const S=document.body;C(()=>e.container!==!0?"add":"remove",W),e.container!==!0&&W("add"),ut(()=>{W("remove")})}return()=>{const b=Ae(o.default,[x(Ft,{onScroll:m}),x(we,{onResize:$})]),S=x("div",{class:i.value,style:w.value,ref:e.container===!0?void 0:t,tabindex:-1},b);return e.container===!0?x("div",{class:"q-layout-container overflow-hidden",ref:t},[x(we,{onResize:_}),x("div",{class:"absolute-full",style:p.value},[x("div",{class:"scroll",style:v.value},[S])])]):S}}});const Nt=dt({name:"MainLayout",setup(){const e=z(!1);return{leftDrawerOpen:e,toggleLeftDrawer:()=>{e.value=!e.value}}}}),It=j("img",{src:"/relatorio-transacional-membros/icons/favicon.ico"},null,-1),jt={href:"https://ajuda.engaged.com.br/",target:"_blank"},Xt=j("div",null,"Ajuda",-1),Ut={class:"column"},Yt={class:"row justify-between"};function Kt(e,o,l,r,t,a){const s=ct("router-view");return ft(),vt(Wt,{view:"lHh Lpr lFf"},{default:T(()=>[q(Et,{elevated:""},{default:T(()=>[q($t,null,{default:T(()=>[q(ve,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer},null,8,["onClick"]),q(Bt,null,{default:T(()=>[q(ht,{square:""},{default:T(()=>[It]),_:1})]),_:1}),j("a",jt,[q(ve,{color:"blue-4",size:"0.9em",style:{"margin-left":"7px"}},{default:T(()=>[Xt,q(he,{right:"",size:"xs",name:"open_in_new"})]),_:1})])]),_:1})]),_:1}),q(At,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":o[0]||(o[0]=h=>e.leftDrawerOpen=h),"show-if-above":"",bordered:"",style:{"background-color":"#f6f5f5"}},{default:T(()=>[q(_t,{style:{padding:"0%","margin-top":"0%"}},{default:T(()=>[j("div",Ut,[j("div",Yt,[q($e,{header:""},{default:T(()=>[Be("EngagED Custom v0.1 "),q(Qt,{rounded:"",color:"red-4",label:"demo"})]),_:1}),q(ve,{flat:"",rel:"noopener",to:"/login"},{default:T(()=>[q(he,{name:"logout"})]),_:1})])]),q(zt,{inset:""}),q(Tt,{clickable:"",rel:"noopener",to:"/",exact:""},{default:T(()=>[q(Oe,{avatar:""},{default:T(()=>[q(he,{name:"description"})]),_:1}),q(Oe,null,{default:T(()=>[q($e,null,{default:T(()=>[Be("Relat\xF3rio Transacional")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),q(Ht,null,{default:T(()=>[q(s)]),_:1})]),_:1})}var ta=st(Nt,[["render",Kt]]);export{ta as default};

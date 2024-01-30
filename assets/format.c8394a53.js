import{c as T,a as d,h as p,b as M,g as k,T as Z,U as G,r as Q,V as J,B as O,k as ee,d as F,W as R,w as I,X as te,o as le,e as D,Y as oe,Z as U,s as g,l as m,$ as ie,a0 as ne,a1 as ae,a2 as se}from"./index.3f3ea55d.js";import{u as W,a as z}from"./use-dark.3fcce8a5.js";var ge=T({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:t}){const l=d(()=>parseInt(e.lines,10)),o=d(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(l.value===1?" ellipsis":"")),i=d(()=>e.lines!==void 0&&l.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":l.value}:null);return()=>p("div",{style:i.value,class:o.value},M(t.default))}});const re={true:"inset",item:"item-inset","item-thumbnail":"item-thumbnail-inset"},$={xs:2,sm:4,md:8,lg:16,xl:24};var pe=T({name:"QSeparator",props:{...W,spaced:[Boolean,String],inset:[Boolean,String],vertical:Boolean,color:String,size:String},setup(e){const t=k(),l=z(e,t.proxy.$q),o=d(()=>e.vertical===!0?"vertical":"horizontal"),i=d(()=>` q-separator--${o.value}`),f=d(()=>e.inset!==!1?`${i.value}-${re[e.inset]}`:""),s=d(()=>`q-separator${i.value}${f.value}`+(e.color!==void 0?` bg-${e.color}`:"")+(l.value===!0?" q-separator--dark":"")),u=d(()=>{const c={};if(e.size!==void 0&&(c[e.vertical===!0?"width":"height"]=e.size),e.spaced!==!1){const b=e.spaced===!0?`${$.md}px`:e.spaced in $?`${$[e.spaced]}px`:e.spaced,r=e.vertical===!0?["Left","Right"]:["Top","Bottom"];c[`margin${r[0]}`]=c[`margin${r[1]}`]=b}return c});return()=>p("hr",{class:s.value,style:u.value,"aria-orientation":o.value})}}),ye=T({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:t}){const l=d(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>p("div",{class:l.value},M(t.default))}}),qe=T({name:"QItem",props:{...W,...Z,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:t,emit:l}){const{proxy:{$q:o}}=k(),i=z(e,o),{hasLink:f,linkAttrs:s,linkClass:u,linkTag:c,navigateOnClick:b}=G(),r=Q(null),h=Q(null),y=d(()=>e.clickable===!0||f.value===!0||e.tag==="label"),v=d(()=>e.disable!==!0&&y.value===!0),q=d(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(i.value===!0?" q-item--dark":"")+(f.value===!0&&e.active===null?u.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(v.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),x=d(()=>{if(e.insetLevel===void 0)return null;const a=o.lang.rtl===!0?"Right":"Left";return{["padding"+a]:16+e.insetLevel*56+"px"}});function E(a){v.value===!0&&(h.value!==null&&(a.qKeyEvent!==!0&&document.activeElement===r.value?h.value.focus():document.activeElement===h.value&&r.value.focus()),b(a))}function B(a){if(v.value===!0&&J(a,13)===!0){O(a),a.qKeyEvent=!0;const A=new MouseEvent("click",a);A.qKeyEvent=!0,r.value.dispatchEvent(A)}l("keyup",a)}function n(){const a=ee(t.default,[]);return v.value===!0&&a.unshift(p("div",{class:"q-focus-helper",tabindex:-1,ref:h})),a}return()=>{const a={ref:r,class:q.value,style:x.value,role:"listitem",onClick:E,onKeyup:B};return v.value===!0?(a.tabindex=e.tabindex||"0",Object.assign(a,s.value)):y.value===!0&&(a["aria-disabled"]="true"),p(c.value,a,n())}}}),Le=T({name:"QList",props:{...W,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:t}){const l=k(),o=z(e,l.proxy.$q),i=d(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(o.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>p(e.tag,{class:i.value},M(t.default))}});function Se(e,t,l){let o;function i(){o!==void 0&&(R.remove(o),o=void 0)}return F(()=>{e.value===!0&&i()}),{removeFromHistory:i,addToHistory(){o={condition:()=>l.value===!0,handler:t},R.add(o)}}}const Te={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},ke=["beforeShow","show","beforeHide","hide"];function xe({showing:e,canShow:t,hideOnRouteChange:l,handleShow:o,handleHide:i,processOnMount:f}){const s=k(),{props:u,emit:c,proxy:b}=s;let r;function h(n){e.value===!0?q(n):y(n)}function y(n){if(u.disable===!0||n!==void 0&&n.qAnchorHandled===!0||t!==void 0&&t(n)!==!0)return;const a=u["onUpdate:modelValue"]!==void 0;a===!0&&(c("update:modelValue",!0),r=n,D(()=>{r===n&&(r=void 0)})),(u.modelValue===null||a===!1)&&v(n)}function v(n){e.value!==!0&&(e.value=!0,c("beforeShow",n),o!==void 0?o(n):c("show",n))}function q(n){if(u.disable===!0)return;const a=u["onUpdate:modelValue"]!==void 0;a===!0&&(c("update:modelValue",!1),r=n,D(()=>{r===n&&(r=void 0)})),(u.modelValue===null||a===!1)&&x(n)}function x(n){e.value!==!1&&(e.value=!1,c("beforeHide",n),i!==void 0?i(n):c("hide",n))}function E(n){u.disable===!0&&n===!0?u["onUpdate:modelValue"]!==void 0&&c("update:modelValue",!1):n===!0!==e.value&&(n===!0?v:x)(r)}I(()=>u.modelValue,E),l!==void 0&&te(s)===!0&&I(()=>b.$route.fullPath,()=>{l.value===!0&&e.value===!0&&q()}),f===!0&&le(()=>{E(u.modelValue)});const B={show:y,hide:q,toggle:h};return Object.assign(b,B),B}const ue=[null,document,document.body,document.scrollingElement,document.documentElement];function Ee(e,t){let l=oe(t);if(l===void 0){if(e==null)return window;l=e.closest(".scroll,.scroll-y,.overflow-auto")}return ue.includes(l)?window:l}function ce(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function de(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let C;function Be(){if(C!==void 0)return C;const e=document.createElement("p"),t=document.createElement("div");U(e,{width:"100%",height:"200px"}),U(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const l=e.offsetWidth;t.style.overflow="scroll";let o=e.offsetWidth;return l===o&&(o=t.clientWidth),t.remove(),C=l-o,C}function fe(e,t=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:t?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}let L=0,V,H,S,P=!1,X,Y,j,w=null;function ve(e){me(e)&&O(e)}function me(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=ie(e),l=e.shiftKey&&!e.deltaX,o=!l&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),i=l||o?e.deltaY:e.deltaX;for(let f=0;f<t.length;f++){const s=t[f];if(fe(s,o))return o?i<0&&s.scrollTop===0?!0:i>0&&s.scrollTop+s.clientHeight===s.scrollHeight:i<0&&s.scrollLeft===0?!0:i>0&&s.scrollLeft+s.clientWidth===s.scrollWidth}return!0}function K(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function _(e){P!==!0&&(P=!0,requestAnimationFrame(()=>{P=!1;const{height:t}=e.target,{clientHeight:l,scrollTop:o}=document.scrollingElement;(S===void 0||t!==window.innerHeight)&&(S=l-t,document.scrollingElement.scrollTop=o),o>S&&(document.scrollingElement.scrollTop-=Math.ceil((o-S)/8))}))}function N(e){const t=document.body,l=window.visualViewport!==void 0;if(e==="add"){const{overflowY:o,overflowX:i}=window.getComputedStyle(t);V=de(window),H=ce(window),X=t.style.left,Y=t.style.top,j=window.location.href,t.style.left=`-${V}px`,t.style.top=`-${H}px`,i!=="hidden"&&(i==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),o!=="hidden"&&(o==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,g.is.ios===!0&&(l===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",_,m.passiveCapture),window.visualViewport.addEventListener("scroll",_,m.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",K,m.passiveCapture))}g.is.desktop===!0&&g.is.mac===!0&&window[`${e}EventListener`]("wheel",ve,m.notPassive),e==="remove"&&(g.is.ios===!0&&(l===!0?(window.visualViewport.removeEventListener("resize",_,m.passiveCapture),window.visualViewport.removeEventListener("scroll",_,m.passiveCapture)):window.removeEventListener("scroll",K,m.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=X,t.style.top=Y,window.location.href===j&&window.scrollTo(V,H),S=void 0)}function we(e){let t="add";if(e===!0){if(L++,w!==null){clearTimeout(w),w=null;return}if(L>1)return}else{if(L===0||(L--,L>0))return;if(t="remove",g.is.ios===!0&&g.is.nativeMobile===!0){w!==null&&clearTimeout(w),w=setTimeout(()=>{N(t),w=null},100);return}}N(t)}function Ce(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,we(t))}}}function _e(){let e=null;const t=k();function l(){e!==null&&(clearTimeout(e),e=null)}return ne(l),F(l),{removeTimeout:l,registerTimeout(o,i){l(),ae(t)===!1&&(e=setTimeout(o,i))}}}function $e(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),se.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function Ve(e,t,l){return l<=t?t:Math.min(l,Math.max(t,e))}function He(e,t,l){if(l<=t)return t;const o=l-t+1;let i=t+(e-t)%o;return i<t&&(i=o+i),i===0?0:i}function Pe(e,t=2,l="0"){if(e==null)return e;const o=""+e;return o.length>=t?o:new Array(t-o.length+1).join(l)+o}export{Le as Q,ke as a,_e as b,$e as c,xe as d,Se as e,Ve as f,Ce as g,Ee as h,ce as i,de as j,Be as k,ge as l,pe as m,qe as n,ye as o,He as p,Pe as q,Te as u};

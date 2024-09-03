(function(){"use strict";var _=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"janitor-wrapper"},[o("k-button",{class:["janitor",t.button.state],style:t.buttonStyle,attrs:{id:t.id,icon:t.currentIcon,command:t.command,disabled:!t.unsaved&&!t.isUnsaved&&t.hasChanges},on:{click:t.runJanitor}},[t._v(" "+t._s(t.button.label||t.label)+" ")]),t.button.help||t.help?o("k-text",{staticClass:"k-field-help",attrs:{theme:"help",html:t.button.help||t.help}}):t._e(),o("a",{directives:[{name:"show",rawName:"v-show",value:t.downloadRequest,expression:"downloadRequest"}],ref:"downloadAnchor",staticClass:"visually-hidden",attrs:{href:t.downloadRequest,download:""}}),o("a",{directives:[{name:"show",rawName:"v-show",value:t.urlRequest,expression:"urlRequest"}],ref:"tabAnchor",staticClass:"visually-hidden",attrs:{href:t.urlRequest,target:"_blank"}})],1)},w=[],q="";function C(t,e,o,d,r,b,a,f){var s=typeof t=="function"?t.options:t;e&&(s.render=e,s.staticRenderFns=o,s._compiled=!0),d&&(s.functional=!0),b&&(s._scopeId="data-v-"+b);var i;if(a?(i=function(n){n=n||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!n&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(n=__VUE_SSR_CONTEXT__),r&&r.call(this,n),n&&n._registeredComponents&&n._registeredComponents.add(a)},s._ssrRegister=i):r&&(i=f?function(){r.call(this,(s.functional?this.parent:this).$root.$options.shadowRoot)}:r),i)if(s.functional){s._injectStyles=i;var l=s.render;s.render=function(p,h){return i.call(h),l(p,h)}}else{var u=s.beforeCreate;s.beforeCreate=u?[].concat(u,i):[i]}return{exports:t,options:s}}const c="janitor.runAfterAutosave",y={props:{autosave:Boolean,backgroundColor:String,clipboard:Boolean,color:String,confirm:String,command:String,cooldown:Number,error:String,icon:String,intab:Boolean,help:String,label:String,progress:String,success:String,status:String,unsaved:Boolean},data(){return{button:{label:null,state:null,help:null,style:null},clipboardRequest:null,downloadRequest:null,icons:{"is-running":"janitorLoader","is-success":"check","has-error":"alert"},isUnsaved:!1,urlRequest:null}},computed:{buttonStyle(){return this.button.style||{color:this.color,backgroundColor:this.backgroundColor}},currentIcon(){var t;return(t=this.icons[this.status])!=null?t:this.icon},id(){var t;return"janitor-"+this.hashCode(this.command+((t=this.button.label)!=null?t:"")+this.label)},hasChanges(){return this.$store.getters["content/hasChanges"]()}},created(){this.$events.$on("model.update",()=>sessionStorage.getItem(c)&&location.reload()),sessionStorage.getItem(c)===this.id&&(sessionStorage.removeItem(c),this.runJanitor())},methods:{hashCode(t){let e=0;if(t.length===0)return e;for(const o of t)e=(e<<5)-e+t.charCodeAt(o),e=e&e;return e},async runJanitor(){if(!(this.confirm&&!window.confirm(this.confirm))){if(this.autosave&&this.hasChanges){const t=document.querySelector(".k-panel .k-form-buttons .k-view").lastChild;if(t){this.isUnsaved=!1,sessionStorage.setItem(c,this.id),this.simulateClick(t);return}}if(this.clipboardRequest){await this.copyToClipboard(this.clipboardRequest),this.resetButton(),this.clipboardRequest=null;return}this.status||await this.postRequest("plugin-janitor",{command:this.command})}},async postRequest(t,e){var m;this.button.label=(m=this.progress)!=null?m:`${this.label} \u2026`,this.button.state="is-running";const{label:o,message:d,status:r,reload:b,open:a,download:f,clipboard:s,success:i,error:l,icon:u,help:n,color:p,backgroundColor:h,resetStyle:g}=await this.$api.post(t,e);r===200?this.button.label=i!=null?i:this.success:this.button.label=l!=null?l:this.error,o&&(this.label=o),d&&(this.button.label=d),n&&(this.button.help=n),u&&(this.icon=u),this.button.style={color:"white",reset:!0},r?(this.button.state=r===200?"is-success":"has-error",this.button.style.backgroundColor=r===200?"var(--color-positive)":"var(--color-negative-light)"):(this.button.state="has-response",this.button.style.backgroundColor="var(--color-text)"),p&&(this.button.style.reset=!1,this.button.style.color=p),h&&(this.button.style.reset=!1,this.button.style.backgroundColor=h),g&&(this.button.style.reset=g),b&&location.reload(),a&&(this.intab?(this.urlRequest=a,this.$nextTick(()=>{this.simulateClick(this.$refs.tabAnchor)})):location.href=a),f&&(this.downloadRequest=f,this.$nextTick(()=>{this.simulateClick(this.$refs.downloadAnchor)})),s?(this.clipboardRequest=s,this.button.label=this.progress,this.button.state="is-success",setTimeout(this.resetButton,this.cooldown),this.$nextTick(()=>{this.copyToClipboard(this.clipboardRequest)})):setTimeout(this.resetButton,this.cooldown)},resetButton(){var t;this.button.label=null,this.button.state=null,this.button.style=(t=this.button.style)!=null&&t.reset?null:this.button.style},simulateClick(t){const e=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window});t.dispatchEvent(e)},async copyToClipboard(t){try{await navigator.clipboard.writeText(t)}catch{console.error("navigator.clipboard is not available")}}}},v={};var k=C(y,_,w,!1,R,null,null,null);function R(t){for(let e in v)this[e]=v[e]}var S=function(){return k.exports}();window.panel.plugin("bnomei/janitor",{fields:{janitor:S},icons:{janitorLoader:'<svg viewBox="0 0 24 24" version="1.1" id="svg2" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" id="g2" transform="matrix(1.2373578,0,0,1.2393776,2.1011378,2.0846672)"><g transform="translate(1,1)" stroke-width="1.75" id="g1"><circle cx="7" cy="7" r="7.2" stroke="#000" stroke-opacity=".2" id="circle1"/><path d="M 14.2,7 C 14.2,3 11,-0.2 7,-0.2" stroke="#000" id="path1"><animateTransform attributeName="transform" type="rotate" from="0 7 7" to="360 7 7" dur="1s" repeatCount="indefinite"/></path></g></g></svg>'}})})();

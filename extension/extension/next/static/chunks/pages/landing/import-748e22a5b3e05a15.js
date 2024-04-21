(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[144],{7166:function(e,l,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/landing/import",function(){return n(4629)}])},4629:function(e,l,n){"use strict";n.r(l),n.d(l,{default:function(){return g}});var a=n(5893),r=n(6702),i=n(6948),t=n(2757),s=n(4e3),o=n(6914),d=n(6101),u=n(820),c=n(6554),m=n(7030),h=n(3179),p=n(5432),x=["h","minH","height","minHeight"],f=(0,c.G)((e,l)=>{let n=(0,m.mq)("Textarea",e),{className:r,rows:i,...t}=(0,h.Lr)(e),s=(0,u.Y)(t),d=i?function(e,l=[]){let n=Object.assign({},e);for(let e of l)e in n&&delete n[e];return n}(n,x):n;return(0,a.jsx)(o.m.textarea,{ref:l,rows:i,...s,className:(0,p.cx)("chakra-textarea",r),__css:d})});f.displayName="Textarea";var v=n(9289),b=n(3090),y=n(2916),_=n(1163),j=n(7294),k=n(5451),C=n(3835);let g=()=>{let e=(0,_.useRouter)(),l=(0,C.M)(),[n,u]=(0,j.useState)(""),[c,m]=(0,j.useState)(""),h=(0,j.useCallback)(()=>{let e=n.split(" ");24===e.length&&l.setAccount({mnemonic:e.join(" "),password:c})},[n,c,e]);return(0,a.jsxs)(r.K,{children:[(0,a.jsx)(i.J,{as:k.sfB,onClick:()=>e.back()}),(0,a.jsx)(t.X,{size:"lg",children:"Import Wallet"}),(0,a.jsxs)(s.x,{children:["Import existing wallet using 24-word mnemonic phrase."," ",(0,a.jsxs)(o.m.span,{as:"i",color:"gray.500",children:["You"," ",(0,a.jsx)(o.m.span,{as:"b",color:"error",children:"SHOULD NOT USE"})," ","the same mnemonic phrase as your exsiting Ethereum wallet."]})]}),(0,a.jsx)(d.E,{rounded:"md",children:(0,a.jsx)(f,{h:"130px",fontSize:"xs",placeholder:"Paste your 24-word mnemonic phrase here.",_placeholder:{color:"gray.400",fontSize:"xs"},onChange:e=>u(e.target.value)})}),(0,a.jsx)(v.i,{my:2}),(0,a.jsx)(t.X,{size:"md",children:"Set Password"}),(0,a.jsx)(b.I,{type:"password",onChange:e=>m(e.target.value)}),(0,a.jsx)(y.z,{onClick:h,isDisabled:0===n.length||0===c.length,children:"Import Wallet"})]})}},820:function(e,l,n){"use strict";n.d(l,{Y:function(){return f}});var a=n(5227),r=n(1103),i=n(6554),t=n(7030),s=n(3179),o=n(6914),d=n(5432),u=n(7294),c=n(5893),[m,h]=(0,a.k)({name:"FormControlStylesContext",errorMessage:"useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<FormControl />\" "}),[p,x]=(0,a.k)({strict:!1,name:"FormControlContext"});function f(e){let{isDisabled:l,isInvalid:n,isReadOnly:a,isRequired:r,...i}=function(e){var l,n,a;let r=x(),{id:i,disabled:t,readOnly:s,required:o,isRequired:u,isInvalid:c,isReadOnly:m,isDisabled:h,onFocus:p,onBlur:f,...v}=e,b=e["aria-describedby"]?[e["aria-describedby"]]:[];return(null==r?void 0:r.hasFeedbackText)&&(null==r?void 0:r.isInvalid)&&b.push(r.feedbackId),(null==r?void 0:r.hasHelpText)&&b.push(r.helpTextId),{...v,"aria-describedby":b.join(" ")||void 0,id:null!=i?i:null==r?void 0:r.id,isDisabled:null!=(l=null!=t?t:h)?l:null==r?void 0:r.isDisabled,isReadOnly:null!=(n=null!=s?s:m)?n:null==r?void 0:r.isReadOnly,isRequired:null!=(a=null!=o?o:u)?a:null==r?void 0:r.isRequired,isInvalid:null!=c?c:null==r?void 0:r.isInvalid,onFocus:(0,d.v0)(null==r?void 0:r.onFocus,p),onBlur:(0,d.v0)(null==r?void 0:r.onBlur,f)}}(e);return{...i,disabled:l,readOnly:a,required:r,"aria-invalid":(0,d.Qm)(n),"aria-required":(0,d.Qm)(r),"aria-readonly":(0,d.Qm)(a)}}(0,i.G)(function(e,l){let n=(0,t.jC)("Form",e),a=(0,s.Lr)(e),{getRootProps:i,htmlProps:h,...x}=function(e){let{id:l,isRequired:n,isInvalid:a,isDisabled:i,isReadOnly:t,...s}=e,o=(0,u.useId)(),c=l||`field-${o}`,m=`${c}-label`,h=`${c}-feedback`,p=`${c}-helptext`,[x,f]=(0,u.useState)(!1),[v,b]=(0,u.useState)(!1),[y,_]=(0,u.useState)(!1),j=(0,u.useCallback)((e={},l=null)=>({id:p,...e,ref:(0,r.lq)(l,e=>{e&&b(!0)})}),[p]),k=(0,u.useCallback)((e={},l=null)=>({...e,ref:l,"data-focus":(0,d.PB)(y),"data-disabled":(0,d.PB)(i),"data-invalid":(0,d.PB)(a),"data-readonly":(0,d.PB)(t),id:void 0!==e.id?e.id:m,htmlFor:void 0!==e.htmlFor?e.htmlFor:c}),[c,i,y,a,t,m]),C=(0,u.useCallback)((e={},l=null)=>({id:h,...e,ref:(0,r.lq)(l,e=>{e&&f(!0)}),"aria-live":"polite"}),[h]),g=(0,u.useCallback)((e={},l=null)=>({...e,...s,ref:l,role:"group","data-focus":(0,d.PB)(y),"data-disabled":(0,d.PB)(i),"data-invalid":(0,d.PB)(a),"data-readonly":(0,d.PB)(t)}),[s,i,y,a,t]),N=(0,u.useCallback)((e={},l=null)=>({...e,ref:l,role:"presentation","aria-hidden":!0,children:e.children||"*"}),[]);return{isRequired:!!n,isInvalid:!!a,isReadOnly:!!t,isDisabled:!!i,isFocused:!!y,onFocus:()=>_(!0),onBlur:()=>_(!1),hasFeedbackText:x,setHasFeedbackText:f,hasHelpText:v,setHasHelpText:b,id:c,labelId:m,feedbackId:h,helpTextId:p,htmlProps:s,getHelpTextProps:j,getErrorMessageProps:C,getRootProps:g,getLabelProps:k,getRequiredIndicatorProps:N}}(a),f=(0,d.cx)("chakra-form-control",e.className);return(0,c.jsx)(p,{value:x,children:(0,c.jsx)(m,{value:n,children:(0,c.jsx)(o.m.div,{...i({},l),className:f,__css:n.container})})})}).displayName="FormControl",(0,i.G)(function(e,l){let n=x(),a=h(),r=(0,d.cx)("chakra-form__helper-text",e.className);return(0,c.jsx)(o.m.div,{...null==n?void 0:n.getHelpTextProps(e,l),__css:a.helperText,className:r})}).displayName="FormHelperText"},3090:function(e,l,n){"use strict";n.d(l,{I:function(){return u}});var a=n(820),r=n(6554),i=n(7030),t=n(3179),s=n(6914),o=n(5432),d=n(5893),u=(0,r.G)(function(e,l){let{htmlSize:n,...r}=e,u=(0,i.jC)("Input",r),c=(0,t.Lr)(r),m=(0,a.Y)(c),h=(0,o.cx)("chakra-input",e.className);return(0,d.jsx)(s.m.input,{size:n,...m,__css:u.field,ref:l,className:h})});u.displayName="Input",u.id="Input"},6101:function(e,l,n){"use strict";n.d(l,{E:function(){return d}});var a=n(6554),r=n(7030),i=n(3179),t=n(6914),s=n(5432),o=n(5893),d=(0,a.G)(function(e,l){let n=(0,r.mq)("Code",e),{className:a,...d}=(0,i.Lr)(e);return(0,o.jsx)(t.m.code,{ref:l,className:(0,s.cx)("chakra-code",e.className),...d,__css:{display:"inline-block",...n}})});d.displayName="Code"}},function(e){e.O(0,[845,485,774,888,179],function(){return e(e.s=7166)}),_N_E=e.O()}]);
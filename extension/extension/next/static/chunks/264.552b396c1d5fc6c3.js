"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[264],{4264:function(n,t,e){e.a(n,async function(n,_){try{e.r(t),e.d(t,{Keys:function(){return i.R8},Params:function(){return i.SP},__wbg_buffer_12d079cc21e14bdb:function(){return i._D},__wbg_call_27c0f87801dedf93:function(){return i.Sp},__wbg_call_b3ca7c6051f9bec1:function(){return i.EI},__wbg_crypto_566d7465cdbb6b7a:function(){return i.HK},__wbg_getRandomValues_260cc23a41afad9a:function(){return i.sx},__wbg_globalThis_d1e6af4856ba331b:function(){return i.Bg},__wbg_global_207b558942527489:function(){return i.nD},__wbg_msCrypto_0b84745e9245cdf6:function(){return i.L},__wbg_new_63b92bc8671ed464:function(){return i.KX},__wbg_newnoargs_e258087cd0daa0ea:function(){return i.eh},__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb:function(){return i.a6},__wbg_newwithlength_e9b4878cebadb3d3:function(){return i.ql},__wbg_node_caaf83d002149bd5:function(){return i.xC},__wbg_process_dc09a8c7d59982f6:function(){return i.$Z},__wbg_randomFillSync_290977693942bf03:function(){return i.VQ},__wbg_require_94a9da52636aacbf:function(){return i.vH},__wbg_self_ce0dbfc45cf2f5be:function(){return i.m7},__wbg_set_a47bac70306a19a7:function(){return i.fH},__wbg_set_wasm:function(){return i.oT},__wbg_subarray_a1f73cd4b5b42fe1:function(){return i.kW},__wbg_versions_d98c6400c6ca2bd8:function(){return i.nN},__wbg_window_c6fb939a7f436783:function(){return i.YY},__wbindgen_is_function:function(){return i.o$},__wbindgen_is_object:function(){return i.Wl},__wbindgen_is_string:function(){return i.eY},__wbindgen_is_undefined:function(){return i.XP},__wbindgen_memory:function(){return i.oH},__wbindgen_object_clone_ref:function(){return i.m_},__wbindgen_object_drop_ref:function(){return i.ug},__wbindgen_string_new:function(){return i.h4},__wbindgen_throw:function(){return i.Or},keypair:function(){return i.or},keypair_derive:function(){return i.RT},verify:function(){return i.T}});var r=e(7918),i=e(7285),u=n([r]);r=(u.then?(await u)():u)[0],(0,i.oT)(r),_()}catch(n){_(n)}})},7285:function(n,t,e){let _;function r(n){_=n}e.d(t,{$Z:function(){return D},Bg:function(){return O},EI:function(){return U},HK:function(){return H},KX:function(){return M},L:function(){return F},Or:function(){return nt},R8:function(){return j},RT:function(){return y},SP:function(){return T},Sp:function(){return X},T:function(){return k},VQ:function(){return P},Wl:function(){return R},XP:function(){return I},YY:function(){return N},_D:function(){return Q},a6:function(){return Z},eY:function(){return C},eh:function(){return W},fH:function(){return G},h4:function(){return E},kW:function(){return nn},m7:function(){return L},m_:function(){return $},nD:function(){return z},nN:function(){return Y},o$:function(){return A},oH:function(){return ne},oT:function(){return r},or:function(){return l},ql:function(){return J},sx:function(){return V},ug:function(){return x},vH:function(){return S},xC:function(){return q}}),n=e.hmd(n);let i=Array(128).fill(void 0);i.push(void 0,null,!0,!1);let u=i.length;function c(n){let t=i[n];return n<132||(i[n]=u,u=n),t}let o="undefined"==typeof TextDecoder?(0,n.require)("util").TextDecoder:TextDecoder,f=new o("utf-8",{ignoreBOM:!0,fatal:!0});f.decode();let a=null;function b(){return(null===a||0===a.byteLength)&&(a=new Uint8Array(_.memory.buffer)),a}function s(n,t){return n>>>=0,f.decode(b().subarray(n,n+t))}function g(n){u===i.length&&i.push(i.length+1);let t=u;return u=i[t],i[t]=n,t}function l(){let n=_.keypair();return j.__wrap(n)}let d=0;function w(n,t){let e=t(1*n.length,1)>>>0;return b().set(n,e/1),d=n.length,e}function y(n){let t=w(n,_.__wbindgen_malloc),e=d,r=_.keypair_derive(t,e);return j.__wrap(r)}let p=null;function h(){return(null===p||0===p.byteLength)&&(p=new Int32Array(_.memory.buffer)),p}function m(n,t){return n>>>=0,b().subarray(n/1,n/1+t)}function k(n,t,e){let r=w(n,_.__wbindgen_malloc),i=d,u=w(t,_.__wbindgen_malloc),c=d,o=w(e,_.__wbindgen_malloc),f=d,a=_.verify(r,i,u,c,o,f);return 0!==a}function v(n,t){try{return n.apply(this,t)}catch(n){_.__wbindgen_exn_store(g(n))}}let B="undefined"==typeof FinalizationRegistry?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>_.__wbg_keys_free(n>>>0));class j{static __wrap(n){n>>>=0;let t=Object.create(j.prototype);return t.__wbg_ptr=n,B.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,B.unregister(this),n}free(){let n=this.__destroy_into_raw();_.__wbg_keys_free(n)}constructor(){let n=_.keypair();return this.__wbg_ptr=n>>>0,this}static derive(n){let t=w(n,_.__wbindgen_malloc),e=d,r=_.keypair_derive(t,e);return j.__wrap(r)}get pubkey(){try{let r=_.__wbindgen_add_to_stack_pointer(-16);_.keys_pubkey(r,this.__wbg_ptr);var n=h()[r/4+0],t=h()[r/4+1],e=m(n,t).slice();return _.__wbindgen_free(n,1*t,1),e}finally{_.__wbindgen_add_to_stack_pointer(16)}}get secret(){try{let r=_.__wbindgen_add_to_stack_pointer(-16);_.keys_secret(r,this.__wbg_ptr);var n=h()[r/4+0],t=h()[r/4+1],e=m(n,t).slice();return _.__wbindgen_free(n,1*t,1),e}finally{_.__wbindgen_add_to_stack_pointer(16)}}sign_bytes(n,t){try{let u=_.__wbindgen_add_to_stack_pointer(-16),c=w(n,_.__wbindgen_malloc),o=d;_.keys_sign_bytes(u,this.__wbg_ptr,c,o,t);var e=h()[u/4+0],r=h()[u/4+1],i=m(e,r).slice();return _.__wbindgen_free(e,1*r,1),i}finally{_.__wbindgen_add_to_stack_pointer(16)}}sign_json(n,t){let e,r;try{let c=_.__wbindgen_add_to_stack_pointer(-16),o=w(n,_.__wbindgen_malloc),f=d;_.keys_sign_json(c,this.__wbg_ptr,o,f,t);var i=h()[c/4+0],u=h()[c/4+1];return e=i,r=u,s(i,u)}finally{_.__wbindgen_add_to_stack_pointer(16),_.__wbindgen_free(e,r,1)}}pk_json(){let n,t;try{let i=_.__wbindgen_add_to_stack_pointer(-16);_.keys_pk_json(i,this.__wbg_ptr);var e=h()[i/4+0],r=h()[i/4+1];return n=e,t=r,s(e,r)}finally{_.__wbindgen_add_to_stack_pointer(16),_.__wbindgen_free(n,t,1)}}expanded_pk_json(){let n,t;try{let i=_.__wbindgen_add_to_stack_pointer(-16);_.keys_expanded_pk_json(i,this.__wbg_ptr);var e=h()[i/4+0],r=h()[i/4+1];return n=e,t=r,s(e,r)}finally{_.__wbindgen_add_to_stack_pointer(16),_.__wbindgen_free(n,t,1)}}}let K="undefined"==typeof FinalizationRegistry?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>_.__wbg_params_free(n>>>0));class T{__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,K.unregister(this),n}free(){let n=this.__destroy_into_raw();_.__wbg_params_free(n)}get publicKeyBytes(){let n=_.__wbg_get_params_publicKeyBytes(this.__wbg_ptr);return n>>>0}get secretKeyBytes(){let n=_.__wbg_get_params_secretKeyBytes(this.__wbg_ptr);return n>>>0}get signBytes(){let n=_.__wbg_get_params_signBytes(this.__wbg_ptr);return n>>>0}static get publicKeyBytes(){let n=_.params_publicKeyBytes();return n>>>0}static get secretKeyBytes(){let n=_.params_secretKeyBytes();return n>>>0}static get signBytes(){let n=_.params_signBytes();return n>>>0}}function x(n){c(n)}function H(n){let t=i[n].crypto;return g(t)}function R(n){let t=i[n];return"object"==typeof t&&null!==t}function D(n){let t=i[n].process;return g(t)}function Y(n){let t=i[n].versions;return g(t)}function q(n){let t=i[n].node;return g(t)}function C(n){let t="string"==typeof i[n];return t}function F(n){let t=i[n].msCrypto;return g(t)}function S(){return v(function(){let t=n.require;return g(t)},arguments)}function A(n){let t="function"==typeof i[n];return t}function E(n,t){let e=s(n,t);return g(e)}function P(){return v(function(n,t){i[n].randomFillSync(c(t))},arguments)}function V(){return v(function(n,t){i[n].getRandomValues(i[t])},arguments)}function W(n,t){let e=Function(s(n,t));return g(e)}function X(){return v(function(n,t){let e=i[n].call(i[t]);return g(e)},arguments)}function $(n){let t=i[n];return g(t)}function L(){return v(function(){let n=self.self;return g(n)},arguments)}function N(){return v(function(){let n=window.window;return g(n)},arguments)}function O(){return v(function(){let n=globalThis.globalThis;return g(n)},arguments)}function z(){return v(function(){let n=e.g.global;return g(n)},arguments)}function I(n){let t=void 0===i[n];return t}function U(){return v(function(n,t,e){let _=i[n].call(i[t],i[e]);return g(_)},arguments)}function Q(n){let t=i[n].buffer;return g(t)}function Z(n,t,e){let _=new Uint8Array(i[n],t>>>0,e>>>0);return g(_)}function M(n){let t=new Uint8Array(i[n]);return g(t)}function G(n,t,e){i[n].set(i[t],e>>>0)}function J(n){let t=new Uint8Array(n>>>0);return g(t)}function nn(n,t,e){let _=i[n].subarray(t>>>0,e>>>0);return g(_)}function nt(n,t){throw Error(s(n,t))}function ne(){let n=_.memory;return g(n)}},7918:function(n,t,e){var _=e(7285);n.exports=e.v(t,n.id,"cf5dfb77e13e3bf1",{"./pqc_dilithium_bg.js":{__wbindgen_object_drop_ref:_.ug,__wbg_crypto_566d7465cdbb6b7a:_.HK,__wbindgen_is_object:_.Wl,__wbg_process_dc09a8c7d59982f6:_.$Z,__wbg_versions_d98c6400c6ca2bd8:_.nN,__wbg_node_caaf83d002149bd5:_.xC,__wbindgen_is_string:_.eY,__wbg_msCrypto_0b84745e9245cdf6:_.L,__wbg_require_94a9da52636aacbf:_.vH,__wbindgen_is_function:_.o$,__wbindgen_string_new:_.h4,__wbg_randomFillSync_290977693942bf03:_.VQ,__wbg_getRandomValues_260cc23a41afad9a:_.sx,__wbg_newnoargs_e258087cd0daa0ea:_.eh,__wbg_call_27c0f87801dedf93:_.Sp,__wbindgen_object_clone_ref:_.m_,__wbg_self_ce0dbfc45cf2f5be:_.m7,__wbg_window_c6fb939a7f436783:_.YY,__wbg_globalThis_d1e6af4856ba331b:_.Bg,__wbg_global_207b558942527489:_.nD,__wbindgen_is_undefined:_.XP,__wbg_call_b3ca7c6051f9bec1:_.EI,__wbg_buffer_12d079cc21e14bdb:_._D,__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb:_.a6,__wbg_new_63b92bc8671ed464:_.KX,__wbg_set_a47bac70306a19a7:_.fH,__wbg_newwithlength_e9b4878cebadb3d3:_.ql,__wbg_subarray_a1f73cd4b5b42fe1:_.kW,__wbindgen_throw:_.Or,__wbindgen_memory:_.oH}})}}]);
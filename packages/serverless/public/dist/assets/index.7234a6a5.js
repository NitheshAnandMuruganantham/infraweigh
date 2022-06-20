import{e as oe,f as re,s as M,b as B,r as h,i as ae,a as H,j as ne,n as o,k as ge,x as ie,l as R,a2 as ve,h as se,D as be,b4 as ye,A as we,y as xe,C as Ce,S as Re,O as Se,Q as _e,aI as ke,K as le,b5 as $e,L as Be,b6 as T,b7 as W,b8 as F,b9 as L,W as Ge,U as q,V as Ie,X as U,Y as Ne}from"./index.4c95a279.js";import{S as We,_ as E,n as X,o as Fe,b as ce,e as de,c as ue,D as he,G as qe,F as De,f as P,T as V,I as Pe}from"./index.3fb97640.js";import{A as z}from"./index.b83c20b3.js";import{B as ze,R as je}from"./index.c95597f1.js";import{u as Me,b as Te,B as D,e as J}from"./TextField.a171345c.js";import{c as K,a as j,b as Y,M as Le}from"./index.a03a43f2.js";import{c as Oe}from"./Lazy.211a25ac.js";import{L as Ue}from"./index.fd8f2665.js";import{S as Ve}from"./Switch.fbd48d7b.js";function Ae(e){return oe("MuiFormGroup",e)}re("MuiFormGroup",["root","row","error"]);const Ee=["className","row"],He=e=>{const{classes:t,row:r,error:a}=e;return ne({root:["root",r&&"row",a&&"error"]},Ae,t)},Qe=M("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.row&&t.row]}})(({ownerState:e})=>B({display:"flex",flexDirection:"column",flexWrap:"wrap"},e.row&&{flexDirection:"row"})),Xe=h.exports.forwardRef(function(t,r){const a=ae({props:t,name:"MuiFormGroup"}),{className:i,row:v=!1}=a,u=H(a,Ee),k=Me(),G=Te({props:a,muiFormControl:k,states:["error"]}),x=B({},a,{row:v,error:G.error}),c=He(x);return o(Qe,B({className:ge(c.root,i),ownerState:x,ref:r},u))});var Je=Xe,Ke=ie(o("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),Ye=ie(o("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked");const Ze=M("span")({position:"relative",display:"flex"}),et=M(Ke)({transform:"scale(1)"}),tt=M(Ye)(({theme:e,ownerState:t})=>B({left:0,position:"absolute",transform:"scale(0)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeIn,duration:e.transitions.duration.shortest})},t.checked&&{transform:"scale(1)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.shortest})}));function pe(e){const{checked:t=!1,classes:r={},fontSize:a}=e,i=B({},e,{checked:t});return R(Ze,{className:r.root,ownerState:i,children:[o(et,{fontSize:a,className:r.background,ownerState:i}),o(tt,{fontSize:a,className:r.dot,ownerState:i})]})}const ot=h.exports.createContext(void 0);var fe=ot;function rt(){return h.exports.useContext(fe)}function at(e){return oe("MuiRadio",e)}const nt=re("MuiRadio",["root","checked","disabled","colorPrimary","colorSecondary"]);var Z=nt;const it=["checked","checkedIcon","color","icon","name","onChange","size"],st=e=>{const{classes:t,color:r}=e,a={root:["root",`color${se(r)}`]};return B({},t,ne(a,at,t))},lt=M(We,{shouldForwardProp:e=>ve(e)||e==="classes",name:"MuiRadio",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`color${se(r.color)}`]]}})(({theme:e,ownerState:t})=>B({color:(e.vars||e).palette.text.secondary,"&:hover":{backgroundColor:e.vars?`rgba(${t.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:be(t.color==="default"?e.palette.action.active:e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.color!=="default"&&{[`&.${Z.checked}`]:{color:(e.vars||e).palette[t.color].main}},{[`&.${Z.disabled}`]:{color:(e.vars||e).palette.action.disabled}}));function ct(e,t){return typeof t=="object"&&t!==null?e===t:String(e)===String(t)}const ee=o(pe,{checked:!0}),te=o(pe,{}),dt=h.exports.forwardRef(function(t,r){var a,i;const v=ae({props:t,name:"MuiRadio"}),{checked:u,checkedIcon:k=ee,color:G="primary",icon:x=te,name:c,onChange:C,size:_="medium"}=v,S=H(v,it),f=B({},v,{color:G,size:_}),b=st(f),d=rt();let m=u;const w=ye(C,d&&d.onChange);let n=c;return d&&(typeof m=="undefined"&&(m=ct(d.value,v.value)),typeof n=="undefined"&&(n=d.name)),o(lt,B({type:"radio",icon:h.exports.cloneElement(x,{fontSize:(a=te.props.fontSize)!=null?a:_}),checkedIcon:h.exports.cloneElement(k,{fontSize:(i=ee.props.fontSize)!=null?i:_}),ownerState:f,classes:b,name:n,checked:m,onChange:w,ref:r},S))});var ut=dt;const ht=["actions","children","defaultValue","name","onChange","value"],pt=h.exports.forwardRef(function(t,r){const{actions:a,children:i,defaultValue:v,name:u,onChange:k,value:G}=t,x=H(t,ht),c=h.exports.useRef(null),[C,_]=we({controlled:G,default:v,name:"RadioGroup"});h.exports.useImperativeHandle(a,()=>({focus:()=>{let d=c.current.querySelector("input:not(:disabled):checked");d||(d=c.current.querySelector("input:not(:disabled)")),d&&d.focus()}}),[]);const S=xe(r,c),f=d=>{_(d.target.value),k&&k(d,d.target.value)},b=Ce(u);return o(fe.Provider,{value:{name:b,onChange:f,value:C},children:o(Je,B({role:"radiogroup",ref:S},x,{children:i}))})});var ft=pt;function mt(e){var t=e.field,r=t.onBlur,a=X(t,["onBlur"]);e.form;var i=e.onBlur,v=X(e,["field","form","onBlur"]);return E(E({onBlur:i!=null?i:function(u){r(u!=null?u:a.name)}},a),v)}function me(e){return h.exports.createElement(ft,E({},mt(e)))}me.displayName="FormikMaterialUIRadioGroup";const gt=({name:e,show:t})=>t?o(Fe,{value:e,control:o(ut,{}),label:e}):null,vt=h.exports.forwardRef(function(t,r){return o(Re,{direction:"up",ref:r,...t})}),bt=({open:e,setOpen:t,data:r})=>{const a=async()=>{t(!1)},i=h.exports.useRef();return R(ce,{sx:{zIndex:"10000"},open:e,TransitionComponent:vt,keepMounted:!0,fullWidth:!0,maxWidth:"md",onClose:a,"aria-describedby":"alert-dialog-slide-description",children:[o(de,{}),o(ue,{children:e?o("span",{ref:i,children:o(ze,{data:r})}):null}),R(he,{children:[o(D,{onClick:a,children:"close"}),o(je,{content:()=>i.current,trigger:()=>o(D,{children:"print"})})]})]})},yt=({handleClose:e,setLoading:t,setWeight:r,setBillRefId:a,vehicleNumber:i})=>{var d,m;const[v,u]=h.exports.useState(1),[k,G]=h.exports.useState([]),[x,c]=h.exports.useState(1),{data:C,loading:_}=Se({variables:{where:{vehicle_number:{_eq:i}},offset:(v-1)*x,limit:x}}),{data:S,loading:f}=_e({variables:{where:{vehicle_number:{_eq:i}}}}),b=[{field:"id",width:300,headerName:"id",editable:!1},{field:"scale_weight",headerName:"weight",width:300,editable:!1},{field:"created_at",headerName:"created at",width:400,valueGetter:w=>new Date(w.value).toLocaleString(),editable:!1},{field:"select",headerName:"select",renderCell:w=>o(D,{onClick:()=>{var n,I;t(!0),r(((n=w==null?void 0:w.row)==null?void 0:n.scale_weight)||0),a(((I=w==null?void 0:w.row)==null?void 0:I.id)||""),t(!1),e()},variant:"outlined",size:"small",children:"select"})}];return R(ce,{maxWidth:"xl",fullWidth:!0,open:!0,onClose:e,children:[o(de,{children:"select weight"}),o(ue,{children:o(ke,{height:"500px",children:o(qe,{data:(C==null?void 0:C.bill)||[],pageSize:x,setPage:u,setSort:G,rowCount:((m=(d=S==null?void 0:S.bill_aggregate)==null?void 0:d.aggregate)==null?void 0:m.count)||0,setFilter:()=>null,setPageSize:c,loading:f||_,columns:b})})}),o(he,{children:o(D,{onClick:e,children:"Cancel"})})]})},wt=({vehicleNumber:e,setWeight:t,setBillRefId:r,setLoading:a})=>{const[i,v]=h.exports.useState(!1),u=async()=>{v(!0)};return R(le,{children:[o(D,{variant:"outlined",sx:{m:1,width:"60%"},onClick:()=>{u()},children:"select weight"}),i&&o(yt,{handleClose:()=>{v(!1)},setBillRefId:r,setWeight:t,setLoading:a,vehicleNumber:e})]})};var O,xt=new Uint8Array(16);function Ct(){if(!O&&(O=typeof crypto!="undefined"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto!="undefined"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!O))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return O(xt)}var Rt=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function St(e){return typeof e=="string"&&Rt.test(e)}var y=[];for(var A=0;A<256;++A)y.push((A+256).toString(16).substr(1));function _t(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=(y[e[t+0]]+y[e[t+1]]+y[e[t+2]]+y[e[t+3]]+"-"+y[e[t+4]]+y[e[t+5]]+"-"+y[e[t+6]]+y[e[t+7]]+"-"+y[e[t+8]]+y[e[t+9]]+"-"+y[e[t+10]]+y[e[t+11]]+y[e[t+12]]+y[e[t+13]]+y[e[t+14]]+y[e[t+15]]).toLowerCase();if(!St(r))throw TypeError("Stringified UUID is invalid");return r}function kt(e,t,r){e=e||{};var a=e.random||(e.rng||Ct)();if(a[6]=a[6]&15|64,a[8]=a[8]&63|128,t){r=r||0;for(var i=0;i<16;++i)t[r+i]=a[i];return t}return _t(a)}const Pt=()=>{const[e]=$e(),[t,r]=h.exports.useState(null),[a,i]=h.exports.useState(!1),[v,u]=h.exports.useState(!1),[k,G]=h.exports.useState(null),x=K().shape({value:j().required("Required"),label:j().required("Required")});return R(le,{children:[o(Ue,{open:v,setOpen:u}),o(De,{initialValues:{vehicleNumber:"",material:null,vehicle:null,buyer:null,seller:null,driver_phone:"",trader:null,secondWeight:!1,charges:0,scaleWeight:0,tareWeight:0,paidBy:"other"},validationSchema:()=>K().shape({vehicleNumber:j().required("Required"),material:x.required(),vehicle:x.required(),driver_phone:j().min(8).required(),charges:Y().required(),tareWeight:Oe(c=>c.secondWeight?j().required("Required"):Y())}),onSubmit:async(c,{setSubmitting:C,resetForm:_})=>{var S;u(!0),C(!0);try{const f=kt(),b={...c};c.secondWeight||(b.tareWeight=null);const d=window.location.hostname==="localhost"?"http://localhost:3030/dummy":"https://infraweighcontroller.local:9999",m=await fetch(d).then(l=>l.json()),w=await((S=Be.currentUser)==null?void 0:S.getIdTokenResult()),n=w==null?void 0:w.claims["https://hasura.io/jwt/claims"],I=m.image[0]?await T(W(F,`${n["x-hasura-tenent-id"]}/${n["x-hasura-weighbridge-id"]}/${f}-folder/one.jpeg`),`data:image/jpeg;base64,${m.image[0]}`,"data_url").then(async l=>L(W(F,l.ref.fullPath)).then(N=>N)):null,p=m.image[1]?await T(W(F,`${n["x-hasura-tenent-id"]}/${n["x-hasura-weighbridge-id"]}/${f}-folder/two.jpeg`),`data:image/jpeg;base64,${m.image[1]}`,"data_url").then(async l=>L(W(F,l.ref.fullPath)).then(N=>N)):null,s=m.image[2]?await T(W(F,`${n["x-hasura-tenent-id"]}/${n["x-hasura-weighbridge-id"]}/${f}-folder/three.jpeg`),`data:image/jpeg;base64,${m.image[2]}`,"data_url").then(async l=>L(W(F,l.ref.fullPath)).then(N=>N)):null,$=m.image[3]?await T(W(F,`${n["x-hasura-tenent-id"]}/${n["x-hasura-weighbridge-id"]}/${f}-folder/four.jpeg`),`data:image/jpeg;base64,${m.image[3]}`,"data_url").then(async l=>L(W(F,l.ref.fullPath)).then(N=>N)):null,g=c;await e({variables:{object:{id:f,photos:[I,p,s,$],charges:c.charges,driver_phone:c.driver_phone,vehicle_id:g.vehicle.value,material_id:g.material.value,vehicle_number:c.vehicleNumber,customer_id:g.buyer?g.buyer.value:null,customer_2_id:g.seller?g.seller.value:null,customer_3_id:g.trader?g.trader.value:null,scale_weight:m.weight,tare_weight:c.secondWeight?c.tareWeight:0,second_weight:c.secondWeight,reference_bill_id:c.secondWeight?t:null,paid_by:g.paidBy}}}).then(l=>{var Q;const N=(Q=l==null?void 0:l.data)==null?void 0:Q.insert_bill_one;G(N),i(!0),C(!1),u(!1),Ge.success("Bill Added Successfully"),_()})}catch(f){console.log(JSON.stringify(f)),C(!1),u(!1)}},onReset:()=>{r(null),u(!1)},children:({handleReset:c,handleSubmit:C,errors:_,isSubmitting:S,setFieldValue:f,values:b,handleBlur:d,touched:m,isValid:w})=>R(q,{component:"form",onSubmit:C,onReset:c,sx:{display:"flex",flexDirection:"row"},noValidate:!0,autoComplete:"off",children:[R(q,{sx:{flexDirection:"column",width:"50%",display:"flex",height:"100%"},children:[o(P,{component:V,autoFocus:!0,name:"vehicleNumber",onChange:n=>f("vehicleNumber",n.target.value.replace(" ","").toUpperCase()),label:"vehicle number",sx:{margin:2,width:"90%"}}),o(z,{label:"material",serverName:"material",name:"material",queryHook:Ie}),o(z,{label:"buyer",serverName:"customer",name:"buyer",filterOptions:(n,I)=>{var $,g;let p=n;const s=b;return($=s==null?void 0:s.seller)!=null&&$.value&&(p=p.filter(l=>l.value!==s.seller.value)),(g=s==null?void 0:s.trader)!=null&&g.value&&(p=p.filter(l=>l.value!==s.trader.value)),p},queryHook:U}),o(z,{label:"seller",serverName:"customer",name:"seller",filterOptions:(n,I)=>{var $,g;let p=n;const s=b;return($=s==null?void 0:s.seller)!=null&&$.value&&(p=p.filter(l=>l.value!==s.seller.value)),(g=s==null?void 0:s.buyer)!=null&&g.value&&(p=p.filter(l=>l.value!==s.buyer.value)),p},queryHook:U}),o(z,{label:"trader",serverName:"customer",name:"trader",filterOptions:(n,I)=>{var $,g;let p=n;const s=b;return($=s==null?void 0:s.buyer)!=null&&$.value&&(p=p.filter(l=>l.value!==s.buyer.value)),(g=s==null?void 0:s.seller)!=null&&g.value&&(p=p.filter(l=>l.value!==s.seller.value)),p},queryHook:U}),R(q,{children:[o(J,{children:"second weight or tare weight"}),o(P,{component:Ve,type:"checkbox",name:"secondWeight"})]}),R(q,{sx:{margin:2,width:"90%"},children:[o(J,{children:"paid by"}),o(P,{component:me,row:!0,name:"paidBy",children:[{name:"buyer",show:b.buyer},{name:"seller",show:b.seller},{name:"trader",show:b.trader},{name:"driver",show:!0},{name:"other",show:!0}].map(({name:n,show:I})=>o(gt,{name:n,show:I},n))})]})]}),R(q,{sx:{width:"50%",height:"100%",display:"flex",flexDirection:"column"},children:[b.secondWeight&&R(q,{sx:{m:1,width:"90%",display:"flex"},children:[o(wt,{setLoading:n=>u(n),setWeight:n=>{f("tareWeight",n)},setBillRefId:n=>{r(n)},vehicleNumber:b.vehicleNumber}),o(P,{component:V,label:"Tare weight",InputProps:{endAdornment:o(Pe,{position:"start",children:"kg"})},disabled:!!t,name:"tareWeight",sx:{m:1,width:"50%"}})]}),o(z,{name:"vehicle",label:"vehicle",serverName:"vehicle",queryHook:Ne}),o(Le,{label:"driver phone",variant:"outlined",countryCodeEditable:!1,defaultCountry:"in",onBlur:d,autoComplete:"off",disabled:S,error:!!(m.driver_phone&&_.driver_phone),value:b.driver_phone,onChange:n=>f("driver_phone",n.toString()),name:"driver_phone",sx:{margin:2,width:"90%"}}),o(P,{component:V,name:"charges",type:"number",sx:{margin:2,width:"90%"}}),R(q,{sx:{margin:2,width:"90%",justifyContent:"end",display:"flex"},children:[w&&o(D,{sx:{marginRight:2},type:"submit",variant:"contained",color:"success",children:"ACCEPT"}),o(D,{variant:"contained",type:"reset",color:"error",children:"RESET"})]})]})]})}),o(bt,{data:k,open:a,setOpen:i})]})};export{Pt as default};
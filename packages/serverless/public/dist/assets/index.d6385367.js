import{r as g,ba as B,N as E,l as s,n as e,W as q,K as A,aI as D,bb as $,Z as N,bc as P,bd as H,be as M,aK as O,bf as Q,L as V,bg as j,bh as I}from"./index.4c95a279.js";import{b as U,e as F,F as G,c as L,k as z,f as y,T as x,D as T,G as K}from"./index.3fb97640.js";import{c as f,a as n,M as W}from"./index.a03a43f2.js";import{c as Y}from"./Lazy.211a25ac.js";import{A as v}from"./index.b83c20b3.js";import{B as m,T as Z}from"./TextField.a171345c.js";import{L as R}from"./LinearProgress.8dbc60f0.js";import{c as J}from"./index.ac0a1a76.js";const X=()=>{const[i,c]=g.exports.useState(!1),b=()=>{c(!0)},h=()=>{c(!1)},[w,{loading:C}]=B(),[r,k]=E();return s("div",{children:[e(m,{variant:"outlined",sx:{m:1},onClick:b,children:"NEW STAFF"}),s(U,{fullWidth:!0,open:i,onClose:h,children:[(C||k)&&e(R,{}),e(F,{children:"New User"}),e(G,{initialValues:{name:"",address:"",email:"",phone:"",branch:{label:"",value:null},tenent:{label:"",value:null},role:"terminal"},validationSchema:()=>f().shape({name:n().required("Required"),address:n().required("Required"),email:n().required("Required"),phone:n().required("Required"),branch:f().shape({label:n().required("Required"),value:n().required("Required")}).required(),tenent:Y(()=>r==="admin"&&r!==null?f().shape({label:n().required("Required"),value:n().required("Required")}).required("Required"):f().notRequired())}),onSubmit:async(a,{setSubmitting:l})=>{l(!0);let t={};console.log(r),r!=="admin"?t={email:a.email,weighbridge_id:a.branch.value,profile:{name:a.name,phone:a.phone,address:a.address},role:"terminal"}:t={tenent_id:a.tenent.value,email:a.email,weighbridge_id:a.branch.value,profile:{name:a.name,phone:a.phone,address:a.address},role:"tenantAdmin"},console.log(t),w({variables:{objects:[t]}}).then(()=>{q.success("user created successfully exist"),l(!1),h()}).catch(()=>{q.error("user already exist"),h(),l(!1)})},children:({submitForm:a,isSubmitting:l,setFieldValue:t,values:d})=>{var o;return s(A,{children:[e(L,{children:e(z,{children:s(D,{sx:{display:"flex",flexDirection:"column"},children:[e(y,{component:x,sx:{my:1},name:"name",type:"text",label:"name"}),e(y,{component:x,sx:{my:1},name:"address",type:"text",label:"address"}),e(y,{component:x,type:"email",label:"email",name:"email",sx:{my:1}}),e(W,{label:"phone",variant:"outlined",sx:{my:1},defaultCountry:"in",onChange:u=>t("phone",u.toString())}),r==="admin"&&r!==null?s(A,{children:[e(v,{sx:{mt:1,width:"100%"},name:"tenent",label:"teneant",serverName:"tenents",queryHook:$}),((o=d==null?void 0:d.tenent)==null?void 0:o.value)&&e(v,{sx:{mt:2,width:"100%"},name:"branch",label:"branch",queryVariables:{where:{tenent_id:{_eq:d.tenent.value}}},serverName:"weighbridge",queryHook:N})]}):e(v,{sx:{mt:2,width:"100%"},name:"branch",label:"branch",serverName:"weighbridge",queryHook:N}),l&&e(R,{})]})})}),s(T,{children:[e(m,{onClick:h,children:"Cancel"}),e(m,{onClick:()=>{a()},children:"Add"})]})]})}})]})]})},ee=({id:i})=>{var t,d;const[c,b]=g.exports.useState(!1),[h,{loading:w}]=P(),[C,{data:r,loading:k}]=H({variables:{where:{id:{_eq:i}}}}),a=async()=>{await C(),b(!0)},l=()=>{b(!1)};return s(A,{children:[e(m,{variant:"contained",color:"secondary",size:"small",onClick:a,children:"Edit"}),s(U,{fullWidth:!0,open:c,onClose:l,children:[e(F,{children:"Edit user"}),e(G,{initialValues:{name:(r==null?void 0:r.user[0].profile.name)||"",address:(r==null?void 0:r.user[0].profile.address)||"",email:(r==null?void 0:r.user[0].email)||"",phone:(r==null?void 0:r.user[0].profile.phone)||"",branch:{label:`${(t=r==null?void 0:r.user[0].weighbridge)==null?void 0:t.name} - ${(d=r==null?void 0:r.user[0].weighbridge)==null?void 0:d.address}`||"",value:(r==null?void 0:r.user[0].weighbridge_id)||""}},validationSchema:()=>f().shape({name:n().required("Required"),address:n().required("Required"),phone:n().required("Required"),branch:f().shape({label:n().required("Required"),value:n().required("Required")}).required()}),onSubmit:async(o,{setSubmitting:u})=>{u(!0),h({variables:{where:{id:{_eq:i}},set:{weighbridge_id:o.branch.value,profile:{name:o.name,phone:o.phone,address:o.address}}}}).then(p=>p&&q.success("user updated successfully")).catch(()=>q.error("user already exist")),u(!0),l()},children:({submitForm:o,isSubmitting:u,setFieldValue:p,values:S})=>s(A,{children:[e(L,{children:e(z,{children:s(D,{sx:{display:"flex",flexDirection:"column"},children:[e(y,{component:x,sx:{my:1},name:"name",type:"text",label:"name"}),e(y,{component:x,sx:{my:1},name:"address",type:"text",label:"address"}),e(y,{component:x,disabled:!0,type:"email",label:"email",name:"email",sx:{my:1}}),e(W,{label:"phone",value:S.phone,variant:"outlined",sx:{my:1},defaultCountry:"in",onChange:_=>p("phone",_.toString())}),e(v,{name:"branch",queryHook:M,serverName:"weighbridge",label:"weighbridge"}),(u||w||k)&&e(R,{})]})})}),s(T,{children:[e(m,{onClick:l,children:"Cancel"}),e(m,{onClick:()=>{o()},children:"Add"})]})]})})]})]})},re=[{field:"email",headerName:"Email Address",sortable:!0,filterable:!1,width:400},{field:"weighbridge",headerName:"weighbridge",sortable:!1,filterable:!1,width:400,valueGetter:i=>i.row.weighbridge.name},{field:"edit",headerName:"Edit",width:75,sortable:!1,filterable:!1,renderCell:i=>e(ee,{id:i.row.id})},{field:"delete",headerName:"Delete",width:75,sortable:!1,filterable:!1,renderCell:i=>e(m,{variant:"contained",color:"error",size:"small",onClick:()=>{J({title:"Confirm to Delete",message:"Are you sure want to delete this.",buttons:[{label:"Yes",onClick:()=>{O.mutate({mutation:Q,variables:{deleteUserByPkId:i.row.id}}).catch(c=>q.error("relations exists remove the related resources to delete this resource")).then(c=>{c&&q.success("user deleted successfully")})}},{label:"No",onClick:()=>null}]})},children:"Delete"})}],ce=()=>{var u,p,S;const[i,c]=g.exports.useState([]),[b,h]=g.exports.useState(""),[w,C]=g.exports.useState(1),[r,k]=g.exports.useState(10),a={_and:[{_not:{email:{_eq:(u=V.currentUser)==null?void 0:u.email}}},{_or:[{email:{_like:`%${b}%`}}]}]},{data:l,loading:t}=j({variables:{orderBy:i,where:a,offset:(w-1)*r,limit:r}}),{data:d,loading:o}=I({variables:{orderBy:i,where:a}});return s(D,{children:[e(X,{}),e(Z,{fullWidth:!0,onChange:_=>{h(_.target.value)},sx:{width:"90%",my:2},name:"search",label:"Search"}),s(D,{height:500,width:"100%",textAlign:"center",children:[e(R,{sx:{visibility:o||t?"visible":"hidden"}}),e(K,{loading:t||o,data:(l==null?void 0:l.user)||[],pageSize:r,setPage:C,setFilter:()=>null,setPageSize:k,setSort:c,columns:re,rowCount:((S=(p=d==null?void 0:d.user_aggregate)==null?void 0:p.aggregate)==null?void 0:S.count)||0})]})]})};export{ce as default};
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[612],{10238:(e,n,i)=>{var a=i(14859);n.Z=void 0;var l=a(i(68671)),s=i(52322),t=(0,l.default)((0,s.jsx)("path",{d:"M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"}),"Dns");n.Z=t},42872:(e,n,i)=>{var a=i(14859);n.Z=void 0;var l=a(i(68671)),s=i(52322),t=(0,l.default)((0,s.jsx)("path",{d:"M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"}),"Domain");n.Z=t},94612:(e,n,i)=>{i.r(n),i.d(n,{default:()=>ce});var a=i(2784),l=i(32806),s=i(69740),t=i(27591),r=i(73786),d=i(95995),o=i(74760),c=i(18281),h=i(20268),u=i(43663),m=i(5919),x=i(42872),p=i(34766),g=i(42603),v=i(49001),j=i(28319),b=i(22082),y=i(42981),w=i(8664),Z=i(2533),f=i(81010),_=i(90288),C=i(10238),q=i(52322);const k=240,P=[{name:"Logout",exec:()=>{f.I8.signOut(),window.location.reload()}}],S=e=>({width:k,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen}),overflowX:"hidden"}),N=e=>({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:`calc(${e.spacing(7)} + 1px)`,[e.breakpoints.up("sm")]:{width:`calc(${e.spacing(8)} + 1px)`}}),R=(0,s.zo)("div")((({theme:e})=>Object.assign({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:e.spacing(0,1)},e.mixins.toolbar))),z=(0,s.zo)(d.ZP,{shouldForwardProp:e=>"open"!==e})((({theme:e,open:n})=>Object.assign({zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},n&&{marginLeft:k,width:"calc(100% - 240px)",transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})}))),F=(0,s.zo)(r.ZP,{shouldForwardProp:e=>"open"!==e})((({theme:e,open:n})=>Object.assign({width:k,flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box"},n&&Object.assign({},S(e),{"& .MuiDrawer-paper":S(e)}),!n&&Object.assign({},N(e),{"& .MuiDrawer-paper":N(e)})))),E=({children:e})=>{var n,i;const[r,d]=(0,a.useState)(null),k=(0,l.s0)(),S=(0,s.Fg)(),[N,E]=a.useState(!1),O=[{name:"clients",path:"/",icon:_.Z,active:(0,l.bS)("/")},{name:"weighbridges",path:"/weighbridges",icon:x.Z,active:(0,l.bS)("/weighbridges")},{name:"users",path:"/users",icon:C.Z,active:(0,l.bS)("/users")}];return(0,q.jsxs)(t.Z,{sx:{display:"flex"},children:[(0,q.jsx)(h.Z,{}),(0,q.jsx)(z,{position:"fixed",open:N,children:(0,q.jsxs)(o.ZP,{children:[(0,q.jsx)(p.default,{color:"inherit","aria-label":"open drawer",onClick:()=>{E(!0)},edge:"start",sx:Object.assign({marginRight:5},N&&{display:"none"}),children:(0,q.jsx)(g.Z,{})}),(0,q.jsx)(u.ZP,{variant:"h6",noWrap:!0,component:"div",children:"INFRA WEIGH"}),(0,q.jsxs)(t.Z,{sx:{marginLeft:"auto",flexGrow:0},children:[(0,q.jsx)(Z.v2r,{sx:{mt:"45px"},anchorEl:r,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:Boolean(r),onClose:()=>{d(null)},children:P.map((e=>(0,q.jsx)(Z.sNh,{onClick:e.exec,children:(0,q.jsx)(u.ZP,{textAlign:"center",children:e.name})},e.name)))}),(0,q.jsx)(Z.ua7,{title:(null==(n=f.I8.currentUser)?void 0:n.displayName)+"",children:(0,q.jsx)(p.default,{onClick:e=>{d(e.currentTarget)},sx:{p:0},children:(0,q.jsx)(Z.qEK,{src:(null==f.I8||null==(i=f.I8.currentUser)?void 0:i.photoURL)+""})})})]})]})}),(0,q.jsxs)(F,{variant:"permanent",open:N,children:[(0,q.jsx)(R,{children:(0,q.jsx)(p.default,{onClick:()=>{E(!1)},children:"rtl"===S.direction?(0,q.jsx)(j.Z,{}):(0,q.jsx)(v.Z,{})})}),(0,q.jsx)(m.default,{}),(0,q.jsx)(c.ZP,{children:O.map(((e,n)=>(0,q.jsxs)(b.ZP,{onClick:()=>k(e.path),sx:{":hover":{backgroundColor:e.active?"slategray":"whitesmoke"},backgroundColor:e.active?"gray":"inherit",backgroundOpacity:50,margin:1,borderRadius:"5px",minHeight:48,justifyContent:N?"initial":"center",px:2.5},children:[(0,q.jsx)(y.ZP,{sx:{minWidth:0,mr:N?3:"auto",justifyContent:"center"},children:(0,q.jsx)(e.icon,{htmlColor:e.active?"white":"gray"})}),(0,q.jsx)(w.ZP,{primary:e.name,sx:{color:e.active?"white":"inherit",opacity:N?1:0}})]},n)))})]}),(0,q.jsx)(t.Z,{component:"main",sx:{flexGrow:1,p:3,mt:7},children:e})]})};var O=i(28865),V=i(6389),A=(i(51294),i(7512)),W=i(48266),D=i(44324),I=i(29438),H=i(62455),B=i(19055),$=i(83703),M=i(65413),G=i(47622),J=i.n(G),U=i(44101),L=i(70868);const X=({id:e})=>{var n,i,l,s,t,r;const[d,o]=a.useState(!1),[c,{data:h}]=(0,U.SH)({variables:{tenentsByPkId:e}}),u=()=>{o(!1)};return(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(A.ZP,{variant:"contained",color:"secondary",size:"small",onClick:async()=>{await c(),o(!0)},children:"Edit"}),(0,q.jsxs)(W.ZP,{fullWidth:!0,open:d,onClose:u,children:[(0,q.jsx)(H.ZP,{children:"Edit Request"}),(0,q.jsx)(B.J9,{initialValues:{name:null==h||null==(n=h.tenents_by_pk)?void 0:n.name,address:(null==h||null==(i=h.tenents_by_pk)||null==(l=i.metadata)?void 0:l.address)||"",email:null==h||null==(s=h.tenents_by_pk)?void 0:s.email,phone:null==h||null==(t=h.tenents_by_pk)?void 0:t.phone,active:null==h||null==(r=h.tenents_by_pk)?void 0:r.activate},validationSchema:()=>M.Ry().shape({name:M.Z_().required("Required"),address:M.Z_().required("Required"),email:M.Z_().required("Required"),phone:M.Z_().required("Required"),active:M.Xg().required("required")}),onSubmit:async(n,{setSubmitting:i})=>{i(!0),console.log(e),await L.B.mutate({mutation:U.S6,variables:{pkColumns:{id:e},set:{name:n.name,email:n.email,phone:n.phone,metadata:{address:n.address},activate:n.active}}}).catch((()=>{alert("realted resourses exists delete those resource to continue")})),i(!0),u()},children:({submitForm:e,isSubmitting:n,setFieldValue:i,setSubmitting:a,values:l})=>(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(I.ZP,{children:(0,q.jsx)(B.l0,{children:(0,q.jsxs)(V.xu,{sx:{display:"flex",flexDirection:"column"},children:[(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"name",type:"text",label:"name"}),(0,q.jsx)(B.gN,{component:$.nv,type:"email",label:"email",name:"email",sx:{my:1}}),(0,q.jsx)(B.gN,{component:$.nv,type:"text",label:"address",name:"address",sx:{my:1}}),(0,q.jsx)(B.gN,{component:$.rs,type:"checkbox",label:"active",name:"active",sx:{my:1}}),(0,q.jsx)(J(),{label:"phone",variant:"outlined",value:l.phone,countryCodeEditable:!1,sx:{my:1},defaultCountry:"in",onChange:e=>i("phone",e.toString())}),n&&(0,q.jsx)(Z.ukE,{})]})})}),(0,q.jsxs)(D.ZP,{children:[(0,q.jsx)(A.ZP,{onClick:u,children:"Cancel"}),(0,q.jsx)(A.ZP,{onClick:()=>{e().then((()=>{a(!1)}))},children:"Add"})]})]})})]})]})};var T=i(35594);const Y=()=>{const[e,n]=a.useState(!1),i=()=>{n(!1)},[l,{loading:s}]=(0,U.Eq)();return(0,q.jsxs)("div",{children:[(0,q.jsx)(T.Z,{open:s,setOpen:()=>null}),(0,q.jsx)(A.ZP,{variant:"outlined",sx:{m:1},onClick:()=>{n(!0)},children:"new client"}),(0,q.jsxs)(W.ZP,{fullWidth:!0,open:e,onClose:i,children:[(0,q.jsx)(H.ZP,{children:"New Client"}),(0,q.jsx)(B.J9,{initialValues:{name:"",address:"",email:"",phone:"",activate:!0},validationSchema:()=>M.Ry().shape({name:M.Z_().required("Required"),address:M.Z_().required("Required"),email:M.Z_().required("Required"),phone:M.Z_().required("Required"),activate:M.O7().required("Required")}),onSubmit:async(e,{setSubmitting:n})=>{n(!0),l({variables:{object:{name:e.name,email:e.email,phone:e.phone,activate:e.activate,metadata:{address:e.address}}}}).catch((()=>{alert("can not create new client"),n(!1)})),n(!1),i()},children:({submitForm:e,isSubmitting:n,setFieldValue:a})=>(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(I.ZP,{children:(0,q.jsx)(B.l0,{children:(0,q.jsxs)(V.xu,{sx:{display:"flex",flexDirection:"column"},children:[(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"name",type:"text",label:"name"}),(0,q.jsxs)(V.xu,{children:[(0,q.jsx)(Z.lXp,{children:"activate facility"}),(0,q.jsx)(B.gN,{component:$.rs,type:"checkbox",name:"activate"})]}),(0,q.jsx)(B.gN,{component:$.nv,type:"text",label:"address",name:"address",sx:{my:1}}),(0,q.jsx)(B.gN,{component:$.nv,type:"email",label:"email",name:"email",sx:{my:1}}),(0,q.jsx)(J(),{label:"phone",variant:"outlined",countryCodeEditable:!1,sx:{my:1},defaultCountry:"in",onChange:e=>a("phone",e.toString())}),n&&(0,q.jsx)(Z.ukE,{})]})})}),(0,q.jsxs)(D.ZP,{children:[(0,q.jsx)(A.ZP,{onClick:i,children:"Cancel"}),(0,q.jsx)(A.ZP,{onClick:()=>{e().then((()=>null))},children:"Add"})]})]})})]})]})},K=[{field:"name",headerName:"name",width:300,editable:!1,sortable:!0},{field:"email",headerName:"e-mail id",sortable:!1,width:400},{field:"phone",headerName:"phone",sortable:!1,width:150},{field:"activate",headerName:"active",sortable:!1,width:150,valueGetter:e=>e.value?"active":"in-active"},{field:"edit",headerName:"Edit",width:130,sortable:!1,filterable:!1,renderCell:e=>(0,q.jsx)(X,{id:e.row.id})}],Q=()=>{const{data:e,loading:n}=(0,U.bF)();return(0,a.useEffect)((()=>{console.log(e)}),[e,n]),(0,q.jsxs)(V.xu,{children:[(0,q.jsx)(Y,{}),(0,q.jsx)(V.xu,{height:500,width:"100%",textAlign:"center",children:(0,q.jsx)(O._$r,{loading:n,rows:(null==e?void 0:e.tenents)||[],columns:K,autoPageSize:!0,checkboxSelection:!0,disableSelectionOnClick:!0})})]})};function ee(){const[e,n]=a.useState(!1),[i,{loading:l}]=(0,U.s3)(),{data:s}=(0,U.EX)(),t=()=>{n(!1)};return(0,q.jsxs)("div",{children:[(0,q.jsx)(T.Z,{open:l,setOpen:()=>null}),(0,q.jsx)(A.ZP,{variant:"outlined",sx:{m:1},onClick:()=>{n(!0)},children:"new WeighBridge"}),(0,q.jsxs)(W.ZP,{fullWidth:!0,open:e,onClose:t,children:[(0,q.jsx)(H.ZP,{children:"New WeighBridge"}),(0,q.jsx)(B.J9,{initialValues:{name:"",address:"",display_name:"",pin_code:"",phone:"",mail:"",tenent:{label:"",value:null}},validationSchema:()=>M.Ry().shape({name:M.Z_().required("Required"),address:M.Z_().required("Required"),display_name:M.Z_().required("Required"),pin_code:M.Z_().required("Required"),phone:M.Z_().required("Required"),mail:M.Z_().required("Required"),tenent:M.Ry().shape({label:M.Z_().required("Required"),value:M.Z_().required("Required")}).required()}),onSubmit:async(e,{setSubmitting:n})=>{n(!0),await i({variables:{object:{tenent_id:e.tenent.value,address:e.address,display_name:e.display_name,pin_code:e.pin_code,name:e.name,phone:e.phone,mail:e.mail}}}),n(!0),t()},children:({submitForm:e,isSubmitting:n,setFieldValue:i})=>(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(I.ZP,{children:(0,q.jsx)(B.l0,{children:(0,q.jsxs)(V.xu,{sx:{display:"flex",flexDirection:"column"},children:[(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"name",type:"text",label:"name"}),(0,q.jsx)(B.gN,{component:$.nv,type:"text",label:"address",name:"address",sx:{my:1}}),(0,q.jsx)(B.gN,{component:$.nv,type:"text",label:"pin code",name:"pin_code",sx:{my:1}}),(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"display_name",type:"text",label:"display name"}),(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"mail",type:"email",label:"mail"}),(0,q.jsx)(J(),{label:"phone",variant:"outlined",sx:{my:1},defaultCountry:"in",onChange:e=>i("phone",e.toString())}),(0,q.jsx)(B.gN,{component:$.F2,disablePortal:!0,sx:{my:1,mb:3},name:"tenent",options:(null==s?void 0:s.tenents)||[],renderInput:e=>(0,q.jsx)(Z.nvn,Object.assign({},e,{label:"tenent"}))}),n&&(0,q.jsx)(Z.ukE,{})]})})}),(0,q.jsxs)(D.ZP,{children:[(0,q.jsx)(A.ZP,{onClick:t,children:"Cancel"}),(0,q.jsx)(A.ZP,{onClick:e,children:"Add"})]})]})})]})]})}var ne=i(5713);const ie=({id:e})=>{const[n,i]=a.useState(!1),[l,{loading:s}]=(0,U.PO)(),[t,{data:r,loading:d}]=(0,U.Pg)({variables:{where:{id:{_eq:e}}}}),o=()=>{i(!1)};return(0,q.jsxs)("div",{children:[(0,q.jsx)(T.Z,{open:s||d,setOpen:()=>null}),(0,q.jsx)(A.ZP,{variant:"contained",color:"secondary",size:"small",onClick:async()=>{await t(),i(!0)},children:"Edit"}),(0,q.jsxs)(W.ZP,{fullWidth:!0,open:n,onClose:o,children:[(0,q.jsx)(H.ZP,{children:"Edit WeighBridge"}),(0,q.jsx)(B.J9,{initialValues:{name:(null==r?void 0:r.weighbridge[0].name)||"",address:(null==r?void 0:r.weighbridge[0].address)||"",display_name:(null==r?void 0:r.weighbridge[0].display_name)||"",pin_code:(null==r?void 0:r.weighbridge[0].pin_code)||"",phone:(null==r?void 0:r.weighbridge[0].phone)||"",mail:(null==r?void 0:r.weighbridge[0].mail)||""},validationSchema:()=>M.Ry().shape({name:M.Z_().required("Required"),address:M.Z_().required("Required"),display_name:M.Z_().required("Required"),pin_code:M.Z_().required("Required"),phone:M.Z_().required("Required"),mail:M.Z_().required("Required")}),onSubmit:async(n,{setSubmitting:i})=>{i(!0),l({variables:{pkColumns:{id:e},_set:{address:n.address,display_name:n.display_name,pin_code:n.pin_code,name:n.name,phone:n.phone,mail:n.mail}}}),i(!0),o()},children:({submitForm:e,isSubmitting:n,setFieldValue:i})=>(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(I.ZP,{children:(0,q.jsx)(B.l0,{children:(0,q.jsxs)(V.xu,{sx:{display:"flex",flexDirection:"column"},children:[(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"name",type:"text",label:"name"}),(0,q.jsx)(B.gN,{component:$.nv,type:"text",label:"address",name:"address",sx:{my:1}}),(0,q.jsx)(B.gN,{component:$.nv,type:"text",label:"pin code",name:"pin_code",sx:{my:1}}),(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"display_name",type:"text",label:"display name"}),(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"mail",type:"email",label:"mail"}),(0,q.jsx)(J(),{label:"phone",value:null==r?void 0:r.weighbridge[0].phone,variant:"outlined",sx:{my:1},defaultCountry:"in",onChange:e=>i("phone",e.toString())}),(s||d)&&(0,q.jsx)(Z.ukE,{}),n&&(0,q.jsx)(Z.ukE,{})]})})}),(0,q.jsxs)(D.ZP,{children:[(0,q.jsx)(A.ZP,{onClick:o,children:"Cancel"}),(0,q.jsx)(A.ZP,{onClick:e,children:"confirm"})]})]})})]})]})},ae=[{field:"name",headerName:"name",width:150},{field:"address",headerName:"Address",width:300},{field:"display_name",headerName:"display name",width:300},{field:"phone",headerName:"phone",width:150},{field:"mail",headerName:"mail",width:180},{field:"edit",headerName:"Edit",width:75,sortable:!1,filterable:!1,renderCell:e=>(0,q.jsx)(ie,{id:e.row.id})},{field:"delete",headerName:"Delete",width:75,sortable:!1,filterable:!1,renderCell:e=>(0,q.jsx)(Z.zxk,{variant:"contained",color:"error",size:"small",onClick:()=>{(0,ne._1)({title:"Confirm to Delete",message:"Are you sure want to delete this.",buttons:[{label:"Yes",onClick:async()=>{L.B.mutate({mutation:U.pq,variables:{where:{id:{_eq:e.row.id}}}}).catch((()=>{alert("relation exists so remove the related resources to delete this resource !")}))}},{label:"No",onClick:()=>null}]})},children:"Delete"})},{field:"info",headerName:"Info",width:75,sortable:!1,filterable:!1,renderCell:e=>(0,q.jsx)(Z.zxk,{variant:"contained",color:"info",size:"small",onClick:()=>{alert(`Edit ${e.row.id}`)},children:"Info"})}],le=()=>{var e;const[n,i]=a.useState(""),[l,s]=a.useState(1),[t,r]=a.useState(10),{data:d,loading:o}=(0,U.lx)({variables:{where:{_or:[{display_name:{_ilike:`%${n}%`}},{name:{_ilike:`%${n}%`}}]},offset:(l-1)*t<0?0:(l-1)*t,limit:t}}),{data:c,loading:h}=(0,U.Bf)({variables:{where:{_or:[{display_name:{_ilike:`%${n}%`}},{name:{_ilike:`%${n}%`}}]}}});return(0,q.jsxs)(V.xu,{children:[(0,q.jsx)(ee,{}),(0,q.jsx)(Z.nvn,{fullWidth:!0,onChange:e=>{i(e.target.value)},sx:{width:"90%",my:2},name:"search",label:"Search"}),(0,q.jsx)(Z.ukE,{sx:{visibility:h||o?"visible":"hidden"}}),(0,q.jsx)(V.xu,{height:500,width:"100%",textAlign:"center",children:!h&&(0,q.jsx)(O._$r,{loading:o,rows:(null==d?void 0:d.weighbridge)||[],paginationMode:"server",columns:ae,onPageChange:e=>s(e),onPageSizeChange:e=>r(e),autoPageSize:!0,rowCount:null==c||null==(e=c.weighbridge_aggregate.aggregate)?void 0:e.count,checkboxSelection:!0,disableSelectionOnClick:!0})})]})};var se=i(95771);const te=()=>{const[e,n]=a.useState(!1),{data:i,loading:l}=(0,U._G)(),s=()=>{n(!1)},[t,{loading:r}]=(0,U.Vh)();return(0,q.jsxs)("div",{children:[(0,q.jsx)(T.Z,{open:r||l,setOpen:()=>null}),(0,q.jsx)(A.ZP,{variant:"outlined",sx:{m:1},onClick:()=>{n(!0)},children:"NEW STAFF"}),(0,q.jsxs)(W.ZP,{fullWidth:!0,open:e,onClose:s,children:[(0,q.jsx)(H.ZP,{children:"New User"}),(0,q.jsx)(B.J9,{initialValues:{name:"",password:"",address:"",email:"",phone:"",branch:{label:"",value:null},role:"terminal"},validationSchema:()=>M.Ry().shape({name:M.Z_().required("Required"),password:M.Z_().required("Required"),address:M.Z_().required("Required"),email:M.Z_().required("Required"),phone:M.Z_().required("Required"),branch:M.Ry().shape({label:M.Z_().required("Required"),value:M.Z_().required("Required")}).required()}),onSubmit:async(e,{setSubmitting:n})=>{n(!0),t({variables:{objects:[{email:e.email,password:e.password,weighbridge_id:e.branch.value,tenent_id:null==i?void 0:i.weighbridge.filter((n=>n.value===e.branch.value))[0].tenent_id,profile:{name:e.name,phone:e.phone,address:e.address},role:"tenantAdmin"}]}}).then((()=>n(!1))).catch((()=>{alert("user already exist"),n(!1)})),s()},children:({submitForm:e,isSubmitting:n,setFieldValue:a,values:l})=>(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(I.ZP,{children:(0,q.jsx)(B.l0,{children:(0,q.jsxs)(V.xu,{sx:{display:"flex",flexDirection:"column"},children:[(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"name",type:"text",label:"name"}),(0,q.jsx)(B.gN,{component:$.nv,type:"password",label:"password",name:"password",sx:{my:1}}),(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"address",type:"text",label:"address"}),(0,q.jsx)(B.gN,{component:$.nv,type:"email",label:"email",name:"email",sx:{my:1}}),(0,q.jsx)(J(),{label:"phone",variant:"outlined",sx:{my:1},defaultCountry:"in",onChange:e=>a("phone",e.toString())}),(0,q.jsx)(B.gN,{component:$.F2,disablePortal:!0,sx:{my:1,mb:3},name:"branch",options:(null==i?void 0:i.weighbridge)||[],renderInput:e=>(0,q.jsx)(se.default,Object.assign({},e,{label:"Branch"}))}),n&&(0,q.jsx)(Z.ukE,{})]})})}),(0,q.jsxs)(D.ZP,{children:[(0,q.jsx)(A.ZP,{onClick:s,children:"Cancel"}),(0,q.jsx)(A.ZP,{onClick:()=>{e()},children:"Add"})]})]})})]})]})},re=({id:e})=>{var n,i;const[l,s]=a.useState(!1),{data:t}=(0,U.PC)(),[r,{loading:d}]=(0,U.kD)(),[o,{data:c,loading:h}]=(0,U.FL)({variables:{where:{id:{_eq:e}}}}),u=()=>{s(!1)};return(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(T.Z,{open:d||h,setOpen:()=>null}),(0,q.jsx)(A.ZP,{variant:"contained",color:"secondary",size:"small",onClick:async()=>{await o(),s(!0)},children:"Edit"}),(0,q.jsxs)(W.ZP,{fullWidth:!0,open:l,onClose:u,children:[(0,q.jsx)(H.ZP,{children:"Edit user"}),(0,q.jsx)(B.J9,{initialValues:{name:(null==c?void 0:c.user[0].profile.name)||"",address:(null==c?void 0:c.user[0].profile.address)||"",password:"*****************",email:(null==c?void 0:c.user[0].email)||"",phone:(null==c?void 0:c.user[0].profile.phone)||"",branch:{label:`${null==c||null==(n=c.user[0].weighbridge)?void 0:n.name} - ${null==c||null==(i=c.user[0].weighbridge)?void 0:i.address}`||"",value:(null==c?void 0:c.user[0].weighbridge_id)||""}},validationSchema:()=>M.Ry().shape({name:M.Z_().required("Required"),address:M.Z_().required("Required"),phone:M.Z_().required("Required"),branch:M.Ry().shape({label:M.Z_().required("Required"),value:M.Z_().required("Required")}).required()}),onSubmit:async(n,{setSubmitting:i})=>{i(!0),r({variables:{where:{id:{_eq:e}},set:{weighbridge_id:n.branch.value,profile:{name:n.name,phone:n.phone,address:n.address}}}}).catch((()=>alert("user already exist"))),i(!0),u()},children:({submitForm:e,isSubmitting:n,setFieldValue:i,values:a})=>(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(I.ZP,{children:(0,q.jsx)(B.l0,{children:(0,q.jsxs)(V.xu,{sx:{display:"flex",flexDirection:"column"},children:[(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"name",type:"text",label:"name"}),(0,q.jsx)(B.gN,{component:$.nv,disabled:!0,type:"password",label:"password",name:"password",sx:{my:1}}),(0,q.jsx)(B.gN,{component:$.nv,sx:{my:1},name:"address",type:"text",label:"address"}),(0,q.jsx)(B.gN,{component:$.nv,disabled:!0,type:"email",label:"email",name:"email",sx:{my:1}}),(0,q.jsx)(J(),{label:"phone",value:a.phone,variant:"outlined",sx:{my:1},defaultCountry:"in",onChange:e=>i("phone",e.toString())}),(0,q.jsx)(B.gN,{component:$.F2,disablePortal:!0,sx:{my:1,mb:3},name:"branch",options:(null==t?void 0:t.weighbridge.map((e=>({label:e.name+" - "+e.address,value:e.id}))))||[],renderInput:e=>(0,q.jsx)(se.default,Object.assign({},e,{label:"Branch"}))}),n&&(0,q.jsx)(Z.ukE,{})]})})}),(0,q.jsxs)(D.ZP,{children:[(0,q.jsx)(A.ZP,{onClick:u,children:"Cancel"}),(0,q.jsx)(A.ZP,{onClick:()=>{e()},children:"Add"})]})]})})]})]})},de=[{field:"email",headerName:"Email Address",sortable:!1,width:400},{field:"weighbridge",headerName:"weighbridge",sortable:!1,width:400,valueGetter:e=>e.row.weighbridge.name},{field:"edit",headerName:"Edit",width:75,sortable:!1,filterable:!1,renderCell:e=>(0,q.jsx)(re,{id:e.row.id})},{field:"delete",headerName:"Delete",width:75,sortable:!1,filterable:!1,renderCell:e=>(0,q.jsx)(Z.zxk,{variant:"contained",color:"error",size:"small",onClick:()=>{(0,ne._1)({title:"Confirm to Delete",message:"Are you sure want to delete this.",buttons:[{label:"Yes",onClick:()=>{L.B.mutate({mutation:U.sm,variables:{deleteUserByPkId:e.row.id}}).catch((e=>alert("relations exists remove the related resources to delete this resource")))}},{label:"No",onClick:()=>null}]})},children:"Delete"})}],oe=()=>{var e,n;const[i,l]=a.useState(0),[s,t]=a.useState(10),{data:r,loading:d}=(0,U.WO)({variables:{offset:(i-1)*s<0?0:(i-1)*s,limit:s}}),{data:o,loading:c}=(0,U.U4)();return(0,q.jsxs)(V.xu,{children:[(0,q.jsx)(te,{}),(0,q.jsxs)(V.xu,{height:500,width:"100%",textAlign:"center",children:[(0,q.jsx)(Z.ukE,{sx:{visibility:d||c?"visible":"hidden"}}),!d&&!c&&(0,q.jsx)(O._$r,{paginationMode:"server",onPageChange:e=>l(e),onPageSizeChange:e=>t(e),disableColumnFilter:!0,rowCount:null==o||null==(e=o.user_aggregate)||null==(n=e.aggregate)?void 0:n.count,disableSelectionOnClick:!0,loading:d,rows:(null==r?void 0:r.user)||[],columns:de,autoPageSize:!0})]})]})},ce=()=>(0,q.jsx)(E,{children:(0,q.jsxs)(l.Z5,{children:[(0,q.jsx)(l.AW,{path:"/",element:(0,q.jsx)(Q,{})}),(0,q.jsx)(l.AW,{path:"/weighbridges",element:(0,q.jsx)(le,{})}),(0,q.jsx)(l.AW,{path:"/users",element:(0,q.jsx)(oe,{})})]})})}}]);
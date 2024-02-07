import{_ as S,a as g,r as d,o as c,c as p,b as e,d as h,v as m,h as C,f as u,g as r,k as N,e as v,u as b,F as V,s as B,t as f,p as M,i as P,l as x}from"./index-adea1279.js";import{l as a}from"./index-40db06c7.js";g.defaults.headers.common.authorization=localStorage.getItem("token");const H={data(){return{loading:!0,dialog:!1,orderStatus:null,dataList:[],dataListLength:0,page:1,itemsPerPage:6,search:"",headers:[{align:"center",key:"order_code",title:"Order Code"},{key:"receiverName",title:"Người nhận",align:"center"},{key:"fee",title:"Chi phí",align:"center"},{key:"receiver_fee",title:"Phí người nhận trả",align:"center"},{key:"status",title:"Trạng thái đơn hàng",align:"center",value:"status"},{title:"Cập nhật",sortable:!1,align:"center",text:"Xác nhận",value:"update"},{title:"Chi tiết",sortable:!1,align:"center",text:"Chi tiết",value:"action"}]}},computed:{pageCount(){return Math.ceil(this.dataListLength/this.itemsPerPage)}},async created(){let s="http://localhost:3000/api/workplace/coming/receive";await g.post(s,{headers:{authorization:localStorage.getItem("token")}}).then(t=>{console.log(t.data),this.dataList=t.data.result,this.dataListLength=t.data.count,this.loading=!1}).catch(t=>{console.log(t),a.error("???",{position:a.POSITION.BOTTOM_RIGHT})})},methods:{deleteOrder(s){this.loading=!0;let t="http://localhost:3000/api/orders/delete/"+s;g.delete(t).then(i=>{console.log(i.data),console.log("delete"),this.getList(),this.loading=!0,a.success("Deleted successfully",{position:a.POSITION.BOTTOM_RIGHT})}).catch(i=>{console.log(i),a.error("Delete failed",{position:a.POSITION.BOTTOM_RIGHT})})},verifyOrder(s){let t="http://localhost:3000/api/workplace/confirm/receive/"+s;g.put(t).then(i=>{console.log(i.data),this.loading=!0,this.getList(),a.success("Successfully Updated",{position:a.POSITION.BOTTOM_RIGHT})}).catch(i=>{console.log(i),a.error("Update failed",{position:a.POSITION.BOTTOM_RIGHT})})},getList(){let s="http://localhost:3000/api/workplace/coming/receive";g.post(s).then(t=>{console.log(t.data),this.dataList=t.data.result,this.dataListLength=t.data.count,this.loading=!1}).catch(t=>{console.log(t),a.error("SOS",{position:a.POSITION.BOTTOM_RIGHT})})}}},l=s=>(M("data-v-b01d627f"),s=s(),P(),s),D={class:"container"},U=l(()=>e("h1",{class:"loginHeader"},"Xác nhận đơn hàng đến",-1)),R={class:"buttonList"},z={class:"search-bar"},A=l(()=>e("button",{type:"submit"},[e("img",{src:x})],-1)),G=l(()=>e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6 icon"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"})],-1)),j=l(()=>e("div",{class:"popupHeader"},"Bộ lọc",-1)),F={class:"input-container"},E=l(()=>e("label",{for:"inputState"},"Trạng thái",-1)),X=l(()=>e("option",null,"Còn trong kho",-1)),q=[X],J={class:"input-container"},K=l(()=>e("label",{for:"inputState"},"Nơi gửi",-1)),Q={class:"input-container"},W=l(()=>e("label",{for:"startDate"},"Ngày bắt đầu",-1)),Y={class:"input-container"},Z=l(()=>e("label",{for:"startDate"},"Ngày kết thúc",-1)),$={class:"bottomButton"},tt={class:"loading"},et={key:0,class:"status"},ot={style:{"background-color":"#ffe4b2"}},st={key:1,class:"status"},nt={style:{"background-color":"#6898c6"}},at=["onClick"],lt=l(()=>e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6 icon"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"})],-1)),it=[lt],rt=["onClick"],dt=l(()=>e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.2",stroke:"black",class:"w-6 h-6 icon"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})],-1)),ct=[dt],ut=l(()=>e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.2",stroke:"black",class:"w-6 h-6 icon"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"})],-1)),pt={class:"text-center pt-2"};function ht(s,t,i,gt,n,_){const k=d("v-card"),w=d("v-dialog"),O=d("v-progress-circular"),T=d("router-link"),I=d("v-pagination"),y=d("v-data-table");return c(),p("div",D,[U,e("div",R,[e("form",z,[h(e("input",{class:"search-box",type:"text",placeholder:"Tìm kiếm đơn hàng","onUpdate:modelValue":t[0]||(t[0]=o=>n.search=o)},null,512),[[m,n.search]]),A]),e("button",{class:"signup",type:"button",onClick:t[1]||(t[1]=o=>n.dialog=!0)},[C(" Bộ lọc "),G]),u(w,{modelValue:n.dialog,"onUpdate:modelValue":t[9]||(t[9]=o=>n.dialog=o),persistent:"",width:"1024"},{default:r(()=>[u(k,null,{default:r(()=>[j,e("div",F,[E,h(e("select",{id:"inputState",class:"form-control","onUpdate:modelValue":t[2]||(t[2]=o=>n.orderStatus=o)},q,512),[[b,n.orderStatus]])]),e("div",J,[K,h(e("select",{id:"inputState",class:"form-control","onUpdate:modelValue":t[3]||(t[3]=o=>s.senderName=o)},[(c(!0),p(V,null,B(s.warehouseList,o=>(c(),p("option",null,f(o),1))),256))],512),[[b,s.senderName]])]),e("div",Q,[W,h(e("input",{id:"startDate",class:"form-control",type:"date","onUpdate:modelValue":t[4]||(t[4]=o=>s.start=o)},null,512),[[m,s.start]])]),e("div",Y,[Z,h(e("input",{id:"startDate",class:"form-control",type:"date","onUpdate:modelValue":t[5]||(t[5]=o=>s.end=o)},null,512),[[m,s.end]])]),e("div",$,[e("button",{onClick:[t[6]||(t[6]=o=>n.dialog=!1),t[7]||(t[7]=o=>s.getListFiltered())],class:"btn btn--green-1",style:{width:"fit-content"}}," Đóng "),e("button",{onClick:t[8]||(t[8]=o=>s.deleterFilter()),class:"btn btn--green-1",style:{width:"fit-content"}}," Xóa bộ lọc ")])]),_:1})]),_:1},8,["modelValue"])]),e("div",tt,[n.loading?(c(),N(O,{key:0,color:"#ffa500","align-items":"center",indeterminate:"",size:34})):v("",!0)]),u(k,{flat:"",title:""},{default:r(()=>[u(y,{page:n.page,"onUpdate:page":t[11]||(t[11]=o=>n.page=o),headers:n.headers,"items-per-page":n.itemsPerPage,items:n.dataList,search:n.search},{"item.status":r(({item:o})=>[o.status=="DELIVERING"?(c(),p("button",et,[e("p",ot,f(o.status),1)])):v("",!0),o.status=="TRANSIT"?(c(),p("button",st,[e("p",nt,f(o.status),1)])):v("",!0)]),"item.update":r(({item:o})=>[e("button",{onClick:L=>_.verifyOrder(o.order_code)},it,8,at)]),"item.action":r(({item:o})=>[e("button",{onClick:L=>_.deleteOrder(o.order_code)},ct,8,rt),e("button",null,[u(T,{to:{name:"orderDetailbyHubStaff",params:{id:o.order_code}}},{default:r(()=>[ut]),_:2},1032,["to"])])]),bottom:r(()=>[e("div",pt,[u(I,{modelValue:n.page,"onUpdate:modelValue":t[10]||(t[10]=o=>n.page=o),length:_.pageCount},null,8,["modelValue","length"])])]),_:1},8,["page","headers","items-per-page","items","search"])]),_:1})])}const vt=S(H,[["render",ht],["__scopeId","data-v-b01d627f"]]);export{vt as default};

(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{45:function(e,t,a){e.exports=a(61)},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){e.exports="./static/media/alarm.0919823e.mp3"},59:function(e,t,a){e.exports="./static/media/break-time.be4257c1.mp3"},60:function(e,t,a){e.exports="./static/media/ticToc.c7d07465.mp3"},61:function(e,t,a){"use strict";a.r(t);var n=a(18),i=a(12),r=a(7),s=a(8),o=a(3),c=a(10),l=a(9),m=a(0),u=a(34),d=a(1),p=a(4);function h(e){if("string"===typeof e){var t=e.split("/");return e=t[1]+"/"+t[0]+"/"+t[2],new Date(e)}return new Date(e)}function f(e,t){return e.getFullYear()>t.getFullYear()||(e.getFullYear()===t.getFullYear()&&e.getMonth()>t.getMonth()||e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()>t.getDate())}function g(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function v(e,t){return!(!g(e,t)&&!f(e,t))}function y(e){if(Array.isArray(e)){var t,a=0,n=Object(i.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;a+="string"===typeof r?y(r):r}}catch(o){n.e(o)}finally{n.f()}return a}var s=e.split(":").map((function(e){return parseInt(e)}));return 3600*s[0]+60*s[1]+s[2]}function E(e){return e>=0&&e<=9?"0"+e:e.toString()}function b(){return w(new Date)}function w(e){return"".concat(E(e.getDate()),"/").concat(E(e.getMonth()+1),"/").concat(e.getFullYear())}function k(e){var t=Math.floor(e/3600),a=Math.floor((e-3600*t)/60),n=e-3600*t-60*a;return E(t)+":"+E(a)+":"+E(n)}var N=["Sunday","Monday","Tuesday","Wednesday","Thurday","Friday","Saturday"],x=["First","Seconde","Third","Fourth"],D=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var n;if(Object(r.a)(this,a),(n=t.call(this,e)).addElement=void 0,n.showGroupProposals=void 0,n.groups=void 0,n.warnings=void 0,n.successful=void 0,n.props.item){var i=n.props.item;n.state={name:i.name,time:i.timeBegin,expectedDate:i.expectedDate,note:i.note,group:i.group,daily:i.daily,option:!1,id:i.id}}else n.state={name:"",time:"",expectedDate:"",note:"",group:"",daily:!1,option:!1,id:0};return n.warnings=!1,n.successful=!1,n.addElement=n.props.addElement,n.showGroupProposals=!1,n.add=n.add.bind(Object(o.a)(n)),n.groups=[],n}return Object(s.a)(a,[{key:"add",value:function(){var e=new Date,t=this.state.expectedDate,a=/^[0-5]?[0-9]:[0-5]?[0-9]$/.test(this.state.time)||/^[0-5]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9]$/.test(this.state.time),n=/([0-2]?[0-9]|3[0-1])\/(0?[0-9]|1[0-2])\/2[0-9]{1,3}/.test(t),i=h(t);if(n=(n=n&&v(i,e))||""===t,(a=a&&n)||this.state.daily)if(""!==this.state.name&&""!==this.state.time){var r=this.state.time;/^[0-5]?[0-9]:[0-5]?[0-9]$/.test(r)&&(r="00:"+r);var s=""===this.state.expectedDate||this.state.daily?b():this.state.expectedDate,o=""===this.state.group?"unknown":this.state.group,c=""===this.state.note?"":this.state.note;this.successful=!0;var l={id:this.state.id,name:this.state.name,timeBegin:r,timeLeft:r,isAchieved:!1,expectedDate:s,group:o,note:c,finishedDay:"",daily:this.state.daily};if(this.props.modify&&void 0!==this.props.item){var m=y(this.props.item.timeBegin)-y(this.props.item.timeLeft),u=y(l.timeBegin),d=u-m>0?u-m:0;l.timeLeft=k(d)}this.addElement(l),this.setState({name:"",time:"",expectedDate:"",note:"",group:"",option:!1})}else this.setState({option:!this.state.option}),this.warnings=!0;else this.setState({option:!this.state.option}),this.warnings=!0}},{key:"render",value:function(){var e=this;return this.groups=this.props.groups||[],m.createElement("div",{className:"col col-md-8 mx-auto my-5 bg-light border border-light rounded p-2"},this.warnings&&m.createElement("div",{className:"alert alert-danger alert-dismissible fade show",role:"alert"},m.createElement("strong",null,"Error!")," You should check in on some of those fields below.",m.createElement("button",{type:"button",className:"close",onClick:function(){e.warnings=!1,e.setState({option:!e.state.option})}},m.createElement("span",{"aria-hidden":"true"},"\xd7"))),this.successful&&m.createElement("div",{className:"alert alert-success alert-dismissible fade show",role:"alert"},m.createElement("strong",null,"Successful!")," ",this.props.modify?"Modification":"Task Added.",m.createElement("button",{type:"button",className:"close",onClick:function(){e.successful=!1,e.setState({option:!e.state.option})}},m.createElement("span",{"aria-hidden":"true"},"\xd7"))),m.createElement("div",{className:"form-row add-section "+(this.state.option?"extend":"")},m.createElement("div",{className:"col-12 col-md-5 mx-md-1 form-group"},m.createElement("input",{className:"form-control",type:"text",placeholder:"write your job...",value:this.state.name,onChange:function(t){var a=t.currentTarget.value;e.setState({name:a})}})),m.createElement("div",{className:"col-12 col-md-5 mx-md-1 form-group"},m.createElement("input",{className:"form-control",type:"text",placeholder:"HH:MM:SS",value:this.state.time,onChange:function(t){var a=t.currentTarget.value;e.setState({time:a})}})),m.createElement("button",{className:"h-50 btn btn-secondary mx-auto",onClick:this.add},this.props.modify?"Modify":"Add")),m.createElement("fieldset",{className:"form-row px-5"},m.createElement("legend",null,"Optional"),m.createElement("div",{className:"col hide "+(this.state.option?"not-hide":"")},m.createElement("div",{className:"input-group mb-3"},m.createElement("div",{className:"input-group-prepend"},m.createElement("span",{className:"input-group-text"},"Date")),m.createElement("input",{className:"form-control",type:"text",value:this.state.expectedDate,placeholder:"Type expected date that want to execute the tache DD/MM/YY",readOnly:this.state.daily,onChange:function(t){e.setState({expectedDate:t.currentTarget.value})}})),m.createElement("div",{className:"input-group mb-3"},m.createElement("div",{className:"input-group-prepend"},m.createElement("span",{className:"input-group-text"},"Group")),m.createElement("input",{className:"form-control",type:"text",value:this.state.group,placeholder:"Type group associated here...",onChange:function(t){e.setState({group:t.currentTarget.value})},onInput:function(t){e.showGroupProposals=!0}})),this.showGroupProposals&&""!==this.state.group&&0!==this.groups.filter((function(t){return-1!==t.indexOf(e.state.group)})).length&&m.createElement("div",{className:"form-group overflow-auto overflow-x-hidden bg-dark"},this.groups.filter((function(t){return-1!==t.indexOf(e.state.group)})).map((function(t,a){return m.createElement("div",{key:a,className:"col-12 p-2 text-info stretched-link",onClick:function(a){e.showGroupProposals=!1,e.setState({group:t})}},t)}))),m.createElement("div",{className:"input-group mb-3"},m.createElement("div",{className:"input-group-prepend"},m.createElement("div",{className:"input-group-text"},m.createElement("input",{type:"checkbox",onChange:function(t){e.setState({daily:t.currentTarget.checked})},checked:this.state.daily}))),m.createElement("input",{type:"text",className:"form-control","aria-label":"Text input with checkbox",value:"Daily",readOnly:!0})),m.createElement("div",{className:"input-group"},m.createElement("div",{className:"input-group-prepend"},m.createElement("span",{className:"input-group-text"},"Note")),m.createElement("textarea",{className:"form-control",value:this.state.note,placeholder:"Type the note here...",onChange:function(t){e.setState({note:t.currentTarget.value})}})))))}}]),a}(m.Component),O=function(e){var t=!v(h(e.item.expectedDate),e.item.isAchieved?h(e.item.finishedDay):new Date);return m.createElement("div",{className:"row border border-white rounded p-4 "+(t?"bg-warning":"bg-light")},m.createElement("div",{className:"col-10"},m.createElement("h3",{className:"text-dark font-weight-bold"},e.item.name.toLocaleUpperCase())),t&&m.createElement("div",{className:"col-2 font-weight-bold text-center "},m.createElement("i",{className:"fas fa-clock px-1 py-0"})," LATE"),e.item.daily&&m.createElement("div",{className:"col-2 font-weight-bold text-center text-warning "},m.createElement("i",{className:"fas fa-star px-1 py-0"})," DAILY"),m.createElement("div",{className:"col-12 col-sm-10 mx-auto row"},m.createElement("div",{className:"col-12 col-sm-4 p-2 text-center"},m.createElement("h6",{className:"text-dark font-weight-bold"},"Initiale Time:")," ",m.createElement("strong",{className:"text-info"},e.item.timeBegin)),m.createElement("div",{className:"col-12 col-sm-4 p-2 text-center"},m.createElement("h6",{className:"text-dark font-weight-bold"},"Time Left:")," ",m.createElement("strong",{className:"text-info"},e.item.timeLeft)),m.createElement("div",{className:"col-12 col-sm-4 p-2 text-center"},m.createElement("h6",{className:"text-dark font-weight-bold"},"Expected Date:")," ",m.createElement("strong",{className:"text-danger"},e.item.expectedDate))),e.controllers&&m.createElement("div",{className:"col-12 row justify-content-end text-center p-2"},m.createElement("button",{className:"btn btn-success m-2",onClick:function(t){return e.start&&e.start(e.item.id)}},m.createElement("i",{className:"fas fa-play m-1"})," Start"),m.createElement("button",{className:"btn btn-danger m-2 ",onClick:function(t){return e.remove&&e.remove(e.item.id)}},m.createElement("i",{className:"fas fa-trash m-1"})," Remove"),m.createElement(p.b,{to:"modify/".concat(e.item.id),className:"btn btn-secondary m-2"},m.createElement("i",{className:"fas fa-sliders-h m-1"})," Modify"),m.createElement(p.b,{to:"note/".concat(e.item.id),className:"btn btn-info m-2"},m.createElement("i",{className:"fas fa-sticky-note m-1"})," Note")))},S=a(15),j=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).ref=void 0,n.working=void 0,n.dataPlot=void 0,n.width=void 0,n.height=void 0,n.data=void 0,n.selection=void 0,n.update=void 0,n.state={selectedDay:b(),selection:null},n.ref=m.createRef(),n.working=n.props.working,n.dataPlot=new Array,n.width=330,n.height=250,n.data=null,n.update=1,n.selection=null,n}return Object(s.a)(a,[{key:"shouldComponentUpdate",value:function(e,t){return t!==this.state||(this.update%120===0?(this.update=1,!0):(this.update++,!1))}},{key:"_draw",value:function(){var e=this,t=0,a=this.height,n=this.width;if(this.dataPlot=[],this.data){this.data.forEach((function(a,n){e.dataPlot.push(a),a.time>t&&(t=a.time)}));var i=S.b().domain([0,t+200]).range([0,a]),r=this.state.selection;if(r&&r.html(""),r){var s=n-10;r.append("g").selectAll("rect").data(this.dataPlot).enter().append("rect").attr("width",6).attr("rx",2).attr("ry",2).attr("x",(function(e,t){return e.hour*(s/24)+2})).attr("height",(function(e){return i(e.time)})).attr("y",(function(e){return a-20-i(e.time)})).attr("fill",(function(t,a){return 0===a?"#007bff":e.dataPlot[a-1].time>t.time?"red":"green"})).on("mouseover",(function(t,n){var r=t.hour*s/24,m=a-60-i(t.time),u=r<45?45:r>e.width-45?e.width-45:r,d=m-10>0?m-10:10,p=r-45<0?0:r-45>e.width-90?e.width-90:r-45,h=m-20>0?m-20:0;l.text("".concat(t.time/60>2?(t.time/60).toFixed(0)+" MINUTES":t.time+" SECONDS")).attr("x",u).attr("y",d+10),c.attr("x",p).attr("y",h).attr("fill",0===n?"#007bff":e.dataPlot[n-1].time>t.time?"red":"green"),o.attr("display","block")})).on("mouseout",(function(){o.attr("display","none")}));var o=r.append("g").attr("display","none").on("mouseover",(function(){this.setAttribute("display","block")})).on("mouseout",(function(){this.setAttribute("display","none")})),c=o.append("rect").attr("width",90).attr("height",40).attr("fill","#007bff").attr("rx",5).attr("rx",5),l=o.append("text").attr("width",90).attr("height",20).attr("font-size",12).style("text-anchor","middle"),m=r.append("g");m.selectAll("text").data(new Array(25).fill(0)).enter().append("text").attr("x",(function(e,t){return t<24?t*(s/24)+3:t*(s/24)-22})).attr("y",a).attr("fill","blue").style("font-size","16").style("font-family","m").text((function(e,t){return t%6===0?t<24?t:t+"(h)":""})),m.selectAll("circle").data(new Array(97).fill(0)).enter().append("circle").attr("cx",(function(e,t){return t*(s/96)+5})).attr("cy",a-20).attr("r",(function(e,t){return t%24===0?3:1})).attr("stroke","#2228").attr("stroke-width","1").selectAll("rect")}else this.setState({selection:S.c(this.ref.current)})}}},{key:"componentDidMount",value:function(){this._draw()}},{key:"componentDidUpdate",value:function(){this._draw()}},{key:"render",value:function(){var e=this;this.data=this.working.get(this.state.selectedDay);var t=function(){return m.createElement("div",{className:"row"},m.createElement("div",{className:"col-12 input-group my-3"},m.createElement("div",{className:"input-group-prepend"},m.createElement("label",{className:"input-group-text",htmlFor:"inputGroupSelect01"},"Date")),m.createElement("select",{className:"custom-select",onChange:function(t){e.setState({selectedDay:t.currentTarget.value})},defaultValue:e.state.selectedDay},new Array(8).fill(0).map((function(e,t){var a=(new Date).getDate()-t,n=new Date((new Date).setDate(a)),i="".concat(E(n.getDate()),"/").concat(E(n.getMonth()+1),"/").concat(n.getFullYear()),r=N[n.getDay()];return m.createElement("option",{key:t,value:i},r)})))))},a=h(this.state.selectedDay).getDay();return m.createElement("div",{className:"col-12 col-md-6"},m.createElement("div",{className:"row"},m.createElement("h4",{className:"text-info p-2 pl-3 col-12"},"Days Reporter (",N[a],")"),m.createElement("svg",{className:"col-12",ref:this.ref,style:{display:this.data?"block":"none"},viewBox:"0 0 ".concat(this.width," ").concat(this.height)}),!this.data&&m.createElement("h4",{className:"text-center col-12 d-flex justify-content-center align-items-center text-danger",style:{height:this.height}},"No data"),m.createElement("div",{className:"col-12"},m.createElement(t,null))))}}]),a}(m.Component),T=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var n;Object(r.a)(this,a),(n=t.call(this,e)).ref=void 0,n.working=void 0,n.dataPlot=void 0,n.width=void 0,n.height=void 0,n.selection=void 0,n.update=void 0,n.state={selectedWeek:0,selection:null},n.ref=m.createRef(),n.working=n.props.jobs,n.dataPlot=new Array;var s,o=Object(i.a)(n.working);try{var c=function(){var e=s.value,t=n.dataPlot.findIndex((function(t){return t.date===e.finishedDay}));-1===t?n.dataPlot.push({date:e.finishedDay,seconds:y(e.timeBegin),tasksNumber:1}):(n.dataPlot[t].seconds+=y(e.timeBegin),n.dataPlot[t].tasksNumber++)};for(o.s();!(s=o.n()).done;)c()}catch(l){o.e(l)}finally{o.f()}return n.width=330,n.height=250,n.update=1,n.selection=null,n}return Object(s.a)(a,[{key:"shouldComponentUpdate",value:function(e,t){return t!==this.state||(this.update%120===0?(this.update=1,!0):(this.update++,!1))}},{key:"_draw",value:function(){var e=this,t=this.height,a=this.width-10,n=t-20,i=S.a(this.dataPlot,(function(e){var t=(new Date).getDate()-7,a=new Date((new Date).setDate(t));return v(h(e.date),a)?e.seconds:0})),r=this.state.selection,s=S.b().domain([0,i+100]).range([0,n]);if(r){console.log("max ",i),r.html("");var o=r.append("g");o.selectAll("text").data(new Array(8).fill(0)).enter().append("text").attr("x",(function(e,t){return t<7?t*(a/7)+3:t*(a/7)-15})).attr("y",t).attr("fill","blue").style("font-size","16").style("font-family","m").text((function(e,t){var a=new Date((new Date).setDate((new Date).getDate()-7+t));return N[a.getDay()].substr(0,3)})),o.selectAll("circle").data(new Array(106).fill(0)).enter().append("circle").attr("stroke","#2228").attr("stroke-width","0").attr("cx",(function(e,t){return t*(a/105)+5})).attr("cy",t-20).attr("r",(function(e,t){return t%15===0?3:1}));var c=r.append("g");c.selectAll("circle").data(new Array(8).fill(0)).enter().append("circle").attr("r",4).attr("fill","green").attr("stroke","white").attr("stroke-width",2).attr("cx",(function(e,t){return t*(a/7)+5})).attr("cy",(function(t,a){var i=(new Date).getDate()-7*(e.state.selectedWeek+1)+a,r=w(new Date((new Date).setDate(i))),o=e.dataPlot.findIndex((function(e){return e.date===r}));return-1!==o?(console.log(e.dataPlot[o].seconds,s(e.dataPlot[o].seconds)),n-s(e.dataPlot[o].seconds)):n})).on("mouseover",(function(n,i){var r=(new Date).getDate()-7*(e.state.selectedWeek+1)+i,o=w(new Date((new Date).setDate(r))),c=e.dataPlot.findIndex((function(e){return e.date===o})),d=e.dataPlot[c]||{seconds:0},p=i*a/7,h=t-60-s(d.seconds),f=p<45?45:p>e.width-45?e.width-45:p,g=h-10>0?h-10:10,v=p-45<0?0:p-45>e.width-90?e.width-90:p-45,y=h-20>0?h-20:0;u.text("".concat(d.seconds/60>2?(d.seconds/60).toFixed(0)+" MINUTES":d.seconds+" SECONDS")).attr("x",f).attr("y",g+10),m.attr("x",v).attr("y",y).attr("fill","#007bff"),l.attr("display","block")})).on("mouseout",(function(){l.attr("display","none")})),c.selectAll("line").data(new Array(7).fill(0)).enter().append("line").attr("stroke","green").attr("x1",(function(e,t){return t*(a/7)+5})).attr("x2",(function(e,t){return(t+1)*(a/7)+5})).attr("y1",(function(t,a){var i=(new Date).getDate()-7*(e.state.selectedWeek+1)+a,r=w(new Date((new Date).setDate(i))),o=e.dataPlot.findIndex((function(e){return e.date===r}));return-1!==o?n-s(e.dataPlot[o].seconds):n})).attr("y2",(function(t,a){var i=(new Date).getDate()-7*(e.state.selectedWeek+1)+(a+1),r=w(new Date((new Date).setDate(i))),o=e.dataPlot.findIndex((function(e){return e.date===r}));return-1!==o?n-s(e.dataPlot[o].seconds):n}));var l=r.append("g").attr("display","none").on("mouseover",(function(){this.setAttribute("display","block")})).on("mouseout",(function(){this.setAttribute("display","none")})),m=l.append("rect").attr("width",90).attr("height",40).attr("fill","#007bff").attr("rx",5).attr("rx",5),u=l.append("text").attr("width",90).attr("height",20).attr("font-size",12).style("text-anchor","middle")}else this.setState({selection:S.c(this.ref.current)})}},{key:"componentDidMount",value:function(){this._draw()}},{key:"componentDidUpdate",value:function(){this._draw()}},{key:"render",value:function(){var e=this,t=function(){return m.createElement("div",{className:"row"},m.createElement("div",{className:"col-12 input-group my-3"},m.createElement("div",{className:"input-group-prepend"},m.createElement("label",{className:"input-group-text",htmlFor:"inputGroupSelect01"},"Week")),m.createElement("select",{className:"custom-select",onChange:function(t){e.setState({selectedWeek:parseInt(t.currentTarget.value)})},defaultValue:e.state.selectedWeek},new Array(4).fill(0).map((function(e,t){return m.createElement("option",{key:t,value:t},x[t]," Week")})))))};return m.createElement("div",{className:"col-12 col-md-6"},m.createElement("div",{className:"row"},m.createElement("h4",{className:"text-info p-2 pl-3 col-12"},"Weeks Reporter (",x[this.state.selectedWeek]," Week)"),m.createElement("svg",{className:"col-12",ref:this.ref,viewBox:"0 0 ".concat(this.width," ").concat(this.height)}),m.createElement("div",{className:"col-12"},m.createElement(t,null))))}}]),a}(m.Component),L=function(e){var t=e.working;return m.createElement("div",{className:"row bg-light p-4 my-2"},m.createElement(j,{working:t}),m.createElement(T,{jobs:e.jobs}))};function A(e){var t,a=0,n=Object(i.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value.split(":").map((function(e){return parseInt(e)}));a+=3600*r[0]+60*r[1]+r[2]}}catch(l){n.e(l)}finally{n.f()}var s=Math.floor(a/3600),o=Math.floor((a-3600*s)/60),c=a-3600*s-60*o;return I(s)+":"+I(o)+":"+I(c)}function I(e){return e>=0&&e<=9?"0"+e:e.toString()}var W=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).startWork=void 0,n.removeWork=void 0,n.myList=void 0,n.hist=void 0,n.working=void 0,n.state={staticOngle:"date"},n.startWork=n.props.startWork,n.removeWork=n.props.removeWork,n.myList=[],n.hist=[],n.working=new Map,n}return Object(s.a)(a,[{key:"_list",value:function(){var e=this;return m.createElement("div",{className:"todo-list"},this.myList.map((function(t,a){return t.isAchieved||e.props.index===t.id?"":m.createElement(O,{item:t,key:a,start:e.startWork,controllers:!0,remove:e.removeWork})})))}},{key:"_hist",value:function(){var e=this;this.hist=this.myList.filter((function(e){return e.isAchieved})).sort((function(e,t){return v(h(e.finishedDay),h(t.finishedDay))?-1:1}));var t=0!==this.hist.length?this.hist[0].finishedDay:"";return this.hist.map((function(a,n){var i=0===n||a.finishedDay!==t;return t=i?a.finishedDay:t,i?m.createElement("div",{className:"row mt-3",key:n},m.createElement("h3",{className:"col-12 col-md-8 text-dark py-2 px-3 pl-5 my-2 font-weight-bold"},t),m.createElement("h3",{className:"col-12 col-md-4 py-0 d-flex justify-content-center align-items-center text-danger bg-dark rounded border border-light  my-2 numeric"},"TOTAL OF HOURS:"," ",A(e.hist.filter((function(e){return e.finishedDay===t})).map((function(e){return e.timeBegin})))),m.createElement("div",{className:"col-12"},e.hist.filter((function(e){return e.finishedDay===t})).map((function(e,t){return m.createElement(O,{key:t,controllers:!1,item:e})})))):void 0}))}},{key:"_static",value:function(){var e=this;this.hist=this.myList.filter((function(e){return e.isAchieved})).sort((function(e,t){return f(h(e.finishedDay),h(t.finishedDay))?-1:g(h(e.finishedDay),h(t.finishedDay))?0:1})),"group"===this.state.staticOngle&&(this.hist=this.hist.sort((function(e,t){return e.group>t.group?1:e.group<t.group?-1:0})));var t=0!==this.hist.length?this.hist[0].finishedDay:"",a=0!==this.hist.length?this.hist[0].group:"";return"date"===this.state.staticOngle?m.createElement("div",null,this.hist.map((function(a,n){var i=0===n||a.finishedDay!==t;return t=i?a.finishedDay:t,i?m.createElement("div",{className:"row mt-3",key:n},m.createElement("h3",{className:"col-12 col-md-8 text-dark py-2 px-3 pl-5 my-2 font-weight-bold"},t),m.createElement("h3",{className:"col-12 col-md-4 py-0 d-flex justify-content-center align-items-center text-danger bg-dark rounded border border-light  my-2 numeric"},"TOTAL OF HOURS:"," ",A(e.hist.filter((function(e){return e.finishedDay===t})).map((function(e){return e.timeBegin})))),m.createElement("div",{className:"col-12"},e.hist.filter((function(e){return e.finishedDay===t})).map((function(e,t){return m.createElement(O,{key:t,controllers:!1,item:e})})))):void 0}))):"group"===this.state.staticOngle?this.hist.map((function(t,n){var i=0===n||t.group!==a;return a=i?t.group:a,i?m.createElement("div",{className:"row mt-3",key:n},m.createElement("h3",{className:"col-12 col-md-8 text-dark py-2 px-3 pl-5 my-2 font-weight-bold"},a),m.createElement("h3",{className:"col-12 col-md-4 py-0 d-flex justify-content-center align-items-center text-danger bg-dark rounded border border-light  my-2 numeric"},"TOTAL OF HOURS:"," ",A(e.hist.filter((function(e){return e.group===a})).map((function(e){return e.timeBegin})))),m.createElement("div",{className:"col-12"},e.hist.filter((function(e){return e.group===a})).map((function(e,t){return m.createElement(O,{key:t,controllers:!1,item:e})})))):void 0})):void 0}},{key:"render",value:function(){var e=this;return this.myList=this.props.myList,this.working=this.props.working,m.createElement("div",{className:"row mt-4"},m.createElement(d.c,null,m.createElement(d.a,{path:"/",exact:!0},m.createElement("h1",{className:"col-10 text-primary"},"Tasks"),m.createElement(p.b,{to:"add",className:"h-25 btn btn-primary mx-auto align-self-center"},m.createElement("i",{className:"fas fa-plus mx-1"})," Add"),m.createElement("div",{className:"limitor col-12"},m.createElement("div",{className:"row"},m.createElement("div",{className:"col-12"},this._list())))),m.createElement(d.a,{path:"/history"},m.createElement("h1",{className:"col-10 text-primary"},"History"),m.createElement("div",{className:"col-12"},this._hist())),m.createElement(d.a,{path:"/statistics"},m.createElement("h1",{className:"col-12  col-md-8 text-primary"},"Statistics"),m.createElement("div",{className:"col-12 col-md-4 btn-group"},m.createElement("button",{type:"button",className:"btn btn-secondary",onClick:function(t){return e.setState({staticOngle:"date"})}},"By Date"),m.createElement("button",{type:"button",className:"btn btn-secondary",onClick:function(t){return e.setState({staticOngle:"group"})}},"By Group")),m.createElement("div",{className:"col-12"},m.createElement(L,{working:this.working,jobs:this.myList})),m.createElement("div",{className:"col-12"},this._static()))))}}]),a}(m.Component),C=function(e){return m.createElement("div",{className:"row"},m.createElement("div",{className:"col-10 col-md-8 col-xl-6 mx-auto bg-dark p-0 mt-4 numeric",onClick:function(t){return!e.controllers&&e.completed&&e.completed()}},m.createElement("h6",{className:"text-danger p-1 pl-3 numeric"},"job name: ",e.name),m.createElement("h1",{className:"text-danger text-center numeric clock"},e.time),m.createElement("div",{className:"row"},m.createElement("div",{className:"col-12 d-flex justify-content-around mx-2"},m.createElement("h6",{className:"text-danger p-1 numeric"},"Current Time: ",e.currentTime),m.createElement("h6",{className:"text-danger p-1 numeric"},"Current Date: ",e.currentDate))),e.controllers&&m.createElement("div",{className:"container-fluid"},m.createElement("div",{className:"row"},e.button&&m.createElement("button",{className:"col no-outline font-weight-bold btn btn-danger mx-0 rounded-0",onClick:function(t){return e.playPauseEffect&&e.pause&&e.pause()}},m.createElement("i",{className:"fas fa-pause mx-1"})," Pause"),!e.button&&m.createElement("button",{className:"col no-outline font-weight-bold btn btn-danger mx-0 rounded-0",onClick:function(t){return e.playPauseEffect&&e.reprise&&e.reprise()}},m.createElement("i",{className:"fas fa-play mx-1"})," Start"),m.createElement("button",{className:"col no-outline font-weight-bold btn btn-danger mx-0 rounded-0",onClick:function(t){return e.stop&&e.stop()}},m.createElement("i",{className:"fas fa-stop mx-1"})," Stop"),m.createElement("button",{className:"col no-outline font-weight-bold btn btn-danger mx-0 rounded-0",onClick:function(t){return e.remove&&e.remove()}},m.createElement("i",{className:"fas fa-trash mx-1"})," Stop and Remove")))))},P=function(){return m.createElement("div",{className:"container-fluid"},m.createElement("div",{className:"row"},m.createElement("nav",{className:"col navbar navbar-expand navbar-light bg-light"},m.createElement(p.b,{className:"navbar-brand",to:"/"},"Todo List App"),m.createElement("div",{className:"collapse navbar-collapse"},m.createElement("ul",{className:"navbar-nav"},m.createElement("li",{className:"nav-item active"},m.createElement(p.b,{to:"/",className:"nav-link"},"Home")),m.createElement("li",{className:"nav-item"},m.createElement(p.b,{to:"/history",className:"nav-link"},"History")),m.createElement("li",{className:"nav-item"},m.createElement(p.b,{to:"/statistics",className:"nav-link"},"Statistics")),m.createElement("li",{className:"nav-item"},m.createElement(p.b,{to:"/settings",className:"nav-link"},"Settings")))))))},M=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).updateOptions=void 0,n.warnings=void 0,n.successful=void 0,n.state={leave:n.props.options.reposeTime/60,stay:n.props.options.workingTime/60,option:!1},n.warnings=!1,n.successful=!1,n.updateOptions=n.props.updateOptions,n}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return m.createElement("div",{className:"col col-md-8 mx-auto my-5 bg-light border border-light rounded p-2"},this.warnings&&m.createElement("div",{className:"alert alert-danger alert-dismissible fade show",role:"alert"},m.createElement("strong",null,"Error!")," You should give valide value.",m.createElement("button",{type:"button",className:"close",onClick:function(){e.warnings=!1,e.setState({option:!e.state.option})}},m.createElement("span",{"aria-hidden":"true"},"\xd7"))),this.successful&&m.createElement("div",{className:"alert alert-success alert-dismissible fade show",role:"alert"},m.createElement("strong",null,"Successful!")," settigns updated.",m.createElement("button",{type:"button",className:"close",onClick:function(){e.successful=!1,e.setState({option:!e.state.option})}},m.createElement("span",{"aria-hidden":"true"},"\xd7"))),m.createElement("div",{className:"form-row add-section"},m.createElement("div",{className:"col-12 input-group mb-3"},m.createElement("div",{className:"input-group-prepend"},m.createElement("span",{className:"input-group-text"},"Working Time")),m.createElement("input",{type:"text",className:"form-control",onChange:function(t){var a=parseInt(t.currentTarget.value);!isNaN(a)&&a>0&&a<=90?(e.successful=!0,e.warnings=!1,e.props.updateOptions(60*a,60*e.state.leave),e.setState({stay:a})):(e.successful=!1,e.warnings=!0,e.setState({option:!e.state.option}))},value:this.state.stay}),m.createElement("div",{className:"input-group-append"},m.createElement("span",{className:"input-group-text"},"min (90min max)"))),m.createElement("div",{className:"col-12 input-group mb-3"},m.createElement("div",{className:"input-group-prepend"},m.createElement("span",{className:"input-group-text"},"Break Time")),m.createElement("input",{type:"text",className:"form-control",onChange:function(t){var a=parseInt(t.currentTarget.value);!isNaN(a)&&a>0&&a<=30?(e.warnings=!1,e.successful=!0,e.props.updateOptions(60*e.state.stay,60*a),e.setState({leave:a})):(e.successful=!1,e.warnings=!0,e.setState({option:!e.state.option}))},value:this.state.leave}),m.createElement("div",{className:"input-group-append"},m.createElement("span",{className:"input-group-text"},"min (30min max)")))))}}]),a}(m.Component),F=function(e){return console.log(e),m.createElement("div",{className:"col-12 border border-white rounded p-4 "},m.createElement("div",{className:"row"},m.createElement("h1",{className:"col-12 text-primary"},"Note"),m.createElement("div",{className:"col-12 jumbotron"},m.createElement("h1",{className:"display-4"},e.item.name||""),m.createElement("p",{className:"lead"},(""===e.item.note?"Nothing":e.item.note)||""))))},B=(a(55),a(56),a(57),a(58)),_=a(59),Y=a(60),H=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var s;Object(r.a)(this,a),(s=t.call(this,e)).index=void 0,s.selected=!1,s.interval=void 0,s.beep=new Audio,s.ticToc=new Audio,s.breakTimeSound=new Audio,s.groups=new Array,s.myList=new Array,s.daily=new Array,s.working=new Map,s.showContent=void 0,s.counter=void 0,s.options=void 0,s.stayWorking=void 0,s.leaveWorking=void 0,s.modifyIndex=void 0,s.button=void 0,s.playPauseEffect=void 0,s.ticTocPlayingStatus=void 0,s.state={alter:!1},s.interval=setTimeout((function(){}),0),s.index=-1,s.modifyIndex=-1,s.counter=0,s.button=!1,s.playPauseEffect=!0,s.stayWorking=0,s.showContent="00:00:00",s.beep.src=B,s.ticToc.src=Y,s.breakTimeSound.src=_,s.beep.loop=!0,s.ticToc.loop=!0,s.ticTocPlayingStatus=!1;var c=JSON.parse(window.localStorage.getItem("todo-list")||"[]");s.working=s._createMapFromObject(JSON.parse(window.localStorage.getItem("working-data")||"{}"),s._createMapFromObject),s.options=JSON.parse(window.localStorage.getItem("options")||JSON.stringify({workingTime:1500,reposeTime:300})),s.leaveWorking=s.options.reposeTime;var l,m=Object(i.a)(c);try{for(m.s();!(l=m.n()).done;){var u=l.value;u.id=s.counter,s.counter++,void 0!==u.finishedDay&&"unknow"!==u.finishedDay||(u.finishedDay="Unknown"),void 0!==u.group&&"unknow"!==u.group||(u.group="Unknown"),void 0===u.isAchieved&&("00:00:00"===u.timeLeft?u.isAchieved=!0:u.isAchieved=!1),void 0===u.daily&&(u.daily=!1,u.group=u.group.toLowerCase()),s.myList.push(u)}}catch(x){m.e(x)}finally{m.f()}var d,p=s.myList.filter((function(e){return e.daily})),f=Object(i.a)(p);try{for(f.s();!(d=f.n()).done;){var g,y=d.value,E=!1,w=Object(i.a)(s.daily);try{for(w.s();!(g=w.n()).done;){var k=g.value;k.name===y.name&&k.group===y.group&&k.timeBegin===y.timeBegin&&k.note===y.note&&(E=!0)}}catch(x){w.e(x)}finally{w.f()}E||s.daily.push(Object(n.a)({},y,{timeLeft:y.timeBegin}))}}catch(x){f.e(x)}finally{f.f()}s.addElement=s.addElement.bind(Object(o.a)(s)),s.modify=s.modify.bind(Object(o.a)(s)),s.startWork=s.startWork.bind(Object(o.a)(s)),s.stopWork=s.stopWork.bind(Object(o.a)(s)),s.stopAlarm=s.stopAlarm.bind(Object(o.a)(s)),s.removeWork=s.removeWork.bind(Object(o.a)(s)),s.remove=s.remove.bind(Object(o.a)(s)),s.pause=s.pause.bind(Object(o.a)(s)),s.reprise=s.reprise.bind(Object(o.a)(s)),s.updateOptions=s.updateOptions.bind(Object(o.a)(s)),s.myList.forEach((function(e){-1===s.groups.indexOf(e.group)&&s.groups.push(e.group.toLowerCase())}));var N=b();return s.daily.forEach((function(e){var t,a=!1,n=Object(i.a)(s.myList);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(r.name===e.name&&r.group===e.group&&r.timeBegin===e.timeBegin&&r.note===e.note&&r.expectedDate===N){a=!0;break}}}catch(x){n.e(x)}finally{n.f()}if(!a){var o=Object.assign(e,{expectedDate:N,id:s.counter++});s.myList.push(o)}})),s.myList=s.myList.filter((function(e){return!(!v(h(e.expectedDate),new Date)&&e.daily)})),s}return Object(s.a)(a,[{key:"_createObjectFromMap",value:function(e,t){var a={};return e.forEach((function(e,n){a[n]=t?t(e):e})),a}},{key:"_createMapFromObject",value:function(e,t){var a=new Map;return Object.keys(e).forEach((function(n){t?a.set(n,t(e[n])):a.set(n,e[n])})),a}},{key:"addElement",value:function(e){var t=e.timeBegin.split(":"),a=(t=t.map((function(e){return E(parseInt(e))}))).join(":");e.timeBegin=a,e.timeLeft=a,t=e.expectedDate.split("/"),e.expectedDate=t.map((function(e){return E(parseInt(e))})).join("/"),e.id=this.counter++,this.myList.push(e),window.localStorage.setItem("todo-list",JSON.stringify(this.myList)),-1===this.groups.indexOf(e.group)&&this.groups.push(e.group),this.setState({alter:!this.state.alter})}},{key:"modify",value:function(e){var t=this.myList.findIndex((function(t){return t.id===e.id}));this.myList[t]=e,window.localStorage.setItem("todo-list",JSON.stringify(this.myList)),-1===this.groups.indexOf(e.group)&&this.groups.push(e.group),this.setState({alter:!this.state.alter})}},{key:"_workingOn",value:function(e,t){var a=k(e);this.myList[this.index].timeLeft=a,this.showContent=a;var n=new Date,i=b(),r=this.working.has(i)?this.working.get(i):new Map,s=r.has(n.getHours())?r.get(n.getHours()):{hour:n.getHours(),time:0,group:t.group};s.time++,r.set(n.getHours(),s),this.working.set(i,r),this.stayWorking++,e<=10&&e>=1&&!this.ticTocPlayingStatus&&(this.ticTocPlayingStatus=!0,this.ticToc.play()),e<=0?(this.ticTocPlayingStatus&&(this.ticToc.pause(),this.ticToc.currentTime=0,this.ticTocPlayingStatus=!1),this.beep.play(),clearInterval(this.interval),this.myList[this.index].isAchieved=!0,this.myList[this.index].finishedDay=i,this.index=-1,this.showContent=m.createElement("i",{className:"fas fa-volume-up"})):this.stayWorking>=this.options.workingTime&&(this.showContent="Take Break",this.breakTimeSound.play(),this.pause()),this.setState({alter:!this.state.alter}),window.localStorage.setItem("todo-list",JSON.stringify(this.myList)),window.localStorage.setItem("working-data",JSON.stringify(this._createObjectFromMap(this.working,this._createObjectFromMap)))}},{key:"startWork",value:function(e){var t=this;if(this.stayWorking<this.options.workingTime){clearInterval(this.interval),this.index=this.myList.findIndex((function(t){return t.id===e}));var a=this.myList[this.index];if(void 0!==a){this.button=!0,this.selected=!0,this.playPauseEffect=!0;var i=y(a.timeLeft);i>0?(--i,this._workingOn(i,a),this.interval=setInterval((function(){--i,t._workingOn(i,a)}),1e3)):(this.myList[this.index].isAchieved=!0,this.myList[this.index].finishedDay=b(),this.index=-1,this.selected=!1,this.setState((function(e){return Object(n.a)({},e,{alert:!e.alter})})),window.localStorage.setItem("todo-list",JSON.stringify(this.myList)),window.localStorage.setItem("working-data",JSON.stringify(this._createObjectFromMap(this.working,this._createObjectFromMap))))}}else{this.index=this.myList.findIndex((function(t){return t.id===e})),void 0!==this.myList[this.index]&&(this.selected=!0),this.pause()}}},{key:"stopAlarm",value:function(){this.selected=!1,this.beep.pause(),this.beep.currentTime=0,this.setState({alter:!this.state.alter})}},{key:"removeWork",value:function(e){var t=this;this.index=this.myList.findIndex((function(t){return t.id===e})),null!==e&&void 0!==this.myList[this.index]&&(this.selected=!1,clearInterval(this.interval),this.myList=this.myList.filter((function(e,a){return a!==t.index})),this.index=-1,window.localStorage.setItem("todo-list",JSON.stringify(this.myList)),this.setState((function(e){return Object(n.a)({},e,{alert:!e.alter})})))}},{key:"stopWork",value:function(){-1!==this.index&&(this.selected=!1,clearInterval(this.interval),this.index=-1,this.setState((function(e){return Object(n.a)({},e,{alert:!e.alter})})))}},{key:"reprise",value:function(){-1!==this.index&&this.startWork(this.myList[this.index].id)}},{key:"remove",value:function(){-1!==this.index&&(clearInterval(this.interval),this.removeWork(this.index))}},{key:"pause",value:function(){var e=this;clearInterval(this.interval),this.button=!1,this.ticTocPlayingStatus&&(this.ticToc.pause(),this.ticTocPlayingStatus=!1),this.stayWorking>=this.options.workingTime&&(this.playPauseEffect=!1),this.interval=setInterval((function(){e.stayWorking>=e.options.workingTime&&(e.leaveWorking>0?e.leaveWorking--:(e.leaveWorking=e.options.reposeTime,e.stayWorking=0,e.reprise())),e.setState({alter:!e.state.alter})}),1e3),this.setState({alter:!this.state.alter})}},{key:"updateOptions",value:function(e,t){this.options.workingTime=e,this.options.reposeTime=t,window.localStorage.setItem("options",JSON.stringify(this.options))}},{key:"render",value:function(){var e=this,t=new Date;return m.createElement(d.c,null,m.createElement(d.a,{path:"/add",exact:!0},m.createElement(D,{addElement:this.addElement,groups:this.groups})),m.createElement(d.a,{path:"/modify/:id",render:function(t){return m.createElement(D,{item:!isNaN(parseInt(t.match.params.id))&&parseInt(t.match.params.id)>=0&&e.myList[e.myList.findIndex((function(e){return e.id===parseInt(t.match.params.id)}))],addElement:e.modify,groups:e.groups,modify:!0})}}),m.createElement(d.a,{path:"/note/:id",render:function(t){return m.createElement(F,{item:!isNaN(parseInt(t.match.params.id))&&parseInt(t.match.params.id)>=0&&e.myList[e.myList.findIndex((function(e){return e.id===parseInt(t.match.params.id)}))]||{name:"Not Found",note:"Not Found"}})}}),m.createElement(d.a,{path:"/settings",exact:!0},m.createElement(M,{options:this.options,updateOptions:this.updateOptions})),m.createElement(d.a,{path:"/"},this.selected&&m.createElement(C,{name:-1!==this.index&&this.myList[this.index].name||"Click to stop alarm",time:this.showContent,currentDate:b(),currentTime:E(t.getHours())+":"+E(t.getMinutes()),stop:this.stopWork,reprise:this.reprise,remove:this.remove,pause:this.pause,completed:this.stopAlarm,button:this.button,controllers:-1!==this.index,playPauseEffect:this.playPauseEffect}),m.createElement(W,{myList:this.myList,startWork:this.startWork,removeWork:this.removeWork,working:this.working,index:this.index})))}}]),a}(m.Component);Object(u.render)(m.createElement(m.StrictMode,null,m.createElement(p.a,null,m.createElement(P,null),m.createElement("div",{className:"container"},m.createElement(H,null),m.createElement("div",{className:"row"},m.createElement("div",{className:"col"},m.createElement("p",{className:"text-center py-5 text-dark font-weight-bold"},"Created By @Hachour Fouad")))))),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.189b80c8.chunk.js.map
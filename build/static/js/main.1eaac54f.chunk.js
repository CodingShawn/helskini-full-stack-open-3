(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t(1),a=t.n(o),c=t(3);var u=function(e){var n=e.onFilterInputChange,t=e.filter;return Object(r.jsxs)("div",{children:["filter shown with ",Object(r.jsx)("input",{onChange:n,value:t})]})};var i=function(e){var n=e.addPerson,t=e.onNumberInputChange,o=e.onNameInputChange,a=e.newName,c=e.newNumber;return Object(r.jsxs)("form",{onSubmit:n,children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{onChange:o,value:a})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{onChange:t,value:c})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})};var d=function(e){var n=e.personsToShow,t=e.deletePerson;return Object(r.jsx)(r.Fragment,{children:n.map((function(e){return Object(r.jsxs)("div",{children:[e.name," ",e.number," ",Object(r.jsx)("button",{onClick:function(){return t(e)},children:"delete"})]},e.id)}))})};var s=function(e){var n=e.alert,t=e.ifError;return null===n?null:Object(r.jsx)("div",{style:t?{borderRadius:"4px",border:"2px solid red",color:"red",padding:"5px",backgroundColor:"lightgrey"}:{borderRadius:"4px",border:"2px solid darkgreen",color:"green",padding:"5px",backgroundColor:"lightgrey"},children:n})},l=t(4),b=t.n(l),j="/api/persons";var h={create:function(e){return b.a.post(j,e).then((function(e){return e.data}))},getAll:function(){return b.a.get(j).then((function(e){return e.data}))},deletePerson:function(e){var n=j+"/".concat(e.id);b.a.delete(n)},update:function(e,n){var t=j+"/".concat(n);return b.a.put(t,e).then((function(e){return e.data}))}},f=function(){var e=Object(o.useState)([]),n=Object(c.a)(e,2),t=n[0],a=n[1],l=Object(o.useState)(null),b=Object(c.a)(l,2),j=b[0],f=b[1],p=Object(o.useState)(!1),v=Object(c.a)(p,2),m=v[0],O=v[1];Object(o.useEffect)((function(){h.getAll().then((function(e){return a(e)}))}),[]);var g=Object(o.useState)(""),x=Object(c.a)(g,2),w=x[0],C=x[1],k=Object(o.useState)(""),S=Object(c.a)(k,2),y=S[0],N=S[1],I=Object(o.useState)(""),P=Object(c.a)(I,2),A=P[0],E=P[1];function F(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];O(n),f(e),setTimeout((function(){return f(null)}),5e3)}return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(s,{alert:j,ifError:m}),Object(r.jsx)(u,{onFilterInputChange:function(e){var n=e.target.value;E(n)},filter:A}),Object(r.jsx)("h2",{children:"add a new person"}),Object(r.jsx)(i,{addPerson:function(e){e.preventDefault();var n=t.map((function(e){return e.name})),r={name:w,number:y};n.includes(w)?function(e,n){window.confirm("".concat(e.name," is already added to phonebook. Replace the old number with a new one?"))&&h.update(e,n).then((function(){h.getAll().then((function(e){return a(e)})),F("Updated ".concat(w,"'s number"))})).catch((function(e){F("Information of ".concat(w," has already been removed from server"),!0)}))}(r,t.find((function(e){return e.name===w})).id):(h.create(r).then((function(e){a(t.concat(e))})),F("Added ".concat(w))),C(""),N("")},onNameInputChange:function(e){var n=e.target.value;C(n)},onNumberInputChange:function(e){var n=e.target.value;N(n)},newName:w,newNumber:y}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(d,{personsToShow:t.filter((function(e){var n=e.name.toLowerCase(),t=A.toLowerCase();return n.startsWith(t)})),deletePerson:function(e){window.confirm("Do you really want to delete ".concat(e.name,"?"))&&(h.deletePerson(e),h.getAll().then((function(e){return a(e)})))}})]})},p=t(14);t.n(p).a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(f,{})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.1eaac54f.chunk.js.map
"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4987],{4987:(v,c,i)=>{i.r(c),i.d(c,{LoginPageModule:()=>L});var d=i(9808),r=i(3075),t=i(8779),l=i(7085),p=i(6748),h=i(8746),n=i(5e3),m=i(7556);function f(e,g){if(1&e&&(n.TgZ(0,"p",7),n._uU(1),n.qZA()),2&e){const o=n.oxw();n.xp6(1),n.Oqu(o.lastError)}}const P=[{path:"",component:(()=>{class e{constructor(o,a){this.authService=o,this.router=a,this.busy=!1,this.lastError=null,this.loginDetails={Password:"",UsernameOrEmail:""}}ngOnInit(){this.authService.signOut()}login(){this.busy=!0,this.authService.signIn(this.loginDetails).pipe((0,h.x)(()=>this.busy=!1)).subscribe({next:()=>{console.log("Logged In"),this.router.navigate(["/"])},error:o=>{o instanceof p.j&&(this.lastError="Invalid email or password"),console.log(this.lastError)}})}}return e.\u0275fac=function(o){return new(o||e)(n.Y36(m.e),n.Y36(l.F0))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-login"]],decls:18,vars:5,consts:[[1,"login-card-wrapper"],[1,"login-card"],[1,"ion-text-center"],[3,"ngModel","ngModelChange"],[3,"ngModel","type","ngModelChange"],["class","text-danger","style","margin-top: 10px;",4,"ngIf"],[1,"login-card-button",3,"disabled","click"],[1,"text-danger",2,"margin-top","10px"]],template:function(o,a){1&o&&(n.TgZ(0,"ion-content")(1,"div",0)(2,"ion-card",1)(3,"ion-card-header")(4,"ion-card-title",2),n._uU(5,"Login"),n.qZA()(),n.TgZ(6,"ion-card-content")(7,"ion-item")(8,"ion-label"),n._uU(9,"Email"),n.qZA(),n.TgZ(10,"ion-input",3),n.NdJ("ngModelChange",function(s){return a.loginDetails.UsernameOrEmail=s}),n.qZA()(),n.TgZ(11,"ion-item")(12,"ion-label"),n._uU(13,"Password"),n.qZA(),n.TgZ(14,"ion-input",4),n.NdJ("ngModelChange",function(s){return a.loginDetails.Password=s}),n.qZA()(),n.YNc(15,f,2,1,"p",5),n.TgZ(16,"ion-button",6),n.NdJ("click",function(){return a.login()}),n._uU(17,"Login"),n.qZA()()()()()),2&o&&(n.xp6(10),n.Q6J("ngModel",a.loginDetails.UsernameOrEmail),n.xp6(4),n.Q6J("ngModel",a.loginDetails.Password)("type","password"),n.xp6(1),n.Q6J("ngIf",a.lastError),n.xp6(1),n.Q6J("disabled",a.busy))},dependencies:[d.O5,r.JJ,r.On,t.YG,t.PM,t.FN,t.Zi,t.Dq,t.W2,t.pK,t.Ie,t.Q$,t.j9],styles:[".login-card-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%}.login-card-wrapper[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]{width:100%;max-width:576px}.login-card-wrapper[_ngcontent-%COMP%]   .login-card-button[_ngcontent-%COMP%]{width:100%;margin-top:30px;height:50px;font-weight:700}.text-danger[_ngcontent-%COMP%]{color:#f56868}"]}),e})()}];let M=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[l.Bz.forChild(P),l.Bz]}),e})(),L=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[d.ez,r.u5,r.UX,t.Pc,M]}),e})()}}]);
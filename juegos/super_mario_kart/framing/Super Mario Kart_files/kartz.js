function objLoaded(){++OBJLOADED,run.loading()}function addObjCount(){++OBJCOUNT}function sgn(t){return t?0>t?-1:1:0}window.focus();var OBJLOADED=0,OBJCOUNT=0,max_laps=4,run=function(){function t(t){addObjCount();var i=new Image;return i.onload=objLoaded,i.src=t,i}function i(t,i,e,a,n,s){this.x=0,this.y=0,this.offsetX=e,this.offsetY=a,this.width=n,this.height=s,this.alive=1,this.respawn=function(t,i){this.x=t,this.y=i,this.alive=1},this.collision=function(t,i){if(!this.alive)return!1;var e=this.x-t,a=this.y-i;return Math.sqrt(e*e+a*a)<6},this.draw=function(t,i,e,a){if(1===S)var n=40,s=300,h=200,o=-100;else var n=40,s=240,h=80,o=100;var r=64/S,c=64/S,d=this.x-e,u=this.y-a,f=(Math.sqrt(d*d+u*u),d*t+u*i),l=-(d*i)+u*t,v=T.width/2+Math.ceil(s/f*l),g=Math.ceil(n*h/f)+o,y=Math.ceil(32*(r/f)),m=Math.ceil(32*(c/f));if(!(0>y||0>m)){var p=v-y/2;b.drawImage(W,this.offsetX,this.offsetY-2,32,30,p,g-m,y,m)}}}function e(t){this.x=0,this.y=0,this.ang=0,this.offsetY=32*t,this.toPoint=0,this.tx=0,this.ty=0,this.acc=0,this.power=1,this.maxSpeed=1,this.targetAng=0,this.lap=0,this.lapdist=0,this.TAU=2*Math.PI,this.onPenalty=0,this.penaltyTime=0,this.friction=1,this.difficult=0,this.setDifficult=function(t){var i=t?.05:-.05,e=64/this.offsetY;this.difficult+=i*e,e/=12,this.difficult=Math.max(Math.min(this.difficult,e),-e)},this.setOnPenalty=function(){this.onPenalty=1,this.penaltyTime=0},this.getDistance=function(){return this.lap+this.lapdist/10},this.checkLap=function(t,i){var e=this.x-t,a=i-this.y,n=(Math.atan2(a,e)+this.TAU)%(this.TAU+.05);if(n-this.lapdist<2){if(this.lapdist>this.TAU)return this.lapdist=0,this.lap++,1;this.lapdist=Math.max(this.lapdist,n)}},this.setNextCoord=function(){var t=6.28*Math.random();this.tx=it[this.toPoint].x+22*Math.cos(t),this.ty=it[this.toPoint].y-22*Math.sin(t)},this.getNextPoint=function(){this.toPoint=(this.toPoint+1)%it.length,this.setNextCoord()},this.getArcTan=function(){var t=this.tx-this.x,i=this.y-this.ty;return Math.atan2(i,t)},this.distAchieved=function(){var t=this.x-this.tx,i=this.ty-this.y;return 800>t*t+i*i},this.setNewAngle=function(t){this.targetAng=(this.getArcTan()+2*Math.PI)%(2*Math.PI)},this.checkCoord=function(){var t=this.targetAng-this.ang;this.ang+=t,this.distAchieved()&&(this.acc*=.82,this.getNextPoint(),this.setNewAngle())},this.update=function(t){0!==t&&(this.onPenalty&&(this.penaltyTime+=60*t,this.acc*=.96,this.penaltyTime>11&&(this.onPenalty=0,this.friction=1)),this.checkCoord(),this.acc+=t*this.power,this.acc=Math.min(this.acc,this.maxSpeed+this.difficult),this.x+=Math.cos(this.ang)*this.acc*6,this.y-=Math.sin(this.ang)*this.acc*6)},this.setStartPos=function(t,i){this.x=t,this.y=i,this.toPoint=0,this.acc=0,this.lap=0,this.lapdist=0,this.onPenalty=0,this.penaltyTime=0,this.friction=1,this.difficult=0,this.setNextCoord(),this.setNewAngle(this.getArcTan()),this.ang=this.targetAng},this.setSpecs=function(t,i){this.power=.8*t,this.maxSpeed=i}}function a(t,i){switch(t){case 37:case 65:return void(Q[j]=i);case 38:case 87:return void(Q[_]=i);case 39:case 68:return void(Q[V]=i);case 40:case 83:return void(Q[z]=i);case 32:return void(Q[H]=i);case 16:return void(Q[K]=i);case 17:return void(Q[G]=i);case 77:return}}function n(t,i){return void 0===n.reset?(n.scx=0,n.scy=0,n.reset=function(){n.r=T.getBoundingClientRect()},n.getX=function(t){return n.r=T.getBoundingClientRect(),(t-n.r.left)*(T.width/d.scaleX)},n.getY=function(t){return n.r=T.getBoundingClientRect(),(t-n.r.top)*(T.height/d.scaleY)},void n.reset()):(O=n.getX(t),void(C=n.getY(i)))}function s(t,i){24>C&&O>280&&m.status>=0&&!m.showInfo&&m.click()}function h(t,i,e,a){if(1===S)var n=40,s=300,o=200,r=1;else var n=40,s=300,o=100,r=1;for(var c=0,d=0,u=0,f=0,l=0,v=0,g=0,y=0,m=0,p=0,w=1===h.skipX?T.width/2:T.width/4,x=3;100>x;x+=h.skipY){c=n*o/(x+r),g=c/s*h.skipX,l=-a*g,v=e*g,y=t+c*e-w*l,m=i+c*a-w*v;for(var M=0;M<T.width;M+=h.skipX)p=4*(x*T.width+M),f=Math.floor(m),u=Math.floor(y),0>u||u>R||0>f||f>R?(Y.data[p+0]=0,Y.data[p+1]=128,Y.data[p+2]=0,Y.data[p+3]=255):(d=4*(f*R+u)%B,Y.data[p+0]=X[d+0],Y.data[p+1]=X[d+1],Y.data[p+2]=X[d+2],Y.data[p+3]=X[d+3]),y+=l,m+=v}b.putImageData(Y,0,100)}function o(t){var i=35*t%320,e=0>i?640:320;b.drawImage(q,(e+i)%320,0,320,16,0,88,320,16)}function r(t,i,e){void 0===r.onPenalty&&(r.onPenalty=0,r.penaltyTime=0,r.setOnPenalty=function(){r.onPenalty=1,r.penaltyTime=0});var a=J-24;if(b.save(),0>i&&!r.onPenalty&&(b.scale(-1,1),a=-J-24),r.onPenalty)if(r.penaltyTime+=60*t,r.penaltyTime<12)var n=Math.floor(r.penaltyTime)%12*32;else r.onPenalty=0;else var n=0==i?0:32;b.drawImage(W,n,0,32,32,a,T.height-48+e,48,48),b.restore()}function c(t,i,e,a,n,s,h){if(1===S)var o=40,r=300,c=200,d=-100;else var o=40,r=300,c=100,d=-100;var u=65/S,f=125/S,l=s.x-a,v=s.y-n,g=(Math.sqrt(l*l+v*v),l*i+v*e),y=-(l*e)+v*i,m=T.width/2+Math.ceil(r/g*y),p=Math.ceil(o*c/g)-d,w=Math.ceil(F.width*(u/g)),x=Math.ceil(F.height*(f/g));if(!(0>w+32||0>x+32)){if(w=Math.min(w,64),x=Math.min(x,64),s.onPenalty){var M=Math.floor(s.penaltyTime)%12,I=m-w/2;b.save()}else{var P=.2618*Math.round(s.ang/.2618),A=.2618*Math.round(t/.2618),D=-P,k=D-A,O=Math.sin(k),M=Math.abs(Math.floor(k/.2618)%24);if(b.save(),M>11&&(M=23-M),0>O){b.scale(-1,1);var I=-m-w/2}else var I=m-w/2}b.drawImage(W,32*M,s.offsetY,32,32,I,p-x,w,x),b.restore()}}function d(){void 0===d.fscreen&&(d.fscreen=!1,d.scaleX=D,d.scaleY=k,d.scale=1);var t=0,i=0;if(d.scale>0){var e=U?90===Math.abs(window.orientation):1;if(e){i=window.innerHeight;var a=D/k;t=i*a,i*=d.scale,t*=d.scale}else{t=window.innerWidth;var a=k/D;i=t*a,i*=d.scale,t*=d.scale}}else t=D,i=k;d.scaleX=t,d.scaleY=i,document.body.style.width=t+"px",T.style.width=t+"px",T.style.height=i+"px";var n=document.getElementById("moregames").style,s=d.scaleX/T.width,h=d.scaleY/T.height;n.left=156*s+"px",n.top=112*h+"px",n.width=78*s+"px",n.height=17*h+"px"}function u(t){for(var i=0,e=0,a=0,n=0,s=0,h=0,o=0;4>o;++o)o!==t&&(i=et[o].x-et[t].x,e=et[o].y-et[t].y,a=Math.sqrt(i*i+e*e),12/S>a&&(h=Math.atan2(e,i),a/=2,n=Math.cos(h),s=Math.sin(h),et[o].x+=n*a,et[o].y+=s*a,et[t].x+=n*-a,et[t].y+=s*-a,et[o].acc*=.8,et[o].acc*=.8))}function f(){void 0===f.lap&&(f.lap=1,f.pos=0),f.reset=function(){f.lap=1,f.pos=0},f.menu=function(){b.drawImage(N,0,0,320,24,0,0,320,24)},f.number=function(t,i,e){b.drawImage(N,13*t,240,13,20,i,e,13,20)},f.position=function(t){f.pos!==t&&(f.pos=t),b.drawImage(N,130,240,78,20,240,24,78,20),f.number(t+1,283,24)},f.currLap=function(t){f.lap!==t&&(f.lap=Math.min(t,max_laps)),b.drawImage(N,210,240,76,20,0,24,76,20),f.number(f.lap,42,24)},f.all=function(){f.menu(),f.position(f.pos),f.currLap(f.lap),m.drawIcon()}}function l(){b.fillRect(0,0,T.width,T.height),Y=b.getImageData(0,0,T.width,T.height-50)}function v(){return void 0===v.active?(v.active=1,0):v.active?(b.drawImage(N,220,25,220,150,50,40,220,150),L&&(L=0,Math.abs(O-260)<20&&Math.abs(C-48)<15||Math.abs(O-160)<20&&Math.abs(C-175)<15)?(v.active=0,l(),f.all(),g.reset(),1):1):0}function g(t){if(void 0===g.active)return g.active=1,g.timing=-.25,g.reset=function(){g.active=void 0,g.timing=-.25},0;if(!g.active)return 0;g.timing+=t/1e3;var i=21*Math.min(Math.max(Math.floor(g.timing),0),3);return b.drawImage(N,395,175+i,45,20,130,50,67.5,30),g.timing>=3?(g.timing>5&&(b.fillRect(130,50,67.5,30),g.active=0),0):1}function y(){return void 0===y.finished?(y.finished=0,y.cpuWon=0,y.isWinnerSet=0,y.setWinner=function(t){y.isWinnerSet=1,y.cpuWon=t},y.done=function(){y.finished=1,document.getElementById("moregames").style.display="block"},y.reset=function(){y.finished=0,y.cpuWon=0,y.isWinnerSet=0,document.getElementById("moregames").style.display="none"},1):y.finished?L&&(L=0,Math.abs(C-120)<10&&O>=99&&141>=O)?(P(),0):(b.drawImage(N,0,175,180,65,70,70,180,65),b.drawImage(N,365,13*y.cpuWon,75,12,125,73,75,12),1):0}function m(){return void 0===m.status?(m.status=1,m.changed=0,m.showInfo=0,m.music={},m.click=function(){switch(++m.status,m.status-1){case 0:m.showInfo=1;break;case 1:m.music.loop=1,m.music.play();break;case 2:m.music.pause()}m.status>2&&(m.status=1),m.changed=1,v.active&&m.drawIcon()},m.loadAudio=function(){m.music=new Audio("//www.funhtml5games.com/mariokart/data/bitshift4.mp3"),m.music.addEventListener("loadeddata",function(){m.click()})},m.drawIcon=function(){if(!(m.status<0)){var t=20*m.status;b.drawImage(N,360,175+t,34,20,280,2,34,20)}},m.loadAudio(),0):m.showInfo?(b.drawImage(N,180,175,180,65,70,70,180,65),L&&(L=0,Math.abs(O-240)<20&&Math.abs(C-78)<15&&(m.showInfo=0,m.status=2,l(),f.all(),m.click())),1):m.changed?void(m.changed&&(m.changed=0,m.status>=0&&m.drawIcon())):0}function p(t){var i=Math.sqrt(t.x*t.x+t.y*t.y);t.x/=i,t.y/=i}function w(){this.cx=0,this.cy=0,this.ang=0,this.vcount=0,this.racer=new Array,this.sort=new Array,this.dir={x:0,y:0},this.vector={x:0,y:0},function(t){for(var i=0;3>i;++i)t.racer.push({id:0,dx:0,dy:0,dist:0}),t.sort.push(0)}(this),this.setCam=function(t,i,e,a,n){this.cx=t,this.cy=i,this.ang=n,this.vcount=0,this.dir.x=e,this.dir.y=a,p(this.dir),this.RAD45=Math.PI/180*120},this.findPlace=function(t){for(var i=0,e=0,i=0;e<this.vcount&&!(t<this.racer[this.sort[e]].dist);++e);i=e;for(var e=this.vcount;e>i;--e)this.sort[e]=this.sort[e-1];return this.sort[i]=this.vcount,this.vcount},this.addRacer=function(t,i,e,a){var n=this.findPlace(i);this.racer[n].id=t,this.racer[n].dist=i,this.racer[n].dx=e,this.racer[n].dy=a,++this.vcount},this.dot=function(t,i){return t.x*i.x+t.y*i.y},this.isVisible=function(t,i,e){this.vector.x=i-this.cx,this.vector.y=e-this.cy;var a=this.vector.x,n=this.vector.y;p(this.vector);var s=Math.acos(this.dot(this.vector,this.dir));if(s<this.RAD45){var h=Math.sqrt(a*a+n*n);this.addRacer(t,h,a,n)}}}function x(t){var i=6.28*Math.random();at[t].respawn(it[t+2].x+20*Math.cos(i),it[t+2].y-20*Math.sin(i))}function M(){for(var t=0;13>t;++t)x(t)}function I(){et[0].setStartPos(1640/S,1160/S),et[0].setSpecs(.8,.58),et[1].setStartPos(1750/S,1220/S),et[1].setSpecs(.8,.59),et[2].setStartPos(1640/S,1320/S),et[2].setSpecs(.96,.595),st=1750/S,ht=1370/S,ot=270*Math.PI/180,rt=0,ct=-1,dt=1,et[3].setStartPos(st,ht)}function P(){I(),g.reset(),y.reset(),l(),f.reset(),f.all()}function A(t){t=Date.now();var i=t-nt;if(nt=t,!y()&&!v()&&!m()){i=g(i)?0:.0066;var e=Q[_]-Q[z],a=Q[V]-Q[j],n=(1.036-.1*Math.abs(a))/2;e?rt+=e*i:rt/=1.02,r.onPenalty&&(dt=.94,a=0),rt=Math.max(-n,Math.min(rt,n))*dt,ot+=a*(1.23-Math.abs(rt)/3)*rt*.04;var s=Math.cos(ot),d=Math.sin(ot),l=6*s*rt,p=6*d*rt;st=Math.min(Math.max(16-16*s,st+l),R-(20+16*s)),ht=Math.min(Math.max(16-16*d,ht+p),R-(20+16*d));var w=st-32*s,x=ht-32*d;h(w,x,s,d),o(ot);var I=4*(Math.round(ht+32*d)*R+Math.round(st+32*s))%B,P=X[I+0];dt=70===P||234===P?.98:1;var T=0;et[3].x=st+16*s,et[3].y=ht+16*d,et[3].acc=rt,A.vis.setCam(st,ht,s,d,Math.atan2(d,s));for(var b=0;4>b;++b){if(3>b){et[b].update(i),A.vis.isVisible(b,et[b].x,et[b].y);var D=et[b].toPoint;if(D>=2&&15>=D){D=Math.min(D-2,12);for(var k=D;k>=Math.max(0,D-1);--k)at[k].collision(et[b].x,et[b].y)&&(et[b].setOnPenalty(),at[k].alive=0)}}et[b].checkLap(512,512)&&(et[b].lap>=max_laps&&(y.isWinnerSet||y.setWinner(3>b),3===b&&y.done()),3===b&&(T=1,M(),f.currLap(et[b].lap+1))),u(b)}st=et[3].x-16*s,ht=et[3].y-16*d,rt=et[3].acc;for(var b=0;13>b;++b)at[b].alive&&(at[b].collision(et[3].x+16*s,et[3].y+16*d)?(r.setOnPenalty(),at[b].alive=0):at[b].draw(s,d,st,ht));for(var O=0,b=A.vis.vcount-1,C=0;b>=0;--b)C=A.vis.sort[b],A.vis.racer[C].dist<6&&!O&&(O=1,r(i,a,Math.floor(t)%1.2*rt-6*rt)),c(ot,s,d,w,x,et[A.vis.racer[C].id],0);O||r(i,a,Math.floor(t)%1.2*rt-6*rt);for(var b=2,L=0;b>=0;--b){var S=et[3].getDistance()>et[b].getDistance();T&&et[b].setDifficult(S),S&&++L}if(f.position(3-L),U){Q[_]=Q[z]=Q[j]=Q[V]=0;for(var b=0;b<$.length;++b)if($[b].active){var Y=($[b].x-Z.x)/30;Q[_]=1,Math.abs(Y)>.6&&(0>Y?Q[j]=Math.abs(.7*Y):Q[V]=.7*Y)}}}window.setTimeout(A,1e3/60)}window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t,i){window.setTimeout(t,1e3/60)}}();var T=document.getElementById("canvas"),b=T.getContext("2d"),D=T.width,k=T.height,O=0,C=0,L=0,S=2;if(d(),/\d/.test(location.host)){b.font="22px Arial";var Y=b.getImageData(0,0,T.width,T.height-50),X={},E=new Image,R=0,B=0;E.onload=function(){var t=document.createElement("canvas");t.width=E.width,t.height=E.height;var i=t.getContext("2d");R=E.width,B=R*R*4,i.drawImage(E,0,0),X=i.getImageData(0,0,E.width,E.height).data,objLoaded()},addObjCount(),2===S?E.src="data/track2.png":E.src="data/track.png";for(var N=t("data/ui.png"),q=t("data/bg2.png"),F={width:64,height:32},W=t("data/racers2.png"),J=T.width/2,U=!(void 0===window.orientation),j=0,_=1,V=2,z=3,H=4,G=5,K=6,Q=[0,0,0,0,0],Z={x:-1,y:-1},$=new Array,tt=0;2>tt;++tt)$.push({active:0,x:0,y:0});for(var it=[{x:1696/S,y:544/S},{x:1504/S,y:352/S},{x:1250/S,y:352/S},{x:996/S,y:610/S},{x:796/S,y:610/S},{x:540/S,y:360/S},{x:380/S,y:400/S},{x:330/S,y:600/S},{x:362/S,y:1442/S},{x:606/S,y:1696/S},{x:864/S,y:1696/S},{x:1052/S,y:1504/S},{x:1252/S,y:1504/S},{x:1420/S,y:1696/S},{x:1620/S,y:1640/S},{x:1696/S,y:1504/S}],et=new Array,tt=0;10>tt;++tt)et.push(new e(tt+1));window.onkeydown=function(t){t.preventDefault(),a(t.keyCode,1)},window.onkeyup=function(t){a(t.keyCode,0)},T.addEventListener("mousemove",function(t){},!1),T.addEventListener("touchmove",function(t){for(var i=0,e=0,a=0;i<t.changedTouches.length;++i){if(i>1)return;e=n.getX(t.touches[i].pageX),a=t.changedTouches[i].identifier,$[0].x=e,$[0].y=n.getY(t.touches[i].pageY)}},!1),T.addEventListener("mousedown",function(t){n(t.clientX,t.clientY),L=1,s()}),T.addEventListener("touchstart",function(t){t.preventDefault();for(var i=0;i<t.changedTouches.length;++i){t.changedTouches[i].identifier;$[0].active=1,O=$[0].x=Z.x=n.getX(t.changedTouches[i].pageX),C=$[0].y=Z.y=n.getY(t.changedTouches[i].pageY)}L=1,s()}),T.addEventListener("mouseup",function(t){t.preventDefault(),L=0}),T.addEventListener("touchend",function(t){t.preventDefault();for(var i=0;i<t.changedTouches.length;++i){t.changedTouches[i].identifier;$[0].active=0}L=0}),window.addEventListener("orientationchange",function(){menu.active=1},!1);for(var at=new Array,tt=0;13>tt;++tt)at.push(new i(0,0,0,130,32,30)),x(tt);var nt=0,st=1750/S,ht=1320/S,ot=270*Math.PI/180,rt=0,ct=-1,dt=1;run.loading=function(){if(b.fillStyle="#FFF",b.fillText("Loading",.5*T.width-40,.5*T.height-10),b.fillStyle="#FF0000",b.fillRect(82,102,156,12),!(OBJCOUNT>OBJLOADED))return m(),d(),b.fillStyle="#444499",b.fillRect(0,0,T.width,T.height),n(0,0),f(),h.skipY=1,h.skipX=1,A.vis=new w,A(0),g(),void P(),window.onresize=d;var t=156*(OBJLOADED/OBJCOUNT);b.fillStyle="#DDDD00",b.fillRect(82,102,t,12)}}};
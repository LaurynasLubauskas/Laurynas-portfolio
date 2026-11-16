// Lubauskas Studio — hero 3D dot-wave background
/* hero: 3D dot-wave field */
(()=>{const c=$('#waves'),cx=c.getContext('2d');let W,H,t=0,mxn=0,myn=0,tmx=0,tmy=0;const mob=innerWidth<700,COLS=mob?52:96,ROWS=mob?34:52;
const size=()=>{const d=Math.min(devicePixelRatio||1,2);W=c.clientWidth;H=c.clientHeight;c.width=W*d;c.height=H*d;cx.setTransform(d,0,0,d,0,0)};
size();addEventListener('resize',size);
addEventListener('pointermove',e=>{tmx=e.clientX/innerWidth*2-1;tmy=e.clientY/innerHeight*2-1});
const draw=()=>{if(scrollY<innerHeight*1.1){mxn+=(tmx-mxn)*.05;myn+=(tmy-myn)*.05;cx.clearRect(0,0,W,H);
  const fov=W*.8,camY=-(H*.55)-myn*40,horizon=H*.18;
  for(let r=0;r<ROWS;r++){const z=60+r*40;
    for(let k=0;k<COLS;k++){const u=k/(COLS-1)*2-1,X=u*W*1.1,d=Math.hypot(u-mxn*.9,(r/ROWS)-.35);
      const Y=Math.sin(u*3.2+t*.9+r*.22)*38+Math.cos(r*.35-t*.7)*30+Math.sin((u+r*.05)*6-t*1.4)*10-Math.exp(-d*d*9)*90;
      const sc=fov/(fov+z),px=W/2+(X-mxn*60)*sc,py=horizon+(Y-camY)*sc;if(px<-10||px>W+10||py>H+10)continue;
      const a=Math.min(1,(1-r/ROWS)*1.25)*(.25+.75*Math.min(1,(Y+80)/140));
      cx.fillStyle=`rgba(245,245,247,${Math.max(.04,a*.8)})`;const s=Math.max(.6,2.4*sc);cx.fillRect(px,py,s,s)}}
  t+=reduce?0:.016}requestAnimationFrame(draw)};draw()})();

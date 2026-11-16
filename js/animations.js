// Lubauskas Studio — preloader, scroll reveals, ticker, hover effects
/* rolling text */
$$('[data-roll]').forEach(a=>{const t=a.textContent;a.innerHTML=`<span class="roll"><span>${t}</span><span aria-hidden="true">${t}</span></span>`});

/* word splitting for blur-in */
const splitWords=el=>{let i=0;const walk=n=>{[...n.childNodes].forEach(c=>{
  if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p))f.append(p);else{const s=document.createElement('span');s.className='w';s.style.setProperty('--i',i++);s.textContent=p;f.append(s)}});c.replaceWith(f)}
  else if(c.nodeType===1&&c.tagName!=='EM')walk(c);else if(c.tagName==='EM'){c.classList.add('w');c.style.setProperty('--i',i++)}})};walk(el)};
$$('.bw').forEach(splitWords);

/* vision scroll highlight */
const v=$('#vision');v.innerHTML=v.textContent.split(' ').map(w=>`<span class="w">${w}</span>`).join(' ');const vw=$$('.w',v);

/* giant letters */
const g=$('#giant');g.innerHTML=[...g.textContent].map((c,i)=>`<span class="${c==='.'?'dot':''}" style="--i:${i}">${c}</span>`).join('');

/* counters */
const count=b=>{const end=+b.dataset.count,dec=+(b.dataset.dec||0),s=b.dataset.suffix||'',t0=performance.now();
  const step=n=>{const k=Math.min(1,(n-t0)/1600),val=end*(1-Math.pow(1-k,4));b.textContent=val.toFixed(dec)+s;if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)};

/* reveals */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');
  const b=t.querySelector('[data-count]');if(b)count(b);io.unobserve(t)}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
const observeAll=()=>$$('.fu:not(.hero-anim),.bw,#giant,#ticker').forEach(el=>io.observe(el));

/* preloader: letters in + counter → column wipe */
const lw=$('#loadword');lw.innerHTML=[...lw.textContent].map((c,i)=>`<span style="transition-delay:${i*35}ms">${c}</span>`).join('');
const start=()=>{const L=$('#loader'),num=$('#lnum'),bar=$('#lbar'),dur=reduce?0:1400,t0=performance.now();
  requestAnimationFrame(()=>L.classList.add('in'));
  const step=n=>{const k=dur?Math.min(1,(n-t0)/dur):1,v=Math.round((1-Math.pow(1-k,3))*100);num.textContent=v+'%';bar.style.width=v+'%';
    if(k<1)return requestAnimationFrame(step);
    setTimeout(()=>{L.classList.add('out');document.body.classList.remove('loading');unlockScroll();document.body.classList.add('ready');
      $$('.hero-anim').forEach(el=>el.classList.add('in'));observeAll();
      setTimeout(()=>document.body.classList.add('settled'),1600);setTimeout(()=>L.remove(),1500)},reduce?0:250)};
  requestAnimationFrame(step)};
document.fonts?document.fonts.ready.then(start):addEventListener('load',start);

/* typed words */
const words=['websites','landing pages','web apps','online stores'];let wi=0;const ty=$('#typed');
(async()=>{if(reduce)return;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  while(true){await sleep(2200);const w=ty.textContent;for(let i=w.length;i>=0;i--){ty.textContent=w.slice(0,i);await sleep(40)}
    wi=(wi+1)%words.length;const n=words[wi];for(let i=1;i<=n.length;i++){ty.textContent=n.slice(0,i);await sleep(70)}}})();

/* marquee */
const mq=$('#mq');mq.innerHTML+=mq.innerHTML;


/* scroll-linked effects */
const hm=$('#heroMedia'),hc=$('#heroC'),nav=$('#nav');let lastY=0;
const onScroll=()=>{const y=scrollY,h=innerHeight,p=Math.min(1,y/h);
  hm.style.transform=`translateY(${p*h*.3}px) scale(${1+p*.1})`;hm.style.opacity=1-p*.7;hc.style.transform=`translateY(${p*-70}px)`;hc.style.opacity=1-p*1.2;
  const r=v.getBoundingClientRect(),q=Math.min(1,Math.max(0,(h*.85-r.top)/(r.height+h*.35))),n=Math.round(q*vw.length);vw.forEach((w,i)=>w.classList.toggle('on',i<n));
  nav.classList.toggle('hide',y>lastY+2&&y>h*.6&&!document.body.classList.contains('menu-open'));if(y<lastY-2)nav.classList.remove('hide');nav.classList.toggle('scrolled',y>40);
  $('#navProg').style.transform=`scaleX(${y/(document.documentElement.scrollHeight-h)})`;spy();lastY=y};
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* infinite draggable ticker */
const tk=$('#ticker'),ul=$('#tickerList');ul.innerHTML+=ul.innerHTML.replace(/<li /g,'<li aria-hidden="true" ');
let x=0,speed=.6,target=.6,dragging=false,sx=0,sxv=0,moved=false,vel=0,last=0;
tk.addEventListener('mouseenter',()=>target=.15);tk.addEventListener('mouseleave',()=>target=.6);
tk.addEventListener('pointerdown',e=>{dragging=true;moved=false;sx=e.clientX;sxv=x;last=e.clientX;tk.classList.add('drag');tk.setPointerCapture(e.pointerId)});
tk.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-sx;if(Math.abs(dx)>4)moved=true;vel=e.clientX-last;last=e.clientX;x=sxv-dx});
const end=()=>{if(!dragging)return;dragging=false;tk.classList.remove('drag');speed=-vel*.6};
tk.addEventListener('pointerup',end);tk.addEventListener('pointercancel',end);
tk.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation()}},true);
const loop=()=>{if(!dragging&&!reduce){speed+=(target-speed)*.04;x+=speed}const H=ul.scrollWidth/2;if(H)x=((x%H)+H)%H;ul.style.transform=`translate3d(${-x}px,0,0)`;requestAnimationFrame(loop)};loop();

/* spotlight + tilt on panels */
$$('.svc,.tcard,.cta').forEach(c=>{const tilt=!c.classList.contains('svc'),big=c.classList.contains('cta');
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;c.style.setProperty('--mx',px+'px');c.style.setProperty('--my',py+'px');
    if(tilt&&!reduce&&(big||c.classList.contains('in')))c.style.transform=`perspective(${big?1600:900}px) rotateX(${(py/r.height-.5)*(big?-2:-4)}deg) rotateY(${(px/r.width-.5)*(big?2:4)}deg)`});
  c.addEventListener('pointerleave',()=>{if(tilt)c.style.transform=''})});

/* magnetic buttons */
$$('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{if(reduce)return;const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.2}px ${(e.clientY-r.top-r.height/2)*.3}px`});b.addEventListener('pointerleave',()=>b.style.translate='')});



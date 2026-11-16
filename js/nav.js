// Lubauskas Studio — nav pill, active section, smooth scrolling (Lenis) & mobile menu
/* nav: sliding hover pill + active section */
const nl=$('#navLinks'),pill=$('#navPill'),links=$$('a',nl);let activeLink=null;
const movePill=a=>{if(!a){pill.style.opacity=0;return}pill.style.left=a.offsetLeft+'px';pill.style.width=a.offsetWidth+'px';pill.style.opacity=1};
links.forEach(a=>a.addEventListener('mouseenter',()=>movePill(a)));
nl.addEventListener('mouseleave',()=>movePill(activeLink));
const secs=links.map(a=>$('#'+a.dataset.sec));
function spy(){const mid=innerHeight*.4;let cur=null;secs.forEach((s,i)=>{if(!s)return;const r=s.getBoundingClientRect();if(r.top<mid&&r.bottom>mid)cur=links[i]});
  if(cur!==activeLink){links.forEach(l=>l.classList.toggle('active',l===cur));activeLink=cur;if(!nl.matches(':hover'))movePill(cur)}}

/* smooth scrolling (Lenis) + anchor links + mobile menu */
let lenis=null;
if(!reduce&&window.Lenis){lenis=new Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true});
  const rf=t=>{lenis.raf(t);requestAnimationFrame(rf)};requestAnimationFrame(rf);lenis.stop();}
const unlockScroll=()=>{lenis&&lenis.start()};
const navEl=$('#nav'),mb=$('#menuBtn');
const setMenu=o=>{document.body.classList.toggle('menu-open',o);mb.setAttribute('aria-expanded',o);if(lenis)o?lenis.stop():lenis.start()};
mb.onclick=()=>setMenu(!document.body.classList.contains('menu-open'));
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');const t=id==='#top'?0:$(id);if(t===null)return;e.preventDefault();
  setMenu(false);
  if(lenis)lenis.scrollTo(t,{offset:id==='#top'?0:-20,duration:1.4});else scrollTo({top:t===0?0:t.getBoundingClientRect().top+scrollY-20,behavior:'smooth'})}));
$('.totop').onclick=()=>lenis?lenis.scrollTo(0,{duration:1.6}):scrollTo({top:0,behavior:'smooth'});


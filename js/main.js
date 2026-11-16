// Lubauskas Studio — shared helpers, clock & FAQ
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* clock */
const tick=()=>{const t=new Date().toLocaleTimeString('en-GB',{timeZone:'Europe/Luxembourg'});$('#clock').textContent=t;$('#clock2').textContent=t.slice(0,5)};
tick();setInterval(tick,1000);$('#yr').textContent=new Date().getFullYear();

/* FAQ */
const faqs=[
 ["What does your process look like?","A quick call to understand your goals, a design you approve, then development, testing on every device, and launch. You're kept in the loop at every step."],
 ["Do you only work with startups?","No — I work with startups, established brands, agencies and individuals. What matters is a clear goal and a willingness to collaborate."],
 ["How long does a typical project take?","A landing page usually takes 1–2 weeks, a full website 3–6 weeks. I'll give you a precise timeline after our first call."],
 ["Can I update the site myself?","Yes — I can set up an easy way for you to edit text and images, or handle updates for you."],
 ["What do you build websites with?","Hand-written HTML, CSS and JavaScript, or React / Next.js for larger projects — chosen to fit what your site needs."],
 ["What if I'm not sure what I need?","Just reach out. We'll talk through your goals and I'll recommend the right scope — no commitment needed."]
];
$('#faqs').innerHTML=faqs.map(([q,a],i)=>`<div class="qa fu" style="--y:25px;--d:${i*70}ms"><button aria-expanded="false">${q}<span class="pm"></span></button><div class="ans"><div>${a}</div></div></div>`).join('');
$$('.qa').forEach(el=>{const b=$('button',el);b.onclick=()=>{const o=!el.classList.contains('open');$$('.qa.open').forEach(x=>{x.classList.remove('open');$('button',x).setAttribute('aria-expanded',false)});el.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}});


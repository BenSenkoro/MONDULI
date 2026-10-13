// ---- Editable content (swap in real photos in assets/images/) ----
const I='assets/images/';
const PROJECTS=[
{t:'Robotics and Innovation',f:'innovation',c:'Innovation',img:'robotics.jpg',alt:'Pupils building a small educational robot',d:'Pupils assemble and program simple robots.',l:'Pupils assemble and program simple robots, learning logic, patience and teamwork.',s:['Problem-solving','Logic','Teamwork']},
{t:'Agriculture and Gardening',f:'agriculture',c:'Agriculture',img:'gardening.jpg',alt:'Pupils planting seedlings',d:'Planting and caring for a school garden.',l:'Pupils plant seedlings, track growth and learn where food comes from.',s:['Responsibility','Observation','Care for nature']},
{t:'Sewing and Fashion',f:'creative',c:'Creative Skills',img:'sewing.jpg',alt:'Fabric and sewing equipment',d:'Designing and making simple clothing.',l:'Pupils design and stitch simple items, building fine motor skills and creativity.',s:['Creativity','Fine motor skills','Design']},
{t:'Baking and Food Preparation',f:'creative',c:'Creative Skills',img:'baking.jpg',alt:'Supervised baking activity',d:'Safe, supervised food preparation.',l:'Supervised baking teaches measuring, hygiene and following instructions.',s:['Measurement','Hygiene','Following steps']},
{t:'Student Shop and Entrepreneurship',f:'entrepreneurship',c:'Entrepreneurship',img:'shop.jpg',alt:'A small student-run shop display',d:'Running a small school shop.',l:'Pupils price, display and sell products, learning money skills and communication.',s:['Numeracy','Communication','Enterprise']},
{t:'Science and Creative Experiments',f:'science',c:'Science',img:'science.jpg',alt:'Pupils doing a supervised experiment',d:'Hands-on supervised experiments.',l:'Pupils predict, test and explain results in simple experiments.',s:['Curiosity','Reasoning','Safety']}];
const NEWS=[
{t:'Sample: Admissions Enquiries Open',f:'Admissions',img:'news-1.jpg',alt:'Welcoming school entrance',d:'Demonstration article.',l:'Sample content only. Replace with an official announcement.'},
{t:'Sample: Learning by Doing Showcase',f:'Events',img:'news-2.jpg',alt:'Pupils presenting projects',d:'Demonstration article.',l:'Sample content only. Replace with a verified event report.'},
{t:'Sample: Sports Day Preparations',f:'Events',img:'news-3.jpg',alt:'Pupils at sports practice',d:'Demonstration article.',l:'Sample content only.'},
{t:'Sample: Notice to Parents',f:'Announcements',img:'news-4.jpg',alt:'Teacher speaking with parents',d:'Demonstration article.',l:'Sample content only.'}];
const GALLERY=[['School Environment','school-1.jpg','School grounds'],['School Environment','school-2.jpg','Classroom building'],['School Environment','school-3.jpg','Outdoor learning area'],
['Classroom Learning','class-1.jpg','Pupils reading'],['Classroom Learning','class-2.jpg','Group work'],['Classroom Learning','class-3.jpg','Teacher with pupils'],
['Student Projects','robotics.jpg','Robotics'],['Student Projects','gardening.jpg','Gardening'],['Student Projects','science.jpg','Science experiment'],
['Sports and Activities','sport-1.jpg','Team games'],['Sports and Activities','sport-2.jpg','Running race'],['Events and Celebrations','event-1.jpg','School celebration']];
// ---- helpers ----
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
function pic(src,alt,cls='pic'){const i=new Image();i.src=I+src;i.alt=alt;i.className=cls;i.loading='lazy';
 i.onerror=()=>{const d=document.createElement('div');d.className='ph '+cls;d.textContent='Photo to be added: '+alt;i.replaceWith(d)};return i}
function filters(host,list,render){const cats=['All',...new Set(list.map(x=>x.cat))];
 const bar=document.createElement('div');bar.className='filters';host.before(bar);
 const run=c=>{host.innerHTML='';const r=list.filter(x=>c=='All'||x.cat==c);r.forEach(x=>host.append(render(x)));
  if(!r.length)host.innerHTML='<p>No items match this filter.</p>';$$('button',bar).forEach(b=>b.setAttribute('aria-pressed',b.textContent==c))};
 cats.forEach(c=>{const b=document.createElement('button');b.textContent=c;b.onclick=()=>run(c);bar.append(b)});run('All')}
function dlg(){let d=$('#dlg');if(!d){d=document.createElement('dialog');d.id='dlg';d.setAttribute('aria-label','Details');document.body.append(d);
 d.addEventListener('click',e=>{if(e.target==d)d.close()})}return d}
function openDlg(img,alt,html){const d=dlg();d.innerHTML='<button class="btn dk x" aria-label="Close">Close</button>';$('.x',d).onclick=()=>d.close();
 d.append(pic(img,alt));const b=document.createElement('div');b.className='body';b.innerHTML=html;d.append(b);d.showModal()}
// ---- init ----
document.addEventListener('DOMContentLoaded',()=>{
 $('#menu').onclick=e=>{const n=$('nav'),o=n.classList.toggle('open');e.target.setAttribute('aria-expanded',o)};
 $$('nav a').forEach(a=>{a.onclick=()=>$('nav').classList.remove('open');if(a.getAttribute('href')==location.pathname.split('/').pop()||(a.getAttribute('href')=='index.html'&&!location.pathname.split('/').pop()))a.classList.add('on')});
 $$('.yr').forEach(e=>e.textContent=new Date().getFullYear());
 $$('img[data-p]').forEach(i=>i.replaceWith(pic(i.dataset.p,i.alt,i.className)));
 const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')));$$('.rv').forEach(e=>io.observe(e));
 const t=$('#top');if(t){onscroll=()=>t.style.display=scrollY>600?'block':'none';t.onclick=()=>scrollTo({top:0})}
 const card=(x,fn)=>{const b=document.createElement('button');b.className='card';b.append(pic(x.img,x.alt));
  b.insertAdjacentHTML('beforeend',`<div class="body"><span class="tag">${x.c||x.f}</span><h3>${x.t}</h3><p>${x.d}</p>${x.s?'<small>Skills: '+x.s.join(', ')+'</small>':''}<p><b>${fn}</b></p></div>`);return b};
 const ph=$("#projects-home");if(ph){PROJECTS.slice(0,3).forEach(p=>{const b=document.createElement("a");b.className="card";b.href="student-projects.html";b.style.textDecoration="none";b.append(pic(p.img,p.alt));b.insertAdjacentHTML("beforeend",`<div class="body"><span class="tag">${p.c}</span><h3>${p.t}</h3><p>${p.d}</p></div>`);ph.append(b)})}
 const pj=$("#projects");if(pj){const L=PROJECTS.map(p=>({...p,cat:p.c}));
  filters(pj,L,p=>{const b=card(p,'View Project');b.onclick=()=>openDlg(p.img,p.alt,`<span class="tag">${p.c}</span><h2>${p.t}</h2><p>${p.l}</p><p><b>Skills:</b> ${p.s.join(', ')}</p><p class="note">Illustrative example, not a confirmed school project.</p>`);return b})}
 const nw=$('#news');if(nw){const L=NEWS.map(n=>({...n,cat:n.f}));
  filters(nw,L,n=>{const b=card(n,'Read More');b.onclick=()=>openDlg(n.img,n.alt,`<span class="tag">${n.f}</span><h2>${n.t}</h2><p>${n.l}</p>`);return b})}
 const gl=$('#gallery');if(gl){const L=GALLERY.map((g,i)=>({cat:g[0],img:g[1],alt:g[2],i}));let cur=[],ix=0;
  const show=()=>{const g=cur[ix];openDlg(g.img,g.alt,`<p>${g.alt} <small>(${ix+1}/${cur.length}) Illustrative stock photo.</small></p><button class="btn dk" id="pv">Previous</button> <button class="btn" id="nx">Next</button>`);
   $('#pv').onclick=()=>{ix=(ix-1+cur.length)%cur.length;show()};$('#nx').onclick=()=>{ix=(ix+1)%cur.length;show()}};
  filters(gl,L,g=>{const b=document.createElement('button');b.className='card';b.append(pic(g.img,g.alt));b.insertAdjacentHTML('beforeend',`<div class="body">${g.alt}</div>`);
   b.onclick=()=>{cur=L.filter(x=>!$('.filters [aria-pressed=true]').textContent.match(/^(?!All)/)||x.cat==$('.filters [aria-pressed=true]').textContent||$('.filters [aria-pressed=true]').textContent=='All');ix=cur.indexOf(g);if(ix<0)ix=0;show()};return b})}
 $$('form[data-demo]').forEach(f=>f.onsubmit=e=>{e.preventDefault();let bad=0;$$('.err,.ok',f).forEach(x=>x.remove());
  $$('[required]',f).forEach(i=>{if(!i.value.trim()){bad++;i.insertAdjacentHTML('afterend','<div class="err" role="alert">This field is required.</div>')}});
  if(!bad){f.insertAdjacentHTML('beforeend','<div class="ok" role="status">Demonstration only: this form does not send anything to the school.</div>');f.reset()}});
});

document.addEventListener('DOMContentLoaded',()=>{const sl=$$('.slide');if(!sl.length)return;let i=0,t;
 const go=n=>{sl[i].classList.remove('on');i=(n+sl.length)%sl.length;sl[i].classList.add('on')};
 const start=()=>{if(!matchMedia('(prefers-reduced-motion:reduce)').matches)t=setInterval(()=>go(i+1),6000)};
 $('.pv').onclick=()=>go(i-1);$('.nx').onclick=()=>go(i+1);
 const box=$('.slider');box.onmouseenter=()=>clearInterval(t);box.onmouseleave=start;box.onfocusin=()=>clearInterval(t);start()});

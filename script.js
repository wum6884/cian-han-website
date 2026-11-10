const $=(s,r=document)=>r.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const META={'Residential RO Systems':['Residential RO System','Household water purification'],'Commercial RO Systems':['Commercial RO System','Commercial and professional water purification'],'Water Filter Systems':['Water Filter System','Point-of-use and multi-stage filtration'],'Filter Cartridges':['Filter Cartridge','Replacement filtration for housings and RO systems'],'Filter Housings':['Filter Housing','Cartridge and membrane housing'],'Faucets':['Faucet / Component','Point-of-use drinking-water installation']};
/* menu */
const menuToggle=$('.menu-toggle'),siteNav=$('.site-nav');
if(menuToggle&&siteNav){const close=()=>{siteNav.classList.remove('is-open');menuToggle.setAttribute('aria-expanded','false')};menuToggle.onclick=()=>{const o=siteNav.classList.toggle('is-open');menuToggle.setAttribute('aria-expanded',o)};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&siteNav.classList.contains('is-open')){close();menuToggle.focus()}});siteNav.addEventListener('click',e=>{if(e.target.closest('a'))close()})}
/* current page */
(()=>{const cur=document.body.dataset.page==='detail'?'products.html':(location.pathname.split('/').pop()||'index.html');document.querySelectorAll('.site-nav a,.footer-links a').forEach(a=>{const h=a.getAttribute('href');if(h&&!h.includes('#')&&!a.classList.contains('nav-quote')&&h===cur)a.setAttribute('aria-current','page')})})();
/* broken image fallback */
document.addEventListener('error',e=>{const t=e.target;if(t.tagName==='IMG'&&!t.dataset.failed){t.dataset.failed=1;const s=document.createElement('span');s.className='img-missing';s.textContent='Preview unavailable';t.replaceWith(s)}},true);
function card(p,i){return `<a class="product-card" href="product.html?i=${i}" data-q="${esc((p.title+' '+p.category).toLowerCase())}"><div class="image-frame">${p.image?`<img src="${p.image}" alt="${esc(p.title)}" loading="lazy">`:'<span class="img-missing">Preview unavailable</span>'}</div><div class="product-info"><div class="product-code">${esc(p.category)}</div><h3>${esc(p.title)}</h3><p>View product details →</p></div></a>`}
/* home: featured model chips link to detail pages */
document.querySelectorAll('.model-list span').forEach(s=>{const j=PRODUCT_DATA.findIndex(p=>p.title===s.textContent.trim());if(j>-1){const a=document.createElement('a');a.href=`product.html?i=${j}`;a.textContent=s.textContent;s.replaceWith(a)}});
/* catalog */
if(document.body.dataset.page==='products'){
const nav=$('#catalog-nav'),content=$('#catalog-content'),g={};
PRODUCT_DATA.forEach((p,i)=>(g[p.category]??=[]).push({...p,i}));
Object.entries(g).forEach(([cat,items])=>{const id=items[0].category_slug;
nav.insertAdjacentHTML('beforeend',`<a href="#${id}" data-target="${id}">${esc(cat)} <small>${items.length}</small></a>`);
content.insertAdjacentHTML('beforeend',`<section class="catalog-section" id="${id}"><div class="container"><p class="section-label">${items.length} PRODUCTS</p><h2>${esc(cat)}</h2><p>${esc(items[0].description)}</p><div class="product-grid">${items.map(x=>card(x,x.i)).join('')}</div></div></section>`)});
const input=$('#catalog-search'),count=$('#catalog-count'),empty=$('#catalog-empty');
const run=()=>{const q=input.value.trim().toLowerCase();let total=0;document.querySelectorAll('.catalog-section').forEach(sec=>{let v=0;sec.querySelectorAll('.product-card').forEach(c=>{const m=!q||c.dataset.q.includes(q);c.hidden=!m;if(m)v++});sec.hidden=!v;total+=v;const l=nav.querySelector(`[data-target="${sec.id}"]`);if(l)l.hidden=!v});count.textContent=q?`${total} result${total===1?'':'s'}`:`${PRODUCT_DATA.length} products`;empty.hidden=total>0};
const q0=new URLSearchParams(location.search).get('q');if(q0)input.value=q0;
input.addEventListener('input',run);run();
if(location.hash){const t=document.getElementById(location.hash.slice(1));t&&t.scrollIntoView()}
if('IntersectionObserver' in window){const links=[...nav.querySelectorAll('a')];const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.removeAttribute('aria-current'));const l=nav.querySelector(`[data-target="${e.target.id}"]`);l&&l.setAttribute('aria-current','true')}}),{rootMargin:'-20% 0px -70% 0px'});document.querySelectorAll('.catalog-section').forEach(s=>io.observe(s))}}
/* detail */
if(document.body.dataset.page==='detail'){
const raw=Number(new URLSearchParams(location.search).get('i')),idx=PRODUCT_DATA[raw]?raw:0,p=PRODUCT_DATA[idx];
document.title=`${p.title} | CIAN HAN`;const md=$('meta[name=description]');md&&md.setAttribute('content',`${p.title}, ${p.category} from CIAN HAN. Request a quote or ask about OEM / ODM.`);
const gallery=[...new Set((p.gallery||[p.image]).filter(Boolean))],[type,use]=META[p.category]||[p.category,'Water purification'];
const overview=p.title==='RO-102'?'RO-102 is a residential reverse osmosis system from CIAN HAN, developed for household water purification applications.':p.description;
const rel=PRODUCT_DATA.map((x,j)=>({...x,i:j})).filter(x=>x.category===p.category&&x.i!==idx).sort((a,b)=>Math.abs(a.i-idx)-Math.abs(b.i-idx)).slice(0,4);
$('#detail').innerHTML=`<div class="container"><a class="back-link" href="products.html#${p.category_slug}">← Back to ${esc(p.category)}</a><div class="detail-grid"><div><div class="detail-image">${gallery[0]?`<img id="detail-main" src="${gallery[0]}" alt="${esc(p.title)}">`:'<span class="img-missing">Preview unavailable</span>'}</div>${gallery.length>1?`<div class="detail-thumbs">${gallery.map((s,k)=>`<button type="button" class="${k?'':'is-active'}" data-src="${s}" aria-label="Show image ${k+1} of ${gallery.length}"><img src="${s}" alt=""></button>`).join('')}</div>`:''}</div><div class="detail-copy"><p class="section-label">${esc(p.category)}</p><h1>${esc(p.title)}</h1><h2>Product Overview</h2><p>${esc(overview)}</p><div class="detail-meta"><div><span>Model</span><strong>${esc(p.title)}</strong></div><div><span>Product Category</span><strong>${esc(type)}</strong></div><div><span>Application</span><strong>${esc(use)}</strong></div></div><div class="detail-actions"><a class="btn contact-button" href="contact.html?product=${encodeURIComponent(p.title)}#inquiry">Request a Quote →</a><a class="btn btn-outline" href="oem.html">OEM / ODM</a></div></div></div>${rel.length?`<div class="related"><h2>More in ${esc(p.category)}</h2><div class="product-grid">${rel.map(x=>card(x,x.i)).join('')}</div></div>`:''}</div>`;
const th=$('.detail-thumbs');th&&th.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;th.querySelectorAll('button').forEach(x=>x.classList.toggle('is-active',x===b));$('#detail-main').src=b.dataset.src})}
/* inquiry form (opens the visitor's email app) */
const form=$('#inquiry-form');
if(form){const dl=$('#model-list');dl&&(dl.innerHTML=['PU-T01','A10S',...PRODUCT_DATA.map(p=>p.title)].map(t=>`<option value="${esc(t)}">`).join(''));
const pr=new URLSearchParams(location.search).get('product');if(pr)form.elements.product.value=pr;
form.addEventListener('submit',e=>{e.preventDefault();const f=form.elements,v=n=>f[n].value.trim();const body=[`Name: ${v('name')}`,`Company: ${v('company')}`,`Email: ${v('email')}`,`Product / model: ${v('product')}`,`Quantity: ${v('quantity')}`,'',v('message')].join('\n');$('#inquiry-status').hidden=false;location.href=`mailto:cianhan.tw@gmail.com?subject=${encodeURIComponent('CIAN HAN Inquiry'+(v('product')?' - '+v('product'):''))}&body=${encodeURIComponent(body)}`})}

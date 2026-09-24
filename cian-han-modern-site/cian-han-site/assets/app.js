const products=[
['Residential RO Systems','RO','Compact and under-sink reverse osmosis solutions for residential applications.','Residential RO'],
['Commercial RO Systems','RO','Higher-capacity purification systems for commercial and professional applications.','Commercial RO'],
['Filter Housings','FH','Standard, Big Blue and double O-ring housings for dependable cartridge filtration.','Filter Housings'],
['Filter Cartridges','FC','PP, carbon and RO filtration components for water treatment systems.','Filter Cartridges'],
['Water Purifier Components','CP','Core components for system builders, distributors and OEM customers.','Components'],
['SA-10S Smart RO Purifier','SA','Premium countertop / under-sink RO platform with multi-stage filtration and monitoring.','Featured']
];
const grid=document.querySelector('#productGrid');grid.innerHTML=products.map(p=>`<article class="product"><div class="pic">${p[1]}</div><h3>${p[0]}</h3><p>${p[2]}</p><a href="#contact" data-product="${p[0]}">Request information →</a></article>`).join('');
document.querySelectorAll('[data-product]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();location.href='mailto:oneil@cianhan.com.tw?subject='+encodeURIComponent('Product inquiry - '+a.dataset.product)}));
document.querySelector('#lang').onclick=()=>alert('Bilingual content can be expanded page-by-page. The current launch version is English-first for international B2B buyers.');

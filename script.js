// elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sections = document.querySelectorAll('section');
const copyButtons = document.querySelectorAll('.copy');
const scrollTopBtn = document.getElementById('scrollTopBtn');

// filter function
function applyFilter(){
  const q = (searchInput.value||'').toLowerCase().trim();
  const cat = categoryFilter.value;

  let anyVisible = false;
  sections.forEach(sec=>{
    const cards = Array.from(sec.querySelectorAll('.card'));
    let visibleInSection = 0;
    cards.forEach(card=>{
      const title = (card.querySelector('.card-link')?.textContent||'').toLowerCase();
      const desc = (card.querySelector('.desc')?.textContent||'').toLowerCase();
      const matchesQ = !q || title.includes(q) || desc.includes(q);
      const matchesC = !cat || sec.dataset.category === cat;
      const show = matchesQ && matchesC;
      card.style.display = show ? '' : 'none';
      if(show) visibleInSection++;
    });
    sec.style.display = visibleInSection>0 ? '' : 'none';
    anyVisible = anyVisible || visibleInSection>0;
  });
}

// copy buttons
copyButtons.forEach(btn=>{
  btn.addEventListener('click', e=>{
    const url = btn.dataset.url;
    navigator.clipboard.writeText(url).then(()=>{
      const old = btn.textContent;
      btn.textContent = 'تم النسخ';
      setTimeout(()=> btn.textContent = old, 1200);
    }).catch(()=> alert('تعذر النسخ آليًا. يمكنك نسخه يدويًا:\n'+url));
  });
});

// reveal animation on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      ent.target.classList.add('show');
      io.unobserve(ent.target);
    }
  });
},{threshold: .12});
document.querySelectorAll('.card').forEach(c=>io.observe(c));

// events
searchInput.addEventListener('input', applyFilter);
categoryFilter.addEventListener('change', applyFilter);

// scroll-to-top
window.addEventListener('scroll', ()=> {
  scrollTopBtn.style.display = window.scrollY > 220 ? 'block' : 'none';
});
scrollTopBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

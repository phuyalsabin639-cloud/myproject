const services=[
 {number:'01',icon:'⌁',title:'Digital marketing',tag:'Growth',copy:'Campaigns that turn attention into qualified demand.'},
 {number:'02',icon:'⌖',title:'SEO & growth',tag:'Visibility',copy:'Search strategy that compounds long after launch day.'},
 {number:'03',icon:'✳',title:'Graphic design',tag:'Identity',copy:'Visual systems that make your point of view unmistakable.'},
 {number:'04',icon:'◈',title:'Video editing',tag:'Motion',copy:'Stories with the pace, feeling and clarity people remember.'},
 {number:'05',icon:'◎',title:'Social media',tag:'Community',copy:'A useful, distinctive presence built for real connection.'},
 {number:'06',icon:'▦',title:'Website development',tag:'Digital',copy:'Fast, flexible websites designed to earn the next click.'},
 {number:'07',icon:'⌘',title:'App development',tag:'Product',copy:'Reliable mobile products that make complex things simple.'}
];
const projects=[
 {title:'Mero Market',kind:'Brand & digital experience',type:'brand',metric:'+68% repeat visits',image:'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1100&q=85'},
 {title:'Karma Coffee',kind:'Growth & SEO',type:'growth',metric:'3.2× organic traffic',image:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1100&q=85'},
 {title:'Sajilo Finance',kind:'Digital product',type:'digital',metric:'42k active users',image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1100&q=85'},
 {title:'Studio Katha',kind:'Brand & design',type:'brand',metric:'From local to loved',image:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=85'},
 {title:'Aarogya',kind:'Growth & SEO',type:'growth',metric:'+114% qualified leads',image:'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1100&q=85'},
 {title:'Khetipati',kind:'Digital product',type:'digital',metric:'One simple harvest',image:'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1100&q=85'}
];
const serviceGrid=document.querySelector('#serviceGrid');
serviceGrid.innerHTML=services.map(service=>`<article class="service-card"><span class="service-number">${service.number}</span><span class="service-tag">${service.tag}</span><span class="service-icon">${service.icon}</span><h3>${service.title}</h3><p>${service.copy}</p></article>`).join('');
const workGrid=document.querySelector('#workGrid');
function renderWork(filter='all'){const list=filter==='all'?projects:projects.filter(project=>project.type===filter);workGrid.innerHTML=list.map(project=>`<article class="work-card"><div class="work-card-image image-crop"><img loading="lazy" src="${project.image}" alt="${project.title} project work"><span class="work-label">${project.kind}</span></div><h3>${project.title}</h3><div class="work-meta"><span>${project.kind}</span><span>${project.metric} ↗</span></div></article>`).join('')}
renderWork();
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(item=>item.classList.remove('active'));button.classList.add('active');renderWork(button.dataset.filter)}));
const themeToggle=document.querySelector('#themeToggle');
function setTheme(theme){const dark=theme==='dark';document.documentElement.dataset.theme=theme;document.querySelector('.theme-label').textContent=dark?'Dark':'Light';document.querySelector('.theme-icon').textContent=dark?'☾':'☼';themeToggle.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);localStorage.setItem('northstar-theme',theme)}
themeToggle.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
if(localStorage.getItem('northstar-theme'))setTheme(localStorage.getItem('northstar-theme'));
const menuToggle=document.querySelector('#menuToggle');
menuToggle.addEventListener('click',()=>{const nav=document.querySelector('.main-nav');const open=nav.classList.toggle('mobile-open');menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu')});
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('mobile-open')));
document.querySelector('#contactForm').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.target);const subject=encodeURIComponent(`Project inquiry from ${data.get('name')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\nProject details:\n${data.get('message')}`);document.querySelector('#formStatus').textContent='Opening your email app...';window.location.href=`mailto:hello@northstardigital.example?subject=${subject}&body=${body}`});
document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)document.querySelectorAll('details').forEach(other=>{if(other!==detail)other.removeAttribute('open')})}));

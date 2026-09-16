const menuButton = document.querySelector('#menuButton');
const mainNav = document.querySelector('.main-nav');
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');

menuButton.addEventListener('click', () => mainNav.classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => mainNav.classList.remove('open')));

contactForm.addEventListener('submit', event => {
	event.preventDefault();
	formStatus.textContent = 'Thank you. Our team will get back to you soon.';
	contactForm.reset();
});

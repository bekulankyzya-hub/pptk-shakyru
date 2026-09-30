const eventDate = new Date('2026-10-02T10:00:00+06:00');
const countdown = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    countdown.days.textContent = '00';
    countdown.hours.textContent = '00';
    countdown.minutes.textContent = '00';
    countdown.seconds.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.days.textContent = String(days).padStart(2, '0');
  countdown.hours.textContent = String(hours).padStart(2, '0');
  countdown.minutes.textContent = String(minutes).padStart(2, '0');
  countdown.seconds.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

const form = document.getElementById('rsvp-form');
const fullnameInput = document.getElementById('fullname');
const nameError = document.getElementById('name-error');
const statusMessage = document.getElementById('status-message');
const statusInput = document.getElementById('status-input');

const setStatusMessage = (type, message) => {
  statusMessage.classList.remove('hidden', 'success', 'danger');
  statusMessage.classList.add(type);
  statusMessage.textContent = message;
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fullname = fullnameInput.value.trim();
  const selectedStatus = event.submitter?.dataset?.status || statusInput.value;

  if (!fullname) {
    nameError.textContent = 'Өтініш, аты-жөніңізді енгізіңіз!';
    fullnameInput.focus();
    return;
  }

  nameError.textContent = '';
  statusInput.value = selectedStatus;

  const successMessage =
    selectedStatus === 'Келемін'
      ? 'Рақмет! Сіздің жауабыңыз қабылданды (Келесіз).'
      : 'Жауабыңызға рақмет (Келе алмайсыз).';

  const type = selectedStatus === 'Келемін' ? 'success' : 'danger';

  const formData = new FormData(form);
  const encoded = new URLSearchParams(formData).toString();

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encoded
    });
  } catch (error) {
    console.warn('Netlify form submission failed in browser context:', error);
  }

  form.reset();
  setStatusMessage(type, successMessage);

  if (selectedStatus === 'Келемін') {
    document.body.classList.add('burst');
    setTimeout(() => document.body.classList.remove('burst'), 700);
  }
});

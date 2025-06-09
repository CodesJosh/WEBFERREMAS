document.addEventListener('DOMContentLoaded', () => {
  fetch('/components/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    })
    .catch(err => console.error('Error cargando footer:', err));
});
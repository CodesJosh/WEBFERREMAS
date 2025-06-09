document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('carritoContainer');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let total = 0;

  if (!carrito.length) {
    container.innerHTML = '<p>Tu carrito está vacío.</p>';
  } else {
    carrito.forEach((item, i) => {
      total += item.precio;
      container.innerHTML += `
        <div class="carrito-item">
          <span>${item.nombre} — $${item.precio.toLocaleString()}</span>
          <button onclick="quitar(${i})">✕</button>
        </div>
      `;
    });
  }
  document.getElementById('total').textContent = `Total: $${total.toLocaleString()}`;
});

function quitar(idx) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(idx, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload();
}
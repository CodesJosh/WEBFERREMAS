document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/productos')
    .then(res => res.json())
    .then(data => {
      const productos = data.data || [];

      // Secciones especiales
      renderProductos('promocionesContainer', productos.filter(p => p.promocion));
      renderProductos('novedadesContainer', productos.filter(p => p.nuevoLanzamiento));

      // Mapeo de categorías a IDs
      const categoriasMap = {
        'Herramientas Manuales': 'herramientas-manuales',
        'Herramientas Eléctricas': 'herramientas-electricas',
        'Materiales de Construcción': 'materiales-construccion',
        'Equipos de Seguridad': 'equipos-seguridad',
        'Tornillos y Anclajes': 'tornillos-anclajes',
        'Fijaciones y Adhesivos': 'fijaciones-adhesivos',
        'Equipos de Medición': 'equipos-medicion'
      };

      Object.entries(categoriasMap).forEach(([nombre, id]) => {
        renderProductos(`cat-${id}`, productos.filter(p => p.categoria === nombre));
      });
    })
    .catch(err => console.error('Error al cargar productos:', err));
});

function renderProductos(contenedorId, items) {
  const cont = document.getElementById(contenedorId);
  if (!cont) return;
  cont.innerHTML = items.length
    ? items.map(prod => `
      <div class="producto">
        <div>
          <img src="${prod.imagenUrl}" alt="${prod.nombre}" class="producto-img">
          <h3>${prod.nombre}</h3>
          <p>${prod.Descripcion}</p>
          <p><strong>Precio:</strong> $${prod.Precio.toLocaleString()}</p>
        </div>
        <div>
          <button onclick="agregarAlCarrito('${prod.nombre}', ${prod.Precio})">Agregar al carrito</button>
        </div>
      </div>
    `).join('')
    : '<p>No hay productos en esta sección.</p>';
}

function agregarAlCarrito(nombre, precio) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push({ nombre, precio });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${nombre} agregado al carrito`);
}
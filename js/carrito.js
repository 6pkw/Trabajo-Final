const productos = [
  {
    id: 1,
    nombre: "CREATINA - LEVEL PRO",
    precio: 120.0,
    imagen: "/imagenes/1.jpeg",
    stock: "UN",
  },
  {
    id: 2,
    nombre: "BARRA DE PROTEÍNA",
    precio: 5.0,
    imagen: "/imagenes/2.jpeg",
    stock: "UN",
  },
  {
    id: 3,
    nombre: "FIT MASS + UN TOMATODO",
    precio: 140.0,
    imagen: "/imagenes/3.jpeg",
    stock: "UN",
  },
  {
    id: 4,
    nombre: "XB Quemador de Grasa Pack 15 botellas",
    precio: 29.0,
    imagen: "/imagenes/4.jpeg",
    stock: "UN",
  },
];

let carrito = [];

// Renderizar productos si existe un grid
function renderizarProductos() {
  const grid = document.getElementById("productosGrid");
  if (!grid) return;

  grid.innerHTML = productos
    .map(
      (p) => `
        <div class="producto-card">
          <div class="producto-image"><img src="${p.imagen}" alt="${
        p.nombre
      }" /></div>
          <h3>${p.nombre}</h3>
          <p class="producto-precio">S/ ${p.precio.toFixed(2)}</p>
          <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">
            Agregar al carrito
          </button>
        </div>
      `
    )
    .join("");
}

// Agregar producto
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  const item = carrito.find((i) => i.id === id);

  if (item) item.cantidad++;
  else carrito.push({ ...producto, cantidad: 1 });

  actualizarCarrito();
  mostrarNotificacion("Producto agregado al carrito");
}

// Actualizar carrito
function actualizarCarrito() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartCount || !cartItems || !cartTotal) return;

  const totalItems = carrito.reduce((a, i) => a + i.cantidad, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? "flex" : "none";

  if (carrito.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
  } else {
    cartItems.innerHTML = carrito
      .map(
        (i) => `
        <div class="cart-item">
          <div class="cart-item-image"><img src="${i.imagen}" /></div>
          <div class="cart-item-info">
            <div class="cart-item-name">${i.nombre}</div>
            <div class="cart-item-price">S/ ${i.precio.toFixed(2)}</div>
            <div class="cart-item-controls">
              <button class="qty-btn" onclick="cambiarCantidad(${
                i.id
              }, -1)">-</button>
              <span class="cart-item-qty">${i.cantidad}</span>
              <button class="qty-btn" onclick="cambiarCantidad(${
                i.id
              }, 1)">+</button>
              <button class="remove-item" onclick="eliminarDelCarrito(${
                i.id
              })">Eliminar</button>
            </div>
          </div>
        </div>`
      )
      .join("");
  }

  const total = carrito.reduce((a, i) => a + i.precio * i.cantidad, 0);
  cartTotal.textContent = `S/ ${total.toFixed(2)}`;
}

function cambiarCantidad(id, cambio) {
  const item = carrito.find((i) => i.id === id);
  if (!item) return;
  item.cantidad += cambio;
  if (item.cantidad <= 0) eliminarDelCarrito(id);
  actualizarCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter((i) => i.id !== id);
  actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("cartIcon");
  const modal = document.getElementById("cartModal");
  const close = document.getElementById("closeCart");
  const checkout = document.getElementById("checkoutBtn");

  if (icon) icon.addEventListener("click", () => modal.classList.add("active"));
  if (close)
    close.addEventListener("click", () => modal.classList.remove("active"));
  if (modal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });

  if (checkout)
    checkout.addEventListener("click", () => {
      if (carrito.length === 0) return alert("Tu carrito está vacío 😢");
      const total = carrito.reduce((a, i) => a + i.precio * i.cantidad, 0);
      alert(`Compra realizada con éxito 💪\nTotal: S/ ${total.toFixed(2)}`);
      carrito = [];
      actualizarCarrito();
      modal.classList.remove("active");
    });

  renderizarProductos();
  actualizarCarrito();
});

function mostrarNotificacion(msg) {
  const n = document.createElement("div");
  n.textContent = msg;
  n.style.cssText = `
      position: fixed;
      top: 20px; right: 20px;
      background: #21808d; color: #fff;
      padding: 12px 20px; border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 2000; font-weight: 600;
    `;
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 2000);
}

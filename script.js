// ============================================================
// BASE DE DATOS DE VEHÍCULOS (con imágenes y colores)
// ============================================================
const products = [
    {
        id: 1,
        name: "Triciclo Eléctrico Mishosuki Cargo",
        price: 4500,
        category: "triciclos",
        description: "Batería 60V/90ah LifePho4, autonomía 120km, carga 1000kg, motor 1500w, gato idraulico, extensor de rango, alarma",
        images: ["mishosuki.JPG"],
        colors: ["Rojo",],
        featured: true
    },
    {
        id: 2,
        name: "Triciclo Vedca C-800",
        price: 4000,
        category: "triciclos",
        description: "Motor 1500W, batería 72V/90ah LifePho4, Autonomia 120km, capacidad 1000kg, cabina, forro, gato idraulico, goma de repuesto, alarma ",
        images: ["img/vedcac800.webp"],
        colors: ["Azul"],
        featured: false
    },
    {
        id: 3,
        name: "Triciclo Kvitova 12p",
        price: 6200,
        category: "triciclos",
        description: "Motor 250cc, Bateria 12v, Gato idraulico, Bujia de repuest, Dos forros, Dos ruedas de repuesto, capacidad 1500kg, ",
        images: ["img/kvitova.jpg", "img/kvitova2.jpg"],
        colors: ["Negro", "Verde"],
        featured: true
    },
    {
        id: 4,
        name: "Triciclo Vedca C-300",
        price: 3800,
        category: "triciclos",
        description: "Batería 72V 50Ah Litio, alarma, velocidad 60km/h, autonomía 100km, capacidad 1000kg, cabina, goma de repuesto, gato idraulico",
        images: ["img/vedcac300.webp"],
        colors: ["Verde"],
        featured: true
    },
    {
        id: 12,
        name: "Triciclo Jinpeng",
        price: 2000,
        category: "triciclos",
        description: "Batería 60V 35Ah Litio, velocidad 50km/h, autonomía 80km, capacidad 300kg,",
        images: ["img/jinpeng.webp"],
        colors: ["Rojo"],
        featured: true
    },
    {
        id: 5,
        name: "Moto Electrica Unizuki Rayan",
        price: 2000,
        category: "motos",
        description: "Motor 2000W, batería 72v/28ah Litio, 4 velocidades, Reproductor de musica Bluetooth, Autonomia 80km, Pizarra digital, alarma, iluminacion led",
        images: ["img/unizuki.jpg","img/unizuki1.jpg","img/unizuki2.jpg","img/unizuki3.jpg",],
        colors: ["Morado", "Azul", "Rojo", "Negro"],
        featured: false
    },
    {
        id: 6,
        name: "Moto Topmaq FF ",
        price: 6200,
        category: "motos",
        description: "Motor 3000W, batería 72V/45ah, velocidad 50-60km/h, autonommia 100km, Reproductor bluetooth, Caja reguladora Votol EM-50",
        images: ["img/topmac72v.jpg"],
        colors: ["Rojo", "Negro", "Morado", "Azul"],
        featured: false
    },
    {
        id: 7,
        name: "Bicimoto Topmaq",
        price: 1900,
        category: "bicimotos",
        description: "Motor 3000W, batería 48V/45ah, pedal asistido, freno de disco, Reproductor de musica Bluetooth",
        images: ["img/topmac.jpg", "img/topmac2.jpg"],
        colors: ["Morado", "Amarillo"],
        featured: false
    },
    {
        id: 8,
        name: "Bicimoto Wehawk",
        price: 600,
        category: "bicimotos",
        description: "Motot 500w, Bateria LifePho4 48v/30ah, frenos de tambor, cesta",
        images: ["img/wehawk.jpg", "img/wehawk2.jpg"],
        colors: ["Morado", "Azul"],
        featured: false
    },
    {
        id: 9,
        name: "Moto Automatica BWS 5g 150cc",
        price: 2250,
        category: "combustion",
        description: "Motor 150cc, 4 tiempos, refrigeración por aire, vel max 90km/h, capacidad del tanque 6L, frenos disco y tambor",
        images: ["img/bws5g.jpg", "img/bws5g2.jpg", "img/bws5g3.jpg"],
        colors: ["Azul", "Negro", "Rosa"],
        featured: false
    },
    {
        id: 10,
        name: "Moto 200cc Automatica Mishosuki",
        price: 2600,
        category: "combustion",
        description: "Motor 200cc, suspensión regulable, neumáticos 8capas, tanque 6L, vel max 100km/h, iluminacion led, frenos disco y tambor",
        images: ["img/mishosuki200cc.png"],
        colors: ["Rojo"],
        featured: false
    },
    {
        id: 11,
        name: "Yamaha Crux 110cc ",
        price: 2750,
        category: "combustion",
        description: "Unidad 110 cc 4 tiempos, baúl incluido,llaves de utilidad, vel max 120km/h, 1.5L/100km",
        images: ["img/crux110cc.jpg","img/crux110cc1.jpg","img/crux110cc2.jpg","img/crux110cc3.jpg","img/crux110cc4.jpg",],
        colors: ["Rojo"],
        featured: true
    }
];

// ============================================================
// VARIABLES GLOBALES
// ============================================================
let cart = [];
let customerInfo = {
    fullName: '',
    ci: '',
    address: '',
    phone: '',
    paymentMethod: '',
    express: false
};
let currentProductId = null;
let selectedColor = '';

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================
function getTotalQuantity() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// ============================================================
// CARGAR PRODUCTOS
// ============================================================
function loadProducts() {
    loadFeaturedProducts();
    loadAllProducts();
}

function loadFeaturedProducts() {
    const featured = products.filter(p => p.featured);
    document.getElementById('featuredProducts').innerHTML = featured.map(p => createProductCard(p)).join('');
}

function loadAllProducts() {
    document.getElementById('allProducts').innerHTML = products.map(p => createProductCard(p)).join('');
}

function createProductCard(product) {
    const mainImage = product.images && product.images.length > 0 ? product.images[0] : 'img/default-vehicle.jpg';
    const hasMore = product.images && product.images.length > 1;
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${mainImage}" alt="${product.name}" class="product-img" onerror="this.src='img/default-vehicle.jpg'">
                ${hasMore ? `<span class="image-badge">+${product.images.length - 1}</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)} USD</span>
                    <div class="add-to-cart" onclick="openAddModal(${product.id})">
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// BÚSQUEDA Y FILTROS
// ============================================================
function searchFood() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('#allProducts .product-card').forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(term) ? 'block' : 'none';
    });
}

function filterCategory(category) {
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.querySelectorAll('#allProducts .product-card').forEach(card => {
        const match = category === 'all' || card.dataset.category === category;
        card.style.display = match ? 'block' : 'none';
    });
}

// ============================================================
// MODAL PARA AGREGAR AL CARRITO (con galería y colores)
// ============================================================
function openAddModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    currentProductId = productId;
    selectedColor = (product.colors && product.colors.length > 0) ? product.colors[0] : 'N/A';

    const overlay = document.createElement('div');
    overlay.className = 'add-modal-overlay';
    overlay.id = 'addModal';

    const thumbnails = product.images && product.images.length > 0
        ? product.images.map(img => `<img src="${img}" class="thumb-image" onclick="changeMainImage('${img}')" alt="Imagen">`).join('')
        : `<img src="img/default-vehicle.jpg" class="thumb-image" onclick="changeMainImage('img/default-vehicle.jpg')" alt="Imagen">`;

    const colorButtons = product.colors && product.colors.length > 0
        ? product.colors.map(color => `<button class="color-btn ${color === selectedColor ? 'active' : ''}" onclick="selectColor('${color}')">${color}</button>`).join('')
        : '<span class="no-color">Sin colores</span>';

    overlay.innerHTML = `
        <div class="add-modal-content liquid">
            <div class="add-modal-header">
                <h3>${product.name}</h3>
                <i class="fas fa-xmark" onclick="closeAddModal()"></i>
            </div>
            <div class="add-modal-body">
                <div class="image-gallery">
                    <div class="main-image-container">
                        <img id="mainImageDisplay" src="${product.images && product.images.length > 0 ? product.images[0] : 'img/default-vehicle.jpg'}" alt="${product.name}">
                    </div>
                    <div class="thumbnails-container">${thumbnails}</div>
                </div>
                <div class="color-selection">
                    <label>Selecciona el color:</label>
                    <div class="color-buttons" id="colorButtons">${colorButtons}</div>
                </div>
                <p class="product-price-modal">Precio: $${product.price.toFixed(2)} USD</p>
            </div>
            <div class="add-modal-footer">
                <button class="add-confirm-btn" onclick="confirmAddToCart()">
                    <i class="fas fa-shopping-cart"></i> Añadir al carrito
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
}

function closeAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

function changeMainImage(src) {
    document.getElementById('mainImageDisplay').src = src;
}

function selectColor(color) {
    selectedColor = color;
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === color);
    });
}

function confirmAddToCart() {
    if (!currentProductId) return;
    const product = products.find(p => p.id === currentProductId);
    if (!product) return;
    const color = selectedColor || 'N/A';
    const existing = cart.find(item => item.id === product.id && item.color === color);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            color: color,
            quantity: 1
        });
    }
    closeAddModal();
    updateCartUI();
    showNotification(`Vehículo añadido (${color})`);
}

// ============================================================
// CARRITO
// ============================================================
function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = getTotalQuantity();
}

function updateCartItems() {
    const container = document.getElementById('cartItems');
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart">CARRITO VACÍO</div>';
        return;
    }
    container.innerHTML = cart.map(item => {
        const colorAttr = item.color || 'N/A';
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-color">Color: ${colorAttr}</span>
                    <span class="cart-item-price">$${item.price.toFixed(2)} USD</span>
                </div>
                <div class="cart-item-actions">
                    <button onclick="decreaseQuantity(${item.id}, '${colorAttr}')">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id}, '${colorAttr}')">+</button>
                    <button onclick="removeFromCart(${item.id}, '${colorAttr}')" style="background: rgba(80, 80, 80, 0.8);">
                        <i class="fas fa-trash" style="font-size: 14px;"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateCartTotal() {
    document.getElementById('cartTotal').textContent = `$${getSubtotal().toFixed(2)} USD`;
}

function increaseQuantity(id, color) {
    const item = cart.find(i => i.id === id && i.color === color);
    if (item) { item.quantity++; updateCartUI(); }
}

function decreaseQuantity(id, color) {
    const item = cart.find(i => i.id === id && i.color === color);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCartUI();
    } else if (item && item.quantity === 1) {
        removeFromCart(id, color);
    }
}

function removeFromCart(id, color) {
    cart = cart.filter(item => !(item.id === id && item.color === color));
    updateCartUI();
    showNotification('Vehículo eliminado');
}

function toggleCart() {
    document.getElementById('cartPanel').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function showNotification(msg) {
    const n = document.createElement('div');
    n.className = 'notification';
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(() => n.classList.add('show'), 10);
    setTimeout(() => {
        n.classList.remove('show');
        setTimeout(() => n.remove(), 300);
    }, 2000);
}

// ============================================================
// FORMULARIO DE RESERVA (con CI)
// ============================================================
function showCustomerForm() {
    if (cart.length === 0) {
        showNotification('CARRITO VACÍO');
        return;
    }
    const overlay = document.createElement('div');
    overlay.className = 'form-overlay';
    overlay.id = 'formOverlay';
    overlay.innerHTML = `
        <div class="customer-form liquid">
            <div class="form-header">
                <h3>DATOS DE RESERVA</h3>
                <i class="fas fa-xmark" onclick="closeCustomerForm()"></i>
            </div>
            <div class="form-body">
                <div class="form-group">
                    <label>NOMBRE Y APELLIDOS</label>
                    <input type="text" id="fullName" placeholder="Ej: Juan Pérez" class="form-input" value="${customerInfo.fullName}">
                </div>
                <div class="form-group">
                    <label>CARNET DE IDENTIDAD (CI)</label>
                    <input type="text" id="ci" placeholder="Ej: 12345678901" class="form-input" value="${customerInfo.ci}">
                </div>
                <div class="form-group">
                    <label>DIRECCIÓN PARTICULAR</label>
                    <textarea id="address" placeholder="Calle, número, entre calles..." class="form-input" rows="3">${customerInfo.address}</textarea>
                </div>
                <div class="form-group">
                    <label>NÚMERO(S) DE CONTACTO</label>
                    <input type="text" id="phone" placeholder="Ej: +5312345678" class="form-input" value="${customerInfo.phone}">
                </div>
                <div class="form-group">
                    <label>MÉTODO DE PAGO</label>
                    <select id="paymentMethod" class="form-input">
                        <option value="Tarjeta clásica">TARJETA CLÁSICA</option>
                        <option value="Transferencia bancaria">TRANSFERENCIA BANCARIA</option>
                        <option value="Zelle">ZELLE</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>
                        <input type="radio" name="shippingType" value="normal" checked onchange="updateReceiptPreview()"> 
                        Envío normal (10% anticipo)
                    </label>
                    <label>
                        <input type="radio" name="shippingType" value="express" onchange="updateReceiptPreview()"> 
                        Envío Xpress (15% anticipo, entrega < 2 meses)
                    </label>
                </div>
                <div class="form-group receipt-preview" id="receiptPreview">
                    <div class="preview-title">RESUMEN DE LA RESERVA</div>
                    <div id="previewContent">Cargando...</div>
                </div>
            </div>
            <div class="form-footer">
                <button class="checkout-btn" onclick="processOrder()">
                    <i class="fas fa-envelope"></i> ENVIAR RESERVA POR CORREO
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
    setTimeout(() => updateReceiptPreview(), 100);
}

function closeCustomerForm() {
    const el = document.getElementById('formOverlay');
    if (el) {
        el.classList.remove('active');
        setTimeout(() => el.remove(), 300);
    }
}

function updateReceiptPreview() {
    if (cart.length === 0) {
        document.getElementById('previewContent').innerHTML = 'No hay vehículos seleccionados';
        return;
    }
    const subtotal = getSubtotal();
    const shippingType = document.querySelector('input[name="shippingType"]:checked');
    const express = shippingType && shippingType.value === 'express';
    const percent = express ? 0.15 : 0.10;
    const anticipo = subtotal * percent;

    document.getElementById('previewContent').innerHTML = `
        <div style="margin-top: 10px;">
            <div class="preview-line"> PRECIO TOTAL: $${subtotal.toFixed(2)} USD</div>
            <div class="preview-line"> ANTICIPO (${(percent*100).toFixed(0)}%): $${anticipo.toFixed(2)} USD</div>
            <div class="preview-line total"> A PAGAR AHORA: $${anticipo.toFixed(2)} USD</div>
            <div style="margin-top:8px;font-size:12px;color:#888;">El saldo restante se pagará en la entrega.</div>
        </div>
    `;
}

// ============================================================
// PROCESAR RESERVA Y GENERAR SOLICITUD (PENDIENTE DE CONFIRMACIÓN)
// ============================================================
function processOrder() {
    const fullName = document.getElementById('fullName').value.trim();
    const ci = document.getElementById('ci').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    const shippingType = document.querySelector('input[name="shippingType"]:checked');
    const express = shippingType && shippingType.value === 'express';

    if (!fullName) { showNotification('INGRESA TU NOMBRE COMPLETO'); return; }
    if (!ci) { showNotification('INGRESA TU CARNET DE IDENTIDAD'); return; }
    if (!address) { showNotification('INGRESA TU DIRECCIÓN'); return; }
    if (!phone) { showNotification('INGRESA TU TELÉFONO'); return; }

    customerInfo = { fullName, address, phone, ci, paymentMethod, express };

    const ticket = generateTicket();
    sendEmail(ticket);

    cart = [];
    updateCartUI();
    closeCustomerForm();
    if (document.getElementById('cartPanel').classList.contains('active')) toggleCart();
    showNotification('SOLICITUD DE RESERVA ENVIADA ✓');
}

// ============================================================
// GENERAR SOLICITUD DE RESERVA (PENDIENTE DE CONFIRMACIÓN)
// ============================================================
function generateTicket() {
    const date = new Date();
    const ticketId = 'TICK-' + date.getTime().toString().slice(-10) + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const subtotal = getSubtotal();
    const express = customerInfo.express;
    const percent = express ? 0.15 : 0.10;
    const anticipo = subtotal * percent;
    const saldo = subtotal - anticipo;

    let ticket = '*ENVIXpress - SOLICITUD DE RESERVA* \n';
    ticket += '═══════════════════════════════\n\n';
    ticket += `*CÓDIGO ID:* ${ticketId}\n`;
    ticket += `*FECHA:* ${date.toLocaleDateString()}\n`;
    ticket += `*HORA:* ${date.toLocaleTimeString()}\n`;
    ticket += `*ESTADO:* PENDIENTE DE CONFIRMACIÓN\n\n`;
    ticket += '*DETALLE DE VEHÍCULOS*\n';
    ticket += '─────────────────────────────\n';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        ticket += `  ${item.name} (${item.color || 'N/A'})\n`;
        ticket += `   ${item.quantity} x $${item.price.toFixed(2)} USD = $${itemTotal.toFixed(2)} USD\n`;
    });
    ticket += '\n─────────────────────────────\n';
    ticket += `*PRECIO TOTAL:* $${subtotal.toFixed(2)} USD\n`;
    ticket += `*ANTICIPO (${(percent*100).toFixed(0)}%):* $${anticipo.toFixed(2)} USD\n`;
    ticket += `*SALDO A PAGAR EN ENTREGA:* $${saldo.toFixed(2)} USD\n\n`;
    ticket += '*DATOS DEL CLIENTE*\n';
    ticket += '─────────────────────────────\n';
    ticket += `*Nombre:* ${customerInfo.fullName}\n`;
    ticket += `*CI:* ${customerInfo.ci}\n`;
    ticket += `*Teléfono:* ${customerInfo.phone}\n`;
    ticket += `*Dirección:* ${customerInfo.address}\n`;
    ticket += `*Pago:* ${customerInfo.paymentMethod}\n`;
    ticket += `*Envío:* ${customerInfo.express ? 'XPRESS (15%)' : 'Estándar (10%)'}\n\n`;
    ticket += '*INSTRUCCIONES IMPORTANTES*\n';
    ticket += '─────────────────────────────\n';
    ticket += '1. Realiza el depósito del anticipo indicado.\n';
    ticket += '2. Esta reserva será confirmada por la empresa una vez recibido el comprobante de pago.\n';
    ticket += '3. Recibirás un correo de confirmación en un plazo de 24-48 horas.\n';
    ticket += '4. No compartas tu código ID con nadie.\n';
    ticket += '5. El saldo restante se pagará al recibir el vehículo.\n\n';
    ticket += '*Correo de contacto:* envixpressreserva@gmail.com\n';
    ticket += '*Telegram:* +7 925 225 6181\n\n';
    ticket += '═══════════════════════════════\n';
    ticket += '*RESERVA PENDIENTE - Espera confirmación oficial* \n';
    ticket += '*¡Gracias por elegir ENVIXpress!*';

    return ticket;
}

function sendEmail(ticketText) {
    const to = 'envixpressreserva@gmail.com';
    const subject = encodeURIComponent('NUEVA SOLICITUD DE RESERVA - ' + customerInfo.fullName);
    const body = encodeURIComponent(ticketText);
    window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_blank');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('CARRITO VACÍO');
        return;
    }
    toggleCart();
    showCustomerForm();
}

// ============================================================
// MODAL DE INFORMACIÓN
// ============================================================
function toggleInfoModal() {
    document.getElementById('infoModal').classList.toggle('active');
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (document.getElementById('cartPanel')?.classList.contains('active')) toggleCart();
            if (document.getElementById('formOverlay')) closeCustomerForm();
            if (document.getElementById('addModal')) closeAddModal();
            if (document.getElementById('infoModal')?.classList.contains('active')) toggleInfoModal();
        }
    });
    createGlowEffects();
});

function createGlowEffects() {
    for (let i = 0; i < 3; i++) {
        const glow = document.createElement('div');
        glow.className = 'glow-effect';
        glow.style.top = Math.random() * 100 + '%';
        glow.style.left = Math.random() * 100 + '%';
        document.body.appendChild(glow);
    }
}

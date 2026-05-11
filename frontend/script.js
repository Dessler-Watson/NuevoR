
    /**
     * Función para cambiar la imagen principal
     * @param {HTMLElement} element - La miniatura (img) que recibió el clic
     */
    function changeImage(element) {
        // 1. Capturamos la imagen principal (Zona Rosa) por su ID
        const mainImg = document.getElementById("main-view");
        
        // 2. Cambiamos la fuente (src) de la principal por la de la miniatura
        mainImg.src = element.src;

        // 3. (Opcional) Añadimos un efecto visual a las miniaturas
        // Primero quitamos la opacidad de todas las miniaturas
        const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
        thumbnails.forEach(img => img.style.opacity = "0.6");
        thumbnails.forEach(img => img.style.border = "1px solid #ddd");

        // Luego resaltamos la que acabamos de tocar
        element.style.opacity = "1";
        element.style.border = "2px solid #f1c40f"; // Color amarillo para resaltar
    }

    // Al cargar la página, resaltamos la primera miniatura por defecto
    window.onload = function() {
        const firstThumb = document.querySelector('.thumbnail-gallery img');
        if (firstThumb) {
            firstThumb.style.opacity = "1";
            firstThumb.style.border = "2px solid #f1c40f";
        }
    };

  // ============================================================
  // BASE DE DATOS DE PRODUCTOS
  // ============================================================
  const productos = {
    producto1: {
      id: "prod001",
      nombre: "Auriculares Inalámbricos Pro Max",
      marca: "SoundCore Ultra",
      modelo: "SC-H910",
      sku: "ELEC-AU-992",
      codigo: "AU-PRO23",
      precio: 89.99,
      stock: 214,
      imagenes: [
        "https://placehold.co/600x400/2563eb/white?text=Auriculares+Negro",
        "https://placehold.co/600x400/16a34a/white?text=Vista+Lateral",
        "https://placehold.co/600x400/dc2626/white?text=Estuche+Carga",
        "https://placehold.co/600x400/f59e0b/white?text=Detalle+Almohadillas"
      ],
      descripcion: "Experimenta un sonido envolvente de alta fidelidad con los Auriculares Inalámbricos Pro Max. Diseñados para largas sesiones de música, gaming o llamadas, ofrecen cancelación activa de ruido (ANC) ajustable en 3 modos. Su batería de larga duración alcanza hasta 40 horas de reproducción continua con la cancelación activada, y 60 horas en modo normal.",
      caracteristicas: [
        "🔊 Cancelación de ruido híbrida",
        "🎤 Micrófonos con IA para llamadas",
        "⚡ Carga rápida PowerFast (10min = 4h)",
        "🎮 Modo baja latencia para juegos",
        "📱 App con EQ personalizable"
      ]
    }
  };

  // Productos similares para el carrusel (recomendaciones)
  const productosSimilares = [
    { id: 1, nombre: "Diadema Gamer RGB 7.1", precio: 59.99, imagen: "https://placehold.co/200x150/1e293b/white?text=Gamer+RGB" },
    { id: 2, nombre: "Auriculares Deportivos IPX7", precio: 44.99, imagen: "https://placehold.co/200x150/0f172a/white?text=Deportivos" },
    { id: 3, nombre: "Audífonos Studio Pro", precio: 129.99, imagen: "https://placehold.co/200x150/334155/white?text=Studio+Pro" },
    { id: 4, nombre: "Micrófono Streaming Pro", precio: 39.99, imagen: "https://placehold.co/200x150/475569/white?text=Micrófono" },
    { id: 5, nombre: "Soporte Magnético", precio: 19.99, imagen: "https://placehold.co/200x150/64748b/white?text=Soporte" },
    { id: 6, nombre: "Amplificador Portátil", precio: 89.99, imagen: "https://placehold.co/200x150/94a3b8/white?text=Amplificador" }
  ];

  const productIdActual = "producto1";
  const producto = productos[productIdActual];

  // Manejo de errores de imagen
  function handleImageError(imgElement) {
    imgElement.onerror = null;
    imgElement.src = "https://placehold.co/600x400/e2e8f0/475569?text=📷+No+disponible";
    imgElement.alt = "Imagen no disponible";
  }

  // ========== GALERÍA CON MINIATURAS ==========
  function renderGallery() {
    const imagenesValidas = producto.imagenes && producto.imagenes.length > 0 
      ? producto.imagenes 
      : ["https://placehold.co/600x400/e2e8f0/475569?text=📷+Sin+imágenes"];
    
    let thumbnailsHTML = '';
    imagenesValidas.forEach((imgSrc, idx) => {
      thumbnailsHTML += `
        <div class="thumbnail" data-img="${imgSrc}" data-index="${idx}">
          <img src="${imgSrc}" alt="miniatura ${idx + 1}" onerror="handleImageError(this)">
        </div>
      `;
    });

    return `
      <div class="gallery-column">
        <div class="main-image-container">
          <img id="mainProductImage" src="${imagenesValidas[0]}" alt="${producto.nombre}" onerror="handleImageError(this)">
        </div>
        <div class="thumbnail-strip" id="thumbnailStrip">
          ${thumbnailsHTML}
        </div>
      </div>
    `;
  }

  function setupThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImg = document.getElementById('mainProductImage');
    
    thumbnails.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        const imgSrc = thumb.getAttribute('data-img');
        if (mainImg && imgSrc) {
          mainImg.src = imgSrc;
          mainImg.onerror = function() { handleImageError(mainImg); };
        }
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
      if (idx === 0) thumb.classList.add('active');
    });
  }

  // ========== INFO COLUMNA DERECHA ==========
  function renderInfoColumn() {
    return `
      <div class="info-column">
        <div class="product-name">${producto.nombre}</div>
        <div class="brand-model">Marca: ${producto.marca} · Modelo: ${producto.modelo} · Código: ${producto.codigo}</div>
        <div class="sku-stock-row">
          <span>📦 SKU: <strong>${producto.sku}</strong></span>
          <span class="stock-badge">✅ En existencia (${producto.stock} unidades)</span>
        </div>
        <div class="product-price">$${producto.precio} <small>USD (impuestos incluidos)</small></div>
        <div class="cart-controls">
          <div class="qty-selector">
            <button class="qty-btn" id="decrementQty">−</button>
            <input type="number" id="quantityInput" class="qty-input" value="1" min="1" max="${producto.stock}">
            <button class="qty-btn" id="incrementQty">+</button>
          </div>
          <button class="btn-add" id="addToCartBtn">🛒 Agregar al carrito</button>
        </div>
        <div class="trust-seals">
          <span class="seal">🔒 Pago Seguro SSL</span>
          <span class="seal">🚚 Envíos a todo el país</span>
          <span class="seal">🛡️ Garantía 18 meses</span>
          <span class="seal">⭐ +2500 reseñas</span>
        </div>
      </div>
    `;
  }

  // ========== DESCRIPCIÓN ==========
  function renderDescription() {
    const caracteristicasHTML = producto.caracteristicas.map(c => `<li>${c}</li>`).join('');
    return `
      <div class="description-title">📄 Descripción del producto</div>
      <div class="description-text">${producto.descripcion}</div>
      <ul class="features-list">${caracteristicasHTML}</ul>
    `;
  }

  // ========== CARRUSEL DE PRODUCTOS SIMILARES ==========
  function renderSimilarCarousel() {
    let similarCardsHTML = '';
    productosSimilares.forEach(sim => {
      similarCardsHTML += `
        <div class="similar-card" data-id="${sim.id}" data-nombre="${sim.nombre}">
          <img class="similar-img" src="${sim.imagen}" alt="${sim.nombre}" onerror="this.src='https://placehold.co/200x150/e2e8f0/475569?text=No+disponible'">
          <div class="similar-name">${sim.nombre}</div>
          <div class="similar-price">$${sim.precio}</div>
          <div style="font-size:0.7rem; margin-top:6px; color:#4c6a8a;">⭐ 4.5 · Ver más</div>
        </div>
      `;
    });

    return `
      <div class="similar-heading">🔍 También te puede interesar (recomendaciones)</div>
      <div class="carousel-similar-container">
        <button class="carousel-btn-similar" id="prevSimilarBtn">‹</button>
        <div class="carousel-similar-track" id="similarTrack">
          ${similarCardsHTML}
        </div>
        <button class="carousel-btn-similar" id="nextSimilarBtn">›</button>
      </div>
    `;
  }

  function setupSimilarCarousel() {
    const track = document.getElementById('similarTrack');
    const prevBtn = document.getElementById('prevSimilarBtn');
    const nextBtn = document.getElementById('nextSimilarBtn');
    
    if (prevBtn && nextBtn && track) {
      prevBtn.onclick = () => {
        track.scrollBy({ left: -220, behavior: 'smooth' });
      };
      nextBtn.onclick = () => {
        track.scrollBy({ left: 220, behavior: 'smooth' });
      };
    }
    
    const similarCards = document.querySelectorAll('.similar-card');
    similarCards.forEach(card => {
      card.addEventListener('click', () => {
        const nombre = card.getAttribute('data-nombre');
        alert(`🔍 Navegando a: ${nombre}\n(En una tienda real, aquí se cargaría ese producto)`);
      });
    });
  }

  // ========== RENDERIZAR PÁGINA COMPLETA ==========
  function renderFullPage() {
    const breadcrumbDiv = document.getElementById('breadcrumb');
    breadcrumbDiv.innerHTML = `<a href="#">Inicio</a> <span>/</span> <a href="#">Electrónicos</a> <span>/</span> <span style="color:#2c7da0;">${producto.nombre}</span>`;
    
    const productLayout = document.getElementById('productLayout');
    productLayout.innerHTML = renderGallery() + renderInfoColumn();
    
    document.getElementById('descriptionSection').innerHTML = renderDescription();
    document.getElementById('similarSection').innerHTML = renderSimilarCarousel();
    
    setupThumbnails();
    setupSimilarCarousel();
    
    const quantityInput = document.getElementById('quantityInput');
    const decrementBtn = document.getElementById('decrementQty');
    const incrementBtn = document.getElementById('incrementQty');
    const addBtn = document.getElementById('addToCartBtn');
    
    if (decrementBtn) {
      decrementBtn.onclick = () => {
        let val = parseInt(quantityInput.value);
        if (val > 1) quantityInput.value = val - 1;
      };
    }
    if (incrementBtn) {
      incrementBtn.onclick = () => {
        let val = parseInt(quantityInput.value);
        if (val < producto.stock) quantityInput.value = val + 1;
      };
    }
    if (quantityInput) {
      quantityInput.onchange = () => {
        let val = parseInt(quantityInput.value);
        if (isNaN(val)) val = 1;
        val = Math.min(producto.stock, Math.max(1, val));
        quantityInput.value = val;
      };
    }
    if (addBtn) {
      addBtn.onclick = () => {
        const qty = quantityInput.value;
        alert(`🛒 Agregado al carrito: ${qty} x ${producto.nombre}\n✅ Compra protegida - Envío seguro.`);
      };
    }
  }

  window.handleImageError = handleImageError;
  renderFullPage();
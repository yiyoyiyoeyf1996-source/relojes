# Especificación técnica frontend — Tienda virtual de relojes RelojNori

**Versión:** 1.0  
**Fecha:** 17 de octubre de 2026  
**Tipo de proyecto:** Prototipo de comercio electrónico exclusivamente frontend  
**Tecnologías:** HTML5, CSS3 y JavaScript puro (Vanilla JavaScript)

## 1. Descripción general

RelojNori es una propuesta de tienda virtual de relojes enfocada en una experiencia de usuario sencilla, elegante y adaptable a diferentes dispositivos. El sitio permite explorar un catálogo de demostración, buscar productos, filtrar por categorías, ordenar resultados, marcar favoritos y administrar un carrito de compras local.

El proyecto se limita al frontend. No incluye servidor, base de datos, autenticación real ni procesamiento de pagos.

## 2. Objetivos

### Objetivo general

Diseñar e implementar la interfaz frontend de una tienda de relojes que priorice la claridad visual, la facilidad de navegación y una experiencia de compra intuitiva.

### Objetivos específicos

- Presentar los productos mediante tarjetas con imagen, nombre, categoría, descripción y precio.
- Facilitar el descubrimiento de productos mediante búsqueda, filtros y ordenamiento.
- Permitir añadir, retirar y cambiar cantidades de productos en un carrito.
- Ofrecer una opción para marcar productos como favoritos.
- Crear una interfaz adaptable a computadores, tabletas y teléfonos.
- Mantener el código comprensible mediante HTML, CSS y JavaScript sin frameworks.

## 3. Referencias de diseño y análisis comparativo

Se toman como inspiración patrones habituales de tiendas oficiales de relojes. La intención es adaptar buenas prácticas generales de comercio electrónico, no copiar diseños, marcas ni contenido protegido.

- **Seiko:** organización de colecciones, presentación del producto e información comercial.
- **CASIO:** exploración de catálogo y filtros por características.
- **Tissot:** descubrimiento de productos, navegación por colecciones y ordenamiento.

Enlaces de referencia:
- Seiko Colombia: https://www.seikocolombia.com/shop/
- CASIO Watches: https://www.casio.com/latin/watches/
- Tissot: https://www.tissotwatches.com/es-mx/collection.html

### Principios UX derivados

1. Mantener la navegación principal visible y fácil de entender.
2. Dar protagonismo a las fotografías y a los precios.
3. Facilitar la búsqueda y el filtrado de productos.
4. Mostrar con claridad las acciones de añadir al carrito y modificar cantidades.
5. Proporcionar mensajes de confirmación y estados vacíos comprensibles.
6. Priorizar una experiencia coherente en pantallas pequeñas.

## 4. Identidad visual propuesta

**Nombre:** RelojNori — Relojes con carácter.

**Estilo:** minimalista, elegante, contemporáneo y orientado al producto.

### Paleta de colores

| Color | Código | Uso sugerido |
|---|---|---|
| Carbón | `#20231F` | Encabezados, botones principales y pie de página |
| Marfil | `#F7F6F2` | Fondo principal |
| Dorado cálido | `#B98B55` | Acentos y detalles |
| Arena | `#E9E6DD` | Paneles destacados y fondos secundarios |
| Blanco | `#FFFFFF` | Tarjetas, campos y superficies |

Se recomienda utilizar tipografía sans serif para textos de interfaz y una tipografía serif en títulos destacados, con espacios amplios y jerarquía visual consistente.

## 5. Alcance funcional

### 5.1 Página de inicio

- Barra superior con mensaje comercial.
- Encabezado con logotipo y navegación.
- Sección hero con título, texto, imagen y botón para explorar la colección.
- Bloque de beneficios.
- Sección editorial de marca.
- Formulario visual de novedades.
- Pie de página con enlaces informativos.

### 5.2 Catálogo de productos

Cada tarjeta muestra:
- Imagen del reloj.
- Etiqueta comercial.
- Nombre.
- Categoría.
- Descripción corta.
- Precio en pesos colombianos (COP).
- Botón para añadir al carrito.
- Control para marcar como favorito.

El prototipo incluye ocho productos de ejemplo. Sus nombres, imágenes y precios son demostrativos y deben sustituirse por información real antes de publicar la tienda.

### 5.3 Búsqueda, filtros y ordenamiento

- Búsqueda por nombre, categoría o descripción.
- Filtros por categorías: Todos, Clásicos, Deportivos, Minimalistas y Elegantes.
- Orden por precio de menor a mayor.
- Orden por precio de mayor a menor.
- Orden alfabético por nombre.
- Indicador del número de resultados.
- Mensaje y acción para limpiar la búsqueda cuando no hay coincidencias.

### 5.4 Carrito de compras

- Añadir productos.
- Incrementar o reducir cantidades.
- Eliminar productos.
- Calcular subtotal.
- Mostrar el número de artículos en el encabezado.
- Conservar el contenido en `localStorage`.
- Mostrar un estado vacío cuando no haya productos.
- Presentar un mensaje aclarando que el proceso de compra es demostrativo.

### 5.5 Favoritos

- Marcar y desmarcar productos.
- Mostrar visualmente el estado seleccionado.
- Conservar favoritos en `localStorage`.

La versión actual no incluye una página independiente para consultar todos los favoritos; esa función puede añadirse en una siguiente iteración.

### 5.6 Formulario de novedades

Incluye un campo de correo electrónico y validación básica del navegador. El formulario es solo demostrativo: no envía ni almacena correos en un servicio externo.

## 6. Especificación técnica

| Área | Tecnología | Responsabilidad |
|---|---|---|
| Estructura | HTML5 | Secciones semánticas, navegación, catálogo, formularios y diálogos |
| Presentación | CSS3 | Colores, tipografía, cuadrículas, tarjetas, transiciones y adaptación responsive |
| Interacción | JavaScript puro | Renderizado del catálogo, filtros, búsqueda, favoritos, carrito y eventos |
| Persistencia local | `localStorage` | Guardado local del carrito y favoritos |
| Moneda | `Intl.NumberFormat` | Presentación de precios en formato COP |

No se utilizan React, Angular, Vue, Bootstrap, Tailwind ni bibliotecas de interfaz.

### Funciones JavaScript principales

- `renderProducts()`: filtra, ordena y muestra el catálogo.
- `addToCart(id)`: agrega un producto o incrementa su cantidad.
- `renderCart()`: actualiza los artículos y el subtotal del carrito.
- `saveCart()`: guarda el carrito y vuelve a dibujar su contenido.
- `openCart()` y `closeCart()`: controlan el panel lateral del carrito.
- `showToast(message)`: muestra mensajes breves de confirmación.
- `showModal(title, text)`: presenta información en una ventana emergente.

## 7. Requisitos de interfaz y experiencia de usuario

- Diseño responsive para móvil, tableta y escritorio.
- Contraste suficiente entre texto y fondo.
- Etiquetas accesibles para campos y botones.
- Texto alternativo para imágenes de productos.
- Estados vacíos para búsquedas sin resultados y carritos vacíos.
- Confirmación visual al añadir un producto o modificar favoritos.
- Compatibilidad con navegación básica mediante teclado.
- Respeto por la preferencia del sistema para reducir animaciones.

## 8. Estructura del proyecto

La versión entregada concentra todo en un único archivo HTML para facilitar su ejecución y estudio. Para una versión de mantenimiento más ordenada, se recomienda separar los archivos así:

```text
nordi-tienda/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── assets/
    └── images/
```

- `index.html`: estructura semántica de la tienda.
- `css/styles.css`: estilos, diseño responsive y estados visuales.
- `js/app.js`: productos de demostración y lógica de interacción.
- `assets/images/`: fotografías locales optimizadas para la tienda.

## 9. Cómo ejecutar el prototipo

1. Descargar el archivo `nordi_tienda_relojes_frontend.html`.
2. Abrirlo con un navegador moderno, como Chrome, Edge o Firefox.
3. Mantener conexión a internet para cargar las fotografías externas.
4. Probar búsqueda, categorías, ordenamiento, favoritos y carrito.
5. Editar el archivo con un editor de código si se desean modificar textos, productos o estilos.

No es necesario instalar paquetes ni ejecutar un servidor para probar la versión demostrativa.

## 10. Pruebas funcionales recomendadas

| Prueba | Resultado esperado |
|---|---|
| Abrir la página | Se muestran el encabezado, la presentación y el catálogo |
| Buscar un producto existente | El catálogo muestra las coincidencias |
| Buscar un término inexistente | Aparece un mensaje de cero resultados |
| Elegir una categoría | Solo aparecen productos de esa categoría |
| Ordenar por precio | Los productos cambian de orden correctamente |
| Añadir un reloj | Aumenta el contador del carrito y aparece el producto |
| Cambiar cantidad | Se actualizan la cantidad y el subtotal |
| Eliminar un producto | El producto deja de aparecer en el carrito |
| Marcar favorito | Cambia el icono y se conserva el estado local |
| Recargar la página | Carrito y favoritos se conservan en el mismo navegador |
| Ver en móvil | La interfaz se adapta al ancho de pantalla |
| Intentar continuar el pedido | Se informa que no hay pagos reales habilitados |

## 11. Limitaciones y consideraciones de seguridad

Este proyecto es un prototipo frontend. `localStorage` solo guarda datos en el navegador actual y no sincroniza información entre dispositivos ni usuarios.

No incluye:
- Backend ni base de datos.
- Inventario real.
- Registro o inicio de sesión.
- Gestión de pedidos.
- Integración con pasarelas de pago.
- Cálculo real de impuestos y envíos.
- Envío de correos.
- Panel administrativo.
- Protección de datos comerciales en servidor.

No se deben guardar datos bancarios, contraseñas ni información sensible en `localStorage`. Para recibir pedidos reales se requiere un backend o una plataforma de comercio electrónico y una integración segura de pagos.

Las imágenes se cargan desde URLs externas; para producción conviene comprobar licencias, disponibilidad, rendimiento y derechos de uso, y alojar imágenes autorizadas.

## 12. Mejoras futuras

1. Crear páginas individuales de detalle de producto.
2. Añadir filtros por marca, material, color y rango de precio.
3. Crear una página de favoritos.
4. Incorporar una guía de tallas y cuidado de relojes.
5. Añadir información real de garantía, devoluciones y envíos.
6. Mejorar las imágenes y optimizarlas para móvil.
7. Separar HTML, CSS y JavaScript en archivos independientes.
8. Realizar pruebas de accesibilidad y usabilidad con usuarios.
9. Integrar servicios de inventario, pedidos y pagos cuando exista una infraestructura segura.

## 13. Conclusión

RelojNori constituye una base frontend funcional para una tienda virtual de relojes. Su diseño prioriza la presentación del catálogo y la facilidad de uso, mientras que JavaScript añade interacciones sin necesidad de frameworks. El proyecto puede ejecutarse localmente y ampliarse de forma gradual.

Antes de utilizarlo como tienda comercial, es necesario sustituir los datos de ejemplo, verificar los derechos de las imágenes, definir las políticas de venta y conectar los servicios necesarios para gestionar pedidos y pagos de manera segura.

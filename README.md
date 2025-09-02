# 🤠 Duelo de Vaqueros - Wild West Showdown

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)

Un emocionante juego de duelo de vaqueros multijugador local que implementa los **12 Principios de Animación de Disney** con tecnologías web modernas. Diseñado como proyecto académico para demostrar técnicas avanzadas de animación y desarrollo de videojuegos en JavaScript.

## 🎮 Características Principales

### ⚡ Motor de Juego Avanzado
- **Físicas realistas** con gravedad, momentum y colisiones precisas
- **Sistema de partículas dinámico** para efectos visuales inmersivos
- **Motor de animación propio** implementando los 12 principios de Disney
- **Renderizado optimizado** con Canvas 2D de alto rendimiento

### 🎨 Efectos Visuales Premium
- **Screen shake** dinámico en disparos e impactos
- **Sistema de knockback** con física realista
- **Animaciones de squash & stretch** para personajes vivos
- **Efectos de partículas** para saltos, aterrizajes e impactos
- **Gradientes dinámicos** y efectos de iluminación atmosférica

### 🎵 Sistema de Audio Inmersivo
- **Efectos de sonido** sincronizados con acciones del juego
- **Audio dinámico** que responde al estado del juego
- **Soporte completo** para disparos, saltos, impactos y victoria

### 🎯 Gameplay Competitivo
- **Modo multijugador local** para 2 jugadores simultáneos
- **Sistema de vida** con regeneración visual en tiempo real
- **Mecánicas de combate** balanceadas y precisas
- **Múltiples pantallas** de navegación fluida

## 🕹️ Controles del Juego

### 🤠 Jugador 1 (Vaquero Izquierdo)
| Acción | Tecla | Descripción |
|--------|-------|-------------|
| Moverse Izquierda | `A` | Movimiento horizontal con aceleración |
| Moverse Derecha | `D` | Movimiento horizontal con aceleración |
| Saltar | `W` | Salto con anticipación y arco realista |
| Disparar | `J` | Disparo con retroceso y efectos |

### 🤠 Jugador 2 (Vaquero Derecho)
| Acción | Tecla | Descripción |
|--------|-------|-------------|
| Moverse Izquierda | `←` | Movimiento horizontal con aceleración |
| Moverse Derecha | `→` | Movimiento horizontal con aceleración |
| Saltar | `↑` | Salto con anticipación y arco realista |
| Disparar | `1` | Disparo con retroceso y efectos |

### ⚙️ Controles Generales
| Acción | Tecla | Descripción |
|--------|-------|-------------|
| Pausar/Reanudar | `P` | Control de estado del juego |
| Menú Principal | `ESC` | Navegación rápida al menú |
| Reiniciar | `R` | Reinicio rápido de partida |

## 🎯 Objetivo y Mecánicas

El objetivo es simple pero emocionante: **reduce la vida de tu oponente a cero** para ganar el duelo. Cada jugador comienza con **100 puntos de vida**, y cada disparo certero inflige **20 puntos de daño**.

### Mecánicas Avanzadas:
- **Sistema de proyectiles** con física balística realista
- **Detección de colisiones** pixel-perfect
- **Efectos de knockback** proporcionales al daño
- **Regeneración visual** de barras de vida en tiempo real

## 🚀 Instalación y Ejecución

### Requisitos del Sistema
- **Navegador moderno** (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- **Soporte HTML5 Canvas** y JavaScript ES6+
- **Audio Web API** para efectos de sonido
- **Resolución mínima**: 1024x768px

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/Maxcerva12/DUELO-DE-VAQUEROS.git

# Navegar al directorio
cd DUELO-DE-VAQUEROS

# Abrir con servidor local (recomendado)
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx serve .

# Opción 3: Live Server (VS Code)
# Usar extensión Live Server

# Acceder a http://localhost:8000
```

### Ejecución Directa
1. **Descarga** todos los archivos del proyecto
2. **Abre** `index.html` en tu navegador preferido
3. **¡Disfruta!** - El juego se carga automáticamente

## 📁 Arquitectura del Proyecto

```
DUELO-DE-VAQUEROS/
├── 📄 index.html              # Página principal del juego
├── 🎮 game.js                 # Motor del juego y lógica principal
├── 🎨 styles/
│   └── main.css               # Estilos visuales y animaciones CSS
├── 🖼️ assets/
│   ├── image/                 # Sprites y recursos visuales
│   │   ├── vaquero1SinFondo.png          # Vaquero 1 - Estado idle
│   │   ├── vaquero2SinFondo.png          # Vaquero 2 - Estado idle
│   │   ├── Personaje1SaltandoSinFondo.png # Vaquero 1 - Saltando
│   │   ├── Personaje2SaltandoSinFondo.png # Vaquero 2 - Saltando
│   │   ├── personaje1DisárandoSinFondo.png # Vaquero 1 - Disparando
│   │   ├── Personaje2DisparandoSinFondo.png # Vaquero 2 - Disparando
│   │   ├── Personaje1Derrotado.png        # Vaquero 1 - Derrotado
│   │   └── Personaje2Derrotado.png        # Vaquero 2 - Derrotado
│   └── sonidos/               # Efectos de audio
│       ├── disparo.mp3        # Sonido de disparo
│       ├── salto.mp3          # Sonido de salto
│       ├── inicio.mp3         # Música de inicio
│       └── victoria.mp3       # Sonido de victoria
├── 📚 DOCUMENTACION.md        # Documentación técnica detallada
└── 📖 README.md               # Este archivo
```

## 🏗️ Arquitectura Técnica

### Clases Principales

#### 🎮 `VaquerosGame` - Motor Principal
```javascript
class VaquerosGame {
    // Gestión de estados, renderizado y lógica de juego
    constructor()      // Inicialización del juego
    loadAssets()       // Carga de recursos multimedia
    gameLoop()         // Bucle principal del juego
    update()           // Actualización de lógica
    render()           // Renderizado visual
}
```

#### 🤠 `Player` - Entidad Jugador
```javascript
class Player {
    // Representa cada vaquero con físicas y animaciones
    updatePosition()       // Actualización de posición con física
    updateSquashStretch()  // Efectos de compresión/estiramiento
    applyGravity()        // Sistema de gravedad realista
    takeDamage()          // Gestión de daño y knockback
}
```

#### 💥 `Bullet` - Sistema de Proyectiles
```javascript
class Bullet {
    // Proyectiles con física balística
    update()          // Movimiento y física del proyectil
    checkCollision()  // Detección de impactos
}
```

#### ✨ `Particle` - Sistema de Partículas
```javascript
class Particle {
    // Efectos visuales dinámicos
    update()          // Actualización de partícula
    draw()            // Renderizado visual
}
```

## 🎨 Principios de Animación Implementados

Este proyecto implementa profesionalmente los **12 Principios de Animación de Disney**:

| Principio | Implementación | Ubicación |
|-----------|----------------|-----------|
| **Squash & Stretch** | Compresión al aterrizar, estiramiento al saltar | `Player.updateSquashStretch()` |
| **Anticipation** | Pausa antes del salto (150ms) | `Player.startJumpAnticipation()` |
| **Staging** | Composición visual clara, separación de planos | `drawBackground()` |
| **Pose to Pose** | Interpolación suave entre estados | `drawPlayer()` |
| **Follow Through** | Inclinación al moverse, arcos balísticos | Física de movimiento |
| **Slow In/Out** | Aceleración/desaceleración gradual | `Player.decelerate()` |
| **Arcs** | Trayectorias curvas en saltos y proyectiles | Física de movimiento |
| **Secondary Action** | Animaciones complementarias | `updateSecondaryAnimations()` |
| **Timing** | Variación en velocidades de animación | Sistema de timing |
| **Exaggeration** | Efectos amplificados para mayor impacto | Screen shake, knockback |
| **Solid Drawing** | Perspective y volumen en el fondo | `drawBackground()` |
| **Appeal** | Diseño atractivo y carismático | Diseño general |

## �️ Tecnologías y Herramientas

### Frontend
- **HTML5 Canvas** para renderizado gráfico de alto rendimiento
- **JavaScript ES6+** con programación orientada a objetos
- **CSS3** con animaciones y efectos visuales avanzados
- **Web Audio API** para efectos de sonido dinámicos

### Características Técnicas
- **Motor de físicas propio** con detección de colisiones
- **Sistema de estados** para gestión de pantallas
- **Optimización de rendimiento** con RequestAnimationFrame
- **Arquitectura modular** y código mantenible

## 🎯 Casos de Uso

### 🎓 Educativo
- **Aprendizaje de principios de animación** en contexto práctico
- **Estudio de desarrollo de videojuegos** con tecnologías web
- **Ejemplo de programación orientada a objetos** en JavaScript

### 🎮 Entretenimiento
- **Partidas multijugador locales** entre amigos y familia
- **Competencias casuales** con mecánicas accesibles
- **Experiencia nostálgica** del estilo Wild West

### 💻 Desarrollo
- **Base para proyectos similares** con arquitectura escalable
- **Referencia de implementación** de principios de animación
- **Ejemplo de buenas prácticas** en desarrollo web

## 🔧 Personalización y Extensión

### Modificar Personajes
```javascript
// En loadAssets(), cambiar rutas de imágenes
this.images.player1.idle.src = 'tu-nueva-imagen.png';
```

### Ajustar Físicas
```javascript
// En Player class, modificar constantes
this.gravity = 0.8;        // Gravedad
this.jumpPower = -15;      // Fuerza de salto
this.moveSpeed = 5;        // Velocidad de movimiento
```

### Personalizar Audio
```javascript
// En loadSounds(), agregar nuevos efectos
this.sounds.newSound = new Audio('assets/sonidos/nuevo.mp3');
```

## 🐛 Solución de Problemas

### Problemas Comunes

**❌ Las imágenes no cargan**
```
Solución: Verificar rutas en assets/image/ y nombres exactos
```

**❌ Sin sonido**
```
Solución: Verificar archivos MP3 en assets/sonidos/ y permisos del navegador
```

**❌ Rendimiento lento**
```
Solución: Cerrar otras pestañas, usar navegador actualizado
```

**❌ Controles no responden**
```
Solución: Hacer clic en el canvas para dar foco al juego
```

## � Métricas y Rendimiento

### Especificaciones Técnicas
- **FPS objetivo**: 60 FPS constantes
- **Resolución**: 1000x600 píxeles
- **Sprites**: 8 imágenes PNG optimizadas
- **Audio**: 4 archivos MP3 comprimidos
- **Tamaño total**: ~2MB

### Optimizaciones Implementadas
- **Pooling de objetos** para partículas y proyectiles
- **Culling de renderizado** para elementos fuera de pantalla
- **Compresión de assets** para carga rápida
- **Minimización de llamadas al DOM**

## 👥 Contribuciones

### Cómo Contribuir
1. **Fork** el repositorio
2. **Crear** una rama para tu feature: `git checkout -b feature/AmazingFeature`
3. **Commit** tus cambios: `git commit -m 'Add: AmazingFeature'`
4. **Push** a la rama: `git push origin feature/AmazingFeature`
5. **Abrir** un Pull Request

### Áreas de Mejora
- [ ] **Modo online** multijugador
- [ ] **Más personajes** y animaciones
- [ ] **Power-ups** y objetos especiales
- [ ] **Niveles múltiples** con diferentes escenarios
- [ ] **Sistema de puntuación** y rankings

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍� Créditos

**Desarrollado por**: [Maxcerva12](https://github.com/Maxcerva12)  
**Proyecto académico** para curso de Entorno Multimedia  
**Inspirado en**: Los 12 Principios de Animación de Disney  

### Reconocimientos
- **Sprites**: Diseño original de personajes vaqueros
- **Concepto**: Duelos del viejo oeste
- **Tecnología**: HTML5, JavaScript, CSS3

---

<div align="center">

**🤠 ¡Que gane el mejor vaquero! 🤠**

[🎮 Jugar Ahora](index.html) | [📚 Documentación](DOCUMENTACION.md) | [� Reportar Bug](https://github.com/Maxcerva12/DUELO-DE-VAQUEROS/issues)

</div>

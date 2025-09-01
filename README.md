# 🤠 Juego de Vaqueros 2D

Un emocionante juego de duelo de vaqueros implementando los **12 Principios de Animación de Disney** para el curso de Entorno Multimedia.

## 🎮 Características del Juego

- **Dos jugadores** en tiempo real
- **Físicas realistas** con gravedad y momentum
- **Sistema de partículas** avanzado
- **Efectos visuales** impactantes (screen shake, knockback)
- **Implementación completa** de los 12 principios de animación
- **Sonidos dinámicos** (cuando agregues los archivos de audio)

## 🕹️ Controles

### Jugador 1 (Vaquero Café)
- **A** - Mover izquierda
- **D** - Mover derecha
- **W** - Saltar
- **J** - Disparar

### Jugador 2 (Vaquero Gris)
- **← ↓ ↑ →** - Mover con flechas
- **↑** - Saltar
- **1** - Disparar

## 🎯 Objetivo del Juego

¡Reduce la vida del oponente a 0 para ganar el duelo! Cada disparo certero quita 20 puntos de vida.

## 🚀 Cómo Ejecutar

1. **Abre** el archivo `index.html` en cualquier navegador moderno
2. **¡Juega!** - El juego se carga automáticamente
3. **Presiona F5** para reiniciar si termina el juego

## 📁 Estructura del Proyecto

```
Vaqueros2/
├── index.html          # Archivo principal del juego
├── game.js            # Lógica completa del juego
├── DOCUMENTACION.md   # Explicación de principios de animación
├── README.md          # Este archivo
└── assets/
    ├── image/         # Sprites de los vaqueros
    │   ├── vaquero1SinFondo.png
    │   ├── vaquero2SinFondo.png
    │   ├── Personaje1SaltandoSinFondo.png
    │   ├── Personaje2SaltandoSinFondo.png
    │   ├── personaje1DisárandoSinFondo.png
    │   └── Personaje2DisparandoSinFondo.png
    └── sonidos/       # Archivos de audio (opcional)
        ├── disparo.wav (agregar aquí)
        └── salto.wav   (agregar aquí)
```

## 🎨 Principios de Animación Implementados

✅ **1. Squash and Stretch** - Compresión al aterrizar y estirar al saltar  
✅ **2. Anticipation** - Preparación antes del salto  
✅ **3. Staging** - Composición visual clara  
✅ **4. Straight Ahead/Pose to Pose** - Interpolación de movimientos  
✅ **5. Follow Through** - Inclinación al moverse  
✅ **6. Slow In/Slow Out** - Aceleración y desaceleración gradual  
✅ **7. Arc** - Trayectorias en arco para saltos y balas  
✅ **8. Secondary Action** - Partículas y efectos secundarios  
✅ **9. Timing** - Ritmo preciso en animaciones  
✅ **10. Exaggeration** - Efectos visuales amplificados  
✅ **11. Solid Drawing** - Sprites reales y proporciones correctas  
✅ **12. Appeal** - Diseño atractivo y satisfactorio  

## 🔊 Agregar Sonidos (Opcional)

Para agregar sonidos al juego:

1. Coloca tus archivos de audio en `assets/sonidos/`:
   - `disparo.wav` - Sonido al disparar
   - `salto.wav` - Sonido al saltar

2. Los sonidos se cargarán automáticamente si están presentes

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura del juego
- **CSS3** - Estilos y efectos visuales
- **JavaScript (ES6+)** - Lógica del juego y animaciones
- **Canvas API** - Renderizado 2D
- **Web Audio API** - Reproducción de sonidos

## 📊 Especificaciones Técnicas

- **Resolución**: 1000 x 600 píxeles
- **FPS**: 60 frames por segundo
- **Controles**: Teclado únicamente
- **Compatibilidad**: Todos los navegadores modernos

## 🎓 Información Académica

**Proyecto para**: Curso de Entorno Multimedia  
**Estudiante**: [Tu Nombre]  
**Carrera**: Ingeniería de Software  
**Objetivo**: Implementar los 12 principios de animación en un videojuego interactivo

## 📝 Notas de Desarrollo

- El juego funciona **completamente sin sonidos**
- Todas las animaciones son **fluidas a 60 FPS**
- **Física realista** implementada desde cero
- **Código bien documentado** y comentado
- **Escalable** para agregar más características

---

¡Disfruta del duelo de vaqueros! 🤠🔫

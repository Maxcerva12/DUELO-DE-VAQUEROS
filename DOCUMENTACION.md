# Juego de Vaqueros 2D - Implementación de los 12 Principios de Animación

## Principios de Animación Implementados

### 1. **Squash and Stretch** (Compresión y Estiramiento)
- **Ubicación**: Clase `Player`, métodos `updateSquashStretch()` y `drawPlayer()`
- **Implementación**: 
  - Los vaqueros se comprimen antes de saltar (anticipación)
  - Se estiran al saltar
  - Se comprimen al aterrizar
  - Se comprimen al recibir daño

### 2. **Anticipation** (Anticipación)
- **Ubicación**: Clase `Player`, método `startJumpAnticipation()`
- **Implementación**:
  - Breve pausa y compresión antes del salto
  - Los jugadores se "agachan" antes de saltar
  - Timer de anticipación de 150ms

### 3. **Staging** (Escenificación)
- **Ubicación**: Método `drawBackground()` y física general
- **Implementación**:
  - Fondo con montañas para dar profundidad
  - Separación clara entre primer plano y fondo
  - Gravedad y física realista

### 4. **Straight Ahead and Pose to Pose** (Directo y Pose a Pose)
- **Ubicación**: Método `drawPlayer()` y sistema de estados
- **Implementación**:
  - Interpolación suave entre poses (idle, salto, disparo)
  - Transiciones fluidas entre estados de animación
  - Sistema de estados bien definido

### 5. **Follow Through and Overlapping Action** (Seguimiento y Superposición)
- **Ubicación**: Clase `Player`, efectos de movimiento
- **Implementación**:
  - Los jugadores se inclinan al moverse
  - Las balas siguen un arco balístico con gravedad
  - Movimiento de cabello/ropa simulado con inclinación

### 6. **Slow In and Slow Out** (Entrar y Salir Lento)
- **Ubicación**: Método `decelerate()` y movimientos
- **Implementación**:
  - Aceleración gradual al moverse
  - Desaceleración suave al detenerse
  - Curvas de animación en lugar de movimiento lineal

### 7. **Arc** (Arco)
- **Ubicación**: Clase `Bullet` y movimiento de salto
- **Implementación**:
  - Las balas siguen un arco parabólico
  - Los saltos siguen una trayectoria de arco natural
  - Partículas siguen arcos realistas

### 8. **Secondary Action** (Acción Secundaria)
- **Ubicación**: Sistema de partículas y efectos
- **Implementación**:
  - Partículas de polvo al saltar
  - Efectos de impacto al aterrizar
  - Partículas de sangre al recibir daño
  - Screen shake al disparar

### 9. **Timing** (Tiempo)
- **Ubicación**: Cooldowns y velocidades variables
- **Implementación**:
  - Cooldown de disparo diferente para cada jugador
  - Velocidades de bala ligeramente aleatorias
  - Timing preciso para saltos y aterrizajes

### 10. **Exaggeration** (Exageración)
- **Ubicación**: Efectos de knockback y visuales
- **Implementación**:
  - Knockback exagerado al recibir impactos
  - Screen shake dramático
  - Partículas abundantes para efectos
  - Retroceso exagerado al disparar

### 11. **Solid Drawing** (Dibujo Sólido)
- **Ubicación**: Sistema de renderizado y sprites
- **Implementación**:
  - Uso de sprites reales en lugar de formas básicas
  - Fondo con perspectiva y profundidad
  - Iluminación y sombras simuladas
  - Proporciones consistentes

### 12. **Appeal** (Atractivo)
- **Ubicación**: Diseño general del juego
- **Implementación**:
  - Interfaz atractiva con gradientes
  - Efectos visuales llamativos
  - Paleta de colores del oeste americano
  - Animaciones fluidas y satisfactorias

## Controles del Juego

### Jugador 1 (Vaquero Izquierdo)
- **A**: Mover izquierda
- **D**: Mover derecha  
- **W**: Saltar
- **J**: Disparar

### Jugador 2 (Vaquero Derecho)
- **Flecha Izquierda**: Mover izquierda
- **Flecha Derecha**: Mover derecha
- **Flecha Arriba**: Saltar
- **1**: Disparar

## Características Técnicas

- **Resolución**: 1000x600 píxeles
- **FPS Target**: 60 FPS
- **Tecnología**: HTML5 Canvas + JavaScript
- **Física**: Motor de física personalizado
- **Sonido**: Web Audio API (cuando agregues los archivos)

## Instrucciones de Ejecución

1. Asegúrate de que todos los archivos estén en su lugar
2. Abre `index.html` en un navegador web moderno
3. El juego se iniciará automáticamente
4. ¡Disfruta del duelo de vaqueros!


# 🚀 Guía de Instalación y Configuración - Duelo de Vaqueros

## 📋 Requisitos del Sistema

### Navegadores Compatibles
| Navegador | Versión Mínima | Estado |
|-----------|---------------|--------|
| Google Chrome | 80+ | ✅ Totalmente compatible |
| Mozilla Firefox | 75+ | ✅ Totalmente compatible |
| Microsoft Edge | 80+ | ✅ Totalmente compatible |
| Safari | 13+ | ✅ Totalmente compatible |
| Opera | 67+ | ✅ Totalmente compatible |

### Requisitos de Hardware
- **Procesador**: 1 GHz o superior
- **Memoria RAM**: 2 GB mínimo (4 GB recomendado)
- **Resolución**: 1024x768 píxeles mínimo
- **Audio**: Tarjeta de sonido compatible (opcional)

## 🔧 Instalación

### Opción 1: Descarga Directa (Recomendado para usuarios)

1. **Descargar** el proyecto completo
   ```bash
   # Descargar ZIP desde GitHub
   https://github.com/Maxcerva12/DUELO-DE-VAQUEROS/archive/main.zip
   ```

2. **Extraer** los archivos en una carpeta de tu elección

3. **Abrir** el archivo `index.html` con doble clic

### Opción 2: Clonar Repositorio (Recomendado para desarrolladores)

```bash
# Clonar el repositorio
git clone https://github.com/Maxcerva12/DUELO-DE-VAQUEROS.git

# Navegar al directorio
cd DUELO-DE-VAQUEROS

# Abrir index.html en tu navegador preferido
```

### Opción 3: Servidor Local (Recomendado para desarrollo)

#### Con Python (Instalado por defecto en la mayoría de sistemas)
```bash
# Python 3
python -m http.server 8000

# Python 2 (versiones antiguas)
python -m SimpleHTTPServer 8000

# Acceder a: http://localhost:8000
```

#### Con Node.js
```bash
# Instalar servidor estático global
npm install -g serve

# Ejecutar en el directorio del juego
serve .

# O usar npx (sin instalación global)
npx serve .
```

#### Con Live Server (Visual Studio Code)
1. Instalar extensión "Live Server"
2. Clic derecho en `index.html`
3. Seleccionar "Open with Live Server"

## 📂 Verificación de Archivos

Asegúrate de que tienes todos los archivos necesarios:

```
DUELO-DE-VAQUEROS/
├── ✅ index.html              # Archivo principal
├── ✅ game.js                 # Lógica del juego
├── ✅ styles/
│   └── ✅ main.css           # Estilos
├── ✅ assets/
│   ├── ✅ image/             # Imágenes de personajes
│   │   ├── vaquero1SinFondo.png
│   │   ├── vaquero2SinFondo.png
│   │   ├── Personaje1SaltandoSinFondo.png
│   │   ├── Personaje2SaltandoSinFondo.png
│   │   ├── personaje1DisárandoSinFondo.png
│   │   ├── Personaje2DisparandoSinFondo.png
│   │   ├── Personaje1Derrotado.png
│   │   └── Personaje2Derrotado.png
│   └── ✅ sonidos/           # Efectos de audio
│       ├── disparo.mp3
│       ├── salto.mp3
│       ├── inicio.mp3
│       └── victoria.mp3
├── 📚 README.md               # Documentación principal
├── 📚 DOCUMENTACION.md        # Documentación técnica
└── 📚 INSTALL.md             # Esta guía
```

## 🎮 Primera Ejecución

### Pasos para Jugar

1. **Abrir** el juego en tu navegador
2. **Verificar** que aparece la pantalla de inicio
3. **Hacer clic** en "INICIAR PARTIDA"
4. **Comprobar** que los controles responden:
   - Jugador 1: A, D (mover), W (saltar), J (disparar)
   - Jugador 2: Flechas (mover), ↑ (saltar), 1 (disparar)

### Verificación de Audio

Si el audio no funciona:
1. **Verificar** que los archivos MP3 están en `assets/sonidos/`
2. **Comprobar** permisos del navegador para reproducir audio
3. **Hacer clic** en el canvas para dar foco al juego

## 🐛 Solución de Problemas Comunes

### ❌ "Las imágenes no cargan"

**Síntomas**: Rectángulos de colores en lugar de vaqueros

**Soluciones**:
```bash
# Verificar rutas de archivos
ls assets/image/

# Comprobar que los nombres coinciden exactamente
# (incluidas mayúsculas y tildes)
```

### ❌ "El juego va lento"

**Síntomas**: FPS bajos, movimiento entrecortado

**Soluciones**:
- Cerrar otras pestañas del navegador
- Actualizar el navegador a la última versión
- Verificar que tu hardware cumple los requisitos
- Usar servidor local en lugar de abrir archivo directamente

### ❌ "Los controles no responden"

**Síntomas**: Teclas no afectan a los personajes

**Soluciones**:
- Hacer clic en el canvas del juego para darle foco
- Verificar que no hay otra aplicación capturando el teclado
- Recargar la página (F5)

### ❌ "No hay sonido"

**Síntomas**: El juego funciona pero sin audio

**Soluciones**:
- Verificar que los archivos MP3 están presentes
- Comprobar el volumen del sistema
- Permitir reproducción automática en el navegador
- Interactuar con la página antes de que intente reproducir audio

### ❌ "Error de CORS" (Cross-Origin)

**Síntomas**: Error en consola sobre "Access-Control-Allow-Origin"

**Soluciones**:
- Usar un servidor local (no abrir archivo directamente)
- Usar cualquiera de los métodos de servidor local mencionados arriba

## ⚡ Optimización de Rendimiento

### Para Mejor Experiencia

1. **Cerrar aplicaciones** no necesarias
2. **Usar navegador actualizado**
3. **Resolución de pantalla** adecuada (mínimo 1024x768)
4. **Conexión estable** si usas servidor local

### Configuraciones del Navegador

#### Chrome
```
chrome://flags/#enable-experimental-web-platform-features
Activar para mejores características web
```

#### Firefox
```
about:config
dom.webcomponents.enabled = true
```

## 🔧 Configuración Avanzada

### Variables de Configuración

Si quieres modificar el juego, edita estas variables en `game.js`:

```javascript
// Configuración de física
const GRAVITY = 0.8;
const JUMP_POWER = -15;
const MOVE_SPEED = 5;

// Configuración de gameplay
const PLAYER_HEALTH = 100;
const BULLET_DAMAGE = 20;
const BULLET_SPEED = 12;

// Configuración visual
const SCREEN_SHAKE_INTENSITY = 8;
const PARTICLE_COUNT = 5;
```

### Modificar Controles

Para cambiar los controles, edita la función `handleKeyPress()`:

```javascript
// Controles actuales
const controls = {
    player1: {
        left: 'KeyA',
        right: 'KeyD', 
        jump: 'KeyW',
        shoot: 'KeyJ'
    },
    player2: {
        left: 'ArrowLeft',
        right: 'ArrowRight',
        jump: 'ArrowUp', 
        shoot: 'Digit1'
    }
};
```

## 📊 Monitoreo de Rendimiento

### Herramientas de Debug

Presiona **F12** para abrir las herramientas de desarrollador:

1. **Console**: Ver mensajes de error
2. **Performance**: Analizar FPS y rendimiento
3. **Network**: Verificar carga de recursos

### Métricas Importantes

- **FPS**: Debe mantenerse cerca de 60
- **Update Time**: < 16ms para 60 FPS
- **Render Time**: < 10ms ideal
- **Memory Usage**: No debe crecer constantemente

## 🆘 Soporte y Ayuda

### Información de Debug

Si encuentras problemas, incluye esta información al reportar:

```bash
# Información del navegador
Navigator: [Nombre y versión]
OS: [Sistema operativo]
Screen: [Resolución de pantalla]
Error: [Mensaje de error exacto]
Console: [Logs de la consola F12]
```

### Contacto

- **GitHub Issues**: [Reportar problemas](https://github.com/Maxcerva12/DUELO-DE-VAQUEROS/issues)
- **Repositorio**: [Código fuente](https://github.com/Maxcerva12/DUELO-DE-VAQUEROS)

---

<div align="center">

**🤠 ¡Listo para el duelo! 🤠**

*Si sigues esta guía paso a paso, tendrás el juego funcionando en minutos*

</div>

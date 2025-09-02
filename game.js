class VaquerosGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        
        this.gameState = 'menu'; 
        this.gameTime = 0;
        
        // Variable para controlar la secuencia de fin de juego
        this.gameEndingSequence = false;
        
        // Referencias a elementos del DOM
        this.startScreen = document.getElementById('startScreen');
        this.instructionsScreen = document.getElementById('instructionsScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.gameInfo = document.getElementById('gameInfo');
        this.controls = document.getElementById('controls');
        
        
        this.keys = {};
        
        
        this.player1 = null;
        this.player2 = null;
        
        
        this.bullets = [];
        this.particles = [];
        this.screenShake = 0;
        
        
        this.images = {};
        this.sounds = {};
        
        
        this.loadAssets();
        this.setupEventListeners();
        this.setupUI();
        this.gameLoop();
    }
    
    loadAssets() {
        
        this.images = {
            player1: {
                idle: new Image(),
                jump: new Image(),
                shoot: new Image(),
                defeated: new Image()
            },
            player2: {
                idle: new Image(),
                jump: new Image(),
                shoot: new Image(),
                defeated: new Image()
            }
        };
        
        
        this.images.player1.idle.src = 'assets/image/vaquero1SinFondo.png';
        this.images.player1.jump.src = 'assets/image/Personaje1SaltandoSinFondo.png';
        this.images.player1.shoot.src = 'assets/image/personaje1DisárandoSinFondo.png';
        this.images.player1.defeated.src = 'assets/image/Personaje1Derrotado.png';
        
        
        this.images.player2.idle.src = 'assets/image/vaquero2SinFondo.png';
        this.images.player2.jump.src = 'assets/image/Personaje2SaltandoSinFondo.png';
        this.images.player2.shoot.src = 'assets/image/Personaje2DisparandoSinFondo.png';
        this.images.player2.defeated.src = 'assets/image/Personaje2Derrotado.png';
        
        
        this.loadSounds();
    }
    
    loadSounds() {
        try {
            this.sounds = {
                shoot: new Audio('assets/sonidos/disparo.mp3'),
                jump: new Audio('assets/sonidos/salto.mp3'),
                start: new Audio('assets/sonidos/inicio.mp3'),
                victory: new Audio('assets/sonidos/victoria.mp3'),
                impact: new Audio('assets/sonidos/disparo.mp3'),
            };
            
            
            Object.values(this.sounds).forEach(sound => {
                sound.volume = 0.5;
                sound.preload = 'auto';
            });
            
            // Configuración específica para el sonido de impacto (más corto y distorsionado)
            if (this.sounds.impact) {
                this.sounds.impact.playbackRate = 1.5; // Más rápido
                this.sounds.impact.volume = 0.4; // Volumen más bajo
            }
            
            console.log('Sonidos cargados correctamente');
        } catch (error) {
            console.log('Error cargando sonidos:', error);
            
            this.sounds = {
                shoot: { play: () => {}, currentTime: 0 },
                jump: { play: () => {}, currentTime: 0 },
                start: { play: () => {}, currentTime: 0 },
                victory: { play: () => {}, currentTime: 0 },
                impact: { play: () => {}, currentTime: 0, playbackRate: 1 },
            };
        }
    }
    
    setupEventListeners() {
        // Eventos de teclado
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.handleKeyPress(e.key.toLowerCase());
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
        
        
        document.addEventListener('keydown', (e) => {
            if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }
        });
    }
    
    setupUI() {
        
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startGame();
        });
        
        
        document.getElementById('instructionsBtn').addEventListener('click', () => {
            this.showInstructions();
        });
        
        
        document.getElementById('backToMenuBtn').addEventListener('click', () => {
            this.showMainMenu();
        });
        
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.startGame();
        });
        
        
        document.getElementById('mainMenuBtn').addEventListener('click', () => {
            this.showMainMenu();
        });
    }
    
    showMainMenu() {
        this.gameState = 'menu';
        this.startScreen.style.display = 'flex';
        this.instructionsScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'none';
        this.canvas.style.display = 'none';
        this.gameInfo.style.display = 'none';
        this.controls.style.display = 'none';
        document.body.className = 'game-start';
    }
    
    showInstructions() {
        this.startScreen.style.display = 'none';
        this.instructionsScreen.style.display = 'flex';
    }
    
    startGame() {
        this.gameState = 'playing';
        this.gameTime = 0;
        this.gameEndingSequence = false;
        
        // Ocultar menús y mostrar juego
        this.startScreen.style.display = 'none';
        this.instructionsScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'none';
        this.canvas.style.display = 'block';
        this.gameInfo.style.display = 'flex';
        this.controls.style.display = 'block';
        this.controls.style.opacity = '1'; 
        document.body.className = 'game-playing';
        
        // Ocultar los controles después de 3 segundos
        if (this.controlsTimer) {
            clearTimeout(this.controlsTimer);
        }
        this.controlsTimer = setTimeout(() => {
            if (this.controls) {
                this.controls.style.opacity = '0';
                setTimeout(() => {
                    this.controls.style.display = 'none';
                }, 500); // 500ms para la transición de desvanecimiento
            }
        }, 3000);
        
        // Inicializar jugadores 
        this.player1 = new Player(1, 100, this.height - 170, 'player1');
        this.player2 = new Player(2, this.width - 200, this.height - 170, 'player2');
        
        
        this.bullets = [];
        this.particles = [];
        this.screenShake = 0;
        
        
        this.playSound('start');
    }
    
    handleKeyPress(key) {
        // Controles del menú
        if (this.gameState === 'menu') {
            if (key === 'enter' || key === ' ') {
                this.startGame();
            }
            return;
        }
        
        // Controles del juego
        if (this.gameState === 'playing') {
            // Pausa
            if (key === 'p' || key === 'escape') {
                this.gameState = 'paused';
                document.body.className = 'game-paused';
                return;
            }
            
            // Jugador 1 - Disparo
            if (key === 'j' && this.player1 && this.player1.canShoot()) {
                this.player1.shoot();
                this.createBullet(this.player1);
                this.playSound('shoot');
                this.createSoundWave(this.player1);
            }
            
            // Jugador 2 - Disparo
            if (key === '1' && this.player2 && this.player2.canShoot()) {
                this.player2.shoot();
                this.createBullet(this.player2);
                this.playSound('shoot');
                this.createSoundWave(this.player2);
            }
        }
        
        // Reanudar desde pausa
        if (this.gameState === 'paused') {
            if (key === 'p' || key === ' ') {
                this.gameState = 'playing';
                document.body.className = 'game-playing';
            }
        }
        
        // Reiniciar desde game over
        if (this.gameState === 'gameOver') {
            if (key === 'enter' || key === ' ') {
                this.startGame();
            }
        }
    }
    
    createBullet(player) {
        const bullet = new Bullet(
            player.x + player.width / 2,
            player.y + player.height / 2,
            player.facing,
            player.id
        );
        this.bullets.push(bullet);
        
        // Principio 9: Timing - Variación en velocidad
        bullet.speed += (Math.random() - 0.5) * 2;
        
        // Sacudida de pantalla por disparo
        this.screenShake = 8;
        this.canvas.classList.add('shake');
        setTimeout(() => this.canvas.classList.remove('shake'), 500);
    }
    
    createSoundWave(player) {
        // Crear elemento visual de onda sonora
        const wave = document.createElement('div');
        wave.className = 'sound-wave';
        wave.style.position = 'absolute';
        wave.style.left = (player.x + player.width / 2) + 'px';
        wave.style.top = (player.y + player.height / 2) + 'px';
        document.getElementById('gameContainer').appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentNode) {
                wave.remove();
            }
        }, 600);
    }
    
    playSound(soundName) {
        try {
            if (this.sounds[soundName]) {
                this.sounds[soundName].currentTime = 0;
                this.sounds[soundName].play().catch(e => {
                    console.log('Error reproduciendo sonido:', e);
                });
            }
        } catch (error) {
            console.log('Error con el sonido:', error);
        }
    }
    
    update(deltaTime) {
        if (this.gameState !== 'playing') return;
        
        this.gameTime += deltaTime;
        
        // Actualizar jugadores
        if (this.player1 && this.player2) {
            this.updatePlayer(this.player1, {
                left: 'a',
                right: 'd',
                jump: 'w'
            });
            
            this.updatePlayer(this.player2, {
                left: 'arrowleft',
                right: 'arrowright',
                jump: 'arrowup'
            });
        }
        
        // Actualizar proyectiles
        this.updateBullets(deltaTime);
        
        // Actualizar partículas
        this.updateParticles(deltaTime);
        
        // Verificar colisiones
        this.checkCollisions();
        
        // Actualizar efectos de pantalla
        this.updateScreenEffects();
        
        // Actualizar UI
        this.updateUI();
        
        // Verificar condiciones de victoria
        this.checkGameOver();
    }
    
    updatePlayer(player, controls) {
        // Principio 1: Squash and Stretch - Los jugadores se comprimen al aterrizar
        player.updateSquashStretch();
        
        // Forzar al suelo si está flotando sin moverse
        if (!player.grounded && Math.abs(player.velocityY) < 0.1 && Math.abs(player.velocityX) < 0.1) {
            player.velocityY = 5; // Aplicar una velocidad hacia abajo para que caiga al suelo
        }
        
        // Principio 2: Anticipation - Preparación antes del salto
        if (this.keys[controls.jump] && player.grounded && !player.jumpAnticipation) {
            player.startJumpAnticipation();
        }
        
        // Movimiento horizontal
        if (this.keys[controls.left]) {
            player.moveLeft();
        } else if (this.keys[controls.right]) {
            player.moveRight();
        } else {
            // Principio 7: Slow In and Slow Out - Desaceleración gradual
            player.decelerate();
        }
        
        // Salto
        if (player.jumpAnticipation && player.anticipationTimer <= 0) {
            player.jump();
            this.playSound('jump');
            this.createJumpParticles(player);
        }
        
        // Principio 3: Staging - Física y gravedad
        player.applyGravity();
        player.updatePosition();
        
        // Principio 10: Secondary Action - Animaciones secundarias
        player.updateSecondaryAnimations();
        
        // Límites del canvas
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > this.width) player.x = this.width - player.width;
        
        // Límite del suelo - Ajustar para que los jugadores estén más centrados en el suelo
        const groundLevel = this.height - 50; 
        if (player.y + player.height > groundLevel) {
            player.y = groundLevel - player.height;
            player.grounded = true;
            player.velocityY = 0;
            player.isJumping = false;
            
            // Principio 1: Squash and Stretch al aterrizar
            if (player.wasInAir) {
                player.squashStretch = -0.3;
                player.wasInAir = false;
                this.createLandingParticles(player);
            }
        } else {
            player.grounded = false;
        }
    }
    
    updateBullets(deltaTime) {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            bullet.update(deltaTime);
            
            // Eliminar balas fuera de pantalla
            if (bullet.x < 0 || bullet.x > this.width || 
                bullet.y < 0 || bullet.y > this.height) {
                this.bullets.splice(i, 1);
            }
        }
    }
    
    updateParticles(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update(deltaTime);
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    checkCollisions() {
        // Colisiones bala-jugador
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            
            // Verificar colisión con el jugador opuesto
            const target = bullet.playerId === 1 ? this.player2 : this.player1;
            
            if (this.isColliding(bullet, target)) {
                // Principio 8: Appeal - Efecto visual impactante
                this.createHitEffect(target);
                target.takeDamage(10);
                this.bullets.splice(i, 1);
                this.screenShake = 15;
                
                // Reproducir sonido de impacto
                if (this.sounds.impact) {
                    this.sounds.impact.currentTime = 0;
                    this.sounds.impact.play();
                }
                
                // Principio 11: Exaggeration - Knockback exagerado
                target.applyKnockback(bullet.direction);
            }
        }
    }
    
    isColliding(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }
    
    createJumpParticles(player) {
        for (let i = 0; i < 5; i++) {
            this.particles.push(new Particle(
                player.x + player.width / 2 + (Math.random() - 0.5) * 20,
                player.y + player.height,
                'dust'
            ));
        }
    }
    
    createLandingParticles(player) {
        for (let i = 0; i < 8; i++) {
            this.particles.push(new Particle(
                player.x + player.width / 2 + (Math.random() - 0.5) * 30,
                player.y + player.height,
                'impact'
            ));
        }
    }
    
    createHitEffect(player) {
        for (let i = 0; i < 10; i++) {
            this.particles.push(new Particle(
                player.x + player.width / 2,
                player.y + player.height / 2,
                'hit'
            ));
        }
    }
    
    updateScreenEffects() {
        if (this.screenShake > 0) {
            this.screenShake *= 0.9;
            if (this.screenShake < 0.1) this.screenShake = 0;
        }
    }
    
    updateUI() {
        if (this.player1 && this.player2) {
            // Actualizar barras de vida
            const player1Health = Math.max(0, this.player1.health);
            const player2Health = Math.max(0, this.player2.health);
            
            document.getElementById('player1Health').textContent = player1Health;
            document.getElementById('player2Health').textContent = player2Health;
            
            // Actualizar barras visuales
            const player1Bar = document.getElementById('player1HealthBar');
            const player2Bar = document.getElementById('player2HealthBar');
            
            if (player1Bar) {
                const percent1 = (player1Health / this.player1.maxHealth) * 100;
                player1Bar.style.width = percent1 + '%';
                
                // Cambiar color según la vida
                if (percent1 > 60) {
                    player1Bar.style.background = 'linear-gradient(90deg, #44FF44 0%, #88FF44 100%)';
                } else if (percent1 > 30) {
                    player1Bar.style.background = 'linear-gradient(90deg, #FFAA00 0%, #FFDD44 100%)';
                } else {
                    player1Bar.style.background = 'linear-gradient(90deg, #FF4444 0%, #FF6644 100%)';
                }
            }
            
            if (player2Bar) {
                const percent2 = (player2Health / this.player2.maxHealth) * 100;
                player2Bar.style.width = percent2 + '%';
                
                // Cambiar color según la vida
                if (percent2 > 60) {
                    player2Bar.style.background = 'linear-gradient(90deg, #44FF44 0%, #88FF44 100%)';
                } else if (percent2 > 30) {
                    player2Bar.style.background = 'linear-gradient(90deg, #FFAA00 0%, #FFDD44 100%)';
                } else {
                    player2Bar.style.background = 'linear-gradient(90deg, #FF4444 0%, #FF6644 100%)';
                }
            }
        }
    }
    
    checkGameOver() {
        if (this.player1 && this.player2) {
            if (this.player1.health <= 0 || this.player2.health <= 0) {
                // Determinar quién ganó
                const winner = this.player1.health <= 0 ? 'Jugador 2' : 'Jugador 1';
                
                // Si aún no hemos iniciado la secuencia de fin de juego
                if (this.gameState === 'playing' && !this.gameEndingSequence) {
                    this.gameEndingSequence = true;
                    
                    // Esperar 1.5 segundos para mostrar la animación de derrota
                    setTimeout(() => {
                        this.gameState = 'gameOver';
                        
                        // Mostrar pantalla de game over
                        document.getElementById('winnerText').textContent = `¡${winner} Gana!`;
                        this.gameOverScreen.style.display = 'flex';
                        document.body.className = 'game-over';
                        
                        // Reproducir sonido de victoria
                        this.playSound('victory');
                    }, 1500);
                }
            }
        }
    }
    
    render() {
        if (this.gameState !== 'playing') return;
        
        // Limpiar canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Principio 12: Solid Drawing - Fondo con perspectiva
        this.drawBackground();
        
        // Aplicar screen shake
        if (this.screenShake > 0) {
            this.ctx.save();
            this.ctx.translate(
                (Math.random() - 0.5) * this.screenShake,
                (Math.random() - 0.5) * this.screenShake
            );
        }
        
        // Dibujar partículas de fondo
        this.drawParticles('background');
        
        // Dibujar jugadores
        if (this.player1) this.drawPlayer(this.player1);
        if (this.player2) this.drawPlayer(this.player2);
        
        // Dibujar proyectiles
        this.drawBullets();
        
        // Dibujar partículas de primer plano
        this.drawParticles('foreground');
        
        // Restaurar transformación si había screen shake
        if (this.screenShake > 0) {
            this.ctx.restore();
        }
    }
    
    drawBackground() {
        // Cielo con gradiente dinámico
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.7, '#F4A460');
        gradient.addColorStop(1, '#D2B48C');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Sol en el fondo
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(this.width - 100, 80, 40, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Rayos del sol
        this.ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(this.width - 100 + Math.cos(angle) * 50, 80 + Math.sin(angle) * 50);
            this.ctx.lineTo(this.width - 100 + Math.cos(angle) * 70, 80 + Math.sin(angle) * 70);
            this.ctx.stroke();
        }
        
        // Montañas en el fondo con paralaje
        this.ctx.fillStyle = '#8B4513';
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height * 0.6);
        for (let i = 0; i <= this.width; i += 50) {
            const height = Math.sin(i * 0.01 + this.gameTime * 0.0005) * 40 + this.height * 0.6;
            this.ctx.lineTo(i, height);
        }
        this.ctx.lineTo(this.width, this.height);
        this.ctx.lineTo(0, this.height);
        this.ctx.fill();
        
        // Suelo con textura
        this.ctx.fillStyle = '#D2B48C';
        this.ctx.fillRect(0, this.height - 100, this.width, 100);
        
        // Líneas de textura en el suelo
        this.ctx.strokeStyle = 'rgba(139, 69, 19, 0.3)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < this.width; i += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, this.height - 100);
            this.ctx.lineTo(i, this.height);
            this.ctx.stroke();
        }
    }
    
    drawPlayer(player) {
        // Dibujar sombra ANTES del jugador para que quede abajo
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.ellipse(
            player.x + player.width / 2,
            this.height - 55, 
            player.width / 2,
            8,
            0, 0, Math.PI * 2
        );
        this.ctx.fill();
        
        this.ctx.save();
        
        // Principio 4: Straight Ahead and Pose to Pose - Interpolación de poses
        const centerX = player.x + player.width / 2;
        const centerY = player.y + player.height / 2;
        
        this.ctx.translate(centerX, centerY);
        
        // Principio 1: Squash and Stretch
        this.ctx.scale(
            1 + player.squashStretch * 0.2,
            1 - player.squashStretch * 0.3
        );
        
        // Flip horizontal según la dirección
        if (player.facing === -1) {
            this.ctx.scale(-1, 1);
        }
        
        // Principio 6: Follow Through and Overlapping Action - Inclinación al moverse
        if (Math.abs(player.velocityX) > 1) {
            this.ctx.rotate(player.velocityX * 0.03);
        }
        
        // Seleccionar imagen según el estado
        let image;
        if (player.isDefeated) {
            // Si el jugador está derrotado, usar la imagen de derrota
            image = this.images[`player${player.id}`].defeated;
        } else if (player.isJumping) {
            image = this.images[`player${player.id}`].jump;
        } else if (player.isShooting) {
            image = this.images[`player${player.id}`].shoot;
        } else {
            image = this.images[`player${player.id}`].idle;
        }
        
        // Dibujar la imagen del jugador
        if (image && image.complete) {
            this.ctx.drawImage(
                image,
                -player.width / 2,
                -player.height / 2,
                player.width,
                player.height
            );
        } else {
            // Fallback si la imagen no está cargada
            this.ctx.fillStyle = player.id === 1 ? '#8B4513' : '#654321';
            this.ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
            
            // Sombrero
            this.ctx.fillStyle = '#2F1B14';
            this.ctx.fillRect(-player.width / 2 + 10, -player.height / 2 - 10, player.width - 20, 15);
        }
        
        this.ctx.restore();
    }
    
    drawBullets() {
        this.bullets.forEach(bullet => {
            // Principio 5: Arc - Trayectoria con arco
            this.ctx.save();
            this.ctx.translate(bullet.x, bullet.y);
            
            // Principio 11: Exaggeration - Balas con estela brillante
            this.ctx.fillStyle = '#FFD700';
            this.ctx.shadowColor = '#FFD700';
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 4, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Estela
            this.ctx.shadowBlur = 0;
            this.ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
            this.ctx.fillRect(-8, -1, 8, 2);
            this.ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
            this.ctx.fillRect(-16, -0.5, 8, 1);
            
            this.ctx.restore();
        });
    }
    
    drawParticles(layer) {
        this.particles.forEach(particle => {
            if (particle.layer === layer) {
                particle.draw(this.ctx);
            }
        });
    }
    
    gameLoop() {
        const now = performance.now();
        const deltaTime = now - (this.lastTime || now);
        this.lastTime = now;
        
        this.update(deltaTime);
        this.render();
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Clase Player
class Player {
    constructor(id, x, y, name) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 120;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpPower = 15;
        this.grounded = true;
        this.facing = id === 1 ? 1 : -1;
        
        // Estados de animación
        this.isJumping = false;
        this.isShooting = false;
        this.isDefeated = false; 
        this.shootTimer = 0;
        this.squashStretch = 0;
        this.wasInAir = false;
        
        // Anticipación de salto
        this.jumpAnticipation = false;
        this.anticipationTimer = 0;
        
        // Vida
        this.health = 100;
        this.maxHealth = 100;
        
        // Cooldown de disparo
        this.lastShot = 0;
        this.shootCooldown = 300; // ms
    }
    
    moveLeft() {
        this.velocityX = Math.max(this.velocityX - 0.8, -this.speed);
        this.facing = -1;
    }
    
    moveRight() {
        this.velocityX = Math.min(this.velocityX + 0.8, this.speed);
        this.facing = 1;
    }
    
    decelerate() {
        this.velocityX *= 0.85;
        if (Math.abs(this.velocityX) < 0.1) this.velocityX = 0;
    }
    
    startJumpAnticipation() {
        if (this.grounded) {
            this.jumpAnticipation = true;
            this.anticipationTimer = 150; // ms de anticipación
            this.squashStretch = -0.5; // Compresión para anticipar
        }
    }
    
    jump() {
        if (this.grounded) {
            this.velocityY = -this.jumpPower;
            this.grounded = false;
            this.isJumping = true;
            this.wasInAir = true;
            this.jumpAnticipation = false;
            this.squashStretch = 0.3; // Estiramiento al saltar
        }
    }
    
    applyGravity() {
        if (!this.grounded) {
            // Aumentamos la gravedad para que vuelva más rápido al suelo después de un knockback
            this.velocityY += 1.2; 
            
            // Limitamos la velocidad máxima de caída para evitar que caiga demasiado rápido
            if (this.velocityY > 15) this.velocityY = 15;
        }
        
        // Actualizar timer de anticipación
        if (this.jumpAnticipation && this.anticipationTimer > 0) {
            this.anticipationTimer -= 16; // Aproximadamente 60 FPS
        }
    }
    
    updatePosition() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
    
    updateSquashStretch() {
        // Retornar gradualmente a la forma normal
        this.squashStretch *= 0.9;
        if (Math.abs(this.squashStretch) < 0.01) {
            this.squashStretch = 0;
        }
    }
    
    updateSecondaryAnimations() {
        // Principio 10: Secondary Action - Animaciones secundarias
        
        // Timer de disparo
        if (this.isShooting) {
            this.shootTimer -= 16;
            if (this.shootTimer <= 0) {
                this.isShooting = false;
            }
        }
        
        // Detectar si está en el aire
        if (!this.grounded && !this.isJumping) {
            this.isJumping = true;
        }
    }
    
    canShoot() {
        const now = Date.now();
        return now - this.lastShot >= this.shootCooldown;
    }
    
    shoot() {
        if (this.canShoot()) {
            this.isShooting = true;
            this.shootTimer = 200; // ms
            this.lastShot = Date.now();
            
            // Principio 2: Anticipation - Pequeño retroceso al disparar
            this.velocityX += this.facing * -0.5;
        }
    }
    
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        
        // Verificar si el jugador ha sido derrotado
        if (this.health <= 0) {
            this.isDefeated = true;
            this.velocityX = 0; 
        }
        
        // Principio 1: Squash and Stretch - Compresión al recibir daño
        this.squashStretch = -0.4;
        
        // Efecto visual de daño
        this.damageFlash = 10;
    }
    
    applyKnockback(direction) {
        // Principio 11: Exaggeration - Knockback exagerado
        this.velocityX += direction * 3;
        this.velocityY = -2;
        // Asegurarse de que el personaje vuelve al suelo rápidamente
        this.grounded = false; // Inicialmente lo sacamos del suelo
    }
}

// Clase Bullet
class Bullet {
    constructor(x, y, direction, playerId) {
        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = 4;
        this.speed = 12;
        this.direction = direction;
        this.playerId = playerId;
        this.velocityX = this.speed * direction;
        this.velocityY = 0;
        
        // Principio 5: Arc - Pequeña caída por gravedad
        this.gravity = 0.1;
        
        // Principio 9: Timing - Variación en la velocidad
        this.speed += (Math.random() - 0.5) * 2;
    }
    
    update(deltaTime) {
        // Movimiento horizontal
        this.x += this.velocityX;
        
        // Principio 5: Arc - Aplicar gravedad para trayectoria curva
        this.velocityY += this.gravity;
        this.y += this.velocityY;
        
        // Principio 9: Timing - Desaceleración gradual
        this.velocityX *= 0.998;
    }
}

// Clase Particle
class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.life = 1.0;
        this.maxLife = 1.0;
        
        // Propiedades según el tipo
        switch (type) {
            case 'dust':
                this.velocityX = (Math.random() - 0.5) * 4;
                this.velocityY = -Math.random() * 3 - 1;
                this.size = Math.random() * 3 + 2;
                this.color = '#D2B48C';
                this.layer = 'background';
                this.maxLife = 0.8;
                break;
                
            case 'impact':
                this.velocityX = (Math.random() - 0.5) * 6;
                this.velocityY = -Math.random() * 5 - 2;
                this.size = Math.random() * 4 + 3;
                this.color = '#8B4513';
                this.layer = 'foreground';
                this.maxLife = 1.0;
                break;
                
            case 'hit':
                this.velocityX = (Math.random() - 0.5) * 8;
                this.velocityY = -Math.random() * 6 - 1;
                this.size = Math.random() * 5 + 2;
                this.color = '#FF4444';
                this.layer = 'foreground';
                this.maxLife = 0.6;
                break;
                
            default:
                this.velocityX = (Math.random() - 0.5) * 2;
                this.velocityY = -Math.random() * 2;
                this.size = Math.random() * 2 + 1;
                this.color = '#FFD700';
                this.layer = 'foreground';
                this.maxLife = 0.5;
        }
        
        this.life = this.maxLife;
        this.gravity = 0.2;
    }
    
    update(deltaTime) {
        // Principio 3: Staging - Física de partículas
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Aplicar gravedad
        this.velocityY += this.gravity;
        
        // Principio 7: Slow In and Slow Out - Desaceleración
        this.velocityX *= 0.98;
        
        // Reducir vida
        this.life -= deltaTime * 0.001;
        
        // Principio 8: Appeal - Reducir tamaño gradualmente
        this.size *= 0.99;
    }
    
    draw(ctx) {
        // Principio 10: Secondary Action - Transparencia basada en vida
        const alpha = this.life / this.maxLife;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Dibujar partícula con gradiente
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );
        
        if (this.type === 'hit') {
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(255, 68, 68, 0)');
        } else {
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(210, 180, 140, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Inicializar el juego cuando se cargue la página
window.addEventListener('load', () => {
    new VaquerosGame();
});

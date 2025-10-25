// GAME CLASS
class Game {
    constructor(canvasId, scoreId, gameNumber) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.scoreElement = document.getElementById(scoreId);
      this.gameNumber = gameNumber;
      
      this.player = {
        x: 50,
        y: 200,
        size: 40,
        speed: 4,
        emoji: gameNumber === 1 ? '💪' : '🏃'
      };
      
      this.collectibles = [];
      this.obstacles = [];
      this.score = 0;
      this.gameActive = true;
      
      this.keys = {};
      
      this.setupControls();
      this.spawnCollectibles();
      this.spawnObstacles();
      this.gameLoop();
    }
    
    setupControls() {
      document.addEventListener('keydown', (e) => {
        this.keys[e.key] = true;
      });
      
      document.addEventListener('keyup', (e) => {
        this.keys[e.key] = false;
      });
    }
    
    spawnCollectibles() {
      for (let i = 0; i < 5; i++) {
        this.collectibles.push({
          x: Math.random() * (this.canvas.width - 30) + 15,
          y: Math.random() * (this.canvas.height - 30) + 15,
          size: 25,
          emoji: '⚡'
        });
      }
    }
    
    spawnObstacles() {
      for (let i = 0; i < 3; i++) {
        this.obstacles.push({
          x: Math.random() * (this.canvas.width - 40) + 150,
          y: Math.random() * (this.canvas.height - 40) + 20,
          size: 35,
          speedX: (Math.random() - 0.5) * 3,
          speedY: (Math.random() - 0.5) * 3,
          emoji: '🔥'
        });
      }
    }
    
    update() {
      if (!this.gameActive) return;
      
      // Movimiento del jugador
      const arrowKeys = this.gameNumber === 1;
      if (arrowKeys) {
        if (this.keys['ArrowUp'] && this.player.y > 0) this.player.y -= this.player.speed;
        if (this.keys['ArrowDown'] && this.player.y < this.canvas.height - this.player.size) this.player.y += this.player.speed;
        if (this.keys['ArrowLeft'] && this.player.x > 0) this.player.x -= this.player.speed;
        if (this.keys['ArrowRight'] && this.player.x < this.canvas.width - this.player.size) this.player.x += this.player.speed;
      } else {
        if (this.keys['w'] && this.player.y > 0) this.player.y -= this.player.speed;
        if (this.keys['s'] && this.player.y < this.canvas.height - this.player.size) this.player.y += this.player.speed;
        if (this.keys['a'] && this.player.x > 0) this.player.x -= this.player.speed;
        if (this.keys['d'] && this.player.x < this.canvas.width - this.player.size) this.player.x += this.player.speed;
      }
      
      // Mover obstáculos
      this.obstacles.forEach(obs => {
        obs.x += obs.speedX;
        obs.y += obs.speedY;
        
        if (obs.x <= 0 || obs.x >= this.canvas.width - obs.size) obs.speedX *= -1;
        if (obs.y <= 0 || obs.y >= this.canvas.height - obs.size) obs.speedY *= -1;
      });
      
      // Colisiones con coleccionables
      this.collectibles = this.collectibles.filter(col => {
        const dist = Math.hypot(this.player.x - col.x, this.player.y - col.y);
        if (dist < this.player.size) {
          this.score += 10;
          this.scoreElement.textContent = this.score;
          return false;
        }
        return true;
      });
      
      // Colisiones con obstáculos
      this.obstacles.forEach(obs => {
        const dist = Math.hypot(this.player.x - obs.x, this.player.y - obs.y);
        if (dist < this.player.size) {
          this.gameActive = false;
        }
      });
      
      // Generar nuevos coleccionables
      if (this.collectibles.length === 0) {
        this.spawnCollectibles();
      }
    }
    
    draw() {
      // Limpiar canvas
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Dibujar jugador
      this.ctx.font = `${this.player.size}px Arial`;
      this.ctx.fillText(this.player.emoji, this.player.x, this.player.y + this.player.size);
      
      // Dibujar coleccionables
      this.collectibles.forEach(col => {
        this.ctx.font = `${col.size}px Arial`;
        this.ctx.fillText(col.emoji, col.x, col.y + col.size);
      });
      
      // Dibujar obstáculos
      this.obstacles.forEach(obs => {
        this.ctx.font = `${obs.size}px Arial`;
        this.ctx.fillText(obs.emoji, obs.x, obs.y + obs.size);
      });
      
      // Game Over
      if (!this.gameActive) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('¡Game Over!', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Puntos: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 40);
      }
      
      // Instrucciones
      this.ctx.fillStyle = '#333';
      this.ctx.font = '14px Arial';
      this.ctx.textAlign = 'left';
      const controls = this.gameNumber === 1 ? 'Usa las flechas ⬆️⬇️⬅️➡️' : 'Usa W A S D';
      this.ctx.fillText(controls, 10, 20);
    }
    
    gameLoop() {
      this.update();
      this.draw();
      requestAnimationFrame(() => this.gameLoop());
    }
  }
  
  // Inicializar juegos
  let game1 = new Game('gameCanvas1', 'score1', 1);
  let game2 = new Game('gameCanvas2', 'score2', 2);
  
  function restartGame(gameNum) {
    if (gameNum === 1) {
      game1 = new Game('gameCanvas1', 'score1', 1);
    } else {
      game2 = new Game('gameCanvas2', 'score2', 2);
    }
  }
  ```

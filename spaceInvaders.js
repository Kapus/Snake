// Simple Space Invaders Game

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('spaceInvadersCanvas');
    const ctx = canvas.getContext('2d');
    const restartButton = document.getElementById('restartSpaceInvaders');
    const width = canvas.width;
    const height = canvas.height;

    // Player
    const playerWidth = 50;
    const playerHeight = 20;
    let playerX = (width - playerWidth) / 2;
    let playerY = height - playerHeight - 10;
    let playerSpeed = 7;
    let leftPressed = false;
    let rightPressed = false;

    // Bullets
    let bullets = [];
    const bulletWidth = 4;
    const bulletHeight = 12;
    const bulletSpeed = 8;

    // Invaders
    const invaderRowCount = 5;
    const invaderColCount = 15;
    const invaderWidth = 40;
    const invaderHeight = 24;
    const invaderPadding = 16;
    const invaderOffsetTop = 40;
    const invaderOffsetLeft = 30;
    let invaders = [];
    let invaderDirection = 1;
    let invaderSpeed = 1.5;
    let invaderDrop = 24;

    // Game state
    let score = 0;
    let lives = 3;
    let gameInterval;
    let gameOver = false;

    function initInvaders() {
        invaders = [];
        for (let c = 0; c < invaderColCount; c++) {
            for (let r = 0; r < invaderRowCount; r++) {
                invaders.push({
                    x: c * (invaderWidth + invaderPadding) + invaderOffsetLeft,
                    y: r * (invaderHeight + invaderPadding) + invaderOffsetTop,
                    status: 1
                });
            }
        }
    }

    function drawPlayer() {
        ctx.fillStyle = '#E0B0FF';
        ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    }

    function drawBullets() {
        ctx.fillStyle = '#9D4EDD';
        bullets.forEach(bullet => {
            ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
        });
    }

    function drawInvaders() {
        ctx.fillStyle = '#7b2cbf';
        invaders.forEach(invader => {
            if (invader.status === 1) {
                ctx.fillRect(invader.x, invader.y, invaderWidth, invaderHeight);
            }
        });
    }

    function drawScore() {
        ctx.font = '16px Poppins, Arial';
        ctx.fillStyle = '#E0B0FF';
        ctx.fillText('Score: ' + score, 8, 20);
    }

    function drawLives() {
        ctx.font = '16px Poppins, Arial';
        ctx.fillStyle = '#E0B0FF';
        ctx.fillText('Lives: ' + lives, width - 90, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        drawPlayer();
        drawBullets();
        drawInvaders();
        drawScore();
        drawLives();
    }

    function movePlayer() {
        if (leftPressed && playerX > 0) {
            playerX -= playerSpeed;
        }
        if (rightPressed && playerX < width - playerWidth) {
            playerX += playerSpeed;
        }
    }

    function moveBullets() {
        bullets.forEach(bullet => {
            bullet.y -= bulletSpeed;
        });
        bullets = bullets.filter(bullet => bullet.y + bulletHeight > 0);
    }

    function moveInvaders() {
        let hitEdge = false;
        invaders.forEach(invader => {
            if (invader.status === 1) {
                invader.x += invaderDirection * invaderSpeed;
                if (invader.x <= 0 || invader.x + invaderWidth >= width) {
                    hitEdge = true;
                }
            }
        });
        if (hitEdge) {
            invaderDirection *= -1;
            invaders.forEach(invader => {
                invader.y += invaderDrop;
            });
        }
    }

    function checkCollisions() {
        // Bullet-Invader
        bullets.forEach(bullet => {
            invaders.forEach(invader => {
                if (
                    invader.status === 1 &&
                    bullet.x < invader.x + invaderWidth &&
                    bullet.x + bulletWidth > invader.x &&
                    bullet.y < invader.y + invaderHeight &&
                    bullet.y + bulletHeight > invader.y
                ) {
                    invader.status = 0;
                    bullet.y = -100; // Remove bullet
                    score += 10;
                }
            });
        });
        // Invader-Player
        invaders.forEach(invader => {
            if (
                invader.status === 1 &&
                invader.y + invaderHeight >= playerY &&
                invader.x < playerX + playerWidth &&
                invader.x + invaderWidth > playerX
            ) {
                lives = 0;
            }
        });
    }

    function checkGameOver() {
        if (lives <= 0) {
            gameOver = true;
            clearInterval(gameInterval);
            alert('GAME OVER');
            restartButton.style.display = 'block';
        } else if (invaders.every(inv => inv.status === 0)) {
            gameOver = true;
            clearInterval(gameInterval);
            alert('YOU WIN!');
            restartButton.style.display = 'block';
        }
    }

    function update() {
        if (gameOver) return;
        movePlayer();
        moveBullets();
        moveInvaders();
        checkCollisions();
        checkGameOver();
        draw();
    }

    function keyDownHandler(e) {
        if (e.key === 'ArrowLeft' || e.key === 'Left') leftPressed = true;
        if (e.key === 'ArrowRight' || e.key === 'Right') rightPressed = true;
        if (e.key === ' ' || e.key === 'Spacebar') {
            if (bullets.length < 3 && !gameOver) {
                bullets.push({
                    x: playerX + playerWidth / 2 - bulletWidth / 2,
                    y: playerY
                });
            }
        }
    }

    function keyUpHandler(e) {
        if (e.key === 'ArrowLeft' || e.key === 'Left') leftPressed = false;
        if (e.key === 'ArrowRight' || e.key === 'Right') rightPressed = false;
    }

    function startGame() {
        playerX = (width - playerWidth) / 2;
        playerY = height - playerHeight - 10;
        bullets = [];
        leftPressed = false;
        rightPressed = false;
        score = 0;
        lives = 3;
        gameOver = false;
        initInvaders();
        restartButton.style.display = 'none';
        clearInterval(gameInterval);
        gameInterval = setInterval(update, 20);
    }

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    restartButton.addEventListener('click', startGame);

    startGame();
});

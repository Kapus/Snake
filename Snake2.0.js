// Snake 2.0 Game

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snake2Canvas');
    const ctx = canvas.getContext('2d');
    const restartButton = document.getElementById('restartSnake2');
    const box = 20;
    let snake = [{ x: 9 * box, y: 10 * box }];
    let direction = null;
    let food = spawnFood();
    let score = 0;
    let gameInterval;

    function spawnFood() {
        return {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    }

    function draw() {
        ctx.fillStyle = '#10002B';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        for (let i = 0; i < snake.length; i++) {
            if (i === 0) {
                ctx.beginPath();
                ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, Math.PI * 2);
                ctx.fillStyle = '#2ecc40'; // Green head
                ctx.fill();
                ctx.strokeStyle = '#10002B';
                ctx.stroke();
            } else {
                ctx.fillStyle = '#0000CD';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                ctx.strokeStyle = '#10002B';
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }
        }

        // Draw food
        ctx.fillStyle = '#E0B0FF';
        ctx.fillRect(food.x, food.y, box, box);

        // Draw score
        ctx.font = '18px Poppins, Arial';
        ctx.fillStyle = '#E0B0FF';
        ctx.fillText('Score: ' + score, 8, 24);
    }

    function update() {
        let head = { x: snake[0].x, y: snake[0].y };
        if (direction === 'LEFT') head.x -= box;
        if (direction === 'UP') head.y -= box;
        if (direction === 'RIGHT') head.x += box;
        if (direction === 'DOWN') head.y += box;

        // Check collision with walls
        if (
            head.x < 0 || head.x >= canvas.width ||
            head.y < 0 || head.y >= canvas.height ||
            collision(head, snake)
        ) {
            clearInterval(gameInterval);
            restartButton.style.display = 'block';
            return;
        }

        // Check collision with food
        if (head.x === food.x && head.y === food.y) {
            score++;
            food = spawnFood();
        } else {
            snake.pop();
        }
        snake.unshift(head);
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    function gameLoop() {
        update();
        draw();
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
        if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
        if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
        if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    });

    restartButton.addEventListener('click', startGame);

    function startGame() {
        snake = [{ x: 9 * box, y: 10 * box }];
        direction = 'RIGHT';
        food = spawnFood();
        score = 0;
        restartButton.style.display = 'none';
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 100);
    }

    startGame();
});

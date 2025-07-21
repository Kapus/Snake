document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const restartButton = document.getElementById('restartButton');
    const scoreElement = document.getElementById('score');
    const box = 20;
    let snake, food, score, d, game;

    function init() {
        snake = [];
        snake[0] = { x: 9 * box, y: 10 * box };
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
        score = 0;
        scoreElement.innerText = 'Score: 0';
        d = undefined;
        restartButton.style.display = 'none';
        if (game) clearInterval(game);
        game = setInterval(draw, 100);
    }

    document.addEventListener('keydown', direction);
    restartButton.addEventListener('click', init);

    function direction(event) {
        if (event.keyCode == 37 && d != 'RIGHT') {
            d = 'LEFT';
        } else if (event.keyCode == 38 && d != 'DOWN') {
            d = 'UP';
        } else if (event.keyCode == 39 && d != 'LEFT') {
            d = 'RIGHT';
        } else if (event.keyCode == 40 && d != 'UP') {
            d = 'DOWN';
        }
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    function draw() {
        ctx.fillStyle = '#10002B';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i == 0) ? '#0000FF' : '#0000CD';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = '#10002B';
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = '#1a6600';
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d == 'LEFT') snakeX -= box;
        if (d == 'UP') snakeY -= box;
        if (d == 'RIGHT') snakeX += box;
        if (d == 'DOWN') snakeY += box;

        if (snakeX == food.x && snakeY == food.y) {
            score++;
            scoreElement.innerText = 'Score: ' + score;
            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };
        } else {
            snake.pop();
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
            restartButton.style.display = 'block';
        } else {
            snake.unshift(newHead);
        }

    }

    init();
});
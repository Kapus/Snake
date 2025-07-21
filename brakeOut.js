// Simple Brake Out Game

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('brakeOutCanvas');
    const ctx = canvas.getContext('2d');
    const restartButton = document.getElementById('restartBrakeOut');
    const ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;
    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    const brickRowCount = 16;
    const brickColumnCount = 24;
    const brickWidth = 30;
    const brickHeight = 16;
    const brickPadding = 4;
    const brickOffsetTop = 16;
    const brickOffsetLeft = 8;
    let score = 0;
    let lives = 3;
    let gameInterval;

    let bricks = [];
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    function drawBricks() {
        for(let c=0; c<brickColumnCount; c++) {
            for(let r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = '#9D4EDD';
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = '#E0B0FF';
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = '#240046';
        ctx.fill();
        ctx.closePath();
    }

    function drawScore() {
        ctx.font = '16px Poppins, Arial';
        ctx.fillStyle = '#E0B0FF';
        ctx.fillText('Score: '+score, 8, 20);
    }

    function drawLives() {
        ctx.font = '16px Poppins, Arial';
        ctx.fillStyle = '#E0B0FF';
        ctx.fillText('Lives: '+lives, canvas.width-75, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();

        // Ball collision with bricks
        for(let c=0; c<brickColumnCount; c++) {
            for(let r=0; r<brickRowCount; r++) {
                let b = bricks[c][r];
                if(b.status == 1) {
                    // AABB collision detection for ball and brick
                    if (
                        x + ballRadius > b.x &&
                        x - ballRadius < b.x + brickWidth &&
                        y + ballRadius > b.y &&
                        y - ballRadius < b.y + brickHeight
                    ) {
                        // Determine which side the ball hit and reflect accordingly
                        // Calculate previous position
                        let prevX = x - dx;
                        let prevY = y - dy;
                        let hitFromLeft = prevX + ballRadius <= b.x;
                        let hitFromRight = prevX - ballRadius >= b.x + brickWidth;
                        let hitFromTop = prevY + ballRadius <= b.y;
                        let hitFromBottom = prevY - ballRadius >= b.y + brickHeight;

                        if (hitFromLeft || hitFromRight) {
                            dx = -dx;
                        } else if (hitFromTop || hitFromBottom) {
                            dy = -dy;
                        } else {
                            dy = -dy;
                        }
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount) {
                            clearInterval(gameInterval);
                            alert('YOU WIN!');
                            restartButton.style.display = 'block';
                        }
                    }
                }
            }
        }

        // Ball collision with walls
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        } else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                lives--;
                if(!lives) {
                    clearInterval(gameInterval);
                    alert('GAME OVER');
                    restartButton.style.display = 'block';
                } else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }

        x += dx;
        y += dy;

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        } else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
    }

    function keyDownHandler(e) {
        if(e.key == 'Right' || e.key == 'ArrowRight') {
            rightPressed = true;
        } else if(e.key == 'Left' || e.key == 'ArrowLeft') {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.key == 'Right' || e.key == 'ArrowRight') {
            rightPressed = false;
        } else if(e.key == 'Left' || e.key == 'ArrowLeft') {
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e) {
        let relativeX = e.clientX - canvas.getBoundingClientRect().left;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }

    function startGame() {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
        rightPressed = false;
        leftPressed = false;
        score = 0;
        lives = 3;
        for(let c=0; c<brickColumnCount; c++) {
            for(let r=0; r<brickRowCount; r++) {
                bricks[c][r].status = 1;
            }
        }
        restartButton.style.display = 'none';
        clearInterval(gameInterval);
        gameInterval = setInterval(draw, 10);
    }

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
    restartButton.addEventListener('click', startGame);

    startGame();
});

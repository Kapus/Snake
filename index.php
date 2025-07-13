<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php include 'header.php'; ?>

    <main>
        <h1>Welcome to Snake!</h1>
        <p>Use the arrow keys to move the snake and eat the food.</p>
        <div id="gameContainer">
            <canvas id="gameCanvas" width="400" height="400"></canvas>
            <button id="restartButton" style="display:none;">Start Over</button>
        </div>
    </main>

    <?php include 'footer.php'; ?>
    <script src="snake.js"></script>
</body>
</html>
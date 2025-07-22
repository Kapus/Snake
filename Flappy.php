<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flappy Bird Game</title>
    <link rel="stylesheet" href="style.css">
    <style>
        #flappyCanvas {
            display: block;
            margin: 40px auto;
            background: #10002B;
            border: 3px solid #9D4EDD;
        }
    </style>
</head>
<body>
    <?php include 'header.php'; ?>
    <main>
        <h1>Flappy Bird Game</h1>
        <canvas id="flappyCanvas" width="960" height="640"></canvas>
        <button id="restartFlappy" style="display:none; margin: 20px auto;">Restart</button>
    </main>
    <?php include 'footer.php'; ?>
    <script src="flappy.js"></script>
</body>
</html>

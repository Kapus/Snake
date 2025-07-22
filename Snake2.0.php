<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake 2.0 Game</title>
    <link rel="stylesheet" href="style.css">
    <style>
        #snake2Canvas {
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
        <h1>Snake 2.0</h1>
        <canvas id="snake2Canvas" width="400" height="400"></canvas>
        <button id="restartSnake2" style="display:none; margin: 20px auto;">Restart</button>
    </main>
    <?php include 'footer.php'; ?>
    <script src="Snake2.0.js"></script>
</body>
</html>

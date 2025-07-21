<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Invaders</title>
    <link rel="stylesheet" href="style.css">
    <style>
        #spaceInvadersCanvas {
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
        <h1>Space Invaders</h1>
        <canvas id="spaceInvadersCanvas" width="1200" height="600"></canvas>
        <button id="restartSpaceInvaders" style="display:none; margin: 20px auto;">Restart</button>
    </main>
    <?php include 'footer.php'; ?>
    <script src="spaceInvaders.js"></script>
</body>
</html>

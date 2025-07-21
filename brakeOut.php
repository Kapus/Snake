<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brake Out Game</title>
    <link rel="stylesheet" href="style.css">
    <style>
        #brakeOutCanvas {
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
        <h1>Brake Out Game</h1>
        <canvas id="brakeOutCanvas" width="880" height="500"></canvas>
        <button id="restartBrakeOut" style="display:none; margin: 20px auto;">Restart</button>
    </main>
    <?php include 'footer.php'; ?>
    <script src="brakeOut.js"></script>
</body>
</html>

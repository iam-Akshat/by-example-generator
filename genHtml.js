const genHtml=  (markup) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css"
        integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">
    <link rel="stylesheet" href="./prism.css">


    <style>
        * {
            margin: 0;
            padding: 0;
        }
        td {
            vertical-align: top;
            width: 420px !important;
        }
        table{
            border-spacing: 0;
        }
        pre{
            margin: 0 !important;
            border: 0;
            padding: 0;
        }
        code{
            
        }
        body{
            display:flex;
            justify-content: center;
            align-items: center;
        }
    </style>

</head>

<body>
${markup}

    <script src="./prism.js"></script>
</body>

</html>
`
module.exports = genHtml;
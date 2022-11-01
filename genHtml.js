const genCss = (css = "") => `
<style>
* {
    margin: 0;
    padding: 0;
}
td {
    vertical-align: top;
}
td.docs {
    padding-right: 1rem;
}
td.docs p {
    padding-bottom: 0.8rem;
    width: 420px;
    font-family: Georgia, sans-serif;
    font-size: 1rem;
}
td.code.empty {
    background-color: transparent !important;
}
td.code{
    background: #f5f2f0 !important;
    padding-bottom: 15px;
    padding-left: 5px;
    padding-top: 5px;
    width: 480px !important;
    font-size: 14px !important;
}

table{
    border-spacing: 0;
}
pre{
    margin: 0 !important;
    border: 0;
    padding: 0 !important;
}

body{
    display:flex;
    justify-content: center;
    align-items: center;
} 
${css}
</style>
`;

const genHtml =  (markup) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="./prism.css">

    ${genCss()}

</head>

<body>
${markup}

    <script src="./prism.js"></script>
</body>

</html>
`

module.exports = genHtml;
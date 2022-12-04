const genCss = (css = "") => `
<style>
${css}
</style>
`;

const genHtml = (main,header="",footer="", codePage = false) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="./prism.css">
    <link rel="stylesheet" href="./static/main.css">
    ${genCss()}

</head>

<body>
    <div class="container ${!codePage ? 'no-code' : '' }">
        ${header}
        <main id="annonated-code">
            ${main}
        </main>
        ${footer}
    </div>
    <script src="./prism.js"></script>
</body>

</html>
`;

module.exports = genHtml;

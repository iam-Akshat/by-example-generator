// code in comment will have `` around it
// example "this is a `sample` code"
// output this is a <code>sample</code> code

const parseCodeFromComment = (comment) => {
    const codeRegex = /`([^`]+)`/g;
    const codeMatches = comment.match(codeRegex);
    if (codeMatches) {
        codeMatches.forEach((code) => {
            const codeWithoutBackticks = code.replaceAll("`", "");
            comment = comment.replaceAll(code, `<code>${codeWithoutBackticks}</code>`);
        });
    }
    return comment;

}

module.exports = {
    parseCodeFromComment
}
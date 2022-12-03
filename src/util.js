const showdown = require("showdown");
const converter = new showdown.Converter();

const isLineComment = (line) => {
  return line.trim().startsWith("//");
};
const isLineCode = (line) => {
  return !isLineComment(line);
};
const isLineEmpty = (line) => {
  return line.trim().length === 0;
};

const genCodeMarkup = (code, lang = "go") => {
  return `<pre><code class="language-${lang}">${code}</code></pre>`;
};
const genCommentMarkup = (comment) => {
  return converter.makeHtml(comment);
};

const genRowMarkup = (rawComment, rawCode) => {
  const comment = genCommentMarkup(rawComment);
  const commentMarkup = `<td class="docs">${comment}</td>`;
  
  const code = genCodeMarkup(rawCode);
  const codeMarkup = `<td class="code ${!rawCode.length ? "empty" : ""}">${code}</td>`;
    
  return `<tr>${commentMarkup}${codeMarkup}</tr>\n`;
};

module.exports = {
  isLineCode,
  isLineComment,
  isLineEmpty,
  genCodeMarkup,
  genCommentMarkup,
  genRowMarkup,
};

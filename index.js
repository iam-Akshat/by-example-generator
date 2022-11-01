const fs = require("fs");

const genHtml = require("./genHtml");
const fileText = `
// In Go, an _array_ is a numbered sequence of elements of a
// specific length. In typical Go code, [slices](slices) are
// much more common; arrays are useful in some special
// scenarios.

package main

import "fmt"

func main() {

	// Here we create an array \`a\` that will hold exactly
	// 5 \`int\`s. The type of elements and length are both
	// part of the array's type. By default an array is
	// zero-valued, which for \`int\`s means \`0\`s.
	var a [5]int
	fmt.Println("emp:", a)

	// We can set a value at an index using the
	// \`array[index] = value\` syntax, and get a value with
	// \`array[index]\`.
	a[4] = 100
	fmt.Println("set:", a)
	fmt.Println("get:", a[4])

	// The builtin \`len\` returns the length of an array.
	fmt.Println("len:", len(a))

	// Use this syntax to declare and initialize an array
	// in one line.
	b := [5]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	// Array types are one-dimensional, but you can
	// compose types to build multi-dimensional data
	// structures.
	var twoD [2][3]int
	for i := 0; i < 2; i++ {
		for j := 0; j < 3; j++ {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)
}
`;
const isLineComment = (line) => {
  return line.trim().startsWith("//");
};
const isLineCode = (line) => {
  return !isLineComment(line);
};
const isLineEmpty = (line) => {
  return line.trim().length === 0;
};

const parseText = (text) => {
  const lines = text.split("\n");
  const commentLines = lines.filter(isLineComment);
  const codeLines = lines.filter(isLineCode);

  let html = `<table>\n`;
  let codeIndex = 0;
  let comment = "<p>";
  let code = `<pre><code class="language-go">`;
  let rowMarkup = `<tr>\n`;
  while (codeIndex < lines.length) {
    if (isLineEmpty(lines[codeIndex])) {
        code += "</code></pre>";
        comment += "</pre>";
      rowMarkup += `<td>${comment}</td><td>${code}</td> </tr>\n`;

      html += rowMarkup;
      codeIndex++;
      comment = "<p>";
      code = `<pre><code class="language-go">`;
      rowMarkup = `<tr>\n`
    } else if (isLineComment(lines[codeIndex])) {
      comment += lines[codeIndex]
        .replaceAll("//", "")
        .replaceAll("/(`\w*`)/g", "<code>$1</code>")
        .trim();
        comment += "\n";
      codeIndex++;
    } else if (isLineCode(lines[codeIndex])) {
      code += lines[codeIndex].replaceAll("\t", "&nbsp;&nbsp;");
      code += "\n";
      codeIndex++;
    }
  }
  html += `</table>`;
  
  console.log(
    `isLineCountMatching`,
    commentLines.length + codeLines.length === lines.length,
    codeIndex
  );
  return html;
};
const html = parseText(fileText);
const markup = genHtml(html);

fs.writeFileSync("./index.html", markup);



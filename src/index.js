#!/usr/bin/env node

const fs = require("fs");
const fsp = require("fs").promises;
const showdown = require("showdown");
const converter = new showdown.Converter();

const genHtml = require("./genHtml");
const {
  isLineCode,
  isLineComment,
  isLineEmpty,
  genRowMarkup,
} = require("./util");
const { makeContentTree } = require("./readData");
const path = require("path");

const parseCodeFile = (text) => {
  const lines = text.split("\n");

  let html = `<table>\n`;
  let codeIndex = 0;
  let comment = "";
  let code = "";
  while (codeIndex < lines.length) {
    if (isLineEmpty(lines[codeIndex])) {

      const rowMarkup = genRowMarkup(comment, code);

      html += rowMarkup;

      // resetting
      comment = "";
      code = "";
      codeIndex++;
    } else if (isLineComment(lines[codeIndex])) {

      comment += lines[codeIndex]
        .replaceAll("//", "")
        .replaceAll("/(`w*`)/g", "<code>$1</code>")
        .trim();
      comment += "\n";
      codeIndex++;

    } else if (isLineCode(lines[codeIndex])) {

      code += lines[codeIndex]
      code += "\n";
      codeIndex++;

    }
  }
  html += `</table>`;

  return html;
};

const createDir = async (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const generateIndexFile = (chapterNames, headerPath, footerPath) => {
  let header = converter.makeHtml(fs.readFileSync(headerPath, "utf-8"));
  header = "<header>" + header + "</header>";
  let footer = converter.makeHtml(fs.readFileSync(footerPath, "utf-8"));
  footer = "<footer>" + footer + "</footer>";
  const chapterLinks = chapterNames.map((chapterName) => {
    return `<li><a href="${chapterName}.html">${chapterName}</a></li>`;
  });
  const chapterLinksMarkup = chapterLinks.join("\n");
  const indexMarkup = `${header}` +  `<ul>${chapterLinksMarkup}</ul>` + `${footer}`;
  return indexMarkup;
}

const main = async () => {
  const distPath = path.join(process.cwd(), "dist");
  const staticPath = path.join(process.cwd(), "dist", "static");
  createDir(distPath);
  createDir(staticPath);
  const contentTree = makeContentTree();
  if (!contentTree) {
    return;
  }
  const validChapterNames = []
  for (const [chapterName, chapterContent] of Object.entries(contentTree)) {
    if (!chapterContent?.content) {
      console.log(`Skipping ${chapterName}`);
      continue;
    }
    validChapterNames.push(chapterName);
    console.log(`Processing ${chapterName}`);
    const chapterHtml = parseCodeFile(
      await fsp.readFile(chapterContent.content, "utf-8")
    );
    const chapterMarkup = genHtml(chapterHtml);
    const chapterPath = path.join(distPath, `${chapterName}.html`);
    fs.writeFileSync(chapterPath, chapterMarkup);
    await fsp.copyFile(path.join(__dirname, "static", "main.css"), path.join(staticPath, "main.css"));
  }
  const indexMarkup = generateIndexFile(validChapterNames,contentTree.index,contentTree.footer );
  const indexHtml = genHtml(indexMarkup);
  const indexPath = path.join(distPath, "index.html");
  fs.writeFileSync(indexPath, indexHtml);
};

main();

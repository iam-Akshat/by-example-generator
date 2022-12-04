const fs = require("fs");
const path = require("path");

const VALID_POSTFIXES = ["content", "test"];

const MAIN_CONTENT_FOLDER = "content";

const ERRORS = {
  NO_CONTENT_FOLDER: `Main content folder does not exist. Please create a folder named ${MAIN_CONTENT_FOLDER} in the root directory.`,
  NO_INDEX_FILE: `No index file found. Please make sure there is an index.md file in the content folder.`,
}

const ERROR_MESSAGES = Object.values(ERRORS);

const getChapterNames = (dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);

    const chapterNames = [];

    files.forEach((file) => {
      const fileStats = fs.statSync(`${dirPath}/${file}`);
      if (fileStats.isDirectory()) {
        chapterNames.push(file);
      }
    });

    return chapterNames;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(ERRORS.NO_CONTENT_FOLDER);
      throw new Error(ERRORS.NO_CONTENT_FOLDER);
    } else {
      console.log(error);
    }
  }
};

const getFileWithPostfix = (dirPath, postfix = VALID_POSTFIXES[0]) => {
  const files = fs.readdirSync(dirPath);
  const fileNames = [];
  files.forEach((file) => {
    const fileWithoutExtension = file.split(".")[0];
    if (fileWithoutExtension.endsWith(postfix)) {
      // get file path
      fileNames.push(`${dirPath}/${file}`);
    }
  });
  return fileNames[0];
};

const makeChapterFileObject = (
  chapters,
  dirPath = process.cwd(),
  postfixes = VALID_POSTFIXES
) => {
  if (!chapters) {
    return;
  }
  const chapterFileObject = {};
  postfixes.forEach((postfix) => {
    chapters.forEach((chapter) => {
      const filePath = getFileWithPostfix(path.join(dirPath, MAIN_CONTENT_FOLDER, chapter), postfix);

      if (chapterFileObject[chapter]) {
        chapterFileObject[chapter][postfix] = filePath;
      } else {
        chapterFileObject[chapter] = {
          [postfix]: filePath,
        };
      }
    });
  });
  return chapterFileObject;
};

const getFilePathWithName = (dirPath, fileName) => {
  const files = fs.readdirSync(dirPath);
  const filePaths = [];
  files.forEach((file) => {
    if (file === fileName) {
      filePaths.push(`${dirPath}/${file}`);
    }
  });

  if(filePaths.length === 0) {
    throw new Error(ERRORS.NO_INDEX_FILE);
  }

  return filePaths[0];
};

const makeContentTree = (dirPath = process.cwd()) => {
  try {
    const chapterNames = getChapterNames(path.join(dirPath, MAIN_CONTENT_FOLDER));
    const chapterFileObject = makeChapterFileObject(chapterNames, dirPath);
    chapterFileObject["index"] = getFilePathWithName(path.join(dirPath, MAIN_CONTENT_FOLDER), "index.md");
    chapterFileObject["footer"] = getFilePathWithName(path.join(dirPath, MAIN_CONTENT_FOLDER), "footer.md");
    return chapterFileObject;
  } catch (error) {
    if (!ERROR_MESSAGES.includes(error.message)) {
      throw new Error(error.message);
    } else {
      console.log(error.message);
    }
  }

};

module.exports = { makeContentTree };

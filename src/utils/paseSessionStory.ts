export const parseSessionStory = (text: string, isDungeonMaster: boolean) => {
  let secretStart = text.indexOf("&lt;secret&gt");
  let secretEnd = text.indexOf("&lt;/secret&gt");
  console.log("hei")
  while (secretStart !== -1) {
    secretStart = text.indexOf("&lt;secret&gt");
    secretEnd = text.indexOf("&lt;/secret&gt");
    if (secretEnd === -1) {
      text = text.replace("&lt;secret&gt", "");
      continue;
    }
    if (isDungeonMaster) {
      console.log(text)
      text = text.replace("&lt;secret&gt;", "<p style='background-color:powderblue;'>");
      text = text.replace("&lt;/secret&gt;", "</p>");
    } else {
      let secretMessage = text.slice(secretStart, secretEnd + 9);
      text = text.replace(secretMessage, "");
    }
  }
  return text;
};

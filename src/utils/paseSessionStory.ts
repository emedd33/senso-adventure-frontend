export const parseSessionStory = (text: string, isDungeonMaster: boolean) => {
  let secretStart = text.indexOf("<secret>");
  let secretEnd = text.indexOf("</secret>");
  while (secretStart !== -1) {
    secretStart = text.indexOf("<secret>");
    secretEnd = text.indexOf("</secret>");
    if (secretEnd === -1) {
      text = text.replace("<secret>", "");
      continue;
    }
    if (isDungeonMaster) {
      text = text.replace("<secret>", "\n~~~~js \n");
      text = text.replace("</secret>", "\n~~~~\n");
    } else {
      let secretMessage = text.slice(secretStart, secretEnd + 9);
      text = text.replace(secretMessage, "");
    }
  }
  return text;
};

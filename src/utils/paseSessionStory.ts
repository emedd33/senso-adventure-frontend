export const parseSessionStory = (text: string, isDungeonMaster: boolean) => {
  if (!isDungeonMaster) {
    // Regex for removing secret messages for nonDungeonMasters
    //eslint-disable-next-line
    const regex = /\<strong.style\=\"color\: rgb\(153\, 101\, 219\)\;\"\>.+?(?=strong)strong\>/i;
    text = text.replace(regex, "");
  }
  return text;
};

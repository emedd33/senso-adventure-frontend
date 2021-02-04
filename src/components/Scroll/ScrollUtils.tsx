import Scroll from "./Scroll";
const MAX_CHARACTER = 2000;
function recursiveSplitString(content: string): any {
  // Recursive split string into substrings smaller than 2000 characters
  if (content.length <= MAX_CHARACTER) {
    return content;
  }

  let middle = Math.floor(content.length / 2);
  let before = content.lastIndexOf(" ", middle);
  let after = content.indexOf(" ", middle + 1);

  if (middle - before < after - middle) {
    middle = before;
  } else {
    middle = after;
  }
  const firstHalf = content.substr(0, middle);
  const secondHalf = content.substr(middle + 1);
  return [recursiveSplitString(firstHalf), recursiveSplitString(secondHalf)];
}

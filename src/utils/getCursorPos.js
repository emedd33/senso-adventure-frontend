function getCursorPos(input) {
  if ("selectionStart" in input && document.activeElement === input) {
    return {
      start: input.selectionStart,
      end: input.selectionEnd,
    };
  } else if (input.createTextRange) {
    var sel = document.selection.createRange();
    if (sel.parentElement() === input) {
      var rng = input.createTextRange();
      rng.moveToBookmark(sel.getBookmark());
      for (
        var len = 0;
        rng.compareEndPoints("EndToStart", rng) > 0;
        rng.moveEnd("character", -1)
      ) {
        len++;
      }
      rng.setEndPoint("StartToStart", input.createTextRange());
      for (
        var pos = { start: 0, end: len };
        rng.compareEndPoints("EndToStart", rng) > 0;
        rng.moveEnd("character", -1)
      ) {
        pos.start++;
        pos.end++;
      }
      return pos;
    }
  }
  return -1;
}
export default getCursorPos;
asd;

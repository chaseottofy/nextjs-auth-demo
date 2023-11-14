// see @test/sanitize-paste
const sanitizeUserPaste = (
  pasteText: string,
  currentText: string,
  allowedLength: number,
) => {
  const preventHugeStrings = pasteText.slice(0, 100);
  const textWithPaste = currentText.trim() + JSON.stringify(
    preventHugeStrings,
    null,
    4,
  ).replaceAll(/[ "'/\\`|]/g, '');

  if (textWithPaste.length > allowedLength) {
    return textWithPaste.slice(0, allowedLength);
  }
  return textWithPaste;
};

export default sanitizeUserPaste;

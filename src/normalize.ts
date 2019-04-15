/**
 * Normalize the user-input command by remove multiple spaces, trim and
 * lowercase everything.
 *
 * @param input user-input command
 */
function normalize(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

export default normalize;

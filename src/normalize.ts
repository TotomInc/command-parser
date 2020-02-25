/**
 * Normalize the user-input command by removing multiple spaces, trim and
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

/**
 * Normalize the user-input command by removing multiple spaces and trim.
 * This method doesn't lowercase input.
 *
 * @param input user-input command
 */
export function normalizeWithoutLowercase(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

export default normalize;

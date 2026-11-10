// Service_Area_City ordering (design.md, src/lib signatures; Property 20; Req 18.3, 18.6).

/** Plain code-unit comparison, so the order does not depend on the browser locale. */
function compareCodeUnits(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * A new array with the same names, spelling and capitalization, sorted ascending by a
 * code-unit comparison of the lowercased names ("McKinney" before "Mesquite"). Names
 * that are equal ignoring case (not allowed by Req 18.2, but possible in edited content)
 * fall back to a code-unit comparison of the original names, so the result does not
 * depend on the input order. The input is not modified.
 */
export function sortCities(cities: readonly string[]): string[] {
  return [...cities].sort(
    (a, b) => compareCodeUnits(a.toLowerCase(), b.toLowerCase()) || compareCodeUnits(a, b),
  );
}

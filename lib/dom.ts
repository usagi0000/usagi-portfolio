// Shared DOM helper for the ported portfolio-game scripts.

/** Return the element, or throw if it is missing (fail fast, fail loud). */
export function need<T>(element: unknown): T {
  if (element === null || element === undefined) {
    throw new Error("Required element is missing");
  }
  return element as T;
}

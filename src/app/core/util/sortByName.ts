export function sortByName<T extends { name: string }>(collection: T[]): T[] {
  return collection.sort((t1, t2) => t1.name.localeCompare(t2.name, "en-u-kn-true"));
}

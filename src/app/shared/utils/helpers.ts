export const classNames = (...classes: Array<string | undefined>): string => {
  return classes
    .filter((item) => typeof item !== undefined)
    .filter(Boolean)
    .join(" ");
};

//** We use this methods to merge objects */
export const mergeObjects = <T extends object>(obj1: T, obj2: T): T => {
  let copyObject1: T = JSON.parse(JSON.stringify(obj1));
  let copyObject2: T = JSON.parse(JSON.stringify(obj2));
  if (typeof copyObject1 !== "object" || typeof copyObject2 !== "object") {
    throw new Error("Both objects must be of type object");
  }
  for (const key in copyObject2) {
    if (copyObject2.hasOwnProperty(key)) {
      if (
        typeof copyObject2[key] === "object" &&
        !Array.isArray(copyObject2[key]) &&
        copyObject1.hasOwnProperty(key) &&
        typeof copyObject1[key] === "object" &&
        !Array.isArray(copyObject1[key])
      ) {
        copyObject1[key] = mergeObjects(
          copyObject1[key] as object,
          copyObject2[key] as object
        ) as T[Extract<keyof T, string>];
      } else {
        copyObject1[key] = copyObject2[key] as T[Extract<keyof T, string>];
      }
    }
  }
  return copyObject1 as T;
};

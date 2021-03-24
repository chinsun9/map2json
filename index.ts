type MyType = {
  id: number;
  cover: string;
  outComes: Map<number, string>;
  questions: Map<number, Map<number, string>>;
};

const myObject: MyType = {
  id: 30,
  cover: "cover",
  outComes: new Map([
    [0, "o1"],
    [1, "o2"],
  ]),
  questions: new Map([
    [
      0,
      new Map([
        [1, "answer1"],
        [2, "ansewr2"],
      ]),
    ],
    [
      1,
      new Map([
        [1, "ansewr1"],
        [2, "ansewr2"],
      ]),
    ],
    [2, new Map([])],
  ]),
};

/**
 * object 2 json string
 * @param object e.g. { a: ..., b: ...}
 * @returns json string
 */
const stringify = (object: any): string => {
  for (const eachIdx in object) {
    if (object[eachIdx] instanceof Map) {
      object[eachIdx] = Array.from(object[eachIdx]);
      stringify(object);
    } else if (typeof object[eachIdx] == "object") stringify(object[eachIdx]);
  }
  return JSON.stringify(object, null, 2);
};

/**
 * json string 2 object
 * @param jsonString
 * @returns
 */
const jsonString2ObjectWithMap = <ReturnType>(
  jsonString: string
): ReturnType => {
  const object = JSON.parse(jsonString);
  console.log(`-------------변환전`);
  console.log(object);
  console.log(`-------------변환후`);

  const jsonstringToObject = (object) => {
    for (const eachIdx in object) {
      if (
        object[eachIdx] instanceof Array &&
        object[eachIdx].length > 0 &&
        object[eachIdx][0].constructor === Array
      ) {
        object[eachIdx] = new Map(object[eachIdx]);
        jsonstringToObject(object);
      } else if (typeof object[eachIdx] == "object")
        jsonstringToObject(object[eachIdx]);
    }

    return object;
  };

  const result = jsonstringToObject(object);
  console.log(result);

  return result;
};

console.log(`-----------------map을 포함한 오브젝트 json stringfy`);
const rst = stringify(myObject);
console.log(rst);

console.log(`-----------------다시 오브젝트화`);
const result = jsonString2ObjectWithMap<MyType>(rst);

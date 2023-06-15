import { getPath } from "../Javascript/getPath";

describe("getPath", () => {
   test("findEl", () => {
      let el = document.getElementById("someId");
      expect(getPath(el)).toHaveLength;
   });
   test("elUnique", () => {
      let el = document.getElementById("someId");
      expect(document.querySelectorAll(getPath(el)).length).toEqual(1);
   });
});

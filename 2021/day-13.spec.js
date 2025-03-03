const {
  part1,
  part2,
  data,
} = require("./day-13");

describe("Day 13", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(17);
    });

    it("works for real data", () => {
      expect(part1(data())).toBe(undefined);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(undefined);
    });

    it("works for real data", () => {
      expect(part2(data())).toBe(undefined);
    });
  });
});




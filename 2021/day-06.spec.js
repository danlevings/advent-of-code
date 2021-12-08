const {
  part1,
  part2,
  data,
} = require("./day-06");

describe("Day 06", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(5934);
    });

    it("works for real data", () => {
      expect(part1(data())).toBe(358214);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(26984457539);
    });

    it("works for real data", () => {
      expect(part2(data())).toBe(1622533344325);
    });
  });
});

const {
  part1,
  part2,
  data,
} = require("./day-11");

describe("Day 11", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(1656);
    });

    it("works for real data", () => {
      expect(part1(data())).toBe(1588);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(195);
    });

    it("works for real data", () => {
      expect(part2(data())).toBe(517);
    });
  });
});




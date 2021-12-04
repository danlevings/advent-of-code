const {
  part1,
  part2,
  data,
} = require("./day-04");

describe("Day 04", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(4512);
    });

    it("works for real data", () => {
      expect(part1(data())).toBe(63424);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(1924);
    });

    it("works for real data", () => {
      expect(part2(data())).toBe(23541);
    });
  });
});

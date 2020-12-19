const { part1, part2, data } = require("./day-19");

describe("Day 19", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(2);
    });

    it.skip("works for real data", () => {
      expect(part1(data())).toBe(undefined);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(undefined);
    });

    it.skip("works for real data", () => {
      expect(part2(data())).toBe(undefined);
    });
  });
});

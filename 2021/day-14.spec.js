const {
  part1,
  part2,
  data,
} = require("./day-14");

describe("Day 14", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(1588);
    });

    it("works for real data", () => {
      expect(part1(data())).toBe(undefined);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(2188189693529);
    });

    it("works for real data", () => {
      expect(part2(data())).toBe(3572761917024);
    });
  });
});




const {
  part1,
  part2,
  data,
} = require("./day-12");

describe("Day 12", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(226);
    });

    it("works for real data", () => {
      expect(part1(data())).toBe(1588);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(36);
    });

    it("works for real data", () => {
      expect(part2(data())).toBe(517);
    });
  });
});




const {
  part1,
  part2,
  data,
} = require("./day-10");

describe("Day 10", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(26397);
    });

    it("works for real data", () => {
      expect(part1(data())).toBe(413733);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(288957);
    });

    it("works for real data", () => {
      expect(part2(data())).toBe(3354640192);
    });
  });
});




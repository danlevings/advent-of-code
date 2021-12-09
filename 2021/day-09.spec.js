const {
  part1,
  part2,
  data,
} = require("./day-09");

describe("Day 09", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(15);
    });

    it("works for real data", () => {
      expect(part1(data())).toBe(522);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(1134);
    });

    it("works for real data", () => {
      expect(part2(data())).toBe(916688);
    });
  });
});




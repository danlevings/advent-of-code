const {
  part1,
  part2,
  data,
} = require("./day-08");

describe("Day 08", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(26);
    });

    it("works for real data", () => {
      expect(part1(data())).toBe(336120);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(61229);
    });

    it("works for real data", () => {
      expect(part2(data())).toBe(1622533344325);
    });
  });
});

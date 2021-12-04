const {
  part1,
  part2,
  data,
} = require("./day-03");

describe("Day 03", () => {
  describe("Part 1", () => {
    it("works for test data", () => {
      expect(part1(data("test"))).toBe(198);
    });

    it("works for real data", () => {
      expect(part1(data())).toBe(1552);
    });
  });

  describe("Part 2", () => {
    it("works for test data", () => {
      expect(part2(data("test"))).toBe(230);
    });

    it("works for real data", () => {
      expect(part2(data())).toBeUndefined();
    });
  });
});

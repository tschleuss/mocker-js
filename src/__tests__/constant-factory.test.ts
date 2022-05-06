import { constantFactory } from "~/factory/constant-factory";

describe("constantFactory", () => {
  type Province = {
    name: string;
    abbr: string;
  };

  const PROVINCES = [
    { name: "Ontario", abbr: "ON" },
    { name: "Quebec", abbr: "QC" },
    { name: "Nova Scotia", abbr: "NS" },
    { name: "New Brunswick", abbr: "NB" },
    { name: "Manitoba", abbr: "MB" },
    { name: "British Columbia", abbr: "BC" },
    { name: "Prince Edward Island", abbr: "PE" },
    { name: "Saskatchewan", abbr: "SK" },
    { name: "Alberta", abbr: "AB" },
    { name: "Newfoundland and Labrador", abbr: "NL" },
  ];

  const ProvinceFactory = constantFactory<Province>(PROVINCES);

  describe("entry", () => {
    it("should receive a random entry from provided constants list", () => {
      const entry = ProvinceFactory.entry();

      expect(entry).toHaveProperty("name");
      expect(entry.name).toBeDefined();

      expect(entry).toHaveProperty("abbr");
      expect(entry.abbr).toBeDefined();

      expect(PROVINCES).toEqual(expect.arrayContaining([entry]));
    });

    it("should receive a random entry from provided generator", () => {
      const CityFactory = constantFactory<string>(faker => faker.address.cityName()); 

      const entries = CityFactory.entries(12);
      expect(entries).toHaveLength(12);
      expect(Array.isArray(entries)).toBeTruthy();
    });
  });

  describe("entries", () => {
    it("should receive a not unique number of entries from provided constants list", () => {
      const entries = ProvinceFactory.entries(5);

      expect(entries).toHaveLength(5);
      expect(Array.isArray(entries)).toBeTruthy();

      entries.forEach((entry) => {
        expect(entry).toHaveProperty("name");
        expect(entry.name).toBeDefined();

        expect(entry).toHaveProperty("abbr");
        expect(entry.abbr).toBeDefined();

        expect(PROVINCES).toEqual(expect.arrayContaining([entry]));
      });
    });
  });

  describe("sample", () => {
    it("should receive a unique number of entries from provided constants list", () => {
      const entries = ProvinceFactory.sample(4);

      expect(entries).toHaveLength(4);
      expect(Array.isArray(entries)).toBeTruthy();
      expect(new Set(entries).size).toBe(4);

      entries.forEach((entry) => {
        expect(entry).toHaveProperty("name");
        expect(entry.name).toBeDefined();

        expect(entry).toHaveProperty("abbr");
        expect(entry.abbr).toBeDefined();

        expect(PROVINCES).toEqual(expect.arrayContaining([entry]));
      });
    });

    it("should receive all available entries if provided quantity is greater than source list", () => {
      const entries = ProvinceFactory.sample(80);

      expect(entries).toHaveLength(PROVINCES.length);
      expect(Array.isArray(entries)).toBeTruthy();
      expect(new Set(entries).size).toBe(PROVINCES.length);
    });
  });

  describe("seed", () => {
    it("should receive the same list of entries for the same seed", () => {
      const entries1 = ProvinceFactory.seed(666).entries(2);
      const entries2 = ProvinceFactory.seed(666).entries(2);
      expect(entries1).toMatchObject(entries2);
    });

    it("should receive the same sample of entries for the same seed", () => {
      const entries1 = ProvinceFactory.seed(666).sample(2);
      const entries2 = ProvinceFactory.seed(666).sample(2);
      expect(entries1).toMatchObject(entries2);
    });
  });
});

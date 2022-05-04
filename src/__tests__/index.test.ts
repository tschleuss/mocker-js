import { mockFactory } from "..";

describe("mock-factory", () => {
  describe("mockFactory", () => {
    it("should create a new object based on provided attribute", () => {

      type User = {
        firstname: string;
        lastname: string;
      }

      const UserFactory = mockFactory<User>(faker => ({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName()
      }));

      const model = UserFactory.create();

      expect(model).toHaveProperty('firstname');
      expect(model.firstname).toBeDefined();
      expect(typeof model.firstname).toEqual("string");

      expect(model).toHaveProperty('lastname');
      expect(model.lastname).toBeDefined();
      expect(typeof model.lastname).toEqual("string");
    });
  });
});

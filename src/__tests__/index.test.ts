import { mockFactory } from "..";

describe("mock-factory", () => {
  describe("mockFactory", () => {
    describe("create", () => {
      
      type User = {
        firstname: string;
        lastname: string;
      }

      it("should create a new object based on provided attribute when called with default params", () => {
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

      it("should create an array with n number of new objects based on provided attribute", () => {

        type User = {
          firstname: string;
          lastname: string;
        }
  
        const UserFactory = mockFactory<User>(faker => ({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName()
        }));
  
        const modelList = UserFactory.create(5);
  
        expect(modelList).toHaveLength(5);
        expect(Array.isArray(modelList)).toBeTruthy();
  
        modelList.forEach(model => {
          expect(model).toHaveProperty('firstname');
          expect(model.firstname).toBeDefined();
          expect(typeof model.firstname).toEqual("string");
    
          expect(model).toHaveProperty('lastname');
          expect(model.lastname).toBeDefined();
          expect(typeof model.lastname).toEqual("string");
        })
      });
    });
  });
});

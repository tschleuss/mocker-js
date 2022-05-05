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
    });

    describe("createMany", () => {
      
      type User = {
        firstname: string;
        lastname: string;
      }

      it("should create an array with n number of new objects based on provided attribute", () => {
  
        const UserFactory = mockFactory<User>(faker => ({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName()
        }));
  
        const modelList = UserFactory.createMany(5);
  
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

    describe("createWith", () => {

      type User = {
        firstname: string;
        lastname: string;
        address: string;
        age: number;
        phone: string;
      }

      it("should create a new object only with provided key paths", () => {
        const UserFactory = mockFactory<User>(faker => ({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          address: faker.address.streetAddress(),
          age: faker.datatype.number({ max: 100 }),
          phone: faker.phone.phoneNumber(),
        }));
  
        const model = UserFactory.createWith(["firstname", "age"]);
  
        expect(model).toHaveProperty('firstname');
        expect(model.firstname).toBeDefined();
        expect(typeof model.firstname).toEqual("string");
  
        expect(model).toHaveProperty('age');
        expect(model.age).toBeDefined();
        expect(typeof model.age).toEqual("number");

        expect(model).not.toHaveProperty('lastname');
        expect(model).not.toHaveProperty('address');
        expect(model).not.toHaveProperty('phone');
      });

    });

    describe("createManyWith", () => {

      type User = {
        firstname: string;
        lastname: string;
        address: string;
        age: number;
        phone: string;
      }

      it("should create an array with n number of new objects only with provided key paths", () => {
        const UserFactory = mockFactory<User>(faker => ({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          address: faker.address.streetAddress(),
          age: faker.datatype.number({ max: 100 }),
          phone: faker.phone.phoneNumber(),
        }));
  
        const modelList = UserFactory.createManyWith(6, ["firstname", "age"]);
  
        expect(modelList).toHaveLength(6);
        expect(Array.isArray(modelList)).toBeTruthy();
  
        modelList.forEach(model => {
          expect(model).toHaveProperty('firstname');
          expect(model.firstname).toBeDefined();
          expect(typeof model.firstname).toEqual("string");
    
          expect(model).toHaveProperty('age');
          expect(model.age).toBeDefined();
          expect(typeof model.age).toEqual("number");
  
          expect(model).not.toHaveProperty('lastname');
          expect(model).not.toHaveProperty('address');
          expect(model).not.toHaveProperty('phone');
        })
      });
    });

    describe("assign", () => {

      type User = {
        firstname: string;
        lastname: string;
      }

      it("should create a new object with provided overrides", () => {
        const UserFactory = mockFactory<User>(faker => ({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName()
        }));
  
        const DafoeModel = UserFactory.assign({
          lastname: "Dafoe",
        });
        
        const model = DafoeModel.create();
  
        expect(model).toHaveProperty('firstname');
        expect(model.firstname).toBeDefined();
        expect(typeof model.firstname).toEqual("string");

        expect(model.lastname).toBe("Dafoe")
      });

      it("should create a new object with provided generator", () => {
        const UserFactory = mockFactory<User>(faker => ({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName()
        }));
  
        const DafoeModel = UserFactory.assign(() => ({
          lastname: "Dafoe",
        }));
        
        const model = DafoeModel.create();

        console.log("model", model);
  
        expect(model).toHaveProperty('firstname');
        expect(model.firstname).toBeDefined();
        expect(typeof model.firstname).toEqual("string");

        expect(model.lastname).toBe("Dafoe")
      });

      it("sshould create an array with n number of new objects with provided overrides", () => {
        const UserFactory = mockFactory<User>(faker => ({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName()
        }));
  
        const DafoeModel = UserFactory.assign({
          lastname: "Dafoe",
        });
        
        const modelList = DafoeModel.createMany(3);
  
        expect(modelList).toHaveLength(3);
        expect(Array.isArray(modelList)).toBeTruthy();
  
        modelList.forEach(model => {
          expect(model).toHaveProperty('firstname');
          expect(model.firstname).toBeDefined();
          expect(typeof model.firstname).toEqual("string");
  
          expect(model.lastname).toBe("Dafoe")
        })
      });
    });
  });
});

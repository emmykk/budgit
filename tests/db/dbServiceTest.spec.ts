import { doesNotMatch } from "assert";

const dbService = require("../../db/dbService");

describe("DB Tests", () => {
  afterEach(async () => {
    await dbService.cleanUpTestData();
  });

  it("Can connect to the the db", async () => {
    expect(await dbService.connectToDb()).toBe("DB Auth successful");
  });

  describe("Users Table", () => {
    beforeEach(() => {});

    it("Can insert a user", async () => {
      const result = await dbService.insertUser({
        username: "test",
        email: "test@test.com",
        password: "plaintextpwd",
      });
      expect(result.username).toBe("test");
      expect(result.email).toBe("test@test.com");
    });

    // it("Can get all users", async () => {
    //   await dbService.insertUser("test1", "test@test.com", "plaintextpwd");
    //   await dbService.insertUser("test2", "test@test.com", "plaintextpwd");
    //   const resultLen = await dbService.getAllUsers();
    //   expect(resultLen.length).toBe(2);
    // });
  });
});

afterAll((done) => {
  dbService.disconnect();
  done();
});

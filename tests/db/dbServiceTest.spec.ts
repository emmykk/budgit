const dbService = require("../../db/dbService.ts");

describe("DB Tests", () => {
  it("Can connect to the the db", async () => {
    expect(await dbService.pingDb()).toBe("DB Auth successful");
  });
});

jest.setTimeout(15000);

const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../db/sequelize");

beforeAll(async () => {
    await sequelize.sync({ force: true });
    await request(app)
        .post("/api/auth/register")
        .send({ email: "test@example.com", password: "password123" });
});

afterAll(async () => {
    await sequelize.close();
});

describe("POST /api/auth/login", () => {
    it("должен возвращать 200, token и user {email, subscription}", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: "test@example.com", password: "password123" });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(typeof res.body.token).toBe("string");
        expect(res.body).toHaveProperty("user");
        expect(res.body.user).toHaveProperty("email", "test@example.com");
        expect(typeof res.body.user.subscription).toBe("string");
    });
});

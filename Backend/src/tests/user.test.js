const app = require("../../app.js");
const request = require("supertest");

describe("User API Tests", () => {
    test("GET /api/users/all should return a list of users", async () => {
        const response = await request(app).get("/api/users/all");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /api/users/:id should return a user by ID", async () => {
        const userId = 1;
        const response = await request(app).get(`/api/users/${userId}`);

        expect(response.statusCode).toBe(200);
    });

    test("GET /api/users/:id should return 404 if user ID does not exist", async () => {
        const userId = 4324234234;
        const response = await request(app).get(`/api/users/${userId}`);

        expect(response.statusCode).toBe(404);
    });

    // test("POST /api/users/register should create a new user", async () => {
    //     const response = await request(app).post("/api/users/register").send({
    //         id: 423423,
    //         first_name: "Test",
    //         last_name: "User",
    //         photo: "https://www.test.com/test.jpg",
    //         email: "test@email.com",
    //         password: "Test123!",
    //         role: "user",
    //     });
    //     expect(response.statusCode).toBe(200);
    // });

    // test("DELETE /api/users/:id should delete a user", async () => {
    //     const userIdToDelete = 5;
    //     const response = await request(app).delete(`/api/users/${userIdToDelete}`);

    //     expect(response.statusCode).toBe(200);
    // });
});
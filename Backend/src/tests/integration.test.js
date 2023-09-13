const app = require("../../app.js");
const request = require("supertest");

describe("User API Tests", () => {
    let createdUserId = null;

    test("GET /api/users/all should return a list of users", async () => {
        const response = await request(app).get("/api/Users/All");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /api/users/:id should return a user by ID", async () => {
        const userId = 1;
        const response = await request(app).get(`/api/Users/${userId}`);

        expect(response.statusCode).toBe(200);
    });

    test("GET /api/users/:id should return 404 if user ID does not exist", async () => {
        const userId = 4324234234;
        const response = await request(app).get(`/api/Users/${userId}`);

        expect(response.statusCode).toBe(404);
    });

    test("POST /api/users/register should create a new user", async () => {
        const response = await request(app).post("/api/Users/Register").send({
            first_name: "Test",
            last_name: "User",
            email: "test@email.com",
            password: "Test123!",
            profile: "Incubator",
        });
        expect(response.statusCode).toBe(200);
        createdUserId = response.body.id;
    });

    test("POST /api/users/register should return 400 if email is already in use", async () => {
        const response = await request(app).post("/api/Users/Register").send({
            first_name: "Test",
            last_name: "User",
            email: "test@email.com",
            password: "Test123!",
            profile: "Incubator",
        });
        expect(response.statusCode).toBe(409);
    });

    test("DELETE /api/users/:id should delete a user", async () => {
        console.log(createdUserId);
        const response = await request(app).delete(`/api/users/${createdUserId}`);

        expect(response.statusCode).toBe(200);
    });
});

describe("Event API Tests", () => {
    test("GET /api/Events/All should return list of events", async () => {
        const response = await request(app).get("/api/Events/All");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /api/Events/:id should return an event by it's ID", async () => {
        const eventId = 1;
        const response = await request(app).get(`/api/Events/${eventId}`);

        expect(response.statusCode).toBe(200);
    });

});
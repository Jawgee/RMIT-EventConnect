const app = require("../../app.js");
const request = require("supertest");

describe("User/Login API Tests", () => {
    let createdUserId = null;

    test("GET /api/Users/:id should return 404 if user ID does not exist", async () => {
        const userId = 4324234234;
        const response = await request(app).get(`/api/Users/${userId}`);

        expect(response.statusCode).toBe(404);
    });

    test("POST /api/Users/Register should return 422 if invalid email is provided", async () => {
        const response = await request(app).post(`/api/Users/Register`).send({
            first_name: "Test",
            last_name: "User",
            // Invalid Email
            email: "testemail.com",
            password: "Test123!",
            profile: "Incubator",
        });
        expect(response.statusCode).toBe(422);
    });

    test("POST /api/Users/Register should return 422 if invalid password is provided", async () => {
        const response = await request(app).post(`/api/Users/Register`).send({
            first_name: "Test",
            last_name: "User",
            email: "test@email.com",
            // Invalid Password
            password: "Test",
            profile: "Incubator",
        });
        expect(response.statusCode).toBe(422);
    });

    test("POST /api/Users/Register should return 422 if argument is missing", async () => {
        const response = await request(app).post(`/api/Users/Register`).send({
            first_name: "Test",
            last_name: "User",
            email: "test@email.com",
            password: "Test"
            // Missing password argument
        });
        expect(response.statusCode).toBe(422);
    });

    test("POST /api/Users/Register should create a new user", async () => {
        const response = await request(app).post(`/api/Users/Register`).send({
            first_name: "Test",
            last_name: "User",
            email: "test@email.com",
            password: "Test123!",
            profile: "Incubator",
        });
        expect(response.statusCode).toBe(200);
        createdUserId = response.body.id;
    });

    test("GET /api/Users/All should return a list of users", async () => {
        const response = await request(app).get(`/api/Users/All`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /api/Users/:id should return a user by ID", async () => {
        const response = await request(app).get(`/api/Users/${createdUserId}`);

        expect(response.statusCode).toBe(200);
    });

    test("POST /api/Users/Login should return 200 for successful login", async () => {
        const response = await request(app).post(`/api/Users/Login`).send({
            email: "test@email.com",
            password: "Test123!"
        });
        expect(response.statusCode).toBe(200);
    });

    test("POST /api/Users/Login should return a 404 for insuccessful login", async () => {
        const response = await request(app).post(`/api/Users/Login`).send({
            email: "notarealuser@email.com",
            password: "JohnDoesPassword"
        });
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("User not found");
    });

    test("PUT /api/Users/:id should update a user", async () => {
        const response = await request(app).put(`/api/Users/${createdUserId}`).send({
            email: "JohnDoesFirstName",
        });
        expect(response.statusCode).toBe(200);
    });

    test("GET /api/Users/Events/:id should return 404 if there are no events associated with user", async () => {
        const response = await request(app).get(`/api/Users/Events/${createdUserId}`);

        expect(response.statusCode).toBe(404);
    });


    test("DELETE /api/Users/:id should delete a user", async () => {
        const response = await request(app).delete(`/api/Users/${createdUserId}`);

        expect(response.statusCode).toBe(200);
    });

    test("DELETE /api/Users/:id should return 404 if the user is not found", async () => {
        const response = await request(app).delete(`/api/Users/${createdUserId}`);

        expect(response.statusCode).toBe(404);
    });
});

describe("Event API Tests", () => {
    let createdEventId = null;
    let MockUserId = null;

    beforeAll(async () => {
        const response = await request(app).post(`/api/Users/Register`).send({
            first_name: "NEWTest",
            last_name: "User",
            email: "event_test@email.com",
            password: "Test123!",
            profile: "Incubator",
        });
        MockUserId = response.body.id;
    });

    test("GET /api/Events/All should return list of events", async () => {
        const response = await request(app).get(`/api/Events/All`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /api/Events/Create should create a new event", async () => {
        const response = await request(app).post(`/api/Events/Create`).send({
            name: "Sample Event",
            owner: "John Doe",
            sector: "Tech",
            profile: "Startup",
            category: "Round Table",
            privacy: "public",
            description: "An awesome tech startup event",
            location: "Tech Hub",
            frequency: "Yearly",
            environment: "Informal",
            entrance: "Free",
            accessibility: "In-person",
            motivation: "Validation"
        });
        expect(response.statusCode).toBe(201);
        createdEventId = response.body.id;
    });

    test("POST /api/Events/AddAttendee should enlist an attendee into an event", async () => {
        const response = await request(app).post(`/api/Events/AddAttendee/${createdEventId}`).send({
            userId: MockUserId
        });

        expect(response.statusCode).toBe(201);
    });

    test("POST /api/Events/Create should return a 409 when creating an event with a name that already exists", async () => {
        const response = await request(app).post(`/api/Events/Create`).send({
            name: "Sample Event",
            owner: "John Doe",
            sector: "Tech",
            profile: "Startup",
            category: "Round Table",
            privacy: "public",
            description: "An awesome tech startup event",
            location: "Tech Hub",
            frequency: "Yearly",
            environment: "Informal",
            entrance: "Free",
            accessibility: "In-person",
            motivation: "Validation"
        });
        expect(response.statusCode).toBe(409);
    });

    test("PUT /api/Events/Edit should return 200 if an event is updated successfully", async () => {
        const response = await request(app).put(`/api/Events/Edit/${createdEventId}`).send({
            name: "Updated Sample Event",
            owner: "John Freezy Doe",
            sector: "Tech",
            profile: "Startup",
            category: "Round Table",
            privacy: "public",
            description: "An awesome tech startup event",
            location: "Tech Hub",
            frequency: "Yearly",
            environment: "Informal",
            entrance: "Free",
            accessibility: "In-person",
            motivation: "Validation"
        });
        expect(response.statusCode).toBe(200);
    });

    test("GET /api/Events/:id should return an event by it's ID", async () => {
        const response = await request(app).get(`/api/Events/${createdEventId}`);

        expect(response.statusCode).toBe(200);
    });

    test("DELETE /api/Events/:id should delete an event", async () => {
        const response = await request(app).delete(`/api/Events/${createdEventId}`);

        expect(response.statusCode).toBe(200);
    });

    test("POST /api/Events/AddAttendee should return 500 (should be 404) if event does not exist", async () => {
        const response = await request(app).post(`/api/Events/AddAttendee/${createdEventId}`).send({
            userId: MockUserId
        });

        expect(response.statusCode).toBe(500);
    });

    afterAll(async () => {
        await request(app).delete(`/api/Users/${MockUserId}`);
    });


});

describe("Tags API Tests", () => {
    let MockUserId = null;
    let MockEventId = null;

    beforeAll(async () => {
        // Create a temporary dummy user to test the tag endpoints
        const UserResponse = await request(app).post(`/api/Users/Register`).send({
            first_name: "Test",
            last_name: "User",
            email: "event_test@email.com",
            password: "Test123!",
            profile: "Incubator",
        });
        MockUserId = UserResponse.body.id;
        // Create a temporary dummy event to test the tag endpoints
        const EventResponse = await request(app).post(`/api/Events/Create`).send({
            name: "Sample Event",
            owner: "John Doe",
            sector: "Tech",
            profile: "Startup",
            category: "Round Table",
            privacy: "public",
            description: "An awesome tech startup event",
            location: "Tech Hub",
            frequency: "Yearly",
            environment: "Informal",
            entrance: "Free",
            accessibility: "In-person",
            motivation: "Validation"
        });
        MockEventId = EventResponse.body.id;
    });

    test("PUT api/Tags/UserInterests/:user_id should return 200 if user preferences are updated successfully", async () => {
        const response = await request(app).put(`/api/Tags/UserInterests/${MockUserId}`).send({
            pitch: false,
            metaverse: true,
            stand: true
        });
        expect(response.statusCode).toBe(200);
    });

    test("PUT api/Tags/EventTags/:event_id should return 200 if event preferences are updated successfully", async () => {
        const response = await request(app).put(`/api/Tags/EventTags/${MockEventId}`).send({
            pitch: false,
            metaverse: true,
            stand: true
        });
        expect(response.statusCode).toBe(200);
    });

    test("GET api/Tags/UserByTag/:column/:bool should return 200 if a user with the tag exists", async () => {
        const response = await request(app).get(`/api/Tags/UserByTag/metaverse/1`);

        expect(response.statusCode).toBe(200);
    });

    test("GET api/Tags/UserTagList/:user_id should return a user's tag list", async () => {
        const response = await request(app).get(`/api/Tags/UserTagList/${MockUserId}`);

        expect(response.statusCode).toBe(200);
    });

    test("GET api/Tags/EventTagList/:event_id should return an events tag list", async () => {
        const response = await request(app).get(`/api/Tags/EventTagList/${MockEventId}`);

        expect(response.statusCode).toBe(200);
    });

    afterAll(async () => {
        await request(app).delete(`/api/Users/${MockUserId}`);
        await request(app).delete(`/api/Events/${MockEventId}`);
    });
});

describe("Enlist API Tests", () => {
    let MockUserId = null;
    let MockEventId = null;

    beforeAll(async () => {
        // Create a temporary dummy user to test the enlist endpoints
        const UserResponse = await request(app).post(`/api/Users/Register`).send({
            first_name: "Test",
            last_name: "User",
            email: "event_test@email.com",
            password: "Test123!",
            profile: "Incubator",
        });
        MockUserId = UserResponse.body.id;
        // Create a temporary dummy event to test the enlist endpoints
        const EventResponse = await request(app).post(`/api/Events/Create`).send({
            name: "Sample Event",
            owner: "John Doe",
            sector: "Tech",
            profile: "Startup",
            category: "Round Table",
            privacy: "public",
            description: "An awesome tech startup event",
            location: "Tech Hub",
            frequency: "Yearly",
            environment: "Informal",
            entrance: "Free",
            accessibility: "In-person",
            motivation: "Validation"
        });
        MockEventId = EventResponse.body.id;
    });

    test("POST /api/Enlist/ should return 200 if a user is successfully enlisted to an event", async () => {
        const response = await request(app).post(`/api/Enlist/`).send({
            user_id: MockUserId,
            event_id: MockEventId
        });

        expect(response.statusCode).toBe(200);
    });

    test("GET api/Enlist/Events/:user_id should return a list of events the user is attending", async () => {
        const response = await request(app).get(`/api/Enlist/Events/${MockUserId}`);

        expect(response.statusCode).toBe(200);
    });

    test("GET api/Enlist/Attendees/:event_id should return a list of users attending an event", async () => {
        const response = await request(app).get(`/api/Enlist/Attendees/${MockEventId}`);

        expect(response.statusCode).toBe(200);
    });

    test("DELETE /api/Enlist/ should return 204 if the user is removed from the event successfully", async () => {
        const response = await request(app).delete(`/api/Enlist/`).send({
            user_id: MockUserId,
            event_id: MockEventId
        });
        expect(response.statusCode).toBe(204);
    });

    afterAll(async () => {
        await request(app).delete(`/api/Users/${MockUserId}`);
        await request(app).delete(`/api/Events/${MockEventId}`);
    });

});


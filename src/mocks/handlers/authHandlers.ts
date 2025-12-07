import { http, HttpResponse, delay } from "msw";
import { MOCK_USERS } from "@/mocks/data/users";
import type { LoginCredentials, LoginResponse } from "@/types/user";

export const authHandlers = [
  // Login endpoint
  http.post("/api/auth/login", async ({ request }) => {
    await delay(500); // Simulate network delay

    try {
      const credentials = (await request.json()) as LoginCredentials;

      // Find user by email
      const user = MOCK_USERS.find((u) => u.email === credentials.email);

      // Validate credentials
      if (!user || user.password !== credentials.password) {
        return HttpResponse.json(
          { error: "Invalid email or password. Please check your credentials and try again." },
          { status: 401 }
        );
      }

      // Generate a mock token (in real app, this would be a JWT)
      const token = `mock_token_${user.id}_${Date.now()}`;

      // Return user without password
      const response: LoginResponse = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      };

      return HttpResponse.json(response, { status: 200 });
    } catch (error) {
      return HttpResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
  }),

  // Get current user endpoint (for token validation)
  http.get("/api/auth/me", async ({ request }) => {
    await delay(200);

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    // Extract user ID from token (mock implementation)
    const userIdMatch = token.match(/mock_token_(\d+)_/);
    if (!userIdMatch) {
      return HttpResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = userIdMatch[1];
    const user = MOCK_USERS.find((u) => u.id === userId);

    if (!user) {
      return HttpResponse.json({ error: "User not found" }, { status: 404 });
    }

    return HttpResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  }),

  // Logout endpoint
  http.post("/api/auth/logout", async () => {
    await delay(200);
    return HttpResponse.json({ message: "Logged out successfully" }, { status: 200 });
  }),
];


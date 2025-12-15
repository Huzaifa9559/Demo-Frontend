import { http, HttpResponse, delay } from "msw";
import { MOCK_USERS } from "@/mocks/data/users";
import type {
  LoginCredentials,
  LoginResponse,
  SignupCredentials,
  SignupResponse,
  RequestOtpCredentials,
  RequestOtpResponse,
  VerifyOtpCredentials,
  VerifyOtpResponse,
  ResetPasswordCredentials,
  ResetPasswordResponse,
} from "@/types/user";

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

  // Signup endpoint
  http.post("/api/auth/signup", async ({ request }) => {
    await delay(500);

    try {
      const credentials = (await request.json()) as SignupCredentials;

      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === credentials.email);
      if (existingUser) {
        return HttpResponse.json(
          { error: "User with this email already exists" },
          { status: 409 }
        );
      }

      // Create new user
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        email: credentials.email,
        password: credentials.password, // In real app, this would be hashed
        name: credentials.name,
        role: "user" as const,
      };

      MOCK_USERS.push(newUser);

      // Generate a mock token
      const token = `mock_token_${newUser.id}_${Date.now()}`;

      const response: SignupResponse = {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
        token,
      };

      return HttpResponse.json(response, { status: 201 });
    } catch (error) {
      return HttpResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
  }),

  // Request OTP endpoint
  http.post("/api/auth/forget-password/request-otp", async ({ request }) => {
    await delay(500);

    try {
      const { email } = (await request.json()) as RequestOtpCredentials;

      const user = MOCK_USERS.find((u) => u.email === email);
      if (!user) {
        return HttpResponse.json(
          { error: "User with this email does not exist" },
          { status: 401 }
        );
      }

      // Generate a constant OTP for mock implementation
      const OTP = "123456";

      // In a real implementation, you would send this OTP via email
      // For mock implementation, we'll just log it
      console.log(`[MOCK EMAIL] OTP for ${email}: ${OTP}`);
      console.log(`This is a mock implementation. In production, this OTP would be sent to the user's email.`);

      const response: RequestOtpResponse = {
        message: "OTP has been sent to your email address",
        // In development, we can return the OTP for testing
        ...(import.meta.env.DEV && { otp: OTP }),
      };

      return HttpResponse.json(response, { status: 200 });
    } catch (error) {
      return HttpResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
  }),

  // Verify OTP endpoint
  http.post("/api/auth/forget-password/verify-otp", async ({ request }) => {
    await delay(500);

    try {
      const { email, otp } = (await request.json()) as VerifyOtpCredentials;

      const user = MOCK_USERS.find((u) => u.email === email);
      if (!user) {
        return HttpResponse.json(
          { error: "User with this email does not exist" },
          { status: 401 }
        );
      }

      // Constant OTP for mock implementation
      const VALID_OTP = "123456";

      if (otp !== VALID_OTP) {
        return HttpResponse.json(
          { error: "Invalid OTP" },
          { status: 401 }
        );
      }

      const response: VerifyOtpResponse = {
        message: "OTP verified successfully",
      };

      return HttpResponse.json(response, { status: 200 });
    } catch (error) {
      return HttpResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
  }),

  // Reset password endpoint
  http.post("/api/auth/forget-password/reset", async ({ request }) => {
    await delay(500);

    try {
      const { email, otp, newPassword } = (await request.json()) as ResetPasswordCredentials;

      const user = MOCK_USERS.find((u) => u.email === email);
      if (!user) {
        return HttpResponse.json(
          { error: "User with this email does not exist" },
          { status: 401 }
        );
      }

      // Constant OTP for mock implementation
      const VALID_OTP = "123456";

      if (otp !== VALID_OTP) {
        return HttpResponse.json(
          { error: "Invalid OTP" },
          { status: 401 }
        );
      }

      // Update password (in real app, this would be hashed)
      user.password = newPassword;

      const response: ResetPasswordResponse = {
        message: "Password has been reset successfully",
      };

      return HttpResponse.json(response, { status: 200 });
    } catch (error) {
      return HttpResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
  }),
];


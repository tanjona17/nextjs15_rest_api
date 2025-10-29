import { jwtVerify } from "jose"; // import the jwtVerify function from the 'jose' library (Edge-compatible JWT verification)

export async function authentification(req: Request) {
  // Read the Authorization header, split on spaces ("Bearer <token>"), and take the second part (the token).
  // The optional chaining (?.) prevents an exception if the header is missing.
  const token = req.headers.get("authorization")?.split(" ")[1];

  // If there is no token, immediately return an object saying the token is invalid.
  if (!token) return { isValid: false };

  try {
    // Convert the secret (a string from environment variables) into a Uint8Array.
    // jwtVerify expects a crypto key-like input; TextEncoder encodes the string into bytes.
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Verify the token using jwtVerify. It returns an object that includes the `payload`.
    // We `await` because jwtVerify is asynchronous.
    const { payload } = await jwtVerify(token, secret);

    // If verification succeeded, return isValid true and include the decoded payload.
    return { isValid: true, decoded: payload };
  } catch {
    // If verification failed (invalid token, expired, wrong secret, etc.), catch and return isValid false.
    return { isValid: false };
  }
}

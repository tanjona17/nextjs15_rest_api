import jwt from "jsonwebtoken";

// ✅ Validate token using JWT
const validate = (token: string | undefined) => { 
  if (!token) return false;

  try {
    // Verify token using secret key
    jwt.verify(token, process.env.JWT_SECRET!);
    return true; // Token is valid
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return false; // Token invalid
  }
};

// ✅ Main authentication function
export function authentification(req: Request): any {
  // Expecting header: Authorization: Bearer <token>
  const token = req.headers.get("authorization")?.split(" ")[1];

  const isValid = validate(token);
  let decoded = null;

  if (isValid && token) {
    decoded = jwt.decode(token); // Optional: get user info without verifying again
  }

  return { isValid, decoded };
}

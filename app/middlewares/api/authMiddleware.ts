import { jwtVerify } from "jose";

export async function authentification(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return { isValid: false };
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return { isValid: true, decoded: payload };
  } catch {
    return { isValid: false };
  }
};

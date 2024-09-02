import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access, no token provided" });
    }

    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = tokenVerified;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access, invalid token" });
  }
};

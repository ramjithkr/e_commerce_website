import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = tokenVerified;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }
};

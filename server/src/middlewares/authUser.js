// import jwt from "jsonwebtoken";

// export const authUser = (req, res, next) => {
//   try {
//     const { token } = req.cookies;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User not authenticated" });
//     }

//     const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     req.user = tokenVerified;

//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return res
//       .status(401)
//       .json({ success: false, message: "User not authenticated" });
//   }
// };

import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    // Verify the token
    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // You can add additional checks here (e.g., verifying token content)

    req.user = tokenVerified;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);

    // Customize error message for expired token
    const message =
      error.name === "TokenExpiredError"
        ? "Token expired"
        : "Invalid token";

    return res.status(401).json({ success: false, message });
  }
};

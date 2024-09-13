// import jwt from "jsonwebtoken";

// export const authAdmin = (req, res, next) => {
//   try {
//     const { token } = req.cookies;

//     if (!token) {
//       return res
//         .status(400)
//         .json({ success: false, message: "admin Unathorized access" });
//     }

//     const tokenVarified = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY);
//     if (!tokenVarified) {
//       return res
//         .status(400)
//         .json({ success: false, message: "admin Token unathorized access" });
//     }
//     req.admin = tokenVarified;
// console.log("authadmin", req.admin);
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

import jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Token missing.",
      });
    }

    // Verify the token using the secret key
    const tokenVerified = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY);

    if (!tokenVerified) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Invalid token.",
      });
    }

    // Attach the decoded token (which contains the admin's data) to req.admin
    req.admin = tokenVerified;

   
    next();
  } catch (error) {
    console.log("Error in authAdmin middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

import jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "admin Unathorized access" });
    }

    const tokenVarified = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY);
    if (!tokenVarified) {
      return res
        .status(400)
        .json({ success: false, message: "admin Token unathorized access" });
    }
    req.admin = tokenVarified;
    next();
  } catch (error) {
    console.log(error);
  }
};

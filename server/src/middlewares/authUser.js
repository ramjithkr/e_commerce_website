import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "user Unauthorized access" });
    }

    const tokenVarified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!tokenVarified) {
      return res
        .status(400)
        .json({ success: false, message: "user Unauthorized acess" });
    }

    req.user = tokenVarified;

    next();
  } catch (error) {
    console.log(error);
  }
};

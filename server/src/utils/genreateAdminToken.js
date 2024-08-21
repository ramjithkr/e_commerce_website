import jwt from "jsonwebtoken";

export const generateAdminToken = (email) => {
  const token = jwt.sign(
    { email: email, role: "admin" },
    process.env.JWT_ADMIN_SECRET_KEY
  );
  return token;
};

export const handleError = async (error, req, res, next) => {
    try {
        const statusCode = error.statusCode || 500;
        const messsage = error.message || "Internal server error";

        res.status(statusCode).json({ messsage });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};
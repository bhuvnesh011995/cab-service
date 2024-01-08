exports.ErrorHandler = async function (err, req, res, next) {
  let status = err.status || err.statusCode || 500;
  let message = err.message || "something went wrong";

  res.status(status).json({ success: false, message });
};

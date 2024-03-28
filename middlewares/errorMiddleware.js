// error middleware || next
const errorMiddleware = (err, req, res, next) => {
  //   console.log(err);
  const defaultError = {
    statusCode: 500,
    message: err,
  };

  // missing Field _ Errors
  if (err.name === "ValidationError") {
    (defaultError.statusCode = 400),
      (defaultError.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(",")); // name vagaire kahi nasel tr tya sathi
  }

  // duplicate error _If user already registered
  if (err.code && err.code == 11000) {
    (defaultError.statusCode = 400),
      (defaultError.message = `${Object.keys(
        err.keyValue
      )} Field has to be unique`); // ani he jr eka email varun punha login kel tr tyasathi
  }

  res.status(defaultError.statusCode).json({ message: defaultError.message });

  //   return res.status(400).send({
  //     success: false,
  //     message: "Somethinh went wrong",
  //     err,
  //   });

  //   next();  // we can call here but we use "next" in controller where we use to send responses like next('name required')
};

export default errorMiddleware;

const passArValueToController = (req, res, next) => {
  res.locals.language = "ar";
  next();
};
const passEnValueToController = (req, res, next) => {
  res.locals.language = "en";
  next();
};

export {passArValueToController,passEnValueToController}
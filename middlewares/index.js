const fs = require("fs");

function logReqRes(filename) {
  fs.appendFile(
    filename,
    `${Date.now()}:${req.ip}: ${req.method}: ${req.path}\n`,
    (err, data) => {
      req.myUserName = "Zahid_majeed";
      next();
    },
  );
  // next();
}
module.exports = logReqRes;

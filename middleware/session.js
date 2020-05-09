const shortid = require("shortid");
const db = require("../db");

module.exports = (req, res, next) => {
  const sessionId = shortid.generate();
  if (!req.signedCookies.auth) {
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    
    db.get("sessions")
    .push({ sessionId })
    .write();
  }
  
  next();
};

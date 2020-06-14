const shortid = require('shortid');
const Session = require('../Model/session.model.js');

module.exports = async (req, res, next) => {
  const sessionId = shortid.generate();
  if (!req.signedCookies.sessionId) {
    res.cookie('sessionId', sessionId, {
      signed: true,
    });

    const newSession = new Session({
      sessionId,
    });

    await newSession.save();
  }

  next();
};

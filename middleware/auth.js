module.exports = (req, res, next) => {
  if(!req.cookies.auth){
    res.render('auth/login.pug', {
      errors: ['You have must login'];
    })
    return
  };
  
  const user = db.get('users').find({id: req.cookies.auth}).value();
  
  if(!user){
    res.render('auth/login.pug', {
      errors: ['You dose exists!'];
    })
    return
  }
  
  
  
  next();
}
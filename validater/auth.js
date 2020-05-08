module.exports = (req, res, next) => {
  let errors = [];
  if(!req.body.email){
    errors.push('Email is require?')
  }
  
  if(!req.body.password){
    errors.push('Password is require?')
  }
  
  if(errors.length > 0){
    res.render('auth/login.pug', {
      errors
    })
    
    return;
  }
  
  next();
}
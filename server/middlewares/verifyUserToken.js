import jwt  from "jsonwebtoken";



const verifyToken = (req, res, next) => {

const token = req.body.token || req.query.token || req.headers["authorization"];
if (!token) {
  return res.send("A token is required for authentication");
}
try {
  const decoded = jwt.verify(token, "asdf");
  req.user = decoded;
}
 catch (err) {
  console.log(err)
  return res.status(200).send("Invalid Token");
}
return next();
};



  export
  {
   verifyToken 
  }
import jwt  from "jsonwebtoken";

export function makeToken(user)
{
  
    const token = jwt.sign({
        user_name:user.name,
        user_pin:user.pin,
        user_email:user.email
      },
      "asdf", {
        expiresIn: "7y"
      }
    );
    
    
    return token;
    
}



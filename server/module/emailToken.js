import jwt  from "jsonwebtoken";

export function makeToken(cardCvv,cardExpiry,cardNumber)
{
  
    const token = jwt.sign({
        send_card_number:cardNumber,
        send_card_Expiry:cardExpiry,
        send_card_cvv:cardCvv
      },
      "blabla", {
        expiresIn: "20s"
      }
    );
    
    
    return token;
    
}

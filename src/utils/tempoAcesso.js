import { Encrypt,Decrypt  } from './password' 

const SetTimeEncrypt = function setTime(){
  
    var date = new Date();
    var tempo = 1 * 60 * 60000;

    var finalTime = Encrypt(  (date.getTime() + tempo).toString());

  
  return  finalTime;
}

const IsValidTime = function (encryptedText){

    var isValidTime = false;
    
    var date = new Date();

    var momomentoAnterior = parseInt( Decrypt(encryptedText),10);
    
    var momentoAtual = parseInt(date.getTime(),10);

    if (momomentoAnterior > momentoAtual){
        isValidTime = true;
    }
    

    return isValidTime;

}

export {
    SetTimeEncrypt,
    IsValidTime
}
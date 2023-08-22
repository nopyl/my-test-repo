export const validateInputs = (...inputs) => {

    for (let i = 0; i < inputs.length; i++) {
        
        if(inputs[i] === null){

            return false;
        }
    }

    return true;
}

export const checkPasswordRegExp = (password) => {
    
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegExp.test(password);
}
export const validateInputs = (...inputs) => {

    for (let i = 0; i < inputs.length; i++) {
        
        if(inputs[i] === undefined || null){

            return false;
        }
    }

    return true;
}

export const checkPasswordRegExp = (password) => {
    
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegExp.test(password);
}

export const checkPhoneRegExp = (phoneNumber) => {

    const phoneRegExp = /^\+[1-9]{1}[0-9]{7,11}$/;
    return phoneRegExp.test(phoneNumber);

}

export const capitalize = (str) => {

    return str.charAt(0).toUpperCase() + str.slice(1);
}
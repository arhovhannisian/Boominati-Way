let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
let usernameRegex = /^[a-zA-Z]{2,}$/;
let productNameRegex = /^[A-Za-z]+$/;
let productPriceRegex = /^[0-9]{1,20}$/;
let imgLinkRegex = /^https?:\/\/(?:www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+?\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i;



export const productPriceValidation ={
    pattern:{
        value: productPriceRegex,
        message: "only numbers. 1-20 length"
    },
    required: {
        value: true,
        message: "Price is required"
    },
}
export const imgLinkValidation ={
    pattern:{
        value: imgLinkRegex,
        message: "only URL"
    },
    required: {
        value: true,
        message: "URL is required"
    },
}
export const productNameValidation = {
    pattern: {
        value: productNameRegex,
        message: "Name error ( only uppercase ande lowerace letters)"
    },
    required: {
        value: true,
        message: "Name is required"
    },
    minLength: {
        value: 3,
        message: "Min 3 symbols"
    },
}

export const userNameValidation = {
    pattern: {
        value: usernameRegex,
        message: "Username error"
    },
    required: {
        value: true,
        message: "Username is required"
    }
}

export const emailValidation = {
    pattern: {
        value: emailRegex,
        message: "Email error"
    },
    required: {
        value: true,
        message: "Email is required"
    }
}

export const passwordValidation = {
    pattern: {
        value: passwordRegex,
        message: "Password error (A-a-0-9-$,@) "
    },
    required: {
        value: true,
        message: "Password is required"
    },
    minLength: {
        value: 8,
        message: "Min 8 symbols"
    },
    maxLength: {
        value: 16,
        message: "Max 16 symbols"
    }
}
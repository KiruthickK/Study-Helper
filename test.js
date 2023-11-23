function isPasswordValid(password) {
    let isCharPresent = false;
    let isNumberPresent = false;
    for (var i = 0; i < password.length; i++) {
        var ch = password.charAt(i);
        if (ch >= 'a' && ch <= 'z') {
            isCharPresent = true;
        }
        if (ch >= 'A' && ch <= 'Z') {
            isCharPresent = true;
        }
        if (ch >= 0 && ch <= 9) {
            isNumberPresent = true;
        }
    }
    return isCharPresent && isNumberPresent && password.length >= 8;
}
const password = "kiruthcik23"
console.log(isPasswordValid(password))

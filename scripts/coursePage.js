window.onload = () => {
    const auth_code = sessionStorage.getItem("auth_code");
    const user_id = sessionStorage.getItem("user_id");
    console.log(user_id, " : ", auth_code)
}
function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("projetoAtual");

    window.location.href = "login.html";

}
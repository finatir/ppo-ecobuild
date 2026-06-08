async function cadastrar(){

    const nome =
    document.getElementById(
        "nome"
    ).value;

    const email =
    document.getElementById(
        "email"
    ).value;

    const senha =
    document.getElementById(
        "senha"
    ).value;

    const response =
    await fetch(
        "http://localhost:3000/auth/cadastro",
        {
            method:"POST",
            headers:{
                "Content-Type":
                "application/json"
            },
            body:JSON.stringify({
                nome,
                email,
                senha
            })
        }
    );

    const dados =
    await response.json();

    alert(
        dados.mensagem
    );

    window.location.href =
    "login.html";
}
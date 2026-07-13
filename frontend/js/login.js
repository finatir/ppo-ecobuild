async function login(){

    const email =
    document.getElementById(
        "email"
    ).value;

    const senha =
    document.getElementById(
        "senha"
    ).value;

    if(!email || !senha){

        alert(
            "Preencha todos os campos."
        );

        return;

    }

    try{

        const response =
        await fetch(
            "http://localhost:3000/auth/login",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({
                    email,
                    senha
                })
            }
        );

        const dados =
        await response.json();

        if(dados.token){

            localStorage.setItem(
                "token",
                dados.token
            );

            window.location.href =
            "dashboard.html";

        }else{

            alert(
                dados.erro ||
                "Falha no login."
            );

        }

    }catch{

        alert(
            "Erro ao conectar ao servidor."
        );

    }

}
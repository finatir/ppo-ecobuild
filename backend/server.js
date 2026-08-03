const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const projetosRoutes = require("./routes/projetos");
const calculosRoutes = require("./routes/calculos");

const app = express();


// ========================================
// CORS
// ========================================

app.use(
    cors({
        origin: true,
        credentials: true
    })
);


// ========================================
// MIDDLEWARES
// ========================================

app.use(express.json());

app.use(cookieParser());

app.use(
    session({

        secret: "SEGREDO_ECOBUILD",

        resave: false,

        saveUninitialized: false,

        cookie: {

            maxAge:
                1000 *
                60 *
                60 *
                24,

            httpOnly: true,

            sameSite: "lax"

        }

    })
);


// ========================================
// ROTAS
// ========================================

app.use(
    "/auth",
    authRoutes
);

app.use(
    "/projetos",
    projetosRoutes
);

app.use(
    "/calculos",
    calculosRoutes
);


// ========================================
// TESTE DA API
// ========================================

app.get(
    "/",
    (req, res) => {

        res.json({

            sistema:
                "EcoBuild API",

            status:
                "online"

        });

    }
);


// ========================================
// SERVIDOR
// ========================================

app.listen(
    3000,
    () => {

        console.log(
            "Servidor rodando na porta 3000"
        );

    }
);
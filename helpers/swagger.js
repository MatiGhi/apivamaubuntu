const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VAMA Video API Documentation",
      version: "1.0.0",
      description:
        "This is an application made with NodeJs (Express) and documented with Swagger",
      contact: {
        name: "Matías Ghiglione",
        url: "https://matighi.github.io/landing/",
        email: "ghiglioneme@gmail.com",
      },
    },
    schemas: {
      Client: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
        },
      },
      Socket: { type: "object" },
      Auth: { type: "object" },
    },
  },
  apis: [
    "./routes/auth.js",
    "./routes/admin_access.js",
    "./routes/client.js",
    "./routes/clientuser_noadmin.js",
    "./routes/clientuser.js",
    "./routes/socket.js",
    "./routes/streaming.js",
    "./routes/excel.js"
  ],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerDocs = (app, port) => {
  app.use("/api/v1/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `V1 Docs are available at http://localhost:${port}/api/v1/`
  );
};

module.exports = {
  swaggerDocs,
};

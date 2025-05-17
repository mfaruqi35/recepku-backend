import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recepku API Documentation",
      version: "1.0.0",
      description: "Dokumentasi API untuk Website Recepku",
    },
    servers: [
      {
        url: "https://recepku-backend.vercel.app",
      },
    ],
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // Pastikan path sesuai
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Gunakan "/docs"
};

export default swaggerDocs;

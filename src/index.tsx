import React from "react";
import ReactDOM from "react-dom/client";
import { createServer, Model } from "miragejs";
import { App } from "./App";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Desenvolvimento de Plataforma",
          type: "deposit",
          category: "Desenvolvimento",
          amount: 16000,
          createdAt: new Date("2022-05-11 12:45:00"),
        },
        {
          id: 2,
          title: "Impostos de Recebimento",
          type: "withdraw",
          category: "Impostos",
          amount: 960,
          createdAt: new Date("2022-05-15 13:45:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

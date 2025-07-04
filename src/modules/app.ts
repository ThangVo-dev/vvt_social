import { Route } from "core/interfaces";
import express from "express";
import mongoose from "mongoose";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.initializeRoutes(routes);
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private async connectToDatabase() {
    try {
      const connectionString =
        "mongodb+srv://vothang2511:B5m8RVyynzdATcgp@master.kymxnvn.mongodb.net/vvt_social?retryWrites=true&w=majority&appName=Master";

      await mongoose.connect(connectionString);
      console.log("Connected to the database successfully");
    } catch (error) {
      console.log("Connection to the database failed");
    }
  }
}

export default App;

require("dotenv").config();
import { Router, Request, Response, NextFunction } from "express";
import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

const router: Router = Router();

function requireAuth(req: Request, resp: Response, next: NextFunction) {
  // not implemented
  // console.warn("auth middleware not yet implemented");
  return next();
}

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Service endpoint for image processing
  app.get(
    "/filteredimage",
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const imageUrl: string = req.query.image_url;

      // validate image_url query parameter
      if (!imageUrl) {
        res
          .status(400)
          .send({ message: "image_url query parameter is required" });
      }

      let filteredImage: string;
      // filter image from url
      try {
        filteredImage = await filterImageFromURL(imageUrl);
      } catch (error) {
        return res.status(400).send({ message: "invalid image url" });
      }

      // send resulting file in response
      try {
        return res.status(200).sendFile(filteredImage, (err) => {
          if (!err) {
            // delete file after successful response
            deleteLocalFiles([filteredImage]);
          }
        });
      } catch (error) {
        return res.status(500).send({ message: "unable to send file" });
      }
    }
  );
  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();

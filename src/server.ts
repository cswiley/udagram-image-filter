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

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get(
    "/filteredimage",
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const imageUrl: string = req.query.image_url;

      // check image_url parameter exists
      if (!imageUrl) {
        res
          .status(400)
          .send({ message: "image_url query parameter is required" });
      }

      let savedImage: string;
      // check and filter image URL
      try {
        savedImage = await filterImageFromURL(imageUrl);
      } catch (error) {
        return res.status(400).send({ message: "invalid image url" });
      }

      // check send file
      try {
        return res.status(200).sendFile(savedImage, (err) => {
          if (!err) {
            deleteLocalFiles([savedImage]);
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

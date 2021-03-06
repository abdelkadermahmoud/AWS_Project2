import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

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
  //    1
  //    1. validate the image_url query
  app.get("/filteredimage",async (req: express.Request , res: express.Response )=>
  {
    const image_url: string = req.query.image_url;
    if(!image_url)
      {return res.status(402).send('You must enter a valid url image')}
      let filteredimagelink:  string =  await filterImageFromURL(image_url)
    if(!filteredimagelink)
      return  res.status(422).send("error while filtering image")
    else
    {
      console.log(filteredimagelink);
     // return  res.send(filteredimagelink);
      res.sendFile(filteredimagelink,{},() => deleteLocalFiles([filteredimagelink]))
    }
    

  
 
});
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
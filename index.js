const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
require("dotenv").config();

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(fileUpload());

const uri = process.env.DB_URL;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v2,
});

// Connect to MongoDB once when the server starts
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");

    // Define your routes here
    // get all features
    app.get("/all_features", async (req, res) => {
      try {
        const collection = client.db("wahidur").collection("features");
        const result = collection.find(
          {},
          {
            projection: {
              image: false,
            },
          }
        );
        const features = await result.toArray();
        res.send(features);
      } catch (error) {
        console.error("Error fetching features:", error);
        res.status(500).send("An error occurred while fetching features.");
      }
    });

    app.post("/gallery", async (req, res) => {
      try {
        const { title, description, postDate, postTime } = req.body;
        const hero_image = req.files.image.data;
        const encodedImage = hero_image.toString("base64");
        const imageBuffer = Buffer.from(encodedImage, "base64");

        const home_gallery = {
          title,
          description,
          postDateTime: { postDate, postTime },
          activity: true,
          image: imageBuffer,
        };

        const collection = client.db("DOER").collection("gallery_info");
        const result = await collection.insertOne(home_gallery);
        res.send(result);
      } catch (error) {
        console.error("Error inserting gallery item:", error);
        res
          .status(500)
          .send("An error occurred while inserting the gallery item.");
      }
    });

    // get all home gallery data
    app.get("/gallery", async (req, res) => {
      const collection = client.db("DOER").collection("gallery_info");
      const result = collection.find(
        { activity: true },
        {
          projection: {
            image: false,
          },
        }
      );
      const places = await result.toArray();
      res.send(places);
    });

    // get a gallery image
    app.get("/gallery/image/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const collection = client.db("DOER").collection("gallery_info");
        const result = await collection.findOne(
          { _id: new ObjectId(id) },
          {
            projection: {
              title: false,
              description: false,
              postDateTime: false,
            },
          }
        );
        res.send(result);
      } catch (error) {
        console.error("Error inserting gallery item:", error);
        res
          .status(500)
          .send("An error occurred while getting the gallery item.");
      }
    });

    // delete a gallery item
    app.delete("/gallery/:id", async (req, res) => {
      //delete an orders
      const id = req.params.id;
      const collection = client.db("DOER").collection("gallery_info");
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.put("/gallery/:id", async (req, res) => {
      const id = req.params.id;
      const { title, description } = req.body;
      const hero_image = req?.files?.image?.data;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: false };
      let updateData = {
        $set: {
          title: title,
          description: description,
          activity: true,
        },
      };
      if (hero_image) {
        const encodedImage = hero_image.toString("base64");
        const imageBuffer = Buffer.from(encodedImage, "base64");
        updateData = {
          $set: {
            title: title,
            description: description,
            image: imageBuffer,
            activity: true,
          },
        };
      }
      const collection = client.db("DOER").collection("gallery_info");
      const result = await collection.updateOne(filter, updateData, options);
      res.send(result);
    });

    app.get("/", (req, res) => {
      res.send("DOER SERVER IS RUNNING");
    });

    // Start the server
    app.listen(port, () => {
      console.log("Listening to port", port);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

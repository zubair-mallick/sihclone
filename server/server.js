// index.js or app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import careerRecommendationsRoutes from "./routes/careerRecommendations.routes.js";
import careerGuidanceRoutes from "./routes/careerGuidance.routes.js";
import treeDataRoutes from "./routes/treeData.routes.js";
import resourceRoutes from "./routes/resources.routes.js";
import CareerGuidanceResponseChatbotRoutes from "./routes/CareerGuidanceResponseChatbot.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/career-recommendations", careerRecommendationsRoutes);
app.use("/api/career-guidance", careerGuidanceRoutes);
app.use("/api/tree-data", treeDataRoutes);
app.use("/api/resource", resourceRoutes);
app.use("/api/counseling-chatbot", CareerGuidanceResponseChatbotRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

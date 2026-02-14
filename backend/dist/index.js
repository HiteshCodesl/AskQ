import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import answerRoute from "./routes/answerRoute.js";
import questionRoute from "./routes/questionRoute.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/answer', answerRoute);
app.use('/api/question', questionRoute);
app.listen(3000);
//# sourceMappingURL=index.js.map
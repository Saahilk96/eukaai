import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import stripeRoutes from "./modules/stripe/stripe.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import fullGuideRoutes from "./modules/fullGuide/fullGuide.routes.js";
import moduleRoutes from "./modules/module/module.routes.js";
import subModuleRoutes from "./modules/subModule/subModule.routes.js";
import subModuleContentRoutes from "./modules/subModuleContent/subModuleContent.routes.js";
import moduleSummaryRoutes from "./modules/moduleSummary/moduleSummary.routes.js";
import moduleQuestionRoutes from "./modules/moduleQuestion/moduleQuestion.routes.js";
import moduleQuestionContentRoutes from "./modules/moduleQuestionContent/moduleQuestionContent.routes.js";
import moduleSourcesRoutes from "./modules/moduleSources/moduleSources.routes.js";
import moduleNoteRoutes from "./modules/moduleNote/moduleNote.routes.js";
import quickGuideRoutes from "./modules/quickGuide/quickGuide.routes.js";
import quickGuideKeyFactRoutes from "./modules/quickGuideKeyFact/quickGuideKeyFact.routes.js";
import quickGuideProductFocusRoutes from "./modules/quickGuideProductFocus/quickGuideProductFocus.routes.js";
import quickGuideInterviewQuestionsByRoundRoutes from "./modules/quickGuideInterviewQuestionsByRound/quickGuideInterviewQuestionsByRound.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import environmentVariables from "./config/env.js";

const app = express();

app.use(cors({ origin: environmentVariables.corsOrigin, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/stripe", stripeRoutes);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/fullguide", fullGuideRoutes);
app.use("/api/module", moduleRoutes);
app.use("/api/submodule", subModuleRoutes);
app.use("/api/submodulecontent", subModuleContentRoutes);
app.use("/api/modulesummary", moduleSummaryRoutes);
app.use("/api/modulequestion", moduleQuestionRoutes);
app.use("/api/modulequestioncontent", moduleQuestionContentRoutes);
app.use("/api/modulesources", moduleSourcesRoutes);
app.use("/api/modulenote", moduleNoteRoutes);
app.use("/api/quickguide", quickGuideRoutes);
app.use("/api/quickguidekeyfact", quickGuideKeyFactRoutes);
app.use("/api/quickguideproductfocus", quickGuideProductFocusRoutes);
app.use(
  "/api/quickguideinterviewquestionsbyround",
  quickGuideInterviewQuestionsByRoundRoutes
);

app.use(errorHandler);

export default app;

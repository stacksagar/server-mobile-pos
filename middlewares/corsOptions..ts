import cors from "cors";
import allowedOrigins from "../config/allowedOrigins";

const corsOptions = cors({
  origin(requestOrigin, callback) {
    if (!requestOrigin || allowedOrigins.includes(requestOrigin as string)) {
      callback(null, requestOrigin);
    } else {
      callback(new Error("Access Denied by CORS!"));
    }
  },

  optionsSuccessStatus: 200,
});

export default corsOptions;

import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

sequelize
  .authenticate()
  .then(() => console.log(`DB Connected`))
  .catch((error) => console.log(`ERROR: ${error?.message}`));

async () => {
  await sequelize.sync();
};

export default sequelize;

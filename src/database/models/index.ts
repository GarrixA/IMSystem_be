import { Sequelize } from "sequelize";
import user_model from "./User";
import Role_model from "./Role";
import item_model from "./Items";
import category_model from "./Category";
import borrower_model from "./Borrowers";

const Models = (sequelize: Sequelize) => {
  const User = user_model(sequelize);
  const Role = Role_model(sequelize);
  const Items = item_model(sequelize);
  const Borrowers = borrower_model(sequelize);
  const Category = category_model(sequelize);
  return { User, Role, Category, Items, Borrowers };
};

export default Models;

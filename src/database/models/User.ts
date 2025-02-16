// User model
import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import {
  UserCreationAttributes,
  UserModelAttributes,
} from "../../types/models";
import database_models from "../config/db.config";

// interface UserAttributes {
// 	id?: string;
// 	firstName: string;
// 	lastName: string;
// 	userName: string;
// 	email: string;
// 	role?: string;
// 	password: string;
// 	confirmPassword: string;
// }

export class User extends Model<UserModelAttributes, UserCreationAttributes> {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phone_number!: string;
  public role!: string;
  public password!: string;
  public confirmPassword!: string;

  public static associate(models: {
    Items: typeof database_models.Items;
    Role: typeof database_models.Role;
  }) {
    this.hasOne(models.Items, {
      foreignKey: "artistId",
      as: "items",
    });
    this.belongsTo(models.Role, { as: "Role", foreignKey: "role" });
  }
}

const user_model = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone_number: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Roles",
          key: "id",
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      confirmPassword: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

export default user_model;

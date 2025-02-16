import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { Category } from "./Category";
import { Borrowers } from "./Borrowers";

interface ItemsAttributes {
  id?: string;
  name: string;
  title: string;
  description: string;
  images: string[];
  categoryId?: string;
  status?: string;
  condition?: string;
}

export class Items extends Model<ItemsAttributes> implements ItemsAttributes {
  public images!: string[];
  public id!: string;
  public categoryId!: string;
  public title!: string;
  public description!: string;
  public name!: string;
  public status!: string;
  public condition!: string;

  public static associate(models: {
    Category: typeof Category;
    Borrowers: typeof Borrowers;
  }) {
    Items.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });

    Items.hasOne(models.Borrowers, {
      foreignKey: "itemId",
      as: "borrower",
    });
  }
}

const item_model = (sequelize: Sequelize) => {
  Items.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      condition: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "Items",
    }
  );

  return Items;
};

export default item_model;

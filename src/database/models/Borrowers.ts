import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { Items } from "./Items";

interface BorrowerAttributes {
  id?: string;
  full_name: string;
  national_id: string;
  email: string;
  phone_number: string;
  residance_address: string;
  assurer_name: string;
  assurer_contact: string;
  itemId?: string;
}

export class Borrowers
  extends Model<BorrowerAttributes>
  implements BorrowerAttributes
{
  public id!: string;
  public full_name!: string;
  public national_id!: string;
  public email!: string;
  public phone_number!: string;
  public residance_address!: string;
  public assurer_name!: string;
  public assurer_contact!: string;
  public itemId!: string;

  public static associate(models: { Items: typeof Items }) {
    Borrowers.belongsTo(models.Items, {
      foreignKey: "itemId",
      as: "item",
    });
  }
}

const borrower_model = (sequelize: Sequelize) => {
  Borrowers.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      full_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      national_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone_number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      residance_address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      assurer_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      assurer_contact: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      itemId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Items",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "Borrowers",
    }
  );

  return Borrowers;
};

export default borrower_model;

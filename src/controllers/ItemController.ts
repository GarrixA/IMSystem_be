import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { sequelizeConnection } from "../database/config/db.config";
import Item_model from "../database/models/Items";
import { deleteCloudinaryFile, uploadMultiple } from "../helpers/upload";
import { Info } from "../types/upload";

export interface ExpandedRequest extends Request {
  user?: JwtPayload;
}
const Items = Item_model(sequelizeConnection);

const createItem = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    title,
    description,
    categoryId,
    condition,
    status,
    serial_number,
  } = req.body;
  const files = req.files as Express.Multer.File[];

  if (!name || !title || !description) {
    res.status(400).json({ message: "Required fields are missing!" });
  }

  const uploadedImages = await uploadMultiple(files, req);

  if ((req as Info<any>).info?.message) {
    res.status(400).json({ message: (req as Info<any>).info.message });
  }

  try {
    const item = await Items.create({
      name,
      title,
      description,
      condition,
      status,
      serial_number,
      images: uploadedImages.images,
      categoryId,
    });

    res.status(201).json({ message: `${item.name} is created`, item });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await Items.findByPk(id);
    if (!item) {
      res.status(404).json({ message: "Items not found!" });
      return;
    }

    for (const imageUrl of item.images) {
      await deleteCloudinaryFile(imageUrl);
    }

    await item.destroy();
    res.status(200).json({ message: `Item deleted successfully!` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    name,
    title,
    description,
    categoryId,
    condition,
    status,
    serial_number,
  } = req.body;

  try {
    const item = await Items.findByPk(id);
    if (!item) {
      res.status(404).json({ message: "Items not found!" });
      return;
    }

    let updatedImages = item.images;
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const uploadedImages = await uploadMultiple(
        req.files as Express.Multer.File[],
        req
      );
      if (uploadedImages.message) {
        res.status(400).json({ message: uploadedImages.message });
      }
      updatedImages = [...updatedImages, ...uploadedImages.images];
    }

    await item.update({
      name: name ?? item.name,
      title: title ?? item.title,
      description: description ?? item.description,
      images: updatedImages,
      categoryId: categoryId ?? item.categoryId,
      condition: condition ?? item.condition,
      status: status ?? item.status,
      serial_number: serial_number ?? item.serial_number,
    });

    res.status(200).json({ meaage: `${item.name} update` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getItemById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await Items.findByPk(id);
    if (!item) {
      res.status(404).json({ message: "Item not found!" });
    }
    res.status(200).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getAllItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Items.findAll();
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};

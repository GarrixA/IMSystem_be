import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { sequelizeConnection } from "../database/config/db.config";
import borrower_model from "../database/models/Borrowers";
import { Info } from "../types/upload";
import { Items } from "../database/models/Items";

export interface ExpandedRequest extends Request {
  user?: JwtPayload;
}
const Borrow = borrower_model(sequelizeConnection);

const create_borrow = async (
  req: ExpandedRequest,
  res: Response
): Promise<void> => {
  const {
    full_name,
    national_id,
    email,
    phone_number,
    residance_address,
    assurer_name,
    assurer_contact,
    itemId,
  } = req.body;

  const item = await Items.findByPk(itemId);
  if (!item) {
    res.status(400).json({ message: "Invalid itemId! Item does not exist." });
    return;
  }

  if (!full_name || !national_id || !email) {
    res.status(400).json({ message: "Required fields are missing!" });
    return;
  }

  const existingBorrow = await Borrow.findOne({
    where: {
      email: email,
      itemId: itemId,
    },
  });

  if (existingBorrow) {
    res
      .status(400)
      .json({ message: `${full_name} already borrowed this item.` });
    return;
  }

  if ((req as Info<any>).info?.message) {
    res.status(400).json({ message: (req as Info<any>).info.message });
    return;
  }

  try {
    const borrower = await Borrow.create({
      full_name,
      national_id,
      email,
      phone_number,
      residance_address,
      assurer_name,
      assurer_contact,
      itemId,
    });

    res.status(201).json(borrower);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const update_borrow = async (
  req: ExpandedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    full_name,
    national_id,
    email,
    phone_number,
    residance_address,
    assurer_name,
    assurer_contact,
    itemId,
  } = req.body;

  try {
    const borrower = await Borrow.findByPk(id);
    if (!borrower) {
      res.status(404).json({ message: "Borrow not found!" });
      return;
    }

    await borrower.update({
      full_name: full_name ?? borrower.full_name,
      national_id: national_id ?? borrower.national_id,
      email: email ?? borrower.email,
      phone_number: phone_number ?? borrower.phone_number,
      residance_address: residance_address ?? borrower.residance_address,
      assurer_name: assurer_name ?? borrower.assurer_name,
      assurer_contact: assurer_contact ?? borrower.assurer_contact,
      itemId: itemId ?? borrower.itemId,
    });

    res
      .status(200)
      .json({ message: `${borrower.full_name} has been borrowed`, borrower });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const get_all_borrows = async (req: Request, res: Response): Promise<void> => {
  try {
    const borrowers = await Borrow.findAll();
    res.status(200).json(borrowers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const get_single_borrow = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const borrower = await Borrow.findByPk(id);
    if (!borrower) {
      res.status(404).json({ message: "Borrow not found!" });
      return;
    }

    res.status(200).json(borrower);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  create_borrow,
  update_borrow,
  get_all_borrows,
  get_single_borrow,
};

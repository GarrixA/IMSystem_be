import basicInfo from "./basicInfo";
import { borrows } from "./borrower";
import { categories } from "./category";
import { items } from "./item";
import { roles } from "./role";
import { users } from "./user";

export default {
  ...basicInfo,
  paths: {
    ...users,
    ...roles,
    ...categories,
    ...items,
    ...borrows,
  },
};

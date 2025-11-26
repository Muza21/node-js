import { Router } from "express";
import ExpenseController from "./expense.controller";
import { roleMiddleware } from "../middleware/role.middelware";
import { validate } from "../middleware/validate.middelware";
import { expenseCreateSchema, expenseUpdateSchema } from "./expense.validation";
const router = Router();

router.get("/", ExpenseController.index);
router.get("/:id", ExpenseController.show);
router.post("/", validate(expenseCreateSchema), ExpenseController.store);
router.patch(
  "/:id",
  roleMiddleware,
  validate(expenseUpdateSchema),
  ExpenseController.update
);
router.delete("/:id", roleMiddleware, ExpenseController.destroy);

export default router;

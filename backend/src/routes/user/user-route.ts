import { Router } from "express";
import { getUserByToken } from "../../middlewares/getUser-middleware";
import { UserController } from "../../controllers/user-controller";

const router: Router = Router();

// list users with search
router.get("/users", [getUserByToken], UserController.list);

export default router;

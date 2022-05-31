import express from "express";
import { userDataCtrl } from "../controllers/userDataCtrl.js";
export const router = express.Router()


router.get('/users', userDataCtrl.users)
router.get('/rank', userDataCtrl.rank)
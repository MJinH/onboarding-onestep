import express, { request } from "express"
import { authorize, is_admin } from "../auth/auth.middleware.js"
import { Position } from "./position.model.js";
import { find_all_position } from "./position.service.js";
const router = express.Router()
router.post('/newposition', authorize, is_admin, async(req,res) => {
    const positionExist = await Position.findOne({id: req.body.id});
    console.log(positionExist)
    if (positionExist) return res.status(400).send({message: "position already exist"});
    const position = new Position({
      id: req.body.id,
      position: req.body.position,
      description: req.body.description,
      date: req.body.date,
      openPosition: req.body.openPosition ? "Yes" : "No"
    })
    try{
      const savedPosition = await position.save()
      return res.send({position: position.id})
    } catch(err){
        let d = {
            message: err
        }
        return res.status(400).send(d)
    }
})
router.get('/all_position', authorize, is_admin, async(req,res) => {
  let page = !req.query.page ? 1 : Number(req.query.page);
  let dpp = !req.query.dpp ? 20 : Number(req.query.dpp);
  try {
    const all_position = await find_all_position(page,dpp);
    res.send({all_position})
  } catch(err) {
    console.log(err)
    res.status(400).send(err.message)
  }
})
router.post('/deleteposition', authorize, is_admin, async(req,res) => {
  let page = !req.query.page ? 1 : Number(req.query.page);
  let dpp = !req.query.dpp ? 20 : Number(req.query.dpp);
  try {
    const id = req.body.id
    const result = await  Position.deleteOne({ id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    const all_position = await find_all_position(page,dpp);
    res.send({all_position})
  } catch(err) {
    console.log(err)
    res.status(400).send(err.message)
  }
})
export default router;
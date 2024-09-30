import {mongooseConnect} from "../../lib/mongoose";
import Store from "../../models/store";
export default async function handler(req, res) {
    const { method } = req;
    const { page = 1, limit = 10, search = '' } = req.query;
    await mongooseConnect();
   
    switch (method) {
      case 'GET':
        console.log(req.query)
        if(req.query?.title){
          const stores = await Store.findOne({title:req.query.title})
          res.status(200).json({ success: true, data: stores });
        }
        try {
          const stores = await Store.find({});
          res.status(200).json({ success: true, data: stores });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const stores = await Store.create(req.body);
          res.status(201).json({ success: true, data: stores });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;
      case 'PUT':
        try {
          console.log(req.body)
          const {title} = req.body;
          const stores = await Store.updateOne({ title },{ $set: req.body });
          res.status(201).json({ success: true, data: stores,message: "Data Updated successfully" });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false,message: "Something went wrong"});
          
        }
        break;
        
      case 'DELETE':
        if (req.query?.title) {
          await Store.deleteOne({title:req.query?.title});
          res.json(true);
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  }
  
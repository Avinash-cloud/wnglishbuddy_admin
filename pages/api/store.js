import {mongooseConnect} from "../../lib/mongoose";
import CryptoJS from 'crypto-js';
import Store from "../../models/store";

const SECRET_KEY = process.env.NEXTAUTH_SECRET ; 
export default async function handler(req, res) {
    const { method } = req;
    const { page = 1, limit = 10, search = '' } = req.query;
    await mongooseConnect();
   
    switch (method) {
      case 'GET':
        //console.log(req.query);
        try {
            let stores;

            // If title query exists, find a specific store
            if (req.query?.title) {
                stores = await Store.findOne({ title: req.query.title });
            } else {
                stores = await Store.find({}).sort({ _id: -1 });
            }

            // Encrypt the response data
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify({ success: true, data: stores }), SECRET_KEY).toString();

            res.status(200).json({ success: true, data: encryptedData });
        } catch (error) {
            console.error(error);
            res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const stores = await Store.create(req.body);
          res.status(201).json({ success: true, data: stores });
        } catch (error) {
          //console.log(error);
          res.status(400).json({ success: false });
        }
        break;
      case 'PUT':
        try {
          //console.log(req.body)
          const {title} = req.body;
          const stores = await Store.updateOne({ title },{ $set: req.body });
          res.status(201).json({ success: true, data: stores,message: "Data Updated successfully" });
        } catch (error) {
          //console.log(error);
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
  
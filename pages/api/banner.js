import {mongooseConnect} from "../../lib/mongoose";
import Banner from "../../models/banner";

import CryptoJS from 'crypto-js';
const SECRET_KEY = process.env.NEXTAUTH_SECRET ; 

export default async function handler(req, res) {
    const { method } = req;
    const { page = 1, limit = 10, search = '' } = req.query;
    await mongooseConnect();
  
    switch (method) {
      case 'GET':
        if(req.query?.title){
          const banners = await Banner.findOne({title:req.query.title})
          res.status(200).json({ success: true, data: banners });
        }
        try {
          const banners = await Banner.find({});
          const encryptedData = CryptoJS.AES.encrypt(JSON.stringify({ success: true, data: banners }), SECRET_KEY).toString();

          res.status(200).json({ success: true, data: encryptedData });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
            console.log(req.body)
          const banners = await Banner.create(req.body);
          res.status(201).json({ success: true, data: banners });
        } catch (error) {
          console.log(error);
          res.status(400).json({ success: false });
        }
        break;
      case 'PUT':
        try {
          //console.log(req.body)
          const {title} = req.body;
          const banners = await Banner.updateOne({ _id },{ $set: req.body });
          res.status(201).json({ success: true, data: banners,message: "Data Updated successfully" });
        } catch (error) {
          //console.log(error);
          res.status(400).json({ success: false,message: "Something went wrong"});
          
        }
        break;
        
      case 'DELETE':
        if (req.query?.id) {
          await Banner.deleteOne({_id:req.query?.id});
          res.json(true);
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  }
  
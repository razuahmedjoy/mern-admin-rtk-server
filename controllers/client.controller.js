import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        const productWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.findOne({productId:product._id});
                return {
                    ...product._doc,
                    stat
                }
            })
            
        )
        res.status(200).json(productWithStats);

    }catch(e){
        res.status(404).json({message:e.message});
    }
}

export const getCustomers = async (req,res)=>{

    try{
        const customers = await User.find({role:"user"}).select("-password");
        res.status(200).json(customers);

    }
    catch(e){
        res.status(404).json({message:e.message})
    }
}
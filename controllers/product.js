import productSchema from "../models/product.js";
import User from "../models/user.js";
import { v4 as uuid } from "uuid";
const getProduct = async (req, res) => {
  const idProduct = req.params.id;
  try {
    const data = await productSchema.find({ id: idProduct });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  // try {
  //   const data = await productSchema.find();
  //   res.status(200).json(data);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  
  const pageIndex = parseInt(req.query.pageIndex) || 1;
  const numberOfProductsPerPage = parseInt(req.query.numberOfProductsPerPage) || 10;
  const typeOfProduct = parseInt(req.query.typeOfProduct) || null;
  const sortBy = req.query.sortBy || 'created_at';
  const searchProductString = req.query.searchProductString || null;
  
  const skipIndex = (pageIndex - 1) * numberOfProductsPerPage;
  
  let query = {};
  if (typeOfProduct !== null) {
    query.category = typeOfProduct;
  }
  if (searchProductString !== null) {
    query.$or = [
      { name: { $regex: searchProductString, $options: 'i' } },
      { id: { $regex: searchProductString, $options: 'i' } }
    ];
  }
  
  const products = await productSchema.find(query)
    .sort(sortBy)
    .skip(skipIndex)
    .limit(numberOfProductsPerPage);
  
  res.json({ products });
};

const postProduct = async (req, res) => {
  const thumbnail =await ( req.file) ? req.file.path : null;
  const { id, username, fullname } = JSON.parse(req.body.user);
  const creator ={ id, username, fullname }

  const data = await new productSchema({
    id : uuid(),
    creator: creator,
    name: req.body.name,
    thumbnail,
    description: req.body.description,
    price: req.body.price,
    size: req.body.size,
    category: req.body.category,
  });

  try {
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const idProduct = req.params.id;
  try {
    await productSchema.findOneAndDelete({ id: idProduct });
    res.send("Delete successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateListLove = async (req, res) => {
  const string = req.params.id;
  const id = req.body.idUser;
  console.log(string);
  console.log(id);
  try {
    // Check if user with given ID exists
    const user = await User.findOne({ id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    // Check if string is already in love array
    const loveIndex = user.love.indexOf(string);
    if (loveIndex !== -1) {
      // String is already in love array, remove it
      user.love.splice(loveIndex, 1);
      await user.save();
      return res.json({
        message: `Removed ${string} from love list of user ${id}`,
      });
    } else {
      // String is not in love array, add it
      user.love.push(string);
      await user.save();
      return res.json({
        message: `Added ${string} to love list of user ${id}`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePurchase = async (req, res)=>{
  const  { purchasedItem }  = req.params;
  const  { idUser }= req.body;

  try {
    const user = await User.findById(idUser);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.purchased.push(purchasedItem);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
export { getProduct, getProducts, postProduct, deleteProduct, updateListLove, updatePurchase };


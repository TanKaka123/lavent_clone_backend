import productSchema from "../models/product.js";

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
  try {
    const data = await productSchema.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postProduct = async (req, res) => {
  const thumbnail =await ( req.file) ? req.file.path : null;
  const { id, username, fullname } = JSON.parse(req.body.user);
  const creator ={ id, username, fullname }

  const data = await new productSchema({
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

export { getProduct, getProducts, postProduct, deleteProduct };

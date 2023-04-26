import postSchema from "../models/post.js";

const getPost = async (req, res) => {
  try {
    const data = await postSchema.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 const getPosts = async (req, res) => {
  const idPost = req.params.id;
  try {
    const data = await postSchema.find({ id: idPost });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postPost = async (req, res) => {
  const fileData = req.file

  const { id, username, fullname } = JSON.parse(req.body.user);
  const creator ={ id, username, fullname }

  const data = new postSchema({
    creator: creator,
    title: req.body.title,
    thumbnail:fileData.path,
    content: req.body.content,
  });

  try {
    const dataSave = await data.save();
   res.status(200).json(dataSave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const idPost = req.params.id;
  try {
    await postSchema.findOneAndDelete({ id: idPost });
    res.send("Delete successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPost, getPosts, postPost, deletePost };

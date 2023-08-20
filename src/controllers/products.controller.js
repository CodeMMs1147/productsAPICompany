import Product from '../models/products';

export const createProduct = async (req, res) => {
  const {
    name,
    category,
    price,
    imgUrl,
  } = req.body;

  const newProduct = new Product({
    name,
    category,
    price,
    imgUrl,
  });

  // Obtengo el producto el producto guardado
  const productSaved = await newProduct.save();

  res.status(201).json(productSaved);
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res.status(200).json(product);
};
export const updateProductById = async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
  });

  res.status(204).json(updateProduct);
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  // Si se trata de remover no se va a devolver nada como respuesta
  await Product.findByIdAndDelete(productId);

  res.status(204).json();
};

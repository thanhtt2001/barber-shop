import { products as defaultProducts } from "@/modules/public/products/data/products.data";

const LOCAL_STORAGE_KEY = "barberpro_admin_products";

// Initialize data from public products if localStorage is empty
const getStoredProducts = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultProducts;
  }
};

const saveProducts = (products) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
};

export async function fetchAdminProducts() {
  await new Promise((r) => setTimeout(r, 400));
  return getStoredProducts();
}

export async function createAdminProduct(productData) {
  await new Promise((r) => setTimeout(r, 500));
  const productsList = getStoredProducts();

  const newProduct = {
    ...productData,
    id: productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    price: Number(productData.price),
    inStock: !!productData.inStock,
    rating: 5.0, // Default for new products
  };

  // Avoid duplicate ID
  if (productsList.some((p) => p.id === newProduct.id)) {
    newProduct.id = `${newProduct.id}-${Date.now()}`;
  }

  productsList.push(newProduct);
  saveProducts(productsList);
  return newProduct;
}

export async function updateAdminProduct(id, productData) {
  await new Promise((r) => setTimeout(r, 500));
  const productsList = getStoredProducts();
  const index = productsList.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error("Không tìm thấy sản phẩm");
  }

  const updatedProduct = {
    ...productsList[index],
    ...productData,
    price: Number(productData.price),
    inStock: !!productData.inStock,
  };

  productsList[index] = updatedProduct;
  saveProducts(productsList);
  return updatedProduct;
}

export async function deleteAdminProduct(id) {
  await new Promise((r) => setTimeout(r, 400));
  const productsList = getStoredProducts();
  const filtered = productsList.filter((p) => p.id !== id);
  saveProducts(filtered);
  return { success: true };
}

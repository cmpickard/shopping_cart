import type { CartProduct, Product } from "../types";

function findProductIdx(collection: Array<CartProduct | Product>,
                        product: Product | CartProduct) {
  return collection.findIndex(prod => prod._id === product._id);
}

export default findProductIdx;
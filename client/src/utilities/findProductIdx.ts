import type { CartProduct, Product } from "../types";

function findProductIdx(collection: Array<CartProduct | Product>,
                        product: Product | CartProduct) {
  return collection.findIndex(prod => prod.id === product.id);
}

export default findProductIdx;
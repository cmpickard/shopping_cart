import { z } from 'zod';

export const BasicProductSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number()
});

export const ProductSchema = BasicProductSchema.extend({
  quantity: z.number()
});

export const EditedProductSchema = ProductSchema.omit({
  '_id': true
})

export const NewProductSchema = EditedProductSchema.extend({
  quantity: z.number()
});

export const CartProductSchema = BasicProductSchema.extend({
  quantityInCart: z.number()
});

export const CartSchema = z.array(CartProductSchema)

export const ProductListSchema = z.array(ProductSchema);

export type BasicProduct = z.infer<typeof BasicProductSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type EditedProduct = z.infer<typeof EditedProductSchema>;
export type NewProduct = z.infer<typeof NewProductSchema>;
export type CartProduct = z.infer<typeof CartProductSchema>;
export type Cart = z.infer<typeof CartSchema>;


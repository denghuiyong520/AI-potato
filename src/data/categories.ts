export interface Subcategory {
  value: string   // URL slug, e.g. "oversized-t-shirt"
  label: string   // Display name
}

export interface Category {
  value: string
  label: string
  subcategories?: Subcategory[]
}

export const CATEGORY_TREE: Category[] = [
  {
    value: 't-shirts',
    label: 'T-Shirts',
    subcategories: [
      { value: 'long-sleeve',       label: 'Long Sleeve'       },
      { value: 'basic-fit-t-shirt', label: 'Basic Fit T-Shirt' },
      { value: 'oversized-t-shirt', label: 'Oversized T-Shirt' },
      { value: 'vintage-t-shirt',   label: 'Vintage T-Shirt'   },
      { value: 'vest',              label: 'Vest'              },
      { value: 'polo',              label: 'Polo'              },
    ],
  },
  {
    value: 'hoodies',
    label: 'Hoodies',
    subcategories: [
      { value: 'fleece-hoodie',  label: 'Fleece Hoodie'  },
      { value: 'terry-hoodie',   label: 'Terry Hoodie'   },
      { value: 'sweatshirt',     label: 'Sweatshirt'     },
      { value: 'zip-up-hoodie',  label: 'Zip Up Hoodie'  },
    ],
  },
  {
    value: 'sweater',
    label: 'Sweater',
  },
  {
    value: 'sweatpants',
    label: 'Pants',
    subcategories: [
      { value: 'shorts', label: 'Shorts' },
    ],
  },
  {
    value: 'denim',
    label: 'Denim',
  },
  {
    value: 'y2k-fashion',
    label: 'Y2K Fashion',
  },
  {
    value: 'kids-wear',
    label: 'Kids Wear',
  },
  {
    value: 'outdoor',
    label: 'Outdoor Clothing',
  },
  {
    value: 'jersey',
    label: 'Jersey',
  },
  {
    value: 'accessories',
    label: 'Accessories',
  },
  {
    value: 'dresses',
    label: 'Dresses',
  },
  {
    value: 'swimwear',
    label: 'Swimwear',
  },
  {
    value: 'sleepwear',
    label: 'Sleepwear',
  },
]

/** Flat map: subcategory value → parent category value */
export const SUB_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  CATEGORY_TREE.flatMap((cat) =>
    (cat.subcategories ?? []).map((sub) => [sub.value, cat.value])
  )
)

import * as yup from 'yup'

export const validationSchema = yup.object({
    name: yup.string().required("Product Name is required"),
    brand: yup.string().required("Product Brand is required"),
    type: yup.string().required("Product Type is required"),
    price: yup.number().typeError("Price must be a number").required('Product Price is required').moreThan(100, "Price cannot be less than 100"),
    qtyInStock: yup.number().typeError("Quantity In Stock must be a number").required('Quantity In Stock is required').min(0, "Quantity In Stock cannot be less than 0"),
    description: yup.string().required("Product Description is required"),
    image: yup.mixed().when('imageUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Product Image is required')
    })
})

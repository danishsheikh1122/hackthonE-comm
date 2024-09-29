import * as Yup from "yup";

const phoneRegex = /^(\+91|\+91\-|0)?[7896]\d{9}$/;

export const MerchantEditProdcutSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  MRP: Yup.number()
    .typeError("MRP must be a number")
    .positive("MRP must be a positive number")
    .required("MRP is required"),
  condition: Yup.string().required("Condition is required"),
  gender: Yup.string().when("category", {
    is: (value) => value === "Footwear" || value === "Clothing",
    then: () => Yup.string().required("Gender is Required"),
    otherwise: Yup.string().notRequired(),
  }),
  subCategory: Yup.string().when("gender", {
    is: (gender) => !gender,
    then: () => Yup.string().required("Select Gender First"),
    otherwise: () => Yup.string().required("Sub Catrgory is Required"),
  }),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required"),
  productName: Yup.string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters long")
    .max(100, "Product name must be at most 100 characters long"),
  desc: Yup.string()
    .max(500, "Description must be at most 500 characters long")
    .min(10, "Description must be at lease 10 characters long")
    .required("Description is Required"),
  colors: Yup.array()
    .of(Yup.string().required("Color is required"))
    .min(1, "At least one color is required"),

  images: Yup.array().when("prevImages", {
    is: (value) => !value || value.length === 0,
    then: () =>
      Yup.array()
        .of(
          Yup.mixed().test(
            "is-string-or-file",
            "Item must be a string or a file",
            (value) => typeof value === "string" || value instanceof File
          )
        )
        .min(1, "At least one image is required"),
    otherwise: () =>
      Yup.array().of(
        Yup.mixed().test(
          "is-string-or-file",
          "Item must be a string or a file",
          (value) => typeof value === "string" || value instanceof File
        )
      ),
  }),
});

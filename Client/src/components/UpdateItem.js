import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdateItem = ({ product, onUpdateItem }) => {
  const formik = useFormik({
    initialValues: {
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      image: product.image,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
      price: Yup.number().required("Required").positive(),
      quantity: Yup.number().required("Required").positive(),
      description: Yup.string().required("Required"),
      image: Yup.string().url("Must be a valid URL").required("Required"),
    }),
    onSubmit: (values) => {
      fetch(`http://127.0.0.1:5555/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          onUpdateItem(data);
        });
    },
  });

  return (
    <form className="update-form"onSubmit={formik.handleSubmit}>
      <h2>Update Item</h2>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name && <div>{formik.errors.name}</div>}

      <label htmlFor="category">Category</label>
      <input
        type="text"
        name="category"
        onChange={formik.handleChange}
        value={formik.values.category}
      />
      {formik.errors.category && <div>{formik.errors.category}</div>}

      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        onChange={formik.handleChange}
        value={formik.values.price}
      />
      {formik.errors.price && <div>{formik.errors.price}</div>}

      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        name="quantity"
        onChange={formik.handleChange}
        value={formik.values.quantity}
      />
      {formik.errors.quantity && <div>{formik.errors.quantity}</div>}

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      {formik.errors.description && <div>{formik.errors.description}</div>}

      <label htmlFor="image">Image URL</label>
      <input
        type="text"
        name="image"
        onChange={formik.handleChange}
        value={formik.values.image}
      />
      {formik.errors.image && <div>{formik.errors.image}</div>}

      <button type="submit">Update Item</button>
    </form>
  );
};

export default UpdateItem;

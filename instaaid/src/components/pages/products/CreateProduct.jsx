import React, { useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      if (photo) productData.append("photo", photo);

      const { data } = await axios.post("/api/v1/product/create", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${user?.token}`,
        },
      });

      if (data?.success) {
        toast.success("Product Created Successfully");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="w-full border p-2 rounded"
            required
          />

          {/* Shipping Dropdown */}
          <select
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value={false}>No Shipping</option>
            <option value={true}>Shipping Available</option>
          </select>

          {/* Photo Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full border p-2 rounded"
          />

          {photo && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(photo)}
                alt="preview"
                className="h-40 object-cover rounded"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateProduct;

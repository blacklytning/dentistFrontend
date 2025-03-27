"use client"

import { useState, useEffect } from "react"
import Modal from "../Modal"

const AddEditItemModal = ({ isOpen, onClose, onSubmit, categories, item }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    currentStock: 0,
    minimumStock: 0,
    unit: "piece",
    price: 0,
    supplier: "",
    description: "",
  })

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        category: item.category,
        currentStock: item.currentStock,
        minimumStock: item.minimumStock,
        unit: item.unit,
        price: item.price,
        supplier: item.supplier,
        description: item.description,
        lastRestocked: item.lastRestocked,
      })
    }
  }, [item])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "currentStock" || name === "minimumStock" || name === "price" ? Number(value) : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item ? "Edit Inventory Item" : "Add New Inventory Item"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[var(--lightgreen)] focus:border-[var(--lightgreen)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[var(--lightgreen)] focus:border-[var(--lightgreen)]"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Stock</label>
            <input
              type="number"
              name="currentStock"
              value={formData.currentStock}
              onChange={handleChange}
              min="0"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[var(--lightgreen)] focus:border-[var(--lightgreen)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Stock</label>
            <input
              type="number"
              name="minimumStock"
              value={formData.minimumStock}
              onChange={handleChange}
              min="0"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[var(--lightgreen)] focus:border-[var(--lightgreen)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[var(--lightgreen)] focus:border-[var(--lightgreen)]"
            >
              <option value="piece">Piece</option>
              <option value="box">Box</option>
              <option value="pack">Pack</option>
              <option value="kit">Kit</option>
              <option value="bottle">Bottle</option>
              <option value="tube">Tube</option>
              <option value="strip">Strip</option>
              <option value="pad">Pad</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[var(--lightgreen)] focus:border-[var(--lightgreen)]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[var(--lightgreen)] focus:border-[var(--lightgreen)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[var(--lightgreen)] focus:border-[var(--lightgreen)]"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--darkgreen)] text-white rounded-md hover:bg-[var(--darkergreen)]"
          >
            {item ? "Update Item" : "Add Item"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditItemModal


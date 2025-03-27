"use client"

import { useState } from "react"
import Modal from "../Modal"
import { toast } from "react-toastify"

const CategoryManagementModal = ({ isOpen, onClose, categories, onAddCategory, setCategories }) => {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [editingCategory, setEditingCategory] = useState(null)

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast.error("Category name is required")
      return
    }

    // Check if category name already exists
    if (categories.some((cat) => cat.name.toLowerCase() === newCategory.name.toLowerCase())) {
      toast.error("A category with this name already exists")
      return
    }

    onAddCategory(newCategory)
    setNewCategory({ name: "", description: "" })
  }

  const handleEditCategory = () => {
    if (!editingCategory.name) {
      toast.error("Category name is required")
      return
    }

    // Check if category name already exists (excluding the current category)
    if (
      categories.some(
        (cat) => cat.id !== editingCategory.id && cat.name.toLowerCase() === editingCategory.name.toLowerCase(),
      )
    ) {
      toast.error("A category with this name already exists")
      return
    }

    const updatedCategories = categories.map((cat) => (cat.id === editingCategory.id ? editingCategory : cat))

    setCategories(updatedCategories)
    toast.success("Category updated successfully")
    setEditingCategory(null)
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = categories.filter((cat) => cat.id !== id)
      setCategories(updatedCategories)
      toast.success("Category deleted successfully")
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Categories">
      <div className="space-y-6">
        {/* Add/Edit Category Form */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-3">{editingCategory ? "Edit Category" : "Add New Category"}</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editingCategory ? editingCategory.name : newCategory.name}
                onChange={(e) =>
                  editingCategory
                    ? setEditingCategory({ ...editingCategory, name: e.target.value })
                    : setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[var(--lightgreen)] focus:border-[var(--lightgreen)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={editingCategory ? editingCategory.description : newCategory.description}
                onChange={(e) =>
                  editingCategory
                    ? setEditingCategory({ ...editingCategory, description: e.target.value })
                    : setNewCategory({ ...newCategory, description: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-[var(--lightgreen)] focus:border-[var(--lightgreen)]"
                rows="3"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              {editingCategory && (
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={editingCategory ? handleEditCategory : handleAddCategory}
                className="px-3 py-1 bg-[var(--darkgreen)] text-white rounded-md hover:bg-[var(--darkergreen)]"
              >
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div>
          <h3 className="text-lg font-medium mb-3">Existing Categories</h3>
          {categories.length === 0 ? (
            <p className="text-gray-500">No categories yet. Add some above.</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="flex justify-between items-center p-3 bg-white border rounded-md">
                  <div>
                    <h4 className="font-medium">{category.name}</h4>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => setEditingCategory(category)} className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default CategoryManagementModal


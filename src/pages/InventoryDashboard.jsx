"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Search, Plus, AlertTriangle, Filter, ArrowUpDown } from "lucide-react"
import AddEditItemModal from "../components/inventory/AddEditItemModal"
import CategoryManagementModal from "../components/inventory/CategoryManagementModal"
import StockAlertBanner from "../components/inventory/StockAlertBanner"

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([])
  const [filteredInventory, setFilteredInventory] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [lowStockItems, setLowStockItems] = useState([])

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCategories = [
        { id: 1, name: "Instruments", description: "Dental tools and instruments" },
        { id: 2, name: "Consumables", description: "Items that are used up during procedures" },
        { id: 3, name: "Medicines", description: "Medications and pharmaceuticals" },
        { id: 4, name: "Office Supplies", description: "General office supplies" },
      ]

      const mockInventory = [
        {
          id: 1,
          name: "Dental Explorer",
          category: "Instruments",
          currentStock: 15,
          minimumStock: 5,
          unit: "piece",
          price: 450,
          supplier: "Dental Depot",
          lastRestocked: "2023-05-15",
          description: "Standard dental explorer for examination",
        },
        {
          id: 2,
          name: "Latex Gloves (S)",
          category: "Consumables",
          currentStock: 3,
          minimumStock: 10,
          unit: "box",
          price: 350,
          supplier: "MedSupply",
          lastRestocked: "2023-06-01",
          description: "Small sized latex examination gloves, 100/box",
        },
        {
          id: 3,
          name: "Amoxicillin 500mg",
          category: "Medicines",
          currentStock: 45,
          minimumStock: 20,
          unit: "strip",
          price: 120,
          supplier: "PharmaCare",
          lastRestocked: "2023-05-20",
          description: "Antibiotic medication, 10 tablets/strip",
        },
        {
          id: 4,
          name: "Cotton Rolls",
          category: "Consumables",
          currentStock: 8,
          minimumStock: 15,
          unit: "pack",
          price: 85,
          supplier: "DentalSupplies",
          lastRestocked: "2023-05-10",
          description: "Absorbent cotton rolls, 100/pack",
        },
        {
          id: 5,
          name: "Dental Impression Material",
          category: "Consumables",
          currentStock: 4,
          minimumStock: 5,
          unit: "kit",
          price: 1200,
          supplier: "Dental Depot",
          lastRestocked: "2023-04-28",
          description: "Alginate impression material kit",
        },
        {
          id: 6,
          name: "Prescription Pads",
          category: "Office Supplies",
          currentStock: 12,
          minimumStock: 5,
          unit: "pad",
          price: 150,
          supplier: "Office Store",
          lastRestocked: "2023-05-05",
          description: "Custom prescription pads, 50 sheets/pad",
        },
      ]

      setCategories(mockCategories)
      setInventory(mockInventory)
      setFilteredInventory(mockInventory)

      // Find low stock items
      const lowStock = mockInventory.filter((item) => item.currentStock <= item.minimumStock)
      setLowStockItems(lowStock)

      setLoading(false)
    }, 1000)
  }, [])

  // Filter and sort inventory
  useEffect(() => {
    let result = [...inventory]

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter((item) => item.category === selectedCategory)
    }

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseSearch) ||
          item.description.toLowerCase().includes(lowerCaseSearch) ||
          item.supplier.toLowerCase().includes(lowerCaseSearch),
      )
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredInventory(result)
  }, [inventory, searchTerm, selectedCategory, sortConfig])

  const handleSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const handleAddItem = (newItem) => {
    // In a real app, you would make an API call here
    const itemWithId = {
      ...newItem,
      id: inventory.length + 1,
      lastRestocked: new Date().toISOString().split("T")[0],
    }

    setInventory([...inventory, itemWithId])
    toast.success("Item added successfully!")
    setIsAddModalOpen(false)
  }

  const handleEditItem = (updatedItem) => {
    // In a real app, you would make an API call here
    const updatedInventory = inventory.map((item) => (item.id === updatedItem.id ? updatedItem : item))

    setInventory(updatedInventory)
    toast.success("Item updated successfully!")
    setEditingItem(null)
  }

  const handleDeleteItem = (id) => {
    // In a real app, you would make an API call here
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedInventory = inventory.filter((item) => item.id !== id)
      setInventory(updatedInventory)
      toast.success("Item deleted successfully!")
    }
  }

  const handleAddCategory = (newCategory) => {
    // In a real app, you would make an API call here
    const categoryWithId = {
      ...newCategory,
      id: categories.length + 1,
    }

    setCategories([...categories, categoryWithId])
    toast.success("Category added successfully!")
  }

  const openEditModal = (item) => {
    setEditingItem(item)
  }

  const handleStockUpdate = (id, newStock) => {
    // In a real app, you would make an API call here
    const updatedInventory = inventory.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          currentStock: newStock,
          lastRestocked: new Date().toISOString().split("T")[0],
        }
      }
      return item
    })

    setInventory(updatedInventory)
    toast.success("Stock updated successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--txt)]">Inventory Management</h1>
          <Link
            to="/doctordashboard"
            className="bg-[var(--darkgreen)] text-white px-4 py-2 rounded hover:bg-[var(--darkergreen)]"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Stock Alert Banner */}
        {lowStockItems.length > 0 && <StockAlertBanner items={lowStockItems} />}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-[var(--darkgreen)] text-white px-4 py-2 rounded-md hover:bg-[var(--darkergreen)]"
          >
            <Plus size={18} />
            Add New Item
          </button>
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center gap-2 bg-[var(--darkgreen)] text-white px-4 py-2 rounded-md hover:bg-[var(--darkergreen)]"
          >
            <Filter size={18} />
            Manage Categories
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
              />
            </div>
            <div className="w-full md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--lightgreen)]"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--darkgreen)]"></div>
            </div>
          ) : filteredInventory.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No inventory items found. Add some items to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[var(--darkgreen)] text-white">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Name
                        {sortConfig.key === "name" && <ArrowUpDown size={16} className="ml-1" />}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("category")}
                    >
                      <div className="flex items-center">
                        Category
                        {sortConfig.key === "category" && <ArrowUpDown size={16} className="ml-1" />}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("currentStock")}
                    >
                      <div className="flex items-center">
                        Stock
                        {sortConfig.key === "currentStock" && <ArrowUpDown size={16} className="ml-1" />}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("price")}
                    >
                      <div className="flex items-center">
                        Price
                        {sortConfig.key === "price" && <ArrowUpDown size={16} className="ml-1" />}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("supplier")}
                    >
                      <div className="flex items-center">
                        Supplier
                        {sortConfig.key === "supplier" && <ArrowUpDown size={16} className="ml-1" />}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("lastRestocked")}
                    >
                      <div className="flex items-center">
                        Last Restocked
                        {sortConfig.key === "lastRestocked" && <ArrowUpDown size={16} className="ml-1" />}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className={item.currentStock <= item.minimumStock ? "bg-red-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                            {item.currentStock <= item.minimumStock && (
                              <AlertTriangle size={16} className="inline ml-2 text-red-500" />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`text-sm ${
                              item.currentStock <= item.minimumStock ? "text-red-600 font-semibold" : "text-gray-900"
                            }`}
                          >
                            {item.currentStock} {item.unit}s
                          </span>
                          <div className="ml-2 flex space-x-1">
                            <button
                              onClick={() => handleStockUpdate(item.id, item.currentStock + 1)}
                              className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 text-xs"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleStockUpdate(item.id, Math.max(0, item.currentStock - 1))}
                              className="bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1 text-xs"
                            >
                              -
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">Min: {item.minimumStock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{item.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.supplier}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.lastRestocked}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Edit
                        </button>
                        <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {(isAddModalOpen || editingItem) && (
        <AddEditItemModal
          isOpen={isAddModalOpen || !!editingItem}
          onClose={() => {
            setIsAddModalOpen(false)
            setEditingItem(null)
          }}
          onSubmit={editingItem ? handleEditItem : handleAddItem}
          categories={categories}
          item={editingItem}
        />
      )}

      {/* Category Management Modal */}
      {isCategoryModalOpen && (
        <CategoryManagementModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          categories={categories}
          onAddCategory={handleAddCategory}
          setCategories={setCategories}
        />
      )}
    </div>
  )
}

export default InventoryDashboard


"use client"

import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"

const StockAlertBanner = ({ items }) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible || items.length === 0) {
    return null
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Low Stock Alert ({items.length} {items.length === 1 ? "item" : "items"})
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {items.slice(0, 3).map((item) => (
                <li key={item.id}>
                  {item.name}: {item.currentStock} {item.unit}s left (minimum: {item.minimumStock})
                </li>
              ))}
              {items.length > 3 && (
                <li>
                  ...and {items.length - 3} more {items.length - 3 === 1 ? "item" : "items"}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={() => setIsVisible(false)}
              className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none"
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockAlertBanner


import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { type Product } from '@/types'
import toast from 'react-hot-toast'

interface CartStore {
  items: Product[]
  addItem: (data: Product) => void
  removeItem: (id: string) => void
  removeAll: () => void
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      const currentItems = get().items
      const existingItems = currentItems.find((item) => item.id === data.id)

      if (existingItems) {
        return toast('El producto ya está en el carrito')
      }

      set({ items: [...get().items, data] })
      toast.success('Producto agregado al carrito')
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] })
      toast.success('Producto eliminado correctamente')
    },
    removeAll: () => set({ items: [] })
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  })
)

export default useCart
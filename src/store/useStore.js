import { create } from "zustand";

export const useStore = create((set, get) => ({
  // User state
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),

  // Properties state
  properties: [],
  propertiesLoading: false,
  setProperties: (properties) => set({ properties }),
  setPropertiesLoading: (loading) => set({ propertiesLoading: loading }),

  // Current property state
  currentProperty: null,
  currentPropertyBookings: [],
  propertyLoading: false,
  setCurrentProperty: (property) => set({ currentProperty: property }),
  setCurrentPropertyBookings: (bookings) => set({ currentPropertyBookings: bookings }),
  setPropertyLoading: (loading) => set({ propertyLoading: loading }),

  // Notifications
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { 
      id: Date.now(), 
      timestamp: new Date(),
      ...notification 
    }]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),

  // UI state
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
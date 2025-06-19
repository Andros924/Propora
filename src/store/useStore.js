import create from "zustand";

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  properties: [],
  setProperties: (properties) => set({ properties }),

  // aggiungi altre azioni / stato qui
}));

import { create } from 'zustand'

export const useStore = create((set) => ({
  submit: (data: any) => console.log(data)

//   increasePopulation: () => set((state:any) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),

}))
import { create } from 'zustand'

interface CounterStore {
  count: number
  services: any[]
  uploading: boolean
  show: boolean
  inc: (num: number) => void
  setServices: (services: any) => void
  setUploading: (uploading: boolean) => void
  setShow: (show: boolean) => void
}

export const counterStore = create<CounterStore>((set) => ({
  count: 0,
  services: [],
  uploading: false,
  show: false,
  inc: (num: number) => set((state:any) => ({ count: num })),
  setServices: (services: any) => set((state:any) => ({ services: services })),
  setUploading: (uploading: boolean) => set((state:any) => ({ uploading: uploading })),
  setShow: (show: boolean) => set((state:any) => ({ show: show })),
}))

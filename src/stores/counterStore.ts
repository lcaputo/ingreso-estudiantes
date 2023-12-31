import { create } from 'zustand'

export const counterStore = create((set) => ({
  count: 0,
  services: [],
  uploading: false,
  show: false,
  inc: (num: number) => set((state:any) => ({ count: num })),
  setServices: (services: any) => set((state:any) => ({ services: services })),
  setUploading: (uploading: boolean) => set((state:any) => ({ uploading: uploading })),
  setShow: (show: boolean) => set((state:any) => ({ show: show })),
}))

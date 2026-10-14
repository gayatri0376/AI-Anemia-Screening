import {createContext,useContext,useState} from 'react'
import {doctors,appointments} from '../data/mock'
const C=createContext()
export const useApp=()=>useContext(C)
export function AppProvider({children}){
  const [role,setRole]=useState(localStorage.getItem('role'))
  const [toast,setToast]=useState('')
  const [appts,setAppts]=useState(appointments)
  const [docs,setDocs]=useState(doctors)
  const notify=m=>{setToast(m);setTimeout(()=>setToast(''),2500)}
  const login=r=>{localStorage.setItem('role',r);setRole(r)}
  const logout=()=>{localStorage.removeItem('role');setRole(null)}
  return <C.Provider value={{role,login,logout,notify,appts,setAppts,docs,setDocs}}>{children}{toast&&<div className="toast">{toast}</div>}</C.Provider>
}

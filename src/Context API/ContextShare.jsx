import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
export const pinAuthentication = createContext()
export const reservationtableId = createContext()
export const cartCountContext = createContext()


function ContextShare({children}) {
    const [isAuthorized,setIsAuthorized] = useState(false)
    const [tableId,setTableId] = useState(null)
    const [cartCount,setCartCount] = useState("0")
    useEffect(() => {
        if(sessionStorage.getItem("verifiedPin")){
            setIsAuthorized(true)
        }else{
            setIsAuthorized(false)
        }
    },[])
  return (
    <>
    <cartCountContext.Provider value={{cartCount,setCartCount}}>
    <pinAuthentication.Provider value={{isAuthorized,setIsAuthorized}}>
        <reservationtableId.Provider value={{tableId,setTableId}}>
        {children}
        </reservationtableId.Provider>
    </pinAuthentication.Provider>
    </cartCountContext.Provider>
    </>
  )
}

export default ContextShare
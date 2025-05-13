// eslint-disable-next-line no-unused-vars
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
    const [data,setData] = useState({
        lang:"br",
    });
    
    // Use effect serve para salvar a última linguagem na máquina, mas está dando erros
    // useEffect(()=>{
    //     const language = localStorage.getItem('LANGUAGE');
    //     if (language == undefined) setData({...data, data:"br"});
    //     if (language !== null) setData({...data, data:JSON.parse(language)}); 
    // },[])
        
    // useEffect(() => {
    //     localStorage.setItem('LANGUAGE', JSON.stringify(data.lang))
    // },[data.lang])
         
    return(
        <LanguageContext.Provider value={{data,setData}}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguageContext = () => useContext(LanguageContext);
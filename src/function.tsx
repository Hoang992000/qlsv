import { Data } from "./component/AddForm"

export const setdata=(value: Data[])=>{
  const jsonData = JSON.stringify(value)
    localStorage.setItem('ttsv', jsonData)
}

export const getdata=()=>{
    const dataString  = localStorage.getItem('ttsv');
    if (dataString) {
        return JSON.parse(dataString);
    }
    else{
      return []
    }
  }
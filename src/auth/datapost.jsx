import { apiaddress } from "./apiaddress";
import CryptoJS from "crypto-js";

const postDatax = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
  
    console.error('Error:', error.message);
  }
}

const username = localStorage.getItem('user')
const token = localStorage.getItem('username')

export const postData = async (url, data) => {
    try {

      await postDatax(apiaddress+'/write-logs',{username,token,path:url,activity:JSON.stringify(data)})
      data.token = token

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
    
      console.error('Error:', error.message);
    }
}


export const hashit = (a,b) => {
  
  const combinedInput = a+b;
  const sha256Hash = CryptoJS.SHA256(combinedInput).toString();
  return sha256Hash
 

};

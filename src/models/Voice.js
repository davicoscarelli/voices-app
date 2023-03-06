import axios, { post, put, get } from 'axios'
import { Notify } from 'quasar'

export class Voice {
  

  static async getAudio () {
    console.log("entrou")
    try {
      const { data, status } = await get('voices')

      if (status === 200) {
          console.log("voice", data)

          localStorage.voice = JSON.stringify(data)
          
          return data
         
      }else{
        console.log("nope")
      }
    } catch (e) {
        console.log(e)
        
        // Notify.create({ type: 'negative', message: `Error`})
        return false

      
      
    }
  }

  static async getTopic () {
    console.log("entrou")
    try {
      const { data, status } = await get('topic')

      if (status === 200) {
          console.log("topic", data)

          return data
         
      }else{
        console.log("nope")
      }
    } catch (e) {
        console.log(e)
        
        // Notify.create({ type: 'negative', message: `Error`})
        return false

      
      
    }
  }

  static b64toBlob (b64Data, contentType='', sliceSize=512) {
    if(b64Data && b64Data.length > 100){
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
    
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;

    }
    
  }
  static async upload (payload) {
    console.log("ENTROUU CARAIII")
    try {
      console.log("CRIAAAAAA: ", payload)
      
      const { data, status } = await post('voices', payload)

      if (status === 201) {
          return true
         
      }else{
        console.log("nope")
        return false
      }
    } catch (e) {
        console.log(e)
        
        // Notify.create({ type: 'negative', message: `Error`})
        return false

      
      
    }
  }

  
}

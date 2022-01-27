//funciones
(function() {         

  const entrada = document.getElementsByName("input-texto")
  const msg = document.getElementsByName('msg')
  
  const update = (value) =>
  {
     if(msg.length === 0) return  
     msg[0].value = value
  }

  const allowedCharacters = (texto) =>
  {   
     let regex = /^[a-z *]+$/
     return regex.test(texto)
  }

  const message = (text, action) =>
  {
     const target = document.getElementsByClassName('messages')  
     if(target.length === 0) return

     target[0].innerHTML = text 

     if(action)
     {
       target[0].classList.add('show')
       return        
     }

     target[0].classList.remove('show')            
  }

  const action = (name) =>
  {
     /*
     hace return si el array de inputs/entrada es igual a cero, lo que significa que no encontro ningun campo con ese nombre
     */
     if(entrada.length === 0) return
   
     const texto = entrada[0].value

     if(texto === '')
     {
       message('Ingrese texto.', true)
       return
     }        

     if(!allowedCharacters(texto))
     {
       message('Caracteres invalidos.', true)
       return
     }

     message('', false) 

     let txt = ''                     

     switch(name)
     {
         case 'encode':        
           
           txt = []
           
           const table = [
             ['a','ai'],
             ['e','enter'],
             ['i','imes'],
             ['o','ober'],
             ['u','ufat']
           ] 
           
           texto.split('').map(letter =>
           {
             let encripted = ''

             table.forEach(character =>
             {
               if(letter === character[0]) encripted = letter.replace(character[0], character[1])
             })

             txt.push(encripted != '' ? encripted : letter)            
           })             

           txt = txt.join().replace(/,/g, '') 
           break
         
         case 'decode':
           txt = texto.replace(/ai/g, "a").replace(/enter/g, "e").replace(/imes/g, "i").replace(/ober/g, "o").replace(/ufat/g, "u")
           break
     }         

     update(txt)     
  }

  const encriptar = (e) =>
  {
     e.preventDefault()
     console.log("Encriptando Frase...")                       
     action('encode')
 }

 const desencriptar = (e) =>
 {
   e.preventDefault()
   console.log("Desencriptando Frase...")
   action('decode')
 }

 const copiar = () =>
 {
   console.log("Copiando Frase...")

   const msg = document.getElementById('msg')

   if(msg.length === 0 || msg.value === '' ) return   

   msg.select();
   msg.setSelectionRange(0, 99999); /* For mobile devices */

   document.execCommand("copy");

   /* Copy the text inside the text field */    
   navigator.clipboard.writeText(msg.value)

   console.log(msg.value)
 }

 const principal = () =>
 {
     let boton_encriptar = document.querySelector("#btn-encriptar")
     if(boton_encriptar) boton_encriptar.onclick = encriptar      

     let boton_desencriptar = document.querySelector("#btn-desencriptar")
     if(boton_desencriptar) boton_desencriptar.onclick = desencriptar

     let boton_copiar = document.querySelector("#btn-copy")
     if(boton_copiar) boton_copiar.onclick = copiar
 } 

 principal();

 //console.log(obtener_input()) 
 /* Reglas de encriptación: 
 "e" es convertido para "enter" 
 "i" es convertido para "imes"
 "a" es convertido para "ai"
 "o" es convertido para "ober"
 "u" es convertido para "ufat"
 Solo letras minusculas
 No se permite acentuación de palabras 
 */

 /* Reglas de desencriptación: 
 "enter" es convertido para "e" 
 "imes" es convertido para "i"
 "ai" es convertido para "a"
 "ober" es convertido para "o"
 "ufat" es convertido para "u"
 Solo letras minusculas
 No se permite acentuación de palabras   
 */

})();

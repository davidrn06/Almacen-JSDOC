import { Product } from "../model/Product.js"
/**
 * Clase para construir objetos de tipo View
 */
export class View{
  /**
   * Constructo de la clase View
   */
    constructor(){
        this.table=document.getElementById('store')
        this.divTotal=document.getElementById('total')
        this.divMessages=document.getElementById('messages')
    }
    /**
     * Renderiza en la interfaz un nuevo producto
     * @param {Product} product - Producto a renderizar
     * @returns La fila creada para el producto nuevo
     */
    renderNewProduct(product){
        let tr=this.table.children[1].insertRow()
        tr.setAttribute('class','trPrincipal')
        let td1=tr.insertCell().append(product.id)
        let td2=tr.insertCell().append(product.name)
        let td3=tr.insertCell().append(product.units)
        let td4=tr.insertCell().append((product.price).toFixed(2))
        let td5=tr.insertCell().append(product.price*product.units)
        let td6=tr.insertCell()
        td6.innerHTML+='<i class="bi bi-caret-up-fill"></i>'
        td6.innerHTML+='<i class="bi bi-caret-down-fill"></i>'
        td6.innerHTML+='<i class="bi bi-pencil-fill"></i>'
        td6.innerHTML+='<i class="bi bi-x"></i>'
        this.renderTotalImport()
        return tr
    }
    /**
     * Renderiza en la interfaz el borrado de un producto
     * @param {String} id - Identificador del producto 
     * @returns true
     */
    renderDelProduct(id){
      let tr=this.buscaId(id)
         tr.remove()
         return true
      
    }
    /**
     * Renderiza el cambio de Stock en la interfaz
     * @param {String} id - Identificador del producto 
     * @param {Number} units - Numero de unidades a añadir 
     */
    renderChangeStock(id,units){
      let tr=this.buscaId(id)
      tr.children[2].textContent=Number(tr.children[2].textContent)+units
      this.renderStoreImport(tr)  
    }
    /**
     * Renderiza el aumento de 1 unidad en la interfaz
     * @param {String} id - Identificador del producto 
     */
    renderAumentaUnidad(id){
      let tr=this.buscaId(id)
      tr.children[2].textContent=Number(tr.children[2].textContent)+1
      this.renderStoreImport(tr)
    }
    /**
     * Renderiza la disminucion de 1 unidad en la interfaz
     * @param {String} id - Identificador del producto 
     */
    renderDisminuirUnidad(id){
      let tr=this.buscaId(id)
      if(Number(tr.children[2].textContent)!=0){
         tr.children[2].textContent=Number(tr.children[2].textContent)-1
         this.renderStoreImport(tr)
      }
    }
    /**
     * Busca la fila correspondiente a un id de producto
     * @param {String} id - Identificador del producto 
     * @returns La fila del producto
     */
    buscaId(id){
      for(let i=0;i<this.table.children[1].children.length;i++){
      let tbody=this.table.getElementsByTagName('tbody')[0]
      let tr=tbody.getElementsByTagName('tr')[i]
         if(tr.children[0].textContent==id){
            return tr
         }
      }
   }
   /**
    * Renderiza el importe para la fila de un producto
    * @param  tr La fila a la que se le actualiza el importe del producto 
    */
    renderStoreImport(tr){
         tr.children[4].textContent=Number(tr.children[2].textContent)*Number(tr.children[3].textContent).toFixed(2)
         this.renderTotalImport()
    }
    /**
     * Renderiza en la interfaz el producto editado
     * @param {Product} product - Producto ya editado
     * @returns La fila editada
     */
    renderEdit(product){
      let tr=this.buscaId(product.id)
      if(tr!=undefined){
        tr.children[1].textContent=product.name
        tr.children[3].textContent=product.price
        tr.children[2].textContent=product.units
        this.renderStoreImport(tr)
        return tr
      }else{
        document.getElementById('newprod-add').hidden=false
        document.getElementById('editprod').hidden=true
        this.renderErrorMessage("El producto no existe")
        throw "El producto no existe"
      }

    }
    /**
     * Renderiza un error en la interfaz
     * @param {String} msg - Mensaje de error
     */
    renderErrorMessage(msg){
      let p=document.createElement('p')
      let boton=document.createElement('button')
      boton.textContent='X'
      boton.addEventListener('click',()=>{
          p.remove()
      })
      p.textContent=msg
      p.append(boton)
      p.classList.add('error')
     
      this.divMessages.append(p)
      
      
  
    }
    /**
     * Renderiza en la interfaz el importe total de todos los productos
     */
    renderTotalImport(){
      let total = 0;
      let trs = this.table.getElementsByClassName('trPrincipal');
        for (let tr of trs) {
          total += Number(tr.children[4].textContent);
        }
      this.divTotal.textContent = total.toFixed(2) + " €";
    }
}
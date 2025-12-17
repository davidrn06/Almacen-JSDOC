import {Store} from '../model/Store.js'
import {View} from '../view/view.js'
/**
 * Clase controlador encargada de comunicar el modelo y la vista además de la API
 */
export class Controller{
    /**
     * Constructor de la clase controlador
     * @constructor
     */
    constructor(){
        this.store= new Store(1);
        this.view=new View()
    }
    /**
     * Método encargado de comunicar los datos devueltos del modelo para añadir a la vista
     * @param {String} id - Identificador del producto
     * @param {Sring} name - Nombre del producto
     * @param {Number} price -Precio del producto
     * @param {Number} units - Existencias del producto
     * @returns La fila devuelta en la  vista
     */
    addProductToStore(id,name,price,units){
        return this.view.renderNewProduct(this.store.addProduct(id,name,price,units))
    }
    
    /**
     * Método encargado de comunicar los datos devueltos del modelo para eliminar en la vista
     * @param {String} id - Identificador del producto
     * @returns true en caso de que la eliminacion sea satisfactoria
     */
    deleteProductFromStore(id){
        let tr=this.view.buscaId(id)
        if(confirm(`Seguro de sea eliminar ${tr.children[1].textContent} con id ${tr.children[0].textContent}`)){
            if(this.store.delProductApi(id)!=false){
                this.view.renderDelProduct(id)
                return true
            }else{
                this.view.renderErrorMessage('El producto no puede ser eliminado si tiene existencias')
            }
        }else{
            alert(`No a sido eliminado ${tr.children[1].textContent}`)
        }
        
    }
    /**
     * Método encargado de comprobar la edicion del stock de un producto para modificarlo en la vista
     * @param {String} id - Identificador del producto 
     * @param {Number} units - Existencias del producto 
     */
    chageProductStock(id,units){
        if(this.store.changeProductUnits(id,units)!==false){
            this.view.renderChangeStock(id,units)
        }
        
    }
    /**
     * Método encargado de comunicar el resultado de aumentar el Stock en la Api para actualizar la vista
     * @param {String} id - Identificador del producto 
     */
    aumentaStockApi(id){
         this.view.renderAumentaUnidad(this.store.aumentaStockApi(id))
    }
    /**
     * Método encargado de comunicar el resultado de disminuir el Stock en la Api para actualizar la vista
     * @param {String} id - Identificador del producto 
     */
    disminuyeStockApi(id){
        let aux=this.store.disminuyeUnidadApi(id)
        if(aux!=false){
            this.view.renderDisminuirUnidad(id)
        }
        
    }
    /**
     * Método encargado de comprobar la edicion de un producto para modificarlo en la vista
     * @param {String} id - Identificador del producto 
     * @param {Number} unidades - Existencias del producto
     * @param {String} nombre - Nombre del producto
     * @param {Number} precio - Precio del producto
     */
    edit(id,unidades,nombre,precio){
        this.view.renderEdit(this.store.editProduct(id,nombre,unidades,precio))   
    }
    /**
     * Método encargado de comprobar la edicion de un producto en la API
     * @param {String} id - Identificador del producto 
     * @param {Number} unidades - Existencias del producto
     * @param {String} nombre - Nombre del producto
     * @param {Number} precio - Precio del producto
     */
    editApi(id,unidades,nombre,precio){
        if(this.store.editProductApi(id,nombre,unidades,precio)){
            this.edit(id,unidades,nombre,precio)
        }
        
    }
    /**
     * Método encargado de comunicar un mensaje de error a la vista
     * @param {String} msg - Mensaje de error 
     */
    throwErrorPersonalizado(msg){
        this.view.renderErrorMessage(msg)
    }
    /**
     * Método encargado de devolver el resultado de findProduct del modelo
     * @param {String} cod -Identificador del producto 
     * @returns - El producto devuelto en el metodo del modelo
     */
    findProduct(cod){
       return this.store.findProduct(cod)
    }
    /**
     * Método encargado de comunicar la carga de datos del modelo y añadirlos al modelo.
     * @returns Devuelve las filas correspondientes a los datos cargados
     */
    async cargaDatos(){

        let datos= await this.store.cargaDatos()
        let trs=[]
        if(datos!=undefined){
            for (const dato of datos) {
                trs.push(this.addProductToStore(dato.id,dato.name,dato.price,dato.units))
            }
        }
        return trs
       
    }
    /**
     * Método encargado de comprobar la inserción de un producto en la API
     * @param {String} id - Identificador del producto 
     * @param {Number} units - Existencias del producto
     * @param {String} name - Nombre del producto
     * @param {Number} price - Precio del producto
     * @returns - La fila correspondiente al producto nuevo
     */
     addProductToApi(id,name,price,units){
        let objeto=  this.store.addProductApi(id,name,price,units)
        if(objeto){
            return this.addProductToStore(id,name,price,units)
        }
    }
   

}
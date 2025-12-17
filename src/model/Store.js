import { Product } from "./Product.js";
/**
 * Clase para construir objetos de tipo libro
 */
export class Store{
    /**
     * Constructor de la clase Store
     * @param {*} id - Identificador de la Stire
     */
    constructor(id){
        this.id=id;
        this.products=[]
        this.url='http://localhost:3000/almacen'
    }
    /**
     * Método encargado de encontrar un producto en la lista de productos
     * @param {String} cod - Identificador del producto a buscar 
     * @returns El producto 
     */
    findProduct(cod){
        return this.products.find(a=>a.id==cod)
    }
    /**
     * Método encargado de añadir un producto a la lista de productos
     * @param {String} id - Identificador del producto
     * @param {String} name  - Nombre del producto
     * @param {Number} price - Precio del producto
     * @param {Number} units - Existencias del producto 
     * @returns El producto creado
     */
    addProduct(id,name,price,units){
        
        let product=new Product(id,name,price,units)
        this.products.push(product);
        return product
        
    }
    /**
     * Método encargado de parametrizar la petición a la API para añadir producto
     * @param {String} id - Identificador del producto
     * @param {String} name  - Nombre del producto
     * @param {Number} price - Precio del producto
     * @param {Number} units - Existencias del producto 
     * @returns El producto creado
     */
    async addProductApi(id,name,price,units){
        let options={
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({id:id,name:name,price:Number(price),units:Number(units)})
        }
        return await this.request(this.url,options)
        
        
        
    }
    /**
     * Método encargado de parametrizar la petición a la API para eliminar un producto
     * @returns El producto creado
     */
    delProductApi(cod){
        let product=this.findProduct((cod))
        if(product!==undefined&&product.units==0){
            let options={
                method:'DELETE',
                headers: {"Content-Type":"application/json"},
            }
            this.request(this.url+"/"+cod,options)
            return this.delProduct(cod)
        }else{
            return false
        }
    }
    /**
     * Método encargado de eliminar un producto de la lista de productos
     * @param {String} cod - Identificador de producto 
     * @returns El producto eliminado
     */
    delProduct(cod){
        let product=this.findProduct((cod))
        
           this.products.splice(this.products.findIndex(p=>(p.id==cod)),1)
           return product
        
    }
    /**
     * Método encargado de buscar un producto y llamar a su método para cambiar unidades
     * @param {String} cod - Identificador de producto
     * @param {Number} units - Existencias de producto
     * @returns El producto si existe o false en el caso contrario
     */
    changeProductUnits(cod,units){
        let product=this.findProduct(cod)
        if(product!==undefined&&product.changeUnits(units)!==false){
            return product
        }else{
            alert('No hay existencias suficientes')
            return false
        }
    }
    /**
     * Método encargado de parametrizar la petición a la API para aumentar el stock de un producto
     * @param {String} cod - Identificador del producto 
     * @returns La id del producto en caso de que todo vaya bien , por lo contrario false
     */
    aumentaStockApi(cod){
        let product=this.findProduct(cod)
        if(product!==undefined&&product.aumentaUnidad()){
            let options={
            method:'PATCH',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({units:Number(product.units)})
            }
            this.request(this.url+"/"+cod,options)
            return product.id
        }else{
            return false
        }
    }
    /**
     * Método encargado de parametrizar la petición a la API para disminuir el stock de un producto
     * @param {String} cod - Identificador del producto 
     * @returns La id del producto en caso de que todo vaya bien , por lo contrario false
     */
    disminuyeUnidadApi(cod){
        let product=this.findProduct(cod)
        if(product!==undefined&&product.disminuyeUnidad()){
            let options={
            method:'PATCH',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({units:Number(product.units)})
            }
            this.request(this.url+"/"+cod,options)
            return product.id
        }else{
            return false
        }
    }
    /**
     * Método encargado de calcular el importe total de todos los productos
     * @returns El importe total 
     */
    totalImport(){
        let total=0;
        this.products.forEach(product => {
            total+=product.productImport()
        });
        return 'Total: '+total.toFixed(2)+'€\n'
    }
    /**
     * Método que filtra la lista de productos segun su numero unidades
     * @param {Number} units - Unidades a comparar 
     * @returns Una nueva lista filtrada
     */
    underStock(units){
        return this.products.filter(product=>(product.units<units))
    }
    /**
     * Método que ordena la lista de productos segun el numero de unidades
     * @returns La lista ordenada
     */
    orderByUnits(){
        return this.products.sort((product1,product2)=>(product2.units-product1.units))
    }
    /**
     * Método que ordena la lista de productos segun el nombre del producto
     * @returns La lista ordenada
     */
    orderByName(){
        return this.products.sort((product1,product2)=>(product1.name.localeCompare(product2.name)))
    }
    /**
     * Método encargado de editar un producto
     * @param {String} id - Identificador del producto a editar
     * @param {String} name - Nuevo nombre del producto 
     * @param {Number} units - Numero nuevo de unidades
     * @param {Number} price - Precio nuevo del producto 
     * @returns El producto 
     */
    editProduct(id,name,units,price){
        if(units<0){
            units=0
            throw 'Las unidades no pueden ser negativas'
        }
        let product=this.findProduct(id)
        if(product!==undefined&&product.editProduct(units,name,price)){
            return product
        }else{
            return false
        }
    }
    /**
     * Método encargado de parametrizar la petición a la API para editar un producto
     * @param {String} id - Identificador del producto
     * @param {String} name - Nuevo nombre del producto 
     * @param {Number} units - Nuevo numero de unidades 
     * @param {Number} price - Nuevo precio del producto
     * @returns true si se consigue editar,false en el caso contrario
     */
    editProductApi(id,name,units,price){
        if(units<0){
            units=0
            throw 'Las unidades no pueden ser negativas'
        }
        let product=this.findProduct(id)
        if(product!==undefined&&product.editProduct(units,name,price)){
            let options={
                method:'PUT',
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({id:id,name:name,price:Number(price),units:Number(units)})
            }
            this.request(this.url+"/"+id,options)
            return true
        }
        return false
    }
    /**
     * Método encargado de parametrizar la petición a la API para cargar los datos existentes
     * @returns La lista de objetos recuperada
     */
    async cargaDatos(){
        return await this.request(this.url)  
        
    }
    /**
     * Método encargado de realizar la petición
     * @param {String} url - Url a la que se hace la petición 
     * @param {Object} options - Opciones para la petición
     * @returns Los datos recuperados en formato Objeto
     */
    async request(url,options){
        try {
            let respuesta= await fetch(url,options)
            if(!respuesta.ok){
                throw new Error(respuesta.status)
            }
            return await respuesta.json()
        } catch (error) {
            
        }
    }

}


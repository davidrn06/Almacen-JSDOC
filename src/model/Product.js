/**
 * Clase para construir objetos de tipo Product
 */
export class Product{
    static Ids=1;
    /**
     * Constructor de la clase libro
     * @param {String} id -Identificador del producto
     * @param {String} name - Nombre del producto
     * @param {Number} price  - Precio del producto
     * @param {Number} units - Existencias del producto
     */
    constructor(id,name,price, units=0){
        this.id=id;
        this.name=name;
        this.price=Number(price)
        this.units=Number(units)
    }
    /**
     * Método encargado de cambiar las unidades del producto
     * @param {Number} cantidad - Cantidad a añadir al stock del producto 
     * @returns true en caso de que se pueda añadir , false en el caso opuesto
     */
    changeUnits(cantidad){
        if(this.units+cantidad>=0){
            this.units+=cantidad
            return true
        }else{
            return false
        }
    }
    /**
     * Método encargado de aumentar en 1 las unidades del producto
     * @returns true
     */
    aumentaUnidad(){
        this.units++
        return true
    }
    /**
     * Método encargado de disminuir en 1 las unidades del producto 
     * @returns true en caso de que sea posible , false en el caso opuesto
     */
    disminuyeUnidad(){
        if(this.units>0){
            this.units--
            return true
        }else{
            return false
        }
        
    }
    /**
     * Método encargado de calcular el importe del producto
     * @returns El importe del producto
     */
    productImport(){
        return this.units*this.price
    }
    /**
     * Método encargado de pasar a cadena un objeto
     * @returns La cadena formada por los datos del producto
     */
    toString(){
        return `\n${this.name} (${this.units}): ${(Number(this.price)).toFixed(2)}€/u => ${this.productImport().toFixed(2)}€`

    }
    /**
     * Método encargado de editar el producto
     * @param {Number} units - Unidades nuevas
     * @param {String} name - Nombre nuevo
     * @param {Number} price - Precio nuevo
     * @returns true
     */
    editProduct(units,name,price){
        this.price=price
        this.units=units
        this.name=name
        
        return true
    }
    
}


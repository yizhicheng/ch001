/*
*yzc框架
*/
function declar( list ) {
    const varList = []
    list.forEach( (item,index) => {
        varList[ index ] = Symbol(item.toString())
    })
    return varList
}
export default {
    declarProperty( propertyNames ) {
        return declar( propertyNames )
    },
    declarMethod( methodNames ) {
        return declar( methodNames )
    }
}

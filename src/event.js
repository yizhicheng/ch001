const Event = {
    trigger( eventName, obj ) {
        window.dispatchEvent(new CustomEvent( eventName, {
            detail: obj
        }))
    },
    on( eventName, callback ) {
        window.addEventListener( eventName, function( e ) {
            console.log( '自定义事件数据：', e )
            callback && callback( e.detail )
        })
    }
}

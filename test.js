let handler = {
    construct: function (target, args, newTarget) {
        console.log('handle construct')
        return Reflect.construct(target, args, newTarget)
    }
}
class Exam {
    constructor (name) {
        this.name = name
        this.age = 18
    }
}
let ExamProxy = new Proxy(Exam, handler)
let proxyObj = new ExamProxy()
console.log(proxyObj)

/**
 * 获取属性expr的值 要迭代获取
 * @param mvvm
 * @param expr
 */
export function getData(mvvm:any, expr:string) {
    // 将nodeValue根据.进行切分
    // data = data[key 1][key 2]...[key n]
    let data = mvvm.$data
    let keys = expr.split(".")
    for(const key of keys){
        if(data[key]===undefined)
            return ''
        else
            data = data[key]
    }
    return data
}

/**
 * 设置属性expr的值 同样要迭代处理
 * data[key1][key2]...[key_n] = value
 * @param mvvm
 * @param expr
 * @param value
 */
export function setData(mvvm:any, expr:string, value:any){
    let data = mvvm.$data
    let tmp = expr.split(".")
    // data[key 1][key 2]...[key n] = value
    tmp.forEach((item:string, index:number) => {
        if(index < tmp.length - 1){
            data = data[item]
        }else{
            // 最后一个 直接修改
            data[item] = value
        }
    })
}
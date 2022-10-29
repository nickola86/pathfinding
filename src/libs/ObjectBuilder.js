/*
type Source = {
 [key: string]: string | number;
};
type Derived = {
 [key: string]: string | number | Derived;
};
*/
export function builder(source){
    let derived = {}
    Object.keys(source).forEach(k=>{
        build(k.split('.'),source[k],derived)
    })
    return derived;
}

function build(lst,val,obj){
    if(lst.length>1){
        if(typeof obj[lst[0]]==='undefined') obj[lst[0]]={}
        obj[lst[0]]=build(lst.splice(1),val,obj[lst[0]])
    }else{
        obj[lst[0]]=val
    }
    return obj
}
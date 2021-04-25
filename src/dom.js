window.dom={
    create(string){    //create:function(){}
        const container=document.createElement("template");
        container.innerHTML=string.trim();
        return container.content.firstChild;
    },
after(node,node2){
node.parentNode.insertBefore(node2,node.nextSibling);
},
before(node,node2){
    node.parentNode.insertBefore(node2,node);
    },
append(parent,node){
        parent.appendChild(node)
        },
wrap(node,parent){
dom.before(node,parent)
dom.append(parent,node)
},
remove(node){
    node.parentNode.removeChild(node)
    return node
},
empty(node){
const {childNodes}=node //const childNodes=node.childNodes
const array=[]
let x=node.firstChild

while(x){
array.push(dom.remove(node.firstChild))
x=node.firstChild
}
return array
},
attr(node,name,value){       //重载
    if(arguments.length===3){  
        node.setAttribute(name,value)
    }else if(arguments.length===2){
return node.getAttribute(name)
    }
},
text(node,string){  //适配
    if(arguments.length===2){
        if('innerText' in node){
            node.innerText=string //ie
        }else{
            node.textContent=string //firefox/chrome
        }
    }else if(arguments.length===1){
        if('innerText' in node){
           return node.innerText=string //ie
        }else{
           return node.textContent=string //firefox/chrome
        }
    } 
},
html(node,string){
    if(arguments.length===2){
    node.innerHTML=string
    }else  if(arguments.length===1){
        return node.innerHTML
    }
},
style(node,name,value){
    if(arguments.length===3){
        //dom.style(div,'color','red')
      node.style[name]=value
    }else if(arguments.length===2){
    if(typeof name==='string'){
       //dom.style(div,'color')
     return node.style[name]
    }else if(name instanceof Object){
      //dom.style(div,{color:'red'})
        const object=name
        for(let key in object){
            node.style[key]=object[key]
            }
    }
    }
},
class:{
    add(node,className){
      node.classList.add(className)
    },
    remove(node,className){//删除
        node.classList.remove(className)
      },
      contains(node,className){//有没有这个class
       return node.classList.contains(className)
      }
},
on(node,eventName,fn){
 node.addEventListener(eventName,fn)
},
off(node,eventName,fn){
    node.removeEventListener(eventName,fn)
   },
find(selector,scope){   
    return (scope || document).querySelectorAll(selector)
},
parent(node){
return node.parentNode
},
children(node){
return node.children
},
siblings(node){
return Array.from(node.parentNode.children).filter(n=>n!==node)
},
next(node){
    let x=node.nextSibling
while (x && x.nodeType===3){
    x=x.nextSibling
}
return x
},
previous(node){
    let x=node.previousSibling
    while (x && x.nodeType===3){
        x=x.previousSibling
}
return x
},
each(nodeList,fn){
for(let i=0;i<nodeList.length;i++){
fn.call(null,nodeList[i])
}
},
index(node){
const list = dom.children(node.parentNode)
let i
for(i=0;i<list.length;i++){
    if(list[i]===node){
        break
    }
}
return i
}

};

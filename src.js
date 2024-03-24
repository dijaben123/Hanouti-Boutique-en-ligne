class produit {
    constructor(a, b, c, d, e) {
            this.id = a,
            this.label = b,
            this.price = c,
            this.qnte = 0,
            this.desc = d,
            this.image = e;
    }
};
let data=[];

class cartitem {
    constructor(a,b,c){
        this.obj=a,
        this.p=b,
        this.li=c
    }
};
let cartitems=[];

let content=document.querySelector("#content");
let cart =document.querySelector("#cart");
let total=document.querySelector("#total");
let search=document.querySelector("input");
/*
function search(e) {
    let s=e.value;
    let a=data.map(e=>e.label);
    let r=a.filter(s);

    content.removeChild()
    r.forEach(e=>{
        crediv(e);
    })
}
search.addEventListener("input",search)*/


function deletefromCart(e) {
    let a=data.find((i)=>i.id ==e.target.getAttribute("id"));
    let b=cartitems.find((i)=>i.obj=a);
    if(a.qnte==1){
        cart.removeChild(b.item);
        let c=cartitems.indexOf(b);
        cartitems.splice(c,1);
    }
    else{
        b.obj.qnte--;
        b.p.innerHTML=b.obj.qnte;
    }
    a.qnte--;
}

function addtoCart(e) {
    let a=new produit();
    Object.assign(a,(data.find((i)=>i.id ==e.target.getAttribute("id"))));
    let b=cartitems.find((i)=>i.obj=a);
    a.qnte++;console.log("qnte :"+a)
    if(typeof(b)!=='undefined'){
        b.p.innerHTML=a.qnte;
        b.obj.qnte++;
        
    }
    else{
        let item =document.createElement("li");
        let p=document.createElement("p");
        let txt=document.createTextNode(a.label+" : "+(a.price)*10+" MAD | ");
        p.appendChild(txt);
        
        let qnt=document.createElement("span");
        qnt.innerHTML=a.qnte;
        p.appendChild(qnt);
        item.appendChild(p);

        let button=document.createElement("img");
        button.setAttribute("src","imgs/del.png");
        button.setAttribute("id",a.id);
        button.setAttribute("class","icons");
        button.addEventListener("click",deletefromCart);
        item.appendChild(button);
        cart.appendChild(item);

        let b=new cartitem(a,qnt,item);
        cartitems.push(b);
        
    }

    let t=parseFloat(total.innerHTML);
    t+=(a.price*10);
    total.innerHTML=t;
}

function crediv(obj) {
    let div=document.createElement("div");
    div.setAttribute("id",obj.label);
    div.setAttribute("class","produit");

    let title=document.createElement("h2");
    let txt=document.createTextNode(obj.label+" : "+(obj.price)*10+" MAD ");
    title.appendChild(txt);

    let img=document.createElement("img");
    img.setAttribute("src",obj.image);
    div.appendChild(img);
    div.appendChild(title);

    let button=document.createElement("img");
    button.setAttribute("src","imgs/plus.png");
    button.setAttribute("id",obj.id);
    button.setAttribute("class","icons");
    button.addEventListener("click",addtoCart);
    div.appendChild(button);

    content.appendChild(div);
}

let resp;
let req=new XMLHttpRequest();
req.open("GET",'https://fakestoreapi.com/products/category/electronics',true);
req.send()
req.onreadystatechange=function () {
    if(req.readyState==4 && req.status==200){
        resp=JSON.parse(req.response);
        resp.forEach(e => {
            let a= new produit(e.id,e.title,e.price,e.description,e.image);
            data.push(a);
            crediv(a);
        });
    }
}


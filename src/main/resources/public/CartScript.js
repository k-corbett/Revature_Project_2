let baseUrl = "http://localhost:8081";
let activeUser = sessionStorage.activeUser;
let totalCost = 0.00;
const Cartarr = [];

async function getItemData(){
    let res = await fetch(`${baseUrl}/item`);//the url where we're sending this request.

if(res.status == 200){
    let data = await res.json()

    .then((resp) => {
        appendItemData(resp);
    })

    .catch((error) =>{
        console.log(error);
    });
} else{
    console.log("It got away!");
}
}

function appendItemData(data){
    var mainContainer = document.getElementById('itemData');

    for(var i = 0; i < data.length; i++){
        var li = document.createElement("li"); //maybe add the class for bootstrap?
        li.className = "list-group-item";
        let btn = document.createElement("button");
        btn.innerHTML = "Add to Cart";
        btn.type = "submit";
        btn.className = "btn btn-primary";
        btn.onclick = addToCart(data[i]);

        li.innerHTML = "<br>Name: <br>"  + data[i].name + "<br>Cost: $" + data[i].cost + "<br>Description: <br>" + data[i].desc
        + "<br>";

        mainContainer.appendChild(li);
        mainContainer.appendChild(btn);

    }
}

function addToCart(data){
    var totalContainer = document.getElementById("item-container");
totalCost = totalCost + data.cost;
var item = [
data.name,

data.cost,

data.desc

];



Cartarr.push(item);


}

function populateCart(){
    var mainContainer = document.getElementById("CartBody")

    var tr = document.createElement("tr");
    for(x = 0; x < Cartarr.length; x++){
        var th = document.createElement("th");
        var btn = document.createElement("button");
        btn.type = "submit";
        btn.className = "btn btn-primary";
        btn.onclick = removeFromCart(x);
        th.scope = "row";
        th.innerHTML = x+1;
        tr.appendChild(th);
        var td = document.createElement("td");
        td.innerHTML = Cartarr[x].name;
        tr.appendChild("td");
        td.innerHTML = Cartarr[x].cost;
        tr.appendChild("td");
        td.innerHTML = Cartarr[x].desc;
        tr.appendChild("td");

        mainContainer.appendChild("tr");
        mainContainer.appendChild(btn);
    }
}

function removeFromCart(x){
    Cartarr.splice(x, 1);
    totalCost = totalCost - Cartarr[x].cost;
    window.location.assign("CartListPage.html");
}
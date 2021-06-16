













var ProdId  = document.getElementsByClassName("pid")[0].value;
var url = "https://dev08-na-conair.demandware.net/on/demandware.store/Sites-us-metal-craft-Site/default/ProductCart-Start?pid="+ProdId+"&quantity=10";

function redirectToProduct()
{
    console.log("prodId "+ProdId);
  //  window.location.href = url;
}

const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn=document.querySelector("form button");
  const fromCurr=document.querySelector(".from select");
  const toCurr=document.querySelector(".To select");
  const msg=document.querySelector(".msg")


  for (let select of dropdowns){
   for (currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected";
    }else if(select.name ==="To" && currCode==="INR"){
        newOption.selected="selected";    
    }
     select.append(newOption);

    }
    
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}



const updateFlag = (element) =>{
    let currCode=element.value;
    // console.log(element.value);
    let countryCode=countryList[currCode];
    // console.log(countryCode);
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src = newSrc;
};



btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal===""||amtVal<1){
        amtVal = 1;
        amount.value = "1"; 
    }
    
    // console.log(fromCurr.value,toCurr.value);
    // let fromCurrency = fromCurr.value.toLowerCase(); 
    // let toCurrency = toCurr.value.toLowerCase(); 
    const url = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(url);
    // console.log(response);
    let data = await response.json();
    // console.log(data);   
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);      

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`
});


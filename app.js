const Base_url="https://v6.exchangerate-api.com/v6/aab801b7dc13f0f17f7f06eb/latest/"

const dropdownselects = document.querySelectorAll(".selections select")
const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from-selection select")
const toCurr=document.querySelector(".to-selection select")


for (let select of dropdownselects){
    for (currcode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText=currcode
        newOption.value=currcode
        if (currcode==='USD' && select.name==="select-from"){
            newOption.setAttribute("selected","selected")
        }else if(currcode==='INR' && select.name==="select-to"){
            newOption.setAttribute("selected","selected")
        }
        select.append(newOption)
    }    
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })

        
}
const updateFlag=(element)=>{
    let currcode=element.value
    let countryCode= countryList[currcode]
    let flag=`https://flagsapi.com/${countryCode}/shiny/64.png`
    let img=element.parentElement.querySelector("img")
    img.src=flag
}

btn.addEventListener("click",async (eve)=>{
    eve.preventDefault();
    let amount=document.querySelector("#amount")
    let amtVal=amount.value
    if (amtVal<0 || amtVal===""){
        amtVal=1
        amount.Value=1
    }
    
    url=`${Base_url}/${fromCurr.value.toLowerCase()}`
    let response = await fetch(url)
    let data= await response.json()
    let rate= data.conversion_rates[toCurr.value]
    let finalRate=rate*amtVal
    let msg=document.querySelector(".msg")
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalRate} ${toCurr.value}`

})


   
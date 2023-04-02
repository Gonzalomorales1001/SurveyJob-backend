let adviceID=document.querySelector('#advice-id')
let adviceContent=document.querySelector('.advice-card__content')

const getAdvice=()=>{
    
    const getAdviceData=async()=>{
        let response=await fetch("https://api.adviceslip.com/advice")
        let data=response.json()
        return data
    }
    
    getAdviceData().then(r=>{
        adviceID.innerHTML=r.slip.id
        adviceContent.innerHTML=r.slip.advice
    })

}

getAdvice()

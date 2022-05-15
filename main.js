//calls function which fetches api on window load
getFetch()

//adds event listener to dice logo button which calls for a new random advice
document.querySelector('.diceLogo').addEventListener('click', getFetch)

//on button press, function fetches data
function getFetch(){
//creates random number
let random = Math.floor(Math.random() * 224);
//random number is added to the end of url for a random piece of advice
const url = `https://api.adviceslip.com/advice/${random}`;
fetch(url)
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    //adds data from api fetch as parameters
    const randomAdvice = new Advice(data.slip.advice, data.slip.id)
    //calls clearAdvice method
    randomAdvice.clearAdvice()
    //calls clearId method
    randomAdvice.clearId()
    //calls appendQuoteToDom method
    randomAdvice.appendQuoteToDom()
    //calls appendIdToDom method
    randomAdvice.appendIdToDom()
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });
}

//Attempt at OOP
//I know this is overkill just wanted to practice classes/ methods
class Advice{
    constructor(quote, id){
        this.quote = quote
        this.id = id
    }
    appendQuoteToDom(){
        let h1 = document.createElement('h1')
        h1.innerHTML = `"${this.quote}"`
        document.querySelector('.adviceQuote').appendChild(h1)
    }
    appendIdToDom(){
        let h2 = document.createElement('h2')
        h2.innerHTML = `Advice #${this.id}`
        document.querySelector('.adviceId').appendChild(h2)
    }
    clearAdvice() {
        const adviceSection = document.querySelector(".adviceQuote");
        while (adviceSection.firstChild) {
          adviceSection.removeChild(adviceSection.firstChild);
        }
      }
    clearId() {
        const idSection = document.querySelector(".adviceId");
        while (idSection.firstChild) {
          idSection.removeChild(idSection.firstChild);
        }
      }
}
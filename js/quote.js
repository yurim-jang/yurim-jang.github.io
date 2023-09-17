const quotes = [
    {
        quote: "負けたら終わりじゃなくて。やめたら終わりなんだよね。",
        second: "당신이 진다고 끝나는게 아니고, 당신이 관둘 때 끝나는것이다.",
    },
    {
        quote: "夢見ることができれば、それは実現できる。",
        second: "꿈을 꿀 수 있다면, 그것이 현실이 될 수 있다.",
    },
    {
        quote: "チャレンジして失敗を怖れるよりも、何もしないことを怖れろ。",
        second: "도전해서 실패를 두려워하는 것보다 아무것도 안하는 것을 두려워하라.",
    },
    {
        quote: "うばい合えば足らぬわけ合えばあまる。",
        second: "서로 쟁탈하면 아무것도 남지 않고, 서로 나누면 남는다.",
    },
    {
        quote: "できると思うにせよ、できないと思うにせよ、そのとおりになる。",
        second: "할 수 있다고 생각하든지, 할 수 없다고 생각하든지, 생각대로 된다.",
    },
    {
        quote: "自分に打ち勝つことは、勝利のうちで最も偉大な勝利である。",
        second: "승리 중에서도 가장 위대한 승리는 자신에 맞서 이겼을 때이다.",
    },
    {
        quote: "人に勝つより自分に勝て。",
        second: "타인에게 이기는 것보다, 자기 자신에게 이겨라.",
    },
    {
        quote: "チャンスは貯金できない。",
        second: "기회는 저금할 수 없다.",
    },
    {
        quote: "今日は残された人生で最初の日。",
        second: "오늘은 남은 인생의 최초의 날.",
    },
    {
        quote: "重要なのは人生の長さではない。人生の深さだ。",
        second: "중요한 것은 인생의 길이가 아니고 인생의 깊이이다.",
    }
        
];


const images = ["0.jpeg", "1.jpeg", "2.jpeg","3.jpeg"];

const quoteDiv = document.querySelector('#quote');
const quote = document.querySelector("#quote span:first-child");
const second = document.querySelector("#quote span:last-child");
const bgImage = document.querySelector('#quote img');
const calendarhead = document.getElementsByClassName('header');


function changeQuote(){
    const choseImage = images[Math.floor(Math.random() * images.length)];
    const todaysQuote = quotes[Math.floor(Math.random() * quotes.length )];
    
    bgImage.src = `img/${choseImage}`;
  
    quote.innerText = todaysQuote.quote;
    second.innerText = todaysQuote.second;
  }


  window.addEventListener('load', changeQuote);
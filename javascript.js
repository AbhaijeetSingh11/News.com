const apiKey= '6bf8c60e7a024d09a18603d31624c577' ;
const boxcontent=document.getElementsByClassName("box_container")[0];
const inputsearch = document.getElementById("inputkro");
const searchbutton = document.getElementById("searchbutton");
console.log(boxcontent);
async function fetchData() {
    try {
        const apiurl=`https://newsapi.org/v2/everything?q=tesla&from=2024-06-10&sortBy=publishedAt&apiKey=${apiKey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    }  
    catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

searchbutton.addEventListener("click",async ()=>{
    const query= inputsearch.value.trim();
    if(query !== ""){
        try {
            const articles=await fetchnewsquery(query);
            console.log(articles);
            displaybox(articles);
        } catch (error) {
            console.log("error in fetching news using search button",error);
        }
    }
})

async function fetchnewsquery(query){
    try {
        const apiurl=`https://newsapi.org/v2/everything?q=${query}&from=2024-06-10&apiKey=${apiKey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
function displaybox(articles) {
    boxcontent.innerHTML="";
    articles.forEach(article => {
        if(article.title!="[Removed]"){
        const box_Card = document.createElement("div");
        box_Card.classList.add("box");

        const img = document.createElement("img");
        img.src=article.urlToImage;
        img.alt=article.title;
        img.classList.add("image_of_news");

        const title=document.createElement("h3");
        title.textContent=article.title;

        const des=document.createElement("p");
        des.classList.add("discription");
        let shortened=article.description;
        des.textContent=shortened.slice(0,200)+"...";

        box_Card.appendChild(img);
        box_Card.appendChild(title);
        box_Card.appendChild(des);
        box_Card.addEventListener("click",()=>{
            //opening full news..
            window.open(article.url,"_blank");
        })
        boxcontent.appendChild(box_Card);
    }
    });
}
(async()=>{
    try {
        const articles = await fetchData();
        displaybox(articles);
    } catch (error) {
        console.log("error in printing data",error);
        return [];
    }
})();
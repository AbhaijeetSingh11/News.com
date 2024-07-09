const apiKey= '6bf8c60e7a024d09a18603d31624c577' ;
const boxcontent=document.getElementsByClassName("box_container");
async function fetchData() {
    try {
        const apiurl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    }  
    catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
function displaybox(articles) {
    boxcontent.innerHTML="";
    articles.forEach((article) => {
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
        des.textContent=article.description;
        box_Card.appendChild(img);
        box_Card.appendChild(title);
        box_Card.appendChild(des);
        boxcontent.appendChild(box_Card);
    });
}
(async()=>{
    try {
        const articles = await fetchData();
        displaybox(articles);
    } catch (error) {
        console.log("error in printing data");
        return [];
    }
})();
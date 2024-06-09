const newsLoad = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data.news_category);
};

// <div>
//     <img  src="${news.author.img}">
//     <h5>${news.author.name}</h5>
// </div>

const displayNews = (newsPortal) => {
  const newsContainer = document.getElementById("news-container");
  newsPortal.forEach((news) => {
    // console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.onclick = () => loadNewsDetail(news.category_id);
    newsDiv.style.cursor = "pointer";
    newsDiv.innerHTML = `
      <h5>${news.category_name}</h5>
    `;
    newsContainer.appendChild(newsDiv);
  });
};

const loadNewsDetail = async (category_id) => {
  const url = `  https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsDetail(data.data[0]);
};

const displayNewsDetail = (news) => {
  // console.log(news);
  const newsDetailContainer = document.getElementById("news-detail-container");
  const newsDetailDiv = document.createElement("div");
  newsDetailDiv.innerHTML = `
    <div class = "d-flex align-items-center mb-4">
    <img src = "${news.thumbnail_url ? news.thumbnail_url : "No photos here"}">
    <div class = "ms-4">
     <h3 class = "  ">${news.title}</h3>
    <p>${news.details.slice(0, 400) + "..."}</p>
      <button onclick = "loadNewsModal('${news._id}')"
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Show Details
      </button>
    </div>
    </div>
    
  `;
  newsDetailContainer.appendChild(newsDetailDiv);
};

const loadNewsModal = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsModal(data.data[0]);
};

const displayNewsModal = (news) => {
  console.log(news);
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.innerText = news.title;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <h5>Author Name: ${
      news.author.name ? news.author.name : "No data found"
    }</h5>
    <h6>Total View: ${news.total_view}</h6>

  `;
};

newsLoad();

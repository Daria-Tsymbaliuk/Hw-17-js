const API_KEY = "54743839-4037ed339ef3d65e3dfd14f22";
const BASE_URL = "https://pixabay.com/api/";

let currentPage = localStorage.getItem("currentPage")
  ? parseInt(localStorage.getItem("currentPage"))
  : 1;

const perPage = 12;

const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// Функція запиту до API
async function fetchImages(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&editors_choice=true&image_type=photo&page=${page}&per_page=${perPage}`
    );

    if (!response.ok) {
      throw new Error("Помилка запиту до API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка:", error);
  }
}

// рендер
function renderImages(images) {
  images.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("image-card");

    card.innerHTML = `
      <img src="${image.webformatURL}" alt="${image.tags}">
    `;

    gallery.appendChild(card);
  });
}

// Завантаження сторінки
async function loadImages() {
  const data = await fetchImages(currentPage);

  if (!data || !data.hits || data.hits.length === 0) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "Більше зображень немає";
    return;
  }

  renderImages(data.hits);

  currentPage++;
  localStorage.setItem("currentPage", currentPage);
}

loadMoreBtn.addEventListener("click", loadImages);

loadImages();
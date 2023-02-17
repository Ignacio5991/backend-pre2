
const buttonNext = document.getElementById('next');
const buttonPrev = document.getElementById('prev');

buttonNext.addEventListener('click', () => {
   window.location.replace(`/products/?page=${products.nextPage}&&limit=`)
});

buttonPrev.addEventListener('click', () => {
   window.location.replace(`/products/?page=${products.prevPage}&&limit=`)
});


const menuBtn = document.querySelector('.p-header__btn');
const header = document.querySelector('.l-header');

menuBtn.addEventListener('click', () => {

    if (header.classList.contains("is-close")) {

        header.classList.remove("is-close");
        header.classList.add("is-open");
        document.body.classList.add('no-scroll');
        menuBtn.classList.remove("is-close");
        menuBtn.classList.add("is-open");


    } else {

        header.classList.remove("is-open");
        header.classList.add("is-close");
        document.body.classList.remove('no-scroll');
        menuBtn.classList.remove("is-open");
        menuBtn.classList.add("is-close");

    }
});

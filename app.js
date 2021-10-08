const items = document.querySelector(".items");
const areas = document.querySelectorAll("#area");
const navbar_element = document.querySelector(".navbar");
const navbar_mobile_element = document.querySelector(".navbar-mobile");
const toggle_nav = document.getElementById("toggle-nav");
const nav_mobile = document.querySelector(".nav-mobile");
const links = document.querySelectorAll(".link");
const sections = document.querySelectorAll("section");
const fab = document.querySelector(".fab");
const text = document.querySelector(".text");

window.addEventListener("scroll", stickyNavbar);

function stickyNavbar() {
    navbar_element.classList.toggle("sticky", scrollY > 10)
    navbar_mobile_element.classList.toggle("sticky", scrollY > 10)
}

toggle_nav.addEventListener("click", openNav);

function openNav() {
    nav_mobile.classList.toggle("show");
    if(nav_mobile.classList.contains("show")) {
        toggle_nav.setAttribute("class", "fa fa-times");
    } else {
        toggle_nav.setAttribute("class", "fa fa-bars");
    }

    links.forEach(link => {
        link.addEventListener("click", ()=> {
            nav_mobile.classList.remove("show");
            toggle_nav.setAttribute("class", "fa fa-bars");
        });
    })
    
}

function sfx() {
    const audio = new Audio("wosh.webm");
    audio.currentTime = 0;
    audio.volume = 0.3;
    audio.play();
}

setTimeout(showShare, 7000)

function showShare() {
    sfx()
    fab.classList.toggle("fade");
    text.classList.toggle("slide");
    setTimeout(function() {
        fab.classList.remove("fade");
        text.classList.remove("slide");
    }, 10000)
}

fab.addEventListener("click", function() {
    window.location.href = "https://wa.me/?text="+window.location.hostname
});

document.getElementById("explore").addEventListener("click", smoothScroll);
document.getElementById("explore").addEventListener("click", sfx);

links.forEach(link => {
    link.addEventListener("click", smoothScroll);
})

function smoothScroll(e) {
    e.preventDefault();
    let id_target = this.getAttribute("href");
    const offsetTop = document.querySelector(id_target).offsetTop;
    
    scroll({
        top: offsetTop - 50,
        behavior: "smooth"
    });
}

window.onscroll = () => {
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 100
        let height = section.offsetHeight
        let idElement = section.getAttribute("id")
        if(top >= offset && top < offset + height) {
            links.forEach(link => {
                link.classList.remove("active")
                document.querySelector('a[href*='+ idElement +']').classList.add("active")
            })
        }
    })
}

areas.forEach(area => {
    area.addEventListener("click", getArea);
})

function getArea() {
    areas.forEach(area => area.classList.remove("active"));
    this.classList.add("active");
    let area = this.innerText;
    getData(area)
}

async function getData(area) {
    let fetch_data = await fetch("data.json");
    let response_data = await fetch_data.json();
    data_destinations = response_data.destinations;
    let area_destiny = response_data.destinations.filter(destiny => {
        return (destiny.area.toLowerCase().includes(area.toLowerCase()));
    })

    renderData(area_destiny)
}

getData("pamekasan")

function renderData(destinations) {
    let template = destinations.map(destination => {
        return `
        <div class="item">
            <div class="image">
                <img src="${destination.image}">
                <div class="overlay">
                    <h4>${destination.name}</h4>
                    <p>${destination.addrs}</p>
                </div>
            </div>
        </div>`
    }).join(" ");

    items.innerHTML = template;
}
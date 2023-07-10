const mediaQuery = window.matchMedia('(max-width: 375px)');
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".logo-and-nav-container");

//creates menu elements for the mobile version's menu. 
const hamburgerBtnElement = document.createElement("img");
hamburgerBtnElement.setAttribute("class", "hamburger-button");
hamburgerBtnElement.setAttribute("src", "./assets/images/icon-menu.svg");

//if the media query changes to 375px, the desktop version of the navbar is removed from the DOM
//and the hamburger button gets appended to the header.
const handleMobileChange = (mediaQueryList) => {
    if(mediaQuery.matches){
        navbar.remove();
        header.appendChild(hamburgerBtnElement);
    };
};
handleMobileChange(mediaQuery);
mediaQuery.addEventListener("change", handleMobileChange);

const closeMenuBtn = document.createElement("img");
closeMenuBtn.setAttribute("class", "close-menu-button");
closeMenuBtn.setAttribute("src", "./assets/images/icon-menu-close.svg")
const sidebarMenuContainer = document.createElement("div");
sidebarMenuContainer.setAttribute("class", "sidebar-menu-container");

//when the menu img is clicked, the hamburger button is removed from the DOM and the new menu is appended to it.
const handleMenuClick = () =>{
    sidebarMenuContainer.appendChild(closeMenuBtn);
    sidebarMenuContainer.appendChild(navbar);
    hamburgerBtnElement.remove();
    header.appendChild(sidebarMenuContainer);
};
hamburgerBtnElement.addEventListener("click", handleMenuClick);

const handleMenuClose = () => {
    sidebarMenuContainer.remove();
    header.appendChild(hamburgerBtnElement);
};
closeMenuBtn.addEventListener("click", handleMenuClose);
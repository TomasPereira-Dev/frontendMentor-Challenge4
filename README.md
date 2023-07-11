# Frontend Mentor - News homepage solution

Hey, what's up?.

This is a solution to the [News homepage challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/news-homepage-H6SWTa1MFl).

(free) Junior challenge 2/27

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [For desktop](#for-desktop)
  - [For mobile](#for-mobile)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

This challenge consisted in a mixed layout using both flexbox and grid, and a hambuger-type navigation menu for the mobile version, it's a great
project to learn WHEN you should use flexbox or grid, how to use grid-template-areas and how to use JS with media queries.

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)


### Links

- Solution : [https://www.frontendmentor.io/solutions/news-homepage-with-grid-and-flexbox-DrkhLYPD1k](https://www.frontendmentor.io/solutions/news-homepage-with-grid-and-flexbox-DrkhLYPD1k)
- Live Site: [https://tomaspereira-dev.github.io/frontendMentor-Challenge4/](https://tomaspereira-dev.github.io/frontendMentor-Challenge4/)

## My process

  ### For desktop 

  This challenge was a little tricky, here is why.
  You might want to use only one technology for the layout, but if you try you will notice that both flexbox and grid work in a different way.

  With flexbox:
  - Elements become flexible, and they will grow or shring depending of their content(intrinsic sizing).
  - Every parent becomes a row by default (flex-direction: row).
  - Every direct child a is column by default, even if there will be some overflow. 

  While with grid:
  - Elements work in a structured, 2-dimensional layout (when declaring a grid-template), they are independent of their content (for example, if
    grid-template-rows has 1fr 1fr as values, it will only create 2 rows and every element will have the same size of 1fr, no matter what's inside themselves).
  - Every parent has grid-auto-flow: row; by default, every direct child will be a new row.
  - it uses a "sparse" algorithm by default, it means that if there is a hole in the grid it will not try to fill it automatically,
    so the auto-placed items appear in order.

  Having this in mind, you should choose flexbox when you need the elements to have a flexible size, depending of their content so there will be no useless space inside them(for example: a navbar), and grid when you need a more rigid layout with the elements being the same size all the time (for example: a container that needs to be separated in even fractions).

  You can also mix both grid and flexbox to do really cool things, so feel free to experiment, try using flexbox with children that are inside a parent with grid, the sky is the limit my friend :).

  In my case I used 2 grids, one for the main article and new articles section, and a second one for the less important ones on the bottom. and flexbox for the navbar.

  At the momment of building the main articles grid it's a good idea to draw over the design example some lines to know how many rows or columns you will need, some people use paint or draw it in paper, what i found useful is using the [Designer Tools Chrome extension](https://chrome.google.com/webstore/detail/designer-tools/jiiidpmjdakhbgkbdchmhmnfbdebfnhp) made by [baars.design](https://baars.design/), it let you add rulers to every tab, so you can have a more pixel perfect clone of your challenges.

  The easier way to do grid layouts is using grid-template-areas, with it you can specify the ammount of space a element will use, and it's easier to read that declaring grid-template-rows/columns, it needs a little bit of setup tho, you need tho name every element of the grid with grid-area first, the name should be written without quotes, else will not work, it's a common mistake.

  If you write something like this:
  ```
  .main-article-and-new-articles-container{
    display: grid; 
    grid-template-areas: "featured-img featured-img new-articles"
                         "featured-title featured-p new-articles";
  }
  ```
  (note: I skipped the naming of the elements for sake of brevity)

  You will end with this:


  It's like making a collage with paper, but instead you use words. cool isn't it?.

  In the case of the second grid, the one at the bottom with the numbered articles I used grid-template-columns: repeat(3, 1fr); because it doesn't have the complexity that the first has, what you are saying with that is "create 3 columns, 1fr each".
  
  When it comes to stuff like adding margins inside the elements I use flexbox in every element and add a gap, generaly between 1 and 2 em, you can do it with grid also, it adds both vertical and horizontal gaps between all the elements, I find it more clean than adding margins and it's useful for having everything aligned correctly. It's important to explain why ems instead of other measurment, this has to do with a graphic design rule: when spacing (or adding size), all spaces(horizontal and vertical distances between elements) are set in increments of 8 or .5em in our case, if you need you can cut the increment to 4 too, [this article explains it in a greater detail, check it out, is life-changeing](https://uxplanet.org/spacing-guide-for-designers-5bd140afe52a).

  ### For mobile:

  Here you need to change 2 main things, how the layout flows, and create a new type of navbar menu.

  Because I used grid-template-areas before, what I needed to do is writing it in a media query like this:

  ```
  @media(max-width: 425px){
    .main-article-and-new-articles-container{
      display: grid; 
      grid-template-areas: "featured-img"
                           "featured-title"
                           "featured-p"
                           "new-articles";
    }
  }
  ```

  Also the featured-img is different, is a new img with a different size, for this I used the picture element in HTML, it let you change an img to another based on the queries that you set, here is how:

  ```
    <picture class="featured-img">
      <source srcset="./assets/images/image-web-3-mobile.jpg" media="(max-width: 425px)" alt="image from the article">
      <img srcset="./assets/images/image-web-3-desktop.jpg" alt="image from the article">
    </picture>
  ```
  [You can find an in-depth explanation here from Chris Coyer of CSS-Tricks](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/).

  I made the mobile menu creating it's elements with JS, manipulating the DOM, this is because when it's not in use it shouldn't be in the HTML, wasting space for nothing, adding display: none; to the parent container it's like hiding something behind a curtain, it's still there even if you don't see it.

  JS needs to know where a media query is active, for this I used the matchMedia method, works similar to a querySelector.
  Then added some logic, if the media query exists, then the function will remove the navbar from the DOM and append a hamburger button to the header where the navbar was, every element here must be created before you append it, like this:

  ```
    //creates menu elements for the mobile version's menu. 
    const hamburgerBtnElement = document.createElement("img");
    hamburgerBtnElement.setAttribute("class", "hamburger-button");
    hamburgerBtnElement.setAttribute("src", "./assets/images/icon-menu.svg");

    //if the media query changes to 425px, the desktop version of the navbar is removed from the DOM
    //and the hamburger button gets appended to the header.
    const handleMobileChange = (mediaQueryList) => {
        if(mediaQuery.matches){
            navbar.remove();
            header.appendChild(hamburgerBtnElement);
        }else{
            hamburgerBtnElement.remove()
            header.appendChild(navbar);
        }
    };
    handleMobileChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMobileChange);
  ```

  Now that JS knows when the media query is active we need to add functionality to the buttons for the menu, so it can close or open on a click
  The aproach is like the last example, except id doesn't use a condition, the function runs when the hamburger button or the X are being clicked.

  ```
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
  ```
  And that's it now you have a mobile hamburger-type menu, the last thing you need to know about it is its styling, because it only shows when you use the mobile version, everything is written inside the media query, I have doubts when it comes to this, so I learned how to do it by watching a [Kevin Powell tutorial](https://youtu.be/HbBMp6yUXO0?t=598), Here he adds position: fixed; to the container, so it height will be as big as the screen, and  the inset property, that is shorthand to top, left, right and bottom properties, also the container needs to be on top of everything else, so you need to add Z-index to it, because the button and the links of the menu go in diferent directions I added justify-content: flex-end to the first and flex-start to the other.

  ```
    .sidebar-menu-container{
      position: fixed;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 5em;
      padding: 2em;
      inset: 0 0 0 35%;
      background-color: hsl(0, 0%, 100%);
      z-index: 999;
    }

    ...

    .navbar{
      flex-direction: column;
      align-self: flex-start;
      background-color: hsl(0, 0%, 100%); 
    }
  ```  
### Built with

- vanilla JS
- grid
- flexbox


### What I learned

- How to use media queries with JS
- When to use grid or flexbox and grid-template-areas  

### Continued development

This project has few issues, there is too much space between the title of the main article and its paragraph, its button is not 100% exact and also i couldn't align the page to the center correctly, when I tried for some reason I don't understand the main container went up, outside the screen, like if the center of the page was outside my viewport, when I asked no one knew how to fix this and told me to leave it like it was because that space was probably it was not part of the project, that was something about figma instead, but I will try my best to find a better way to do the project once again in the future.

### Useful resources

- [Kevin Powell's way to do a burger-type menu](https://youtu.be/HbBMp6yUXO0?t=598)
- [Chris Coyer's in-depth explanation about responsive images](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/).
- [Designer Tools Chrome extension](https://chrome.google.com/webstore/detail/designer-tools/jiiidpmjdakhbgkbdchmhmnfbdebfnhp).
- [Spacing and sizing rules to improve as a designer](https://uxplanet.org/spacing-guide-for-designers-5bd140afe52a).

## Author

- Portfolio - [Tomás Pereira](https://tomaspereira-dev.github.io/Portfolio/)
- Frontend Mentor - [@TomasPereira-Dev](https://www.frontendmentor.io/profile/TomasPereira-Dev)
- Twitter - [@TomasPereira_JS](https://www.twitter.com/TomasPereira_JS)
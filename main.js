/* ***************Show menu************** */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    // validate that variable exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // we add the show-menu class to the div tag with the nav_manu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')
    /* ***************Remove menu mobile************** */
const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
        // when we click on each nav_link, we remove the show-mwnu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ***************scroll section active link************** */
const section = document.querySelectorAll('section[id')

function scrollActive() {
    const scrolly = window.pageYOffset

    section.forEach(current => {
        const sectionHeigh = current.offsetHeigh
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrilly > sectionTop && scrollY <= sectionTop + sectionHeigh) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }

    })
}
window.addEventListener('scroll', scrollActive)

/* *************** show scroll top************** */
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // when the scroll is higher than 500 viewport innerHeight,add the show-scroll class to the header tag.
    if (this.scrollY >= 200) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop)

/* *************** dark light theme ************** */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// previously seleced topic(if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// we obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// we validae if the user previously chose a topic
if (selectedTheme) {
    // if the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme == 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon == 'bx-moon' ? 'add' : 'remove'](iconTheme)
}
// activate/deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // add or remove the dark/icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
        // we save the theme and current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/* *************** Reduce the size and print on an A4 sheet ************** */
function scaleCv() {
    document.body.classList.add('scale-cv')
}
/* *************** Remove the size when the CV is download ************** */
function removeScale() {
    document.body.classList.remove('scale-cv')
}
/* *************** generate pdf ************** */
// pdf generated area
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')
    // html2pdf options
let opt = {
        margin: 0,
        filename: 'myResume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { format: 'a4', orientation: 'portrait' }
    }
    // function to call areaCv and html2pdf options
function generateResume() {
    html2pdf(areaCv, opt)
}
// when the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {
    // 1. the class .scale-cv is added to the body, where it reduces the size of the elements
    scaleCv()
        // 2. the pdf is generated
    generateResume()
        // 3. the .scale-cv class is removed from the body after 5 seconds to return to normal
    setTimeout(removeScale, 5000)
})
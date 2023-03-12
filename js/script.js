class Accordion {
  constructor(el) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.summary = el.querySelector('.scenarios__header');
    // Store the <div class="content"> element
    this.content = el.querySelector('.scenarios__content');

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding  
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = 'hidden';
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
      // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;

    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 150,
      easing: 'ease'
    });

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 150,
      easing: 'ease-out'
    });
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = '';
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});

function nav () {
  let nav__btn = document.getElementById('nav__btn');
  let mob_nav_state = false;

  nav__btn.addEventListener('click', ()=> {
    if (mob_nav_state == false) {
      document.getElementById('mob_nav').style.display = 'block';
      mob_nav_state = true;
    } else {
      document.getElementById('mob_nav').style.display = 'none';
      mob_nav_state = false;
    }
  })

  const menu_link = document.getElementsByClassName('menu__link');
  [...menu_link].forEach((el)=> {
    el.addEventListener('click', ()=> {
      if (mob_nav_state == true) {
        mob_nav_state = false;
        document.getElementById('mob_nav').style.display = 'none';
      }
    })
  })
}

// function addswithc() {
//   let a = document.getElementsByClassName('switcher')
//   let b = document.getElementsByClassName('team__cards')
//   a[0].addEventListener('click', (e) => {
//     a[0].classList.add('switcher__active')
//     a[1].classList.remove('switcher__active')
//     b[1].classList.add('team__cards__hidden')
//     b[0].classList.remove('team__cards__hidden')
//   })
//   a[1].addEventListener('click', (e) => {
//     a[1].classList.add('switcher__active')
//     a[0].classList.remove('switcher__active')
//     b[1].classList.remove('team__cards__hidden')
//     b[0].classList.add('team__cards__hidden')
//   })
// }

// function switchTeamMob() {
//   let a = document.getElementsByClassName('switcher')
//   let b = document.getElementsByClassName('team_cards_mob')
//   a[0].addEventListener('click', (e) => {
//     a[0].classList.add('switcher__active')
//     a[1].classList.remove('switcher__active')
//     b[1].classList.add('team_cards_mob_hidden')
//     b[0].classList.remove('team_cards_mob_hidden')
//     team_member_img.forEach((e)=> {
//       e.classList.remove('active_team_img')
//     })
//     team_member_img[0].classList.add('active_team_img');
//     team_member_item.forEach((e)=> {
//       e.classList.remove('active_team_item')
//     })
//     team_member_item[0].classList.add('active_team_item');

//   })
//   a[1].addEventListener('click', (e) => {
//     a[1].classList.add('switcher__active')
//     a[0].classList.remove('switcher__active')
//     b[1].classList.remove('team_cards_mob_hidden')
//     b[0].classList.add('team_cards_mob_hidden')
//     team_member_img.forEach((e)=> {
//       e.classList.remove('active_team_img')
//     })
//     team_member_img[4].classList.add('active_team_img');
//     team_member_item.forEach((e)=> {
//       e.classList.remove('active_team_item')
//     })
//     team_member_item[4].classList.add('active_team_item');

//   })
// }

let team_member_img = document.querySelectorAll('.cards_mob_img');
let team_member_item = document.querySelectorAll('.cards_mob_item');

const lumbar_spine_y = document.getElementById('view_lumbar_spine_y');
const lumbar_spine_x = document.getElementById('view_lumbar_spine_x');

function switchActiveTeamMember() {
  team_member_img.forEach((x) => {
    x.addEventListener('click', (e) => {
      [...team_member_img].forEach((el) => el.classList.remove('active_team_img'));
      document.getElementById(e.target.id).classList.add('active_team_img');

      let member_active_img = document.querySelector('.active_team_img');
      let active_index = [...team_member_img].indexOf(member_active_img);

      [...team_member_item].forEach((el) => el.classList.remove('active_team_item'));
      team_member_item[active_index].classList.add('active_team_item');

    })
  })
  
  
}

const module_items = document.querySelectorAll('.module_item');
const viewer = document.getElementById('viewer');
const view_images = document.querySelectorAll('.view_images');

let view_container = document.getElementById('view_lung_nodules');
let viewer_background = ['#262626', '#252525'];

const screenWidth = window.screen.width
const module_text = document.querySelectorAll('.module_text');

const markup_btn = document.getElementById('markup_btn');
const show_axial = document.getElementById('show_axial');

let markUp = true;
let axial = true;
let useSpine = false; 

function switchAxial() {
  useSpine = true;
  if (axial) {
    axial = false;
    markUp = true;
    view_container = lumbar_spine_y;
    lumbar_spine_x.style.display = 'none';
    lumbar_spine_y.style.display = 'block';
    lumbar_spine_y.firstElementChild.style.opacity = 1;
    lumbar_spine_y.lastElementChild.style.opacity = 0;
    show_axial.textContent = 'Show sagittal';

  } else {
    axial = true;
    markUp = true; 
    view_container = lumbar_spine_x;
    lumbar_spine_y.style.display = 'none';
    lumbar_spine_x.style.display = 'block';
    lumbar_spine_x.firstElementChild.style.opacity = 1;
    lumbar_spine_x.lastElementChild.style.opacity = 0;
    show_axial.textContent = 'Show axial';
  }
}


function removeViewImagesActive() {
  [...view_images].forEach((el) => el.classList.remove('view_images_active'));
  markUp = true;
  view_container.firstElementChild.style.opacity = 1;
  view_container.lastElementChild.style.opacity = 0;
  view_container.classList.add('view_images_active');
  markup_btn.textContent = 'Hide the markup';
  viewer.style.background = viewer_background[0];

  show_axial.style.display = 'none';
  if (useSpine) {
    lumbar_spine_y.style.display = 'none';
    lumbar_spine_x.style.display = 'none';
  }
  
}

function switchActiveModule() {
  module_items.forEach((item) => {
    item.addEventListener('click', (e) => {
      [...module_items].forEach((el) => el.classList.remove('module_active'));
      if (screenWidth < 861) {
        [...module_text].forEach((el) => el.style.display = 'none');
      }
      let tar = e.target.closest('.module_item');
      let tar_id = document.getElementById(tar.id);
      tar_id.classList.add('module_active');

      switch (tar.id) {
        case "lung_nodules":
          view_container = document.getElementById('view_lung_nodules');
          viewer_background = ['#262626', '#252525'];
          removeViewImagesActive();

          break;
        case "covid_19":
          view_container = document.getElementById('view_covid_19');
          viewer_background = ['#262626', '#151515'];
          removeViewImagesActive();
          break;
        case "hypertension":
          view_container = document.getElementById('view_hypertension');
          viewer_background = ['#000000', '#000000'];
          removeViewImagesActive();
          break;
        case "hydrothorax":
          view_container = document.getElementById('view_hydrothorax');
          viewer_background = ['#000000', '#000000'];
          removeViewImagesActive();
          break;
        case "osteoporosis":
          view_container = document.getElementById('view_osteoporosis');
          viewer_background = ['#000000', '#000000'];
          removeViewImagesActive();
          break;
        case "lumbar_spine":
          view_container = document.getElementById('view_lumbar_spine_x');
          viewer_background = ['#000000', '#000000'];
          removeViewImagesActive();
          view_container.style.display = "block";

          show_axial.style.display = 'block';
          useSpine = true;
          axial = true;
          markup_btn.style.width = "100%";
          show_axial.style.width = "100%";

          break;
        case "aortic_aneurysm":
          view_container = document.getElementById('view_aortic_aneurysm');
          viewer_background = ['#111111', '#000000'];
          removeViewImagesActive();
          break;
      }

    })
  })
}

function switchMarkUp () {
 if (markUp) {
    markUp = false;
    view_container.firstElementChild.style.opacity = 0;
    view_container.lastElementChild.style.opacity = 1;
    viewer.style.background = viewer_background[1];
    markup_btn.textContent = 'Show the markup';

 } else {
    markUp = true;
    view_container.firstElementChild.style.opacity = 1;
    view_container.lastElementChild.style.opacity = 0;
    viewer.style.background = viewer_background[0];
    markup_btn.textContent = 'Hide the markup';

 }
}




let phoneMask = IMask(
  document.getElementById('phone'), {
    mask: '+{0}(000)000-00-00'
  });

nav()
// addswithc()
// switchTeamMob()
// switchActiveTeamMember()
switchActiveModule()
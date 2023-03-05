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
      duration: 100,
      easing: 'ease-out'
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
      duration: 100,
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

function addswithc() {
  let a = document.getElementsByClassName('switcher')
  let b = document.getElementsByClassName('team__cards')
  a[0].addEventListener('click', (e) => {
    a[0].classList.add('switcher__active')
    a[1].classList.remove('switcher__active')
    b[1].classList.add('team__cards__hidden')
    b[0].classList.remove('team__cards__hidden')
  })
  a[1].addEventListener('click', (e) => {
    a[1].classList.add('switcher__active')
    a[0].classList.remove('switcher__active')
    b[1].classList.remove('team__cards__hidden')
    b[0].classList.add('team__cards__hidden')
  })
}

function switchTeamMob() {
  let a = document.getElementsByClassName('switcher')
  let b = document.getElementsByClassName('team_cards_mob')
  a[0].addEventListener('click', (e) => {
    a[0].classList.add('switcher__active')
    a[1].classList.remove('switcher__active')
    b[1].classList.add('team_cards_mob_hidden')
    b[0].classList.remove('team_cards_mob_hidden')
    team_member_img.forEach((e)=> {
      e.classList.remove('active_team_img')
    })
    team_member_img[0].classList.add('active_team_img');
    team_member_item.forEach((e)=> {
      e.classList.remove('active_team_item')
    })
    team_member_item[0].classList.add('active_team_item');

  })
  a[1].addEventListener('click', (e) => {
    a[1].classList.add('switcher__active')
    a[0].classList.remove('switcher__active')
    b[1].classList.remove('team_cards_mob_hidden')
    b[0].classList.add('team_cards_mob_hidden')
    team_member_img.forEach((e)=> {
      e.classList.remove('active_team_img')
    })
    team_member_img[4].classList.add('active_team_img');
    team_member_item.forEach((e)=> {
      e.classList.remove('active_team_item')
    })
    team_member_item[4].classList.add('active_team_item');

  })
}

let team_member_img = document.querySelectorAll('.cards_mob_img');
let team_member_item = document.querySelectorAll('.cards_mob_item');

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

let phoneMask = IMask(
  document.getElementById('phone'), {
    mask: '+{0}(000)000-00-00'
  });

nav()
addswithc()
switchTeamMob()
switchActiveTeamMember()
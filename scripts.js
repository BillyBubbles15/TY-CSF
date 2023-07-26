window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const listToChangeColor = document.querySelector('.change-color');
    const linksToChangeColor = listToChangeColor.querySelectorAll('li a');
  
    if (scrollPosition >= 500) {
      listToChangeColor.classList.add('scrolled');
      linksToChangeColor.forEach(link => link.classList.add('scrolled'));
    } else {
      listToChangeColor.classList.remove('scrolled');
      linksToChangeColor.forEach(link => link.classList.remove('scrolled'));
    }
  });
  
  function toggleNavbar() {
          var navbarLinks = document.getElementById("listitem");
          navbarLinks.classList.toggle("show");
  }


          
  
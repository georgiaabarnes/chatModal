(function($) {
    //contact us btn - show form and hide button
    $('#contact-btn').click(function() {
      $('#contact-btn').hide("slow");
      $('#contact-form-container').show("slow");
    })
  
    $('#close-contact').click(function() {
      $('#contact-btn').show("slow");
      $('#contact-form-container').hide("slow");
    })
  
    $('#interactiveChat').hover(function() {
      $('#closeChat').show(0);
    })

    $("#interactiveChat").on('mouseenter',function(){
      $('#closeChat').show();
    });
    $("#interactiveChat").on('mouseleave',function(){
      $('#closeChat').hide();
    });

    $('#message-btn').click(function() {
      console.log('clicked');
      $('#contact-form').show("slow");
      $('#contact-form-container').hide("slow");
    })
  

  })(jQuery); 
  
  //contact us btn delay
  setTimeout(function(){
    $("#contact-btn").toggle("slow");
  }, 1000);
  
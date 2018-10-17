// chat "bot"
$(function(){
  var spinnerHtml = '<span class="spinme-left"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></span>'
  let $form = $("#msgForm"),
      $newMsg = $form.find("textarea"),
      $sendBtn = $form.find("a"),
      $feed = $("#msgs"),
      _wait = ms => new Promise((r, j)=>setTimeout(r, ms)),
      _secs = (a,b) => Math.floor(Math.random() * (b - a + 1)) + a;
  
  var _send = data => {
    let $msg = $('<div class="chat_msg_item chat_msg_item_admin msg"></div>'),
        {sender, typing} = data;
    if (sender !== "me") {
      $msg.addClass("to chat_msg_item chat_msg_item_admin");
    } else {
      $msg.addClass("from");
    }
    $msg.text( data.msg );
    if (typing) $msg.html(spinnerHtml);
    $msg.appendTo($feed);
    // If sending was successful, clear the text field.
    $newMsg.val("");
    // And simulate a reply from our agent.
    if (sender === "me") setTimeout(agentReply('auto-reply-menu'),1000);
    if (typing) return $msg; 
  };

  function agentReply(autoMsg) {
    let waitAfew = _wait( _secs(3000,5000) ),
      showAgentTyping = async () => {
        let $agentMsg = _send({msg:"",typing:true,sender:false});
        waitAfew.then(() => {
          $agentMsg.html($('#' + autoMsg).html());
          $agentMsg.removeClass("typing");
        });
      };
    waitAfew.then(showAgentTyping());
  }
  
  $newMsg.on("keypress",function(e){
    // TODO: Allow [mod] + [enter] to expand field & insert a <br>
    if(e.which === 13) {
      e.stopPropagation(); e.preventDefault();
      // Wrap msg and send
      let theEnvelope = {
        msg: $newMsg.val(),
        sender: "me"
      }
      return _send(theEnvelope);
    } else {
      // todo
    }
  });

  $sendBtn.on("click", function(e){
    e.stopPropagation(); e.preventDefault();
    // Wrap the msg and send!
    let theEnvelope = {
      msg: $newMsg.val(),
      sender: "me"
    }
    return _send(theEnvelope);
  });

  $('body').on('click', '.email-intake', function() {
    agentReply('auto-reply-1');
  });

  $('body').on('click', '.chat-contact-form', function() {
    agentReply('chat-form-msg');
  });

  $('body').on('click', '.menu', function() {
    $('.fab_field').hide();
    $('.chat_body').hide();
    $('.chat_header').hide();
    $('#contact-form-container').show();
  });

  $('body').on('click', '.new-convo', function() {
    $('.fab_field').show();
    $('.chat_body').show();
    $('.chat_header').show();
    $('#contact-form-container').hide();
    $('#msgs').html("");
  })

});

//Toggle chat
hideChat(0);

$('#prime').click(function() {
  toggleFab();
});

$('.mobile-close').click(function() {
  toggleFab();
});

function toggleFab() {
  $('.prime').toggleClass('zmdi-comment-outline');
  $('.prime').toggleClass('zmdi-close');
  $('.prime').toggleClass('is-active');
  $('.prime').toggleClass('is-visible');
  $('#prime').toggleClass('is-float');
  $('.chat').toggleClass('is-visible');
  $('.fab').toggleClass('is-visible');
  
}

$('.next_view_angle').click(function(e) {
  hideChat(1);
});

if ($(window).width() < 992) {
  $('.fullscreen').toggleClass('zmdi-window-maximize');
  $('.fullscreen').toggleClass('zmdi-window-restore');
  $('.chat').toggleClass('chat_fullscreen');
  $('#prime').toggleClass('hide-active');
  $('.header_img').toggleClass('change_img');
  $('.img_container').toggleClass('change_img');
  $('.chat_header').toggleClass('chat_header2');
  $('.fab_field').toggleClass('fab_field2');
  $('.chat_converse').toggleClass('chat_converse2');
  $('.mobile-close').toggle();
};

function hideChat(hide) {
  switch (hide) {
    case 0:
      $('#chat_converse').css('display', 'none');
      $('#chat_form').css('display', 'none');
      $('.chat_login').css('display', 'block');
      $('#chat_fullscreen').css('display', 'none');
      break;
    case 1:
      $('#chat_converse').css('display', 'block');
      $('#chat_form').css('display', 'none');
      $('.chat_login').css('display', 'none');
      $('.next_view_angle').css('display', 'block');
      break;
  }
}


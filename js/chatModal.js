// chat "bot"
$(function(){
  var spinnerHtml = '<span class="ccm-spinme-left"><div class="ccm-spinner"><div class="ccm-bounce1"></div><div class="ccm-bounce2"></div><div class="ccm-bounce3"></div></div></span>';
  var $form = $("#ccm-msgForm"),
      $newMsg = $form.find("textarea"),
      $sendBtn = $form.find("a"),
      $feed = $("#ccm-msgs"),
      _wait = ms => new Promise((r, j)=>setTimeout(r, ms)),
      _secs = (a,b) => Math.floor(Math.random() * (b - a + 1)) + a;
  
  var _send = data => {
    var $msg = $('<div class="ccm-chat_msg_item ccm-chat_msg_item_admin ccm-msg"></div>'),
        {sender, typing} = data;
    if (sender !== "me") {
      $msg.addClass("ccm-to ccm-chat_msg_item ccm-chat_msg_item_admin");
    } else {
      $msg.addClass("ccm-from");
    }
    $msg.text( data.msg );
    if (typing) $msg.html(spinnerHtml);
    $msg.appendTo($feed);
    $('.ccm-chat_body').scrollTop($feed[0].scrollHeight);
    // If sending was successful, clear the text field.
    $newMsg.val("");
    // And simulate a reply ccm-from our agent.
    if (sender === "me") setTimeout(agentReply('ccm-auto-reply-menu'),1000);
    if (typing) return $msg; 
  };

  function agentReply(autoMsg) {
    var waitAfew = _wait( _secs(3000,5000) ),
      showAgentTyping = async () => {
        var $agentMsg = _send({msg:"",typing:true,sender:false});
        waitAfew.then(() => {
          $agentMsg.html($('#' + autoMsg).html());
          $agentMsg.removeClass("ccm-typing");
          $('.ccm-chat_body').scrollTop($feed[0].scrollHeight);
        });
      };
    waitAfew.then(showAgentTyping());
  }
  
  $newMsg.on("keypress",function(e){
    // TODO: Allow [mod] + [enter] to expand field & insert a <br>
    if(e.which === 13) {
      e.stopPropagation(); e.preventDefault();
      // Wrap msg and send
      var theEnvelope = {
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
    var theEnvelope = {
      msg: $newMsg.val(),
      sender: "me"
    }
    return _send(theEnvelope);
  });

  $('body').on('click', '.ccm-email-intake', function() {
    agentReply('ccm-auto-reply-1');
  });

  $('body').on('click', '.ccm-chat-contact-form', function() {
    agentReply('ccm-chat-form-msg');
  });

  $('body').on('click', '.ccm-menu', function() {
    $('.ccm-fab_field').hide();
    $('.ccm-chat_body').hide();
    $('.ccm-chat_header').hide();
    $('#ccm-contact-form-container').show();
  });

  $('body').on('click', '.ccm-new-convo', function() {
    $('.ccm-fab_field').show();
    $('.ccm-chat_body').show();
    $('.ccm-chat_header').show();
    $('#ccm-contact-form-container').hide();
    $('#ccm-msgs').html("");
  })

});

//Toggle chat
hideChat(0);

$('#ccm-prime').click(function() {
  toggleFab();
});

$('.ccm-mobile-close').click(function() {
  toggleFab();
});

function toggleFab() {
  $('.ccm-prime').toggleClass('fa-comment-alt');
  $('.ccm-prime').toggleClass('far');
  $('.ccm-prime').toggleClass('fas');
  $('.ccm-prime').toggleClass('fa-times');
  $('.ccm-prime').toggleClass('ccm-is-active');
  $('.ccm-prime').toggleClass('ccm-is-visible');
  $('.ccm-chat').toggleClass('ccm-is-visible');
  $('.ccm-fab').toggleClass('ccm-is-visible');
  
}

$('.ccm-next_view_angle').click(function(e) {
  hideChat(1);
});

if ($(window).width() < 992) {
  $('.fullscreen').toggleClass('zmdi-window-maximize');
  $('.fullscreen').toggleClass('zmdi-window-restore');
  $('.ccm-chat').toggleClass('ccm-chat_fullscreen');
  $('#ccm-prime').toggleClass('ccm-hide-active');
  $('.ccm-header_img').toggleClass('ccm-change_img');
  $('.img_container').toggleClass('ccm-change_img');
  $('.ccm-chat_header').toggleClass('ccm-chat_header2');
  $('.ccm-fab_field').toggleClass('ccm-fab_field2');
  $('.ccm-chat_converse').toggleClass('ccm-chat_converse2');
  $('.ccm-mobile-close').toggle();
};

function hideChat(hide) {
  switch (hide) {
    case 0:
      $('.ccm-chat_converse').css('display', 'none');
      $('.ccm-chat_login').css('display', 'block');
      $('#ccm-chat_fullscreen').css('display', 'none');
      break;
    case 1:
      $('.ccm-chat_converse').css('display', 'block');
      $('.ccm-chat_login').css('display', 'none');
      $('.ccm-next_view_angle').css('display', 'block');
      break;
  }
}


$(function() {
  function buildHTML(message){
    var text = message.text ? `${ message.text }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="main-content-middle__message__info">
                  <p class="main-content-middle__message__info__name">
                    ${message.user_name}
                  </p>
                  <p class="main-content-middle__message__info__date">
                    ${message.created_at}
                  </p>
                </div>
                <div class="main-content-middle__message__text">
                  ${text}
                </div>
                <div class="main-content-middle__message__text">
                  ${image}
                </div>`
  return html;
  }

  $("#new_message").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.main-content-middle__message').append(html)
      $('.new-message-box-type').val('')
      $(".new-message-box-send").removeAttr("disabled")
      $('html,body').animate({ scrollTop: $(document).height() }, 1000);
    })
    .fail(function() {
      alert('error');
      $(".new-message-box-send").removeAttr("disabled")
    })
  });
  $('html,body').animate({ scrollTop: $(document).height() }, 1000);
});
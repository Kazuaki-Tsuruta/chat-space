$(document).on('turbolinks:load', function() {
  var user_list = $("#user-search-result");
  function appendUser(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
    user_list.append(html);
  }            
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    user_list.append(html);
  }
  function buildHTML(id, name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html;
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました。");
    })
  });
  $(document).on("click", ".user-search-add", function(){
    $(this).parent().detach();
    var input_id = $(this).attr("data-user-id");
    var input_name = $(this).attr("data-user-name")
    var html = buildHTML(input_id, input_name);
    $("#user-add-result").append(html)
  });
  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().detach();
  });
});   
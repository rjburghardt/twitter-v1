$(function() {
  var user = {
    handle: '@bradwestfall',
    img: 'images/brad.png'
  }

  var composeTemplate = $('#template-compose').text();
  var composeCompile = Handlebars.compile(composeTemplate);

  var renderCompose = function () {
    return composeCompile() 
  }
  
  var tweetTemplate = $('#template-tweet').text()
  var tweetCompile = Handlebars.compile(tweetTemplate) 

  var renderTweet = function (user, message) {
    return tweetCompile({ 
        userimg: user.img, 
        userhandle: user.handle,
        message: message})
  };

  var threadTemplate = $('#template-thread').text();
  var threadCompile = Handlebars.compile(threadTemplate);

  var renderThread = function (user, message) {
    $('.tweets').append(threadCompile({
      tweetAdd: renderTweet(user, message),
      compose: renderCompose()
    }));
  }

  $('main').on('click', '.compose textarea', function () {
    $(this).parent('.compose').addClass('expand');
  });

  $('.tweets').on('click', '.tweet', function () {
    $(this).parent('.thread').toggleClass('expand');
  });

  $('main').on('submit', 'form.compose', function () {
    var message = $(this).find('textarea').val()
    
    $(this).removeClass('expand');
    $(this).find('div').find('.count').text(140);
    $(this).find('textarea').val('');
    
    if ($(this).parent('header').length){
      renderThread(user, message);
    } else {
      $(this).parents('.replies').append(renderTweet(user, message));
    }
    
    return false

  });

  $('main').on('keyup', 'textarea', function () {
    var value = $(this).val().length;
    $(this).next('div').find('.count').text(140 - value);
  });
});

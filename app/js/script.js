$(function () {
    $('a[href^="#"]').click(function () {
        var $linkHref = $(this).attr("href");
        var $ancorName = $('a[name="' + $linkHref.slice(1) + '"]');
        var ancorPosition = $ancorName.offset();
        $('body, html').animate({
            scrollTop: ancorPosition.top
        }, 500);
    })

    $('.openform').on('click', function(){
        $('.callback-form').fadeIn();
    });

    $('.close').on('click', function(){
        $('.overlay').fadeOut();
    });

    $('.form').submit(function(e){
        e.preventDefault();// Отмена перезагрузки страницы при submit
        var $form = $(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            success: function(response){
                $form.find('.callback').css({background: '#4caf50'}).text('Заявка принята!');
                setTimeout(function(){
                    $('.overlay').fadeOut();
                    $form.find('.callback').css({background: '#0099ff'}).text('Отправить');
                }, 300);
            },
            error: function(response){
                alert('Произошла ошибка! Пожалуйста повторите отправку!');  
            }
        });
    });

    document.body.addEventListener("touchstart", showSubsribe);
    document.body.addEventListener("touchend", showSubsribe);
    window.addEventListener("scroll", showSubsribe);

    function showSubsribe(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var pageHeight = document.documentElement.scrollHeight;
        var clientHeight = document.documentElement.clientHeight;
        var targetPosition = (pageHeight - clientHeight) * 0.7; // Проскролено 70% страницы
        if(scrollTop > targetPosition){
            $('.subscribe-form').fadeIn();
            document.body.removeEventListener("touchend", showSubsribe);
            document.body.removeEventListener("touchstart", showSubsribe);
            window.removeEventListener("scroll", showSubsribe);
        }
    }
});


// Я зрабіў усё што змог, хто зможа, хай зробіць лепш!

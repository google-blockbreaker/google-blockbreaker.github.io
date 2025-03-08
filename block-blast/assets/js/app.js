document.addEventListener("DOMContentLoaded", (function () {
    var e = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 400;
        e.style.transitionProperty = "height, margin, padding", e.style.transitionDuration = t + "ms", e.style.height = e.offsetHeight + "px", e.offsetHeight, e.style.overflow = "hidden", e.style.height = 0, e.style.paddingTop = 0, e.style.paddingBottom = 0, e.style.marginTop = 0, e.style.marginBottom = 0, e.previousElementSibling && (e.previousElementSibling.style.pointerEvents = "none"), window.setTimeout((function () {
            e.style.display = "none", e.style.removeProperty("height"), e.style.removeProperty("padding-top"), e.style.removeProperty("padding-bottom"), e.style.removeProperty("margin-top"), e.style.removeProperty("margin-bottom"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property"), e.previousElementSibling && (e.previousElementSibling.style.pointerEvents = "auto")
        }), t), e.parentNode.classList.remove("is--open")
    }, t = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 400;
        e.style.removeProperty("display");
        var o = window.getComputedStyle(e).display;
        "none" === o && (o = "block"), e.style.display = o;
        var n = e.offsetHeight;
        e.style.overflow = "hidden", e.style.height = 0, e.style.paddingTop = 0, e.style.paddingBottom = 0, e.style.marginTop = 0, e.style.marginBottom = 0, e.offsetHeight, e.style.transitionProperty = "height, margin, padding", e.style.transitionDuration = t + "ms", e.style.height = n + "px", e.style.removeProperty("padding-top"), e.style.removeProperty("padding-bottom"), e.style.removeProperty("margin-top"), e.style.removeProperty("margin-bottom"), e.previousElementSibling && (e.previousElementSibling.style.pointerEvents = "none"), window.setTimeout((function () {
            e.style.removeProperty("height"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property"), e.previousElementSibling && (e.previousElementSibling.style.pointerEvents = "auto")
        }), t), e.parentNode.classList.add("is--open")
    }, o = document.querySelectorAll(".accordeon__trigger");
    o && o.forEach((function (o) {
        o.addEventListener("click", (function (n) {
            n.preventDefault(), o.parentNode.classList.contains("is--open") ? e(o.nextElementSibling) : t(o.nextElementSibling)
        }))
    }));
    var n = document.querySelector(".game"), i = document.querySelector(".game__btn");
    n && i && i.addEventListener("click", (function (e) {
        e.preventDefault(), n.classList.contains("preview-hidden") || n.classList.add("preview-hidden")
    }))
}));


if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr){

        // If a regex pattern
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
        }

        // If a string
        return this.replace(new RegExp(str, 'g'), newStr);

    };
}

function attemptsCounter() {
    let count = 0;

    return function () {
        return ++count;
    }
}

let attemptsCount = new attemptsCounter();
let maxAttempts = 5;

window.addEventListener('poof', (event) => {
    if(getSettings('confetti_mode') == null || getSettings('confetti_mode') == 1) {
        poof();
    }

    /**
     * @deprecated
     */
    let targetWord = event.detail.target;
    let currentGuess = event.detail.currentGuess;
    let maxGuesses = event.detail.maxGuesses;


    $('.share-button').each(function () {
        let target = $(this).data('target');

        let shareText = window.translations.share
            .replace('[word]', targetWord.toUpperCase())
            .replace('[number_try]', currentGuess)
            .replace('[total_try]', maxGuesses)
            .replace('[try]', currentGuess > 1 ? 'tries' : 'try');

        let url;
        switch(target) {
            case 'facebook': url = 'https://www.facebook.com/sharer/sharer.php?u=[source]'; break;
            case 'twitter': url = 'https://www.twitter.com/share?url=[source]&text=[text]'; break;
            case 'whatsapp': url = 'https://api.whatsapp.com/send?text=[text]'; break;
            case 'reddit': url = 'https://www.reddit.com/submit?url=[source]&title=[text]'; break;
        }

        if(url === undefined) {
            return
        }

        url = url.replace('[source]', window.location.href);
        url = url.replace('[text]', shareText);

        $(this).attr('href', url);
    });
}, false);

/**
 * @deprecated
 */
window.addEventListener('updateStats', (event) => {
    let statsPlayed = event.detail.statsPlayed;
    let statsWon = event.detail.statsWon;
    let statsPercent = event.detail.statsPercent;
    let statsMaxStreak = event.detail.statsMaxStreak;

    $('.share-stats-button').each(function () {
        let target = $(this).data('target');

        let shareText = window.translations.share_stats
            .replace('[stats_played]', statsPlayed)
            .replace('[stats_won]', statsWon)
            .replace('[stats_percent]', statsPercent)
            .replace('[stats_max_streak]', statsMaxStreak);

        let url;
        switch(target) {
            case 'facebook': url = 'https://www.facebook.com/sharer/sharer.php?u=[source]'; break;
            case 'twitter': url = 'https://www.twitter.com/share?url=[source]&text=[text]'; break;
            case 'whatsapp': url = 'https://api.whatsapp.com/send?text=[text]'; break;
            case 'reddit': url = 'https://www.reddit.com/submit?url=[source]&title=[text]'; break;
        }

        if(url === undefined) {
            return
        }

        url = url.replace('[source]', window.location.href);
        url = url.replace('[text]',  encodeURIComponent(shareText));

        $(this).attr('href', url);
    });
}, false);

$(function () {
    if($('.start-preview').length) {
        const now = Math.round((+new Date / 1000));
        const time = getCookie('start_preview') ? parseInt(getCookie('start_preview')) : 0;
        const duration = 86400;
        if(time == 0 || time + duration < now) {
            $('.start-preview').show();
            $('#game').addClass('game-locked');
        }
    }

    $('.js-start-preview').click(function(){
        setCookie('start_preview', Math.round((+new Date / 1000)));
        $('.game').removeClass('game-locked');
    });


    // Rating
    $('.starability-basic input').on('change', function () {
        $('.starability-basic input').prop('disabled', 'disabled');

        var rating = $(this).val();
        var section = $(this).closest('.starability-basic').attr('data-section');

        $.ajax({
            url: '/vote',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {rating: rating, section: section},
            type: 'post',
            dataType: 'json',
            success: function (data) {
                if(data.status == 'ok') {
                    $('.rating__value b').text(data.rating);
                    $('.rating__help span').text(data.total_votes);
                }
            },
            complete: function() {
            }
        })
    });

    $('body').on('change', 'input[name="dark_mode"][type="checkbox"]', function(e) {
        e.preventDefault()

        if ($(this).is(':checked') ) {
            $('html').addClass('dark');
            $('body').addClass('dark-theme');
            setSettings('theme_mode', 'night');
        } else{
            $('html').removeClass('dark');
            $('body').removeClass('dark-theme');
            $('.game_rows').removeClass('dark-theme');
            setSettings('theme_mode', 'day');
        }
    });

    if(getSettings('theme_mode') == 'night') {
        setSettings('theme_mode', 'night');
        $('input[name="dark_mode"][type="checkbox"]').prop('checked', true);
        $('html').addClass('dark');
        $('body').addClass('dark-theme');
    }

    $('body').on('change', 'input[name="color_blind_mode"][type="checkbox"]', function(e) {
        e.preventDefault()

        if ($(this).is(':checked') ) {
            $('body').addClass('color-blind-mode');
            setSettings('colorblind_mode', 1);
        } else{
            $('body').removeClass('color-blind-mode');
            setSettings('colorblind_mode', 0);
        }
    });
    if(getSettings('colorblind_mode') == 1) {
        $('input[name="color_blind_mode"][type="checkbox"]').prop('checked', true);
    }

    // Confetti Animation
    $('body').on('change', 'input[name="confetti_mode"][type="checkbox"]', function(e) {
        e.preventDefault()

        if ($(this).is(':checked') ) {
            setSettings('confetti_mode', 1);
        } else{
            setSettings('confetti_mode', 0);
        }
    });
    if(getSettings('confetti_mode') == null || getSettings('confetti_mode') == 1) {
        $('input[name="confetti_mode"][type="checkbox"]').prop('checked', true);
    }


    firstClick = false

    $('.mini_modal_link').click(function(e){
        e.preventDefault()

        let modalId = $(this).data('modal-id')

        $(modalId).find('.js-share_btn').css('display', 'block');
        $(modalId).find('.js-share_btn').siblings('.links').css('display', 'none');

        if( $(this).hasClass('active') ){
            $(this).removeClass('active')
            $('.mini_modal').removeClass('active')
            $('#game-wrapper').show();

            firstClick = false

            if( $(window).width() < 1024 ){
                $('body').css('cursor', 'default')
            }

            $('.overlay').fadeOut(200)
        }else{
            $('.mini_modal_link').removeClass('active')
            $(this).addClass('active')

            $('.mini_modal').removeClass('active')
            $(modalId).addClass('active')

            $('#game-wrapper').hide();

            firstClick = true

            if( $(window).width() < 1024 ){
                $('body').css('cursor', 'pointer')
            }

            $('.overlay').fadeIn(200)
        }

        $(this).blur();
    })

    $(document).click(function(e){
        if ( !firstClick && $(e.target).closest('.mini_modal').length == 0 ){
            if( $('.mini_modal_link').hasClass('active') ){
                $('.overlay').fadeOut(200)
            }

            $('.mini_modal, .mini_modal_link').removeClass('active')

            $('#game-wrapper').show();

            if( $(window).width() < 1024 ){
                $('body').css('cursor', 'default')
            }
        }

        firstClick = false
    })

    $('body').on('click', '.mini_modal .close', function(e) {
        e.preventDefault()

        $('.mini_modal, .mini_modal_link').removeClass('active')

        $('#game-wrapper').show();

        if( $(window).width() < 1024 ){
            $('body').css('cursor', 'default')
        }

        $('.overlay').fadeOut(200)

        firstClick = false
    })

    $('body').on('click', '.modal_finish .close', function(e) {
        e.preventDefault()

        $('.modal_finish').removeClass('active')

        if( $(window).width() < 1024 ){
            $('body').css('cursor', 'default')
        }
    })

    // Open block "Share"
    $('body').on('click', '.js-share_btn button', function(e) {
        e.preventDefault()

        $(this).parent().hide();
        $(this).parent().next('.links').fadeIn(300).css('display', 'flex')
    })

    // Open block "Share"
    $('body').on('click', '.open_alert', function(e) {
        e.preventDefault()

        $('.alert').fadeIn(300, function() {
            setTimeout(function function_name(argument) {
                $('.alert').fadeOut(300)
            }, 650)
        });
    });


    // Download screenshot
    $('body').on('click', '.download-screenshot', function(e) {
        e.preventDefault()

        if($('html').hasClass('dark')) {
            $('.game_rows').addClass('dark-theme');
        } else {
            $('.game_rows').removeClass('dark-theme');
        }

        $('.game_rows').addClass('game_rows-downloading');

        html2canvas(document.querySelector(".game_rows")).then(canvas => {
            $('.game_rows').removeClass('game_rows-downloading');
            canvas.toBlob(function(blob) {
                saveAs(blob, "wordle.png");
            });
        });
    });
});


var share = {
    open: function (params) {
        let prefix = language.prefix != '' ? `/${language.prefix}` : '';
        let url = `${prefix}/share?${params.join('&')}`;
        share.popup(url, 'Share', 840, 700);
    },

    popup: function (url, title, w, h) {
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var systemZoom = width / window.screen.availWidth;
        var left = (width - w) / 2 / systemZoom + dualScreenLeft
        var top = (height - h) / 2 / systemZoom + dualScreenTop
        var newWindow = window.open(url, title, 'menubar=no,toolbar=no, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);
        if(window.focus) newWindow.focus();
    }
};

function getSettings(name) {
    return localStorage.getItem(name);
}

function setSettings(name, value) {
    setCookie(name, value, 11000);
    localStorage.setItem(name, value);
}

function getCookie(e) {
    var s = "(?:; )?" + e + "=([^;]*);?";
    return !!new RegExp(s).test(document.cookie) && decodeURIComponent(RegExp.$1)
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) return false;
    return true;
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
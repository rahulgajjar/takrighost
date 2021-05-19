var html = $('html');

$(function () {
    'use strict';
    tagFeed();
    loadMore();
    video();
    gallery();
    author();
    offCanvas();
    facebook();
});

document.addEventListener('lazyloaded', function (e) {
    'use strict';
    var options = {
        disableParallax: /iPad|iPhone|iPod|Android/,
        disableVideo: /iPad|iPhone|iPod|Android/,
        speed: 0.1,
    };

    if ($(e.target).closest('.post').hasClass('single-post')) {
        $(e.target).parent().jarallax(options).addClass('initialized');
    }
});

function tagFeed() {
    'use strict';
    $('.tag-feed').owlCarousel({
        dots: false,
        nav: true,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            1200: {
                items: 3,
            },
            1920: {
                items: 4,
            },
            2560: {
                items: 5,
            },
        },
    });
}

function loadMore() {
    'use strict';
    var wrapper = $('.post-feed');
    var button = $('.pagination');
    var content, link, page;

    button.on('click', function () {
        $.get($(this).attr('data-url'), function (data) {
            content = $(data).find('.post-feed > *');
            link = $(data).find('.pagination').attr('data-url');
            page = $(data).find('.page-number').text();

            wrapper.append(content);

            button.attr('data-url', link);
            button.find('.page-number').text(page);

            if (link) {
                button.attr('data-url', link);
            } else {
                button.remove();
            }
        });
    });
}

function video() {
    'use strict';
    $('.post-content').fitVids();
}

function gallery() {
    'use strict';
    var images = document.querySelectorAll('.kg-gallery-image img');
    images.forEach(function (image) {
        var container = image.closest('.kg-gallery-image');
        var width = image.attributes.width.value;
        var height = image.attributes.height.value;
        var ratio = width / height;
        container.style.flex = ratio + ' 1 0%';
    });
}

function author() {
    'use strict';
    $('.author-name').on('click', function () {
        $(this).next('.author-social').toggleClass('enabled');
    });
}

function offCanvas() {
    'use strict';
    var burger = jQuery('.burger');
    var canvasClose = jQuery('.canvas-close');

    burger.on('click', function () {
        html.toggleClass('canvas-opened');
        html.addClass('canvas-visible');
        dimmer('open', 'medium');
    });

    canvasClose.on('click', function () {
        if (html.hasClass('canvas-opened')) {
            html.removeClass('canvas-opened');
            dimmer('close', 'medium');
        }
    });

    jQuery('.dimmer').on('click', function () {
        if (html.hasClass('canvas-opened')) {
            html.removeClass('canvas-opened');
            dimmer('close', 'medium');
        }
    });

    jQuery(document).keyup(function (e) {
        if (e.keyCode == 27 && html.hasClass('canvas-opened')) {
            html.removeClass('canvas-opened');
            dimmer('close', 'medium');
        }
    });
}

function facebook() {
    'use strict';
    if ($('.fb-page').attr('data-href') == '') {
        $('.widget-facebook').remove();
    }
}

function dimmer(action, speed) {
    'use strict';
    var dimmer = jQuery('.dimmer');

    switch (action) {
        case 'open':
            dimmer.fadeIn(speed);
            break;
        case 'close':
            dimmer.fadeOut(speed);
            break;
    }
}

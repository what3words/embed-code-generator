$(function() {
    $('[data-toggle="popover"]').popover()
});
/* Prism copy to clipbaord for all pre with copytoclipboard class */
$('pre.copytoclipboard').each(function() {
    $this = $(this);
    $button = $('<button>Copy</button>');
    $this.wrap('<div/>').removeClass('copytoclipboard');
    $wrapper = $this.parent();
    $wrapper.addClass('copytoclipboard-wrapper').css({ position: 'relative' })
    $button.css({ position: 'absolute', top: 10, right: 10 }).appendTo($wrapper).addClass('copytoclipboard btn btn-default');
    /* */
    var copyCode = new Clipboard('button.copytoclipboard', {
        target: function(trigger) {
            return trigger.previousElementSibling;
        }
    });
    copyCode.on('success', function(event) {
        event.clearSelection();
        event.trigger.textContent = 'Copied';
        window.setTimeout(function() {
            event.trigger.textContent = 'Copy';
        }, 2000);
    });
    copyCode.on('error', function(event) {
        event.trigger.textContent = 'Press "Ctrl + C" to copy';
        window.setTimeout(function() {
            event.trigger.textContent = 'Copy';
        }, 2000);
    });
});

//init generator if has element
if ($('#embed-generator').length) {

    var embed_code = $('#embed-code');


    // convert to HTML entity functions
    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function(s) {
            return entityMap[s];
        });
    }

    // Regenerate embed code and Re-init Prism.js
    function codeChange() {
        var html = $('.generated', embed_code).html().toString();
        var minified = html.replace(/\n\s+|\n/g, "");
        $('code.language-markup').text(minified);
        Prism.highlightAll();
    }

    //Color Change
    $('input[name=color]').on('click', function() {
        var _self = $(this),
            value = _self.val();
        $('.w3w-logo', embed_code).attr('class', 'w3w-logo').addClass(value).attr('style', '');

        if (value == 'colorpicker') {
            $('.jscolor-hider').slideDown('300');
        } else {
            $('.jscolor-hider').slideUp('300');
        }
        codeChange();
    });

    //Size change
    $('input[name=size]').on('click', function() {
        var _self = $(this),
            value = _self.val();
        $('.w3w-embed', embed_code).removeClass('w3w-small w3w-medium w3w-large').addClass(value);
        codeChange();
    });

    //Version change
    $('input[name=version]').on('click', function() {
        var _self = $(this),
            value = _self.val();
        $('.w3w-embed', embed_code).removeClass('w3w-light');
        $('.w3w-embed', embed_code).toggleClass(value);
        if (value != '') {
            embed_code.parent().addClass('dark');
        } else {
            embed_code.parent().removeClass('dark');
        }
        codeChange();
    });

    // Address Changer
    $('#change-w3a').on('click', function(event) {
        event.preventDefault();
        $('.addr', embed_code).text($('#w3a').val());

        codeChange();
    });

    //color picker
    var color_update = function(jscolor) {
        // 'jscolor' instance can be used as a string
        $('.w3w-logo', embed_code).css('color', '#' + jscolor);

        codeChange();
    }

    //Links
    $('#maplink').change(function(){
        var address = $('.w3w-embed .addr', embed_code).text();
        console.log(address);
        if (this.checked) {
            $('.w3w-embed', embed_code).wrap( "<a href='https://map.what3words.com/" + address + "' target='_blank'></a>" );
            codeChange();
        } else {
            $('.w3w-embed', embed_code).unwrap();
            codeChange();
        }


    });
}

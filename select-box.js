(function($) {
    
    $.fn.selectBox = function(options, beforeAction) {
        var $this = this;
        beforeAction();
        if($('#select-box-background').length < 1) {
            background = '<div id="select-box-background"></div>';
            $('body').append(background);
        }

        if($('#select-box').length < 1) {
            item = '<div id="select-box"></div>';
            $('body').append(item);
        }
        
        var defaults = { backgroundColor: '#424242', color: 'white',
                         prompt: true };
        settings = $.extend({}, defaults, options);

        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        function guid() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }

        
        $('body').on('click', '.select-option', function() {
            id = '#' + $(this).data('id');    
            text = $(this).data('text');
            value = $(this).data('value');
            $(id).text(text);
            $(id).parent().next().val(value);
            $('#select-box-background').hide();
            $('#select-box').empty();
            $('#select-box').hide();
        })

        $('body').on('click', '.close', function() {
            $('#select-box-background').hide();
            $('#select-box').empty();
            $('#select-box').hide();
        })

        return this.each(function() {
            var that = $(this);
            var currentElement = '';
            name = $(this).attr('name');
            uid = guid();
            var titleText = that.children('option:first-child').text();

            selectWrapper = '<div class="select-wrapper"><div class="left" id="' + uid + 
                            '">' + titleText + '</div><div class="right">></div></div>'
            that.before(selectWrapper);
            that.hide();

           that.prev().on('click', function() {
                $('#select-box-background').show();
                $('#select-box').show();
                id = $(this).find('.left').attr('id');
                
                $('#select-box').css(settings);
                
                that.find('option').each(function(index) {
                    console.log(settings['prompt']);
                    if(settings['prompt'] && index === 0) {
                        element = '<div class="title">' + titleText + 
                        '</div><div class="close">X</div><div class="clear"></div>';
                    } else {
                        if(index === 0) {
                            var title = '<div class="title">' + '请选择...' +
                            '</div><div class="close">X</div><div class="clear"></div>';
                        }
                        value = $(this).val();
                        text = $(this).text();
                        element = '<div class="select-option" data-value="' + 
                        value + '" data-text="' + text + '" data-id="' + id + '">' + 
                        text + '</div>'
                        if(index !== that.find('option').length - 1) {
                            element += '<hr>'
                        }
                    }
                    $('#select-box').append(element);
                    if(title !== undefined) {
                        $('#select-box').prepend(title);
                    }
                })
                
            })
        })
        

       
        
        
        
    }

})(jQuery)
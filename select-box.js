(function($) {
    
    $.fn.selectBox = function(options, beforeAction) {
        var $this = this;
        beforeAction();
        if($('#select-box-background').length < 1) {
            background = '<div id="select-box-background"></div>';
            $('body').append(background);
        }

        if($('#select-box').length < 1) {
            item = '<div id="select-box"><div id="title"></div><div id="search-box">\
            <input id="search-input"></div><div id="body"></div></div>';
            $('body').append(item);
        }
        
        var defaults = { backgroundColor: '#424242', color: 'white',
                         prompt: true, search: false };
        settings = $.extend({}, defaults, options);

        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        function guid() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }

        if(settings["search"]) {
            $('#select-box #search-box').show();
        }

        
        $('body').on('click', '.select-option', function() {
            id = '#' + $(this).data('id');    
            text = $(this).data('text');
            value = $(this).data('value');
            $(id).text(text);
            $(id).next().val(value);
            $('#select-box-background').hide();
            $('#select-box #title').empty();
            $('#select-box #body').empty();   
            $('#select-box').hide();
        })

        $('body').on('click', '.close', function() {
            $('#select-box-background').hide();
            $('#select-box #title').empty();
            $('#select-box #body').empty();            
            $('#select-box').hide();            
        })

        $('body').on('keyup', '#search-input', function() {
            var value = $(this).val().trim();
            searchOptions = $this.optionItems.filter(function(obj) {
                return obj.text().indexOf(value) >= 0;
            })
            $('#select-box #body').empty();
            var element, value, text, id;
            for(var i = 0; i < searchOptions.length; i++) {
                value = searchOptions[i].val();
                text = searchOptions[i].text();
                id = $(this).parent().attr('id');
                element = '<div class="select-option" data-value="' + 
                    value + '" data-text="' + text + '" data-id="' + id + '">' + 
                    text + '</div>'
                if(i !== searchOptions.length - 1) {
                    element += '<hr>'
                }
                $('#select-box #body').append(element);
            }
        })


        $('body').on('click', '.select-wrapper', function() {
            $this.optionItems = [];
            $this.optionHead = '';
            $('#select-box-background').show();
            $('#select-box').show();
            var id = $(this).attr('id');
            
            $('#select-box').css(settings);
            var titleText = $(this).next().children('option:first-child').text();
            var $options = $(this).next().find('option');                  
            $options.each(function(index) {
                if(settings['prompt']) {
                    $this.optionHead = '<div class="title">' + titleText + 
                    '</div><div class="close">X</div><div class="clear"></div>';
                    if(index !== 0) {
                        $this.optionItems.push($(this));                        
                    }
                } else {
                    $this.optionHead = '<div class="title">请选择...'  + 
                    '</div><div class="close">X</div><div class="clear"></div>';
                    $this.optionItems.push($(this));
                }
            })
            $('#select-box #title').empty();
            $('#select-box #body').empty();
            $('#select-box #title').append($this.optionHead);
            var element, value, text, id;
            for(var i = 0; i < $this.optionItems.length; i++) {
                value = $this.optionItems[i].val();
                text = $this.optionItems[i].text();
                // id = $this.optionItems[i].parent().attr('id');
                element = '<div class="select-option" data-value="' + 
                    value + '" data-text="' + text + '" data-id="' + id + '">' + 
                    text + '</div>'
                if(i !== $this.optionItems.length - 1) {
                    element += '<hr>'
                }
                $('#select-box #body').append(element);                
            }        
        })


        function createOptions(obj) {
            var options = [];
            var value, text;
            obj.each(function() {
                value = $(this).val();
                text = $(this).text();
                options.push()
            })
        }

        return this.each(function() {
            var that = $(this);
            var currentElement = '';
            name = $(this).attr('name');
            var uid = guid();
            var titleText = that.children('option:first-child').text();

            selectWrapper = '<div class="select-wrapper" id="' + uid + '"><div class="left">' + 
                             titleText + '</div><div class="right">></div></div>'
            that.before(selectWrapper);
            that.hide();

        //    that.prev().on('click', function() {
        //         $('#select-box-background').show();
        //         $('#select-box').show();
        //         id = $(this).find('.left').attr('id');
                
        //         $('#select-box').css(settings);
                
        //         that.find('option').each(function(index) {
        //             if(settings['prompt']) {
        //                 $this.optionHead = '<div class="title">' + titleText + 
        //                 '</div><div class="close">X</div><div class="clear"></div>';
        //                 if(index !== 0) {
        //                     $this.optionItems.push($(this));                        
        //                 }
        //             } else {
        //                 $this.optionHead = '<div class="title">请选择...'  + 
        //                 '</div><div class="close">X</div><div class="clear"></div>';
        //                 $this.optionItems.push($(this));
        //             }


                    // if(settings['prompt'] && index === 0) {
                    //     element = '<div class="title">' + titleText + 
                    //     '</div><div class="close">X</div><div class="clear"></div>';
                    // } else {
                    //     if(index === 0) {
                    //         var title = '<div class="title">' + '请选择...' +
                    //         '</div><div class="close">X</div><div class="clear"></div>';
                    //     }
                    //     value = $(this).val();
                    //     text = $(this).text();
                    //     element = '<div class="select-option" data-value="' + 
                    //     value + '" data-text="' + text + '" data-id="' + id + '">' + 
                    //     text + '</div>'
                    //     if(index !== that.find('option').length - 1) {
                    //         element += '<hr>'
                    //     }
                    // }
                    // $('#select-box #body').append(element);
                    // if(title !== undefined) {
                    //     $('#select-box #title').apend(title);
                    // }
                // })
            // })
        })
        

       
        
        
        
    }

})(jQuery)
$(function () {
    //delete element
    $(document).on('click', '.round_btn', function () {
        $(this).parent().remove();
    });

    $(document).on('click', '.pos_rltv>.badge', function () {
        let addTrgt = $(this).clone();
        //remove class
        $(addTrgt).removeClass();
        //remove style
        $(addTrgt).attr('style', '');

        //add target to talk area
        $(addTrgt).appendTo("#all_content");
        $(addTrgt).addClass('badge');
        $(addTrgt).css('color', $(this).css('color'));
        $(addTrgt).css('background-color', $(this).css('background-color'));
        $(addTrgt).wrap('<div class="talk-area-badge" />');
        $(addTrgt).after('<span class="round_btn"><span class="tate"></span><span class="yoko"></span></span>');
        $(addTrgt).after('<div class="balloon" contenteditable="true"></div>');

        $("#all_content").animate({
            scrollTop: $("#all_content")[0].scrollHeight
        }, 300);

        //tag attach setting
        let balloon = $(addTrgt).parent().children('.balloon');
        balloon.droppable({
            accept: ".tag",
            drop: function (event, ui) {
                //if reset 
                let el = $(this);
                let parent = $(this).parent();
                let dragged = $(ui.draggable);
                //classの初期化
                $(el).removeClass();
                $(el).addClass('balloon');
                $(el).css('background', '');
                $(el).parent().removeClass();
                $(el).parent().addClass('talk-area-badge');
                if (dragged.attr('id') == 'reset') {
                    //no operation
                } else {
                    let clzArry = $(dragged).attr("class").split(" ");
                    $.each(clzArry, function (index, value) {
                        el.addClass(value);
                        parent.addClass(value);
                    })
                    $(this).removeClass('tag');
                    $(parent).removeClass('tag');
                    $(this).css('background-color', $(dragged).css('background-color'));
                }
            }
        });
    });

    //load csv
    $("input[type='file']").on('change', function () {
        let file = $(this)[0].files[0];
        if (file) {
            var reader = new FileReader();
            reader.onerror = function () {
                alert('ファイル読み取りに失敗しました')
            }
            reader.onload = function () {
                var lineArr = reader.result.split("\r");
                var itemArr = [];
                for (var i = 0; i < lineArr.length; i++) {
                    itemArr[i] = lineArr[i].split(",");
                    try {
                        $(".nm").val(itemArr[i][0]);
                        $(".fnt-clr").val(itemArr[i][1]);
                        $(".bg-clr").val(itemArr[i][2]);
                        $(".add-btn-area").click();
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
            reader.readAsText(file);
        }
    });

    //download page
    $(".dl-area").on("click", function () {
        $(".js").each(function () {
            $(this).remove();
        });
        $("div").each(function () {
            $(this).attr('contenteditable', 'false');
        });
        $("input").not("input[type='radio']").prop('disabled', true);

        var snapshot = new XMLSerializer().serializeToString(document);
        let blob = new Blob([snapshot], { type: 'text/html' });
        a = document.createElement('a');
        a.download = $(".talk-area-head").text() + '_MeetRecord.html';
        a.href = URL.createObjectURL(blob);
        a.click();
        $("input").not("input[type='radio']").prop('disabled', false);

        $("div").each(function () {
            $(this).attr('contenteditable', 'true');
        });

    });

    //add badge
    $(".add-btn-area").on("click", function () {
        let nm = $(".nm").val();
        let fntclr = $(".fnt-clr").val();
        let bgclr = $(".bg-clr").val();
        let addObj = ''
            + '<div class="pos_rltv">'
            + '<span class="badge" style="color:' + fntclr + ';background-color: ' + bgclr + '; ">'
            + nm
            + '</span>'
            + '<span class="round_btn"><span class="tate"></span><span class="yoko"></span></span>'
            + '</div>';
        $(addObj).appendTo(".badge-area");

        //clear val
        $(".nm").val("");

        //drg event
        $(".badge").each(function () {
            $(this).draggable({
                revert: true,
                revertDuration: 50,
                opacity: 0.8,
            });
        });
    });

    $(".tag").each(function () {
        $(this).draggable({
            revert: true,
            revertDuration: 50,
            opacity: 0.8,
        });
    });


    //remove element
    $(document).on('click', '.round_btn', function () {
        $(this).parent().remove();
    });

    //droppable event
    $("#all_content").droppable({
        accept: '.badge',
        drop: function (event, ui) {

            let addTrgt = $(ui.draggable).clone();
            //remove class
            $(addTrgt).removeClass();
            //remove style
            $(addTrgt).attr('style', '');


            //add target to talk area
            $(addTrgt).appendTo(this);
            $(addTrgt).addClass('badge');
            $(addTrgt).css('color', $(ui.draggable).css('color'));
            $(addTrgt).css('background-color', $(ui.draggable).css('background-color'));
            $(addTrgt).wrap('<div class="talk-area-badge" />');
            $(addTrgt).after('<span class="round_btn"><span class="tate"></span><span class="yoko"></span></span>');
            $(addTrgt).after('<div class="balloon" contenteditable="true"></div>');


            $(this).animate({
                scrollTop: $("#all_content")[0].scrollHeight
            }, 300);

            //tag attach setting
            let balloon = $(addTrgt).parent().children('.balloon');
            balloon.droppable({
                accept: ".tag",
                drop: function (event, ui) {
                    //if reset 
                    let el = $(this);
                    let parent = $(this).parent();
                    let dragged = $(ui.draggable);
                    //classの初期化
                    $(el).removeClass();
                    $(el).addClass('balloon');
                    $(el).css('background', '');
                    $(el).parent().removeClass();
                    $(el).parent().addClass('talk-area-badge');
                    if (dragged.attr('id') == 'reset') {
                        //no operation
                    } else {
                        let clzArry = $(dragged).attr("class").split(" ");
                        $.each(clzArry, function (index, value) {
                            el.addClass(value);
                            parent.addClass(value);
                        })
                        $(this).removeClass('tag');
                        $(parent).removeClass('tag');
                        $(this).css('background-color', $(dragged).css('background-color'));
                    }
                }
            });
        }
    });
});
$(function () {
    $(".download").on("click", function () {
        $(".js").each(function () {
            $(this).remove();
        });

        var snapshot = new XMLSerializer().serializeToString(document);

        let blob = new Blob([snapshot], { type: 'text/html' });
        a = document.createElement('a');
        a.download = 'MeetRecord.html';
        a.href = URL.createObjectURL(blob);
        a.click();
    });

    $(".addBtn").on("click", function () {
        let inptxt = $(".addParticipant").find(".txt");
        let nm = $(inptxt).val();
        let inpclr = $(".addParticipant").find(".clr");
        let clr = $(inpclr).val();
        let addObj = '<div class="participant" style="background-color: ' + clr + '; ">'
            + nm
            + '<span class="round_btn"></span></div>';
        $(addObj).appendTo(".draggable-area");
        $(inptxt).val("");

        // drag event
        $(".participant").each(function () {
            $(this).draggable({
                revert: true,
                revertDuration: 50,
                opacity: 0.8,
            });
        });
    });
    $(document).on('click', '.round_btn', function () {
        $(this).parent().remove();
    });


    $(".droppable-area").droppable({
        drop: function (event, ui) {
            var addTarget = $(ui.draggable).clone();
            $(addTarget).find('.round_btn').remove();
            $(addTarget).addClass('dropped');
            $(addTarget).appendTo('.droppable-area');
            $(addTarget).wrap('<div class="wrap" />');
            $(addTarget).after('<span class="round_btn round_btn_talk"></span>');
            $(addTarget).after('<div class="fukidasi" contenteditable="true"></div>');

            var scroll_point = $(addTarget).offset().top;
            var body = $('body');
            body.animate({
                scrollTop: scroll_point
            }, 300);
            $(addTarget).parent().find('.fukidasi').focus();
        }
    });

});
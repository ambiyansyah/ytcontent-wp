(function ($) {
    "use strict";

    var lang = "en";
    var base_url = "https://ytcontent.herokuapp.com";

    jQuery(document).ready(function ($) {

        $("#ycrun").on('click', function (event) {
            event.preventDefault();
            var video_id_input = $("#video_id").val();
            var loading = $("#loading");
            loading.show();

            if (video_id_input.length) {

                var video_id = video_id_input.trim();
                $('select.lang').on('change', function () {
                    lang = $(this).children("option:selected").val();

                });

                $.getJSON(`${base_url}/caption?url=${video_id}`, function (data) {
                    if (data.error) {
                        loading.hide();
                        alert(data.error)
                    } else {
                        var title = data.title;
                        var result = data.caption;
                        var words_count = data.words_count;

                        // disable add image from yt thumbnails
                        // if (data.thumbnails.length > 1) {
                        //     var image = data.thumbnails[data.thumbnails.length - 1];
                        //     var image_tag = `[caption id="" align="aligncenter" width="${image.width}"]<img src="${image.url}" alt="test" width="${image.width}" height="${image.height}" /> ${title}[/caption]`
                        //     result = image_tag + "\n\n\n" + result
                        // }

                        $("#title").val(function () {
                            return title
                        });

                        $("#content").val(function () {
                            return result
                        });

                        $("#words_count").text(`words count : ${words_count}`)
                        $("#keywords").text(`keywords : ${data.keywords}`)

                        loading.hide();
                    }
                });

            } else {
                alert("Please insert video id")
            }

        });
    });

})(jQuery);
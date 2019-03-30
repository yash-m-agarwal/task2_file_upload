//function to get csrf_token bt cookie
function getCookie(name)
{
    let cookieValue = null;
    if (document.cookie && document.cookie !== '')
    {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

    let frm = $('#submit_file');

    let formData = new FormData();

    $('.butn').click(function () {
       $('#id_file').click();
    });

    $('#id_file').on('input', function () {
        let ins = document.getElementById('id_file').files.length;
        for (let x = 0; x < ins; x++) {
            formData.append("files[]", document.getElementById('id_file').files[x]);
        }
        $("#gallery tbody").prepend(
          "<tr><td>" + document.getElementById('id_file').files[0].name + "</td></tr>"
        );
        console.log($(this)[0].files[0]);
    });

    frm.submit( function() {

        let csrftoken = getCookie('csrftoken');
        let title = $('#id_title').val();
        let description = $('#id_description').val();

        formData.append('title',title);
        formData.append('description',description);
        formData.append('csrfmiddlewaretoken', csrftoken);

        $.ajax({
            type: 'post',
            url: '/file/new/',
            contentType: false,
            processData:false,
            data: formData,
            success: function (data) {
                alert(data);
            },
            error: function (err) {
                alert("Something went wrong!!" + err);
            }
        });
    });

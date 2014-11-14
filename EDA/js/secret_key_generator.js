/**
 * Created by Toni on 2.11.2014..
 */

function generateSK()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

$(document).ready(function(){
    $("#generateSK").click(function(){
        $key = generateSK();
        $("#secret_key").val($key);

        $.ajax({
            type: "POST",
            url: "file_rw.php",
            data:{
                value: $key,
                file: "secret_key.txt",
                type: "write"
            }
        })
            .done(function( msg ) {
                alert( "Secret key generated!");
                $("#download_SK").html("<button class='btn btn-encrypt btn-default' type='button' id='download_SK'>Download SK</button>");
            });
    })

    $('#download_SK').click(function(e) {
        e.preventDefault();  //stop the browser from following
        window.location.href = 'text_files/secret_key.txt';
    });
})
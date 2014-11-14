/**
 * Created by Toni on 12.11.2014..
 */


$(document).ready(function(e){

    $('#RSA_encrypt').click(function() {

        // Encrypt with the public key...
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey($('#pubkey').val());
        var encrypted = encrypt.encrypt($('#input').val());

        $("#crypted").val(encrypted);
        $("#input").val("");

        $.ajax({
            type: "POST",
            url: "file_rw.php",
            data:{
                value: $("#crypted").val(),
                file: "asymmetric_encrypted.txt",
                type: "write"
            }
        })
            .done(function( msg ) {
                alert( "Message encrypted!");
            });
    });

    $('#RSA_decrypt').click(function() {

        var encrypted = $('#crypted').val();

        // Decrypt with the private key...
        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey($('#privkey').val());
        var uncrypted = decrypt.decrypt(encrypted);

        if(uncrypted == null)
            alert("Decryption failed!");

        $("#input").val(uncrypted);
        $("#crypted").val("");
    });



    $('#download_RSA').click(function(e) {
        e.preventDefault();  //stop the browser from following
        window.location.href = "text_files/asymmetric_encrypted.txt";
    });



    $("#save_DS").click(function(e){
        $.ajax({
            type: "POST",
            url: "file_rw.php",
            data:{
                value: $("#crypted").val(),
                file: "digital_signature.txt",
                type: "write"
            }
        })
            .done(function( msg ) {
                alert( "DS saved!");
                e.preventDefault();  //stop the browser from following
                window.location.href = 'text_files/digital_signature.txt';
            });
    });
})
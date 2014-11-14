/**
 * Created by Toni on 12.11.2014..
 */

$("#document").ready(function(){

    $("#check_DS").click(function(){
        $message = $("#message2").val();
        $digested = $.md5($message);
        $("#digested2").val($digested);

        var encrypted = $('#digital_signature').val();

        // Decrypt with the private key...
        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey($('#pubkey2').val());
        var uncrypted = decrypt.decrypt(encrypted);

        if(uncrypted == null)
            alert("Decryption failed!");

        $("#decrypted").val(uncrypted);

        if($digested == uncrypted){
            $("#result").html("Digital signature is valid!");
            $("#result2").html("");
        }
        else
        {
            $("#result").html("");
            $("#result2").html("Digital signature is not valid!");
        }
    });

});
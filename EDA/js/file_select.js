/**
 * Created by Toni on 2.11.2014..
 */
function readBlob(placeholder, type) {

    var files = document.getElementById(type).files;
    if (!files.length) {
        alert('Please select a file!');
        return;
    }

    var file = files[0];
    var reader = new FileReader();

    var start = 0;
    var stop = file.size - 1;

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            $(placeholder).val(evt.target.result);
            $(placeholder).autogrow({onInitialize: true});
        }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
}

$("#read_file").click(function() {
    readBlob("#demo-input-data", "files");
});

$("#read_key").click(function() {
    readBlob("#demo-input-key", "keys");
});

$("#read_message").click(function(){
    readBlob("#input", "messages");
});

$("#read_encrypted").click(function(){
   readBlob("#crypted", "encryptions");
});

$("#read_text").click(function(){
    readBlob("#message", "texts");
});

$("#read_text2").click(function(){
    readBlob("#message2", "texts2");
});

$("#read_text3").click(function(){
    readBlob("#pubkey2", "texts3");
});

$("#read_text4").click(function(){
    readBlob("#digital_signature", "texts4");
});
/**
 * Created by Toni on 5.11.2014..
 */
$(function () {

    //Change the key size value for new keys
    $(".change-key-size").each(function (index, value) {
        var el = $(value);
        var keySize = el.attr('data-value');
        el.click(function (e) {
            var button = $('#key-size');
            button.attr('data-value', keySize);
            button.html(keySize + ' bit <span class="caret"></span>');
            e.preventDefault();
        });
    });

    // Execute when they click the button.
    $('#execute').click(function () {

        // Create the encryption object.
        var crypt = new JSEncrypt();

        // Set the private.
        crypt.setPrivateKey($('#privkey').val());
        //return;
        // If no public key is set then set it here...
        var pubkey = $('#pubkey').val();
        if (!pubkey) {
            $('#pubkey').val(crypt.getPublicKey());
        }

        // Get the input and crypted values.
        var input = $('#input').val();
        var crypted = $('#crypted').val();

        // Alternate the values.
        if (input) {
            $('#crypted').val(crypt.encrypt(input));
            $('#input').val('');
        }
        else if (crypted) {
            var decrypted = crypt.decrypt(crypted);
            if (!decrypted)
                decrypted = 'This is a test!';
            $('#input').val(decrypted);
            $('#crypted').val('');
        }
    });

    var generateKeys = function () {
        var sKeySize = $('#key-size').attr('data-value');
        var keySize = parseInt(sKeySize);
        var crypt = new JSEncrypt({default_key_size: keySize});
        var async = $('#async-ck').is(':checked');
        var dt = new Date();
        var time = -(dt.getTime());

        var privKey;
        var pubKey;

        if (async) {
            $('#time-report').text('.');
            var load = setInterval(function () {
                var text = $('#time-report').text();
                $('#time-report').text(text + '.');
            }, 500);
            crypt.getKey(function () {
                clearInterval(load);
                dt = new Date();
                time += (dt.getTime());
                $('#time-report').text('Generated in ' + time + ' ms');
                privKey = crypt.getPrivateKey();
                $('#privkey').val(privKey);
                pubKey = crypt.getPublicKey()
                $('#pubkey').val(pubKey);

                $.ajax({
                    type: "POST",
                    url: "file_rw.php",
                    data:{
                        value: privKey,
                        file: "private_key.txt",
                        type: "write"
                    }
                })
                    .done(function( msg ) {
                        alert( "Data Saved: " + msg );
                    });

                $.ajax({
                    type: "POST",
                    url: "file_rw.php",
                    data:{
                        value: pubKey,
                        file: "public_key.txt",
                        type: "write"
                    }
                })
                    .done(function( msg ) {
                        alert( "Data Saved: " + msg );
                    });
            });
            return;
        }
        crypt.getKey();
        dt = new Date();
        time += (dt.getTime());
        $('#time-report').text('Generated in ' + time + ' ms');
        privKey = crypt.getPrivateKey();
        $('#privkey').val(privKey);
        pubKey = crypt.getPublicKey()
        $('#pubkey').val(pubKey);

        $.ajax({
            type: "POST",
            url: "file_rw.php",
            data:{
                value: privKey,
                file: "private_key.txt",
                type: "write"
            }
        })
            .done(function( msg ) {
                alert( "Private key generated!" );
            });

        $.ajax({
            type: "POST",
            url: "file_rw.php",
            data:{
                value: pubKey,
                file: "public_key.txt",
                type: "write"
            }
        })
            .done(function( msg ) {
                alert( "Public key generated" );
            });
    };

    // If they wish to generate new keys.
    $('#generate').click(generateKeys);
    generateKeys();
});

$('#download_priv').click(function(e) {
    e.preventDefault();  //stop the browser from following
    window.location.href = 'text_files/private_key.txt';
});

$('#download_pub').click(function(e) {
    e.preventDefault();  //stop the browser from following
    window.location.href = 'text_files/public_key.txt';
});
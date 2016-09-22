InboxSDK.load('1', 'sdk_Hackotron-BE_a4e83dfe8a').then(function (sdk) {
        sdk.Conversations.registerMessageViewHandler(function (messageView) {
            messageView.on('load', function (event) {
                if (event.messageView.getViewState() == "EXPANDED") {
                    var files = event.messageView.getFileAttachmentCardViews();

                    for (var i = 0; i < files.length; i++) {
                        if (files[i].getAttachmentType() == "FILE" && files[i].getTitle().indexOf(".switch") > -1) {

                            var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

                            $(event.messageView.getBodyElement()).find("div > div > table").
                                replaceWith("<div class='egress_loadingMessage'>Decrypting message... </div>");

                            files[i].getDownloadURL().then(function (e) {
                                $.get({
                                        url: e.toString()
                                    })
                                    .done(function (xmlHttp) {
                                        $(event.messageView.getBodyElement()).find('.egress_loadingMessage').
                                            replaceWith("<div class='egress_loadingMessage'>Decrypted message reads:</div>");

                                        $(event.messageView.getBodyElement()).find('.egress_loadingMessage').
                                            append("<div>" + xmlHttp + "</div>");

                                    })
                                    .fail(function () {
                                        console.log("Error loading file...");
                                    })
                            });
                        }
                    }
                }
            });
        });

        sdk.Compose.registerComposeViewHandler(function (composeView) {
            // a compose view has come into existence, do something with it!
            composeView.addButton({
                title: "Encode with switch",
                iconUrl: 'http://s12.postimg.org/6da0b7cnx/Logomakr_19_MEHn.png',
                onClick: function (event) {
                    var html = switch_html;
                    var blob = new File([event.composeView.getHTMLContent()], "encrypted.switch", {type: 'application/octet-binary'})
                    event.composeView.setBodyHTML(html);
                    event.composeView.attachFiles([blob]);
                }
            });
            composeView.on('presending', function (event) {
                console.log("this is pre-sending event");
                //event.cancel();
            });
        });
    }
);

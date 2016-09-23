InboxSDK.load('1', 'sdk_Hackotron-BE_a4e83dfe8a').then(sdk => {
        sdk.Conversations.registerMessageViewHandler(messageView => {
            messageView.on('load', event => {
                if (event.messageView.getViewState() == "EXPANDED") {
                    const files = event.messageView.getFileAttachmentCardViews();

                    for (let i = 0; i < files.length; i++) {
                        if (files[i].getAttachmentType() == "FILE" && files[i].getTitle().indexOf(".switch") > -1) {

                            const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

                            $(event.messageView.getBodyElement()).find("div > div > table").
                                replaceWith("<div class='egress_loadingMessage'>Decrypting message... </div>");

                            files[i].getDownloadURL().then(e => {
                                $.get({
                                        url: e.toString()
                                    })
                                    .done(xmlHttp => {
                                        $(event.messageView.getBodyElement()).find('.egress_loadingMessage').
                                            replaceWith(switch_decrypt_header.replace("[[DECRYPTED]]",moment().format('MMMM Do YYYY, h:mm:ss a')));

                                        $(event.messageView.getBodyElement()).find('.egress_loadingMessage').
                                            append("<div>" + decrypt(xmlHttp) + "</div>");
                                    })
                                    .fail(() => {
                                        console.log("Error loading file...");
                                    })
                            });
                        }
                    }
                }
            });
        });

        sdk.Compose.registerComposeViewHandler(composeView => {
            // a compose view has come into existence, do something with it!
            composeView.addButton({
                title: "Encode with switch",
                iconUrl: 'http://s12.postimg.org/6da0b7cnx/Logomakr_19_MEHn.png',
                onClick: event => {
                    const html = switch_html;
                    const blob = new File([encrypt(event.composeView.getHTMLContent())], "encrypted.switch", {type: 'application/octet-binary'});
                    event.composeView.setBodyHTML(html);
                    event.composeView.attachFiles([blob]);
                }
            });
            composeView.on('presending', event => {
                console.log("this is pre-sending event");
                //event.cancel();
            });
        });
    }
);

InboxSDK.load('1', 'sdk_Hackotron-BE_a4e83dfe8a').then(function(sdk){

	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){

		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "My Nifty Button!",
			iconUrl: 'http://s12.postimg.org/6da0b7cnx/Logomakr_19_MEHn.png',
			onClick: function(event) {

				//window.alert(event.composeView.getHTMLContent())

				var html = '<table width="100%" border="0" style="border: 1px solid #DADADA; border-bottom: 1px solid #FF6633;" id="switch-email-body">'+ 
'<tr><td width="235"><div>&nbsp;</div></td>'+
'<td align="center"><center><img width="204" height="72" src="http://switch-image-hosting.s3.amazonaws.com/switch_logo.jpg" /></center></td>'+
'<td width="235"><div>&nbsp;</div></td>'+
'</tr>'+
'<tr>'+
'<td width="235"></td>'+
'<td align="center" valign="middle"><center>'+
'	<!-- SWITCH_VIEW_READER_1 -->'+
'	<p style="font-size: 1em; font-weight: bold;font-family: Calibri, Arial, Helvetica, sans-serif;">This email has been sent to you securely using Egress Switch</p>'+
'	<table width="450" border="0" style="border: 0px;">'+
'	<tr>'+
'	  <td width="160" style="text-align:center;vertical-align:middle;""><p><img width="128" height="128" src="http://switch-image-hosting.s3.amazonaws.com/secure-email.gif" /></p></td>'+
'	  <td style="vertical-align:middle;">'+
'        <p style="font-size: .9em;font-family: Calibri, Arial, Helvetica, sans-serif;">If you have Switch installed, simply open the attachment.</p>'+
'	    <p style="font-size: .9em;font-family: Calibri, Arial, Helvetica, sans-serif;">Alternatively, forward this email to <a href="#" style="text-decoration: none; color: #000000; cursor: default;">[[READEROPENEMAIL]]</a> or visit <a href="[[READERURL]]">Switch Web Access</a>.</p>'+
'	  </td>'+
'	</tr>'+
'	</table>'+
'    <p style="font-size: .8em; ;font-family: Calibri, Arial, Helvetica, sans-serif">Regular user? <a href="http://www.egress.com/integrated-access/">Download</a> our <b>free</b> desktop or mobile apps.</p>'+
'	<!-- SWITCH_VIEW_READER_2 =='+
'	<p style="font-size: .9em;font-family: Calibri, Arial, Helvetica, sans-serif;">&nbsp;This is a secure email. Double click the message to open it.</p>'+
'	<img src="http://switch-image-hosting.s3.amazonaws.com/egress/double-click-email.gif" alt="" width="400" height="63">'+
'    == SWITCH_VIEW_READER_3 -->'+
'	<p style="font-size: .8em; ;font-family: Calibri, Arial;">Having problems accessing the email? <a href="http://www.egress.com/support-articles-getting-started/">Click Here</a></p><p>&nbsp;</p>'+
'</center></td>'+
'<td width="235"></td>'+
'</tr>'+
'<tr>'+
' <td colspan="3" style="border-top: 2px solid #FF6633; border-bottom: 2px solid #FF6633; padding: 7px 20px 7px 20px;" align="center"><center>'+
'  <p style="font-size: .6em; font-family: Calibri, Arial; color: #808080;"><b>Confidentiality Notice: </b>This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the sender.</p>'+
'</center></td>'+
'</tr>'+
'<tr>'+
' <td colspan="3" style="padding:7px 5px 0px 5px; text-align: right;">'+
'  <p style="font-size: .6em; ;font-family: Calibri, Arial; color: #808080"><b>&#169; Copyright 2007-2011 Egress Software Technologies Ltd.</b></p>'+
' </td>'+
'</tr>';
		var html_spinner = 
		'<div class="row">' +
			'<div class="col-md-12">' +
				'<div class="card">' +
				'<div class="card-body card-padding">' +
					'<table>' +
						'<tr >' +
							'<td style="width:60px;">' +
								'<div class="preloader pls-egress-orange" style="display: inline-block;">' +
									'<svg class="pl-circular" viewBox="25 25 50 50">' +
										'<circle class="plc-path" cx="50" cy="50" r="20" />' +
									'</svg>' +
								'</div>' +
							'</td>' +
							'<td style="vertical-align:middle;">' +
							'</td>' +
						'</tr>' +
					'</table>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>'

				//var blob = new Blob([event.composeView.getHTMLContent()], {type : 'application/octet-binary', name:"ecrypted.switch",fileName:"ecrypted.switch",file:"ecrypted.switch",file:"ecrypted.switch"});
				var blob = new File([event.composeView.getHTMLContent()],"ecrypted.switch",{type : 'application/octet-binary'})
				event.composeView.setBodyHTML(html_spinner);
				event.composeView.attachFiles([blob]);
				//event.composeView.insertTextIntoBodyAtCursor('Hello World!');
			},
		});
		composeView.on('presending', function(event) {
			console.log("this is pre-sending event");
			event.cancel();
		});
		
	});
	 sdk.Lists.registerThreadRowViewHandler(function(threadRowView){
		 var body = threadRowView.getBodyElement();
		 console.log(body);
	 });
	 sdk.Conversations.registerThreadViewHandler(function(threadView){
		 var subject = threadView.getSubject();
		 console.log(subject);
	 });
	 sdk.Conversations.registerMessageViewHandler(function(messageView){
		 var body = messageView.getBodyElement();
		 console.log(body);
	 });
	
	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
	  console.log(response.farewell);
	});
	});
}

);

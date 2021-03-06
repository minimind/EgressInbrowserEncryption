const switch_html = `<table width="100%" border="0" style="border: 1px solid #DADADA; border-bottom: 1px solid #FF6633;" id="switch-email-body">
        <tr><td width="235"><div>&nbsp;</div></td>
            <td align="center"><center><img width="204" height="72" src="http://switch-image-hosting.s3.amazonaws.com/switch_logo.jpg" /></center></td>
            <td width="235"><div>&nbsp;</div></td>
        </tr>
        <tr>
            <td width="235"></td>
            <td align="center" valign="middle"><center>
                <!-- SWITCH_VIEW_READER_1 -->
                <p style="font-size: 1em; font-weight: bold;font-family: Calibri, Arial, Helvetica, sans-serif;">This email has been sent to you securely using Egress Switch</p>
                <table width="450" border="0" style="border: 0px;">
                    <tr>
                        <td width="160" style="text-align:center;vertical-align:middle;""><p><img width="128" height="128" src="http://switch-image-hosting.s3.amazonaws.com/secure-email.gif" /></p></td>
                        <td style="vertical-align:middle;">
                            <p style="font-size: .9em;font-family: Calibri, Arial, Helvetica, sans-serif;">If you have Switch installed, simply open the attachment.</p>
                            <p style="font-size: .9em;font-family: Calibri, Arial, Helvetica, sans-serif;">Alternatively, forward this email to <a href="#" style="text-decoration: none; color: #000000; cursor: default;">open@switch.egress.com</a> or visit <a href="https://reader.egress.com">Switch Web Access</a>.</p>
                        </td>
                    </tr>
                </table>
                <p style="font-size: .8em; ;font-family: Calibri, Arial, Helvetica, sans-serif">Regular user? <a href="http://www.egress.com/integrated-access/">Download</a> our <b>free</b> desktop or mobile apps.</p>
                    <!-- SWITCH_VIEW_READER_2 ==
                        <p style="font-size: .9em;font-family: Calibri, Arial, Helvetica, sans-serif;">&nbsp;This is a secure email. Double click the message to open it.</p>
                        <img src="http://switch-image-hosting.s3.amazonaws.com/egress/double-click-email.gif" alt="" width="400" height="63">
                    == SWITCH_VIEW_READER_3 -->
                <p style="font-size: .8em; ;font-family: Calibri, Arial;">Having problems accessing the email? <a href="http://www.egress.com/support-articles-getting-started/">Click Here</a></p><p>&nbsp;</p>
                </center>
            </td>
            <td width="235"></td>
        </tr>
        <tr>
            <td colspan="3" style="border-top: 2px solid #FF6633; border-bottom: 2px solid #FF6633; padding: 7px 20px 7px 20px;" align="center"><center>
                <p style="font-size: .6em; font-family: Calibri, Arial; color: #808080;"><b>Confidentiality Notice: </b>This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the sender.</p>
                </center>
            </td>
        </tr>
        <tr>
            <td colspan="3" style="padding:7px 5px 0px 5px; text-align: right;">
                <p style="font-size: .6em; ;font-family: Calibri, Arial; color: #808080"><b>&#169; Copyright 2007-2011 Egress Software Technologies Ltd.</b></p>
            </td>
        </tr>
    </table>`;

const switch_decrypt_header = `<div class="egress_loadingMessage" style="padding:3px;font-size:10pt;font-family:Arial, Helvetica, sans-serif; margin-bottom:0.5em;">
<table id="deliveredEgressSwitch" border="0" cellspacing="0" cellpadding="0" width="98%" style='width:98%;border-collapse:collapse'><tr><td width="100%" valign="top" style='width:100%;background:#FF6633;padding:0 7pt 5.75pt 5.4pt'>
<p align="center" style="margin-bottom:.0001pt;text-align:center">
    <span style='font-size:10.0pt;font-family:"Arial","sans-serif";color:white'>This email, created by [[SWITCHID]], has been securely delivered using Egress Switch and was decrypted on [[DECRYPTED]]</span>
</p></td></tr></table></div>`;


const loading_message = `<div class="egress_loadingMessage">
            <table>
                <tr >
                    <td style="width:60px;">
                        <div class="preloader pls-egress-orange" style="display: inline-block;">
                            <svg class="pl-circular" viewBox="25 25 50 50">
                                <circle class="plc-path" cx="50" cy="50" r="20" />
                            </svg>
                        </div>
                    </td>
                    <td style="vertical-align:middle;">
                        Decrypting message...
                    </td>
                </tr>
            </table>
            <div>`;

const classification_dropdown = `
<div id="" class="aoD az6">
    <label for="" style="color: #777">Classification: <label>
  
    <select style="min-width: 300px">
        <option value="unlcassified">Unclassified.</option>
        <option value="protected">Encrypt Message and Attachments.</option>
    </select>
</div>`;
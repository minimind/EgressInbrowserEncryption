Skip to content
 
 
Search…
All gists
GitHub
New gist @SeanLiEgressHackathon
  Star 12
  Fork 6
  @omarstreakomarstreak/background.js
Last active 8 days ago
Embed  
<script src="https://gist.github.com/omarstreak/7908035c91927abfef59.js"></script>
  Download ZIP
 Code  Revisions 3  Stars 12  Forks 6
Chrome API Extension
Raw
 background.js
//oauth2 auth
chrome.identity.getAuthToken(
	{'interactive': true},
	function(){
	  //load Google's javascript client libraries
		window.gapi_onload = authorize;
		loadScript('https://apis.google.com/js/client.js');
	}
);

function loadScript(url){
  var request = new XMLHttpRequest();

	request.onreadystatechange = function(){
		if(request.readyState !== 4) {
			return;
		}

		if(request.status !== 200){
			return;
		}

    eval(request.responseText);
	};

	request.open('GET', url);
	request.send();
}

function authorize(){
  gapi.auth.authorize(
		{
			client_id: '<clientid>',
			immediate: true,
			scope: 'https://www.googleapis.com/auth/gmail.modify'
		},
		function(){
		  gapi.client.load('gmail', 'v1', gmailAPILoaded);
		}
	);
}

function gmailAPILoaded(){
    //do stuff here
}


/* here are some utility functions for making common gmail requests */
function getThreads(query, labels){
  return gapi.client.gmail.users.threads.list({
		userId: 'me',
		q: query, //optional query
		labelIds: labels //optional labels
	}); //returns a promise
}

//takes in an array of threads from the getThreads response
function getThreadDetails(threads){
  var batch = new gapi.client.newBatch();

	for(var ii=0; ii<threads.length; ii++){
		batch.add(gapi.client.gmail.users.threads.get({
			userId: 'me',
			id: threads[ii].id
		}));
	}

	return batch;
}

function getThreadHTML(threadDetails){
  var body = threadDetails.result.messages[0].payload.parts[1].body.data;
	return B64.decode(body);
}

function archiveThread(id){
  var request = gapi.client.request(
		{
			path: '/gmail/v1/users/me/threads/' + id + '/modify',
			method: 'POST',
			body: {
				removeLabelIds: ['INBOX']
			}
		}
	);

	request.execute();
}
Raw
 base64.js
(function(){

    /*
  Copyright Vassilis Petroulias [DRDigit]
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
         http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  var B64 = {
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      urlSafeAlphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
      lookup: null,
      ie: /MSIE /.test(window.navigator.userAgent),
      ieo: /MSIE [67]/.test(window.navigator.userAgent),
      encode: function (s) {
          var buffer = B64.toUtf8(s),
              position = -1,
              len = buffer.length,
              nan0, nan1, nan2, enc = [, , , ];
          if (B64.ie) {
              var result = [];
              while (++position < len) {
                  nan0 = buffer[position];
                  nan1 = buffer[++position];
                  enc[0] = nan0 >> 2;
                  enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
                  if (isNaN(nan1))
                      enc[2] = enc[3] = 64;
                  else {
                      nan2 = buffer[++position];
                      enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                      enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
                  }
                  result.push(B64.alphabet.charAt(enc[0]), B64.alphabet.charAt(enc[1]), B64.alphabet.charAt(enc[2]), B64.alphabet.charAt(enc[3]));
              }
              return result.join('');
          } else {
              var result = '';
              while (++position < len) {
                  nan0 = buffer[position];
                  nan1 = buffer[++position];
                  enc[0] = nan0 >> 2;
                  enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
                  if (isNaN(nan1))
                      enc[2] = enc[3] = 64;
                  else {
                      nan2 = buffer[++position];
                      enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                      enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
                  }
                  result += B64.alphabet[enc[0]] + B64.alphabet[enc[1]] + B64.alphabet[enc[2]] + B64.alphabet[enc[3]];
              }
              return result;
          }
      },
      decode: function (s) {
          if (s.length % 4)
              throw new Error("InvalidCharacterError: 'B64.decode' failed: The string to be decoded is not correctly encoded.");
          var buffer = B64.fromUtf8(s),
              position = 0,
              len = buffer.length;

          if (B64.ieo) {
              var result = [];
              while (position < len) {
                  if (buffer[position] < 128)
                      result.push(String.fromCharCode(buffer[position++]));
                  else if (buffer[position] > 191 && buffer[position] < 224)
                      result.push(String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63)));
                  else
                      result.push(String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63)));
              }
              return result.join('');
          } else {
              var result = '';
              while (position < len) {
                  if (buffer[position] < 128)
                      result += String.fromCharCode(buffer[position++]);
                  else if (buffer[position] > 191 && buffer[position] < 224)
                      result += String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63));
                  else
                      result += String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63));
              }
              return result;
          }
      },
      toUtf8: function (s) {
          var position = -1,
              len = s.length,
              chr, buffer = [];
          if (/^[\x00-\x7f]*$/.test(s)) while (++position < len)
              buffer.push(s.charCodeAt(position));
          else while (++position < len) {
              chr = s.charCodeAt(position);
              if (chr < 128)
                  buffer.push(chr);
              else if (chr < 2048)
                  buffer.push((chr >> 6) | 192, (chr & 63) | 128);
              else
                  buffer.push((chr >> 12) | 224, ((chr >> 6) & 63) | 128, (chr & 63) | 128);
          }
          return buffer;
      },
      fromUtf8: function (s) {
          var position = -1,
              len, buffer = [],
              enc = [, , , ];

          var alphabet = B64.alphabet;

          var lookup = 'lookup';
          if(s.indexOf('-') > -1 || s.indexOf('_') > -1){
            alphabet = B64.urlSafeAlphabet;
            lookup = 'urlSafeLookup';
          }

          if (!B64[lookup]) {
              len = B64.alphabet.length;
              B64[lookup] = {};
              while (++position < len)
                  B64[lookup][alphabet.charAt(position)] = position;
              position = -1;
          }
          len = s.length;
          while (++position < len) {
              enc[0] = B64[lookup][s.charAt(position)];
              enc[1] = B64[lookup][s.charAt(++position)];
              buffer.push((enc[0] << 2) | (enc[1] >> 4));
              enc[2] = B64[lookup][s.charAt(++position)];
              if (enc[2] == 64)
                  break;
              buffer.push(((enc[1] & 15) << 4) | (enc[2] >> 2));
              enc[3] = B64[lookup][s.charAt(++position)];
              if (enc[3] == 64)
                  break;
              buffer.push(((enc[2] & 3) << 6) | enc[3]);
          }
          return buffer;
      }
  };
  this.B64 = B64;

}).call(this);
Raw
 manifest.json
{
  "name": "Gmail API Extension",
  "version": "1.0",
  "manifest_version": 2,
  "description": "Gmail API Extension",
  "permissions": [
    "identity",
    "*://*.google.com/*"
  ],
  "background": {
    "scripts": ["base64.js", "background.js"]
  },
  "content_security_policy": "script-src https://*.google.com 'unsafe-eval'; object-src 'self'",
  "oauth2": {
    "client_id": "<clientid>",
    "scopes": [
      "https://www.googleapis.com/auth/gmail.modify"
    ]
  }
}

 @SeanLiEgressHackathon
  
         
Write  Preview

Leave a comment
Attach files by dragging & dropping,  Choose Files selecting them, or pasting from the clipboard.
 Styling with Markdown is supported
Comment
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help
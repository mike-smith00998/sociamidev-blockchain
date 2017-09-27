/*
    author: Alexander Zolotov
    Helper class for fetching response from remote API
*/

  /*
    @url: API url
    @listener(result): callback to invoke on success
    @convertToArrayOfObjects: should we convert result to array of objects, or return plain xml
 */

import 'whatwg-fetch'

  const requestApiData = function (url, listener) {

    const headers = new Headers();
    headers.set('Content-Type', 'text/json');

    //use fetch API to get response from remote API
    fetch(url, headers)  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' +  response.status);
            listener();
          return;  
        }
        //upon success - invoke callback, and pass 'result' as an argument
        response.text().then(function(text) {
            let eventBrightItems = [];

            if (text != "") {
              let parsedJSON = JSON.parse(text);
              
              let events = parsedJSON.events;
              
              for (var event in events) {
                    var name = events[event].name.html;
                    var description = events[event].description.text;
                    var start = events[event].start.utc;
                    var end = events[event].end.utc;
                    var status = events[event].status;
                    var url = events[event].url;
                    var logoUrl = "";
  
                    if (events[event].logo) {
                      logoUrl = events[event].logo.url;
                    }
  
                    var eventBrightItem = {};
  
                    eventBrightItem["name"] = name;
                    eventBrightItem["description"] = description;
                    eventBrightItem["start"] = start;
                    eventBrightItem["end"] = end;
                    eventBrightItem["status"] = status;
                    eventBrightItem["url"] = url;
                    eventBrightItem["logoUrl"] = logoUrl;
  
                    eventBrightItems.push(eventBrightItem);
              }
  
            }
            
          listener(eventBrightItems);
        });
      }  
    )  
    .catch(function(err) {  
      console.log('Fetch Error :-S', err);
      listener();
    });
  }

module.exports.requestApiData = requestApiData;
// notableErrors = {
//   "500": 0.0,
//   "504": 0.0
// }
notableErrors = {}

siteSettings = []
alertSettings = []

chrome.storage.sync.get(['codeRed'], function(items) {
  siteSettings = JSON.parse(items.codeRed)
  init()
});

function init(){
  for (var i = siteSettings.length - 1; i >= 0; i--) {
    alertSettings = alertSettings.concat(siteSettings[i].allSettings)

  }

  setTimeout(() => {
    for (var i = alertSettings.length - 1; i >= 0; i--) {
      var alertSetting = alertSettings[i]

      if (alertSetting.selector.trim().length > 1) {
        $(alertSetting.selector)[1].addEventListener("DOMSubtreeModified",function(){

          var alertSetting = this;
          setTimeout(() => {
            for (var i = document.getElementsByClassName("graph-legend-series").length - 1; i >= 0; i--) {
              var value = document.getElementsByClassName("graph-legend-series")[i]
              var errorCode = value.childNodes[1].textContent.trim()
              containsLetter = true
              if (alertSetting.contains.trim().length > 0 && !errorCode.includes(alertSetting.contains.trim())) {
                containsLetter = false
              }
              if (containsLetter) {
                var errorPercent = value.childNodes[4].textContent.trim()
                var errorPercentFloat = parseFloat(errorPercent)
                var prevErrorPercentFloat = notableErrors[alertSetting.name]
                prevErrorPercentFloat = prevErrorPercentFloat == null ? 0.0 : prevErrorPercentFloat
                var conditionIsValid = false

                if (prevErrorPercentFloat < errorPercentFloat) {
                  if (alertSetting.valueType == "greater_than") {
                    conditionIsValid = errorPercentFloat >= parseFloat(alertSetting.threshold)
                  } else {
                    conditionIsValid = errorPercentFloat <= parseFloat(alertSetting.threshold)
                  }
                  if (conditionIsValid) {
                    // fire api
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                      if (xhr.readyState == XMLHttpRequest.DONE) {
                        // alert(xhr.responseText);
                        console.log(xhr.responseText);
                      }
                    }
                    xhr.open('GET', 'http://localhost:5000/pinging?type=' + alertSetting.alertType, true);
                    xhr.send(null);
                    
                  }
                }
                notableErrors[alertSetting.name] = errorPercentFloat
                
              }

              // if (Object.keys(notableErrors).includes(errorCode)) {
              //   errorPercent = value.childNodes[3].textContent.trim()
              //   errorPercentFloat = parseFloat(errorPercent)
              //   prevErrorPercentFloat = notableErrors[errorCode]
              //   if (prevErrorPercentFloat < errorPercentFloat) {
              //     // fire api
              //     var xhr = new XMLHttpRequest();
              //     xhr.onreadystatechange = function() {
              //       if (xhr.readyState == XMLHttpRequest.DONE) {
              //         // alert(xhr.responseText);
              //         console.log(xhr.responseText);
              //       }
              //     }
              //     xhr.open('GET', 'http://localhost:5000/pinging', true);
              //     xhr.send(null);
              //   }
              //   notableErrors[errorCode] = errorPercentFloat
              // }


            }
          }, 300)
        }.bind(alertSetting));
        
      }

    }
    
  }, 5000)
  
}

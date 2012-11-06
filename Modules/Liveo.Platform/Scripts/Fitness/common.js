

$(document).ready(function () {
    $('a[rel]')
           .overlay({
               // some mask tweaks suitable for modal dialogs
               mask: {
                   color: '#ebecff',
                   loadSpeed: 200,
                   opacity: 0.9
               },

               closeOnClick: false,
               closeOnEsc: false
           })
           .click(function () { overlayElem = $(this); });
    $('[link="modalokbutton"]').click(function () { CM.log('ok'); overlayElem.overlay().close(); });
    $('[link="modalcancelbutton"]').click(function () { CM.log('cancel'); overlayElem.overlay().close(); });
});

if (!window.CM) window.CM = {};

CM.log = function (message) {
    try {
        console.log(message);
    } catch (err) { }
};

CM.overlayElemStack = [];
CM.closeDialog = function () {
    var overlayElem = CM.overlayElemStack.pop();
    if (overlayElem)
        overlayElem.overlay().close();
    if (CM.overlayElemStack.length > 0)
        CM.overlayElemStack[CM.overlayElemStack.length - 1].overlay().load();
}


//*********************************************************************
// CM.enumerateObject()
// Walk an object and display its property values
//*********************************************************************
CM.enumerateObject = function (object, path) {
    if (!path) path = '[base]';

    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            if (typeof object[property] === "object")
                CM.enumerateObject(object[property], path + '.' + property);
            else
                document.console.log(path + '.' + property + '=' + object[property]);
        }
    }
};

CM.ajax = function (caller, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        data: data,
        dataType: "json",
        type: "POST",
        cache: false,
        success: function (callResult) {
            document.console.log('AJAX SUCCESS ------------------------------------------------------------');
            CM.enumerateObject(callResult);

            if (callResult.success) {
                if (typeof successCallback === 'function')
                    successCallback(callResult, caller);
            }
            else {
                if (typeof errorCallback === 'function')
                    errorCallback(callResult, caller);
                else
                    CM.showAlert(callResult.error, 'An error has occurred');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            document.console.log('AJAX ERROR ------------------------------------------------------------');
            CM.showAlert(textStatus, 'An error has occurred');
        }
    });
};

CM.showAlert = function (message, title) {

    //			if (title == undefined)
    //				title = '';

    alert(message);

    //			$('#modalDialog').html('<label>' + message + '</label>');
    //			$('#modalDialog').dialog('option', 'title', title);
    //			$('#modalDialog').dialog('open');
}

CM.handleSpinner = function (spinner) {
    if (spinner) {
        $("#" + spinner).attr("class", "invisible");
    }
}

CM.showSpinner = function (spinner) {
    if (spinner) {
        $("#" + spinner).attr("class", "notinvisible");
    }
}

CM.hideSpinner = function (spinner) {
    if (spinner) {
        $("#" + spinner).attr("class", "invisible");
    }
}


CM.handleViews = function (divClose, divOpen, spinner) {
    if (divClose && divOpen) {
        $("#" + divClose).attr("class", "invisible");
        $("#" + divOpen).attr("class", "notinvisible");
    }
    if (spinner)
        CM.handleSpinner(spinner);
}

CM.showSpin = function (spinner) {
    $("#" + spinner).attr("class", "notinvisible");
}

CM.hideSpin = function (spinner) {
    $("#" + spinner).attr("class", "invisible");
}

CM.hide = function (search) {
    $('[id^="' + search + '"]').attr("class", "invisible");
}

CM.hideDiv = function (div) {
    $("#" + div).attr("class", "invisible");
}

CM.showDiv = function (div) {
    $("#" + div).attr("class", "notinvisible");
}

CM.cont = function (ul, ld, slide) {
    if (ul) $("#" + ul).attr("class", "invisible");

    if (ld) {
        if (slide) {
            $("#" + ld).show("slide", { direction: "left" }, 1000);
        }
        else $("#" + ld).attr("class", "notinvisible");
    }
}


//dd is select element
// data - json of key/value pairs
CM.fillDropdown = function (optionId, $element, data, selectedValue) {
    var option = '<select id=' + "'" + optionId + "'" + '>';
    for (var i = 0; i < data.length; i++) {
        var item = data[i];

        if (item.Key == selectedValue)
            option += '<option value="' + item.Key + '" selected>' + item.Value + '</option>';
        else
            option += '<option value="' + item.Key + '">' + item.Value + '</option>';
    }
    option += '</select>';

    $element.html(option);
}

CM.updateDiv = function (innerText, $div) {
    $div.innerText = innerText
}

CM.makeSpinner = function ($element, spinnerId) {
    $element.append("<div class='inl' id='" + spinnerId + "' class='notinvisible'><img width='10%' id='img-spinner' src='/Images/waiting.gif' alt='Loading' /> </div>");
}

CM.removeSpinner = function (spinnerId) {
    $('#' + spinnerId).remove();
}

CM.slideTransition = function (from, to, dir) {
    var duration = 150;
    switch (dir) {
        case 'slidenext':
            $('[link="' + from + '"]').hide('slide', { direction: 'left' }, duration);
            $('[link="' + to + '"]').show('slide', { direction: 'right' }, duration);
            break;
        case 'slideprev':
            $('[link="' + from + '"]').hide('slide', { direction: 'right' }, duration);
            $('[link="' + to + '"]').show('slide', { direction: 'left' }, duration);
            break;
    }
}



CM.fadeTransition = function (from, to, duration) {
    var dur = 100;
    if (duration) {
        dur = duration;
    } 
    $('[link="' + from + '"]').fadeOut(dur);
    $('[link="' + to + '"]').fadeIn(dur);
}

CM.hookLink = function (id, effect, from, to) {
    switch (effect) {
        case 'popup':
            $('[link="' + id + '"]').click(function () {

                $('[link="' + to + '_link"]').click();
                
            });
           
            break;
        case 'fade':
            $('[link="' + id + '"]').click(function () {
                CM.fadeTransition('' + from + '', '' + to + '');
            });
            break;
        case 'slidenext':
        case 'slideprev':
            $('[link="' + id + '"]').click(function () {
                CM.slideTransition('' + from + '', '' + to + '', effect);
            });
            break;
    }
}

CM.markSelection = function ($someDiv, useThis, selected) {
    $(".readyForPicking").removeClass("gps_ring");
    $(".readyForPicking").text(useThis);
    $someDiv.addClass('gps_ring');
    $someDiv.text(selected + " SELECTED");
}


//Yes/No viewmodel
CM.yesNoModel = function() {
    var _self = this;
    this.Answer = ko.observable("UNDEFINED");
}
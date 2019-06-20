(function() {
    var Bastille = new EventTarget();
    var preventNextPopstate = false;
    var backButtonDefaultEnabled = true;

    window.addEventListener('popstate', function (event) {
        if (preventNextPopstate) {
            preventNextPopstate = false;
            return;
        }
    
        var state = event.state || {};
    
        if (backButtonDefaultEnabled) {
            // Go back **enough** times, so that the page is left. Most of the time, this is only necessary once.
            // By the way, while (true) would crash the browser.
            var i = 1;
            while (getCurrentHistoryState().isBaseState && i--) {
                preventNextPopstate = true;
                history.back();
            }
        } else if (state.isBaseState) {
            // Upon going back, go forward immediately afterwards.
            history.forward();
            dispatchEvent();
        }
    });

    function dispatchEvent() {
        Bastille.dispatchEvent(new Event('back'));
        if (Bastille.onback) Bastille.onback();
    }
    
    function getCurrentHistoryState() {
        return history.state || {};
    }    
    
    // Disable the default back button functionality. The back button now does not close the window.
    function enable() {
        if (!backButtonDefaultEnabled) return;
    
        var state = getCurrentHistoryState();
    
        backButtonDefaultEnabled = false;
    
        if (state.isBaseState) {
            history.forward();
        } else if (!state.isForwardState) {
            history.replaceState({isBaseState: true}, '');
            history.pushState({isForwardState: true}, '');
        }
    }
    
    // Enable the default back button functionality. The back button now closes the window again.
    function disable() {
        if (backButtonDefaultEnabled) return;
    
        backButtonDefaultEnabled = true;
    }

    function init() {
        var state = getCurrentHistoryState();
    
        if (state.isBaseState) {
            preventNextPopstate = true;
            history.forward();
        }
    }
    init();

    Bastille.enable = enable;
    Bastille.disable = disable;

    window.Bastille = Bastille;
})();
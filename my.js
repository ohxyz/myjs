( function( my ) {

    if ( my !== undefined ) {

        window.alert( 'window.my is defined! Another namespace required.' );
        return;
    }
    else {

        window.my = {};
    }


    /* Poll until condition is met
     *
     * @param { function } conditionCallback - function returns true or false
     * @param { number } interval - poll every `interval` seconds, default 100
     * @param { number } max - maximum times it polls, default: 50
     */
    function pollWithCondition( conditionCallback, onConditionMet, interval, max ) {

        var interval = ( typeof interval === 'number' ? interval : 100 );
        var max = ( typeof max === 'number' ? max : 50 );

        var count = 0;

        function poll() {

            if ( conditionCallback() === true ) {

                onConditionMet();
            }
            else {

                if ( count < max ) {

                    setTimeout( poll, interval );
                    count ++;
                }
            }
        }

        poll();
    }

    /* Exmample: ifDefined( window.jQuery, window._ )
     *
     */
    function ifDefined() {

        for ( var i = 0; i < arguments.length; i ++ ) {

            var obj = arguments[ i ];

            if ( obj === undefined ) {

                return false;
            }
        }

        return true;

    }

    // Assignment
    window.my = {

        if: pollWithCondition,
        ifDefined: ifDefined
    };


} )( window.my );
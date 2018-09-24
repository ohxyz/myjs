/**
 * A collection of utilities intented to be used in a browser
 *
 * @author Ohxyz
 * @namespace my
 */
( function( my ) {

    if ( my !== undefined ) {

        window.alert( 'window.my is defined! Another namespace required.' );
        return;
    }
    else {

        window.my = {};
    }

    /** 
     * Poll until condition is met
     *
     * @param { function } conditionCallback - Function returns true or false
     * @param { function } onConditionMet - Run when conditionCallback returns true
     * @param { number } interval - Poll every `interval` seconds, default to 100
     * @param { number } max - Maximum trials of polling, default to 50
     * @returns { undefined } Undefined
     *
     * @memberof my
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

    /**
     * Example: ifDefined( window.jQuery, window._ )
     * 
     * @param { any } arguments - anything.
     * @returns { boolean } If one of the arguments is undefined, then returns false.
     *
     * @memberof my
     */
    function ifDefined() {

        for ( var i = 0; i < arguments.length; i ++ ) {

            if ( arguments[ i ] === undefined ) {
                return false;
            }
        }

        return true;
    }

    // Assignment
    window.my = {

        pollWithCondition: pollWithCondition,
        ifDefined: ifDefined
    };

} )( window.my );
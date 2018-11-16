/**
 * A collection of utilities intented to be used in a browser
 *
 * @author Intfis
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
     * @param { number } interval - Poll every interval seconds, default to 100
     * @param { number } max - Maximum trials of polling, default to 50
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

    /**
     * Check if it is an object like { a: 1, b: 2 }, not function, null, array, etc 
     *
     * @memberof my
     * @link https://stackoverflow.com/questions/8834126/how-to-efficiently-check-if-variable-is-array-or-object-in-nodejs-v8
     */
    function isRealObject( a ) {
        return ( !!a ) && ( a.constructor === Object );
    };

    /** 
     * Generate a string contains random characters
     *
     * @returns { string } Random string
     * @memberof my
     */
    function generateRandomString() {

        return Math.random().toString( 36 ).slice( 2 );
    }

    /**  
     * Set a variable with a value, if the default value is undefined
     * 
     * @returns { any } Either the defaultValue or the otherValue
     * @memberof my
     */
    function setDefault( defaultValue, otherValue ) {
        
        if ( defaultValue === undefined ) {
            
            return otherValue;
        }
        
        return defaultValue;
    }

    /**
     * Check a DOM element is the descendant of another element
     *
     * @memberof my
     */
    function isDescendant( childElem, parentElem ) {
        
        let node = childElem.parentNode;
        
        while ( node !== null && node.parentNode !== undefined ) {
            
            if ( node === parentElem ) {

                return true;
            }
            
            node = node.parentNode;
        }
        
        return false;
    }

    /** 
     * Check if a variable is an array and must have at least 1 item.
     *
     * @memberof my
     */
    function isNotEmptyArray( arg ) {

        return Array.isArray( arg ) && arg.length > 0;
    }

    /**
     * Compare two arrays whose items are not objects
     *
     * @returns {boolean} True if two arrays are same, otherwise false.
     * @memberof my
     *
     */
    function compareArrayOfNonObjects( array1, array2 ) {

        if ( Array.isArray( array1 ) === false || Array.isArray( array2 ) === false ) {

            throw new TypeError( 'Both arguements should be arrays.' );
        }
        else if ( array1.length !== array2.length ) {

            return false;
        }

        for ( let i = 0 ; i < array1.length ; i ++ ) {

            let itemOfArray1 = array1[ i ];
            let itemOfArray2 = array2[ i ];

            if ( typeof itemOfArray1 === 'number'
                    && typeof itemOfArray2 === 'number'
                    && isNaN( itemOfArray1 ) === true 
                    && isNaN( itemOfArray2 ) === true ) {

                continue;
            }
            else if ( itemOfArray1 === null || itemOfArray2 === null ) {

                // Do nothing
            }
            else if ( typeof itemOfArray1 === 'object' || typeof itemOfArray2 === 'object' ) {

                throw new Error( 'This function should not contain an object or an array.' );
            }

            if ( itemOfArray1 !== itemOfArray2 ) {

                return false;
            }
        }

        return true;
    }

    /**
     * Given an array, find if it is an item in another array and return the index.
     *
     * @returns {number} If not found, return -1
     * @memberof my
     */
    function findIndexFromArrayOfArray( item, arrayOfArray ) {

        if ( Array.isArray( arrayOfArray ) === false ) {

            throw new TypeError( '2nd argument should be an array.' );
        }
        else if ( Array.isArray( item ) === false ) {

            return -1;
        }

        for ( let i = 0; i < arrayOfArray.length; i ++ ) {

            let array = arrayOfArray[ i ];

            try { 

                if ( compareArrayOfNonObjects( item, array ) === true ) {

                    return i;
                }
            }
            catch ( error ) {

                return -1;
            }

        }

        return -1;
    }

    /**
     * Get the union results of two arrays of array
     *
     * @memberof my
     */
    function unionArrayOfArray( array1, array2 ) {

        let union = array2.slice();

        for ( let eachArray of array1 ) {

            let index = findIndexFromArrayOfArray( eachArray, array2 );

            if ( index === -1 ) {

                union.push( eachArray.slice() );
            }
        }

        return union;
    }

    /**
     * If an item is in the array, then remove it, otherwise add it into the array
     *
     * @memberof my
     */
    function toggleArrayItem( item, array ) {
        
        let index = array.indexOf( item );
        
        if ( index === -1 ) {
            
            array.push( item );
        }
        else {
            
            array.splice( index, 1 );
        }
        
    }

    /**
     * Use JSON methods to copy an object
     *
     * @memberof my
     */
    function JSONCopy( obj ) {
        
        return JSON.parse( JSON.stringify( obj ) );
    }

    /**
     * Produce the intersection result of two arrays
     *
     * @memberof my
     */
    function intersectArrays( array, array2 ) {
        
        let newArray = array.filter( el => {
            
            if ( array2.indexOf( el ) !== -1  ) {
                
                return true;
            }
            
            return false;
        } );
        
        return newArray;
    }

    /**
     * Check a variable that has number content
     *
     * @memberof my
     */
    function isNumber( obj ) {
        
        if ( isNaN( obj ) === true ) {
            
            return false;
        }
        
        return true;
    }

    /**
     * Sleep for some time in seconds
     *
     * @param {number} seconds - How many seconds to sleep/wait/delay
     * @memberof my
     */
    function sleep( seconds ) {

        var start = new Date().getTime();

        while( true ) {

            var now = new Date().getTime();

            if ( ( now - start ) > seconds * 1000 ) {
                
                break;
            }
        }
    }

    /**
     * Give an array of objects, sort by one of the keys in the object
     *
     * @memberof my
     */
    function sortArrayByObjectKey( options, array ) {
        
        let defaultSettings = {
            
            type: 'quick',
            order: 'ascend',
            objectKey: '',
            secondObjectKey: ''
        };
        
        let settings = Object.assign( defaultSettings, options );
        let objectKey = settings.objectKey;
        let secondObjectKey = settings.secondObjectKey;
        
        function sortAscend( item1, item2 ) {
            
            let a = item1[ objectKey ];
            let b = item2[ objectKey ];
            
            if ( a === null ) {
                
                a = '';
            }
            
            if ( b === null ) {
                
                b = '';
            }
            
            if ( a === b && settings.type === 'normal' ) { 
                
                a = item1[ secondObjectKey ];
                b = item2[ secondObjectKey ];
            }

            
            if ( isNumber( a ) === true && isNumber( b ) === true )
            {
                return a - b;
            }
            
            return a.localeCompare( b );
        }
        
        function sortDescend( item1, item2 ) {
            
            return sortAscend( item2, item1 );
        }
        
        let sortFn = sortAscend;
        
        if ( settings.order === 'descend'  ) {
            
            sortFn = sortDescend;
        }

        array.sort( sortFn );
        
        return array;
    }

    // Assignment
    window.my = {

        pollWithCondition: pollWithCondition,
        ifDefined: ifDefined
    };

} )( window.my );
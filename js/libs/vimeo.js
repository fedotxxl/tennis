(function($) {
    //$.vUrlToObject($.vObjectToUrl({a: {b: ['1:2', 'hello?world'], c: '=)))'}}))

    var vimeo = {};
    var ARRAY_DEFAULT_DELIMITER = "+";

    function encode(obj) {
        return encodeURIComponent(obj);
    }

    function decode(value) {
        return decodeURIComponent(value);
    }

    function isArray(obj) {
        return ( Object.prototype.toString.call( obj ) === '[object Array]' );
    }

    function arrayToString(array, delimiter) {
        var params = [];
        var arrayLength = array.length;

        for (var i = 0; i < arrayLength; i++) {
            params.push(encode(array[i]));
        }

        return params.join(delimiter);
    }

    function flatten(target, opts) {
        opts = opts || {}

        var delimiter = opts.delimiter || '.'
        var output = {}

        function step(object, prev) {
            Object.keys(object).forEach(function(key) {
                var value = object[key]
                var isarray = opts.safe && Array.isArray(value)
                var type = Object.prototype.toString.call(value)
                var isobject = (
                    type === "[object Object]" ||
                        type === "[object Array]"
                    )

                var newKey = prev
                    ? prev + delimiter + key
                    : key

                if (!isarray && isobject) {
                    return step(value, newKey)
                }

                output[newKey] = value
            })
        }

        step(target)

        return output
    }

    function unflatten(target, opts) {
        opts = opts || {}

        var delimiter = opts.delimiter || '.'
        var result = {}

        if (Object.prototype.toString.call(target) !== '[object Object]') {
            return target
        }

        // safely ensure that the key is
        // an integer.
        function getkey(key) {
            var parsedKey = Number(key)

            return (
                isNaN(parsedKey) ||
                    key.indexOf('.') !== -1
                ) ? key
                : parsedKey
        }

        Object.keys(target).forEach(function(key) {
            var split = key.split(delimiter)
            var key1 = getkey(split.shift())
            var key2 = getkey(split[0])
            var recipient = result

            while (key2 !== undefined) {
                if (recipient[key1] === undefined) {
                    recipient[key1] = (
                        typeof key2 === 'number' &&
                            !opts.object ? [] : {}
                        )
                }

                recipient = recipient[key1]
                if (split.length > 0) {
                    key1 = getkey(split.shift())
                    key2 = getkey(split[0])
                }
            }

            // unflatten again for 'messy objects'
            recipient[key1] = unflatten(target[key], opts)
        })

        return result
    }


    $.vObjectToUrl = function(obj, arrayDelimiter) {
        obj = flatten(obj, {safe: true});
        arrayDelimiter = arrayDelimiter || ARRAY_DEFAULT_DELIMITER;

        var params = [];

        Object.keys(obj).forEach(function(key) {
            var value = obj[key];
            var valueString = isArray(value) ? arrayToString(value, arrayDelimiter) : encode(value);

            params.push(key + ":" + valueString)
        });

        return params.join("/")
    };

    $.vUrlToObject = function(url, arrayDelimiter) {
        arrayDelimiter = arrayDelimiter || ARRAY_DEFAULT_DELIMITER;

        var obj = {};
        var items = url.split("/");

        items.forEach(function(item) {
            if (item) {
                var keyAndValue = item.split(":");
                var key = keyAndValue[0];
                var value = decode(keyAndValue[1]).split(arrayDelimiter);

                obj[key] = (value.length == 1) ? value[0] : value;
            }
        });

        return unflatten(obj);
    };
}(jQuery));
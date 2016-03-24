/*global define*/
define(
    ['lang/en-us'],
    function(languageData) {

        function loc(el, attribute, key) {
            var obj=languageData;
            var arr = key.split(".");
            while(arr.length && (obj = obj[arr.shift()]));

            if (attribute === 'innerHTML') {
                el.innerHTML = obj;
            } else {
                el[attribute] = obj;
            }
        }

        return loc;
    }
);

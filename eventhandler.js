
;(function(root, name, definition, namespace) {
    if (typeof define === 'function' && define.amd) {
        define([], definition);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = definition();
    }
    else if(!!namespace) {
        root[namespace] = !!root[namespace] ? root[namespace] : {};
        root[namespace][name] = definition();
    }
    else {
        root[name] = definition();
    }
})(this, 'evt', function evt() {

	var scope = this;
	scope.evts = {};
	/**
	 * Object Structure
	 * 
	 * {
	 * 	elem: {
	 * 		eventName1: fn
	 * 		eventName2: fn
	 * 	}
	 * }
	 *
	 * This simple structure is used because we only want callback bound to an element at a time.
	 * Having multiple callbacks for a single event on the same element easily leads to confusion down the line.
	 * What this gives up in exchange is the ability to delegate down events to multiple child Elements.
	 * However than can be accomplished if within a main callback for the parent, then triggering the callback for the child elements based upon the target.
	 */
	
	/**
	 * eleStringName - create a "unique" string for the node (this can be done better)
	 * @param  Element/Node elem
	 * @return elem
	 */
	var eleStringName = function(elem) {
		return elem.nodeName.toLocaleLowerCase()+'.'+elem.className.replace(/ /g, '.');
	};

	/**
	 * removeEvent - wrapper for removeEventListener
	 * @param  Element/Node elem
	 * @param  String eventName - 	name of event to remove
	 * @return elem 				elem passed in is returned to allow for chaining.
	 */
	var removeEvent = function(elem, eventName) {
		if( !elem || !ele.nodeName ){
			console.error('Element required');
		}
		if( !eventName ){
			console.warn('No event name passed in.')
			return elem;
		}

		var fn = !!scope.evts[eleStringName(elem)] ? scope.evts[eleStringName(elem)][eventName]: null;
        return !!fn ? elem.removeEventListener(eventName, fn, 1): elem;
    };

    /**
     * attachEvent - wrapper for addEventListener
     * @param  Element/Node elem
	 * @param  String eventName 	name of event to remove
     * @param  {Function} fn        event callback function
     * @return elem             	elem passed in is returned to allow for chaining.
     */
    var attachEvent = function(elem, eventName, fn) {
    	if( !elem || !ele.nodeName ){
			console.error('Element required.');
			return elem;
		}
		if( !eventName || !fn ){
			console.error('Event name and callback required.')
			return elem;
		}

		elem = removeEvent(elem, eventName).addEventListener(eventName, fn);

		var eleName = eleStringName(elem);

    	if( !scope.evts[eleName] ){
    		scope.evts[eleName] = {};
    	}
    	scope.evts[eleName][eventName] = fn;

        return elem;
    };

    return {
    	on: 	attachEvent,
    	off: 	removeEvent
    };

}.bind(this));


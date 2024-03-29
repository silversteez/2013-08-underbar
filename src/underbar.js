/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n === undefined) {
      return array[0];
    } else {
      return array.slice(0,n);
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[(array.length - 1)];
    } else {
        if ((array.length - n) >= 0) {
          return array.slice(array.length - n);
        } else {
          return array;
        }
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)) {
      for (var i = 0, len = collection.length; i < len; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
          iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    for ( var i = 0, len = array.length; i < len; i++) {
      if (array[i] === target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var results = [];
    _.each(collection, function(item) {
      if (iterator(item)) {
        results.push(item);
      }
    });
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    var results = [];
    _.each(collection, function(item) {
      if (!iterator(item)) {
        results.push(item);
      }
    });
    return results;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var results = [];
    _.each(array, function(item) {
      if (!(_.contains(results, item))) {
        results.push(item);
      }
    });
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var resultsArr = [];
    _.each(array, function(item) {
      resultsArr.push(iterator(item));
    });
    return resultsArr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    _.each(list, function(item) {
      if (typeof methodName === "string") { //method is string
      item[methodName].apply(item, args);
      } else {
      methodName.apply(item, args);
      }
    });
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to the first element in the input array.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    _.each(collection, function(item) {
      if (initialValue === undefined) {
        initialValue = collection[0];
      } else {
        initialValue = iterator(initialValue, item);
      }
    });
    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator === undefined || collection.length < 1) {
      return true;
    }
    var allTruthy = true;
    _.each(collection, function(item) {
      if (!iterator(item)) {
        allTruthy = false;
      }
    });
    return allTruthy;
    // return _.reduce(collection, function(allTruthy, item) {
    //   if (!allTruthy) {
    //     return false;
    //   }
    //   if (!iterator(item)) {
    //     allTruthy = false;
    //   }
    // }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator === undefined) {
      iterator = function(item) {
        return item;
      };
    }
    var someTruthy = false;
    _.each(collection, function(item) {
      if (iterator(item)) {
        someTruthy = true;
        return;
      }
    });
    return someTruthy;
    // return _.every(collection, function(item) {
    //   if (iterator(item)) {
    //     return true;
    //   }
    // });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(item, key) {
      if (key !== 0) { //skip obj which is first arg
        for (var attribute in item) {
          obj[attribute] = item[attribute];
        }
      }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(item, key) {
      if (key !== 0) { //skip obj which is first arg
        for (var attribute in item) {
          if (!obj.hasOwnProperty(attribute)) { //test for attribute existence
            obj[attribute] = item[attribute];
          }
        }
      }
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var precomputedArgs = {};
    return function() {
      if (!precomputedArgs.hasOwnProperty(arguments[0])) { //argument isn't already computed
        precomputedArgs[arguments[0]] = func.apply(this, arguments);
      }
      return precomputedArgs[arguments[0]];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var newArgs = [];
    for (var i = 0, len = arguments.length; i < len; i++) { //try to remove them with arguments.splice, but doesn't exist i think
      if (i > 1) {//skip func, wait
        newArgs.push(arguments[i]);
      }
    }
    if (newArgs.length > 0) { //not sure what is going on here but it works
      setTimeout(func.apply(null, newArgs), wait);
    } else {
      setTimeout(func, wait);
    } //am i supposed to return the function altered or just call it?
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) { //i think the spec is wrong...
    var shuffledArray = array.slice();
    _.each(shuffledArray, function() {
      var tempItem = shuffledArray.pop();
      var spliceIndex = Math.floor(Math.random() * shuffledArray.length);
      shuffledArray.splice(spliceIndex, 0, tempItem);
    });
    return shuffledArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var lenLargestArray = 0;
    _.each(arguments, function(array) { //get largest array length
      if (array.length > lenLargestArray) {
        lenLargestArray = array.length;
      }
    });
    _.each(arguments, function(array) { //push undefined into shorter arrays to equalize length
      if (array.length < lenLargestArray) {
        var diff = lenLargestArray - array.length;
        for (var i = 0; i < diff; i++) {
          array.push(undefined);
        }
      }
    });
    var zippedArrays = [];
    _.each(arguments, function(array, arrayKey) {
      _.each(array, function(item, key) {
        if (arrayKey === '0') { //make a new array in zippedArrays if needed
          zippedArrays[key] = [];
        }  //or just add to the existing array
        zippedArrays[key][arrayKey] = item;
      });
    });
    return zippedArrays;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var results = [];

    var itemFinder = function(array) {
      _.each(array, function(item) {
        if (Array.isArray(item)) {
          itemFinder(item);
        } else {
          results.push(item);
        }
      });
    };

    itemFinder(nestedArray);
    return results;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var results = [];
    var doPushItem = true;
    var args = arguments;

    _.each(args, function(array) {
      _.each(array, function(item) {
        _.each(args, function(otherArray) {
          if (!_.contains(otherArray, item)) {//if any array does not contain item
            doPushItem = false; //don't add it to results
          }
        });

        if (doPushItem && !_.contains(results, item)) {//don't add duplicates
          results.push(item);
        }
        doPushItem = true;//reset
      });
    });
    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var results = [];
    var doPushItem = true;
    var args = arguments;

    _.each(array, function(item, key) {
      _.each(args, function(otherArray, argsKey) {
        if (argsKey > 0) { //skip array
          if (_.contains(otherArray, item)) {
            doPushItem = false;
          }
        }
      });
      if (doPushItem) {
        results.push(item);
      }
      doPushItem = true;
    });
    return results;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Return an object that responds to chainable function calls for map, pluck,
  // select, etc.
  //
  // See the Underbar readme for details.
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);

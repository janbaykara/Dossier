app.factory('UserService', function($http) {
  function init() {
    return (appUser.user != undefined) ? appUser.user : { name: 'Logged out', uid: '0' };
  }

  var pre = init();
  var userPromise;
  var logoutPromise;

  return {
    loggedIn: function() {
      return pre.uid == "0" ? false : true;
    },

    pre: pre,

    async: function(uid) {
      if ( !userPromise ) {
        if(uid === "pre") { uid = pre.uid; }
        userPromise = $http.get("/api/users?uid="+uid).then(function (data, status, headers, config) {
          user = data.data[0];
          console.log("Loaded User!");
          console.log(user);
          return user;
        })
      }
      return userPromise;
    },

    logout: function() {
      if ( !logoutPromise ) {
        logoutPromise = $http.get("/logout").then(function (data, status, headers, config) {
          console.log("Logged out!");
          console.log(data.data);
          appUser = undefined;
          pre = init();
          return data.data;
        })
      }
      return logoutPromise;
    }

  };
});

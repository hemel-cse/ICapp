angular.module('Fully.services', [])

.factory('ParseServices', function() {
         
    return {        
             
         getAll: function(Class){
         
            var ParseString = Parse.Object.extend(Class);
            var query = new Parse.Query(ParseString);
            return query.find().then(function(response){
                return response;
            }, function(error){
                //something went wrong!
            });
         },
             
         getByTerm: function(Class, term1, term2, skip, limit){
         
            var ParseString = Parse.Object.extend(Class);
            var query = new Parse.Query(ParseString);
             query.equalTo(term1, term2);
             if(skip) { query.skip(skip); }
             if(limit) {query.limit(limit); }
            return query.find().then(function(response){
                return response;
            }, function(error){
                //something went wrong!
            });
         },
             
        getFirst: function(Class, term1, term2){
            var ParseString = Parse.Object.extend(Class);
            var query = new Parse.Query(ParseString);
             query.equalTo(term1, term2);
            return query.first().then(function(response){
                return response;
            }, function(error){
                //something went wrong!
            });
        },
    }
})

.factory('locationService', function($http) {
         var locations = [];
         var latlng = "";
         
         return {
         getLocation: function(latlng){
         return $http({
                      url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latlng+"&sensor=true", //*** location service URL ***
                      method: "GET",
                      }).then(function(response){
                              locations = response.data;
                              return locations;
                              }, function(error){
                              //something went wrong!
                              });
         }
        }
})


.factory('BlogService', function($http) {

    var url = 'http://inhd.ro/bloggy/wp-json/';    //*** your FEED URL here *** 

    var postsUrl = 'posts';
    var pagesUrl = 'pages';
    
return {
    
    GetPosts: function(category, page){
        
        fullUrl = url + postsUrl + "?filter[cat]=" + category + "&page=" + page + "&filter[s]="; 
        
        return $http({
            url: fullUrl, 
            method: "GET"
 }).then(function(response){
        posts = response.data;
        pages = response.headers("X-WP-TotalPages");
            return posts;
            return pages;
        }, function(error){
            //something went wrong!
        });
         },
    
         GetPost: function(postid){
            return $http({
            url: url + postsUrl + "/" + postid, 
            method: "GET"
 }).then(function(response){
        post = response.data;
            return post;
        }, function(error){
            //something went wrong!
        });

         },
    
    GetCategories: function(){
            return $http({
            url: url + postsUrl + "/types/posts/taxonomies/category/terms", 
            method: "GET"
 }).then(function(response){
        categories = response.data;
            return categories;
        }, function(error){
            //something went wrong!
        });

         },
    
    GetCategory: function(categId){
            return $http({
            url: url + postsUrl + "/types/posts/taxonomies/category/terms/" + categId, 
            method: "GET"
 }).then(function(response){
        category = response.data;
            return category;
        }, function(error){
            //something went wrong!
        });

         },
    
     GetPages: function(){
            return $http({
            url: url + pagesUrl, 
            method: "GET"
 }).then(function(response){
        pages = response.data;
            return pages;
        }, function(error){
            //something went wrong!
        });

         },
    
    GetPage: function(pageId){
            return $http({
            url: url + pagesUrl + "/" + pageId, 
            method: "GET"
 }).then(function(response){
        page = response.data;
            return page;
        }, function(error){
            //something went wrong!
        });

         },
    
    
    GetComments: function(postid){
            return $http({
            url: url + postsUrl + "/" + postid + "/comments", 
            method: "GET"
 }).then(function(response){
        comments = response.data;
            return comments;
        }, function(error){
            //something went wrong!
        });

         }
         }
         })
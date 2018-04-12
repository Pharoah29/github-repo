

var app = angular.module("repoApp",["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html",
        controller: "repoController",
      
    })
    .when("/bookmarks", {
        templateUrl : "bookmarks.html",
        controller: "repoController",
      
    })
   
});

app.controller("repoController", repoController);

function repoController($http)
{
    var vm = this;

    var itemCount = 20

    vm.bookmarks = [];
    
    vm.searchQuery = null;
    vm.showGallery = false;
    vm.showBookmarks = false;

    vm.storage = [];
  
    vm.repoItems = [];

    var endPoint = "https://api.github.com/search/repositories?q="; 

    vm.search = function(){

        let q = vm.searchQuery;

        if(q && q.length > 0){

            $http.get(endPoint + q).then(function(res){

                vm.repoItems = res.data.items.splice(0,itemCount);                            
            })
        }   
    }

    vm.bookmark = function(item){
       
            if(item){ 
                if(vm.bookmarks.indexOf(item) == -1) vm.bookmarks.push(item);
                
                //save the bookmark in session storage
                sessionStorage.setItem("github.gallery.bookmarks",JSON.stringify(vm.bookmarks));
            }
    }
    vm.getBookmarks = function(){
           
        vm.storage =  JSON.parse(sessionStorage.getItem("github.gallery.bookmarks"));

    }

    
}
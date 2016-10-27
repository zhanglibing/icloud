
    var reminder=angular.module('reminder',[]);
    reminder.controller('mainCtrl',['$scope',function($scope){

        $scope.color=['purple','green','yellow','red','brown','orange','blue'];
        $scope.arr=[{id:1,them:'purple',title:'新列表1',
        todo:[{id:1,title:'maiche',state:0},
            {id:2,title:'maifang',state:1},
            {id:3,title:'maifan',state:0},
            {id:4,title:'maifang',state:1}
             ]},
            {id:2,them:'green',title:'新列表2',todo:[]}];
        $scope.circle=[
            {id:1,theme:"orange"},
            {id:2,theme:"red"},
            {id:3,theme:"brown"},
            {id:4,theme:"yellow"},
            {id:5,theme:"blue"},
            {id:6,theme:"green"},
            {id:7,theme:"purple"}
        ]

        $scope.change=function(t){
            $scope.current.them = t.theme;
        }

        $scope.count=function(){
            var index=0;
            angular.forEach($scope.current.todo,function(v,i){
                if(v.state==1){
                    index++;
                }
            })
           return index;
        }
        $scope.addlist=function(){
            var max_id=-100;
            angular.forEach($scope.arr,function(v,i){
                if(v.id>max_id){
                    max_id=v.id;
                }
            });
            var index=$scope.arr.length%7;
            $scope.arr.push({
                id:max_id+1,
                them:$scope.color[index],
                title:'新列表'+($scope.arr.length+1),
                todo:[]
            });

        };
        $scope.cancel=function(){
            $(".card").toggleClass("active")
        }
        $scope.deletecard=function(){
            $(".card").removeClass("active")
        }
        $scope.addtodo=function(e) {
                var max_id = -100;
                angular.forEach($scope.current.todo, function (v, i) {
                    if (v.id > max_id) {
                        max_id = v.id;
                    }
                });
                var index = $scope.arr.length % 7;
                var id = max_id + 1;
                $scope.current.todo.push({
                    id: id,
                    title: $scope.item,
                    state: 0
                });

        }

            //定义一个变量 代表一个类
            $scope.current = $scope.arr[0];
            $scope.setcurrent = function (v) {
                $scope.current = v;
            }
            $scope.delete = function (id) {
                $scope.current.tudo = $scope.current.tudo.filter(function (v, i) {
                    return v.id !== id
                })
            }
        //  增加TODO列表
        $scope.addtodo=function(){
            var l=$scope.current.todo.length;
            if(l === 0){
                var id=0;
            }else{
                var id=parseInt($scope.current.todo[l-1].id)+1;
            }
            var newtodo={
                id:id,
                title:'',
                state:0
            }
            $scope.current.todo.push(newtodo);
            $scope.currenttodo = newtodo;
        }
        //选项卡删除
        $scope.shanchu=function(dd){
            var newarr=[];
            for(var i=0;i<$scope.arr.length;i++){
                if(Number($scope.arr[i].id) !== dd){
                    newarr.push($scope.arr[i]);
                }
            }
            $scope.arr=newarr;
            $scope.current=$scope.arr[0];
        }
    //    清理已完成
        $scope.qingli=function(){
            $scope.current.todo=$scope.current.todo.filter(function(v,i){
                return v.state==0;
            });
        }
    }]);
    reminder.directive('cardList',[function(){
        return{
            restrict:'AE',
            transclude:true,
            replace: true,
            template:'<div><div ng-transclude></div></div>',
            link:function(scope,el){
                $(el).find('.color-box').on('click','.selection-circle',function(){
                    $('.selection-circle').removeClass('active');
                    $(this).addClass('active')
                })
              $(el).find('input').on('click',function(){
                  $(this).closest('.content').find('.border').addClass('active')
                  $(this).focus()
              })
            // $(document).on('click',function(e){
            //     e.stopPropagation();
            //     $('.card').removeClass('active')
            //     alert(1)
            // })
            //     $('.card').on('click',function(e){
            //         e.preventDefault()
            //     })
            }
        }
    }]);
    reminder.directive('myDiv',[function(){
         return{
             restrict:'AE',
             transclude:true,
             replace: true,
             template:'<div><div ng-transclude></div></div>',
             link:function(scope,el) {
                 $(el).on('mousedown',false);
                 $(el).find('ul').on('click', 'li', function () {
                     var bianji=$(el).find('ul .bianji');
                     var text=bianji.find('input').val();
                     var id=parseInt(bianji.attr('date-id'));
                     if(text==''){
                         scope.$apply(function(){
                             for(var i=0;i<scope.current.todo.length;i++){
                                 if(parseInt(scope.current.todo[i].id)== id){
                                     scope.current.todo.splice(i,1);
                                 }
                             }
                         })
                         bianji.remove()
                     }
                     bianji.find('input').blur();
                     $(el).find('ul .active').removeClass('active binaji');
                     $(this).addClass('active')
                 })
                 $(el).find('ul').on('dblclick','li',function () {
                     $('.bianji').removeClass('bianji');
                     $(this).addClass('bianji');
                     var text = $(this).find('.text').text();
                     var input = $(this).find('input');
                     input.val(text).focus();
                 })
                 $(el).on('blur','ul li input',function(e){
                     e.stopPropagation();
                     $(this).find('.text').text($(this).find('input').val())

                 })

                 $('.search-box .search').on('click',function(){
                    $(this).find('input').addClass('active').focus()
                 })
                 $('.done-box .anniu .img').on('click',function(){
                     $(this).toggleClass('active');
                     $('.qingli').toggleClass('active')
                     $(el).find('.yiwan').toggleClass('active')
                 })

                $('.new').on('click',function(){

                    scope.$apply(function(){
                        if(scope.current.todo[scope.current.todo.length-2].title==''){
                            scope.current.todo.pop()
                        }
                    })
                        var li=$('.weiwan li');
                        var l=li.length;
                        li.removeClass('active');
                        li.eq(l-1).addClass('active bianji').find('input').focus();


                })
                 // 切换已完成和未完成动画
                 // $(el).find('ul li').on('click','.button',false)
                 // $(el).find('ul li').on('click','.button',function(e){
                 //     e.stopPropagation();
                 //     alert(1)
                 // })
                 //

                 $(el).find('ul').on('click','li .delete',function(){
                     //动画延迟完删除
                     $(this).closest('li').addClass('donghua');
                     $(this).closest('li').delay(500).queue(function(){
                         $(this).dequeue();
                         // 删除TODO列表
                         id=parseInt($(this).closest('li').attr('date-id'));
                         scope.$apply(function(){
                                 var newtodo=[];
                                 for(var i=0;i<scope.current.todo.length;i++){
                                     if(parseInt(scope.current.todo[i].id) !== id){
                                         newtodo.push(scope.current.todo[i]);
                                     }
                                 }
                                 scope.current.todo=newtodo;
                         })
                     })

                 })
             }
         }

    }]);
    reminder.directive('newUl',[function(){
        return {
            restrict:'AE',
            transclude:true,
            template: '<ul><div ng-transclude></div></ul>',
            replace: true,
            link: function(scope,el){
                $(el).on('mousedown',false);
                $(document).on('mousedown',false);
                $(el).on('click','li',function(){
                    $('.content .active').removeClass('active bianji');
                    $(this).addClass('active');
                })
              $(el).on('dblclick','li',function(){
                  $('.bianji').removeClass('bianji');
                  $(this).addClass('bianji');
                  $(this).find('input').val($(this).find('input').val()).focus();
                  $(document).on('keyup',function(e){
                      if(e.keyCode==13){

                      }
                  })
              })

                 $(el).on('keyup',false);
                 $(document).on('keyup',function(e){
                   var index=0;
                 if(e.keyCode==46){
                     var id=parseInt($(el).find('.active').attr('date-id'));
                     $(el).find('.active').remove();
                       scope.$apply(function(){
                       scope.arr=scope.arr.filter(function(v,i){
                           return v.id!==id;
                       });
                       scope.current=scope.arr[0]
                       index=scope.current.id;
                   })
                 }
                 // if(e.keyCode==13){
                 //     $(el).find('.bianji input').blur();
                 // }
                 //判断默认选中状态
                 var li=$(el).find('li');
                    $(li).each(function(i,v){
                        if($(this).attr('date-id')==index){
                            $(this).addClass('active')
                        }
                    })

                 return false
             })
        }
    }
    }])

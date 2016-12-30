var Imgcollection=require('collection/img');
	var imgcollection=new Imgcollection();
	//引入模块
	var Layer=require('layer/layer');
	var List=require('list/list');
	//实例化视图对象
	var layer=new Layer({
		el:$("#app"),
		collection:imgcollection
	})

	var list=new List({
		el:$("#app"),
		collection:imgcollection
	})

	//搭建路由
	var Router=Backbone.Router.extend({
		routes:{
			'layer/:id':'showlayer',
			'layerbyli/:id':'showlayer1',
			'*other':'showlist',
		},
		showlayer:function(id){
			layer.render(id);
			layer.$el.find('.layer').show();
		},
		showlist:function(){
			// list.render();
			layer.$el.find('.layer').hide();
		},
		showlayer1:function(id){

			layer.$el.find('.layer').hide();
			layer.render(id);
			layer.$el.find('.layer').show();
		}
	
	})
	var router=new Router();

	// 暴漏接口
	module.exports = function (){
		//开启路由
		Backbone.history.start();
	}
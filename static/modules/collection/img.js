//引入imgmodel模块
	var Imgmodel=require('../model/img');
	//创建图片集合
	var Imgcollection=Backbone.Collection.extend({
		model:Imgmodel,
		imageId:0,
		fetchdata:function(id){
			var self=this;
			//引入数据
			$.get('data/imageList.json',function(res){
				if(res&&res.errno===0){
					//打乱图片顺序
					res.data.sort(function(){
					return Math.random()>0.5?1:-1;
				});
					//图片对象添加id属性
			for(var i=0;i<res.data.length;i++){
				res.data[i].id=++self.imageId;
				}
			self.add(res.data);
				}
			})
		}
	})
	// var ic=new Imgcollection();
	// ic.fetchdata();
	module.exports=Imgcollection;
var w=($(window).width()-6*3)/2;
	//定义图片模型
	var Imgmodel=Backbone.Model.extend({
		//设置图片显示高度
		initialize:function(obj){
			// console.log(obj);
			this.attributes.viewWidth=w;
			this.attributes.viewHeight=w/obj.width*obj.height;
		}
	});
	// var Imgcollection=Backbone.Collection.extend({
	// 	model:Imgmodel
	// });
	// var ic=new Imgcollection();
	// var obj = {
	// 	"title": "精彩建筑摄影作品",
	// 	"url": "img/01.jpg",
	// 	"type": 1,
	// 	"width": 640,
	// 	"height": 400
	// }
	// ic.add(obj);
	// console.log(ic);
	module.exports=Imgmodel;
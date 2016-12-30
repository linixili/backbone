var List=Backbone.View.extend({
		events:{
			"tap .searchbtn":"showsearchimg",
			"tap .list .type li":'showsearchbyli',
			'tap .list .totop':'gototop'
		},
		leftHeight:0,
		id:"",
		rightHeight:0,
		tpl:function(){
			if(location.toString().indexOf('layerbyli')>-1){
				return _.template("<a href='#layerbyli/<%=id%>'><img style='<%=style%>' src='<%=url%>'/></a>")
			}else{
				return _.template("<a href='#layer/<%=id%>'><img style='<%=style%>' src='<%=url%>'/></a>")
			}
			
		},
		initialize:function(){
			//初始化dom
			this.initdom();
			//拉取数据
			this.getData();
			//监听集合变化渲染对象
			this.listenTo(this.collection,'add',function(model,collection,options){
				this.render(model);
			});
			var self=this;
			$(window).on('scroll',function(){
				if($("body").height()<$(window).height()+$(window).scrollTop()+200){
						self.getData(this.id);
				}
				self.showtotop();
			});
			$('.go-back').click(function(){
			location.href="";
		})
		},
		gototop:function(){
			window.scrollTo(0,0);
		},
		showtotop:function(){
			if($(window).scrollTop()>300){
				this.$el.find('.totop').show();
			}else{
				this.$el.find('.totop').hide();
			}
		},
		initdom:function(){
			this.leftContainer=this.$el.find(".containerleft");
			this.rightContainer=this.$el.find('.containerright')
		},
		getData:function(id){
			this.collection.fetchdata(id);
		},
		
		render:function(model){
			var tpl=this.tpl();
			var data={
				id:model.get('id'),
				style:'width:' +model.get('viewWidth')+ 'px;' + 'height:' + model.get('viewHeight')+ 'px;',
				url:model.get('url')
			}
			// console.log(data);
			var html=tpl(data);
			if(this.leftHeight>this.rightHeight){

				this.rendercontainer(this.rightContainer,html);
				this.rightHeight+=model.get('viewHeight')+6;
			}else{
				this.rendercontainer(this.leftContainer,html);
				this.leftHeight+=model.get('viewHeight')+6;
			}
		},
		rendercontainer:function(box,html){
			box.append(html);
		},
		
		//获取输入内容
		getval:function(){
			return this.$el.find('.search input').val();
		},
		//检查输入内容合法性
		checkval:function(val){
			if(/^\s*$/.test(val)){
				alert("请输入搜索内容");
				return ;
			}else{
				return val;
			}
		},
		//检索集合中包含该内容的model
		filtercollection:function(val,type){
			return this.collection.filter(function(model,index,models){
				if(type==='type'){
				return model.get('type')==val;
			}
				return model.get('title').indexOf(val)>-1;
			})
		},
		//清空显示的图片
		clearviewimg:function(){
			this.leftContainer.html("");
			this.rightContainer.html("");
			this.leftHeight=0;
			this.rightHeight=0;
		},
		//渲染图片
		resetview:function(models){
			if(models.length==0){
				this.$el.find('.tip').show();
			}
			for(var i=0;i<models.length;i++){
				this.render(models[i]);
			}
		},
		//点击搜索按钮击发事件环
		showsearchimg:function(){
			var val=this.getval();
			var val1=this.checkval(val);
			var models=this.filtercollection(val1);
			this.$el.find('.tip').hide();
			this.clearviewimg();
			this.resetview(models);
		},
		showsearchbyli:function(e){
			this.$el.find('.tip').hide();
			this.clearviewimg();
			var type=$(e.target).attr('data-id');
			this.id=type;
			location.href='#layerbyli?id='+type;
			var models=this.filtercollection(type,"type");
			this.resetview(models);
		}
	})
	//暴露接口
	module.exports=List;
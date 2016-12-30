var h=$(window).height();
	// console.log(h);
	var Layer=Backbone.View.extend({
		imgid:0,
		i:0,
		models:[],
		events:{
			'tap  .container img':'showheader',
			'tap .backtoprev':'goback',
			'swipeLeft .container img':'shownext',
			'swipeRight .container img':'showprev'
		},
		showheader:function(){
			
			this.$el.find('.layer .layerheader').toggleClass('hide');
		},
		goback:function(){
			this.$el.find('.layer').hide();
			// location.href="#";
		},
		tpl:_.template($('#template').html()),
		render:function(id){

			var tpl=this.tpl;
			var model1=this.collection.get(id);
			this.models=this.collection.filter(function(model,index,models){
				return model.get('type')==model1.get('type');
			})
			// console.log(this.models);
		
			if(this.models.length==0||!model1){
				location.href='#';
				return;
			}
			var data={
				title:model1.get('title'),
				url:model1.get('url'),
				style:'line-height:'+h+'px;'
			}
			//获取图片id
			this.imgid=id;
			var html=tpl(data);
			this.$el.find('.layer').html(html);
		},
		updateView:function(model){
			this.$el.find('.layer .container img').attr('src',model.get('url'));
			this.$el.find('.layer .layerheader .title').html(model.get('title'));
		},
		shownext:function(){
			if(location.toString().indexOf('layerbyli')>-1){
				this.i++;
				if(this.i>this.models.length-1){
					alert("已经是最后一张了哦");
					this.i--;
					return ;
				}else{
					location.href='#layerbyli/'+this.imgid;
					this.updateView(this.models[this.i]);
				}
			}else{
				this.imgid++;
				var model=this.collection.get(this.imgid);
				if(!model){
					alert("已经是最后一张了哦");
					this.imgid--;
					return ;
				}else{
					location.href='#layer/'+this.imgid;
					this.updateView(model);
				}
			}
			
		},
		showprev:function(){
			if(location.toString().indexOf('layerbyli')>-1){
				this.i--;
				if(this.i<0){
					alert("已经是最后一张了哦");
					this.i++;
					return ;
				}else{
					location.href='#layerbyli/'+this.imgid;
					this.updateView(this.models[this.i]);
				}
			}else{
				this.imgid--;
				var model1=this.collection.get(this.imgid);
				if(!model1){
					alert("已经是第一张了哦");
					this.imgid--;
					return ;
				}else{
					location.href='#layer/'+this.imgid;
					this.updateView(model1);
				}
			}
		}
	})
	module.exports=Layer;
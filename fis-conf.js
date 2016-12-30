fis.hook('commonjs');
// 编译less
fis.match('**.less', {
	parser: 'less',
	rExt: '.css'
})
fis.match('**.css',{
	// 压缩
	optimizer: 'clean-css',
	useHash:true,
	packTo:'static/pkg/css/app.css',
})
fis.match("**.js",{
	optimizer:'uglify-js',
	useHash:true,
})
fis.match('static/lib/**.js',{
	packTo:"static/pkg/js/lib.js",
})
fis.match("static/modules/**.js",{
	packTo:'static/pkg/js/app.js',
	isMod:true,
})
//配置打包插件
fis.match("::package",{
	postpackager:"loader",
})
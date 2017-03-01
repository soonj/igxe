
//单个商品框架
var item = document.getElementsByClassName('all-goods--item');


var itemName= new Array();
var itemPrice = new Array();

for (var i = 0; i < item.length; i++) {
	//获取商品名称
	var iname = item[i].getElementsByClassName('h3')[0].innerHTML;
	//获取商品价格
	var iprice = item[i].getElementsByClassName('s3')[0].getElementsByTagName('strong')[0].innerHTML;
	//存入数组
	itemName.push(iname);
	itemPrice.push(iprice);
};

//获取当前url
var currentUrl = document.URL;

setInterval(function(){
	location.reload();
		//检查本地存储更改
	chrome.storage.local.get(currentUrl,function(result){
		console.log(result[currentUrl]);
		//判断数据是否已存在
		if (typeof(result[currentUrl])=="undefined") {
	//写入本地存储	
		chrome.storage.local.set({[currentUrl]:[itemName,itemPrice]}, function(){
							  	console.log('success');
		});
		} else {
			//监听是否更改
			chrome.storage.onChanged.addListener(function(changes, namespace) {
		        for (key in changes) {
		          var storageChange = changes[key];
		          alert('存储键“%s”（位于“%s”命名空间中）已更改。' +
		                          '原来的值为“%s”，新的值为“%s”。',
		                      key,
		                      namespace,
		                      storageChange.oldValue,
		                      storageChange.newValue);
		        }
		      });
		};
	});

},2000);


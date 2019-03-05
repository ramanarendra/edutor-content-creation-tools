var $container;
var settings = { 
	container:window,
	data:[
		{
			id:presentId,
			name:"root",
			pid:0,
			innercode: "",
			pinnercode: "",
			guid : "",
			itemType :"",
			metadata:"",
			icon :"icon.jpg",
			player:"",
			params:"",
			showInToc:true,
			showInLivePage:false,
			downloadId :"target_guid",
			src	: "",
			rootSrc : ""
		}],
	extfield:[],
	nodeaddEnable:true,
	maxlevel:14,
	nodeaddCallback:function(data,callback){},
	noderemoveCallback:function(data,callback){},
	nodeupdateCallback:function(data,callback){},
	customalert:function(msg){
		alert(msg);
	},
	customconfirm:function(msg){
		return confirm(msg);
	},
	text:{
		NodeDeleteText:"Are You Sure To Delete This Node?"
	}
}
var presentId = 1;
var language ={};
function init2(){
		$window = window;
		var element = $("#bs-treeetable");
		
		
		var TREENODECACHE = "treenode";
		
		language.addchild = "New Child";//"Add A Child Node";
		language.addasset = "Link Asset";
		/*if(options) {           
            $.extend(settings, options);
        }*/
        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container);
        /*render data*/
        var dom_addFirstLevel = $("<div class='tt-operation m-b-sm'></div>").append($("<button class='btn btn-primary btn-sm j-resetData' ><i class='fa fa-level-down'></i>&nbsp;Reset Data</button>&nbsp;&nbsp;&nbsp;<button id='genearateJsonButton' class='btn btn-primary btn-sm j-genearateJson' ><i class='fa fa-level-down'></i>&nbsp;Generate TOC json</button>"));
        var dom_table = $("<div class='tt-body'></div>");
        var curElement = $(".tt-body");
        var dom_header = $("<div class='tt-header'></div>");
        /*renderHeader*/
        renderHeader(dom_header);
        
        element.html('').append(dom_addFirstLevel).append(dom_header);
        var treeData = {};
        /*render firstlevel tree*/
        /*
            var curLevel = 1;
            presentId = 1;
            var row = {id:presentId,name:"",pid:0};
            generateTreeNode(curElement,row,curLevel,true);
        */
      
        

        element.append(dom_table);
        
       var curElement = $(".tt-body");
       var curLevel = 1;
       presentId = 1;

       var row = {
       id:presentId,
       name:"",
       pid:0,
       level:1,
       innercode: "",
       pinnercode: "",
       guid : "",
       type :"",
       metadata:"",
       icon :"icon.jpg",
       player:"",
       params:"",
       showInToc:true,
       showInLivePage:false,
       downloadId :"target_guid",
       src	: "",
       rootSrc : ""};
       if(nodeData.length>1){
            row = nodeData[0];//settings.data[0];
       }
       //alert("create root node curLevel:"+curLevel)
      generateTreeNode(curElement,row,curLevel,false,true);
       //$("edit_node_info").addClass("setVisable");
       //$(".j-addClass").css("display","none");
       
      // $("#genearateJsonButton").css("display","inline-block");
      var i=1;
	  //settings.data
      if(nodeData.length>1)
       var interval = window.setInterval(function(){
           
               
            var row = nodeData[i];//settings.data[i];
        
            curLevel = row.level*1 ;//$(this).closest(".class-level")
                //render first level row while row.pid equals 0 or null or undefined
                //if(!row.pid){
                    //curElement = $(this).closest(".class-level");
                    curElement = $("#class-id-"+row.pid*1)
    
                    console.log(curElement+"line no:49, curElement name:"+row.name+"., curLevel:"+(curLevel));
                
                    presentId = presentId+1; 
    
                    generateTreeNode(curElement,row,curLevel*1,false,true);
                    
                    treeData[row.id] = row;
            i++;
            if(i>=nodeData.length){//settings.data
                window.clearInterval(interval);
               // break;
               }
       },1000);


        /*delegate click event*/
		element.delegate(".j-expend","click",function(event){
			
			if(event.target.classList[0]=="fa"){
				var treenode = treeData[$(this).attr('data-id')];
				toggleicon($(this));
				
				if($(this).parent().parent().attr('data-loaded')){
					/*delegated hide/show childs elements */   
				   console.log("delegated hide/show childs elements")
					toggleExpendStatus($(this),treenode);        		
				}
				else{	    
					/*delegated create child elements */    	
					console.log("delegated create childs elements")
					//loadNode($(this),treenode);
				}
			}        	        
		});
		/* genearate json output */
		element.delegate(".j-genearateJson","click",function(){
			//tocdata   tocdata
		   // var final_json = []
		   final_json = getChildsData("0");
		  console.log("final_json:"+JSON.stringify(final_json))
		  
		  try{
				//localStorage.removeItem('myStorage');
				// Get the existing data
				var existing = localStorage.getItem('tocJsonList');

				// If no existing data, create an array
				// Otherwise, convert the localStorage string to an array
				existing = existing ? existing.split(',') : [];

				// Add new data to localStorage Array .indexOf(value) > -1
				console.log((final_json[0].guid+"_"+final_json[0].name)+"*****"+existing+"*****"+existing.indexOf(final_json[0].guid+"_"+final_json[0].name));
				if(existing.indexOf(final_json[0].guid+"_"+final_json[0].name)>-1){
					localStorage.setItem((final_json[0].guid+"_"+final_json[0].name), JSON.stringify(final_json[0]));                                
				}
				else{
					existing.push(final_json[0].guid+"_"+final_json[0].name);
					localStorage.removeItem('tocJsonList');
					localStorage.setItem('tocJsonList', existing.toString());
					localStorage.removeItem(final_json[0].guid+"_"+final_json[0].name);
					localStorage.setItem((final_json[0].guid+"_"+final_json[0].name), JSON.stringify(final_json[0]));              
				   // console.log(final_json[0].guid+"****************"+JSON.stringify(final_json[0]));
				}
				alert('Your message was Saved');
				//console.log("localStorage:"+localStorage.getItem('myStorage'));
		   }catch(er){
			   console.log("er23:"+er)
		   }
			
		});
		 /* genearate json output */
		 element.delegate(".j-publishJson","click",function(){
			//tocdata   tocdata
		   // var final_json = []
		 try{

		   }catch(er){
			   console.log("er23:"+er)
		   }
			try{
				
				//var formdata = $('form#add_systemgoal').serialize();
				$.ajaxSetup({async: false});  
				$.ajax({     
					type: "POST",
					url: 'http://13.233.76.145/api/v1/create_toc_asset',
					data: JSON.stringify(final_json),
					success: function (data) {
						console.log(data);   
					},
				})
				  //window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
				// $.post("/bye", "data=Jermaine", function(response){
				//     if (response.success) {
				//         alert('Your message was sent');
				//     } else {
				//         alert(response.msg);
				//     }
				// });
				// var xhr = new XMLHttpRequest();
				// xhr.open("POST", "/bye", true);
				// var blob = JSON.stringify(final_json[0]); // or e.g. recorder.getBlob()
				// xhr.send("data="+blob);


				// $.post('/bye').then(function(response) {
				//     if (response.success) {
				//         alert('Your message was sent');
				//     } else {
				//         alert(response.msg);
				//     }
				// }).catch(function(err) {
				//     alert('Could not reach server');
				// });
			   /* var xhr;
				if (window.XMLHttpRequest) {
					// code for modern browsers
					xhr = new XMLHttpRequest();
				 } else {
					// code for old IE browsers
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
					xhr = new ActiveXObject("Scripting.FileSystemObject");
				} 
				var s = xhr.CreateTextFile(final_json[0].name+".txt", true);
				s.WriteLine(JSON.stringify(final_json[0]));
				s.Close();*/
			   /* xhr.open("GET", "ajax_info.txt", true);
				xhr.onreadystatechange = function()
				{
					if(xhr.readyState == 4 && xhr.status == 200)
					{
						console.log("xhr.responseText:"+xhr.responseText)
						// we convert your JSON into JavaScript object
						jsonArr = JSON.parse(final_json);

						// we add new value:
						jsonArr.push({"nissan": "sentra", "color": "green"});

						// we send with new request the updated JSON file to the server:
						xhr.open("POST", jsonRequestURL, true);
						xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						// if you want to handle the POST response write (in this case you do not need it):
						// xhr.onreadystatechange = function(){  };
						xhr.send("jsonTxt="+JSON.stringify(jsonArr));
						// but on this place you have to have a server for write updated JSON to the file
					}
				};
				xhr.send();*/
			}catch(er){
				console.log("json creation er:"+er);
			}
		});
		element.delegate(".j-resetData","click",function(){
			/* reset Data node*/
			localStorage.removeItem('myStorage');
			location.reload();
			
		});
		/*delegate remove event*/
		element.delegate(".j-trash","click",function(event){            
			var parentDom = $(this).parents(".class-level-ul");
			var isRemoveAble = false;
			if(parentDom.attr("data-loaded")=="true"){
				if(parentDom.parent().find(".class-level").length>0){
					settings.customalert("Can not be deleted!");
					return;
				}
				else{
					isRemoveAble = true;
				}
			}
			else{
				if(parentDom.attr("data-id")){
					var existChild = false;
					for(var i=0;i<settings.data.length;i++){
						if(settings.data[i].pid*1==parentDom.attr("data-id")*1){
							existChild = true;
							break;
						}
					}
					if(existChild){
						settings.customalert("Can not be deleted!");
						return;
					}
					else{
						isRemoveAble = true;
						if(settings.text.NodeDeleteText){
						   // settings.container.createImageBitmap();   
						}
					}
				}
				else{
					isRemoveAble = true;
				}
			}
			if(isRemoveAble){
				var that = $(this);
				
				if(settings.customconfirm(settings.text.NodeDeleteText)){
					/*trigger remove callback*/
					var delete_id = that.parents(".class-level-ul").attr("data-id");
					console.log(delete_id+"<----------delete_id*****befr deltee: "+JSON.stringify(tocdata))
					delete tocdata[(delete_id)+""];
					console.log("aftr deltee: "+JSON.stringify(tocdata))
					settings.noderemoveCallback(that.parents(".class-level-ul").attr("data-id"),function(){
						that.parents(".class-level-ul").parent().remove();
					});
				}
			}
		});
		/*delegate addchild event*/
		element.delegate(".j-addChild","click",function(){

			//$(".container").css("width","100%");
			//
			try{

			presentId = presentId+1;

			//document.getElementById("editNodeInfo").style.visibility="none";
			$('#assetType').val('0');
			$('#assetInfo').html("");
			var curElement = $(this).closest(".class-level");
			var requiredInput = curElement.find(".form-control*[required]");
			var hasError = false;
			requiredInput.each(function(){
				if($(this).val()==""){
				   // $(this).setAttribute("style","border: 1px solid red!important;");
				   // alert("field '"+$(this).id+"' is empty");
				   $(this).focus();
				  // alert("$(this).parent():"+$(this).parent().html())
					$(this).parent().addClass("has-error");//form-control
					hasError = true;                    
				}
			});
			if(!hasError){
				var pid = curElement.find(".j-expend").attr("data-id");
				var curLevel = $(this).parents(".class-level-ul").attr("data-level")-0+1; 
				//presentId = curLevel;
				var row = {
					id:presentId,
					name:"",
					pid:pid,
					level:curLevel,
					innercode: "",
					pinnercode: "",
					guid : "",
					type :"",
					icon :"icon.jpg",
					player:"",
					params:"",
					showInToc:true,
					showInLivePage:false,
					metadata:"",
					downloadId :"target_guid",
					src	: "",
					rootSrc : ""};

				generateTreeNode(curElement,row,curLevel,false,false);   
			} 
				
			}catch(er){
				console.log("er addchild:"+er)
			}
		});

		element.delegate(".j-addAsset","click",function(){
			//$(".container").css("width","65%");
			document.getElementById("editNodeInfo").style.display="";
			$(this).closest(".class-level");
			var curElement = $(this).closest(".class-level");
			var requiredInput = curElement.find(".form-control*[required]");
			var hasError = false;
			selectedId =  $(this).attr("data-id")*1;
		   //alert("selectedId****:"+selectedId) 
			//console.log(presentId)            	
		});
		element.delegate(".form-control","focus",function(){
			$(this).parent().removeClass("has-error");//
		});
		/*delegate lose focus event*/
		element.delegate(".form-control","blur",function(){
			console.log(".form-control blur line 229")
			var curElement = $(this);
			var data = {};
			data.id = curElement.parent().parent().parent().attr("data-id");
			//alert($(this).attr("id")+"*****"+($(this).attr("id").match("itemType")))//str.match(/ain/g)
			if($(this).attr("id").match("labelinput")){
				
				var parentUl = curElement.closest(".class-level-ul");
				data.pid = parentUl.attr("data-pid");
			// alert("data.pid:"+data.pid);
				data.innercode = parentUl.attr("data-innercode");//parentUl.attr("data-level")-1
				data.pinnercode = curElement.parents(".class-level-"+(data.pid*1+1)).children("ul").attr("data-innercode");
				parentUl.find(".form-control").each(function(){
					if($(this).attr("id").match("labelinput")){
						data[$(this).attr("name")]=$(this).val(); 
						console.log("input name:"+data[$(this).attr("name")]);   
						//alert("presentId:"+data.id);
						tocdata[data.id].name = data[$(this).attr("name")];    
						$("#displaynameLabel_"+data.id).text(data[$(this).attr("name")]);
						//$("#displaynameLabel_"+data.id).text("lastorg");

					}
				});
				if(!data.id&&!curElement.attr("data-oldval")){
					console.log("add node");
					settings.nodeaddCallback(data,function(_data){
						console.log("nodeaddCallback")
						if(_data){
							/*nedd to check bellow line*/
							curElement.parent().attr("data-id",_data.id);
							curElement.parent().parent().parent().attr("data-id",_data.id);
							curElement.parent().parent().parent().attr("data-innercode",_data.innercode);
							curElement.attr("data-oldval",curElement.val());
						}
					});                            
				}
				else if(curElement.attr("data-oldval")!=curElement.val()){
					console.log("update node");   
					settings.nodeupdateCallback(data,function(){
						curElement.attr("data-oldval",curElement.val());
					});
				}
		}
		else if($(this).attr("id").match("itemType")){
			var parentUl = curElement.closest(".class-level-ul");
			parentUl.find(".form-control").each(function(){
				if($(this).attr("id").match("itemType")){
					tempid = $(this).attr("id").split("_")[1];
				   // data[$(this).attr("name")]=$(this).val();    
					//alert("presentId:"+data.id);
					tocdata[tempid].itemType = $(this).val();    
					$("#displayitemTypeLabel_"+tempid).text($(this).val());
					//$("#displaynameLabel_"+data.id).text("lastorg");

				}
			});
		}
		else if($(this).attr("id").match("metadata")){
			var parentUl = curElement.closest(".class-level-ul");
			parentUl.find(".form-control").each(function(){
				if($(this).attr("id").match("metadata")){
					tempid = $(this).attr("id").split("_")[1];
				   // data[$(this).attr("name")]=$(this).val();    
					//alert("presentId:"+data.id);
					tocdata[tempid].metadata = $(this).val();    

				}
			});
		}
			
			
			//$("edit_node_info").addClass("setHide");
		});
}

function renderHeader(_dom_header){
	var dom_row = $('<div></div>');
	dom_row.append($("<span class='maintitle'></span>").text(settings.maintitle));
	dom_row.append($("<span></span>"));        	
	//render extfield
	for(var j=0;j<settings.extfield.length;j++){
		var column = settings.extfield[j];    			
		$("<span></span>").css("min-width","166px").text(column.title).appendTo(dom_row);
	}
	dom_row.append($("<span class='textalign-center'>Operation</span>"));
	_dom_header.append(dom_row);
}

function generateColumn(row,extfield){
	var generatedCol;
	switch(extfield.type){
		case "input":generatedCol=$("<input type='text' class='form-control input-sm'/>").val(row[extfield.key]).attr("data-oldval",row[extfield.key]).attr("name",extfield.key);break;
		default:generatedCol=$("<span></span>").text(row[extfield.key]);break;
	}
	return generatedCol;
}
function toggleicon(toggleElement){
	var _element = toggleElement.find(".fa");
	if(_element.hasClass("fa-caret-right")){
		_element.removeClass("fa-caret-right").addClass("fa-caret-down");
		toggleElement.parent().addClass("selected");
	}else{
		_element.removeClass("fa-caret-down").addClass("fa-caret-right");
		toggleElement.parent().removeClass("selected");
	}
}
function toggleExpendStatus(curElement){
	if(curElement.find(".fa-caret-down").length>0){
		 curElement.parent().parent().parent().find(".class-level").removeClass("rowhidden");
	}
	else{
		curElement.parent().parent().parent().find(".class-level").addClass("rowhidden");
	}           
}
function collapseNode(){
}

function expendNode(){
}
function onInitFs(fs) {

	fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

// Create a FileWriter object for our FileEntry (log.txt).
fileEntry.createWriter(function(fileWriter) {

fileWriter.onwriteend = function(e) {
console.log('Write completed.');
};

fileWriter.onerror = function(e) {
console.log('Write failed: ' + e.toString());
};

// Create a new Blob and write it to log.txt.
var blob = new Blob([JSON.stringify(final_json)], {type: 'text/plain'});

fileWriter.write(blob);

}, errorHandler);

}, errorHandler);
  
}
function errorHandler(e) {
	var msg = '';
  
	switch (e.code) {
	  case FileError.QUOTA_EXCEEDED_ERR:
		msg = 'QUOTA_EXCEEDED_ERR';
		break;
	  case FileError.NOT_FOUND_ERR:
		msg = 'NOT_FOUND_ERR';
		break;
	  case FileError.SECURITY_ERR:
		msg = 'SECURITY_ERR';
		break;
	  case FileError.INVALID_MODIFICATION_ERR:
		msg = 'INVALID_MODIFICATION_ERR';
		break;
	  case FileError.INVALID_STATE_ERR:
		msg = 'INVALID_STATE_ERR';
		break;
	  default:
		msg = 'Unknown Error';
		break;
	};
  
	console.log('Error: ' + msg);
}

function generateTreeNode(curElement,row,curLevel,isPrepend,isOnload){
	try{
		console.log("row.id:"+row.id+"*****"+presentId);
		console.log("curElement:"+curElement+"*******curLevel:"+curLevel)
		var dom_row = $('<div id="class-id-'+row.id+'" class="class-level class-level-'+(row.level)+'"></div>');
		var dom_ul = "";
		if(isOnload)
			dom_ul =$('<ul class="class-level-ul selected"></ul>');
		else
			dom_ul =$('<ul class="class-level-ul"></ul>');
		dom_ul.attr("data-pid",row.pid*1).attr("data-level",curLevel).attr("data-id",row.id);
		var dom_li =$('<li></li>');
		row.innercode&&dom_ul.attr("data-innercode",row.innercode);
		var nameData = row['name'];
		var itemType = row['type'];
		var metaData = row['metadata'];
		// alert(typeof nameData)
		// if(typeof nameData == "object")
		//     nameData = nameData[nameData.length-1];
		console.log("presentId:"+presentId+"******row.id:"+row.id)
		if(curLevel>=settings.maxlevel){//<i class='fa fa-remove j-remove'></i>           
			$('<label class="j-expend"></label>').append('<label class="fa p-xs"></label>').append($("<input type='text' class='form-control input-sm' required/>").attr("data-oldval",nameData).val(nameData).attr('id','labelinput_'+row.id).attr("name","name")).attr('data-id',row.id).appendTo(dom_ul);
			dom_ul.attr("data-loaded",true);
		   // alert(presentId+"----presentId****isOnload*******:"+row.id);     
		}
		if(isOnload){
			$('<label class="j-expend"></label>').append('<label class="fa fa-caret-down p-xs"></label>').attr('data-id',row.id).appendTo(dom_li);
			dom_ul.attr("data-loaded",true);
		}
		else
			$('<label class="j-expend"></label>').append('<label class="fa fa-caret-right p-xs"></label>').attr('data-id',row.id).appendTo(dom_li);
		if(curLevel>1){
			if(isOnload){
				if(row.type=="pdf")
					$('<label ></label>').append('<label class="fa fa-file-pdf-o p-xs"></label>').append($("<input type='text' class='form-control input-sm' required/>").attr("data-oldval",nameData).val(nameData).attr('id','labelinput_'+row.id).attr("name","name")).appendTo(dom_li);
				else if(row.type=="mp4")
					$('<label ></label>').append('<label class="fa fa-file-video-o p-xs"></label>').append($("<input type='text' class='form-control input-sm' required/>").attr("data-oldval",nameData).val(nameData).attr('id','labelinput_'+row.id).attr("name","name")).appendTo(dom_li);
				else if(row.type=="html5")
					$('<label ></lable>').append('<label class="fa fa-file p-xs"></label>').append($("<input type='text' class='form-control input-sm' required/>").attr("data-oldval",nameData).val(nameData).attr('id','labelinput_'+row.id).attr("name","name")).appendTo(dom_li);
				else if(row.type=="assessment")
					$('<label ></label>').append('<label class="fa fa fa-puzzle-piece p-xs"></label>').append($("<input type='text' class='form-control input-sm' required/>").attr("data-oldval",nameData).val(nameData).attr('id','labelinput_'+row.id).attr("name","name")).appendTo(dom_li);
				else
					$('<label ></label>').append('<label class="fa fa-book p-xs"></label>').append($("<input type='text' class='form-control input-sm' required/>").attr("data-oldval",nameData).val(nameData).attr('id','labelinput_'+row.id).attr("name","name")).appendTo(dom_li);
			}
			else
				$('<label ></label>').append('<label id="labelIcons_'+row.id+'" class="fa fa-book p-xs" style="visibility:visible"></label>').append($("<input type='text' class='form-control input-sm' required/>").attr("data-oldval",nameData).val(nameData).attr('id','labelinput_'+row.id).attr("name","name")).appendTo(dom_li);
			/* need to check here*/
			$("<label></lable>").append('<i class="fa fa-trash j-trash"></i>').appendTo(dom_li);
		}
		else
			$('<label ></label>').append($("<input type='text' class='form-control input-sm' required/>").attr("data-oldval",nameData).val(nameData).attr('id','labelinput_'+row.id).attr("name","name")).appendTo(dom_li);
		   
		if(settings.nodeaddEnable){
			if(curLevel==1){
				$("<label></label>").append($('<button class="btn btn-outline btn-sm j-addChild "><i class="fa fa-plus"></i>'+language.addchild +'</button>').attr("data-id",row.id)).appendTo(dom_li);    
			}
			else if(curLevel-0>=settings.maxlevel){
				$("<label></label>").attr("data-id",row.id).appendTo(dom_li);
			} 
			else{
				//required
				$("<label></label>").append($('<button class="btn btn-outline btn-sm j-addChild "><i class="fa fa-plus"></i>'+language.addchild +'</button><button id="addasset_'+row.id+'" class="btn btn-outline btn-sm j-addAsset"><i class="fa fa-plus"></i>'+language.addasset +'</button>').attr("data-id",row.id)).appendTo(dom_li);   
				
				$('<label ></label>').append($("<input type='text' class='form-control input-sm' style='width:5em' required/>").val(itemType).attr("placeholder","Item Type").attr('id','itemType_'+row.id)).appendTo(dom_li);
				$('<label ></label>').append($("<input type='text' class='form-control input-sm' style='width:5em' />").attr("placeholder","Meta data").val(metaData).attr('id','metadata_'+row.id)).appendTo(dom_li);
				//$('<label ></label>').append($("<input type='text' class='form-control input-sm' required/>")).appendTo(dom_li); 
			}
		}       
		for(var j=0;j<settings.extfield.length;j++){
				var colrender = settings.extfield[j];
				var coltemplate = generateColumn(row,colrender);
				$('<label></label>').attr("data-id",row.id).html(coltemplate).appendTo(dom_li);
		}
		var infoNode =$('<div ></div>');
		$('<label class="fa fa-level-down p-xs" style="margin-left:40px"></label><br>').html('<br>"guid": "<label id=\'guidLabel_'+row.id+'\'>'+row['guid']+'</label>", <br>"displayname": "<label id=\'displaynameLabel_'+row.id+'\'>'+nameData+'</label>", <br>"Item Type": "<label id=\'displayitemTypeLabel_'+row.id+'\'>'+itemType+'</label>"<div style="display:none;" id=\'assetInfoLabel_'+row.id+'\'>", <br>"type": "<label id=\'typeLabel_'+row.id+'\'>'+row['type']+'</label>", <br>"icon": "<label id=\'iconLabel_'+row.id+'\'>'+row['icon']+'</label>", <br>"Player": "<label id=\'playerLabel_'+row.id+'\'>'+row['player']+'</label>", <br>"params": "<label id=\'paramsLabel_'+row.id+'\'>'+JSON.stringify(row['params'])+'</label>", <br>"showInToc": "<label id=\'showintocLabel_'+row.id+'\'>'+row['showInToc']+'</label>", <br>"showInLivePage": "<label id=\'showinlivepageLabel_'+row.id+'\'>'+row['showInLivePage']+'</label>", <br>"downloadId": "<label id=\'downloadidLabel_'+row.id+'\'>'+row['downloadId']+'</label>"</div>').appendTo(infoNode);
		//dom_ul.append($("<li><i class='fa fa-remove j-remove'></i></li>"));
		dom_ul.append(dom_li);
		dom_row.append(dom_ul);
		dom_row.append(infoNode);
		
		if(isPrepend){
			curElement.prepend(dom_row);
		}
		else{
			curElement.append(dom_row);
		}
		if(row.type=="mp4" || row.type=="pdf" || row.type=="assessment" || row.type=="html5"){
			$("#assetInfoLabel_"+row.id).css("display","inline");
		}
		var temp_data = {};
		temp_data.id = row.id+"";
		temp_data.pid = row.pid*1;
		temp_data.level = row.level*1;
		temp_data.innercode = row.innercode;
		
		var parentUl = curElement.closest(".class-level-ul");
		//alert("row.pid:"+row.pid)
		var tempN = "";
		try{
			tempN = curLevel;//".class-level-"+( row.pid*1+1);//curElement.parents(".class-level-"+( row.pid+1)).children("ul").attr("data-innercode");
		}catch(er){
			console.log("er 395:"+er)
		}
		console.log("tempN:"+tempN);
 
		// if(row.pinnercode!=""){
		//     console.log("row.pinnercode not null******"+row.pinnercode);
		//     tempN = row.pinnercode;
		// }
		temp_data.pinnercode = tempN;
		if (row.guid &&  row.guid!="" && row.guid.length>1)
			temp_data.guid = row.guid;
		else
			temp_data.guid = getGUID();
		$("#guidLabel_"+row.id).text(temp_data.guid);
		temp_data.name = nameData; 
		temp_data.itemType =  (row.type) ? row.type: "";
		temp_data.metadata =  (row.metadata) ? row.metadata: "{}";
		temp_data.icon =  (row.icon) ? row.icon: "";
		temp_data.player =  (row.player) ? row.player: "";
		temp_data.params =  (row.params) ? row.params: "";
		temp_data.showInToc =  (row.showInToc) ? row.showInToc: "";
		temp_data.showInLivePage =  (row.showInLivePage) ? row.showInLivePage: "";
		temp_data.downloadId =  (row.downloadId) ? row.downloadId: "";
		temp_data.src =  (row.src) ? row.src: "";
		temp_data.rootSrc =  (row.rootSrc) ? row.rootSrc: "";
		//presentId = curLevel;
		tocdata[row.id]=temp_data; 
		if(!isOnload){
			$("#labelinput_"+presentId).select();
			document.getElementById("labelinput_"+presentId).scrollIntoView();
			//
			$("#labelinput_"+presentId).scrollTop();
		}
		console.log(temp_data.itemType+"<---temp_data.itemType ****row.id:"+row.id+"*******;tocdata:"+JSON.stringify(tocdata[row.id]) )
	}catch(er){
		console.log("ergenerateTreeNode:"+er)
	}
}

function getChildsData(key){
   // for(key in tocdata){
		let _index = key*1;
		let temp_childs=[]
		for(let i=_index+1; i<= presentId;i++){
			if((i+'') in tocdata){

			let tmp_val = tocdata[i+''].pid*1; //Need to verify this conditon whne we delete the node
			
			if(tmp_val==_index){
				let temp_data = {};
				
			   temp_data.innercode = tocdata[i+''].id;
			   temp_data.pinnercode = tocdata[i+''].id;
			   //curElement.parents(".class-level-"+(parentUl.attr("data-level")-1)).children("ul").attr("data-innercode");
				temp_data.guid =tocdata[i+''].guid;
				temp_data.name = tocdata[i+''].name; 
				temp_data.label = tocdata[i+''].name; 
				temp_data.itemType = tocdata[i+''].itemType;
				temp_data.metadata = tocdata[i+''].metadata;
				temp_data.id = tocdata[i+''].id;
				temp_data.pid = tocdata[i+''].pid*1;
				temp_data.level = tocdata[i+''].level*1;
				temp_data.icon = tocdata[i+''].icon;
				temp_data.player= tocdata[i+''].player;
				temp_data.params= tocdata[i+''].params;
				temp_data.showInToc= tocdata[i+''].showInToc;
				temp_data.showInLivePage= tocdata[i+''].showInLivePage;
				temp_data.downloadId = tocdata[i+''].downloadId;
				temp_data.src	=  tocdata[i+''].src;
				temp_data.rootSrc = tocdata[i+''].rootSrc;
				console.log("temp_data of node index:"+key+" is:"+JSON.stringify(temp_data))
				json = getChildsData(i+'');
				temp_data.childs = json;
				temp_childs.push(temp_data)
			}
			
		 }
		}               
		
		return temp_childs;
		//final_json.push(temp_data)
	//}
}
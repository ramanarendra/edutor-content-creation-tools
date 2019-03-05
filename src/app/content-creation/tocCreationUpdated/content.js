var chapterList = [];
var selectedChapter = 0;
var selectedAssessmentDownloadId = "";
var conceptNames = [];
var conceptHTML;
var finalJson = []
var tocList ="";//[{"_id":{"$oid":"5c0910b1358d3d33a4ca734a"},"asset_type":"toc","guid":"338f45e1-54a2-4c73-b83d-408acc7300a1","name":"Toc 1"},{"_id":{"$oid":"5c0910d0358d3d33a4ca734b"},"asset_type":"toc","guid":"8bf836dd-e7d9-4ae5-8586-707913de32ff","name":"Toc 2"},{"_id":{"$oid":"5c0910ea358d3d33a4ca734c"},"asset_type":"toc","guid":"af5a6d71-b59d-454e-8844-4ac00183a8aa","name":"Toc New"},{"_id":{"$oid":"5c277cec68ce593fc9de9ab4"},"asset_type":"toc","guid":"93f22c43-4d5c-421c-9d4a-d23bc6623c5f","name":"maths-toc"},{"_id":{"$oid":"5c277d9e68ce593fc9de9ab5"},"asset_type":"toc","guid":"50500d49-64ae-4e42-a83a-c35ee7a8ee40","name":"science-toc"},{"_id":{"$oid":"5c345a9168ce592a65360623"},"asset_type":"toc","guid":"fb9fc4ac-945c-4bb4-a315-9ebdea5217aa","name":"maths-7th sample-enc"},{"_id":{"$oid":"5c384d6768ce59477bcdf783"},"asset_type":"toc","guid":"d2f63c1f-7cb2-4716-9139-3707982636ab","name":"vmaths1 toc"},{"_id":{"$oid":"5c384d9668ce59477bcdf784"},"asset_type":"toc","guid":"a25d7b02-e3d4-4e25-a065-af2f6ba865cb","name":"vmaths2 toc"},{"_id":{"$oid":"5c384dcc68ce59477bcdf785"},"asset_type":"toc","guid":"03378e97-a1bd-48f3-84b8-329340acb5b6","name":"vphysics toc"},{"_id":{"$oid":"5c384df668ce59477bcdf786"},"asset_type":"toc","guid":"12e0dad9-49ab-4159-9bff-7ca3e5c8df10","name":"vchemistry toc"}]

var settings2 = {
    container:window,
    customalert:function(msg){
        alert(msg);
    },
    customconfirm:function(msg){
        return confirm(msg);
    },
    text:{
        NodeDeleteText:"Do you want to load previous data?"
    }
};
		
try{
    $.ajax({//http://ec2-13-250-46-76.ap-southeast-1.compute.amazonaws.com/content_assets.json
            type: 'GET',
            url: "http://13.233.76.145/get_toc_list.json",
            processData: true,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImtyaXNobmE1IiwiZW1haWwiOiJrcmlzaG5hNS5jaGFpdGFueWFAaWduaXRvcmxlYXJuaW5nLmNvbSIsInJvbGxfbm8iOiJrcmlzaG5hLTUiLCJ1c2VyX2lkIjo2LCJzdWIiOiI2Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNTQ3ODExNTg2LCJleHAiOjE1NDc4OTc5ODYsImp0aSI6Ijc4Y2IxM2FiLTRlMGMtNGQwZC1iZmFmLTA2OGQ3NTQxMDY5MSJ9.mBZdwB0x_DFtgrV8A2AyxJYiCB6jEdABIyjNVRlPxzE'
            },
            data: {},
            dataType: "json",
            success: function (data) {
                console.log("data:"+JSON.stringify(data));
                tocList = data;
                showBooks();
            },
            error:function(){
               // showBooks();
            }
    });

}catch(er){

}
		
	
function readBookJson(_obj) {
    // var element = $('meta[name="active-menu"]').attr('content');
    // $('#' + element).addClass('active');
    //http://13.233.76.145/attachment_download/338f45e1-54a2-4c73-b83d-408acc7300a1
    $("#bookTitle").html($(_obj).html())
    try{
        $.ajax({
                type: 'GET',
                url: "http://13.233.76.145/attachment_download/"+_obj.id,
                processData: true,
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImtyaXNobmE1IiwiZW1haWwiOiJrcmlzaG5hNS5jaGFpdGFueWFAaWduaXRvcmxlYXJuaW5nLmNvbSIsInJvbGxfbm8iOiJrcmlzaG5hLTUiLCJ1c2VyX2lkIjo2LCJzdWIiOiI2Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNTQ3ODExNTg2LCJleHAiOjE1NDc4OTc5ODYsImp0aSI6Ijc4Y2IxM2FiLTRlMGMtNGQwZC1iZmFmLTA2OGQ3NTQxMDY5MSJ9.mBZdwB0x_DFtgrV8A2AyxJYiCB6jEdABIyjNVRlPxzE'
                },
                data: {},
                dataType: "json",
                success: function (data) {
                    console.log("reading toc download_url:"+data.download_url);//
                    try{
                        $.ajax({
                                type: 'GET',
                                url: "http://13.233.76.145/content_assets/"+_obj.id+"/download_attachment",
                                processData: true,
                                headers: {
                                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImtyaXNobmE1IiwiZW1haWwiOiJrcmlzaG5hNS5jaGFpdGFueWFAaWduaXRvcmxlYXJuaW5nLmNvbSIsInJvbGxfbm8iOiJrcmlzaG5hLTUiLCJ1c2VyX2lkIjo2LCJzdWIiOiI2Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNTQ3ODExNTg2LCJleHAiOjE1NDc4OTc5ODYsImp0aSI6Ijc4Y2IxM2FiLTRlMGMtNGQwZC1iZmFmLTA2OGQ3NTQxMDY5MSJ9.mBZdwB0x_DFtgrV8A2AyxJYiCB6jEdABIyjNVRlPxzE'
                                },
                                data: {},
                                dataType: "json",
                                success: function (data) {
                                    bookJson = data;
                                    console.log("reading toc json:"+JSON.stringify(bookJson));
                                    showChapters();
                                },
                                error:function(){
                                }
                        });
                    
                    }catch(er){
                    
                    }
                },
                error:function(){
                }
        });
    
    }catch(er){
    
    }
    
    
    
}
function showBooks(){
    cData ="<ul class='list-group'>";
    for(var i=0;i<tocList.length;i++){
        
        cData += '<li id="' + tocList[i].guid + '" class="list-group-item" onclick="readBookJson(this);">' + tocList[i].name + '</li>'
    }
    cData +="</ul>";
    ShowCustomDialog("TOC List",cData);
}
function showChapters(){
    $("#dialog").dialog('close');

    $('#column2Body').html("");
    $('#column3Body').html("");
    if (bookJson && bookJson.childs)
        chapterList = bookJson.childs;
    for (var i = 0; i < chapterList.length; i++) {
        $('#column1Body').append('<li id="node_' + i + '" class="list-group-item" onclick="viewAssessment(this);">' + chapterList[i].name + '</li>');
        //
    }
}
function viewAssessment(_obj) {
    if($(_obj).parent().find(".active")){
        $(_obj).parent().find(".active").removeClass('active');
    }
    $(_obj).addClass('active')
    selectedChapter = _obj.id.split("_")[1] * 1;
    conceptNames = [];    
    temp = {};
     /*{
    "name":"weak interaction between particles",
    "guid": "assetGuid",
    "bookGuid":"bookGuid",
    "questionIds":["id1","id2"]
  }*/
    //conceptHTML = "<select name='concept'><option>select</option>";
    console.log("selectedChapter id:" + selectedChapter)
    var selectedChapterChilds = chapterList[selectedChapter].childs;

    $('#column2Body').html("");
    $('#column3Body').html("");
    finalJson =[]
    for (var i = 0; i < selectedChapterChilds.length; i++) {
        if(selectedChapterChilds[i].name=="Concepts" || selectedChapterChilds[i].name=="concepts" ){
            var conceptList = selectedChapterChilds[i].childs;
            for (var j = 0; j < conceptList.length; j++) {
                if(conceptList[j]['itemType']=="concept" || conceptList[j]['itemType']=="Concept"){
                    _guid = conceptList[j].guid;
                    let tmp = {"name":conceptList[j].name,"guid":_guid};
                    conceptNames.push(tmp);
                    tmp.bookGuid = bookJson.guid;
                    tmp.questionIds = [];
                    finalJson.push(tmp);
                    //{_guid:tmp}
                    // conceptHTML +="<option guid='"+conceptList[j].guid+"'>"+conceptList[j].name+"</option>"
                }
            }
           // conceptHTML +="</select>" 
        }
        else if(selectedChapterChilds[i].name=="Chapter tests" || selectedChapterChilds[i].name=="Chapter Tests" || selectedChapterChilds[i].name=="chapter tests"  || selectedChapterChilds[i].name=="chaptertests" ){
            var nodeList = selectedChapterChilds[i].childs[0].childs;
            console.log(JSON.stringify(nodeList))
            for (var j = 0; j < nodeList.length; j++) {  
                assessmentList = nodeList[j].childs
                for (var k = 0; k < assessmentList.length; k++) { 
                    $('#column2Body').append('<li id="test_' + j +'_'+ k +'" guid="' + assessmentList[k].guid +'" downloadId="' + assessmentList[k].downloadId +'" class="list-group-item" onclick="getQuestions(this);">'+assessmentList[k].name+'</li>');        
                }
            }
            break;
        }
    }
}
function getQuestions(_obj){
    if($(_obj).parent().find(".active")){
        $(_obj).parent().find(".active").removeClass('active');
    }
    $(_obj).addClass('active')
    /*{
    "name":"weak interaction between particles",
    "guid": "assetGuid",
    "bookGuid":"bookGuid",
    "questionIds":["id1","id2"]
  }*/
    $('#column3Body').html("");
    selectedAssessmentDownloadId = $(_obj).attr("downloadId")
    console.log("assement url:"+"http://13.233.76.145/assessment/get_quiz_json?guid="+selectedAssessmentDownloadId)
    try{
        $.ajax({
                type: 'GET',
                url: "http://13.233.76.145/assessment/get_quiz_json?guid="+selectedAssessmentDownloadId,
                processData: true,
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImtyaXNobmE1IiwiZW1haWwiOiJrcmlzaG5hNS5jaGFpdGFueWFAaWduaXRvcmxlYXJuaW5nLmNvbSIsInJvbGxfbm8iOiJrcmlzaG5hLTUiLCJ1c2VyX2lkIjo2LCJzdWIiOiI2Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNTQ3ODExNTg2LCJleHAiOjE1NDc4OTc5ODYsImp0aSI6Ijc4Y2IxM2FiLTRlMGMtNGQwZC1iZmFmLTA2OGQ3NTQxMDY5MSJ9.mBZdwB0x_DFtgrV8A2AyxJYiCB6jEdABIyjNVRlPxzE'
                },
                data: {},
                dataType: "json",
                success: function (data) {
                    assessmentJson = data;
                    console.log("assessmentJson:"+JSON.stringify(assessmentJson))
                    
                    showQuestions()
                    
                },
                error:function(){
                }
        });
    
    }catch(er){
    
    }
}
function showQuestions(){        
    for(var l =0; l<conceptNames.length;l++){
        if(finalJson[l] && finalJson[l].questionIds)
            finalJson[l].questionIds = []
    }
    conceptHTML ='<ul id="test_' + selectedAssessmentDownloadId +'" len="'+assessmentJson.questions.length+'">';
    for (var i = 0; i < assessmentJson.questions.length; i++) {
        conceptHTML +='<li id="question_' + i +'"  class="list-group-item" >Q'+(i+1)+": "+assessmentJson.questions[i].question_text.replace("\"<p","<p style='display:inline'").replace("/p>\"","/p>").trim();
        let conceptName = "";
        let templist = assessmentJson.questions[i].tags;
        for(let j=0;j<templist.length;j++ ){
            console.log("conceptnames:"+JSON.stringify(templist[j]))
            if(templist[j] && templist[j].concept_names)
                conceptName = templist[j].concept_names;
        }
        conceptHTML += "<br><h4 style='display:inline;max-width:25%;font-weight:bold;font-size:1rem'>Concept : </h4><select style='max-width:65%' onchange='conceptSelected(this)' qid='" + assessmentJson.questions[i].id +"' style='display:inline' name='concept'><option value='0'>select</option>";
        for(var j =0; j<conceptNames.length;j++){
                isSelected = "";
                console.log(conceptName.toLowerCase() +"=="+ conceptNames[j].name.toLowerCase())
                if(conceptName.toLowerCase() == conceptNames[j].name.toLowerCase()){
                    isSelected="selected"
                    console.log()
                    for(let k=0; k<finalJson.length;k++){
                        if(finalJson[k].name.toLowerCase()==conceptName.toLowerCase()){
                            console.log("default change:"+conceptName)
                            if(!finalJson[k].questionIds.includes(assessmentJson.questions[i].id+""))
                                finalJson[k].questionIds.push(assessmentJson.questions[i].id+"");
                        }
                    }
                }
                conceptHTML +="<option value='"+conceptNames[j].name+"' guid='"+conceptNames[j].guid+"' "+isSelected+">"+conceptNames[j].name+"</option>"                     
        }
        conceptHTML +="</select></li>" 
//        alert("conceptHTML:"+conceptHTML)
       
        /* <select name="concept" id="testconcept_">
        <option>Slower</option>
        <option>Slow</option>
        <option selected="selected">Medium</option>
        <option>Fast</option>
        <option>Faster</option>
      </select>*/
    }
    conceptHTML +="</ul>" 
    $('#column3Body').append(conceptHTML);        
}
function conceptSelected(_obj){
    /*{
    "name":"weak interaction between particles",
    "guid": "assetGuid",
    "bookGuid":"bookGuid",
    "questionIds":["id1","id2"]
  }*/
    let tempqid = $(_obj).attr("qid");
    let conceptVal = $(_obj).val();
    console.log("conceptVal selected :"+conceptVal)
    for(let i=0; i<finalJson.length;i++){
        if(finalJson[i].name.toLowerCase()==conceptVal.toLowerCase()){
            console.log("tempqid:"+tempqid)

            if(!finalJson[i].questionIds.includes(tempqid))
                finalJson[i].questionIds.push(tempqid);
        }
        else{
            if(finalJson[i].questionIds.includes(tempqid))
                finalJson[i].questionIds.splice(finalJson[i].questionIds.indexOf(tempqid),1);
        }
    }
}
function viewFinalJson(){
    cData ="";
    ShowCustomDialog("Concept Json View",cData);
    var textareaObj = document.getElementById('jsonEditView');	
    
    $('#jsonEditView').css("display","");
    $('#lblMessage').css("display","none");
    $//('#jsonEditView').attr("name",modifiedJsonVal+"");	
    textareaObj.value = JSON.stringify(finalJson).replace(/"name"/g,'\t"name"').replace(/,"guid"/g,',\n\t"guid"').replace(/,"bookGuid"/g,',\n\t"bookGuid"').replace(/,"questionIds"/g,',\n\t"questionIds"').replace(/{/g,"\n{\n").replace(/}/g,"\n}\n")
    if(textareaObj.style.display=="none"){	
        
    }
    else if(textareaObj.style.display==""){
     //   textareaObj.style.display="none";
     
    }
}
function postFinalJson(){
    try{
        var len = $("#test_"+selectedAssessmentDownloadId).attr("len");
        for(var i=0;i<len;i++){
            if( $("#question_"+i+" option:selected").val()=='0'){
                alert("Please select one option at least");            
                return;
            }

        }
        try{
            $.ajax({
                    type: 'post',
                    url: "http://13.233.76.145/assessment/update_focus_area",
                    processData: true,
                    data: {
                        "guid":selectedAssessmentDownloadId,
                        "focus_area":JSON.stringify(finalJson)
                        },
                    dataType: "json",
                    success: function (data) {
                        alert("success")
                    },
                    error:function(){
                    }
            });
        
        }catch(er){
        
        }
       
     
    }catch(er){
        alert("er282: "+er)
    }
    //var options = $("option:selected", element);
    //return (options[0].value != 0 && options.length > 0 && options[0].value != '') && (element.type == "select-multiple" || ($.browser.msie && !(options[0].attributes['value'].specified) ? options[0].text : options[0].value).length > 0);

}
function ShowCustomDialog(title,htmlContext)
{
    ShowDialogBox(title,htmlContext,'','', 'GoToAssetList',null);
}
function ShowDialogBox(title, content, btn1text, btn2text, functionText, parameterList) {
    var btn1css;
    var btn2css;

    if (btn1text == '') {
        btn1css = "hidecss";
    } else {
        btn1css = "showcss";
    }

    if (btn2text == '') {
        btn2css = "hidecss";
    } else {
        btn2css = "showcss";
    }
    $("#lblMessage").html(content);
    function CloseFunction(){
        //alert('close funciton');
        //loadDomNode();
    }
    $("#dialog").dialog({
        resizable: false,
        title: title,
        modal: true,
        width: '60%',
        height: 'auto',
        position: ['center',20] ,
        bgiframe: false,
        hide: { effect: 'scale', duration: 400 },
        close: CloseFunction,
        dialogClass: 'surveyDialog',
        open: function(event, ui) {
            $(this).parent().css({'margin-left': "20%"});
        },
        buttons: [
                        {
                            text: btn1text,
                            "class": btn1css,
                            click: function () {	
                                var textareaObj = document.getElementById('jsonEditView');	
                                if(textareaObj.style.display=="none"){						
                                    $("#dialog").dialog('close');
                                }
                                else if(textareaObj.style.display==""){
                                    value = textareaObj.name;
                                    console.log("value:"+value+" , textareaObj.value"+ textareaObj.value);
                                    //$("#dialog").dialog('close');
                                    $('#jsonEditView').css("display","none");
                                $('#lblMessage').css("display","");


                                }
                            }
                        },
                        {
                            text: btn2text,
                            "class": btn2css,
                            click: function () {
                                $("#dialog").dialog('close');
                            }
                        }
                    ]
    });
}

function getGUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}



























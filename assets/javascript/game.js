var animalsArr = ["dog", "cat", "kitten", "hippo", "giraffe", "hedgehog", "duckling", "crocodile", "deer", "rabbit", "fox", "piglet", "panda", "baby seal", "racoon", "donkey" ];
var gifs = $('#gifs');
				

$( document ).ready(function() {
	
	function ajaxCallGif(){
		gifs.empty();;
		if(this.value === undefined){
			return;
		}
		var criteria = this.value;

		var queryURL = `http://api.giphy.com/v1/gifs/search?q=${criteria}&api_key=55SEk3CaBZsy7Hc52CPTyNDewZfDtf20`;
		$.ajax({
				  url: queryURL,
				  method: "GET"
				}).then(function(response){
				
				  for(var i=0; i<response.data.length; i++){
				    var img = $('<img>');
				    	img.addClass("mr-3 border rounded");
						img.attr('src',  response.data[i].images.fixed_height_still.url);
						img.attr("data-still", response.data[i].images.fixed_height_still.url);
						img.attr("data-animate",  response.data[i].images.fixed_height.url);
						img.attr("data-state", "still");
						img.on('click', stateChange);
				    gifs.prepend(img);
				  }
				})
	}
	function loadButtons(){
		for(i = 0; i < animalsArr.length; i++) {
		 $("#buttons").append(createButton(animalsArr[i]));
	 }
	}

	function createButton(buttonName){
		var button = $(`<button>${buttonName.toLocaleUpperCase()}</button>`);
		button.attr("id", 'btn_'+ buttonName);
		button.attr("value", buttonName);
		button.addClass("btn btn-primary mr-2 animal");
		button.on('click', ajaxCallGif);
		// , {
		// 	text: buttonName.toLocaleUpperCase(),
		// 	id: 'btn_'+ buttonName,
		// 	class: "btn btn-primary mr-2 animal",
		// 	click:	ajaxCallGif	 
		// });

		return button;
	}
	
	loadButtons();

	$("#btnAddAnimal").on("click", function(){
			var newButtonName = $("#txtAnimal").val();
			if(!$("#txtAnimal").val() && !animalsArr.includes(newButtonName)){
				return;
			}
			$("#buttons").append(createButton(newButtonName));
			$("#txtAnimal").val("");
	});

	function stateChange(){
		var dataStiil =$(this).attr("data-still");
		var dataAnimate =$(this).attr("data-animate");
		var dataState = $(this).attr("data-state");

		if(dataState == "still"){
			 $(this).attr("src", dataAnimate);
				$(this).attr("data-state", "animate");

		}else{
			 $(this).attr("src", dataStiil);
			 $(this).attr("data-state", "still");
		}
	}

});



var animalsArr = ["dog", "cat", "kitten", "hippo", "giraffe", "hedgehog", "duckling", "crocodile", "deer", "rabbit", "fox", "piglet", "panda", "baby seal", "racoon", "donkey" ];


$( document ).ready(function() {
	
	function ajaxCallGif(criteria){
		//var criteria = this.name;
		console.log("aqi");

		var queryURL = `http://api.giphy.com/v1/gifs/search?q=${criteria}&api_key=55SEk3CaBZsy7Hc52CPTyNDewZfDtf20`;
		$.ajax({
				  url: queryURL,
				  method: "GET"
				}).then(function(response){
				
				  for(var i=0; i<response.data.length; i++){
				    var img = $('<img>');
						img.attr('src', response.data[i].images.fixed_width.url);
						img.attr("data-still", response.data[i].images.fixed_height_still);
						img.attr("data-animate",  response.data[i].images.fixed_width.url);
						img.attr("data-state", "still");
				    $('gifs').prepend(img);
				  }
				})

	}
	function loadButtons(){
		for(i = 0; i < animalsArr.length; i++) {
		 $("#buttons").append(createButton(animalsArr[i]));
	 }
	}

	function createButton(buttonName){
		var button //= `` "<button onclick='ajaxCallGif(\"" + buttonName + "\")' class='btn btn-primary mr-2' value='" +buttonName + "'> " +  buttonName.toLocaleUpperCase() + " </button>";



		= $('<button>', {
			text: buttonName.toLocaleUpperCase(),
			id: 'btn_'+ buttonName,
			class: "btn btn-primary mr-2 animal",
			value:buttonName,
			click: ajaxCallGif(buttonName)		 
		});

		console.log(button);
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

	$("img").on("click", function(){
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
	});



});



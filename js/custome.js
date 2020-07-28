
	/* Fetching The Cards List From Database Based on User Profile */
	var userdata;
	/* Fetching Data From User 1 */
	var profile = 'user_1';
	//var profile = 'user_2';
	//var profile = 'user_3';
	
	/* Accessing Data From External JSON File */
	$.getJSON('database.json', function (data) {
		userdata = data[profile];
		//console.log(userdata);
		var cardlist = $();
		/* Adding All Cards Through Loop */
		$.each(userdata, function(key, value) {
			//alert(value.img);
			cardlist = cardlist.add('<div class="card"> <img src="'+value.img+'" class="card-img-top"> <div class="card-body"> <span class="card-title">'+value.title+'</span> <span class="card-close" pos="'+key+'">X</span> </div> </div>');
		}); 
		/* Adding Fetched Cards To Page */
		$('.card-columns').prepend(cardlist);
	});
	
	/* Adding Close Event To Card */
	$('.card-columns').delegate('.card-close','click',function() {
		/* Get index position */
		var action = "delete-card";
		var user_profile = profile;
		var position = $(this).attr('pos');
		console.log(position);
		
		/* Updtate card in database */
		$.ajax({
			type: "POST",
			url: "update-data.php",
			data: {act: action, pos: position, user_prof: user_profile},
			dataType: 'json',
			cache: false,
			success: function (result) {
				alert(result.message);
			},
			error: function (jqXHR, exception) {
				var msg = 'Error';
				if (jqXHR.status === 0) {
					msg = 'Not connect.\n Verify Network.';
				} else if (jqXHR.status == 404) {
					msg = 'Requested page not found. [404]';
				} else if (jqXHR.status == 500) {
					msg = 'Internal Server Error [500].';
				} else if (exception === 'parsererror') {
					msg = 'Requested JSON parse failed.';
				} else if (exception === 'timeout') {
					msg = 'Time out error.';
				} else if (exception === 'abort') {
					msg = 'Ajax request aborted.';
				} else {
					msg = 'Uncaught Error.\n' + jqXHR.responseText;
				}
				alert(msg);
			},
		});
		/* Remove Card */
		$(this).closest('.card').remove();
		location.reload();
	});

	/* Code For Adding New Card Start */
	$(document).on("submit", "#new-card-form", function(e){
		/* Prevent Form Submission */
		e.preventDefault();
		
		/* Get New Card Details From Form */
		var action = "new-card";
		var cardimgurl = $('#img-url').val();
		var cardname = $('#card-name').val();
		
		console.log(userdata);
		/* check for duplication of card by card name */
		var unique_card = userdata.findIndex(function(item, i){
			return item.title === cardname
		});
		//console.log(unique_card);
		
		/* Add card if it is unique */
		if(unique_card == -1){
			var user_profile = profile;
			var newcard = $();
			newcard = newcard.add('<div class="card"> <img src="'+cardimgurl+'" class="card-img-top"> <div class="card-body"> <span class="card-title">'+cardname+'</span> <span class="card-close">X</span> </div> </div>');
			
			/* Add card to database */
			$.ajax({
				url: "update-data.php",
				type: "post",
				dataType: 'json',
				data: {act: action, imgurl: cardimgurl, cdname: cardname, user_prof: user_profile},
				cache: false,
				success: function(result){
					alert(result.message);
				},
				error: function (jqXHR, exception) {
					var msg = 'Error';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					alert(msg);
				},
			});
			
			/* Appending The New Card To Existing List */
			$('.card-columns').prepend(newcard);
			
			/* Reseting Modal Form After Submitting */
			$('#new-card-form').trigger("reset");
			
			/* Closing The Modal After Form Submitting */
			$("#add-card-popup .close").click();
			location.reload();
		}else{
			alert("This Card Name is Already Exist.");			
		}
	});
	/* Code For Adding New Card Ends */
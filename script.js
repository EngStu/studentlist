var listOfStu = [{roll: 01,	gender: "Ashin", name: "Kosalla"},
								{roll: 02, gender: "Ma", name: "Sutesi"},
								{roll: 03, gender: "Mr", name: "Aung Aung"},
								{roll: 04, gender: "Mrs",	name: "Aye Aye"}];

var finStu = []; /*[{roll: 05, gender: "Ashin",	name: "Indaka"},
							{roll: 06, gender: "Ma", name: "Khemacari"}]; */

var menuBtn = '<span id="del">D</span><span id="mov">M</span> ';

init();

function init(){
	displayList();
	// showMenu();
};

function displayList() {
	//List of Students
	if(listOfStu.length === 0){
		$("#liStu").append("<h3>No more student</h3>");
	}
	if(finStu.length === 0){
		$("#finStu").append("<h3>No Student</h3>");
	}
	
	for(var i = 0; i < listOfStu.length; i++){
		$("#liStu").append("<li>"+ listOfStu[i].gender + " " 
			+ listOfStu[i].name +  " " + menuBtn +  "</li>");
	};
	
	for(var i = 0; i < finStu.length; i++){
		$("#finStu").append("<li> "+ finStu[i].gender + " "
			+ finStu[i].name + " " + menuBtn + "</li>");
	};
};

function clearList() {
	$("#liStu").text("");
	$("#finStu").text("");
};

function addStu() {
	var getGender = $("#gender").val();
	var getName = $("input[type='text']").val();
	var capName = getName.substr(0,1).toUpperCase()+getName.substr(1);
	
	//if no type in name, it does not work
	if(getName){
		//Update listOfStu array list 
		var newObj = { gender: getGender, name: capName };
		listOfStu.push(newObj);

		//Display new added student to list
		var numStu = listOfStu.length;
		$("#liStu").append("<li>" + listOfStu[numStu-1].gender + " " 
				+ listOfStu[numStu-1].name + " " + menuBtn + "</li>");
	}
	
	

	//Clear input
	$("input[type='text']").val("");

	//If new student is just added, enable generator button
	if(listOfStu.length > 0){
		$("#genBtn").attr("disabled", false);
	}
};

function generator(){
	var num = Math.floor(Math.random() * listOfStu.length);
	var selGender = listOfStu[num].gender;
	var selName = listOfStu[num].name; 
	
	//Display selected student
	$("#choseStu").text(selGender + " " + selName);


	//move selected student to finStu list
	if(listOfStu.length > 0){
		var finObj = { gender: selGender, name: selName };
		finStu.push(finObj);
	}
	
	//delete selected student
	listOfStu.splice(num, 1);
	
	//if lisOfStu is empty, no more generator button
	if(listOfStu.length === 0){
		$("#genBtn").attr("disabled", "disabled");
	}

	//Clear both old lists and update new lists 
	clearList();
	displayList();
	// showMenu();
	if(finStu.length > 0){
		$("#move").css("display", "block");
	} 
};

function toggleBackBtn() {
	if(finStu.length > 0){
		$("#move").css("display", "block");
	} else {
		$("#move").css("display", "none");
	}
};

function toggleGenBtn() {
	if(listOfStu.length > 0){
		$("#genBtn").attr("disabled", false);
	} else {
		$("#genBtn").attr("disabled", "disabled");
	}
};

function moveBack() {
	// for(let i = 0; i < finStu.length; i++){
	// 	listOfStu.push(finStu[i]);
	// 	finStu.splice(i, 1);
	// }
	let i = 0;
	while(i < finStu.length){
		listOfStu.push(finStu[i]);
		finStu.splice(i, 1);
		i++;
	}
	clearList();
	displayList();
	// showMenu();
	$("#genBtn").attr("disabled", false);
};

$("#genBtn").on("click", function(e){
	generator();
	e.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13) { addStu(); }
	event.stopPropagation();
});

$("#addBtn").on("click", function(e){ addStu(); e.stopPropagation(); });

//Move all finStu list to lisOfStu
$("#move").on("click", function(e){
	moveBack();
	toggleBackBtn();
	e.stopPropagation();
});

// $("li").hover(function(){
// 	$(this).("#del").css("color", "green");
// 	// $("#del").fadeOut(100);
// })

//Delete Student
function updateList(){
	clearList();
	displayList();
	toggleBackBtn();
	toggleGenBtn();
	// showMenu();
}

//To appear menu button when hover each list
// function showMenu(){
// 	$("li").hover(function(e){
// 		$(this).children("span").fadeToggle(1000);
// 		e.stopPropagation();
// 	})
// }

$("#liStu").on("click", "#del", function(e){
	var index = $(this).parent().index();
	listOfStu.splice(index, 1);
	updateList();
	e.stopPropagation();
})

$("#finStu").on("click", "#del", function(e){
	var index = $(this).parent().index();
	finStu.splice(index, 1);
	updateList();
	e.stopPropagation();
})

//Move Student
$("#liStu").on("click", "#mov", function(e){
	var index = $(this).parent().index();
	finStu.push(listOfStu[index]);
	listOfStu.splice(index, 1);
	updateList();
	e.stopPropagation();
});

$("#finStu").on("click", "#mov", function(e){
	var index = $(this).parent().index();
	listOfStu.push(finStu[index]);
	finStu.splice(index, 1);
	updateList();
	e.stopPropagation();
})

//Slide Up and Down both lists
$(".list").on("click", "#togList", function(e){
	$(this).parent().parent().children("ol, #move").slideToggle("slow");
	e.stopPropagation();
})

//Setting Toggle
$("#setHead").on("click", function(e){
	$(this).parent().children("ul").slideToggle("slow");
	e.stopPropagation();
})

// $("body").on("click", function(e){
// 	$("#setList").children("ul").slideUp(2000);
// 	e.stopPropagation();
// })

//Add Form to appear
$("#addForm").on("click", function(e){
	$("#add").slideToggle("slow");
	e.stopPropagation();
})

// $("#add").on("click", function(e){
// 	$(this).slideUp(3000);
// 	e.stopPropagation();
// }

$("#about").on("click", function(e){
	$("#head, #setList, .list").fadeOut(1000, function(){
		$("#aboutMe").slideDown(8000, function(){
			$("body").css("background", "black");
		});
		$("#aboutText").slideDown(10000);
	});
	e.stopPropagation();
})

$("#aboutMe").on("click", function(e){
	$(this).slideUp(3000, function(){
		$("body").css("background", "#02111D")
		$("#head, #setList, .list").fadeIn(2000);
	});
	e.stopPropagation();
})


$(document).ready(function(){
	//Global variables
	var defenderId,
	attackerId,
	attackerHp,
	defenderHp,
	attackPower,
	enemyCount,
	//array of characters
	character = [{name: "Mario", 
				hp: 130, 
				attackPower: 10, 
				counterAttack: 5, 
				img: "mario.jpg"},

				{name: "Bowser", 
				hp: 110, 
				attackPower: 8, 
				counterAttack: 10, 
				img: "bowser.jpg"},

				{name: "Luigi", 
				hp: 120, 
				attackPower: 15, 
				counterAttack: 5, 
				img: "luigi.jpg"},

				{name: "Peach", 
				hp: 100, 
				attackPower: 6, 
				counterAttack: 25, 
				img: "peach.jpg"}];
	
	//This function is called when the game start and every time restart is pressed
	function newGame(){
		//initialize variables
		attackPower = 0;
		defenderId = "";
		attackerId = "";
		attackerHp = 0;
		defenderHp = 0;
		enemyCount = character.length - 1;

		//Clean containers
		$("#yourCharacter").empty();
		$("#characters").empty();
		$("#defender").empty();
		$("#msg").empty();
		$("#topMsg").text("Select your character");

		
		for(var i = 0; i < character.length; i++){
			
			var div = $("<div>").addClass("character").attr("id",i);
			$("#characters").append(div);


			div.append($("<img>").attr("src", "assets/images/" + character[i]["img"]));
			div.append($("<p>").text(character[i]["name"]));
			div.append($("<p>").html("Health Points: <span>" + character[i]["hp"] + "</span>"))
			div.append($("<p>").html("Attack Power: " + character[i]["attackPower"]));
			div.append($("<p>").html("Counter Attack: " + character[i]["counterAttack"]))
		}
		attachOnClick(); 
	}

	
	function addProgressBar(className){
		var progressbar = $("<div>").addClass("progress");
		var div = $("<div>").addClass("progress-bar progress-bar-success").text("100%");
		progressbar.append(div);
		$(className).append(progressbar);
	}

	newGame(); 
	var msg = $("#msg");

	
	$("#restart").on("click", function(){
		newGame();
		$(this).css("display", "none");
	});

	
	function attachOnClick() {
		$(".character").on("click", function(){
			
			var currentCharacter = $(this); 
			if(attackerId == ""){
				attackerId = currentCharacter.attr("id"); 
				attackerHp = character[attackerId].hp;    
				currentCharacter.addClass("attacker");    
				currentCharacter.off("click"); 

				
				$("#yourCharacter").append(currentCharacter); 

				
				addProgressBar(".attacker");

				$("#topMsg").text("Enemies Available To Attack");

				
			}else if(defenderId == ""){
				defenderId = currentCharacter.attr("id"); 
				defenderHp = character[defenderId].hp;    
				currentCharacter.addClass("defender");    
				currentCharacter.off("click"); 
				$("#defender").append(currentCharacter);  

				
				addProgressBar(".defender");
				
				$("#attack").css("display", "inline"); 
				msg.empty(); 
			}
		});
	}

	
	$("#attack").click(function(){
		
		
		attackPower += character[attackerId]["attackPower"];
		defenderHp -= attackPower; 
		if(defenderHp <= 0){
			$("#" + defenderId).remove(); 
			$("#attack").css("display", "none"); 

			enemyCount --; 
			
			if(enemyCount == 0){
				msg.html("<p>You Won!!!</p>");
				$("#restart").css("display", "block");
			}else{ 
				msg.html("<p>You have defeated " + character[defenderId].name + ", you can choose to fight another enemy.</p>");
				defenderId = "";
			}

		}else{ 
			$(".defender span").text(defenderHp); 
			var defHpPercent = defenderHp * 100 / character[defenderId].hp;
			$(".defender .progress-bar").width(defHpPercent + "%").text(Math.round(defHpPercent) + "%");


			attackerHp -= character[defenderId].counterAttack; 
			$(".attacker span").text(attackerHp);
		
			
			var attHpPercent = attackerHp * 100 / character[attackerId].hp;
			$(".attacker .progress-bar").width(attHpPercent + "%").text(Math.round(attHpPercent) + "%");;


			if(attackerHp > 0){ 
				msg.html("<p>You attacked " + character[defenderId]["name"] + " for "+ attackPower + " damage. <br>" +
				character[defenderId]["name"] + " attacked you back for "+ character[defenderId]["counterAttack"] + " damage.</p>");
			}else{ 
				msg.html("<p>You have been defeated...</P>");
				$("#attack").css("display", "none");
				$("#restart").css("display", "block");
			}
		}		
	});
});
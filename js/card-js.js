$(function(){
	//List of all the words and keys
	var wordListMaster = [
		{'word':'Abate','define': 'become less in amount or intensity'},
		{'word':'Chicanery','define': 'the use of tricks to deceive someone'},
		{'word':'Disseminate','define': 'cause to become widely known'},
		{'word':'Gainsay','define': 'take exception to'},
		{'word':'Latent','define': 'potentially existing but not presently evident or realized'},
		{'word':'Aberrant','define': 'markedly different from an accepted norm'},
		{'word':'Coagulate','define': 'change from a liquid to a thickened or solid state'},
		{'word':'Dissolution','define': 'separation into component parts'},
		{'word':'Garrulous','define': 'full of trivial conversation'},
		{'word':'Laud','define': 'praise, glorify, or honor'},
		{'word':'Abeyance','define': 'temporary cessation or suspension'},
		{'word':'Coda','define': 'the closing section of a musical composition'},
		{'word':'Dissonance','define': 'disagreeable sounds'},
		{'word':'Goad','define': 'stab or urge on as if with a pointed stick'},
		{'word':'Lethargic','define': 'deficient in alertness or activity'},
		{'word':'Abscond','define': 'run away, often taking something or somebody along'},
		{'word':'Cogent','define': 'powerfully persuasive'},
		{'word':'Distend','define': 'cause to expand as it by internal pressure'},
		{'word':'Gouge','define': 'an impression in a surface, as made by a blow'},
		{'word':'Levee','define': 'an embankment built to prevent a river from overflowing'},
		{'word':'Abstemious','define': 'marked by temperance in indulgence'},
		{'word':'Commensurate','define': 'corresponding in size or degree or extent'},
		{'word':'Distill','define': 'undergo condensation'},
		{'word':'Grandiloquent','define': 'lofty in style'},
		{'word':'Levity','define': 'a manner lacking seriousness'},
		{'word':'Admonish','define': 'scold or reprimand; take to task'},
		{'word':'Compendium','define': 'a publication containing a variety of works'},
		{'word':'Diverge','define': 'move or draw apart'},
		{'word':'Gregarious','define': 'temperamentally seeking and enjoying the company of others'},
		{'word':'Log','define': 'a segment of the trunk of a tree when stripped of branches'},
		{'word':'Adulterate','define': 'make impure by adding a foreign or inferior substance'},
		{'word':'Complaisant','define': 'showing a cheerful willingness to do favors for others'},
		{'word':'Divest','define': 'take away possessions from someone'},
		{'word':'Guileless','define': 'free of deceit'},
		{'word':'Loquacious','define': 'full of trivial conversation'},
		{'word':'Aesthetic','define': 'characterized by an appreciation of beauty or good taste'},
		{'word':'Compliant','define': 'disposed to act in accordance with someones wishes'},
		{'word':'Document','define': 'a representation of a persons thinking with symbolic marks'},
		{'word':'Gullible','define': 'naive and easily deceived or tricked'},
		{'word':'Lucid','define': 'transparently clear; easily understandable'},
		{'word':'Aggregate','define': 'a sum total of many heterogeneous things taken together'},
		{'word':'Conciliatory','define': 'making or willing to make concessions'},
		{'word':'Dogmatic','define': 'pertaining to a code of beliefs accepted as authoritative'},
		{'word':'Harangue','define': 'a loud bombastic declamation expressed with strong emotion'},
		{'word':'Luminous','define': 'softly bright or radiant'},
		{'word':'Alacrity','define': 'liveliness and eagerness'},
		{'word':'Condone','define': 'excuse, overlook, or make allowances for'},
		{'word':'Dormant','define': 'inactive but capable of becoming active'},
		{'word':'Homogeneous','define': 'all of the same or similar kind or nature'},
		{'word':'Magnanimity','define': 'liberality in bestowing gifts'}];
	var wordList= []
	var allWords = [];
	var wrongWords = [];
	var cword; var picked; var correct;

	$('.selection-content div').click(function(){
		var n;
		var $thisid = $(this).attr('id');
		n = $thisid;

		wordList = $(shuffleAnswer(wordListMaster).slice(0,n))

		$('.selection-tab').css('transform','translateY(-100%)');
		selectNewWord();
	});
	//Activates when a defintion is clicked
	$('.definition').click(function(){
		if( $('.form .definition.selectedwrd').length){
			$('.form .definition.selectedwrd').removeClass('selectedwrd');
		}

		if ($(this).hasClass('selectedwrd')){
			$(this).removeClass('selectedwrd');
		}
		else{
			$(this).addClass('selectedwrd');
		}
	})

	//Activates once the check button is clicked
	$('.check').click(function(){
		if(!$('.definition.selectedwrd').length){
			$('.alert').css('display','inline');
		}
		else{
			correct = $('.definition').filter('[data-value=1]').text();
			picked = $('.definition.selectedwrd').text();
			//If this is the last card also show results
			if (allWords.length == wordList.length){
				console.log('i am here');
				$('.next-card').css('display','none');
				$('.next-card').removeClass('next-card').addClass('see-results');
				checkVal(correct,picked);
				$('.crd-flip').toggleClass('flip');
				showWrongWrds();
				
			}
			else{
				checkVal(correct,picked);
				$('.crd-flip').toggleClass('flip');
				$('.alert').css('display','none');
			}
		}
	});

	$('.next-card').click(function(){
		cword = " "; picked = " "; correct = " ";
		$('.definition').attr('data-value','0');
		selectNewWord();
		$('.form .definition.selectedwrd').removeClass('selectedwrd');
		$('.crd-flip').toggleClass('flip');
	});

	$('.answerdetails').click(function(){
			$('.crd-flip').css('display','none');
			$('.body-wrap').css({
				'overflow': 'auto',
				'height': 'auto'
			});
			$('.prog-res-box').css({
				'position': 'relative',
				'left': '0',
				'margin': '1.5em auto'
			});
			$('.missed').css('display','block');
			listMissed();
	});

	$('.tryagainbutt').click(function(){
		window.location.reload();
	});

/***** ALL FUNCTIONS *****/

	//Function: Displays a new word each time
	function selectNewWord(){
		//Initial word to diplay at random
		var nword = wordList[rwordIndex()];
		cword = assignRanWord(nword,allWords);
		$('.allwrds').text(allWords.length);
		$('.wrdlist').text(wordList.length);
		//Assign the word to the screen
		$('.wrd').text(cword.word);

		//array of all the choices
		var wordChoices = $('.definition');

		//picks one to be the answer at random
		var correctDef = $(shuffleAnswer(wordChoices).slice(0,1));
		correctDef.children('span').text(cword.define);
		correctDef.attr('data-value','1');
		//set up an array of words already used
		var usedWords = [cword];

		//checking through each choices space
		for (var i = 0; i < wordChoices.length; i++) {
			var choice = $(wordChoices[i]);
			//if the space is a wrong aswer
			if (choice.attr('data-value') == '0'){
				//get a random word after check
				var ranword = wordList[rwordIndex()];
				var assigned = assignRanWord(ranword,usedWords);
				//append that definition 
				choice.children('span').text(assigned.define);
			}
			};
	} 
	//Function: Check the if the answer picked is correct
	//... also checks if a radio was clicked
	function checkVal (correct,picked){
		if (correct == picked){
			$('.wrd-result').text("CORRECT").css('color','#77dd77');
			$('.correct-def').text(cword.word + ": " + cword.define);
			$('.incorrect-def').css('display','none');
			$('.answertab').css('display','none');
		}
		else{
			wrongWords.push(cword);
			$('.wrd-result').text("WRONG").css('color','#FF6961');
			$('.incorrect-def').text(picked).css('display','block');
			$('.answertab').css('display','block');
			$('.correct-def').text(cword.word + ": " + cword.define);
		}
		return true;
		allWords.push(cword);
		
	}

	//Function: Finding a random index in the wordList
	function rwordIndex(){
		return Math.floor(Math.random() * wordList.length);
	}

	//Function: Takes an array and shuffles it
	function shuffleAnswer(array){
		var m = array.length, t , i;

		while(m){
			i = Math.floor(Math.random() * m--);

			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

	//Function: Getting a random defintion
	function assignRanWord(ranword,array){
		//a. set up variables
		var $ranword = ranword;
		//b. check if the word picked is already used
		//... if it is then repeat the same function with a new random word
		if (checkUsed($ranword,array)){
			$ranword = wordList[rwordIndex()];
			return assignRanWord($ranword,array);		
		}
		//c. if it isn't, push this word in the array
		//... and return the random unused word
		else{
			array.push($ranword);
			return $ranword;
		}
	}
	//Function: Chcecking through the array of already used words
	function checkUsed(rw,array) {
		var word_inside = false;

		//check if the word is inside the array
		for (var i = 0; i < array.length; i++) {
			if (array[i].word == rw.word){
				word_inside = true;
			}
		};
		//return the result
		if (word_inside == true){
			return true;
		}
		else{
			return false;
		}

	}

	function showWrongWrds () {
		$('.results-compiled').css('display','block');
		$('.missednum span').text(wrongWords.length);
		$('.correctnum span').text((wordList.length - wrongWords.length));
	}

	function listMissed () {
		$('.results-compiled').css('display','block');
		$('.missednum span').text(wrongWords.length);
		$('.correctnum span').text((wordList.length - wrongWords.length));

		// for (var i = 0; i < wrongWords.length; i++) {
		// 	$('.missedwrdlist').append('<p class="missedwrd">' + wrongWords[i].word + ': ' + wrongWords[i].define + "</p>");
		// 	console.log(wrongWords[i].word);
		// };
		for (var i = 0; i < wordList.length; i++) {
			if (wrongWords.includes(wordList[i])){
				$('.missedwrdlist').append('<p class="missedwrd">' + wordList[i].word + ': ' + wordList[i].define + "</p>");
			}
			else{
				$('.missedwrdlist').append('<p>' + wordList[i].word + ': ' + wordList[i].define + "</p>");
			}
		};
		console.log(wrongWords.length);
	}
});
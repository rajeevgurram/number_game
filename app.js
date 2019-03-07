let numbers = [];

const $game = $(".game");

const utils = {
	min: 0,
	max: 8,
	getRandonNumber() {
	    const number = Math.floor(Math.random() * 
	    				(this.max - this.min + 1)) + this.min;
	    if(numbers.indexOf(number) >= 0) {
	    	return this.getRandonNumber();
	    }
	    return number;
	}
}

function shuffleNumbers() {
	const number = utils.getRandonNumber();
	numbers.push(number);

	if(numbers.length > 8) {
		return;
	} else {
		shuffleNumbers();
	}
}

function displayNumbers() {
	for(let i = 0; i < numbers.length; i ++) {
		const num = numbers[i];
		if (num == 0) {
			$game.append("<div class='empty'>" + num + "</div>");	
		} else {
			$game.append("<div class='number' data-number = " + num + ">" + num + "</div>");
		}
	}
}

function canGoLeft(index) {
	if(index % 3 == 0) {
		return false;
	}
	return true;
}

function canGoRight(index) {
	if((index + 1) % 3 == 0) {
		return false;
	}
	return true;
}

function canGoDown(index) {
	if(index == 6 || index == 7 || index == 8) {
		return false;
	}
	return true;
}

function canGoUp(index) {
	if(index == 0 || index == 1 || index == 2) {
		return false;
	}
	return true;
}

$(document).ready(() => {
	shuffleNumbers();
	displayNumbers();

	$(document).on("click", ".number", function() {
		const $block = $(this);
		const $empty = $(".empty");

		const number = parseInt($block.html());
		const numberIndex = $block.index();
		const emptyIndex = $empty.index();

		// console.log('number ', number);
		// console.log('number index', numberIndex);
		// console.log('empty index', emptyIndex);

		// console.log('can go left ? ', canGoLeft(numberIndex));
		// console.log('can go right ? ', canGoRight(numberIndex));
		// console.log('can go up ? ', canGoUp(numberIndex));
		// console.log('can go down ? ', canGoDown(numberIndex));


		if(canGoLeft(numberIndex) && numberIndex - 1 == emptyIndex) {
			console.log("Swap Can Be Done at Left");
			swap($block);
		} else if(canGoRight(numberIndex) && numberIndex + 1 == emptyIndex) {
			console.log("Swap Can Be Done at Right");
			swap($block);
		} else if(canGoUp(numberIndex) && numberIndex - 3 == emptyIndex) {
			console.log("Swap Can Be Done at Up");
			swap($block);
		} else if(canGoDown(numberIndex) && numberIndex + 3 == emptyIndex) {
			console.log("Swap Can Be Done at Down");
			swap($block);
		} else {
			console.log("can't move");
		}

		function swap($elem) {
			const $elemTemp = $elem.clone();
			const $emptyTemp = $empty.clone();

			$elem.replaceWith($emptyTemp);
			$empty.replaceWith($elemTemp);

			if(isSolved()) {
				alert("Congratulations !!!!");
			}
		}

		function isSolved() {
			let solved = true;
			$game.find("div.number").each((index, elem) => {
				const num = $(elem).html();
				if(index != num - 1 && num != 0) {
					solved = false;
				}
			});
			return solved;
		}
 
	});
});
$(document).ready(function () {

    class Cat {
        constructor(name, pictureUrl, clickCount) {
            this.name = name;
            this.pictureUrl = pictureUrl;
            this.clickCount = clickCount;
        }

        addToDOM() {
            var element = document.createElement('button');
            element.className = 'list-group-item';
            element.type = 'button';
            element.innerText = this.name;

            function getCat(cat) {
                if (cat.name === this) {
                    return cat;
                }
            }

            element.addEventListener('click', function () {
                const catContainer = document.querySelector('#catDetailsContainer');
                while (catContainer.firstChild) {
                    catContainer.removeChild(catContainer.firstChild);
                }

                var foundCat = cats.find(getCat, this.textContent);
                var counter = document.createElement('p');
                counter.id = this.textContent + 'Image';
                counter.innerText = foundCat.clickCount;
                catContainer.appendChild(counter);

                var catImage = document.createElement('img');
                catImage.src = foundCat.pictureUrl;
                catImage.alt = foundCat.name;
                catImage.width = 200;

                catImage.addEventListener('click', function () {
                    let foundCat = cats.find(getCat, this.alt);
                    foundCat.clickCount++;
                    let counter = document.querySelector('#'+foundCat.name+'Image');
                    counter.textContent = foundCat.clickCount;
                });

                catContainer.appendChild(catImage);

            });
            const container = document.querySelector('#catList');
            container.appendChild(element);
            cats.push(this);
        }

    }

    cats = [];

    poplinre = new Cat('poplinre', 'img/poplinre.jpg', 0);
    poplinre.addToDOM();

    chewie = new Cat('chewie', 'img/chewie.jpg', 0);
    chewie.addToDOM();

    jetske = new Cat('jetske', 'img/jetske.jpg', 0);
    jetske.addToDOM();

    whiteKittenonPinkThrow = new Cat('whiteKittenonPinkThrow', 'img/whiteKittenonPinkThrow.jpeg', 0);
    whiteKittenonPinkThrow.addToDOM();

    youngKitten = new Cat('youngKitten', 'img/youngKitten.jpg', 0);
    youngKitten.addToDOM();
});
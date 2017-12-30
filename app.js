$(function () {

    var model = {

        Cat: class {
            constructor(name, pictureUrl, clickCount) {
                this.name = name;
                this.pictureUrl = pictureUrl;
                this.clickCount = clickCount;
            }
        },

        cats: [],

        selectedCat: undefined,

        initCats: function () {
            poplinre = new model.Cat('poplinre', 'img/poplinre.jpg', 0);
            chewie = new model.Cat('chewie', 'img/chewie.jpg', 0);
            jetske = new model.Cat('jetske', 'img/jetske.jpg', 0);
            whiteKittenonPinkThrow = new model.Cat('whiteKittenonPinkThrow', 'img/whiteKittenonPinkThrow.jpeg', 0);
            youngKitten = new model.Cat('youngKitten', 'img/youngKitten.jpg', 0);

            model.cats.push(poplinre);
            model.cats.push(chewie);
            model.cats.push(jetske);
            model.cats.push(whiteKittenonPinkThrow);
            model.cats.push(youngKitten);

            model.selectedCat = model.cats[0];
        }
    };

    var catListView = {
        init: function () {
            this.catListContainer = document.querySelector('#catList');
            catListView.render();
        },

        render: function () {
            octopus.getCats().forEach(catItem => {
                var element = document.createElement('button');
                element.className = 'list-group-item';
                element.type = 'button';
                element.innerText = catItem.name;
                element.addEventListener('click', (function (catItemCopy) {
                    return function () {
                        octopus.setSelectedCat(catItemCopy);
                    };

                })(catItem));

                this.catListContainer.appendChild(element);
            });

        }
    };

    var catDetailView = {
        init: function () {
            this.catDetailsContainer = document.querySelector('#catDetailsContainer');
            this.catName = document.querySelector('#catName');
            this.counter = document.querySelector('#counter');
            this.catImage = document.querySelector('#catImage');
            this.catImage.addEventListener('click', function () {
                let selectedCat = octopus.getSelectedCat();
                octopus.incrementClickCount();
                catDetailView.render();
            });

            catDetailView.render();
        },

        render: function () {
            let selectedCat = octopus.getSelectedCat();
            this.counter.innerText = selectedCat.clickCount;
            this.catImage.src = selectedCat.pictureUrl;
        }
    };

    var octopus = {
        init: function () {
            model.initCats();
            catListView.init();
            catDetailView.init();            
        },

        getCats: function () {
            return model.cats;
        },

        setSelectedCat: function (selectedCat) {
            model.selectedCat = selectedCat;
            catDetailView.render();
        },

        getSelectedCat: function () {
            if (!model.selectedCat) {
                throw Error("Cat Selection Error!");
            }
            return model.selectedCat;
        },

        incrementClickCount: function () {
            model.selectedCat.clickCount++;
        }
    };

    octopus.init();

});
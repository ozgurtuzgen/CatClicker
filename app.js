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
        },

        saveCat: function (name, url, counter) {
            for (let index = 0; index < model.cats.length; index++) {
                const element = model.cats[index];

                if (element.name === model.selectedCat.name){
                    element.name = name;
                    element.clickCount = counter;
                    element.pictureUrl = url;
                    model.selectedCat = element;
                }                
            } 
        }

    };

    var catListView = {
        init: function () {
            this.catListContainer = document.querySelector('#catList');
            catListView.render();
        },

        render: function () {
            this.catListContainer.innerHTML = '';
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
                octopus.incrementClickCount();
            });

            catDetailView.render();
        },

        render: function () {
            let selectedCat = octopus.getSelectedCat();
            this.counter.innerText = selectedCat.clickCount;
            this.catImage.src = selectedCat.pictureUrl;
        }
    };

    var adminView = {
        init: function () {
            this.adminButton = document.querySelector('#adminButton');
            this.adminContainer = document.querySelector('#adminContainer');
            this.adminName = document.querySelector('#adminName');
            this.adminImgUrl = document.querySelector('#adminImgUrl');
            this.adminCounter = document.querySelector('#adminCounter');
            this.adminSave = document.querySelector('#adminSave');
            this.adminCancel = document.querySelector('#adminCancel');
            this.adminButton.addEventListener('click', function () {

                adminContainer.className = 'adminmode';
                adminView.render();
            });
            this.adminCancel.addEventListener('click', function () {
                adminView.close();
                adminContainer.className = 'readonly';
            });
            this.adminSave.addEventListener('click', function () {
                octopus.saveCat(adminName.value, adminImgUrl.value, adminCounter.value);
                adminView.close();
            });
        },
        close: function () {
            adminCounter.value = '';
            adminImgUrl.value = '';
            adminName.value = '';
            adminContainer.className = 'readonly';
        },
        render: function () {
            let selectedCat = octopus.getSelectedCat();
            adminName.value = selectedCat.name;
            adminImgUrl.value = selectedCat.pictureUrl;
            adminCounter.value = selectedCat.clickCount;
        }
    }

    var octopus = {
        init: function () {
            model.initCats();
            catListView.init();
            catDetailView.init();
            adminView.init();
        },

        getCats: function () {
            return model.cats;
        },

        setSelectedCat: function (selectedCat) {
            model.selectedCat = selectedCat;
            catDetailView.render();
            adminView.render();
        },

        getSelectedCat: function () {
            if (!model.selectedCat) {
                throw Error("Cat Selection Error!");
            }
            return model.selectedCat;
        },

        incrementClickCount: function () {
            model.selectedCat.clickCount++;
            catDetailView.render();
            adminView.render();
        },

        saveCat: function (name, url, counter) {
            model.saveCat(name,url, counter);
            catListView.render();
            catDetailView.render();
        }
    };

    octopus.init();

});
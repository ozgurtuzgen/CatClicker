$(document).ready(function () {

    class Cat {
        constructor(name, pictureUrl, clickCount) {
            this.name = name;
            this.pictureUrl = pictureUrl;
            this.clickCount = clickCount;
        }

        addToDOM() {
            var inlineHtml = `<h3>Click Count</h3>
            <p id='${this.name}'>0</p>
            <figure id='${this.name + "Figure"}'>
                <img src="${this.pictureUrl}" alt="${this.name}" width="300">
            </figure>`

            const container = document.querySelector('#cats');
            container.insertAdjacentHTML('afterbegin', inlineHtml);

            $('#' + this.name + 'Figure').click(function () {

                cats.forEach(element => {
                    if (element.name + 'Figure' === this.id) {
                        var text = $('#' + element.name);
                        element.clickCount++;
                        text.text(element.clickCount);
                    }
                });
                
            });

            cats.push(this);
        }

    }

    cats = [];

    poplinre = new Cat('poplinre', 'img/poplinre.jpg', 0);

    poplinre.addToDOM();

    chewie = new Cat('chewie', 'img/chewie.jpg', 0);

    chewie.addToDOM();
});
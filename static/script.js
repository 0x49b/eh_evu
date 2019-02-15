let global_res = '';

function shorten(e) {

    e.preventDefault();

    let url = document.querySelector("#url").value;
    let key = document.querySelector("#key").value;

    fetch(`/shorten?url=${url}&key=${key}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(JSON.stringify(response));
            global_res = response;
            document.querySelector(".shortened").innerHTML = '' +
                '<div class="alert alert-info mt-1 mb-4" role="alert"> ' +
                'Your shortened link <a href="' + response.href + '" target="_blank">' + response.display + '</a>' +
                '<button class="btn btn-default" onclick="copyURL()"><i class="far fa-copy" id="copied"></i></button>' +
                '</div> ';

            // Empty InputFields
            document.querySelector("#url").value = '';
            document.querySelector("#key").value = '';
        });
}

function copyURL() {
    const el = document.createElement('textarea');
    el.value = global_res.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);


    document.getElementById('copied').classList.remove('far', 'fa-copy');
    document.getElementById('copied').classList.add('fas', 'fa-check', 'text-success');

    setTimeout(function () {
        document.getElementById('copied').classList.remove('fas', 'fa-check', 'text-success');
        document.getElementById('copied').classList.add('far', 'fa-copy');
    }, 2000);

}
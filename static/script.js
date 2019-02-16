$(document).ready(function () {

    let host = 'http://192.168.99.12';
    let port = 3000;

    let customer;

    $.getJSON(host + ':' + port + '/assets?id=10', function (json) {
        console.log("JSON Data: " + JSON.stringify(json));

        customer = json;
        $('#customer-name').html(json.customer.name);
        $('#customer-id').html(json.customer.id);
        $('#customer-name-inner').html(json.customer.name);
        $('#customer-address').html(json.customer.address);
        $('#customer-zip-location').html(json.customer.zip + " " + json.customer.location);
        $('#customer-points').html(json.customer.points);

        $.each(json.customer.assets, function (i, item) {
            $('#customer-assets').append(
                "<div class=\"accordion\" id=\"accordionAssets\">\n" +
                "    <div class=\"card\">\n" +
                "        <div class=\"card-header\" id=\"heading\" + item.name + \"\">\n" +
                "            <h2 class=\"mb-0\">\n" +
                "                <button class=\"btn btn-link\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse\" + item.name + \"\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n" +
                "                    " + item.name + "\n" +
                "                </button>\n" +
                "            </h2>\n" +
                "        </div>\n" +
                "\n" +
                "        <div id=\"collapse" + item.name + "\" class=\"collapse show\" aria-labelledby=\"headingOne\" data-parent=\"#accordionAssets\">\n" +
                "            <div class=\"card-body\">\n" +
                "<table>\n" +
                "         <tr>\n" +
                "             <th>Attribut</th>\n" +
                "             <th>Value</th>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "             <td>Asset ID</td>\n" +
                "             <td>" + item.id + "</td>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "             <td>Asset name</td>\n" +
                "             <td>" + item.name + "</td>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "             <td>Start-Up time</td>\n" +
                "             <td>" + item.times.startTime + "</td>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "             <td>Shut-Down time</td>\n" +
                "             <td>" + item.times.endTime + "</td>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "             <td>Min Duration</td>\n" +
                "             <td>" + item.times.minDuration + "</td>\n" +
                "         </tr>\n" +
                "     </table>" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>"
            );


        });

    });


    $.switchStatus = function (status) {

        customer.customer.evu = status;
        $.ajax({
            url: host + ':' + port + '/assets?id=' + customer.id,
            type: 'PUT',
            contentType: "application/json",
            body: JSON.stringify(customer),
            success: function(data) {
                JSON.stringify(customer);
            }
        });

        console.log('send');
        console.log(customer);


    }

});

function switchStatus(status) {
    $.switchStatus(status);

}


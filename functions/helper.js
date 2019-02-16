// helper.js
// ===============
module.exports = {
    /**
     * Prints a fancy Header to the console on startup
     */
    printHead: function () {
        console.log('                                                                   ');
        console.log('                                                                   ');
        console.log('                       :::::::::: :::     ::: :::    :::           ');
        console.log('                      :+:        :+:     :+: :+:    :+:            ');
        console.log('                     +:+        +:+     +:+ +:+    +:+             ');
        console.log('                    +#++:++#   +#+     +:+ +#+    +:+              ');
        console.log('                   +#+         +#+   +#+  +#+    +#+               ');
        console.log('                  #+#          #+#+#+#   #+#    #+#                ');
        console.log('                 ##########     ###      ########                  ');
        console.log('                                                                   ');
        console.log('  ===============================================================  ');
        console.log('                                                                   ');
        console.log('              EVU Backendserver with a small footprint.            ');
        console.log('                   Made with ❤️, node.js and redis.                ');
        console.log('            by lichtwellenreiter, Sc1to and rkreienbuehl.          ');
        console.log('                                                                   ');
        console.log('  ===============================================================  ');
        console.log('                                                                   ');
    },

    /**
     * Generates a new User ID
     * @return {string}
     */
    id: function () {
        return Math.random().toString(36).substr(2, 9);
    },

    /**
     * Get the status for an asset
     */
    getStatus: function () {

        let date = new Date();
        let seconds = date.getSeconds();

        if (seconds % 2 === 0) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * get randomized nimBUS Points based on current Milliseconds
     * @param points
     * @return {*}
     */
    getPoints: function (points) {
        let date = new Date();
        let seconds = date.getSeconds();

        if (seconds % 2 === 0) {
            return points - 1;
        } else {
            return points + 1;
        }
    }
};

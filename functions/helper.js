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

    id: function () {
        return Math.random().toString(36).substr(2, 9);
    }
};

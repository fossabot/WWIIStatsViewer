base64Map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    decodeBase64 = function(inp) {
        var map = base64Map;
        var ret = "";
        var in1, in2, in3, in4, out1, out2, out3, i = 0;

        inp = inp.replace(/[^a-zA-Z0-9\+\/\=]/g, "");
        do {
            in1 = map.indexOf(inp.charAt(i++) || "=");
            in2 = map.indexOf(inp.charAt(i++) || "=");
            in3 = map.indexOf(inp.charAt(i++) || "=");
            in4 = map.indexOf(inp.charAt(i++) || "=");

            out1 = (in1 << 2) | (in2 >> 4);
            out2 = ((in2 & 15) << 4) | (in3 >> 2);
            out3 = ((in3 & 3) << 6) | in4;

            ret = ret + String.fromCharCode(out1);
            if (in3 != 64) ret = ret + String.fromCharCode(out2);
            if (in4 != 64) ret = ret + String.fromCharCode(out3);
        } while (i < inp.length);

        console.log(ret.split(":")[0]);
    };
    decodeBase64("MTQ0OTE2NTk5NDg2MjE1ODcwMDI6MTUxMzM2MDMxMzYzMTo4NjczM2RjYzg1YTYwY2UzZmEzZDkzZDc1YTMwMzM0Yw");
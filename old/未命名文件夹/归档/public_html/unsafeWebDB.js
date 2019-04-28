//var unsafewebDB_base_url = 'http://localhost/UnsafeWebDB/';
var UnsafeDBApp = {
    //url:  'http://localhost/UnsafeWebDB/r.php',
    url:  'http://202.112.92.5/st2016/_zzz/UnsafeWebDB/r.php',
    set_object: function (uid, name, value, note) {
        var msg1 = 'ok';
        var url = UnsafeDBApp.url;//
        var temp = JSON.stringify(value);
        var data = {a: 'set', uid: uid, n: name, v: temp, note: note};
        $.ajax({
            async: false,
            'type': 'POST',
            'url': url,
            data: data
        }).done(function (msg) {
            msg1 = msg;
        }).fail(function (msg, txt) {
            msg1 = msg + " " + txt;
        });
        return msg1;
    },
    set: function (uid, name, value, note) {//设置参数值，若已有值，则覆盖之
        var msg1 = 'ok';
        var url = UnsafeDBApp.url;//
        var data = {a: 'set', uid: uid, n: name, v: value, note: note};
        $.ajax({
            async: false,
            'type': 'POST',
            'url': url,
            data: data
        }).done(function (msg) {
            //var obj = JSON.parse(msg);
            msg1 = msg;
        }).fail(function (msg, txt) {
            //var m = JSON.stringify(msg);
            //alert(m + '\n\n\n' + txt);
            msg1 = msg + " " + txt;
        });
        return msg1;
    },
    get: function (uid, name) {//返回对象，若不存在，返回空值
        var obj = null;
        var url = UnsafeDBApp.url;//
        var data = {a: 'get', uid: uid, n: name};
        $.ajax({
            async: false,
            'type': 'POST',
            'url': url,
            data: data
        }).done(function (msg) {
            obj = JSON.parse(msg);
        }).fail(function (msg, txt) {
            //var m = JSON.stringify(msg);
            //alert(m + '\n\n\n' + txt);
            //msg1 = msg + " " + txt;
            console.log(msg, txt);
        });
        return obj;
    },
    get_value: function (uid, name) {
        var o = UnsafeDBApp.get(uid, name);
        var v = null;
        if (o != null) {
            v = o._pvalue;
        }
        return v;
    },
    get_object: function (uid, name) {
        var o = UnsafeDBApp.get(uid, name);
        var v = null;
        if (o != null) {
            //added for 92.5  -- begin
            var temp=o._pvalue;
            console.log('o._pvalue before:',temp);
            temp=temp.replace(/\\/g,'');
            console.log('o._pvalue after:',temp);
            //added for 92.5  -- end
            v = JSON.parse(temp);
        }
        return v;
    },
    get_pnames: function (uid) {
        var names = [];
        var url = UnsafeDBApp.url;
        var data = {a: 'get_pnames', 'uid': uid};
        $.ajax({
            async: false,
            'type': 'POST',
            'url': url,
            data: data
        }).done(function (msg) {
            names = JSON.parse(msg);
        }).fail(function (msg, txt) {
            //var m = JSON.stringify(msg);
            //alert(m + '\n\n\n' + txt);
        });
        return names;
    },
    delete: function (uid, name) {//删除某参数值
        var msg1 = 'error';
        var url = UnsafeDBApp.url;//
        var data = {a: 'delete', uid: uid, n: name};
        $.ajax({
            async: false,
            'type': 'POST',
            'url': url,
            data: data
        }).done(function (msg) {
            //var obj = JSON.parse(msg);
            msg1 = msg;
        }).fail(function (msg, txt) {
            //var m = JSON.stringify(msg);
            //alert(m + '\n\n\n' + txt);
            msg1 = msg + " " + txt;
        });
        return msg1;
    }

};


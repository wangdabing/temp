/**
 * 平台播放器接口
 */



var icp = icp || {};
icp.activeX = icp.activeX || {};

(function () {
    icp.activeX.platPlayer = function (obj) {
        return new _x(obj);
    }

    var _x = function (obj) {
        // ActiveX
        this.obj = obj;

        // Invoke result
        this.success = true;
        this.result = null;

        // Invoke ActiveX
        this.invoke = function (func, callback) {
            if (!this.success) {
                console.info("last step return false, not invoke.")
                return this;
            }

            try {
                this.success = false;
                this.result = null;

                // Invoke activeX methord
                var result = func.call(this);

                // Invoke callback
                if (callback) {
                    try {
                        if (callback.call(this, result) === false) {
                            console.info("callback return false.");
                            return this;
                        }
                    } catch (e) {
                        console.info("callback error: " + e.message);
                        return this;
                    }
                }

                this.result = result;
                this.success = true;
            } catch (e) {
                console.info("invoke acitveX error: " + e.message);
            }

            return this;
        }
    };

    _x.prototype.constructor = _x;

    _x.prototype.Login = function (ip, port, user, password, avPath, icpCameraId, winobject, callback) {
        console.info("Login...");
        return this.invoke(function () {
            return this.obj.Login(ip, port, user, password, avPath, icpCameraId, winobject);
        }, callback);
    };

    _x.prototype.StartPlay = function (callback) {
        console.info("StartPlay...");
        return this.invoke(function () {
            return this.obj.StartPlay();
        }, callback);
    };

    _x.prototype.StartBack = function (beginTime, endTime, callback) {
        console.info("StartBack...");
        return this.invoke(function () {
            return this.obj.StartBack(beginTime, endTime);
        }, callback);
    };

    _x.prototype.StartProcess = function (cameraId, avPath, startTime, endTime, callback) {
        console.info("StartProcess...");
        return this.invoke(function () {
            return this.obj.StartProcess(beginTime, cameraId, avPath, startTime, endTime);
        }, callback);
    };
})();
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var IslandFood = /** @class */ (function (_super) {
    __extends(IslandFood, _super);
    function IslandFood() {
        var _this = _super.call(this) || this;
        _this.quantity = 100;
        _this.img.src = "./assets/IslandStrawberry.png";
        _this.img.style.top = '60%';
        return _this;
    }
    return IslandFood;
}(Island));

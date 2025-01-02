sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("app.home.controller.home", {
        onInit() {
            
        },


        onDealerClick: function(){
            const configTile = this.getOwnerComponent().getRouter();
            configTile.navTo("Routedealer");
        },
        onBatchClick:function(){
            const boxQrTile = this.getOwnerComponent().getRouter();
            boxQrTile.navTo("RouteboxQrGeneration");
        },
        onsplitDealerclick: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Routedealerscreen");
        },
        
        onclickDashboard: function () {
            var oDashboard = sap.ui.core.UIComponent.getRouterFor(this);
            oDashboard.navTo("RouteinventoryDashboard");
        },
        onPressCreateOrderTile:function(){
            var createProduct = sap.ui.core.UIComponent.getRouterFor(this);
            createProduct.navTo("RoutecreateProduct");
        }
    });
});
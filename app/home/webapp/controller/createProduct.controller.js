sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
], function (Controller, MessageBox, MessageToast, Fragment, JSONModel) {
    "use strict";

    return Controller.extend("app.home.controller.createProduct", {
        onInit: function () {
            // this.oModel = this.getView().getModel();
        },

        onMaterialValuehelpClick: function (oEvent) {

            this._oInputField = oEvent.getSource().getBindingContext();

            if (!this._oMaterialDialog) {
                this._oMaterialDialog = sap.ui.xmlfragment("app.home.fragments.material", this);
                this.getView().addDependent(this._oMaterialDialog);
            }
            // Open the dialog
            this._oMaterialDialog.open();
        },

        onMaterialFilterSearch: function (oEvent) {
            // Get the search query
            var sQuery = oEvent.getParameter("value");
            // Create a filter for material name
            var oFilter = new sap.ui.model.Filter("materialName", sap.ui.model.FilterOperator.Contains, sQuery);
            // Apply the filter
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },
        
        onMaterialValueHelpClose: function (oEvent) {
            // Check if an item was selected
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                // Retrieve the selected material name
                var sSelectedMaterial = oSelectedItem.getTitle();
                // Set the value in the input field
                this.getView().byId("materialInput").setValue(sSelectedMaterial);
            }
            // Clear filters after selection or cancel
            oEvent.getSource().getBinding("items").filter([]);
        },


        onProductionPlantValueHelp: function () {
            // Lazy load the SelectDialog fragment
            if (!this._oProductionPlantDialog) {
                this._oProductionPlantDialog = sap.ui.xmlfragment("app.home.fragments.productionPlant", this);
                this.getView().addDependent(this._oProductionPlantDialog);
            }
            // Open the dialog
            this._oProductionPlantDialog.open();
        },
        
        onproductionplantFilterSearch: function (oEvent) {
            // Get the search query
            var sQuery = oEvent.getParameter("value");
            // Create a filter for the "productionPlant" property
            var oFilter = new sap.ui.model.Filter("productionPlant", sap.ui.model.FilterOperator.Contains, sQuery);
            // Apply the filter to the items binding
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },
        
        onproductionplantValueHelpClose: function (oEvent) {
            // Check if an item was selected
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                // Retrieve the selected production plant value
                var sSelectedProductionPlant = oSelectedItem.getTitle();
                // Set the value in the input field
                this.getView().byId("productionplantinput").setValue(sSelectedProductionPlant);
            }
            // Clear filters after selection or cancel
            oEvent.getSource().getBinding("items").filter([]);
        },
        
        
        
        onWorkCenterValueHelp: function () {
            // Lazy load the SelectDialog fragment
            if (!this._oWorkCenterDialog) {
                this._oWorkCenterDialog = sap.ui.xmlfragment("app.home.fragments.workCenter", this);
                this.getView().addDependent(this._oWorkCenterDialog);
            }
            // Open the dialog
            this._oWorkCenterDialog.open();
        },
        
        onWorkCenterFilterSearch: function (oEvent) {
            // Get the search query
            var sQuery = oEvent.getParameter("value");
            // Create a filter for the "workCenter" property
            var oFilter = new sap.ui.model.Filter("workCenter", sap.ui.model.FilterOperator.Contains, sQuery);
            // Apply the filter
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },
        
        onWorkCenterValueHelpClose: function (oEvent) {
            // Check if an item was selected
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                // Retrieve the selected work center value
                var sSelectedWorkCenter = oSelectedItem.getTitle();
                // Set the value in the input field
                this.getView().byId("workCenterInput").setValue(sSelectedWorkCenter);
            }
            // Clear filters after selection or cancel
            oEvent.getSource().getBinding("items").filter([]);
        },
        
        onOrderTypeValueHelp: function () {
            // Lazy load the SelectDialog fragment
            if (!this._oOrderTypeDialog) {
                this._oOrderTypeDialog = sap.ui.xmlfragment("app.home.fragments.orderType", this);
                this.getView().addDependent(this._oOrderTypeDialog);
            }
            // Open the dialog
            this._oOrderTypeDialog.open();
        },
        
        onOrderTypeFilterSearch: function (oEvent) {
            // Get the search query
            var sQuery = oEvent.getParameter("value");
            // Create a filter for the "orderType" property
            var oFilter = new sap.ui.model.Filter("orderType", sap.ui.model.FilterOperator.Contains, sQuery);
            // Apply the filter
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },
        
        onOrderTypeValueHelpClose: function (oEvent) {
            // Check if an item was selected
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                // Retrieve the selected order type value
                var sSelectedOrderType = oSelectedItem.getTitle();
                // Set the value in the input field
                this.getView().byId("orderTypeInput").setValue(sSelectedOrderType);
            }
            // Clear filters after selection or cancel
            oEvent.getSource().getBinding("items").filter([]);
        },



        onClickSumbitButton: function () {
                // Gather values from the form
                debugger;
                var materialName = this.byId("materialInput").getValue();
                var productionPlant = this.byId("productionplantinput").getValue();
                var startDate = this.byId("DP21").getDateValue();
                var endDate = this.byId("DP22").getDateValue();
                var productionQuantity = this.byId("division_id").getValue();
                var orderType = this.byId("orderTypeInput").getValue();
                var deliveryQuantity = this.byId("distChan_id").getValue();
                var workCenter = this.byId("workCenterInput").getValue();
                var priority = this.byId("division_id17").getSelectedKey();
                var remarks = this.byId("ShipTP_id19").getValue();
                
                // Create payload object for productionOrder
                let oModel = this.getView().getModel();
                let oBindList = oModel.bindList("/productionOrder");


                var productionOrder = {
                    batchID: Math.floor(Math.random() * 1000),  // Example, you may need to generate this differently
                    materialName: materialName,
                    materialID: 123,  // Example, replace with actual ID if available
                    productionPlant: productionPlant,
                    productionID: Math.floor(Math.random() * 1000),  // Example, replace with actual ID if available
                    productionQuantity: parseInt(productionQuantity, 10),
                    startDate: startDate,
                    endDate: endDate,
                    manufacturingDate: new Date(),  // Set to current date as an example
                    expiryDate: new Date(),  // Set to current date as an example
                    deliveryQuantity: parseInt(deliveryQuantity, 10),
                    orderType: orderType,
                    priority: priority,
                    workCenter: workCenter,
                    Remark: remarks,
                    status: "New"  // Example, you can set the status according to your logic
                };
    
                // Bind the list to the OData model and create the entry
               
            }
    
        


    });
});
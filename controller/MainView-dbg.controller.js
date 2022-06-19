// @ts-nocheck
sap.ui.define(
  ["./BaseController", "sap/m/MessageToast", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, JSONModel) {
    "use strict";

    var oData2 = {
      mydata: [
        {
          plaka: "35 SAP 105",
          giris: "19.06.2022",
          saat: "00:41:09",
          mal_cinsi: "Halı",
        },
      ],
    };

    return Controller.extend("com.myorg.kantarUyg.controller.MainView", {
      onInit: function () {
        var date = new Date().toLocaleDateString();
        var time = new Date().toLocaleTimeString();
        sap.ui.getCore().byId(this.createId("date")).setValue(date);

        sap.ui.getCore().byId(this.createId("time")).setValue(time);

        var oData = {
          SelectedProduct: "HT-1000",
          ProductCollection: [
            {
              ProductId: "HT-1000",
              Name: "Notebook Basic 15",
            },
            {
              ProductId: "HT-1001",
              Name: "Notebook Basic 17",
            },
            {
              ProductId: "HT-1002",
              Name: "Notebook Basic 18",
            },
            {
              ProductId: "HT-1003",
              Name: "Notebook Basic 19",
            },
            {
              ProductId: "HT-1007",
              Name: "ITelO Vault",
            },
          ],
        };
        var oModel = new JSONModel(oData);
        var oModel2 = new JSONModel(oData2);
        this.getView().setModel(oModel, "product");
        this.getView().setModel(oModel2);
      },
      onButtonPress: function () {
        MessageToast.show("Button was pressed");

        oData2.mydata.push({
          ProductId: "HT-1000",
          Name: "Notebook Basic 15",
        });

        var oModel2 = new JSONModel(oData2);
        this.getView().setModel(oModel2);
      },
    });
  }
);

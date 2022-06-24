/* eslint-disable consistent-this */
/* eslint-disable block-scoped-var */
/* eslint-disable no-unused-expressions */
/* eslint-disable valid-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// @ts-nocheck
sap.ui.define(
    ["./BaseController", "sap/m/MessageToast", "sap/ui/model/json/JSONModel"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel) {
        "use strict";
        var money = "1,00";
        var entry = {
            entryData: [],
        };
        var kantarData = {
            exitData: [],
        };

        return Controller.extend("com.myorg.kantarUyg.controller.MainView", {
            onInit: function () {
                var date = new Date().toLocaleDateString();
                var time = new Date().toLocaleTimeString();
                sap.ui.getCore().byId(this.createId("date")).setValue(date);
                sap.ui.getCore().byId(this.createId("time")).setValue(time);
                // cikis_btn = this.getView().byId("cikis_btn");
                // cikis_btn.setEnabled(false);

                this.getProducts();
                this.getEntry();
                this.getExit();
                this.randomKh();
            },
            getEntry: function () {
                var oModelEntry;
                var json = new JSONModel();
                var ths = this;
                $.ajax({
                    url: "https://db-api-app.herokuapp.com/api/get/entry/",
                    async: false,
                    success: function (data) {
                        data.forEach(function (element) {
                            var mask = element.fiyat.split(".").join(",");
                            element.fiyat = ths.maskMoney(mask);
                        });
                        json.setData(data);
                        entry.entryData = data;
                        oModelEntry = new JSONModel(entry);
                        ths.getView().setModel(oModelEntry, "entry");
                        money = "1,00";
                    },
                    error: function (err) {
                        entry.entryData = [];
                        oModelEntry = new JSONModel(entry);
                        ths.getView().setModel(oModelEntry, "entry");
                    },
                });

                this.getView().setModel(oModelEntry);
            },
            getExit: function () {
                var oModelExit;
                var json = new JSONModel();
                var ths = this;
                $.ajax({
                    url: "https://db-api-app.herokuapp.com/api/get/exit/",
                    async: false,
                    success: function (data) {
                        data.forEach(function (element) {
                            var mask = element.fiyat.split(".").join(",");
                            element.fiyat = ths.maskMoney(mask);
                        });
                        json.setData(data);
                        kantarData.exitData = data;
                        oModelExit = new JSONModel(kantarData);
                        ths.getView().setModel(oModelExit, "exit");
                        money = "1,00";
                    },
                    error: function (err) {
                        // console.log(err);
                    },
                });

                this.getView().setModel(oModelExit);
            },
            getProducts: function () {
                var productType = {
                    SelectedProduct: "",
                    ProductCollection: [],
                };
                var oModelProductType;
                var json = new JSONModel();
                var ths = this;
                $.ajax({
                    url: "https://db-api-app.herokuapp.com/api/get/products/",
                    async: false,
                    success: function (data) {
                        json.setData(data);
                        productType.SelectedProduct = data[0].id;
                        productType.ProductCollection = data;
                        oModelProductType = new JSONModel(productType);
                        ths.getView().setModel(oModelProductType, "product");
                    },
                    error: function (err) {
                        console.log(err);
                    },
                });
            },
            onSave: function () {
                var plaka_no = this.getView().byId("plaka_no").getValue();
                var giris_tarihi = this.getView().byId("date").getValue();
                var saat = this.getView().byId("time").getValue();
                var mal_cinsi = this.getView().byId("product").getSelectedItem().getText();
                var fiyat = parseFloat(money.split(",").join("."));
                var kg = parseFloat(this.getView().byId("kg").getText().split(" ")[0]);

                var ths = this;

                if (plaka_no != "") {
                    var url = "https://db-api-app.herokuapp.com/api/post/entry/";

                    var data = {
                        plaka_no: plaka_no,
                        giris_tarihi: giris_tarihi,
                        giris_saati: saat,
                        mal_cinsi: mal_cinsi,
                        fiyat: (fiyat * kg).toFixed(3),
                        kg: kg,
                    };
                    var json = JSON.stringify(data);
                    $.ajax({
                        url: url,
                        type: "post",
                        data: { obj: json },
                        success: function (response) {
                            var res = JSON.parse(response);
                            MessageToast.show(res.message);
                            setTimeout(function () {
                                ths.getEntry();
                            }, 300);
                        },
                    });
                } else MessageToast.show("Lütfen tüm alanları doldurunuz.");
            },
            onExit: function (oEvent) {
                var oSelectedItem = oEvent.getSource().getBindingContext("entry").getObject();

                oSelectedItem.cikis_tarihi = new Date().toLocaleDateString();
                oSelectedItem.cikis_saati = new Date().toLocaleTimeString();

                oSelectedItem.fiyat = oSelectedItem.fiyat.split(".").join("");
                oSelectedItem.fiyat = oSelectedItem.fiyat.split(",").join(".");

                console.log(oSelectedItem);

                var url = "https://db-api-app.herokuapp.com/api/post/exit/";
                var ths = this;
                var json = JSON.stringify(oSelectedItem);
                $.ajax({
                    url: url,
                    type: "post",
                    data: { obj: json },
                    success: function (response) {
                        var res = JSON.parse(response);
                        MessageToast.show(res.message);
                        setTimeout(function () {
                            ths.getEntry();
                            ths.getExit();
                        }, 300);
                    },
                });
            },
            randomKh: function () {
                var random = Math.random() * (70 - 1) + 30;
                sap.ui
                    .getCore()
                    .byId(this.createId("kg"))
                    .setText(random.toFixed(3) + " KG");
            },
            handleLiveChange: function (oEvent) {
                var _oInput = oEvent.getSource();
                var val = _oInput.getValue();
                val = val.replace(/[^\d(\d{1,2})+\.]/g, "");
                _oInput.setValue(val);
                var res = this.maskMoney(val);
                _oInput.setValue(res);
            },
            maskMoney: function (val) {
                if (val) {
                    val = val.toString();
                    var split1 = val.split(".");
                    money = "";
                    split1.forEach(function (element) {
                        money += element;
                    });
                    var slice = money.split(",");
                    if (slice) {
                        var price = slice[0];
                        var len = price.length;
                        if (len >= 4) {
                            var dot = 3;
                            for (var i = 3; i < len; i += 3) {
                                price = price.slice(0, -dot) + "." + price.slice(-dot);
                                dot += 4;
                            }
                        }
                        slice[1] != undefined ? (price += "," + slice[1]) : "";
                    }
                    return price;
                } else return "";
            },
        });
    }
);

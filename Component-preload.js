//@ui5-bundle com/myorg/kantarUyg/Component-preload.js
sap.ui.require.preload({
	"com/myorg/kantarUyg/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/myorg/kantarUyg/model/models"],function(e,t,i){"use strict";return e.extend("com.myorg.kantarUyg.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"com/myorg/kantarUyg/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(r){"use strict";return r.extend("com.myorg.kantarUyg.controller.controller.App",{onInit(){}})});
},
	"com/myorg/kantarUyg/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","com/myorg/kantarUyg/model/formatter"],function(e,t,o,n){"use strict";return e.extend("com.myorg.kantarUyg.controller.BaseController",{formatter:n,getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},navTo:function(e,t,o){this.getRouter().navTo(e,t,o)},getRouter:function(){return o.getRouterFor(this)},onNavBack:function(){const e=t.getInstance().getPreviousHash();if(e!==undefined){window.history.back()}else{this.getRouter().navTo("appHome",{},true)}}})});
},
	"com/myorg/kantarUyg/controller/MainView.controller.js":function(){sap.ui.define(["./BaseController","sap/m/MessageToast","sap/ui/model/json/JSONModel"],function(e,t,o){"use strict";var a={mydata:[{plaka:"35 SAP 105",giris:"19.06.2022",saat:"00:41:09",mal_cinsi:"Halı"}]};return e.extend("com.myorg.kantarUyg.controller.MainView",{onInit:function(){var e=(new Date).toLocaleDateString();var t=(new Date).toLocaleTimeString();sap.ui.getCore().byId(this.createId("date")).setValue(e);sap.ui.getCore().byId(this.createId("time")).setValue(t);var s={SelectedProduct:"HT-1000",ProductCollection:[{ProductId:"HT-1000",Name:"Notebook Basic 15"},{ProductId:"HT-1001",Name:"Notebook Basic 17"},{ProductId:"HT-1002",Name:"Notebook Basic 18"},{ProductId:"HT-1003",Name:"Notebook Basic 19"},{ProductId:"HT-1007",Name:"ITelO Vault"}]};var i=new o(s);var r=new o(a);this.getView().setModel(i,"product");this.getView().setModel(r)},onButtonPress:function(){t.show("Button was pressed");a.mydata.push({ProductId:"HT-1000",Name:"Notebook Basic 15"});var e=new o(a);this.getView().setModel(e)}})});
},
	"com/myorg/kantarUyg/i18n/i18n.properties":'# This is the resource bundle for com.myorg.kantarUyg\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle= Kantar Uygulamas\\u0131\n\n#YDES: Application description\nappDescription=Description of Kantar Uygulamas\\u0131\n#XTIT: Main view title\ntitle=Kantar Uygulamas\\u0131',
	"com/myorg/kantarUyg/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"com.myorg.kantarUyg","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap-ux/fiori-freestyle-writer:basic","version":"0.11.15"}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.m":{},"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.myorg.kantarUyg.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.myorg.kantarUyg.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteMainView","pattern":":?query:","target":["TargetMainView"]}],"targets":{"TargetMainView":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"MainView","viewName":"MainView"}}},"rootView":{"viewName":"com.myorg.kantarUyg.view.App","type":"XML","async":true,"id":"App"}}}',
	"com/myorg/kantarUyg/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{}});
},
	"com/myorg/kantarUyg/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){const i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/myorg/kantarUyg/view/App.view.xml":'<mvc:View controllerName="com.myorg.kantarUyg.controller.App" xmlns:html="http://www.w3.org/1999/xhtml" xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m"><App id="app" class="customCss"></App></mvc:View>\n',
	"com/myorg/kantarUyg/view/MainView.view.xml":'<mvc:View\n    xmlns="sap.m"\n    controllerName="com.myorg.kantarUyg.controller.MainView"\n    xmlns:core="sap.ui.core"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:l="sap.ui.layout"\n\txmlns:grid="sap.ui.layout.cssgrid"\n\txmlns:f="sap.f"\n\txmlns:cards="sap.f.cards"><Page id="page" title="{i18n>title}" class="bgColor"><content><l:Grid class="mt-10" containerQuery="true"><l:content><VBox class="column"><grid:CSSGrid class="px-0"><grid:customLayout><grid:ResponsiveColumnLayout/></grid:customLayout><f:Card><f:layoutData><grid:ResponsiveColumnItemLayoutData columns="12"/></f:layoutData><f:content><VBox class="sapUiSmallMargin"><Label text="KAYIT BİLGİLERİ" class="cusLabel"/><l:VerticalLayout width="100%"><l:Grid containerQuery="true" defaultSpan="L6 M6 S12" class="pa-0"><html:div class="cusContainer"><Label text="Plaka No"/><Input class="cusInput" id="plaka_no"/></html:div><html:div class="cusContainer"><Label text="Giriş Tarihi"/><DateTimeInput\n                                                        id="date"\n                                                        displayFormat="short"\n                                                        change="handleChange"/></html:div><html:div class="cusContainer"><Label text="Saat"/><TimePicker\n                                                        id="time"\n                                                        valueFormat="HH:mm:ss"\n                                                        displayFormat="HH:mm:ss"\n                                                        change="handleChange"\n                                                        support2400="true"\n                                                        maskMode="true"\n                                                        class="cusTimePicker"/></html:div><html:div class="cusContainer"><Label text="Mal Cinsi"/><Select\n                                                    class="cusSelect"\n                                                        forceSelection="false"\n                                                        selectedKey="{product>/SelectedProduct}"\n                                                        items="{\n                                                            path: \'product>/ProductCollection\',\n                                                            sorter: { path: \'Name\' }\n                                                        }"><core:Item key="{product>ProductId}" text="{product>Name}" /></Select></html:div></l:Grid></l:VerticalLayout><l:VerticalLayout width="100%"><l:Grid containerQuery="true" defaultSpan="L12 M12 S12" class="pa-0"><FlexBox\n                                                    alignItems="Center"\n                                                    justifyContent="End"><Button text="KAYDET" class="mt-10" press="onButtonPress"></Button></FlexBox></l:Grid></l:VerticalLayout></VBox></f:content></f:Card></grid:CSSGrid><layoutData><l:GridData span="L5 M12 S12" /></layoutData></VBox><VBox class="column"><grid:CSSGrid class="px-0"><grid:customLayout><grid:ResponsiveColumnLayout/></grid:customLayout><f:Card><f:layoutData><grid:ResponsiveColumnItemLayoutData columns="12"/></f:layoutData><f:content><VBox class="sapUiSmallMargin"><Label text="GİRİŞ BİLGİLERİ" class="cusLabel"/><html:div><Table\n                                                inset="false"\n                                                items="{\n                                                    path: \'/mydata\',\n                                                    sorter: {\n                                                        path: \'plaka\'\n                                                    }\n                                                }"\n\n                                                ><columns><Column\n                                                        minScreenWidth="Tablet"\n                                                        demandPopin="true"><Text text="PLAKA NO" /></Column><Column\n                                                        minScreenWidth="Tablet"\n                                                        demandPopin="true"><Text text="GİRİŞ TARİHİ" /></Column><Column\n                                                        minScreenWidth="Tablet"\n                                                        demandPopin="true"><Text text="SAAT" /></Column><Column\n                                                        minScreenWidth="Tablet"\n                                                        demandPopin="true"><Text text="MAL CİNSİ" /></Column></columns><items><ColumnListItem vAlign="Middle"><cells><ObjectIdentifier\n                                                                text="{plaka}"\n                                                                /><Text\n                                                                text="{giris}"/><Text\n                                                                text="{saat}"/><Text\n                                                                text="{mal_cinsi}"/></cells></ColumnListItem></items></Table></html:div></VBox></f:content></f:Card></grid:CSSGrid><layoutData><l:GridData span="L7 M12 S12" /></layoutData></VBox></l:content></l:Grid><l:VerticalLayout width="100%"><l:Grid containerQuery="true" defaultSpan="L12 M12 S12"><f:Card><f:layoutData><grid:ResponsiveColumnItemLayoutData columns="12"/></f:layoutData><f:content><VBox class="sapUiSmallMargin"><Label text="ÇIKIŞ BİLGİLERİ" class="cusLabel"/><html:div><Table id="idProductsTable"\n                                        inset="false"\n                                        items="{\n                                            path: \'/mydata\',\n                                            sorter: {\n                                                path: \'plaka\'\n                                            }\n                                        }"\n\n                                        ><columns><Column><Text text="PLAKA NO" /></Column><Column><Text text="GİRİŞ TARİHİ" /></Column><Column><Text text="SAAT" /></Column><Column\n                                                minScreenWidth="Tablet"\n                                                demandPopin="true"><Text text="MAL CİNSİ" /></Column></columns><items><ColumnListItem vAlign="Middle"><cells><ObjectIdentifier\n                                                        title="{plaka}"\n                                                        /><Text\n                                                        text="{giris}" class="text-bold"/><Text\n                                                        text="{saat}" class="text-bold"/><Text\n                                                        text="{mal_cinsi}" class="text-bold"/></cells></ColumnListItem></items></Table></html:div></VBox></f:content></f:Card></l:Grid></l:VerticalLayout></content></Page></mvc:View>\n'
});

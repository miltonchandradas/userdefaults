/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "myuserdefaults/model/models",
    "myuserdefaults/utils/odataUtils"
],
    function (UIComponent, Device, models, odataUtils) {
        "use strict";

        return UIComponent.extend("myuserdefaults.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                this._fetchUserDefaults();
            },

            _fetchUserDefaults: async function () {
                try {
                    let data = await odataUtils.readFromBackend("Defaultparameters('FIN')", this.getModel());
                    console.log(data)
                } catch (err) {
                    console.log("Error: ", err)
                }

            },
        });
    }
);
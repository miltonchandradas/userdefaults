sap.ui.define([], function () {
	"use strict";

	return {

		readFromBackend: function (entity, dataModel) {

			return new Promise(function (resolve, reject) {
				dataModel.read("/" + entity, {
					filters: null,
					success: function (data) {
						resolve(data);
					},
					error: function (err) {
						reject(err);
					}
				});
			});
		},
		
		readEntitySetExpand: function (entity, filters, params, viewModel, dataModel) {

			viewModel.setProperty("/busy", true);

			return new Promise((resolve, reject) => {
				dataModel.read("/" + entity, {
					filters: filters,
					urlParameters: {
						"$expand": params
					},
					success: function (data) {
						viewModel.setProperty("/busy", false);
						resolve(data);
					},
					error: function (err) {
						viewModel.setProperty("/busy", false);
						reject(err);
					}
				});
			});
		},
		
		readEntityExpand: function (sPath, filters, params, viewModel, dataModel) {

			viewModel.setProperty("/busy", true);

			return new Promise((resolve, reject) => {
				dataModel.read(sPath, {
					filters: filters,
					urlParameters: {
						"$expand": params
					},
					success: function (data) {
						viewModel.setProperty("/busy", false);
						resolve(data);
					},
					error: function (err) {
						viewModel.setProperty("/busy", false);
						reject(err);
					}
				});
			});
		},

		writeToBackend: function (entity, payload, viewModel, dataModel) {

			viewModel.setProperty("/busy", true);

			return new Promise(function (resolve, reject) {
				dataModel.create("/" + entity, payload, {
					success: function (data) {
						viewModel.setProperty("/busy", false);
						resolve(data);
					},
					error: function (err) {
						viewModel.setProperty("/busy", false);
						reject(err);
					}
				});
			});
		}
	};

});
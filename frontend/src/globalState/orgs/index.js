import {action, observable} from "mobx";
import axios from "axios";


export const orgsState = observable({
        orgs: observable([]),
        response: {isError: null, message: ""},

        handleError: function (e) {
            this.orgs = [];
            if (e.response.status === 400) {
                this.response = {isError: true, message: "Bad request"};
                if (e.response.data.message.includes("parser")) this.response.message = "Filter string parsing error";
                if (e.response.data.message.includes("No property")) this.response.message = e.response.data.message;
                if (e.response.data.message.includes("IllegalStateException")) this.response.message = "Invalid arguments error";
                if (e.response.data.message.includes("ManagedType")) this.response.message = "Invalid arguments error";
                if (e.response.data.message.includes("IllegalStateException")) this.response.message = "Invalid arguments error";
                if (e.response.data.message.includes("out of bounds")) this.response.message = "Invalid arguments error";
            }
            if (e.response.status === 404)
                this.response = {isError: true, title: "Not found", message: e.response.data.message};
            if (e.response.status === 500)
                this.response = {isError: true, message: "Server error"};
        },

        fetchOrgs(params) {
            axios
                .get("https://localhost:31510/orgs", {params})
                .then(response => {
                    this.orgs = response.data;
                    this.response = {isError: false, message: "Request successful"}
                }).catch(e => {
                this.handleError(e);
            });
        },

        addOrgs(params) {
            axios
                .post("https://localhost:31510/orgs", {...params, type: params.type === "" ? null : params.type})
                .then(response => {
                    this.orgs = [response.data];
                    this.response = {isError: false, message: "Request successful"}
                }).catch(e => {
                this.handleError(e);
            });
        },

        updateOrgs(params) {
            axios
                .put("https://localhost:31510/orgs", params)
                .then(response => {
                    this.orgs = [response.data];
                    this.response = {isError: false, message: "Request successful"}
                }).catch(e => {
                this.handleError(e);
            });
        },

        getOrgById(pathVariable) {
            axios
                .get(`https://localhost:31510/orgs/${pathVariable}`)
                .then(response => {
                    this.orgs = [response.data];
                    this.response = {isError: false, message: "Request successful"}
                }).catch(e => {
                this.handleError(e);
            });
        },

        deleteOrgById(pathVariable) {
            axios
                .delete(`https://localhost:31510/orgs/${pathVariable}`)
                .then(response => {
                    this.orgs = [response.data];
                    this.response = {isError: false, message: "Request successful"}
                }).catch(e => {
                this.handleError(e);
            });
        },

        deleteOrgsByAnal(params) {
            axios
                .delete("https://localhost:31510/orgs/annualTurnover", {params})
                .then(response => {
                    this.orgs = response.data;
                    this.response = {isError: false, message: "Request successful"}
                }).catch(e => {
                this.handleError(e);
            });
        },

        getFilteredOrgsByAnal(pathVar1, pathVar2) {
            axios
                .get(`https://localhost:31511/orgdirectory/filter/turnover/${pathVar1}/${pathVar2}`)
                .then(response => {
                    this.orgs = response.data;
                    this.response = {isError: false, message: "Request successful"}
                }).catch(e => {
                this.handleError(e);
            });
        },

        getFilteredOrgsByEmployees(pathVar1, pathVar2) {
            axios
                .get(`https://localhost:31511/orgdirectory/filter/employees/${pathVar1}/${pathVar2}`)
                .then(response => {
                    this.orgs = response.data;
                    this.response = {isError: false, message: "Request successful"}
                }).catch(e => {
                this.handleError(e);
            });
        },

        getOrgsGroupCntByAddress() {
            axios
                .get("https://localhost:31510/orgs/group-count/by-address")
                .then(response => {
                    this.orgs = []
                    this.response = {isError: false, message: `Groups: ${response.data}`}
                }).catch(e => {
                this.handleError(e);
            });
        },

        getOrgsWhereTypeGreaterThanGiven(params) {
            axios
                .get("https://localhost:31510/orgs/type", {params})
                .then(response => {
                    this.orgs = response.data;
                    this.response = {isError: false, message: "Request successful"}
                }).catch(e => {
                this.handleError(e);
            });
        },

    },
    {
        fetchOrgs: action,
        addOrgs: action,
        updateOrgs: action,
        getOrgByIdOrgsById: action,
        deleteOrgById: action,
        deleteOrgsByAnal: action,
        getFilteredOrgsByAnal: action,
        getFilteredOrgsByEmployees: action,
    });
package soa.lab.endpoint;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import soa.lab.filter.FilterOrgsByEmployeesCountRequest;
import soa.lab.filter.FilterOrgsByEmployeesCountResponse;
import soa.lab.filter.FilterOrgsByTurnoverRequest;
import soa.lab.filter.FilterOrgsByTurnoverResponse;
import soa.lab.service.FilterService;

@Slf4j
@Endpoint
public class FilterEndpoint {
    private static final String NAMESPACE_URI = "http://soa/lab/filter";
    private final FilterService filterService;

    @Autowired
    public FilterEndpoint(FilterService filterService) {
        this.filterService = filterService;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "filterOrgsByTurnoverRequest")
    @ResponsePayload
    public FilterOrgsByTurnoverResponse filterOrgsByTurnover(@RequestPayload FilterOrgsByTurnoverRequest request) {
        FilterOrgsByTurnoverResponse response = new FilterOrgsByTurnoverResponse();
        log.info("Request to get orgs between {} and {} turnover values", request.getMinAnnualTurnover(), request.getMaxAnnualTurnover());
        response.getOrgs().addAll(filterService.filterOrgsByTurnover(request.getMinAnnualTurnover(), request.getMaxAnnualTurnover()));
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "filterOrgsByEmployeesCountRequest")
    @ResponsePayload
    public FilterOrgsByEmployeesCountResponse filterOrgsByEmployeesCount(@RequestPayload FilterOrgsByEmployeesCountRequest request) {
        FilterOrgsByEmployeesCountResponse response = new FilterOrgsByEmployeesCountResponse();
        log.info("Request to get orgs between {} and {} employees count values", request.getMinEmployeesCount(), request.getMaxEmployeesCount());
        response.getOrgs().addAll(filterService.filterOrgsByEmployeesCount(request.getMinEmployeesCount(), request.getMaxEmployeesCount()));
        return response;
    }
}

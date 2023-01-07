package soa.lab.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import soa.lab.exception.DataNotFoundException;
import soa.lab.filter.OrganizationDto;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class FilterService {
    private final WebClient localApiClient;

    @Autowired
    public FilterService(WebClient localApiClient) {
        this.localApiClient = localApiClient;
    }


    public List<OrganizationDto> filterOrgsByTurnover(Float min, Float max) {
        OrganizationDto[] responseBody = getOrganizationsFromMainService();
        log.info("Request from main service received with {} elements.\nFiltering by anal.", responseBody.length);
        List<OrganizationDto> organizations = Arrays.stream(responseBody).filter(o -> o.getAnnualTurnover() >= min && o.getAnnualTurnover() <= max).collect(Collectors.toList());
        if (organizations.isEmpty()) throw new DataNotFoundException("Organizations not found");
        return organizations;
    }

    public List<OrganizationDto> filterOrgsByEmployeesCount(Integer min, Integer max) {
        OrganizationDto[] responseBody = getOrganizationsFromMainService();
        log.info("Request from main service received with {} elements.\nFiltering by employee.", responseBody.length);
        List<OrganizationDto> organizations = Arrays.stream(responseBody).filter(o -> o.getEmployeesCount() >= min && o.getEmployeesCount() <= max).collect(Collectors.toList());
        if (organizations.isEmpty()) throw new DataNotFoundException("Organizations not found");
        return organizations;
    }

    private OrganizationDto[] getOrganizationsFromMainService() {
        OrganizationDto[] responseBody = localApiClient.get()
                .uri("/orgs")
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(OrganizationDto[].class)
                .block();
        if (responseBody == null)
            throw new DataNotFoundException("Organizations not found");
        return responseBody;
    }
}
